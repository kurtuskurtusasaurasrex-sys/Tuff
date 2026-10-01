// CPU opponent. Reads the sim state and produces the same 7-bit input a human would.
// Used for "VS CPU" and by the headless balance/fuzz tests. Not part of the deterministic sim (never used online).

import { ARENA, IN } from './config.js';
import { CHARS } from './chars/index.js';

const LEVELS = [
  { name: 'EASY',   react: 16, aggr: 0.30, guard: 0.18, spec: 0.20, brk: 0.15 },
  { name: 'NORMAL', react: 9,  aggr: 0.55, guard: 0.40, spec: 0.35, brk: 0.45 },
  { name: 'HARD',   react: 4,  aggr: 0.80, guard: 0.65, spec: 0.50, brk: 0.80 },
];
export const AI_LEVELS = LEVELS.map((l) => l.name);

export function makeAI(level = 1, seed = 1) {
  const L = LEVELS[Math.max(0, Math.min(2, level))];
  let rng = (seed * 2654435761) >>> 0 || 1;
  const rand = () => { rng ^= rng << 13; rng >>>= 0; rng ^= rng >>> 17; rng ^= rng << 5; rng >>>= 0; return rng / 4294967296; };

  const st = { wait: 0, hold: 0, bits: 0, guardT: 0, tap: 0, tapBits: 0, strafe: 1, strafeT: 0 };

  function think(s, f, o, C) {
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
    if (edgeish && rand() < 0.7 && d > 40) { toward(mx - f.x, my - f.y); return { bits, hold: 8 }; }

    // react to an incoming attack
    const threat = o.st === 'atk' && d < 150 && o.mf < 14;
    if (threat && rand() < L.guard) {
      if (rand() < 0.5) { st.guardT = 18; return { bits: IN.GRD, hold: 4 }; }
      // roll sideways in depth
      bits = IN.GRD | (dy > 0 ? IN.U : IN.D) | (dx > 0 ? IN.L : IN.R);
      st.tap = 2; st.tapBits = bits;
      return { bits: 0, hold: 14 };
    }

    // super whenever it is ready and the opponent is not right on top of us
    if (f.meter >= 100 && d > 70 && rand() < 0.7) { st.tap = 2; st.tapBits = IN.SPC; return { bits: 0, hold: 20 }; }

    const aligned = Math.abs(dy) < 20;
    if (d < melee + 24 && aligned) {
      if (rand() < L.aggr) {
        if (rand() < 0.22) { toward(dx, dy); st.tap = 2; st.tapBits = bits | IN.ATK; }         // heavy
        else { st.tap = 2; st.tapBits = IN.ATK; }
        return { bits: 0, hold: 6 + (rand() * 6 | 0) };
      }
      toward(-dx * 0.2, 0);
      return { bits, hold: 5 };
    }

    // specials at range
    if (aligned || d > 200) {
      if (d > 130 && d < 460 && rand() < L.spec * 0.5) { st.tap = 2; st.tapBits = IN.SPC; return { bits: 0, hold: 22 }; }
      if (C.id === 'papyrus' && d > 80 && d < 230 && rand() < L.spec * 0.35) {
        toward(dx, dy); st.tap = 2; st.tapBits = bits | IN.SPC; return { bits: 0, hold: 26 };
      }
    }

    // close the distance (fix depth first so attacks line up)
    if (Math.abs(dy) > 16 && d < 220) toward(0, dy);
    else toward(dx, dy * 0.6);
    // occasional strafe in depth
    if (rand() < 0.15) { bits &= ~(IN.U | IN.D); bits |= rand() < 0.5 ? IN.U : IN.D; }
    return { bits, hold: 3 + (rand() * 4 | 0) };
  }

  return function aiBits(s, idx) {
    if (s.phase !== 'fight') return 0;
    const f = s.fighters[idx], o = s.fighters[1 - idx], C = CHARS[f.char];
    if (st.tap > 0) { st.tap--; return st.tapBits; }                      // pulse a button for a couple of frames
    if (st.guardT > 0 && f.st !== 'atk') { st.guardT--; return IN.GRD; }

    // hit-stun: break out if we have the meter
    if ((f.st === 'hurt' || f.st === 'launch') && f.meter >= 50 && f.sf >= 3 && f.sf < 8 && rand() < L.brk) { st.tap = 2; st.tapBits = IN.GRD; return 0; }
    // jab chain
    if (f.st === 'atk') {
      const spec = C.moves[f.mv];
      if (spec.cancel && f.connected && f.mf >= spec.cancel[0] - 1 && f.mf <= spec.cancel[1] && rand() < 0.7 * L.aggr + 0.2) { st.tap = 1; st.tapBits = IN.ATK; }
      return 0;
    }
    if (f.st !== 'idle' && f.st !== 'walk' && f.st !== 'guard') return 0;

    if (st.wait > 0) { st.wait--; return st.bits; }
    const r = think(s, f, o, C);
    st.bits = r.bits; st.wait = Math.max(L.react, 1) > r.hold ? Math.max(r.hold, 2) : r.hold;
    return st.bits;
  };
}
