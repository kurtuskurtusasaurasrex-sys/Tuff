// Two Rollback sessions talk through a simulated bad network (latency, jitter, packet loss, reordering,
// clock offset + drift). After N frames both must hold the exact same state as a lag-free reference simulation.
// run:  node tests/rollback.test.mjs
import { createState, step, hashState, cloneState } from '../game/js/sim.js';
import { Rollback } from '../game/js/rollback.js';
import { makeAI } from '../game/js/ai.js';
import { IN } from '../game/js/config.js';

let failures = 0;
const ok = (c, msg) => { if (!c) { failures++; console.log('  FAIL:', msg); } else console.log('  ok  :', msg); };

function lcg(seed) { let s = seed >>> 0 || 1; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); }

// a busy, deterministic "player": mashes buttons and wanders (independent of the sim state so inputs are scripted)
function script(p, n) {
  const r = lcg(1000 + p * 77);
  const out = [];
  let held = 0, hold = 0;
  for (let i = 0; i < n; i++) {
    if (hold-- <= 0) {
      held = 0;
      const x = r();
      if (x < 0.30) held |= IN.R; else if (x < 0.55) held |= IN.L;
      const y = r(); if (y < 0.2) held |= IN.U; else if (y < 0.4) held |= IN.D;
      if (r() < 0.35) held |= IN.ATK;
      if (r() < 0.15) held |= IN.SPC;
      if (r() < 0.12) held |= IN.GRD;
      hold = 1 + (r() * 14 | 0);
    }
    out.push(held);
  }
  return out;
}

function runNet({ latency, jitter, loss, offsetB, driftB = 0, frames, seed, delay = 2, maxRollback = 10, chars = ['sans', 'papyrus'] }) {
  const rnd = lcg(seed);
  const mk = (local) => new Rollback({
    createState: () => createState({ seed: 99, chars }), step, clone: cloneState, hash: hashState, local, delay, maxRollback,
    send: (m) => queue.push({ at: now + latency + (rnd() * 2 - 1) * jitter, to: 1 - local, m: JSON.parse(JSON.stringify(m)), lost: rnd() < loss }),
  });
  let now = 0;
  const queue = [];
  const S = [mk(0), mk(1)];
  S[0].rtt = S[1].rtt = latency * 2;
  const sc = [script(0, frames + 50), script(1, frames + 50)];
  const nextTick = [0, offsetB];
  const ticks = [0, 0];
  const step_ms = [1000 / 60, 1000 / 60 + driftB];
  let guard = 0;
  while ((S[0].frame < frames || S[1].frame < frames) && guard++ < 2e6) {
    // next event: a tick of a session that still needs frames, or a message delivery
    let best = null;
    for (let p = 0; p < 2; p++) if (S[p].frame < frames && (best === null || nextTick[p] < best.at)) best = { at: nextTick[p], kind: 'tick', p };
    queue.sort((a, b) => a.at - b.at);
    const q = queue.find((x) => true);
    if (q && (best === null || q.at <= best.at)) { queue.shift(); now = Math.max(now, q.at); if (!q.lost) S[q.to].receive(q.m, now); continue; }
    if (!best) break;
    now = Math.max(now, best.at);
    const p = best.p;
    const res = S[p].tick(sc[p][ticks[p]] | 0, now);
    if (res === 'advanced') ticks[p]++;
    nextTick[p] += step_ms[p];
  }
  // drain: deliver everything still in flight, resending (as the live loop would) until both are fully confirmed
  for (let i = 0; i < 400; i++) {
    queue.sort((a, b) => a.at - b.at);
    while (queue.length) { const q = queue.shift(); now = Math.max(now, q.at); if (!q.lost) S[q.to].receive(q.m, now); }
    for (const s of S) { s._flush(now); }
    if (S[0].rConf >= frames - 1 && S[1].rConf >= frames - 1) break;
    now += 16;
  }
  for (const s of S) s.settle();
  // reference: perfect network, same inputs
  const ref = createState({ seed: 99, chars });
  for (let f = 0; f < frames; f++) {
    const a = f < 2 ? 0 : sc[0][f - 2], b = f < 2 ? 0 : sc[1][f - 2];
    step(ref, [a, b]);
  }
  return { S, ref, now };
}

const cases = [
  { name: 'LAN (10ms)',               latency: 10,  jitter: 2,  loss: 0,    offsetB: 5,   frames: 1500, seed: 1 },
  { name: 'typical online (60ms)',    latency: 60,  jitter: 10, loss: 0.02, offsetB: 40,  frames: 1500, seed: 2 },
  { name: 'bad wifi (120ms, 10% loss)', latency: 120, jitter: 40, loss: 0.10, offsetB: 90,  frames: 1500, seed: 3 },
  { name: 'awful (200ms, 25% loss)',  latency: 200, jitter: 80, loss: 0.25, offsetB: 150, frames: 1500, seed: 4 },
  { name: 'clock drift (+0.4ms/frame)', latency: 70,  jitter: 15, loss: 0.03, offsetB: 0,   driftB: 0.4, frames: 2400, seed: 5 },
  { name: 'longer match, other chars', latency: 80,  jitter: 20, loss: 0.05, offsetB: 25,  frames: 3000, seed: 6, chars: ['papyrus', 'sans'] },
];
for (const c of cases) {
  console.log(c.name);
  const { S, ref } = runNet(c);
  const hr = hashState(ref);
  const h0 = hashState(S[0].state), h1 = hashState(S[1].state);
  ok(S[0].frame === c.frames && S[1].frame === c.frames, `both reached frame ${c.frames} (${S[0].frame}/${S[1].frame})`);
  ok(h0 === hr, `host state == lag-free reference`);
  ok(h1 === hr, `guest state == lag-free reference`);
  ok(!S[0].desynced && !S[1].desynced, 'no desync reported by the periodic hash check');
  console.log(`   host: rollbacks=${S[0].stats.rollbacks} maxDepth=${S[0].stats.maxDepth} stalls=${S[0].stats.stalls} throttled=${S[0].stats.throttled}  | guest: rollbacks=${S[1].stats.rollbacks} maxDepth=${S[1].stats.maxDepth} stalls=${S[1].stats.stalls} throttled=${S[1].stats.throttled}`);
}
console.log(failures ? `\n${failures} FAILED` : '\nall good');
process.exit(failures ? 1 : 0);
