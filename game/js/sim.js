// Deterministic fight simulation. No DOM, no Math.random, no trig - only + - * / sqrt - so two browsers
// running the same inputs produce bit-identical states (required for rollback netcode).
//
// Public API:  createState(opts) -> state ;  step(state, [bits0, bits1]) ;  cloneState ; hashState
// All of `state` is plain JSON-able data (numbers / strings / arrays / objects).

import { ARENA, IN, RULES, WALK, LEDGE } from './config.js';
import { CHARS } from './chars/index.js';

const BUF = 8;               // input buffer (frames)
const PARRY = 6;             // perfect-guard window (frames after raising guard)
const LAUNCH_SPEED = 7.5;    // knockback speed above which a hit launches instead of flinching
const DODGE_FRAMES = 22;
const SQ2 = 0.7071067811865476;
const VKB = 0.5;              // depth is shallower than the arena is wide, so launches along it are damped

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
function norm(x, y, fx, fy) {
  const l = Math.sqrt(x * x + y * y);
  return l > 1e-6 ? [x / l, y / l] : [fx, fy];
}
function segDist2(x1, y1, x2, y2, px, py) {
  const dx = x2 - x1, dy = y2 - y1, l2 = dx * dx + dy * dy;
  let t = l2 > 0 ? ((px - x1) * dx + (py - y1) * dy) / l2 : 0;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  const cx = x1 + dx * t - px, cy = y1 + dy * t - py;
  return cx * cx + cy * cy;
}

// ------------------------------------------------------------------------------------------ setup
export function createState({ seed = 1, chars = ['sans', 'papyrus'], stocks = RULES.stocks, seconds = RULES.seconds } = {}) {
  const s = {
    frame: 0, rng: (seed | 0) || 1, phase: 'intro', phaseT: 0, timer: seconds * 60, hitstop: 0, cut: null,
    winner: -1, reason: '', fighters: [], projs: [], ev: [], nid: 1,
  };
  s.fighters.push(newFighter(0, chars[0], stocks));
  s.fighters.push(newFighter(1, chars[1], stocks));
  return s;
}

function spawnPoint(i) {
  const w = ARENA.x1 - ARENA.x0;
  return [ARENA.x0 + w * (i === 0 ? 0.3 : 0.7), (ARENA.y1 - ARENA.y0) / 2];
}

function newFighter(i, char, stocks) {
  const [x, y] = spawnPoint(i);
  return {
    i, char, x, y, vx: 0, vy: 0, face: i === 0 ? 1 : -1,
    st: 'idle', sf: 0, stun: 0, inv: 0,
    dmg: 0, stocks, meter: 0, gd: 100, gdT: 0, dcd: 0, brk: 0, dx: 0, dy: 0,
    mv: '', mf: 0, maimx: i === 0 ? 1 : -1, maimy: 0, hitMask: 0, connected: 0, chain: 0,
    in: 0, pr: 0, sx: 0, sy: 0, bAtk: 0, bSpc: 0, bGrd: 0,
    combo: 0, hits: 0, hitsT: 0, lastHit: 0,
  };
}

export const cloneState = (s) => structuredClone(s);

export function hashState(s) {
  const str = JSON.stringify([s.frame, s.rng, s.phase, s.phaseT, s.timer, s.hitstop, s.winner, s.fighters, s.projs]);
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}

// ------------------------------------------------------------------------------------------ main step
export function step(s, inputs) {
  s.ev = [];
  for (let i = 0; i < 2; i++) readInput(s.fighters[i], inputs[i] | 0);

  if (s.hitstop > 0) {                       // impact freeze (also used for the Super cut-in)
    s.hitstop--;
    if (s.hitstop === 0) s.cut = null;
    s.frame++;
    return;
  }

  if (s.phase === 'intro') {
    s.phaseT++;
    if (s.phaseT === 1) s.ev.push({ t: 'ready' });
    if (s.phaseT === RULES.introFrames - 12) s.ev.push({ t: 'fight' });
    simulate(s, false);
    if (s.phaseT >= RULES.introFrames) { s.phase = 'fight'; s.phaseT = 0; }
  } else if (s.phase === 'fight') {
    s.phaseT++;
    if (--s.timer <= 0) { s.timer = 0; timeUp(s); }
    simulate(s, true);
  } else {
    s.phaseT++;
    simulate(s, false);
  }
  s.frame++;
}

function simulate(s, live) {
  const [a, b] = s.fighters;
  updateFighter(s, a, b, live);
  updateFighter(s, b, a, live);
  updateProjs(s);
  if (live) resolveHits(s);
  separate(s);
}

function readInput(f, bits) {
  f.pr = bits & ~f.in;
  f.in = bits;
  if (f.pr & IN.ATK) f.bAtk = BUF;
  if (f.pr & IN.SPC) f.bSpc = BUF;
  if (f.pr & IN.GRD) f.bGrd = BUF;
  f.sx = ((bits & IN.R) ? 1 : 0) - ((bits & IN.L) ? 1 : 0);
  f.sy = ((bits & IN.D) ? 1 : 0) - ((bits & IN.U) ? 1 : 0);
}

// ------------------------------------------------------------------------------------------ fighters
function updateFighter(s, f, o, live) {
  const C = CHARS[f.char];
  f.sf++;
  if (f.inv > 0) f.inv--;
  if (f.bAtk > 0) f.bAtk--;
  if (f.bSpc > 0) f.bSpc--;
  if (f.bGrd > 0) f.bGrd--;
  if (f.dcd > 0) f.dcd--;
  if (f.hitsT > 0 && --f.hitsT === 0) f.hits = 0;
  if (f.meter < 100) f.meter = Math.min(100, f.meter + 0.015);
  if (f.st !== 'guard' && f.gd < 100) f.gd = Math.min(100, f.gd + 0.35);
  if (!live) { f.bAtk = 0; f.bSpc = 0; f.bGrd = 0; f.sx = 0; f.sy = 0; }

  switch (f.st) {
    case 'idle': case 'walk': return actionable(s, f, o, C, live);
    case 'atk': return doMove(s, f, o, C);
    case 'guard': return doGuard(s, f, o, C);
    case 'dodge': return doDodge(s, f, o, C);
    case 'hurt': case 'launch': case 'gbreak': return doStun(s, f, o, C);
    case 'fall': return doFall(s, f);
    case 'spawn': if (f.sf >= RULES.spawnFrames) { f.st = 'idle'; f.sf = 0; } return;
    case 'win': f.vx *= 0.8; f.vy *= 0.8; return;
    case 'dead': return;
  }
}

function keepIn(f, rate) {
  const tx = clamp(f.x, ARENA.x0 + WALK.mx, ARENA.x1 - WALK.mx);
  const ty = clamp(f.y, ARENA.y0 + WALK.top, ARENA.y1 - WALK.bot);
  f.x += clamp(tx - f.x, -rate, rate);
  f.y += clamp(ty - f.y, -rate, rate);
}

function actionable(s, f, o, C, live) {
  const moving = f.sx !== 0 || f.sy !== 0;
  if (f.bGrd > 0 || (f.in & IN.GRD)) {
    if (moving && f.bGrd > 0 && f.dcd === 0) return startDodge(s, f, 0);
    if (f.in & IN.GRD) return startGuard(f);
  }
  if (f.bSpc > 0) {
    const ok = startSpecial(s, f, o, C);
    f.bSpc = 0;
    if (ok) return;
  }
  if (f.bAtk > 0) { f.bAtk = 0; return startAttack(s, f, o, C); }

  const sp = C.speed;
  let tx = 0, ty = 0;
  if (moving) {
    const k = (f.sx !== 0 && f.sy !== 0) ? SQ2 : 1;
    tx = f.sx * sp * k; ty = f.sy * sp * k;
    f.st = 'walk';
    if (f.sx !== 0) f.face = f.sx;
  } else {
    f.st = 'idle';
    if (Math.abs(o.x - f.x) > 10) f.face = o.x > f.x ? 1 : -1;
  }
  f.vx += (tx - f.vx) * 0.45; f.vy += (ty - f.vy) * 0.45;
  if (!moving && Math.abs(f.vx) < 0.05 && Math.abs(f.vy) < 0.05) { f.vx = 0; f.vy = 0; }
  f.x += f.vx; f.y += f.vy;
  keepIn(f, 4);
}

function startGuard(f) { f.st = 'guard'; f.gdT = 0; f.sf = 0; }

function startDodge(s, f, brk) {
  const [dx, dy] = norm(f.sx, f.sy, f.face, 0);
  f.st = 'dodge'; f.sf = 0; f.dx = dx; f.dy = dy; f.brk = brk; f.bGrd = 0;
  if (dx !== 0) f.face = dx > 0 ? 1 : -1;
  s.ev.push({ t: brk ? 'break' : 'dodge', i: f.i, x: f.x, y: f.y });
}

function doGuard(s, f, o, C) {
  f.gdT++;
  f.vx *= 0.8; f.vy *= 0.8;
  f.x += f.vx; f.y += f.vy; keepIn(f, 99);
  if (!(f.in & IN.GRD)) { f.st = 'idle'; f.sf = 0; return; }
  f.gd -= 0.12;
  if (f.gd <= 0) { f.gd = 0; f.st = 'gbreak'; f.sf = 0; f.stun = 100; s.ev.push({ t: 'gbreak', i: f.i, x: f.x, y: f.y }); return; }
  if ((f.sx !== 0 || f.sy !== 0) && f.gdT >= 3 && f.dcd === 0) startDodge(s, f, 0);
}

function doDodge(s, f, o, C) {
  const k = f.sf;
  const total = f.brk ? 26 : DODGE_FRAMES;
  const top = f.brk ? 12 : 9.5;
  if (f.brk ? k < 24 : (k >= 3 && k < 15)) f.inv = Math.max(f.inv, 2);
  const v = top * Math.max(0, 1 - k / total);
  f.vx = f.dx * v; f.vy = f.dy * v;
  f.x += f.vx; f.y += f.vy; keepIn(f, 99);
  if (k >= total) {
    f.st = 'idle'; f.sf = 0; f.dcd = f.brk ? 0 : 10; f.brk = 0;
    if (f.in & IN.GRD) startGuard(f);
  }
}

function doStun(s, f, o, C) {
  // Break (costs half the meter): cancel hit-stun and fly back toward the middle of the slab
  if ((f.st === 'hurt' || f.st === 'launch') && f.bGrd > 0 && f.meter >= 50 && f.sf >= 3) {
    f.meter -= 50; f.stun = 0; f.combo = 0;
    const cx = (ARENA.x0 + ARENA.x1) / 2, cy = (ARENA.y0 + ARENA.y1) / 2;
    const [dx, dy] = norm(cx - f.x, cy - f.y, f.face, 0);
    f.sx = 0; f.sy = 0;
    f.st = 'dodge'; f.sf = 0; f.dx = dx; f.dy = dy; f.brk = 1; f.bGrd = 0; f.inv = 26;
    s.ev.push({ t: 'break', i: f.i, x: f.x, y: f.y });
    return;
  }
  f.stun--;
  const fr = f.st === 'launch' ? 0.945 : f.st === 'hurt' ? 0.86 : 0.8;
  f.vx *= fr; f.vy *= fr;
  f.x += f.vx; f.y += f.vy;
  if (f.st !== 'gbreak') {
    if (outside(f)) return startFall(s, f);
  } else keepIn(f, 99);
  if (f.stun <= 0) { f.st = 'idle'; f.sf = 0; f.combo = 0; }
}

function outside(f) {
  return f.x < ARENA.x0 - LEDGE.x || f.x > ARENA.x1 + LEDGE.x || f.y < ARENA.y0 - LEDGE.y || f.y > ARENA.y1 + LEDGE.y;
}

function startFall(s, f) {
  f.st = 'fall'; f.sf = 0; f.stocks--; f.combo = 0; f.mv = '';
  s.hitstop = Math.max(s.hitstop, 16);
  s.ev.push({ t: 'ko', i: f.i, x: f.x, y: f.y, dx: f.vx, dy: f.vy });
}

function doFall(s, f) {
  f.x += f.vx; f.y += f.vy;
  f.vx *= 1.012; f.vy *= 1.012;
  if (f.sf < RULES.fallFrames) return;
  if (f.stocks > 0) {
    const [x, y] = spawnPoint(f.i);
    f.x = x; f.y = y; f.vx = 0; f.vy = 0; f.dmg = 0; f.gd = 100; f.meter = Math.min(100, f.meter + 15);
    f.st = 'spawn'; f.sf = 0; f.inv = RULES.spawnFrames + 90; f.stun = 0;
    s.ev.push({ t: 'spawn', i: f.i, x, y });
  } else {
    f.st = 'dead'; f.sf = 0;
    endMatch(s, 'ko');
  }
}

// ------------------------------------------------------------------------------------------ attacks
function aimAtOpp(f, o) { return norm(o.x - f.x, o.y - f.y, f.face, 0); }

function startAttack(s, f, o, C) {
  const moving = f.sx !== 0 || f.sy !== 0;
  if (moving) beginMove(s, f, C, 'strike', norm(f.sx, f.sy, f.face, 0));
  else { f.chain = 0; beginMove(s, f, C, 'jab1', aimAtOpp(f, o)); }
}

function startSpecial(s, f, o, C) {
  const moving = f.sx !== 0 || f.sy !== 0;
  let key, aim;
  if (moving) { key = 'spcDir'; aim = norm(f.sx, f.sy, f.face, 0); }
  else { key = f.meter >= 100 ? 'super' : 'special'; aim = aimAtOpp(f, o); }
  const spec = C.moves[key];
  if (spec.lim && s.projs.some((p) => p.o === f.i && p.k === spec.lim)) return false;
  beginMove(s, f, C, key, aim);
  return true;
}

function beginMove(s, f, C, key, aim) {
  const spec = C.moves[key];
  f.st = 'atk'; f.mv = key; f.mf = 0; f.sf = 0;
  f.maimx = aim[0]; f.maimy = aim[1]; f.hitMask = 0; f.connected = 0;
  if (Math.abs(aim[0]) > 0.25) f.face = aim[0] > 0 ? 1 : -1;
  if (f.inv > 0 && key !== 'super') f.inv = Math.min(f.inv, 20);     // acting ends spawn protection
  s.ev.push({ t: 'swing', i: f.i, mv: key, x: f.x, y: f.y });
  if (key === 'super') {
    f.meter = 0;
    s.hitstop = spec.cut; s.cut = { who: f.i, mv: key, n: spec.cut };
    s.ev.push({ t: 'super', i: f.i, x: f.x, y: f.y });
  }
}

function doMove(s, f, o, C) {
  const spec = C.moves[f.mv];
  f.mf++;
  const mf = f.mf;

  // jab chain: cancel into the next jab once the previous one connected
  if (spec.cancel && f.connected && mf >= spec.cancel[0] && mf <= spec.cancel[1] && f.bAtk > 0 && f.chain < 2) {
    f.bAtk = 0;
    f.chain++;
    const aim = (f.sx !== 0 || f.sy !== 0) ? norm(f.sx, f.sy, f.face, 0) : aimAtOpp(f, o);
    beginMove(s, f, C, 'jab' + (f.chain + 1), aim);
    return;
  }

  if (spec.inv && mf >= spec.inv[0] && mf < spec.inv[1]) f.inv = Math.max(f.inv, 2);
  if (spec.ev) for (const e of spec.ev) if (e.f === mf) doEvent(s, f, o, e);

  // movement: lunges and the spin charge, otherwise slide to a stop
  let mvx = 0, mvy = 0, driven = false;
  if (spec.lunge) for (const [a, b, sp] of spec.lunge) if (mf >= a && mf < b) { mvx = f.maimx * sp; mvy = f.maimy * sp; driven = true; }
  if (spec.spin && mf >= spec.spin.f0 && mf < spec.spin.f1) {
    const k = 1 - 0.5 * (mf - spec.spin.f0) / (spec.spin.f1 - spec.spin.f0);
    mvx = f.maimx * spec.spin.speed * k; mvy = f.maimy * spec.spin.speed * k; driven = true;
  }
  if (driven) { f.vx = mvx; f.vy = mvy; } else { f.vx *= 0.7; f.vy *= 0.7; }
  f.x += f.vx; f.y += f.vy; keepIn(f, 99);

  if (mf >= spec.len) { f.st = 'idle'; f.mv = ''; f.sf = 0; f.chain = 0; }
}

function spawnProj(s, p) {
  p.id = s.nid++; p.t = 0; p.hit = [];
  s.projs.push(p);
  return p;
}
const hcopy = (h) => ({ dmg: h.dmg, kb: h.kb, kbs: h.kbs, stun: h.stun, hs: h.hs, gd: h.gd, ang: h.ang, fx: h.fx || '' });

function doEvent(s, f, o, e) {
  const ax = f.maimx, ay = f.maimy;
  switch (e.do) {
    case 'telegraph': case 'shock':
      s.ev.push({ t: e.do, i: f.i, x: f.x + ax * (e.reach || 0), y: f.y + ay * (e.reach || 0), r: e.r });
      break;
    case 'beam': {
      const x = f.x - ax * e.back, y = f.y - ay * e.back;
      spawnProj(s, { o: f.i, k: 'beam', x, y, vx: 0, vy: 0, dx: ax, dy: ay, mo: e.mo, bl: e.bl, r: e.r, a0: e.warm, a1: e.warm + e.fire,
        life: e.warm + e.fire + 10, spr: e.spr, h: hcopy(e.h) });
      s.ev.push({ t: 'blaster', i: f.i, x, y, dx: ax, dy: ay, warm: e.warm });
      break;
    }
    case 'ring': {
      const D = [[SQ2, SQ2], [-SQ2, SQ2], [-SQ2, -SQ2], [SQ2, -SQ2]];
      for (let k = 0; k < e.n; k++) {
        const x = o.x + D[k][0] * e.dist, y = o.y + D[k][1] * e.dist;
        const [dx, dy] = norm(o.x - x, o.y - y, 1, 0);
        const warm = e.warm + k * e.stag;
        spawnProj(s, { o: f.i, k: 'beam', x, y, vx: 0, vy: 0, dx, dy, mo: 24, bl: e.bl, r: e.r, a0: warm, a1: warm + e.fire,
          life: warm + e.fire + 10, spr: e.spr, h: hcopy(e.h) });
        s.ev.push({ t: 'blaster', i: f.i, x, y, dx, dy, warm });
      }
      break;
    }
    case 'tele': {
      const x0 = f.x, y0 = f.y;
      f.x = clamp(f.x + ax * e.dist, ARENA.x0 + WALK.mx, ARENA.x1 - WALK.mx);
      f.y = clamp(f.y + ay * e.dist, ARENA.y0 + WALK.top, ARENA.y1 - WALK.bot);
      s.ev.push({ t: 'tele', i: f.i, x0, y0, x: f.x, y: f.y });
      break;
    }
    case 'orb':
      spawnProj(s, { o: f.i, k: 'orb', x: f.x + ax * e.off, y: f.y + ay * e.off, vx: ax * e.speed, vy: ay * e.speed, dx: ax, dy: ay,
        r: e.r, a0: 0, a1: e.life, life: e.life, spr: 'orb', h: hcopy(e.h), once: 1 });
      s.ev.push({ t: 'orb', i: f.i, x: f.x, y: f.y });
      break;
    case 'bonelines': {
      const px = -ay, py = ax;
      for (let l = 0; l < e.lines; l++) {
        const off = (l - (e.lines - 1) / 2) * e.spacing;
        for (let k = 0; k < e.n; k++) {
          const d = 52 + k * e.step;
          const a0 = e.warn + k * e.every;
          spawnProj(s, { o: f.i, k: 'burst', x: f.x + ax * d + px * off, y: f.y + ay * d + py * off, vx: 0, vy: 0, dx: ax, dy: ay,
            r: e.r, a0, a1: a0 + e.life, life: a0 + e.life + 8, spr: 'bone', h: hcopy(e.h) });
        }
      }
      s.ev.push({ t: 'bonelines', i: f.i, x: f.x, y: f.y });
      break;
    }
  }
}

function updateProjs(s) {
  for (const p of s.projs) {
    p.t++;
    if (p.vx !== 0 || p.vy !== 0) { p.x += p.vx; p.y += p.vy; }
    if (p.t === p.a0 && p.k !== 'orb') s.ev.push({ t: p.k === 'beam' ? 'fire' : 'erupt', x: p.x, y: p.y, dx: p.dx, dy: p.dy, o: p.o });
    if (p.k === 'orb' && (p.x < ARENA.x0 - 140 || p.x > ARENA.x1 + 140 || p.y < -160 || p.y > ARENA.y1 + 160)) p.dead = true;
    if (p.t >= p.life) p.dead = true;
  }
  if (s.projs.some((p) => p.dead)) s.projs = s.projs.filter((p) => !p.dead);
}

// ------------------------------------------------------------------------------------------ hits
function resolveHits(s) {
  const cand = [];
  for (const A of s.fighters) {
    if (A.st !== 'atk') continue;
    const spec = CHARS[A.char].moves[A.mv];
    if (!spec.hits) continue;
    for (const h of spec.hits) {
      if (A.mf < h.f0 || A.mf >= h.f1 || (A.hitMask & (1 << h.g))) continue;
      const cx = A.x + A.maimx * h.reach, cy = A.y + A.maimy * h.reach;
      cand.push({ atk: A.i, tgt: 1 - A.i, h, x1: cx, y1: cy, x2: cx + A.maimx * h.len, y2: cy + A.maimy * h.len, r: h.r,
        ax: A.maimx, ay: A.maimy, ox: A.x, oy: A.y, g: h.g, p: null });
    }
  }
  for (const p of s.projs) {
    if (p.t < p.a0 || p.t >= p.a1) continue;
    const tgt = 1 - p.o;
    if (p.hit.indexOf(tgt) >= 0) continue;
    let x1 = p.x, y1 = p.y, x2 = p.x, y2 = p.y;
    if (p.k === 'beam') { x1 = p.x + p.dx * p.mo; y1 = p.y + p.dy * p.mo; x2 = x1 + p.dx * p.bl; y2 = y1 + p.dy * p.bl; }
    cand.push({ atk: p.o, tgt, h: p.h, x1, y1, x2, y2, r: p.r, ax: p.dx, ay: p.dy, ox: x1, oy: y1, g: -1, p });
  }
  const landed = [];
  for (const c of cand) {
    const T = s.fighters[c.tgt];
    if (T.inv > 0 || T.st === 'fall' || T.st === 'spawn' || T.st === 'dead' || T.st === 'win') continue;
    const hr = CHARS[T.char].hr + c.r;
    if (segDist2(c.x1, c.y1, c.x2, c.y2, T.x, T.y) > hr * hr) continue;
    if (c.g >= 0) s.fighters[c.atk].hitMask |= (1 << c.g);
    else { c.p.hit.push(c.tgt); if (c.p.once) c.p.life = c.p.t + 1; }
    landed.push(c);
  }
  for (const c of landed) applyHit(s, c);
}

function applyHit(s, c) {
  const T = s.fighters[c.tgt], A = s.fighters[c.atk], h = c.h;
  const away = norm(T.x - c.ox, T.y - c.oy, c.ax, c.ay);
  let kx, ky;
  if (h.ang === 'aim') { kx = c.ax; ky = c.ay; }
  else if (h.ang === 'away') { kx = away[0]; ky = away[1]; }
  else { [kx, ky] = norm(c.ax * 0.6 + away[0] * 0.4, c.ay * 0.6 + away[1] * 0.4, c.ax, c.ay); }
  A.connected = 1;

  if (T.st === 'guard') {
    if (T.gdT <= PARRY) {                                   // perfect guard: attacker is staggered
      T.meter = Math.min(100, T.meter + 10); T.gd = Math.min(100, T.gd + 12);
      if (c.atk !== c.tgt && A.st !== 'fall') { A.st = 'hurt'; A.sf = 0; A.stun = 26; A.mv = ''; A.vx = -kx * 2.5; A.vy = -ky * 2.5; }
      s.hitstop = Math.max(s.hitstop, 12);
      s.ev.push({ t: 'parry', i: T.i, x: T.x, y: T.y });
      return;
    }
    T.gd -= h.gd; T.dmg = Math.min(999, T.dmg + h.dmg * 0.1);
    T.vx = kx * h.kb * 0.35; T.vy = ky * h.kb * 0.35 * VKB;
    T.meter = Math.min(100, T.meter + 3); A.meter = Math.min(100, A.meter + 3);
    s.hitstop = Math.max(s.hitstop, 4);
    s.ev.push({ t: 'block', i: T.i, x: T.x, y: T.y, dx: kx, dy: ky });
    if (T.gd <= 0) { T.gd = 0; T.st = 'gbreak'; T.sf = 0; T.stun = 100; s.ev.push({ t: 'gbreak', i: T.i, x: T.x, y: T.y }); }
    return;
  }

  const scale = Math.max(0.35, 1 - 0.1 * T.combo);
  const dmg = h.dmg * scale;
  T.dmg = Math.min(999, T.dmg + dmg);
  const speed = (h.kb + h.kbs * T.dmg) / CHARS[T.char].weight;
  A.meter = Math.min(100, A.meter + dmg * 1.3 + 1.5);
  T.meter = Math.min(100, T.meter + dmg * 0.8);
  A.hits++; A.hitsT = 100; A.lastHit = s.frame;
  T.combo++;
  T.mv = ''; T.vx = kx * speed; T.vy = ky * speed * VKB;
  T.st = speed >= LAUNCH_SPEED ? 'launch' : 'hurt';
  T.sf = 0;
  T.stun = Math.max(6, h.stun - T.combo) + Math.floor(speed * 0.5);
  if (Math.abs(kx) > 0.2) T.face = kx > 0 ? -1 : 1;           // victim looks back toward the attacker
  s.hitstop = Math.max(s.hitstop, h.hs);
  s.ev.push({ t: 'hit', i: T.i, a: c.atk, x: T.x, y: T.y, dx: kx, dy: ky, p: speed < 5 ? 1 : speed < 10 ? 2 : 3, fx: h.fx, dmg: Math.round(dmg * 10) / 10 });
}

// ------------------------------------------------------------------------------------------ misc
function separate(s) {
  const [a, b] = s.fighters;
  const ok = (f) => f.st === 'idle' || f.st === 'walk' || f.st === 'guard' || f.st === 'atk' || f.st === 'gbreak';
  if (!ok(a) || !ok(b)) return;
  const min = CHARS[a.char].hr + CHARS[b.char].hr;
  let dx = b.x - a.x, dy = b.y - a.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d >= min) return;
  if (d < 1e-4) { dx = 1; dy = 0; } else { dx /= d; dy /= d; }
  const push = (min - d) / 2;
  a.x -= dx * push; a.y -= dy * push; b.x += dx * push; b.y += dy * push;
  keepIn(a, 99); keepIn(b, 99);
}

function timeUp(s) {
  s.ev.push({ t: 'time' });
  endMatch(s, 'time');
}

function endMatch(s, reason) {
  if (s.phase === 'over') return;
  const [a, b] = s.fighters;
  let w = -1;
  if (reason === 'ko') {
    if (a.stocks > 0 && b.stocks <= 0) w = 0; else if (b.stocks > 0 && a.stocks <= 0) w = 1;
  } else if (a.stocks !== b.stocks) w = a.stocks > b.stocks ? 0 : 1;
  else if (a.dmg !== b.dmg) w = a.dmg < b.dmg ? 0 : 1;
  s.phase = 'over'; s.phaseT = 0; s.winner = w; s.reason = reason;
  for (const f of s.fighters) {
    if (f.i === w) { f.st = 'win'; f.sf = 0; f.mv = ''; f.inv = 9999; }
    else if (f.st === 'fall' && f.stocks > 0) { const [x, y] = spawnPoint(f.i); f.x = x; f.y = y; f.st = 'idle'; f.vx = 0; f.vy = 0; }
  }
  s.ev.push({ t: 'end', winner: w, reason });
}

// helpers for UI / AI
export const isActionable = (f) => f.st === 'idle' || f.st === 'walk';
export { PARRY, LAUNCH_SPEED };
