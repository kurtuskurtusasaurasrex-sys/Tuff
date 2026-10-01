// Presentation layer: turns sim events into particles, screen shake, banners and sound.
// None of this feeds back into the simulation, so it can run (and be wrong) without affecting determinism.

import { ASPECT, W, toScreenY, ARENA } from './config.js';
import { Sound } from './audio.js';
import { CHARS } from './chars/index.js';

const rng = (() => { let s = 7; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); })();

export class Fx {
  constructor() {
    this.list = [];
    this.shake = 0;
    this.flash = 0; this.flashColor = '#fff';
    this.banner = null;                 // {text, t, dur, color, size}
    this.flashFighter = [0, 0, 0, 0];   // frames of white-flash left per fighter
    this.trail = [[], [], [], []];
    this.koSlow = 0;
    this.quiet = false;
  }

  snd(name, o) { if (!this.quiet) Sound.play(name, o); }

  reset() { this.list = []; this.shake = 0; this.flash = 0; this.banner = null; this.flashFighter = [0, 0, 0, 0]; this.trail = [[], [], [], []]; }

  say(text, { dur = 70, color = '#fff', size = 48 } = {}) { this.banner = { text, t: 0, dur, color, size }; }

  handle(events, s) {
    for (const e of events) {
      switch (e.t) {
        case 'ready': this.say('READY?', { dur: 80, size: 56, color: '#9fe8ff' }); this.snd('count'); break;
        case 'fight': this.say('FIGHT!', { dur: 60, size: 72, color: '#ffe066' }); this.snd('fight'); break;
        case 'time': this.say('TIME UP!', { dur: 100, size: 64, color: '#ffe066' }); break;
        case 'end': {
          const w = e.winner;
          this.say(w < 0 ? 'DRAW' : 'GAME!', { dur: 130, size: 72, color: '#ffe066' });
          this.snd('win');
          break;
        }
        case 'ballspawn': this.ring(e.x, e.y, 60, '#ffffff', 26); this.say('SMASH BALL!', { dur: 60, size: 24, color: '#ffe066' }); this.snd('spawn'); break;
        case 'ballhit': this.sparks(e.x, e.y, 2, 'zap', 0, 0); this.snd('parry', { vol: 0.8, rate: 1.4 }); break;
        case 'ballbreak': this.ring(e.x, e.y, 120, '#ffe066', 30); this.sparks(e.x, e.y, 3, 'zap', 0, 0); this.shake = Math.max(this.shake, 9); this.flash = 6; this.flashColor = '#fff6c0'; this.say('SUPER READY!', { dur: 70, size: 32, color: '#ffe066' }); this.snd('super', { vol: 0.8, rate: 1.3 }); break;
        case 'ballgone': this.poof(e.x, e.y); break;
        case 'hazard': this.snd('stomp', { vol: 0.5, rate: 0.7 }); this.shake = Math.max(this.shake, 3); break;
        case 'swing': {
          const heavy = !/^jab/.test(e.mv);
          if (e.mv === 'spcDir' || e.mv === 'special' || e.mv === 'super') break;
          this.snd(heavy ? 'swingH' : 'swingL', { rate: 0.9 + rng() * 0.25 });
          break;
        }
        case 'hit': {
          this.sparks(e.x, e.y, e.p, e.fx, e.dx, e.dy);
          this.flashFighter[e.i] = 4 + e.p * 2;
          this.shake = Math.max(this.shake, e.p === 1 ? 2 : e.p === 2 ? 5 : 11);
          this.snd(e.p === 1 ? 'hit1' : e.p === 2 ? 'hit2' : 'hit3', { rate: 0.95 + rng() * 0.12 });
          if (e.fx === 'bone' || e.fx === 'zap') this.snd(e.fx === 'zap' ? 'zap' : 'bone', { vol: 0.7 });
          if (e.p === 3) this.speedLines(e.x, e.y, e.dx, e.dy);
          break;
        }
        case 'block': this.sparkBlue(e.x, e.y); this.snd('block'); this.shake = Math.max(this.shake, 2); break;
        case 'parry': this.ring(e.x, e.y - 28, 56, '#9fe8ff', 18); this.say('PERFECT!', { dur: 36, size: 24, color: '#9fe8ff' }); this.snd('parry'); this.flash = 6; this.flashColor = '#bff3ff'; break;
        case 'gbreak': this.ring(e.x, e.y - 28, 70, '#ff7a7a', 22); this.say('GUARD BREAK!', { dur: 50, size: 24, color: '#ff9a9a' }); this.snd('gbreak'); this.shake = Math.max(this.shake, 6); break;
        case 'dodge': this.dust(e.x, e.y, 5); this.snd('dodge'); break;
        case 'break': this.ring(e.x, e.y - 28, 80, '#ffe066', 22); this.say('BREAK!', { dur: 40, size: 24, color: '#ffe066' }); this.snd('break'); this.flash = 5; this.flashColor = '#fff3b0'; break;
        case 'tele': this.poof(e.x0, e.y0); this.poof(e.x, e.y); this.snd('tele'); break;
        case 'shock': this.ring(e.x, e.y, e.r, '#ffffff', 24); this.dust(e.x, e.y, 14); this.snd('stomp'); this.shake = Math.max(this.shake, 8); break;
        case 'telegraph': this.ring(e.x, e.y, e.r, 'rgba(120,200,255,0.8)', 12); break;
        case 'blaster': this.snd('charge', { rate: Math.max(0.6, Math.min(1.4, 26 / Math.max(10, e.warm))) }); break;
        case 'fire': this.snd('blaster'); this.shake = Math.max(this.shake, 6); this.flash = Math.max(this.flash, 3); this.flashColor = '#ffffff'; break;
        case 'orb': this.snd('orb'); break;
        case 'erupt': this.snd('bone', { rate: 0.8 + rng() * 0.4, vol: 0.55 }); this.dust(e.x, e.y, 3); break;
        case 'bonelines': break;
        case 'super': this.snd('super'); break;
        case 'spawn': this.ring(e.x, e.y, 46, '#9fe8ff', 26); this.snd('spawn'); break;
        case 'ko': this.koBurst(e, s); break;
      }
    }
  }

  // ---- constructors --------------------------------------------------------------------------
  _add(o) { this.list.push(o); return o; }

  sparks(x, y, power, kind, dx, dy) {
    const n = 5 + power * 4, sy = toScreenY(y) - 30;
    this._add({ k: 'star', x, y: sy, t: 0, dur: 8 + power * 3, size: 14 + power * 10, color: kind === 'zap' ? '#9fe8ff' : '#fff7c2' });
    for (let i = 0; i < n; i++) {
      const a = rng() * Math.PI * 2, sp = 2 + rng() * (2 + power * 2);
      this._add({ k: 'px', x, y: sy, vx: Math.cos(a) * sp + dx * power, vy: Math.sin(a) * sp * 0.8 - 1, t: 0, dur: 12 + (rng() * 10 | 0), color: rng() < 0.5 ? '#ffffff' : '#ffd84d', g: 0.12, size: 3 });
    }
  }
  sparkBlue(x, y) {
    const sy = toScreenY(y) - 30;
    this._add({ k: 'star', x, y: sy, t: 0, dur: 9, size: 20, color: '#9fe8ff' });
    for (let i = 0; i < 6; i++) { const a = rng() * 6.28; this._add({ k: 'px', x, y: sy, vx: Math.cos(a) * 3, vy: Math.sin(a) * 2.5, t: 0, dur: 12, color: '#bfeaff', g: 0, size: 3 }); }
  }
  speedLines(x, y, dx, dy) {
    const sy = toScreenY(y) - 30;
    for (let i = 0; i < 7; i++) this._add({ k: 'line', x: x - dx * (20 + i * 12), y: sy + (rng() - 0.5) * 50, dx, dy: dy * ASPECT, len: 40 + rng() * 50, t: 0, dur: 10 });
  }
  ring(x, y, r, color, dur) { this._add({ k: 'ring', x, y: toScreenY(y), r, t: 0, dur, color }); }
  dust(x, y, n) {
    const sy = toScreenY(y);
    for (let i = 0; i < n; i++) { const a = rng() * Math.PI * 2; this._add({ k: 'px', x: x + Math.cos(a) * 14, y: sy, vx: Math.cos(a) * 1.4, vy: -0.4 - rng() * 1.2, t: 0, dur: 18 + (rng() * 10 | 0), color: '#dfe9ff', g: 0.02, size: 6 }); }
  }
  poof(x, y) {
    const sy = toScreenY(y) - 20;
    this._add({ k: 'ring', x, y: sy, r: 34, t: 0, dur: 14, color: '#9fe8ff' });
    for (let i = 0; i < 12; i++) { const a = rng() * Math.PI * 2, sp = 1 + rng() * 3; this._add({ k: 'px', x, y: sy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, t: 0, dur: 16, color: i % 2 ? '#ffffff' : '#7fd0ff', g: 0, size: 6 }); }
  }
  koBurst(e, s) {
    // where did the fighter cross the edge of the screen? march along the launch direction until off-screen
    let x = e.x, y = toScreenY(e.y);
    const l = Math.hypot(e.dx, e.dy * ASPECT) || 1;
    const dx = e.dx / l, dy = e.dy * ASPECT / l;
    for (let i = 0; i < 80 && x > 30 && x < W - 30 && y > 30 && y < 637; i++) { x += dx * 20; y += dy * 20; }
    x = Math.max(24, Math.min(W - 24, x)); y = Math.max(24, Math.min(643, y));
    this._add({ k: 'star', x, y, t: 0, dur: 30, size: 120, color: '#ffffff' });
    this._add({ k: 'ring', x, y, r: 150, t: 0, dur: 30, color: '#ffe066' });
    for (let i = 0; i < 26; i++) { const a = rng() * 6.28, sp = 3 + rng() * 9; this._add({ k: 'px', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, t: 0, dur: 30 + (rng() * 20 | 0), color: rng() < 0.5 ? '#fff' : '#ffd84d', g: 0.05, size: 6 }); }
    this.shake = 18; this.flash = 8; this.flashColor = '#ffffff';
    this.say('KO!', { dur: 60, size: 96, color: '#ff5a5a' });
    this.snd('ko');
  }

  // ---- per-frame -----------------------------------------------------------------------------
  update(s) {
    if (this.shake > 0) this.shake = Math.max(0, this.shake - 0.9);
    if (this.flash > 0) this.flash--;
    for (let i = 0; i < 4; i++) if (this.flashFighter[i] > 0) this.flashFighter[i]--;
    if (this.banner && ++this.banner.t > this.banner.dur) this.banner = null;
    for (const p of this.list) {
      p.t++;
      if (p.k === 'px') { p.x += p.vx; p.y += p.vy; p.vy += p.g || 0; }
    }
    this.list = this.list.filter((p) => p.t < p.dur);
    if (s) {
      for (let i = 0; i < s.fighters.length; i++) {
        const f = s.fighters[i], tr = this.trail[i];
        if (f.st === 'launch' || (f.st === 'dodge')) { tr.push({ x: f.x, y: f.y }); if (tr.length > 5) tr.shift(); }
        else if (tr.length) tr.shift();
      }
    }
  }

  // ---- drawing ---------------------------------------------------------------------------------
  draw(ctx) {
    for (const p of this.list) {
      const k = p.t / p.dur;
      switch (p.k) {
        case 'px': ctx.globalAlpha = 1 - k * k; ctx.fillStyle = p.color; ctx.fillRect(Math.round(p.x / 3) * 3, Math.round(p.y / 3) * 3, p.size, p.size); break;
        case 'star': {
          const sz = p.size * (k < 0.3 ? 0.4 + k * 2 : 1 - (k - 0.3) * 0.9);
          ctx.globalAlpha = 1 - k * 0.5; ctx.fillStyle = p.color;
          const u = 3, h = Math.round(sz / u) * u;
          ctx.fillRect(p.x - u, p.y - h, u * 2, h * 2); ctx.fillRect(p.x - h, p.y - u, h * 2, u * 2);
          const d = Math.round(h * 0.6 / u) * u;
          for (let i = u; i <= d; i += u) { ctx.fillRect(p.x + i - u, p.y + i - u, u, u); ctx.fillRect(p.x - i, p.y + i - u, u, u); ctx.fillRect(p.x + i - u, p.y - i, u, u); ctx.fillRect(p.x - i, p.y - i, u, u); }
          break;
        }
        case 'ring': {
          ctx.globalAlpha = 1 - k; ctx.strokeStyle = p.color; ctx.lineWidth = 4 * (1 - k) + 1;
          ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r * (0.25 + k * 0.75), p.r * ASPECT * (0.25 + k * 0.75), 0, 0, Math.PI * 2); ctx.stroke(); break;
        }
        case 'line': {
          ctx.globalAlpha = 0.8 * (1 - k); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.dx * p.len * (1 - k), p.y - p.dy * p.len * (1 - k)); ctx.stroke(); break;
        }
      }
    }
    ctx.globalAlpha = 1;
  }
}
