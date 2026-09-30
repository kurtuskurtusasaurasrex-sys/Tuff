// Renders the sampled instruments (piano, bells, plucks, drums...) once.
// Each instrument is a set of multisamples at root notes; the player picks
// the nearest root and repitches with playbackRate.
import { makeBuffer, additive, normalize, fadeTail, noiseGen, biquad, pluck, mtof } from './dsp.js';

function pianoSample(sr, midi, dur) {
  const f0 = mtof(midi);
  const len = Math.floor(sr * dur);
  const out = new Float32Array(len);
  const rnd = noiseGen(midi * 7 + 1);
  const B = 0.00018 + (midi > 72 ? (midi - 72) * 0.00003 : 0);
  const T0 = 1.7 * Math.pow(261.6 / f0, 0.45);
  const parts = [];
  const strings = [1, 1.00055];
  const phases = [];
  for (let n = 0; n <= 28; n++) phases.push(rnd() * Math.PI * 0.5);
  for (const det of strings) {
    for (let n = 1; n <= 28; n++) {
      const f = n * f0 * Math.sqrt(1 + B * n * n) * det;
      if (f > 10000) break;
      const soft = 1 / Math.sqrt(1 + Math.pow(f / 2600, 2));
      const comb = 0.55 + 0.45 * Math.abs(Math.sin((Math.PI * n) / 8.3));
      const amp = (soft * comb) / Math.pow(n, 1.15) / strings.length;
      const ph = phases[n];
      parts.push({ f, amp: amp * 0.62, tau: (T0 * 0.32) / (1 + 0.12 * (n - 1)), phase: ph });
      parts.push({ f, amp: amp * 0.38, tau: (T0 * 1.6) / (1 + 0.22 * (n - 1)), phase: ph });
    }
  }
  additive(out, sr, parts, 0.0015);
  // hammer knock
  const knock = new Float32Array(Math.floor(sr * 0.012));
  for (let i = 0; i < knock.length; i++) knock[i] = rnd() * (1 - i / knock.length);
  biquad(knock, sr, 'bandpass', Math.min(4000, f0 * 6), 1.2);
  for (let i = 0; i < knock.length; i++) out[i] += knock[i] * 0.05;
  return fadeTail(normalize(out, 0.8), sr, 0.08);
}

function musicBoxSample(sr, midi, dur) {
  const f = mtof(midi);
  const out = new Float32Array(Math.floor(sr * dur));
  additive(out, sr, [
    { f, amp: 1, tau: 1.1 },
    { f: f * 2, amp: 0.08, tau: 0.5 },
    { f: f * 6.27, amp: 0.2, tau: 0.18 },
    { f: f * 17.55, amp: 0.07, tau: 0.05 },
  ], 0.001);
  return fadeTail(normalize(out, 0.75), sr);
}

function glockSample(sr, midi, dur) {
  const f = mtof(midi);
  const out = new Float32Array(Math.floor(sr * dur));
  additive(out, sr, [
    { f, amp: 1, tau: 0.9 },
    { f: f * 2.76, amp: 0.3, tau: 0.35 },
    { f: f * 5.4, amp: 0.12, tau: 0.12 },
    { f: f * 8.93, amp: 0.05, tau: 0.05 },
  ], 0.001);
  return fadeTail(normalize(out, 0.75), sr);
}

function bellSample(sr, midi, dur) {
  const f = mtof(midi);
  const out = new Float32Array(Math.floor(sr * dur));
  additive(out, sr, [
    { f: f * 0.5, amp: 0.45, tau: 2.6 },
    { f, amp: 0.8, tau: 1.8 },
    { f: f * 1.19, amp: 0.4, tau: 1.2 },
    { f: f * 1.5, amp: 0.3, tau: 0.9 },
    { f: f * 2.0, amp: 0.55, tau: 0.8 },
    { f: f * 2.52, amp: 0.2, tau: 0.5 },
    { f: f * 3.01, amp: 0.15, tau: 0.35 },
    { f: f * 4.1, amp: 0.1, tau: 0.2 },
  ], 0.002);
  return fadeTail(normalize(out, 0.75), sr);
}

function marimbaSample(sr, midi, dur) {
  const f = mtof(midi);
  const out = new Float32Array(Math.floor(sr * dur));
  additive(out, sr, [
    { f, amp: 1, tau: 0.35 },
    { f: f * 3.93, amp: 0.25, tau: 0.08 },
    { f: f * 9.2, amp: 0.06, tau: 0.03 },
  ], 0.002);
  return fadeTail(normalize(out, 0.8), sr);
}

function kalimbaSample(sr, midi, dur) {
  const f = mtof(midi);
  const out = new Float32Array(Math.floor(sr * dur));
  additive(out, sr, [
    { f, amp: 1, tau: 0.7 },
    { f: f * 2, amp: 0.05, tau: 0.3 },
    { f: f * 5.9, amp: 0.15, tau: 0.06 },
    { f: f * 13.1, amp: 0.05, tau: 0.02 },
  ], 0.001);
  return fadeTail(normalize(out, 0.8), sr);
}

function epianoSample(sr, midi, dur) {
  // two-operator FM "tine" piano
  const f = mtof(midi);
  const len = Math.floor(sr * dur);
  const out = new Float32Array(len);
  const w = (2 * Math.PI * f) / sr;
  for (let i = 0; i < len; i++) {
    const t = i / sr;
    const idx = 0.35 + 1.6 * Math.exp(-t * 3.5);
    const tine = Math.sin(w * 14 * i) * 0.6 * Math.exp(-t * 40);
    const m = Math.sin(w * i) * idx + tine;
    const env = Math.exp(-t * (0.9 + f / 1200)) * Math.min(1, t * 800);
    out[i] = Math.sin(w * i + m) * env;
  }
  return fadeTail(normalize(out, 0.75), sr);
}

function harpSample(sr, midi, dur) {
  const out = pluck(sr, mtof(midi), dur, { bright: 0.35, damp: 0.9975, pickPos: 0.15, seed: midi * 31 });
  biquad(out, sr, 'lowpass', 5000, 0.7);
  return fadeTail(normalize(out, 0.8), sr);
}

function guitarSample(sr, midi, dur) {
  const out = pluck(sr, mtof(midi), dur, { bright: 0.4, damp: 0.9965, pickPos: 0.18, seed: midi * 17 });
  biquad(out, sr, 'peak', 180, 0.8, 3);
  biquad(out, sr, 'lowpass', 4200, 0.7);
  return fadeTail(normalize(out, 0.8), sr);
}

function pizzSample(sr, midi, dur) {
  const out = pluck(sr, mtof(midi), dur, { bright: 0.3, damp: 0.985, pickPos: 0.2, seed: midi * 13 });
  biquad(out, sr, 'lowpass', 2600, 0.7);
  biquad(out, sr, 'peak', 400, 1, 2);
  return fadeTail(normalize(out, 0.8), sr);
}

function harpsiSample(sr, midi, dur) {
  const a = pluck(sr, mtof(midi), dur, { bright: 0.95, damp: 0.998, pickPos: 0.08, seed: midi * 3 });
  const b = pluck(sr, mtof(midi + 12), dur, { bright: 0.95, damp: 0.997, pickPos: 0.1, seed: midi * 5 });
  for (let i = 0; i < a.length; i++) a[i] = a[i] + b[i] * 0.4;
  biquad(a, sr, 'highpass', 120, 0.7);
  return fadeTail(normalize(a, 0.8), sr);
}

function timpaniSample(sr, midi, dur) {
  const f = mtof(midi);
  const out = new Float32Array(Math.floor(sr * dur));
  additive(out, sr, [
    { f, amp: 1, tau: 0.9 },
    { f: f * 1.504, amp: 0.5, tau: 0.6 },
    { f: f * 1.742, amp: 0.3, tau: 0.45 },
    { f: f * 2.0, amp: 0.2, tau: 0.35 },
    { f: f * 2.245, amp: 0.1, tau: 0.25 },
  ], 0.003);
  const rnd = noiseGen(99);
  const n = new Float32Array(Math.floor(sr * 0.06));
  for (let i = 0; i < n.length; i++) n[i] = rnd() * Math.exp(-i / (sr * 0.012));
  biquad(n, sr, 'lowpass', 900, 0.7);
  for (let i = 0; i < n.length; i++) out[i] += n[i] * 0.6;
  return fadeTail(normalize(out, 0.85), sr);
}

function orchHitSample(sr, midi, dur) {
  const len = Math.floor(sr * dur);
  const out = new Float32Array(len);
  const rnd = noiseGen(7);
  const notes = [0, 7, 12, 16, 19, 24];
  for (const iv of notes) {
    const f = mtof(midi + iv);
    for (let d = -1; d <= 1; d++) {
      const ff = f * (1 + d * 0.004);
      let ph = rnd() * 0.5 + 0.5;
      for (let i = 0; i < len; i++) {
        ph += ff / sr;
        if (ph > 1) ph -= 1;
        out[i] += (2 * ph - 1) * 0.15;
      }
    }
  }
  for (let i = 0; i < len; i++) {
    const t = i / sr;
    out[i] = (out[i] + rnd() * 0.3 * Math.exp(-t * 30)) * Math.exp(-t * 5.5) * Math.min(1, t * 400);
  }
  biquad(out, sr, 'lowpass', 5200, 0.8);
  return fadeTail(normalize(out, 0.85), sr);
}

// ---------- drums ----------
function kick(sr) {
  const len = Math.floor(sr * 0.45);
  const out = new Float32Array(len);
  let ph = 0;
  const rnd = noiseGen(1);
  for (let i = 0; i < len; i++) {
    const t = i / sr;
    const f = 44 + 120 * Math.exp(-t * 28);
    ph += (2 * Math.PI * f) / sr;
    out[i] = Math.sin(ph) * Math.exp(-t * 6.5) + (t < 0.004 ? rnd() * 0.5 * (1 - t / 0.004) : 0);
  }
  for (let i = 0; i < len; i++) out[i] = Math.tanh(out[i] * 1.6);
  return normalize(out, 0.95);
}

function snare(sr) {
  const len = Math.floor(sr * 0.32);
  const n = new Float32Array(len);
  const rnd = noiseGen(2);
  for (let i = 0; i < len; i++) n[i] = rnd();
  biquad(n, sr, 'highpass', 900, 0.7);
  biquad(n, sr, 'peak', 4500, 1, 4);
  const out = new Float32Array(len);
  let p1 = 0, p2 = 0;
  for (let i = 0; i < len; i++) {
    const t = i / sr;
    p1 += (2 * Math.PI * 185) / sr;
    p2 += (2 * Math.PI * 330) / sr;
    out[i] = n[i] * Math.exp(-t * 16) * 0.8 + (Math.sin(p1) * 0.6 + Math.sin(p2) * 0.3) * Math.exp(-t * 30);
  }
  return normalize(out, 0.9);
}

function metallic(sr, dur, decay, seed) {
  const len = Math.floor(sr * dur);
  const out = new Float32Array(len);
  const freqs = [205.3, 304.4, 369.6, 522.7, 540, 800].map((f) => f * 1.7);
  const ph = freqs.map(() => 0);
  const rnd = noiseGen(seed);
  for (let i = 0; i < len; i++) {
    let s = 0;
    for (let k = 0; k < freqs.length; k++) {
      ph[k] += freqs[k] / sr;
      if (ph[k] > 1) ph[k] -= 1;
      s += ph[k] < 0.5 ? 1 : -1;
    }
    out[i] = (s / 6) * 0.6 + rnd() * 0.5;
  }
  biquad(out, sr, 'highpass', 7000, 0.7);
  biquad(out, sr, 'highpass', 6000, 0.7);
  for (let i = 0; i < len; i++) out[i] *= Math.exp(-(i / sr) * decay);
  return normalize(out, 0.8);
}

function crash(sr) {
  const len = Math.floor(sr * 1.8);
  const out = new Float32Array(len);
  const rnd = noiseGen(3);
  for (let i = 0; i < len; i++) out[i] = rnd();
  biquad(out, sr, 'highpass', 3000, 0.6);
  biquad(out, sr, 'peak', 6000, 0.8, 5);
  const m = metallic(sr, 1.8, 1.2, 4);
  for (let i = 0; i < len; i++) {
    const t = i / sr;
    out[i] = (out[i] * 0.7 + m[i] * 0.5) * (Math.exp(-t * 2.2) * 0.8 + Math.exp(-t * 12) * 0.4);
  }
  return normalize(out, 0.75);
}

function ride(sr) {
  const len = Math.floor(sr * 1.2);
  const out = new Float32Array(len);
  additive(out, sr, [
    { f: 3200, amp: 0.3, tau: 0.6 }, { f: 4570, amp: 0.25, tau: 0.5 },
    { f: 5310, amp: 0.2, tau: 0.4 }, { f: 7110, amp: 0.15, tau: 0.3 },
  ]);
  const m = metallic(sr, 1.2, 3.5, 5);
  for (let i = 0; i < len; i++) out[i] += m[i] * 0.35;
  return normalize(out, 0.7);
}

function tom(sr, f0) {
  const len = Math.floor(sr * 0.5);
  const out = new Float32Array(len);
  let ph = 0;
  const rnd = noiseGen(f0);
  for (let i = 0; i < len; i++) {
    const t = i / sr;
    const f = f0 * (1 + 0.6 * Math.exp(-t * 18));
    ph += (2 * Math.PI * f) / sr;
    out[i] = Math.sin(ph) * Math.exp(-t * 7) + rnd() * 0.08 * Math.exp(-t * 40);
  }
  return normalize(out, 0.9);
}

function clap(sr) {
  const len = Math.floor(sr * 0.4);
  const out = new Float32Array(len);
  const rnd = noiseGen(6);
  for (let i = 0; i < len; i++) {
    const t = i / sr;
    let env = 0;
    for (const o of [0, 0.011, 0.022]) if (t >= o) env = Math.max(env, Math.exp(-(t - o) * 180));
    env = Math.max(env, t > 0.03 ? Math.exp(-(t - 0.03) * 14) * 0.6 : 0);
    out[i] = rnd() * env;
  }
  biquad(out, sr, 'bandpass', 1200, 1.1);
  return normalize(out, 0.85);
}

function rim(sr) {
  const len = Math.floor(sr * 0.08);
  const out = new Float32Array(len);
  additive(out, sr, [{ f: 1700, amp: 1, tau: 0.012 }, { f: 510, amp: 0.6, tau: 0.02 }], 0.0005);
  return normalize(out, 0.8);
}

function shaker(sr) {
  const len = Math.floor(sr * 0.12);
  const out = new Float32Array(len);
  const rnd = noiseGen(8);
  for (let i = 0; i < len; i++) {
    const t = i / sr;
    out[i] = rnd() * Math.min(1, t * 120) * Math.exp(-t * 45);
  }
  biquad(out, sr, 'highpass', 5000, 0.7);
  return normalize(out, 0.6);
}

export const DRUM_MAP = ['kick', 'clap', 'snare', 'rim', 'hat', 'ohat', 'ride', 'tomlo', 'tommid', 'tomhi', 'shaker', 'crash'];

export function buildBank(ctx) {
  const sr = ctx.sampleRate;
  const bank = {};
  const multi = (name, fn, roots, durs) => {
    bank[name] = roots.map((root, i) => ({
      root,
      buffer: makeBuffer(ctx, fn(sr, root, Array.isArray(durs) ? durs[i] : durs)),
    }));
  };
  multi('piano', pianoSample, [36, 48, 60, 72, 84], [3.4, 3.0, 2.4, 1.8, 1.3]);
  multi('musicbox', musicBoxSample, [72, 84, 96], 1.8);
  multi('glock', glockSample, [72, 84, 96], 1.6);
  multi('bell', bellSample, [48, 60, 72, 84], [4, 3.5, 3, 2.5]);
  multi('marimba', marimbaSample, [48, 60, 72, 84], 1.0);
  multi('kalimba', kalimbaSample, [60, 72, 84], 1.4);
  multi('epiano', epianoSample, [48, 60, 72, 84], [2.6, 2.2, 1.8, 1.4]);
  multi('harp', harpSample, [36, 48, 60, 72, 84], [3, 2.6, 2.2, 1.8, 1.4]);
  multi('guitar', guitarSample, [40, 52, 64, 76], [2.4, 2.2, 1.8, 1.4]);
  multi('pizz', pizzSample, [43, 55, 67, 79], 0.7);
  multi('harpsi', harpsiSample, [48, 60, 72, 84], [1.8, 1.6, 1.3, 1.0]);
  multi('timpani', timpaniSample, [41, 48], 2.2);
  multi('orchhit', orchHitSample, [60], 0.9);
  const drums = {
    kick: kick(sr), snare: snare(sr), hat: metallic(sr, 0.12, 38, 11), ohat: metallic(sr, 0.5, 7, 12),
    crash: crash(sr), ride: ride(sr), tomlo: tom(sr, 95), tommid: tom(sr, 130), tomhi: tom(sr, 175),
    clap: clap(sr), rim: rim(sr), shaker: shaker(sr),
  };
  bank.drums = {};
  for (const k in drums) bank.drums[k] = makeBuffer(ctx, drums[k]);
  return bank;
}
