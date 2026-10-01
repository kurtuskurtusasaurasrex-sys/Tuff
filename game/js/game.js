// Match controller: owns the simulation (or the rollback session), effects and the render loop.
//
// A match config looks like:
//   { fighters: [{ char, kind: 'human' | 'cpu', lvl, slot }], stage, stocks, seconds, seed, delay }
// Fighter index = position in that list. Humans on this machine read the keyboard/pads by ordinal; CPUs are run by the sim.

import { createState, step, cloneState, hashState } from './sim.js';
import { Rollback } from './rollback.js';
import { Input } from './input.js';
import { Fx } from './fx.js';
import { NET, RULES } from './config.js';
import { CHARS } from './chars/index.js';

const STEP = 1000 / 60;

export class Game {
  constructor(renderer) {
    this.r = renderer;
    this.fx = new Fx();
    this.mode = 'idle';           // 'idle' | 'demo' | 'offline' | 'online'
    this.s = null; this.session = null; this.cfg = null;
    this.acc = 0; this.last = 0; this.paused = false;
    this.onOver = null; this.onDesync = null; this.onDemoDone = null; this.onStallDrop = null;
    this.over = false; this.debug = false; this.hud = true;
    this.stats = null; this.labels = null; this.localIdx = -1;
    this.rttFn = null;            // () => ms, supplied by the online layer
    this.debugInputs = null;      // test hook: (state, bits[]) => bits[]
    this.humanOrd = []; this.humanCount = 0; this.overAt = 0;
  }

  get state() { return this.session ? this.session.state : this.s; }
  get n() { return this.cfg ? this.cfg.fighters.length : 0; }

  _resetStats(n) {
    this.stats = Array.from({ length: n }, () => ({ hits: 0, dmg: 0, kos: 0, supers: 0, parries: 0, maxCombo: 0, falls: 0 }));
  }

  _events(ev, s) {
    for (const e of ev) {
      if (e.t === 'hit') { const a = this.stats[e.a]; if (a) { a.hits++; a.dmg += e.dmg; } }
      else if (e.t === 'ko') { this.stats[e.i].falls++; const f = s.fighters[e.i]; if (f.lastAtk >= 0 && this.stats[f.lastAtk]) this.stats[f.lastAtk].kos++; }
      else if (e.t === 'super') this.stats[e.i].supers++;
      else if (e.t === 'parry') this.stats[e.i].parries++;
    }
    for (const f of s.fighters) if (f.best > this.stats[f.i].maxCombo) this.stats[f.i].maxCombo = f.best;
    this.fx.handle(ev, s);
  }

  _begin(mode, cfg) {
    this.mode = mode; this.cfg = cfg; this.over = false; this.paused = false; this.overAt = 0;
    this._resetStats(cfg.fighters.length);
    this.fx.reset(); this.fx.quiet = mode === 'demo';
    this.hud = mode !== 'demo';
    this.acc = 0; this.last = performance.now();
    let k = 0;
    this.humanOrd = cfg.fighters.map((f) => (f.kind === 'human' ? k++ : -1));
    this.humanCount = k;
    this.r.slotOf = cfg.fighters.map((f, i) => (f.slot === undefined ? i : f.slot));
  }

  _simOpts(cfg) {
    return {
      seed: cfg.seed, chars: cfg.fighters.map((f) => f.char), stage: cfg.stage, stocks: cfg.stocks, seconds: cfg.seconds,
      cpu: cfg.fighters.map((f) => (f.kind === 'cpu' ? 1 : 0)), lvl: cfg.fighters.map((f) => (f.lvl === undefined ? 1 : f.lvl)),
    };
  }

  // ---- starting matches ------------------------------------------------------------------------
  startOffline(cfg, mode = 'offline') {
    cfg = Object.assign({ seed: (Date.now() & 0x7fffffff) || 1, stage: 'snowdin', stocks: RULES.stocks, seconds: RULES.seconds }, cfg);
    this.session = null;
    this._begin(mode, cfg);
    this.s = createState(this._simOpts(cfg));
    this.localIdx = -1;
    this.labels = cfg.fighters.map((f, i) => (f.kind === 'cpu' ? 'CPU' : this.humanCount > 1 ? 'P' + (this.humanOrd[i] + 1) : 'YOU'));
  }

  // send(fighterIndex, msg): the transport. localIdx: my fighter. links: fighter indices I talk to directly.
  startOnline({ cfg, localIdx, links, send }) {
    this.s = null;
    this._begin('online', cfg);
    this.localIdx = localIdx;
    const sess = new Rollback({
      createState: () => createState(this._simOpts(cfg)), step, clone: cloneState, hash: hashState,
      n: cfg.fighters.length, local: localIdx, human: cfg.fighters.map((f) => f.kind === 'human'), links,
      delay: cfg.delay || NET.inputDelay, maxRollback: cfg.fighters.length > 2 ? NET.maxRollback + 4 : NET.maxRollback,
      send,
      onEvents: (ev) => this._events(ev, sess.state),
      onDesync: (why) => { if (this.onDesync) this.onDesync(why); },
    });
    this.session = sess;
    this.labels = cfg.fighters.map((f, i) => (f.kind === 'cpu' ? 'CPU' : i === localIdx ? 'YOU' : 'P' + ((f.slot === undefined ? i : f.slot) + 1)));
  }

  receive(link, msg) { if (this.session) this.session.receive(link, msg, performance.now()); }
  linkClosed(link) { if (this.session) this.session.linkClosed(link); }

  stop() { this.mode = 'idle'; this.session = null; this.s = null; this.over = false; this.cfg = null; }
  pause(v) { this.paused = v; this.last = performance.now(); }

  // ---- main loop -------------------------------------------------------------------------------
  // opts.draw=false: just advance the simulation (used by the background-tab heartbeat, so online matches never stall)
  frame(ts, { draw = true } = {}) {
    const dt = Math.min(draw ? 100 : 1000, ts - this.last); this.last = ts;
    if (this.mode === 'idle' || !this.state) {
      if (draw) { this.r.ctx.fillStyle = '#05060f'; this.r.ctx.fillRect(0, 0, 1000, 667); }
      return;
    }
    if (!this.paused) this.acc += dt;
    const maxSteps = draw ? 5 : 60;
    let n = 0;
    while (this.acc >= STEP && n < maxSteps) { this.acc -= STEP; n++; this.tick(ts); }
    if (n === maxSteps) this.acc = 0;
    if (!draw) return;
    const s = this.state, sess = this.session;
    const rtt = this.rttFn ? this.rttFn() : 0;
    this.r.draw(s, this.fx, {
      hud: this.hud, labels: this.hud ? this.labels : null, debug: this.debug,
      netInfo: sess ? `PING ${Math.round(rtt)}ms  PREDICT ${sess.predicted}f  ROLLBACK ${sess.stats.lastDepth}f` : null,
      netBad: sess ? (rtt > 160 || sess.predicted >= NET.maxRollback - 1) : false,
      debugText: this.debug && sess ? [`frame ${sess.frame} conf ${sess.confirmed()} lead ${sess.lead.toFixed(2)}`, `rollbacks ${sess.stats.rollbacks} max ${sess.stats.maxDepth} stall ${sess.stats.stalls} thr ${sess.stats.throttled}`] : null,
    });
  }

  tick(now) {
    if (this.session) {
      if (this.session.desynced) return;
      const sess = this.session;
      const r = sess.tick(Input.bits(0, 1), now);
      if (r === 'advanced') this.fx.update(sess.state);
      // someone went silent and froze the room: after 3 s the host cuts them loose (a CPU takes their fighter)
      if (sess.isHost && sess.stallRun === 180 && this.onStallDrop) this.onStallDrop(sess.slowest());
      else if (!sess.isHost && sess.stallRun === 720 && this.onDesync) this.onDesync('the host stopped responding');
    } else {
      const s = this.s;
      let bits = this.cfg.fighters.map((f, i) => (f.kind === 'human' ? Input.bits(this.humanOrd[i], this.humanCount) : 0));
      if (this.debugInputs) bits = this.debugInputs(s, bits);
      step(s, bits);
      this._events(s.ev, s);
      this.fx.update(s);
    }
    const s = this.state;
    if (s.phase === 'over') {
      if (!this.overAt) this.overAt = s.frame;
      if (!this.over && s.frame - this.overAt > 170) {
        this.over = true;
        if (this.onOver) this.onOver(s, this.stats);
      }
      if (this.mode === 'demo' && s.frame - this.overAt > 220 && this.onDemoDone) this.onDemoDone();
    }
  }
}

export function randomChar() {
  const ids = Object.keys(CHARS);
  return ids[Math.random() * ids.length | 0];
}
