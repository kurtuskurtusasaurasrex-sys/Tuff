// Offline DSP used to render instrument samples once at boot.
// Everything here is plain math on Float32Arrays.

export function makeBuffer(ctx, data, channels = 1) {
  const len = channels === 1 ? data.length : data[0].length;
  const buf = ctx.createBuffer(channels, len, ctx.sampleRate);
  if (channels === 1) buf.copyToChannel(data, 0);
  else for (let c = 0; c < channels; c++) buf.copyToChannel(data[c], c);
  return buf;
}

// Sum of exponentially decaying sinusoids using a rotating phasor
// (much faster than Math.sin per sample).
export function additive(out, sr, partials, attack = 0.002) {
  const len = out.length;
  const atk = Math.max(1, Math.floor(attack * sr));
  for (const p of partials) {
    if (p.f <= 0 || p.f >= sr * 0.45) continue;
    const w = (2 * Math.PI * p.f) / sr;
    const cw = Math.cos(w), sw = Math.sin(w);
    let re = Math.cos(p.phase || 0), im = Math.sin(p.phase || 0);
    let a = p.amp;
    const k = Math.exp(-1 / (p.tau * sr));
    const start = p.delay ? Math.floor(p.delay * sr) : 0;
    for (let i = start; i < len; i++) {
      const env = i - start < atk ? (i - start) / atk : 1;
      out[i] += a * im * env;
      const nre = re * cw - im * sw;
      im = re * sw + im * cw;
      re = nre;
      a *= k;
      if (a < 1e-5) break;
    }
  }
  return out;
}

export function normalize(buf, peak = 0.85) {
  let m = 0;
  for (let i = 0; i < buf.length; i++) m = Math.max(m, Math.abs(buf[i]));
  if (m > 0) {
    const g = peak / m;
    for (let i = 0; i < buf.length; i++) buf[i] *= g;
  }
  return buf;
}

export function fadeTail(buf, sr, sec = 0.05) {
  const n = Math.min(buf.length, Math.floor(sec * sr));
  for (let i = 0; i < n; i++) buf[buf.length - 1 - i] *= i / n;
  return buf;
}

// Seeded noise so samples are identical every boot.
export function noiseGen(seed = 12345) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return (s / 4294967296) * 2 - 1;
  };
}

// RBJ biquad, processed in place.
export function biquad(buf, sr, type, freq, q = 0.707, gainDb = 0) {
  const w0 = (2 * Math.PI * Math.min(freq, sr * 0.49)) / sr;
  const cos = Math.cos(w0), sin = Math.sin(w0);
  const alpha = sin / (2 * q);
  const A = Math.pow(10, gainDb / 40);
  let b0, b1, b2, a0, a1, a2;
  switch (type) {
    case 'lowpass':
      b0 = (1 - cos) / 2; b1 = 1 - cos; b2 = (1 - cos) / 2;
      a0 = 1 + alpha; a1 = -2 * cos; a2 = 1 - alpha; break;
    case 'highpass':
      b0 = (1 + cos) / 2; b1 = -(1 + cos); b2 = (1 + cos) / 2;
      a0 = 1 + alpha; a1 = -2 * cos; a2 = 1 - alpha; break;
    case 'bandpass':
      b0 = alpha; b1 = 0; b2 = -alpha;
      a0 = 1 + alpha; a1 = -2 * cos; a2 = 1 - alpha; break;
    case 'peak':
      b0 = 1 + alpha * A; b1 = -2 * cos; b2 = 1 - alpha * A;
      a0 = 1 + alpha / A; a1 = -2 * cos; a2 = 1 - alpha / A; break;
    default: return buf;
  }
  b0 /= a0; b1 /= a0; b2 /= a0; a1 /= a0; a2 /= a0;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < buf.length; i++) {
    const x = buf[i];
    const y = b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
    buf[i] = y;
  }
  return buf;
}

// Karplus-Strong plucked string.
export function pluck(sr, freq, dur, opts = {}) {
  const len = Math.floor(sr * dur);
  const out = new Float32Array(len);
  const period = sr / freq;
  // averaging filter adds half a sample; an allpass covers the fraction
  const N = Math.max(2, Math.floor(period - 0.6));
  const frac = period - 0.5 - N;
  const C = (1 - frac) / (1 + frac);
  const line = new Float32Array(N);
  const rnd = noiseGen(opts.seed ?? Math.floor(freq * 100));
  const bright = opts.bright ?? 0.5;
  // excitation: filtered noise burst, optionally shaped by pick position
  let lp = 0;
  for (let i = 0; i < line.length; i++) {
    const n = rnd();
    lp = lp + (n - lp) * (0.2 + bright * 0.8);
    line[i] = lp;
  }
  if (opts.pickPos) {
    const d = Math.floor(N * opts.pickPos);
    for (let i = line.length - 1; i >= d; i--) line[i] -= line[i - d] * 0.9;
  }
  const damp = opts.damp ?? 0.996;
  const blend = opts.blend ?? 0.5; // 0.5 = classic averaging
  let idx = 0, prev = 0, apX = 0, apY = 0;
  for (let i = 0; i < len; i++) {
    const cur = line[idx];
    const avg = damp * (cur * blend + prev * (1 - blend));
    prev = cur;
    const ap = C * avg + apX - C * apY;
    apX = avg; apY = ap;
    out[i] = cur;
    line[idx] = ap;
    idx = idx + 1 === N ? 0 : idx + 1;
  }
  return out;
}

export const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
