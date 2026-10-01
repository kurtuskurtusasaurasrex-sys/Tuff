// Rollback netcode (GGPO-style) for a deterministic 2-player simulation.
//
// Each peer simulates every frame immediately using its own input + a *prediction* of the opponent's input
// (their last confirmed one). When the real input arrives and differs from the prediction, we rewind to the saved
// snapshot of that frame and re-simulate up to "now" - invisible to the player apart from tiny corrections.
//
// Transport is injected (`send`), so this file has no DOM / network dependency and is unit-tested in Node.

export class Rollback {
  constructor({ createState, step, clone, hash, local, delay = 2, maxRollback = 10, send, onEvents, onDesync }) {
    this.step = step; this.clone = clone; this.hash = hash;
    this.local = local; this.remote = 1 - local;
    this.delay = delay; this.maxRollback = maxRollback;
    this.send = send; this.onEvents = onEvents; this.onDesync = onDesync;

    this.state = createState();
    this.frame = 0;                      // next frame to simulate
    this.snaps = new Map();              // frame -> state *before* simulating that frame
    this.lin = new Map();                // local inputs by frame
    this.rin = new Map();                // confirmed remote inputs by frame
    this.used = new Map();               // remote input that was actually used for a simulated frame
    for (let f = 0; f < delay; f++) { this.lin.set(f, 0); this.rin.set(f, 0); }
    this.lNext = delay;                  // next frame a freshly sampled local input will be assigned to
    this.rConf = delay - 1;              // highest frame with contiguous confirmed remote input
    this.peerAck = delay - 1;            // highest of OUR frames the peer has confirmed to us
    this.dirty = null;                   // earliest frame whose remote prediction turned out wrong
    this.presented = -1;                 // last frame whose events were handed to the presentation layer

    // diagnostics
    this.stats = { rollbacks: 0, resimFrames: 0, maxDepth: 0, stalls: 0, throttled: 0, lastDepth: 0 };
    this.rtt = 0;                        // ms, set by the transport
    this.peerFrame = null; this.peerFrameAt = 0;
    this.lead = 0;                       // smoothed frames we are ahead of the peer
    this.skipAcc = 0;
    this.hashes = new Map(); this.peerHashes = new Map(); this.lastHashed = 0;
    this.desynced = false;
  }

  // ---- inbound -------------------------------------------------------------------------------
  receive(msg, now = 0) {
    if (!msg || typeof msg !== 'object') return;          // never trust the wire: validate everything
    if (msg.t === 'i') {
      const a = msg.a;
      if (!Array.isArray(a) || a.length > 128 || !Number.isInteger(msg.s) || msg.s < 0) return;
      for (let k = 0; k < a.length; k++) {
        const f = msg.s + k;
        if (Number.isInteger(a[k]) && f <= this.frame + 256) this._remoteInput(f, a[k] & 127);
      }
      if (Number.isInteger(msg.k) && msg.k > this.peerAck && msg.k < this.lNext) this.peerAck = msg.k;
      if (Number.isFinite(msg.fr)) { this.peerFrame = msg.fr; this.peerFrameAt = now; }
    } else if (msg.t === 'h') {
      if (!Number.isInteger(msg.f) || !Number.isInteger(msg.h)) return;
      this.peerHashes.set(msg.f, msg.h);
      this._compareHash(msg.f);
    }
  }

  _remoteInput(f, bits) {
    if (f <= this.rConf || this.rin.has(f)) return;
    this.rin.set(f, bits);
    while (this.rin.has(this.rConf + 1)) this.rConf++;
    const u = this.used.get(f);
    if (u !== undefined && u !== bits) this.dirty = this.dirty === null ? f : Math.min(this.dirty, f);
  }

  _predict(f) {
    const v = this.rin.get(f);
    return v !== undefined ? v : (this.rin.get(this.rConf) | 0);
  }

  // apply any pending correction without advancing time (used when a match ends / in tests)
  settle() { if (this.dirty !== null) this._rollback(this.dirty); }

  // ---- one tick of the local clock (call at 60 Hz) -----------------------------------------
  // Returns 'advanced' | 'stalled' | 'throttled'.
  tick(localBits, now = 0) {
    if (this.dirty !== null) this._rollback(this.dirty);

    // too far ahead of confirmed remote input -> wait for the network
    if (this.frame - this.rConf > this.maxRollback) { this.stats.stalls++; this._flush(now); return 'stalled'; }

    // gentle clock sync: if we are consistently ahead of the peer, drop an occasional tick
    if (this.peerFrame !== null) {
      const oneWay = this.rtt / 2 / (1000 / 60);
      const lead = this.frame - (this.peerFrame + oneWay + (now - this.peerFrameAt) / (1000 / 60));
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
    const mine = this.lin.get(f) | 0;
    const theirs = this._predict(f);
    this.used.set(f, theirs);
    const inputs = this.local === 0 ? [mine, theirs] : [theirs, mine];
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

  // ---- outbound ------------------------------------------------------------------------------
  _flush(now) {
    if (!this.send) return;
    const start = Math.max(this.peerAck + 1, this.lNext - 64);
    const a = [];
    for (let f = start; f < this.lNext; f++) a.push(this.lin.get(f) | 0);
    this.send({ t: 'i', s: start, a, k: this.rConf, fr: this.frame });
  }

  // ---- desync detection ----------------------------------------------------------------------
  _maybeHash() {
    const F = Math.floor((this.rConf + 1) / 60) * 60;
    if (F <= this.lastHashed || F > this.frame || this.dirty !== null) return;
    const snap = this.snaps.get(F);
    if (!snap) return;
    this.lastHashed = F;
    const h = this.hash(snap);
    this.hashes.set(F, h);
    if (this.send) this.send({ t: 'h', f: F, h });
    this._compareHash(F);
  }

  _compareHash(F) {
    const mine = this.hashes.get(F), theirs = this.peerHashes.get(F);
    if (mine === undefined || theirs === undefined) return;
    if (mine !== theirs) { if (!this.desynced) this._fail('state hash mismatch at frame ' + F); }
    else this.stats.hashOk = (this.stats.hashOk || 0) + 1;
    this.hashes.delete(F); this.peerHashes.delete(F);
  }

  _cleanup() {
    const keep = this.rConf - 2;
    for (const m of [this.snaps, this.rin, this.used]) for (const k of m.keys()) if (k < keep) m.delete(k);
    for (const k of this.lin.keys()) if (k < this.peerAck - 4) this.lin.delete(k);
  }

  // frames of correction currently being predicted (for the net-quality display)
  get predicted() { return Math.max(0, this.frame - 1 - this.rConf); }
}
