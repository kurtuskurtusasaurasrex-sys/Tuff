// Headless checks for the deterministic simulation: determinism, sanity (no NaN), full AI matches, balance stats.
// run:  node tests/sim.test.mjs
import { createState, step, hashState, cloneState } from '../game/js/sim.js';
import { makeAI } from '../game/js/ai.js';
import { ARENA } from '../game/js/config.js';

let failures = 0;
const ok = (c, msg) => { if (!c) { failures++; console.log('  FAIL:', msg); } else console.log('  ok  :', msg); };

function hasNaN(o) {
  if (typeof o === 'number') return !Number.isFinite(o);
  if (o && typeof o === 'object') for (const k in o) if (hasNaN(o[k])) return true;
  return false;
}

function runMatch(chars, lv, seed, maxFrames = 60 * 130) {
  const s = createState({ seed, chars });
  const ai = [makeAI(lv[0], seed * 3 + 1), makeAI(lv[1], seed * 7 + 2)];
  const stat = { frames: 0, hits: 0, blocks: 0, parries: 0, kos: [0, 0], supers: 0, breaks: 0, dmg: [0, 0], nan: false, log: [] };
  const inputs = [];
  while (s.phase !== 'over' && stat.frames < maxFrames) {
    const b = [ai[0](s, 0), ai[1](s, 1)];
    inputs.push(b);
    step(s, b);
    for (const e of s.ev) {
      if (e.t === 'hit') { stat.hits++; stat.dmg[e.a] += e.dmg; }
      else if (e.t === 'block') stat.blocks++;
      else if (e.t === 'parry') stat.parries++;
      else if (e.t === 'ko') stat.kos[e.i]++;
      else if (e.t === 'super') stat.supers++;
      else if (e.t === 'break') stat.breaks++;
    }
    if (stat.frames % 600 === 0 && hasNaN(s)) { stat.nan = true; break; }
    stat.frames++;
  }
  stat.final = s;
  stat.inputs = inputs;
  return stat;
}

console.log('determinism');
{
  const a = runMatch(['sans', 'papyrus'], [2, 2], 11, 3000);
  const s2 = createState({ seed: 11, chars: ['sans', 'papyrus'] });
  for (const b of a.inputs) step(s2, b);
  ok(hashState(s2) === hashState(a.final), 'replaying identical inputs gives an identical state hash');
  const c = cloneState(a.final);
  ok(hashState(c) === hashState(a.final), 'structuredClone round-trips the state exactly');
}

console.log('AI matches (all pairings, 3 seeds each)');
const pairs = [['sans', 'sans'], ['papyrus', 'papyrus'], ['sans', 'papyrus'], ['papyrus', 'sans']];
const win = { sans: 0, papyrus: 0, draw: 0 };
let longest = 0, shortest = 1e9, tot = 0, n = 0;
for (const p of pairs) {
  for (let seed = 1; seed <= 3; seed++) {
    const r = runMatch(p, [2, 2], seed);
    const s = r.final;
    if (r.nan) ok(false, `NaN in ${p} seed ${seed}`);
    if (s.phase !== 'over') ok(false, `match ${p} seed ${seed} did not finish in time (phase ${s.phase}, t=${s.timer}, stocks ${s.fighters.map(f => f.stocks)})`);
    const w = s.winner < 0 ? 'draw' : p[s.winner];
    win[w]++;
    longest = Math.max(longest, r.frames); shortest = Math.min(shortest, r.frames); tot += r.frames; n++;
    console.log(`   ${p.join(' v ').padEnd(16)} seed ${seed}: ${String(r.frames).padStart(5)}f  winner=${w.padEnd(7)} ${s.reason.padEnd(4)} stocks=${s.fighters.map(f => f.stocks)} hits=${String(r.hits).padStart(3)} blk=${r.blocks} prry=${r.parries} sup=${r.supers} brk=${r.breaks} KOs=${r.kos}`);
  }
}
console.log(`   avg match ${(tot / n / 60).toFixed(1)}s (min ${(shortest / 60).toFixed(1)}s, max ${(longest / 60).toFixed(1)}s); wins`, win);
ok(!Object.values(win).every((v) => v === 0), 'matches complete');

console.log(failures ? `\n${failures} FAILED` : '\nall good');
process.exit(failures ? 1 : 0);
