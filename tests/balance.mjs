// Prints how much damage % a victim needs before each move sends them off the slab.
// Handy when tuning knockback numbers in game/js/chars/*.js.   run: node tests/balance.mjs
import { createState, step } from '../game/js/sim.js';
import { ARENA, IN } from '../game/js/config.js';
import { CHARS } from '../game/js/chars/index.js';

const midY = (ARENA.y0 + ARENA.y1) / 2, midX = (ARENA.x0 + ARENA.x1) / 2;

function trial(atk, vic, bits, dmg, dirKey, meter = 0) {
  const s = createState({ seed: 3, chars: [atk, vic] });
  s.phase = 'fight'; s.phaseT = 0;
  const a = s.fighters[0], v = s.fighters[1];
  // attacker stands left of centre (hit travels toward the right edge) or above centre (travels toward the front edge)
  if (dirKey === 'x') { a.x = midX - 60; a.y = midY; v.x = a.x + 50; v.y = midY; }
  else { a.x = midX; a.y = midY - 50; v.x = midX; v.y = a.y + 50; }
  v.dmg = dmg; a.meter = meter;
  let ko = false, maxd = 0;
  const x0 = v.x, y0 = v.y;
  for (let f = 0; f < 240; f++) {
    const inp = f >= 1 && f < 4 ? bits : 0;
    step(s, [inp, 0]);
    maxd = Math.max(maxd, Math.hypot(v.x - x0, v.y - y0));
    if (s.ev.some((e) => e.t === 'ko')) { ko = true; break; }
  }
  return { ko, dist: maxd };
}

const moves = (dirKey) => {
  const R = dirKey === 'x' ? IN.R : IN.D;
  return [['jab1', IN.ATK], ['strike', IN.ATK | R], ['special', IN.SPC], ['spcDir', IN.SPC | R], ['super', IN.SPC]];
};
for (const dirKey of ['x', 'y']) {
  console.log(`\n=== launched toward the ${dirKey === 'x' ? 'SIDE edge (from just left of centre)' : 'FRONT edge (from just behind centre)'} ===`);
  for (const [atk, vic] of [['sans', 'papyrus'], ['papyrus', 'sans'], ['sans', 'sans'], ['papyrus', 'papyrus']]) {
    const row = [];
    for (const [mv, bits] of moves(dirKey)) {
      let thr = null;
      for (let d = 0; d <= 300; d += 10) { const r = trial(atk, vic, bits, d, dirKey, mv === 'super' ? 100 : 0); if (r.ko) { thr = d; break; } }
      row.push(`${mv}:${thr === null ? '  -  ' : String(thr).padStart(3) + '%'}`);
    }
    console.log(`${atk.padEnd(8)} -> ${vic.padEnd(8)}  ${row.join('  ')}`);
  }
}
