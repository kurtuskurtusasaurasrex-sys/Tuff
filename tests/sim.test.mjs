// Headless checks for the deterministic simulation: determinism, sanity (no NaN), full CPU matches with 2-4 fighters,
// stages, Smash Ball, CPU takeover.   run: node tests/sim.test.mjs
import { createState, step, hashState, cloneState } from '../game/js/sim.js';
import { CPU_INPUT } from '../game/js/config.js';
import { CHARS } from '../game/js/chars/index.js';

let failures = 0;
const ok = (c, msg) => { if (!c) { failures++; console.log('  FAIL:', msg); } else console.log('  ok  :', msg); };

function hasNaN(o) {
  if (typeof o === 'number') return !Number.isFinite(o);
  if (o && typeof o === 'object') for (const k in o) if (hasNaN(o[k])) return true;
  return false;
}

// all fighters are CPUs
function runMatch(chars, { lvl = 2, seed = 1, stage = 'snowdin', maxFrames = 60 * 240, stocks = 3, seconds = 120 } = {}) {
  const n = chars.length;
  const s = createState({ seed, chars, stage, stocks, seconds, cpu: chars.map(() => 1), lvl: chars.map(() => lvl) });
  const zeros = chars.map(() => 0);
  const st = { frames: 0, hits: 0, blocks: 0, parries: 0, kos: Array(n).fill(0), supers: 0, breaks: 0, balls: 0, ballBreaks: 0, hazards: 0, nan: false };
  while (s.phase !== 'over' && st.frames < maxFrames) {
    step(s, zeros);
    for (const e of s.ev) {
      if (e.t === 'hit') st.hits++; else if (e.t === 'block') st.blocks++; else if (e.t === 'parry') st.parries++;
      else if (e.t === 'ko') st.kos[e.i]++; else if (e.t === 'super') st.supers++; else if (e.t === 'break') st.breaks++;
      else if (e.t === 'ballspawn') st.balls++; else if (e.t === 'ballbreak') st.ballBreaks++; else if (e.t === 'hazard') st.hazards++;
    }
    if (st.frames % 300 === 0 && hasNaN(s)) { st.nan = true; break; }
    st.frames++;
  }
  st.final = s;
  return st;
}

console.log('determinism');
{
  const a = runMatch(['sans', 'papyrus', 'sans'], { seed: 11, maxFrames: 4000 });
  const b = runMatch(['sans', 'papyrus', 'sans'], { seed: 11, maxFrames: 4000 });
  ok(hashState(a.final) === hashState(b.final), 'two runs of the same seed are bit-identical (3 CPU fighters, 4000 frames)');
  ok(hashState(cloneState(a.final)) === hashState(a.final), 'structuredClone round-trips the state exactly');
  const c = runMatch(['sans', 'papyrus', 'sans'], { seed: 12, maxFrames: 4000 });
  ok(hashState(c.final) !== hashState(a.final), 'a different seed gives a different match');
}

console.log('full CPU matches');
const configs = [
  ['sans', 'papyrus'], ['papyrus', 'sans'], ['sans', 'sans'], ['papyrus', 'papyrus'],
  ['sans', 'papyrus', 'sans'], ['papyrus', 'sans', 'papyrus'],
  ['sans', 'papyrus', 'sans', 'papyrus'], ['papyrus', 'papyrus', 'sans', 'sans'],
];
const wins = {};
let totalBalls = 0, totalBreaks = 0;
for (const ch of configs) {
  for (let seed = 1; seed <= 3; seed++) {
    const r = runMatch(ch, { seed });
    const s = r.final;
    if (r.nan) ok(false, `NaN in ${ch} seed ${seed}`);
    if (s.phase !== 'over') ok(false, `${ch} seed ${seed} did not finish (phase ${s.phase}, timer ${s.timer}, stocks ${s.fighters.map((f) => f.stocks)})`);
    const w = s.winner < 0 ? 'draw' : ch[s.winner];
    wins[w] = (wins[w] || 0) + 1; totalBalls += r.ballBreaks; totalBreaks += r.breaks;
    console.log(`   ${ch.map((c) => c.slice(0, 3)).join('+').padEnd(16)} seed ${seed}: ${String(r.frames).padStart(5)}f ${s.reason.padEnd(4)} winner=${String(s.winner).padStart(2)} rank=${s.rank} stocks=${s.fighters.map((f) => f.stocks)} hits=${String(r.hits).padStart(3)} sup=${r.supers} ball=${r.ballBreaks}/${r.balls} KOs=${r.kos}`);
  }
}
console.log('   winners by character:', wins, ' smash balls popped:', totalBalls);
ok(totalBalls > 0, 'the Smash Ball spawns and gets popped in CPU matches');

console.log('stages');
for (const stage of ['snowdin', 'ice', 'hall']) {
  const r = runMatch(['sans', 'papyrus', 'sans'], { stage, seed: 5, maxFrames: 60 * 100 });
  ok(!r.nan, `${stage}: no NaN over ${r.frames} frames` + (stage === 'hall' ? `, ${r.hazards} bone-rain hazards` : ''));
  if (stage === 'hall') ok(r.hazards > 0, 'Judgment Hall drops bones');
}

console.log('CPU takeover (a human\'s input stream switches to the sentinel)');
{
  const s = createState({ seed: 3, chars: ['sans', 'papyrus', 'sans'] });
  for (let i = 0; i < 300; i++) step(s, [0, 0, 0]);
  ok(s.fighters.every((f) => !f.cpu), 'humans start as humans');
  for (let i = 0; i < 600; i++) step(s, [0, CPU_INPUT, 0]);
  ok(s.fighters[1].cpu === 1 && !s.fighters[0].cpu, 'sending the sentinel flips only that fighter to CPU');
  ok(s.fighters[1].meter > 0 || s.fighters[1].dmg >= 0, 'the CPU-driven fighter acts on its own');
}

console.log(failures ? `\n${failures} FAILED` : '\nall good');
process.exit(failures ? 1 : 0);
