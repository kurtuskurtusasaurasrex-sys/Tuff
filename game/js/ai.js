// CPU brain. A pure function of the sim state: it reads `s` and the fighter's own `f.ai` scratch data (which lives
// inside the simulation state, so it is rolled back / cloned / hashed with everything else). That is what lets CPUs
// share a netplay match - or take over for a player who disconnected - without ever desyncing.
// Only + - * / sqrt and integer xorshift are used, like the rest of the sim.

import { ARENA, IN } from './config.js';
import { CHARS } from './chars/index.js';

export const AI_LEVELS = ['EASY', 'NORMAL', 'HARD'];
const LV = [
  { react: 16, aggr: 0.30, guard: 0.18, spec: 0.20, brk: 0.15 },
  { react: 9,  aggr: 0.55, guard: 0.40, spec: 0.35, brk: 0.45 },
  { react: 4,  aggr: 0.80, guard: 0.65, spec: 0.50, brk: 0.80 },
];

export function newAi(seed) {
  return { r: (seed >>> 0) || 1, wait: 0, bits: 0, guardT: 0, tap: 0, tapBits: 0 };
}

function rnd(a) {
  let x = a.r;
  x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0;
  a.r = x;
  return x / 4294967296;
}

const foeOk = (g) => g.st !== 'dead' && g.st !== 'fall' && g.st !== 'spawn';

export function nearestFoe(s, f) {
  let best = null, bd = 1e18;
  for (const g of s.fighters) {
    if (g === f || !foeOk(g)) continue;
    const dx = g.x - f.x, dy = g.y - f.y, d = dx * dx + dy * dy;
    if (d < bd) { bd = d; best = g; }
  }
  return best;
}

export function aiBits(s, f) {
  if (s.phase !== 'fight') return 0;
  const a = f.ai, L = LV[f.lvl < 0 ? 0 : f.lvl > 2 ? 2 : f.lvl], C = CHARS[f.char];
  if (a.tap > 0) { a.tap--; return a.tapBits; }                                 // hold a button for a couple of frames
  if (a.guardT > 0 && f.st !== 'atk') { a.guardT--; return IN.GRD; }

  // knocked about with meter to spare: Break out
  if ((f.st === 'hurt' || f.st === 'launch') && f.meter >= 50 && f.sf >= 3 && f.sf < 8 && rnd(a) < L.brk) { a.tap = 2; a.tapBits = IN.GRD; return 0; }
  // keep the jab chain going
  if (f.st === 'atk') {
    const spec = C.moves[f.mv];
    if (spec.cancel && f.connected && f.mf >= spec.cancel[0] - 1 && f.mf <= spec.cancel[1] && rnd(a) < 0.7 * L.aggr + 0.2) { a.tap = 1; a.tapBits = IN.ATK; }
    return 0;
  }
  if (f.st !== 'idle' && f.st !== 'walk' && f.st !== 'guard') return 0;

  if (a.wait > 0) { a.wait--; return a.bits; }
  const r = think(s, f, C, L, a);
  a.bits = r.bits;
  a.wait = r.hold > 2 ? r.hold : 2;
  return a.bits;
}

function think(s, f, C, L, a) {
  const o = nearestFoe(s, f);
  if (!o) return { bits: 0, hold: 10 };
  const dx = o.x - f.x, dy = o.y - f.y, d = Math.sqrt(dx * dx + dy * dy);
  const melee = C.id === 'papyrus' ? 62 : 52;
  let bits = 0;
  const toward = (tx, ty) => {
    if (tx > 10) bits |= IN.R; else if (tx < -10) bits |= IN.L;
    if (ty > 8) bits |= IN.D; else if (ty < -8) bits |= IN.U;
  };

  // stay off the ledge
  const mx = (ARENA.x0 + ARENA.x1) / 2, my = (ARENA.y0 + ARENA.y1) / 2;
  const edgeish = f.x < ARENA.x0 + 90 || f.x > ARENA.x1 - 90 || f.y < 34 || f.y > ARENA.y1 - 34;
  if (edgeish && rnd(a) < 0.7 && d > 40) { toward(mx - f.x, my - f.y); return { bits, hold: 8 }; }

  // the Smash Ball: go pop it
  const ball = s.ball;
  if (ball && rnd(a) < 0.5 + 0.1 * (L.aggr * 5 | 0)) {
    const bx = ball.x - f.x, by = ball.y - f.y, bd = Math.sqrt(bx * bx + by * by);
    if (bd < 420 && d > 120) {
      if (bd < 74 && Math.abs(by) < 30) { a.tap = 2; a.tapBits = IN.ATK; return { bits: 0, hold: 8 }; }
      toward(bx, by); return { bits, hold: 6 };
    }
  }

  // react to an incoming attack
  const threat = o.st === 'atk' && d < 150 && o.mf < 14;
  if (threat && rnd(a) < L.guard) {
    if (rnd(a) < 0.5) { a.guardT = 18; return { bits: IN.GRD, hold: 4 }; }
    bits = IN.GRD | (dy > 0 ? IN.U : IN.D) | (dx > 0 ? IN.L : IN.R);
    a.tap = 2; a.tapBits = bits;
    return { bits: 0, hold: 14 };
  }

  // super whenever it is ready and the target is not right on top of us
  if (f.meter >= 100 && d > 70 && rnd(a) < 0.7) { a.tap = 2; a.tapBits = IN.SPC; return { bits: 0, hold: 20 }; }

  const aligned = Math.abs(dy) < 20;
  if (d < melee + 24 && aligned) {
    if (rnd(a) < L.aggr) {
      if (rnd(a) < 0.22) { toward(dx, dy); a.tap = 2; a.tapBits = bits | IN.ATK; }       // heavy
      else { a.tap = 2; a.tapBits = IN.ATK; }
      return { bits: 0, hold: 6 + (rnd(a) * 6 | 0) };
    }
    toward(-dx * 0.2, 0);
    return { bits, hold: 5 };
  }

  // specials at range
  if (aligned || d > 200) {
    if (d > 130 && d < 460 && rnd(a) < L.spec * 0.5) { a.tap = 2; a.tapBits = IN.SPC; return { bits: 0, hold: 22 }; }
    if (C.id === 'papyrus' && d > 80 && d < 230 && rnd(a) < L.spec * 0.35) {
      toward(dx, dy); a.tap = 2; a.tapBits = bits | IN.SPC; return { bits: 0, hold: 26 };
    }
  }

  // close the distance (fix depth first so attacks line up)
  if (Math.abs(dy) > 16 && d < 220) toward(0, dy);
  else toward(dx, dy * 0.6);
  if (rnd(a) < 0.15) { bits &= ~(IN.U | IN.D); bits |= rnd(a) < 0.5 ? IN.U : IN.D; }       // sidestep in depth
  return { bits, hold: 3 + (rnd(a) * 4 | 0) };
}
