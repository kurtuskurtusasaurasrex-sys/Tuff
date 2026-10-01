// N-player rollback netcode under a simulated bad network (latency, jitter, packet loss, reordering, clock offset + drift),
// star topology through the host, CPU slots, and a guest dropping mid-match (CPU takeover).
// After N frames every surviving peer must hold exactly the state of a lag-free reference simulation.
// run:  node tests/rollback.test.mjs
import { createState, step, hashState, cloneState } from '../game/js/sim.js';
import { Rollback } from '../game/js/rollback.js';
import { IN, CPU_INPUT } from '../game/js/config.js';

let failures = 0;
const ok = (c, msg) => { if (!c) { failures++; console.log('  FAIL:', msg); } else console.log('  ok  :', msg); };

function lcg(seed) { let s = seed >>> 0 || 1; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); }

// a busy, scripted "player": mashes buttons and wanders (independent of sim state so inputs are scripted)
function script(p, n) {
  const r = lcg(1000 + p * 77);
  const out = []; let held = 0, hold = 0;
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

function runNet({ chars, human, latency, jitter, loss, offsets, drifts, frames, seed, delay = 2, maxRollback = 10, stage = 'snowdin', dropGuest = null, dropAt = 0, slowGuest = null }) {
  const n = chars.length, rnd = lcg(seed);
  const cpu = human.map((h) => (h ? 0 : 1));
  const mkState = () => createState({ seed: 99, chars, cpu, lvl: chars.map(() => 1), stage });
  let now = 0;
  const queue = [];
  const dead = new Set();
  const S = [];
  for (let p = 0; p < n; p++) {
    if (!human[p]) { S.push(null); continue; }
    const links = p === 0 ? human.map((h, i) => (h && i !== 0 ? i : -1)).filter((i) => i >= 0) : [0];
    S.push(new Rollback({
      createState: mkState, step, clone: cloneState, hash: hashState, n, local: p, human, links, delay, maxRollback,
      send: (to, m) => {
        if (dead.has(p) || dead.has(to)) return;
        const lat = latency * (slowGuest !== null && (p === slowGuest || to === slowGuest) ? 3 : 1);
        queue.push({ at: now + lat + (rnd() * 2 - 1) * jitter, from: p, to, m: JSON.parse(JSON.stringify(m)), lost: rnd() < loss && m.t === 'i' });
      },
    }));
    S[p].rtt = latency * 2;
  }
  const humans = human.map((h, i) => (h ? i : -1)).filter((i) => i >= 0);
  const sc = humans.map((p) => script(p, frames + 50));
  const scOf = (p) => sc[humans.indexOf(p)];
  const nextTick = {}, ticks = {}, stepMs = {};
  humans.forEach((p, k) => { nextTick[p] = offsets[k] || 0; ticks[p] = 0; stepMs[p] = 1000 / 60 + (drifts[k] || 0); });
  let dropped = false, dropFrame = null, guard = 0;
  const alive = () => humans.filter((p) => !dead.has(p));
  while (alive().some((p) => S[p].frame < frames) && guard++ < 6e6) {
    let best = null;
    for (const p of alive()) if (S[p].frame < frames && (best === null || nextTick[p] < best.at)) best = { at: nextTick[p], p };
    if (dropGuest !== null && !dropped && (best === null || best.at >= dropAt)) {
      dropped = true; now = Math.max(now, dropAt); dead.add(dropGuest);
      for (const q of queue.filter((x) => x.from === dropGuest || x.to === dropGuest)) q.lost = true;
      S[0].linkClosed(dropGuest);                            // host's transport noticed the closed connection
      dropFrame = S[0].drop[dropGuest];
      continue;
    }
    queue.sort((a, b) => a.at - b.at);
    const q = queue[0];
    if (q && (best === null || q.at <= best.at)) { queue.shift(); now = Math.max(now, q.at); if (!q.lost && !dead.has(q.to)) S[q.to].receive(q.from, q.m, now); continue; }
    if (!best) break;
    now = Math.max(now, best.at);
    const p = best.p;
    if (S[p].tick(scOf(p)[ticks[p]] | 0, now) === 'advanced') ticks[p]++;
    nextTick[p] += stepMs[p];
  }
  // drain: deliver everything in flight and keep resending (as the live loop would) until all survivors are fully confirmed
  for (let i = 0; i < 600; i++) {
    queue.sort((a, b) => a.at - b.at);
    while (queue.length) { const q = queue.shift(); now = Math.max(now, q.at); if (!q.lost && !dead.has(q.to)) S[q.to].receive(q.from, q.m, now); }
    for (const p of alive()) S[p]._flush(now);
    if (alive().every((p) => S[p].confirmed() >= frames - 1)) break;
    now += 16;
  }
  for (const p of alive()) S[p].settle();
  // reference: perfect network, same inputs, takeover at the agreed frame
  const ref = mkState();
  for (let f = 0; f < frames; f++) {
    const inp = new Array(n).fill(0);
    for (const p of humans) {
      inp[p] = f < delay ? 0 : scOf(p)[f - delay] | 0;
      if (dropGuest === p && dropFrame !== null && f >= dropFrame) inp[p] = CPU_INPUT;
    }
    step(ref, inp);
  }
  return { S, ref, alive: alive(), dropFrame };
}

const T = true, F = false;
const cases = [
  { name: '1v1 LAN (10ms)',                       chars: ['sans', 'papyrus'], human: [T, T], latency: 10, jitter: 2, loss: 0, offsets: [0, 5], frames: 1500, seed: 1 },
  { name: '1v1 typical online (60ms, 2% loss)',   chars: ['sans', 'papyrus'], human: [T, T], latency: 60, jitter: 10, loss: 0.02, offsets: [0, 40], frames: 1500, seed: 2 },
  { name: '1v1 awful (200ms, 25% loss)',          chars: ['papyrus', 'sans'], human: [T, T], latency: 200, jitter: 80, loss: 0.25, offsets: [0, 150], frames: 1500, seed: 3 },
  { name: '1v1 clock drift (+0.4ms/frame)',       chars: ['sans', 'papyrus'], human: [T, T], latency: 70, jitter: 15, loss: 0.03, offsets: [0, 0], drifts: [0, 0.4], frames: 2400, seed: 4 },
  { name: '1 human + CPUs (no network at all)',   chars: ['sans', 'papyrus', 'sans'], human: [T, F, F], latency: 50, jitter: 5, loss: 0, offsets: [0], frames: 1200, seed: 5 },
  { name: '3 humans + 1 CPU (70ms, 3% loss)',    chars: ['sans', 'papyrus', 'sans', 'papyrus'], human: [T, T, T, F], latency: 70, jitter: 20, loss: 0.03, offsets: [0, 30, 60], frames: 2000, seed: 6 },
  { name: '4 humans, wifi-ish (90ms, 8% loss)',   chars: ['sans', 'papyrus', 'papyrus', 'sans'], human: [T, T, T, T], latency: 90, jitter: 30, loss: 0.08, offsets: [0, 25, 70, 110], drifts: [0, 0.1, -0.1, 0.2], frames: 2400, seed: 7, stage: 'hall' },
  { name: '4 humans, one guest on a slow link',   chars: ['papyrus', 'sans', 'sans', 'papyrus'], human: [T, T, T, T], latency: 50, jitter: 10, loss: 0.02, offsets: [0, 10, 20, 30], frames: 1800, seed: 8, slowGuest: 2, stage: 'ice' },
  { name: '4 humans, a guest DROPS mid-match -> CPU takes over', chars: ['sans', 'papyrus', 'sans', 'papyrus'], human: [T, T, T, T], latency: 60, jitter: 15, loss: 0.03, offsets: [0, 20, 40, 60], frames: 2400, seed: 9, dropGuest: 2, dropAt: 12000 },
  { name: '2 humans, the opponent drops -> host plays on vs CPU', chars: ['sans', 'papyrus'], human: [T, T], latency: 60, jitter: 10, loss: 0.02, offsets: [0, 30], frames: 2000, seed: 10, dropGuest: 1, dropAt: 8000 },
];
for (const c of cases) {
  console.log(c.name);
  const r = runNet({ drifts: [], ...c });
  const hr = hashState(r.ref);
  for (const p of r.alive) {
    ok(r.S[p].frame === c.frames, `peer ${p} reached frame ${c.frames}`);
    ok(hashState(r.S[p].state) === hr, `peer ${p} state == lag-free reference`);
    ok(!r.S[p].desynced, `peer ${p}: periodic hash check agreed (${r.S[p].stats.hashOk} checks)`);
  }
  if (c.dropGuest !== null && c.dropGuest !== undefined) ok(r.ref.fighters[c.dropGuest].cpu === 1, `the dropped player really became a CPU (agreed takeover frame ${r.dropFrame})`);
  console.log('   ' + r.alive.map((p) => `peer${p}: rollbacks=${r.S[p].stats.rollbacks} maxDepth=${r.S[p].stats.maxDepth} stalls=${r.S[p].stats.stalls} throttled=${r.S[p].stats.throttled}`).join(' | '));
}
console.log(failures ? `\n${failures} FAILED` : '\nall good');
process.exit(failures ? 1 : 0);
