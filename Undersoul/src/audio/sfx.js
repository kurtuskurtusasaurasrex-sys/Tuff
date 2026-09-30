// Hand-designed sound effects. Each one is a small synthesis recipe with
// slight per-play variation so repeats never sound copy-pasted.
import { audio } from './audio.js';

const A = () => audio.ctx;

function env(g, t, a, peak, d, sus = 0) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + a);
  if (sus > 0) g.gain.setTargetAtTime(peak * sus, t + a, d / 3);
  else g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
}

function tone(opts) {
  const ctx = A();
  const t = (opts.t ?? ctx.currentTime) + (opts.delay ?? 0);
  const o = ctx.createOscillator();
  audio.setOsc(o, opts.wave ?? 'square');
  const f0 = opts.f;
  o.frequency.setValueAtTime(f0, t);
  if (opts.f2) {
    if (opts.lin) o.frequency.linearRampToValueAtTime(opts.f2, t + (opts.glide ?? opts.d));
    else o.frequency.exponentialRampToValueAtTime(Math.max(1, opts.f2), t + (opts.glide ?? opts.d));
  }
  const g = ctx.createGain();
  env(g, t, opts.a ?? 0.002, opts.v ?? 0.2, opts.d ?? 0.1);
  let node = o;
  if (opts.lp) {
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = opts.lp;
    o.connect(f);
    node = f;
  }
  node.connect(g);
  route(g, opts);
  o.start(t);
  o.stop(t + (opts.a ?? 0.002) + (opts.d ?? 0.1) + 0.05);
  return o;
}

function noise(opts) {
  const ctx = A();
  const t = (opts.t ?? ctx.currentTime) + (opts.delay ?? 0);
  const n = ctx.createBufferSource();
  n.buffer = audio.noiseBuf;
  n.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = opts.type ?? 'bandpass';
  f.frequency.setValueAtTime(opts.f ?? 2000, t);
  if (opts.f2) f.frequency.exponentialRampToValueAtTime(opts.f2, t + (opts.glide ?? opts.d ?? 0.1));
  f.Q.value = opts.q ?? 1;
  const g = ctx.createGain();
  env(g, t, opts.a ?? 0.002, opts.v ?? 0.2, opts.d ?? 0.1);
  n.connect(f);
  f.connect(g);
  route(g, opts);
  n.start(t, Math.random() * 1.5);
  n.stop(t + (opts.a ?? 0.002) + (opts.d ?? 0.1) + 0.05);
}

function route(node, opts) {
  const ctx = A();
  let out = node;
  if (opts.pan) {
    const p = ctx.createStereoPanner();
    p.pan.value = opts.pan;
    node.connect(p);
    out = p;
  }
  out.connect(audio.sfxOut);
  if (opts.rev) {
    const r = ctx.createGain();
    r.gain.value = opts.rev;
    out.connect(r);
    r.connect(audio.sfxReverbIn);
  }
}

function sample(bank, midi, opts = {}) {
  const ctx = A();
  const set = audio.bank[bank];
  let best = set[0];
  for (const s of set) if (Math.abs(s.root - midi) < Math.abs(best.root - midi)) best = s;
  const t = ctx.currentTime + (opts.delay ?? 0);
  const src = ctx.createBufferSource();
  src.buffer = best.buffer;
  src.playbackRate.value = Math.pow(2, (midi - best.root) / 12);
  const g = ctx.createGain();
  g.gain.value = opts.v ?? 0.3;
  src.connect(g);
  route(g, opts);
  src.start(t);
}

function drum(name, opts = {}) {
  const ctx = A();
  const src = ctx.createBufferSource();
  src.buffer = audio.bank.drums[name];
  src.playbackRate.value = opts.rate ?? 1;
  const g = ctx.createGain();
  g.gain.value = opts.v ?? 0.5;
  src.connect(g);
  route(g, opts);
  src.start(ctx.currentTime + (opts.delay ?? 0));
}

const vary = (x, amt = 0.04) => x * (1 + (Math.random() - 0.5) * 2 * amt);
const mf = (m) => 440 * Math.pow(2, (m - 69) / 12);

// ---- character voices for text ----
export const VOICES = {
  narrator: { wave: 'pulse50', f: 392, jit: 0, d: 0.045, v: 0.07, lp: 3000 },
  default: { wave: 'pulse50', f: 440, jit: 1, d: 0.045, v: 0.07, lp: 2800 },
  sprig: { wave: 'sine', f: 860, jit: 2, d: 0.05, v: 0.13, f2: 780 },
  sprig_evil: { wave: 'sawtooth', f: 180, jit: 1, d: 0.06, v: 0.1, lp: 1400 },
  willow: { wave: 'triangle', f: 520, jit: 0.5, d: 0.07, v: 0.2, f2: 500 },
  wick: { wave: 'triangle', f: 196, jit: 0.5, d: 0.06, v: 0.26, f2: 185 },
  taper: { wave: 'pulse25', f: 330, jit: 2, d: 0.05, v: 0.09, lp: 2400 },
  maris: { wave: 'pulse50', f: 262, jit: 1.5, d: 0.05, v: 0.09, lp: 1800 },
  lotl: { wave: 'pulse12', f: 620, jit: 1.5, d: 0.035, v: 0.08, lp: 3800 },
  luxe: { wave: 'sawtooth', f: 311, jit: 3, d: 0.05, v: 0.06, lp: 2600, ring: true },
  king: { wave: 'triangle', f: 131, jit: 0.3, d: 0.09, v: 0.3, f2: 125 },
  echo: { wave: 'sine', f: 660, jit: 0.3, d: 0.09, v: 0.1, rev: 0.5 },
  wren: { wave: 'sine', f: 247, jit: 0, d: 0.08, v: 0.14, rev: 0.4, f2: 233 },
  monster: { wave: 'pulse25', f: 494, jit: 2, d: 0.04, v: 0.07, lp: 3000 },
  low: { wave: 'pulse50', f: 220, jit: 1, d: 0.05, v: 0.08, lp: 1600 },
  high: { wave: 'pulse25', f: 740, jit: 2, d: 0.035, v: 0.06, lp: 4200 },
  hush: { wave: 'sine', f: 330, jit: 0.5, d: 0.1, v: 0.12, rev: 0.4, f2: 300 },
  silk: { wave: 'pulse12', f: 587, jit: 1, d: 0.04, v: 0.07, lp: 3600 },
  tuft: { wave: 'pulse25', f: 523, jit: 3, d: 0.035, v: 0.07, lp: 3600 },
  rowan: { wave: 'triangle', f: 392, jit: 0.5, d: 0.07, v: 0.2, rev: 0.3 },
};

export const sfx = {
  voice(name = 'default') {
    if (!audio.ready) return;
    const v = VOICES[name] || VOICES.default;
    const semis = (Math.random() - 0.5) * 2 * v.jit;
    const f = v.f * Math.pow(2, semis / 12);
    tone({ wave: v.wave, f, f2: v.f2 ? v.f2 * Math.pow(2, semis / 12) : undefined, d: v.d, v: v.v, lp: v.lp, rev: v.rev });
    if (v.ring) tone({ wave: 'sine', f: f * 2.01, d: v.d, v: v.v * 0.5 });
  },

  move() {
    if (!audio.ready) return;
    tone({ wave: 'pulse25', f: 1318, f2: 1250, d: 0.045, v: 0.07, lp: 5000 });
  },
  select() {
    if (!audio.ready) return;
    tone({ wave: 'pulse50', f: 988, d: 0.03, v: 0.07, lp: 5000 });
    tone({ wave: 'pulse50', f: 1480, d: 0.06, v: 0.07, delay: 0.035, lp: 5000 });
  },
  back() {
    if (!audio.ready) return;
    tone({ wave: 'pulse50', f: 1175, d: 0.03, v: 0.06, lp: 4000 });
    tone({ wave: 'pulse50', f: 784, d: 0.05, v: 0.06, delay: 0.035, lp: 4000 });
  },
  buzz() {
    if (!audio.ready) return;
    tone({ wave: 'sawtooth', f: 110, d: 0.18, v: 0.12, lp: 900 });
    tone({ wave: 'sawtooth', f: 116, d: 0.18, v: 0.12, lp: 900 });
  },
  encounter() {
    if (!audio.ready) return;
    tone({ wave: 'pulse25', f: 587, f2: 1760, d: 0.07, v: 0.14, glide: 0.06 });
    tone({ wave: 'pulse50', f: 1760, d: 0.12, v: 0.1, delay: 0.07 });
    tone({ wave: 'pulse50', f: 2349, d: 0.18, v: 0.08, delay: 0.1, rev: 0.2 });
  },
  soulBlink() {
    if (!audio.ready) return;
    tone({ wave: 'pulse50', f: 1568, d: 0.04, v: 0.08 });
  },
  soulFly() {
    if (!audio.ready) return;
    noise({ f: 500, f2: 4000, q: 2, d: 0.35, v: 0.2, a: 0.02 });
    tone({ wave: 'triangle', f: 900, f2: 300, d: 0.35, v: 0.12 });
  },
  slash() {
    if (!audio.ready) return;
    noise({ f: vary(1200), f2: 6500, q: 1.2, d: 0.2, v: 0.3, a: 0.01, pan: -0.3 });
    noise({ type: 'highpass', f: 5000, q: 0.5, d: 0.12, v: 0.12, delay: 0.05, pan: 0.3 });
  },
  hitEnemy(strength = 1) {
    if (!audio.ready) return;
    tone({ wave: 'sine', f: 140, f2: 42, d: 0.22, v: 0.5 * strength });
    noise({ f: 1400, f2: 300, q: 0.8, d: 0.14, v: 0.35 * strength });
    tone({ wave: 'pulse25', f: vary(220), f2: 70, d: 0.1, v: 0.12 });
    drum('snare', { v: 0.25 * strength, rate: 0.7 });
  },
  crit() {
    if (!audio.ready) return;
    sfx.hitEnemy(1.2);
    sample('glock', 96, { v: 0.25, rev: 0.3 });
    sample('glock', 103, { v: 0.2, delay: 0.05, rev: 0.3 });
  },
  miss() {
    if (!audio.ready) return;
    noise({ f: 3000, f2: 900, q: 3, d: 0.15, v: 0.12 });
  },
  hurt() {
    if (!audio.ready) return;
    tone({ wave: 'pulse50', f: vary(330, 0.02), f2: 82, d: 0.14, v: 0.2, lp: 2400 });
    tone({ wave: 'sawtooth', f: 165, f2: 55, d: 0.16, v: 0.12, lp: 1200 });
    noise({ f: 900, f2: 250, q: 0.7, d: 0.12, v: 0.22 });
  },
  graze() {
    if (!audio.ready) return;
    tone({ wave: 'sine', f: vary(2400, 0.08), d: 0.03, v: 0.03 });
  },
  heal() {
    if (!audio.ready) return;
    [72, 76, 79, 84, 88].forEach((m, i) =>
      tone({ wave: 'pulse25', f: mf(m), d: 0.09, v: 0.07, delay: i * 0.045, lp: 6000, rev: 0.25 }));
  },
  save() {
    if (!audio.ready) return;
    [88, 95, 100, 107].forEach((m, i) => sample('glock', m, { v: 0.22, delay: i * 0.07, rev: 0.5 }));
    sample('bell', 76, { v: 0.12, delay: 0.1, rev: 0.6 });
    noise({ type: 'highpass', f: 7000, q: 0.5, d: 0.6, a: 0.2, v: 0.04, rev: 0.4 });
  },
  levelUp() {
    if (!audio.ready) return;
    [60, 64, 67, 72, 76, 79, 84].forEach((m, i) =>
      tone({ wave: 'pulse50', f: mf(m), d: 0.08, v: 0.08, delay: i * 0.04, lp: 5000 }));
    tone({ wave: 'pulse25', f: mf(84), d: 0.4, v: 0.06, delay: 0.3, rev: 0.3 });
  },
  hopeUp() {
    if (!audio.ready) return;
    [79, 83, 86, 91, 95].forEach((m, i) => sample('musicbox', m, { v: 0.25, delay: i * 0.06, rev: 0.5 }));
  },
  dust() {
    if (!audio.ready) return;
    const ctx = A();
    const t0 = ctx.currentTime;
    for (let i = 0; i < 26; i++) {
      const tt = t0 + Math.pow(i / 26, 1.3) * 0.9;
      noise({ t: tt, f: vary(2600 - i * 70, 0.2), q: 3, d: 0.05, v: 0.12 * (1 - i / 30), pan: (Math.random() - 0.5) * 0.6 });
    }
    noise({ f: 1800, f2: 200, q: 0.6, d: 1.0, v: 0.12, a: 0.05 });
  },
  spare() {
    if (!audio.ready) return;
    noise({ f: 700, f2: 5000, q: 1.5, d: 0.6, v: 0.14, a: 0.08, rev: 0.4 });
    [84, 88, 91, 96].forEach((m, i) => sample('glock', m, { v: 0.12, delay: 0.1 + i * 0.06, rev: 0.5 }));
  },
  flee() {
    if (!audio.ready) return;
    for (let i = 0; i < 5; i++) noise({ f: 1500, q: 2, d: 0.04, v: 0.12, delay: i * 0.08, pan: -0.2 - i * 0.15 });
  },
  crack() {
    if (!audio.ready) return;
    noise({ type: 'highpass', f: 1500, q: 0.7, d: 0.1, v: 0.45 });
    tone({ wave: 'pulse50', f: 180, f2: 60, d: 0.1, v: 0.25 });
    tone({ wave: 'square', f: 1200, f2: 400, d: 0.05, v: 0.1 });
  },
  shatter() {
    if (!audio.ready) return;
    noise({ type: 'highpass', f: 2500, q: 0.7, d: 0.5, v: 0.35 });
    for (let i = 0; i < 8; i++) sample('glock', 96 + Math.floor(Math.random() * 12), { v: 0.12, delay: i * 0.025 + Math.random() * 0.03, rev: 0.4 });
  },
  item() {
    if (!audio.ready) return;
    [79, 84, 88].forEach((m, i) => tone({ wave: 'pulse25', f: mf(m), d: 0.1, v: 0.08, delay: i * 0.06, rev: 0.2 }));
  },
  buy() {
    if (!audio.ready) return;
    tone({ wave: 'pulse50', f: 1975, d: 0.05, v: 0.07 });
    tone({ wave: 'pulse50', f: 2637, d: 0.2, v: 0.07, delay: 0.06, rev: 0.2 });
  },
  phone() {
    if (!audio.ready) return;
    for (let i = 0; i < 4; i++) {
      tone({ wave: 'sine', f: 1318, d: 0.05, v: 0.12, delay: i * 0.1 });
      tone({ wave: 'sine', f: 1661, d: 0.05, v: 0.12, delay: i * 0.1 + 0.05 });
    }
  },
  door() {
    if (!audio.ready) return;
    noise({ f: 400, f2: 180, q: 1.5, d: 0.25, v: 0.25 });
    tone({ wave: 'sine', f: 90, f2: 60, d: 0.2, v: 0.2 });
  },
  step(kind = 'stone') {
    if (!audio.ready) return;
    const pan = (Math.random() - 0.5) * 0.2;
    if (kind === 'snow') noise({ f: vary(1100, 0.2), q: 0.8, d: 0.09, v: 0.07, a: 0.01, pan });
    else if (kind === 'water') noise({ f: vary(900, 0.2), f2: 2000, q: 2, d: 0.1, v: 0.06, pan });
    else if (kind === 'wood') { tone({ wave: 'sine', f: vary(180), f2: 120, d: 0.06, v: 0.12 }); noise({ f: 2000, q: 1, d: 0.02, v: 0.03, pan }); }
    else if (kind === 'metal') { tone({ wave: 'triangle', f: vary(900, 0.05), d: 0.05, v: 0.04 }); noise({ f: 3500, q: 2, d: 0.03, v: 0.03, pan }); }
    else if (kind === 'grass') noise({ f: vary(3000, 0.2), q: 0.6, d: 0.06, v: 0.035, a: 0.01, pan });
    else noise({ f: vary(700, 0.15), q: 1.4, d: 0.045, v: 0.08, pan });
  },
  splash() {
    if (!audio.ready) return;
    noise({ f: 800, f2: 3500, q: 0.8, d: 0.35, v: 0.2, a: 0.01 });
    for (let i = 0; i < 4; i++) tone({ wave: 'sine', f: vary(900, 0.3), f2: 1800, d: 0.06, v: 0.05, delay: 0.05 + i * 0.05 });
  },
  switch() {
    if (!audio.ready) return;
    tone({ wave: 'square', f: 220, d: 0.03, v: 0.1, lp: 2000 });
    tone({ wave: 'square', f: 440, d: 0.05, v: 0.08, delay: 0.05, lp: 2000 });
    drum('rim', { v: 0.3 });
  },
  spikes() {
    if (!audio.ready) return;
    noise({ f: 2000, f2: 600, q: 2, d: 0.2, v: 0.18 });
    tone({ wave: 'sawtooth', f: 200, f2: 90, d: 0.2, v: 0.08, lp: 1200 });
  },
  push() {
    if (!audio.ready) return;
    noise({ f: 300, q: 1, d: 0.3, v: 0.2, a: 0.03 });
  },
  correct() {
    if (!audio.ready) return;
    [76, 79, 84].forEach((m, i) => sample('marimba', m, { v: 0.35, delay: i * 0.08 }));
  },
  wrong() {
    if (!audio.ready) return;
    tone({ wave: 'pulse50', f: 233, d: 0.25, v: 0.1, lp: 1500 });
    tone({ wave: 'pulse50', f: 220, d: 0.35, v: 0.1, delay: 0.2, lp: 1500 });
  },
  shoot() {
    if (!audio.ready) return;
    tone({ wave: 'pulse25', f: vary(1400), f2: 400, d: 0.08, v: 0.07 });
  },
  pop() {
    if (!audio.ready) return;
    tone({ wave: 'sine', f: vary(700), f2: 1400, d: 0.05, v: 0.12 });
  },
  dash() {
    if (!audio.ready) return;
    noise({ f: 800, f2: 3000, q: 1.2, d: 0.15, v: 0.15, a: 0.01 });
  },
  blink() {
    if (!audio.ready) return;
    tone({ wave: 'sine', f: 600, f2: 2400, d: 0.08, v: 0.1 });
    tone({ wave: 'sine', f: 2400, f2: 900, d: 0.08, v: 0.08, delay: 0.06 });
  },
  jump() {
    if (!audio.ready) return;
    tone({ wave: 'pulse25', f: 300, f2: 700, d: 0.08, v: 0.06 });
  },
  land() {
    if (!audio.ready) return;
    tone({ wave: 'sine', f: 120, f2: 60, d: 0.08, v: 0.12 });
  },
  block() {
    if (!audio.ready) return;
    tone({ wave: 'triangle', f: vary(1760, 0.03), d: 0.12, v: 0.1 });
    tone({ wave: 'square', f: 3520, d: 0.04, v: 0.03 });
    noise({ f: 5000, q: 2, d: 0.05, v: 0.06 });
  },
  magic() {
    if (!audio.ready) return;
    tone({ wave: 'sine', f: 400, f2: 1600, d: 0.3, v: 0.1, rev: 0.4 });
    tone({ wave: 'sine', f: 603, f2: 2410, d: 0.3, v: 0.06, rev: 0.4 });
  },
  fire() {
    if (!audio.ready) return;
    noise({ type: 'lowpass', f: 1200, f2: 400, q: 0.7, d: 0.35, v: 0.2, a: 0.03 });
  },
  spear() {
    if (!audio.ready) return;
    tone({ wave: 'sawtooth', f: 1600, f2: 500, d: 0.12, v: 0.06, lp: 4000 });
    noise({ f: 4000, f2: 1500, q: 2, d: 0.1, v: 0.08 });
  },
  spearAppear() {
    if (!audio.ready) return;
    tone({ wave: 'pulse25', f: vary(1900, 0.02), d: 0.05, v: 0.05 });
  },
  laser() {
    if (!audio.ready) return;
    tone({ wave: 'sawtooth', f: 180, d: 0.5, v: 0.08, lp: 1600, a: 0.02 });
    tone({ wave: 'square', f: 360.5, d: 0.5, v: 0.05, lp: 2400, a: 0.02 });
    noise({ f: 3000, q: 0.5, d: 0.5, v: 0.08, a: 0.02 });
  },
  charge() {
    if (!audio.ready) return;
    tone({ wave: 'sawtooth', f: 100, f2: 900, d: 0.5, v: 0.06, lp: 2000, a: 0.05 });
  },
  explosion() {
    if (!audio.ready) return;
    noise({ type: 'lowpass', f: 2400, f2: 120, q: 0.5, d: 1.0, v: 0.5, a: 0.005 });
    tone({ wave: 'sine', f: 90, f2: 30, d: 0.6, v: 0.45 });
    drum('crash', { v: 0.2, rate: 0.7 });
  },
  rumble(d = 1.2) {
    if (!audio.ready) return;
    noise({ type: 'lowpass', f: 180, q: 0.5, d, v: 0.4, a: 0.2 });
  },
  bell(m = 72) {
    if (!audio.ready) return;
    sample('bell', m, { v: 0.35, rev: 0.6 });
  },
  chime() {
    if (!audio.ready) return;
    [84, 91, 96].forEach((m, i) => sample('musicbox', m, { v: 0.25, delay: i * 0.1, rev: 0.6 }));
  },
  echoFlower() {
    if (!audio.ready) return;
    sample('kalimba', 84, { v: 0.2, rev: 0.7 });
  },
  ding() {
    if (!audio.ready) return;
    sample('glock', 88, { v: 0.25, rev: 0.3 });
  },
  whoosh() {
    if (!audio.ready) return;
    noise({ f: 300, f2: 2400, q: 0.8, d: 0.4, v: 0.15, a: 0.15 });
  },
  applause() {
    if (!audio.ready) return;
    for (let i = 0; i < 40; i++) noise({ f: vary(1600, 0.3), q: 2, d: 0.03, v: 0.06, delay: Math.random() * 1.4, pan: (Math.random() - 0.5) * 1.6 });
  },
  laugh() {
    if (!audio.ready) return;
    for (let i = 0; i < 5; i++) tone({ wave: 'pulse25', f: 520 - i * 25, d: 0.06, v: 0.06, delay: i * 0.11 });
  },
  typewriter() {
    if (!audio.ready) return;
    drum('rim', { v: 0.12, rate: vary(1.4, 0.1) });
  },
  impact() {
    if (!audio.ready) return;
    drum('kick', { v: 0.8 });
    noise({ type: 'lowpass', f: 900, q: 0.5, d: 0.3, v: 0.25 });
  },
  gong() {
    if (!audio.ready) return;
    sample('bell', 43, { v: 0.5, rev: 0.8 });
    sample('timpani', 36, { v: 0.4 });
  },
  drumroll(d = 1) {
    if (!audio.ready) return;
    const n = Math.floor(d / 0.05);
    for (let i = 0; i < n; i++) drum('snare', { v: 0.1 + 0.2 * (i / n), delay: i * 0.05, rate: vary(1, 0.03) });
  },
  // generic pitched blip for puzzles (piano keys, etc)
  note(m, bank = 'piano') {
    if (!audio.ready) return;
    sample(bank, m, { v: 0.4, rev: 0.3 });
  },
};

// ---- continuous ambience beds ----
let amb = null;
export function ambience(kind) {
  if (!audio.ready) { pendingAmb = kind; return; }
  if (amb && amb.kind === kind) return;
  const ctx = A();
  if (amb) {
    const old = amb;
    old.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
    setTimeout(() => old.nodes.forEach((n) => { try { n.stop(); } catch { /* */ } }), 2500);
    amb = null;
  }
  if (!kind) return;
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(audio.sfxOut);
  const nodes = [];
  const bed = (type, f, q, v, lfoRate, lfoAmt) => {
    const n = ctx.createBufferSource();
    n.buffer = audio.noiseBuf;
    n.loop = true;
    const fl = ctx.createBiquadFilter();
    fl.type = type;
    fl.frequency.value = f;
    fl.Q.value = q;
    const g = ctx.createGain();
    g.gain.value = v;
    n.connect(fl);
    fl.connect(g);
    g.connect(gain);
    if (lfoRate) {
      const l = ctx.createOscillator();
      l.frequency.value = lfoRate;
      const lg = ctx.createGain();
      lg.gain.value = lfoAmt;
      l.connect(lg);
      lg.connect(fl.frequency);
      l.start();
      nodes.push(l);
    }
    n.start(0, Math.random() * 1.9);
    nodes.push(n);
  };
  const levels = {
    wind: () => { bed('bandpass', 500, 1.5, 0.5, 0.13, 250); bed('bandpass', 1200, 3, 0.15, 0.21, 500); },
    water: () => { bed('lowpass', 900, 0.7, 0.35, 0.3, 200); bed('bandpass', 3000, 0.8, 0.08, 0, 0); },
    waterfall: () => { bed('lowpass', 1400, 0.5, 0.6, 0, 0); bed('bandpass', 400, 0.8, 0.4, 0.2, 60); },
    lava: () => { bed('lowpass', 200, 0.8, 0.6, 0.4, 60); bed('bandpass', 700, 2, 0.08, 1.3, 300); },
    hum: () => { bed('lowpass', 120, 1, 0.35, 0.1, 20); },
    cave: () => { bed('lowpass', 300, 0.6, 0.18, 0.07, 80); },
    rain: () => { bed('highpass', 3000, 0.4, 0.2, 0, 0); bed('bandpass', 1200, 0.6, 0.1, 0, 0); },
  };
  (levels[kind] || levels.cave)();
  gain.gain.setTargetAtTime(0.35, ctx.currentTime, 0.8);
  amb = { kind, gain, nodes };
}
let pendingAmb = null;
export function flushPendingAmbience() {
  if (pendingAmb) { const k = pendingAmb; pendingAmb = null; ambience(k); }
}
