// Match controller: owns the simulation (or the rollback session), the CPU, effects and the render loop.

import { createState, step, cloneState, hashState } from './sim.js';
import { Rollback } from './rollback.js';
import { makeAI } from './ai.js';
import { Input } from './input.js';
import { Fx } from './fx.js';
import { NET, RULES } from './config.js';
import { CHARS } from './chars/index.js';

const STEP = 1000 / 60;

export class Game {
  constructor(renderer) {
    this.r = renderer;
    this.fx = new Fx();
    this.mode = 'idle';           // 'idle' | 'demo' | 'cpu' | 'local' | 'online'
    this.s = null; this.session = null; this.ai = null;
    this.acc = 0; this.last = 0; this.paused = false; this.running = false;
    this.onOver = null; this.onDesync = null;
    this.over = false; this.debug = false; this.hud = true;
    this.stats = null;
    this.localIdx = 0;
    this.link = null;
    this.names = null;
    this.debugInputs = null;      // test hook: (state, b0, b1) => [b0, b1]
  }

  get state() { return this.session ? this.session.state : this.s; }

  _resetStats() {
    this.stats = [0, 1].map(() => ({ hits: 0, dmg: 0, kos: 0, supers: 0, parries: 0, maxCombo: 0 }));
  }

  _events(ev, s) {
    for (const e of ev) {
      if (e.t === 'hit') { const a = this.stats[e.a]; a.hits++; a.dmg += e.dmg; }
      else if (e.t === 'ko') this.stats[1 - e.i].kos++;
      else if (e.t === 'super') this.stats[e.i].supers++;
      else if (e.t === 'parry') this.stats[e.i].parries++;
    }
    for (const f of s.fighters) this.stats[f.i].maxCombo = Math.max(this.stats[f.i].maxCombo, f.hits);
    this.fx.handle(ev, s);
  }

  _begin(mode) {
    this.mode = mode; this.over = false; this.paused = false;
    this._resetStats(); this.fx.reset(); this.fx.quiet = mode === 'demo';
    this.hud = mode !== 'demo';
    this.acc = 0; this.last = performance.now();
    this.overAt = 0;
  }

  // ---- starting matches ------------------------------------------------------------------------
  startOffline({ mode, chars, level = 1, seed = (Date.now() & 0x7fffffff) || 1 }) {
    this.session = null; this.link = null;
    this._begin(mode);
    this.s = createState({ seed, chars });
    this.ai = [null, null];
    if (mode === 'demo') { this.ai = [makeAI(2, seed + 1), makeAI(2, seed + 2)]; }
    else if (mode === 'cpu') this.ai = [null, makeAI(level, seed + 3)];
    this.labels = mode === 'local' ? ['P1', 'P2'] : mode === 'cpu' ? ['YOU', 'CPU'] : null;
    this.names = null; this.localIdx = 0;
    this.chars = chars; this.cfg = { mode, chars, level };
  }

  startOnline({ link, localIdx, chars, seed, delay, seconds }) {
    this.link = link; this.ai = [null, null]; this.s = null;
    this._begin('online');
    this.localIdx = localIdx;
    const sess = new Rollback({
      createState: () => createState({ seed, chars, seconds: seconds || RULES.seconds }), step, clone: cloneState, hash: hashState,
      local: localIdx, delay: delay || NET.inputDelay, maxRollback: NET.maxRollback,
      send: (m) => link.send(m),
      onEvents: (ev) => this._events(ev, sess.state),
      onDesync: (why) => { if (this.onDesync) this.onDesync(why); },
    });
    this.session = sess;
    this.labels = [0, 1].map((i) => (i === localIdx ? 'YOU' : 'OPP'));
    this.chars = chars;
  }

  // network messages for the rollback session
  receive(msg) { if (this.session) this.session.receive(msg, performance.now()); }

  stop() { this.mode = 'idle'; this.session = null; this.s = null; this.over = false; }
  pause(v) { this.paused = v; this.last = performance.now(); }

  // ---- main loop (call from requestAnimationFrame) ---------------------------------------------
  frame(ts) {
    const dt = Math.min(100, ts - this.last); this.last = ts;
    if (this.mode === 'idle' || !this.state) { this.r.ctx.fillStyle = '#05060f'; this.r.ctx.fillRect(0, 0, 1000, 667); return; }
    if (!this.paused) this.acc += dt;
    let n = 0;
    while (this.acc >= STEP && n < 5) { this.acc -= STEP; n++; this.tick(ts); }
    if (n === 5) this.acc = 0;
    const s = this.state;
    const sess = this.session;
    this.r.draw(s, this.fx, {
      hud: this.hud, labels: this.hud ? this.labels : null, debug: this.debug,
      netInfo: sess && this.link ? `PING ${Math.round(this.link.rtt)}ms  PREDICT ${sess.predicted}f  ROLLBACK ${sess.stats.lastDepth}f` : null,
      netBad: sess ? (this.link.rtt > 160 || sess.predicted >= NET.maxRollback - 1) : false,
      debugText: this.debug && sess ? [`frame ${sess.frame} rConf ${sess.rConf} lead ${sess.lead.toFixed(2)}`, `rollbacks ${sess.stats.rollbacks} max ${sess.stats.maxDepth} stall ${sess.stats.stalls} thr ${sess.stats.throttled}`] : null,
    });
  }

  tick(now) {
    if (this.session) {
      if (this.session.desynced) return;
      // when the peer's connection has gone, stop feeding the session
      const r = this.session.tick(Input.bits(-1), now);
      if (r === 'advanced') this.fx.update(this.session.state);
    } else {
      const s = this.s;
      let b0, b1;
      if (this.mode === 'local') { b0 = Input.bits(0); b1 = Input.bits(1); }
      else if (this.mode === 'demo') { b0 = this.ai[0](s, 0); b1 = this.ai[1](s, 1); }
      else { b0 = Input.bits(-1); b1 = this.ai[1](s, 1); }
      if (this.debugInputs) [b0, b1] = this.debugInputs(s, b0, b1);
      step(s, [b0, b1]);
      this._events(s.ev, s);
      this.fx.update(s);
    }
    const s = this.state;
    if (s.phase === 'over') {
      if (!this.overAt) this.overAt = s.frame;
      if (!this.over && s.frame - this.overAt > 150) {
        this.over = true;
        if (this.onOver) this.onOver(s, this.stats);
      }
      if (this.mode === 'demo' && s.frame - this.overAt > 200) this.startOffline({ mode: 'demo', chars: randomPair() });
    }
  }
}

export function randomPair() {
  const ids = Object.keys(CHARS);
  return [ids[Math.random() * ids.length | 0], ids[Math.random() * ids.length | 0]];
}
