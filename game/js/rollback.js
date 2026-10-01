// Rollback netcode (GGPO-style) for a deterministic simulation with up to 4 fighters.
//
// Every peer simulates each frame immediately, using its own input plus a *prediction* (last confirmed input) for every
// other human. When a real input arrives and differs from the prediction, we rewind to the saved snapshot of that frame
// and re-simulate up to "now". CPU fighters need no network data at all: their brain lives inside the sim state.
//
// Topology is a star through the host: guests only talk to the host; the host relays everyone's inputs. A guest that
// drops is replaced by a CPU from an agreed frame (the host announces it), so the remaining players keep playing.
//
// The transport is injected (`send(link, msg)`), so this file has no DOM / network dependency and is unit-tested in Node.

import { CPU_INPUT } from './config.js';

const WINDOW = 64;      // max inputs per origin per packet
const HISTORY = 300;    // frames of input history kept (for resends)

export class Rollback {
  // n: fighters; local: my fighter index; human[i]: fighter i is a networked human (CPUs are false);
  // links: fighter indices I'm directly connected to (host: every guest, guest: [0])
  constructor({ createState, step, clone, hash, n, local, human, links, delay = 2, maxRollback = 10, send, onEvents, onDesync }) {
    this.step = step; this.clone = clone; this.hash = hash;
    this.n = n; this.local = local; this.human = human; this.links = links.slice();
    this.isHost = local === 0;
    this.delay = delay; this.maxRollback = maxRollback;
    this.send = send; this.onEvents = onEvents; this.onDesync = onDesync;

    this.state = createState();
    this.frame = 0;                                   // next frame to simulate
    this.snaps = new Map();                           // frame -> state *before* simulating that frame
    this.lin = new Map();                             // my inputs by frame
    this.rin = Array.from({ length: n }, () => new Map());   // other humans' confirmed inputs by frame
    this.conf = new Array(n).fill(delay - 1);         // highest contiguous confirmed frame per other human
    this.ack = {};                                    // ack[link][q] = highest frame of q's inputs `link` has confirmed
    for (const L of links) this.ack[L] = new Array(n).fill(delay - 1);
    this.drop = {};                                   // drop[p] = frame from which p is CPU-controlled
    this.used = new Map();                            // frame -> array(n): inputs actually used when simulating that frame
    for (let f = 0; f < delay; f++) { this.lin.set(f, 0); for (let p = 0; p < n; p++) if (p !== local && human[p]) this.rin[p].set(f, 0); }
    this.lNext = delay;                               // frame the next sampled local input is assigned to
    this.dirty = null;                                // earliest frame whose prediction turned out wrong
    this.presented = -1;                              // last frame whose events were handed to the presentation layer

    this.stats = { rollbacks: 0, resimFrames: 0, maxDepth: 0, stalls: 0, throttled: 0, lastDepth: 0, hashOk: 0 };
    this.rtt = 0;                                     // ms to the host, set by the transport
    this.peerFrame = {}; this.peerFrameAt = {};
    this.lead = 0; this.skipAcc = 0;
    this.hashes = new Map(); this.peerHashes = new Map(); this.lastHashed = 0;
    this.desynced = false;
    this.stallRun = 0;                                // consecutive stalled ticks (a silent peer freezes everyone)
  }

  // the other human whose inputs are furthest behind
  slowest() { let best = -1, lo = Infinity; for (const p of this.remotes()) { const v = this._confEff(p); if (v < lo) { lo = v; best = p; } } return best; }

  // ---- bookkeeping ------------------------------------------------------------------------------
  remotes() { const r = []; for (let p = 0; p < this.n; p++) if (p !== this.local && this.human[p]) r.push(p); return r; }

  _confEff(p) { const d = this.drop[p]; return d !== undefined && this.conf[p] >= d - 1 ? Infinity : this.conf[p]; }

  // highest frame for which every other human's input is known (Infinity if nobody else is a human)
  confirmed() {
    let c = Infinity;
    for (const p of this.remotes()) { const v = this._confEff(p); if (v < c) c = v; }
    return c;
  }

  get predicted() { const c = this.confirmed(); return c === Infinity ? 0 : Math.max(0, this.frame - 1 - c); }

  _input(p, f) {
    if (p === this.local) return this.lin.get(f) | 0;
    if (!this.human[p]) return 0;
    const d = this.drop[p];
    if (d !== undefined && f >= d) return CPU_INPUT;
    const v = this.rin[p].get(f);
    return v !== undefined ? v : (this.rin[p].get(this.conf[p]) | 0);
  }

  // ---- inbound ----------------------------------------------------------------------------------
  receive(link, msg, now = 0) {
    if (!msg || typeof msg !== 'object') return;          // never trust the wire: validate everything
    if (msg.t === 'i') {
      if (!Array.isArray(msg.o) || msg.o.length > 8) return;
      for (const o of msg.o) {
        if (!o || !Number.isInteger(o.p) || o.p < 0 || o.p >= this.n || o.p === this.local || !this.human[o.p]) continue;
        if (this.isHost && o.p !== link) continue;        // a guest may only speak for itself
        if (!Array.isArray(o.a) || o.a.length > WINDOW || !Number.isInteger(o.s) || o.s < 0) continue;
        for (let k = 0; k < o.a.length; k++) {
          const f = o.s + k;
          if (Number.isInteger(o.a[k]) && f <= this.frame + 256) this._remoteInput(o.p, f, o.a[k] & 255);
        }
      }
      const A = this.ack[link];
      if (A && Array.isArray(msg.k)) for (let q = 0; q < this.n && q < msg.k.length; q++) if (Number.isInteger(msg.k[q]) && msg.k[q] > A[q] && msg.k[q] < this.frame + 512) A[q] = msg.k[q];
      if (Number.isFinite(msg.fr)) { this.peerFrame[link] = msg.fr; this.peerFrameAt[link] = now; }
    } else if (msg.t === 'h') {
      if (!Number.isInteger(msg.f) || !Number.isInteger(msg.h)) return;
      this.peerHashes.set(link + ':' + msg.f, msg.h);
      this._compareHash(link, msg.f);
    } else if (msg.t === 'drop') {
      if (this.isHost || link !== 0) return;              // only the host may announce a takeover
      if (Number.isInteger(msg.p) && Number.isInteger(msg.f) && msg.f >= 0) this.setDrop(msg.p, msg.f);
    }
  }

  _remoteInput(p, f, bits) {
    const m = this.rin[p];
    if (f <= this.conf[p] || m.has(f)) return;
    m.set(f, bits);
    while (m.has(this.conf[p] + 1)) this.conf[p]++;
    const u = this.used.get(f);
    if (u !== undefined && u[p] !== bits) this.dirty = this.dirty === null ? f : Math.min(this.dirty, f);
  }

  // From frame f on, fighter p is a CPU. (Host decides f and tells everyone, so all peers flip on the same frame.)
  setDrop(p, f) {
    if (p < 0 || p >= this.n || p === this.local || !this.human[p] || this.drop[p] !== undefined) return;
    this.drop[p] = f;
    if (f < this.frame) this.dirty = this.dirty === null ? f : Math.min(this.dirty, f);
  }

  // host only: a guest's connection died
  linkClosed(p) {
    if (!this.isHost || this.drop[p] !== undefined || !this.human[p]) return;
    const f = this.conf[p] + 1;
    this.setDrop(p, f);
    this.links = this.links.filter((L) => L !== p);
    for (const L of this.links) this.send(L, { t: 'drop', p, f });
  }

  // apply any pending correction without advancing time (used when a match ends / in tests)
  settle() { if (this.dirty !== null) this._rollback(this.dirty); }

  // ---- one tick of the local clock (call at 60 Hz) ---------------------------------------------
  // Returns 'advanced' | 'stalled' | 'throttled'.
  tick(localBits, now = 0) {
    if (this.dirty !== null) this._rollback(this.dirty);

    // too far ahead of the slowest human's confirmed input -> wait for the network
    const c = this.confirmed();
    if (c !== Infinity && this.frame - c > this.maxRollback) { this.stats.stalls++; this.stallRun++; this._flush(now); return 'stalled'; }
    this.stallRun = 0;

    // gentle clock sync: guests drop an occasional tick if they run ahead of the host
    if (!this.isHost && this.peerFrame[0] !== undefined) {
      const oneWay = this.rtt / 2 / (1000 / 60);
      const lead = this.frame - (this.peerFrame[0] + oneWay + (now - this.peerFrameAt[0]) / (1000 / 60));
      this.lead += (lead - this.lead) * 0.1;
      if (this.lead > 1.5) {
        this.skipAcc += Math.min(0.5, (this.lead - 1.5) * 0.12);
        if (this.skipAcc >= 1) { this.skipAcc -= 1; this.stats.throttled++; this._flush(now); return 'throttled'; }
      }
    }

    this.lin.set(this.lNext, localBits | 0);
    this.lNext++;
    this._flush(now);
    this._advance();
    this._maybeHash();
    this._cleanup();
    return 'advanced';
  }

  _advance() {
    this.snaps.set(this.frame, this.clone(this.state));
    this._simulate(this.frame);
    this.frame++;
  }

  _simulate(f) {
    const inputs = new Array(this.n);
    for (let p = 0; p < this.n; p++) inputs[p] = this._input(p, f);
    this.used.set(f, inputs.slice());
    this.step(this.state, inputs);
    if (f > this.presented) { this.presented = f; if (this.onEvents) this.onEvents(this.state.ev, f); }
  }

  _rollback(f0) {
    const snap = this.snaps.get(f0);
    this.dirty = null;
    if (!snap) { this._fail('missing snapshot for frame ' + f0); return; }
    const target = this.frame;
    this.state = this.clone(snap);
    for (let f = f0; f < target; f++) {
      if (f > f0) this.snaps.set(f, this.clone(this.state));
      this._simulate(f);
    }
    const depth = target - f0;
    this.stats.rollbacks++; this.stats.resimFrames += depth; this.stats.lastDepth = depth;
    if (depth > this.stats.maxDepth) this.stats.maxDepth = depth;
  }

  _fail(msg) { this.desynced = true; if (this.onDesync) this.onDesync(msg); }

  // ---- outbound ---------------------------------------------------------------------------------
  _flush(now) {
    if (!this.send) return;
    const k = new Array(this.n).fill(-1);
    for (let p = 0; p < this.n; p++) k[p] = p === this.local ? this.lNext - 1 : (this.human[p] ? this.conf[p] : -1);
    for (const L of this.links) {
      const A = this.ack[L], o = [];
      const origins = this.isHost ? [this.local, ...this.remotes().filter((q) => q !== L)] : [this.local];
      for (const q of origins) {
        const start = Math.max(A[q] + 1, 0);
        const end = q === this.local ? this.lNext - 1 : this.conf[q];       // relay only what is contiguously confirmed
        const first = Math.max(start, end - WINDOW + 1);
        if (end < first) continue;
        const a = [];
        for (let f = first; f <= end; f++) a.push(q === this.local ? this.lin.get(f) | 0 : this.rin[q].get(f) | 0);
        o.push({ p: q, s: first, a });
      }
      this.send(L, { t: 'i', o, k, fr: this.frame });
    }
  }

  // ---- desync detection -------------------------------------------------------------------------
  _maybeHash() {
    if (!this.links.length) return;
    const c = this.confirmed();
    const F = Math.floor((Math.min(c, this.frame - 1) + 1) / 60) * 60;
    if (F <= this.lastHashed || F > this.frame || this.dirty !== null) return;
    const snap = this.snaps.get(F);
    if (!snap) return;
    this.lastHashed = F;
    const h = this.hash(snap);
    this.hashes.set(F, h);
    for (const L of this.links) { this.send(L, { t: 'h', f: F, h }); this._compareHash(L, F); }
  }

  _compareHash(L, F) {
    const mine = this.hashes.get(F), theirs = this.peerHashes.get(L + ':' + F);
    if (mine === undefined || theirs === undefined) return;
    if (mine !== theirs) { if (!this.desynced) this._fail('state hash mismatch at frame ' + F); }
    else this.stats.hashOk++;
    this.peerHashes.delete(L + ':' + F);
    if (F < this.lastHashed - 600) this.hashes.delete(F);
  }

  _cleanup() {
    const c = this.confirmed();
    const keep = (c === Infinity ? this.frame : Math.min(c, this.frame)) - 2;
    for (const [k] of this.snaps) if (k < keep) this.snaps.delete(k);
    for (const [k] of this.used) if (k < keep) this.used.delete(k);
    const hist = this.frame - HISTORY;
    for (const m of [this.lin, ...this.rin]) for (const [k] of m) if (k < hist) m.delete(k);
  }
}
