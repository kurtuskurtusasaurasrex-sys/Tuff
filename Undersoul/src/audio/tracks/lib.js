// Composition helpers. Melodies are written by hand in MML; these build the
// accompaniment (voice-led pads, arpeggios, bass lines, comping) from chord
// progressions so the harmony under every tune stays correct.

const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const NAMES = ['c', 'c+', 'd', 'd+', 'e', 'f', 'f+', 'g', 'g+', 'a', 'a+', 'b'];
const QUAL = {
  '': [0, 4, 7], m: [0, 3, 7], '7': [0, 4, 7, 10], maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10],
  dim: [0, 3, 6], dim7: [0, 3, 6, 9], m7b5: [0, 3, 6, 10], aug: [0, 4, 8], sus4: [0, 5, 7], sus2: [0, 2, 7],
  add9: [0, 4, 7, 14], madd9: [0, 3, 7, 14], '6': [0, 4, 7, 9], m6: [0, 3, 7, 9], '9': [0, 4, 7, 10, 14],
  m9: [0, 3, 7, 10, 14], maj9: [0, 4, 7, 11, 14], '7sus4': [0, 5, 7, 10], '5': [0, 7],
};

function pcOf(s) {
  let p = PC[s[0].toLowerCase()];
  for (const ch of s.slice(1)) {
    if (ch === '#' || ch === '+') p++;
    else if (ch === 'b' || ch === '-') p--;
  }
  return (p + 12) % 12;
}

export function parseChord(sym) {
  const [main, slash] = sym.split('/');
  const m = /^([A-Ga-g][#b+-]?)(.*)$/.exec(main);
  const root = pcOf(m[1]);
  const q = QUAL[m[2]] ? m[2] : m[2].replace(/^M/, 'maj');
  const iv = QUAL[q] || QUAL[''];
  return { root, iv, bass: slash ? pcOf(slash) : root, sym };
}

// "D G Bm:2 A7:2" -> [{chord, beats}]
export function prog(str, beats = 4) {
  return str.trim().split(/\s+/).filter((t) => t !== '|').map((tok) => {
    const [sym, b] = tok.split(':');
    return sym === 'r' || sym === '-'
      ? { chord: null, beats: b ? parseFloat(b) : beats }
      : { chord: parseChord(sym), beats: b ? parseFloat(b) : beats };
  });
}

const LENS = [[4, '1'], [3, '2.'], [2, '2'], [1.5, '4.'], [1, '4'], [0.75, '8.'], [0.5, '8'],
  [1 / 3, '12'], [0.375, '16.'], [0.25, '16'], [1 / 6, '24'], [0.125, '32']];

export function len(beats) {
  const parts = [];
  let b = beats;
  let guard = 0;
  while (b > 0.001 && guard++ < 40) {
    const hit = LENS.find(([l]) => l <= b + 0.0001);
    if (!hit) break;
    parts.push(hit[1]);
    b -= hit[0];
  }
  return parts.join('^') || '32';
}

export const note = (midi, beats) => `o${Math.floor(midi / 12) - 1}${NAMES[midi % 12]}${len(beats)}`;
export const rest = (beats) => `r${len(beats)}`;
export const chordMml = (notes, beats) =>
  notes.length === 1 ? note(notes[0], beats) : `(${notes.map((m) => `o${Math.floor(m / 12) - 1}${NAMES[m % 12]}`).join(' ')})${len(beats)}`;

// Closest-voicing voice leading: choose the inversion of each chord that
// moves least from the previous voicing.
function voice(chord, center, prev, count = 3) {
  const pcs = chord.iv.slice(0, Math.max(count, 3)).map((i) => (chord.root + i) % 12);
  const uniq = [...new Set(pcs)];
  let best = null, bestCost = Infinity;
  for (let inv = 0; inv < uniq.length; inv++) {
    const order = uniq.slice(inv).concat(uniq.slice(0, inv));
    for (let base = center - 12; base <= center + 6; base++) {
      if (base % 12 !== order[0]) continue;
      const v = [base];
      for (let k = 1; k < order.length; k++) {
        let n = v[k - 1] + 1;
        while (n % 12 !== order[k]) n++;
        v.push(n);
      }
      const mid = v.reduce((a, b) => a + b, 0) / v.length;
      let cost = Math.abs(mid - center) * 0.6;
      if (prev) for (let k = 0; k < Math.min(v.length, prev.length); k++) cost += Math.abs(v[k] - prev[k]);
      if (cost < bestCost) { bestCost = cost; best = v; }
    }
  }
  return best;
}

// Sustained, voice-led chords.
export function pad(p, center = 64, opts = {}) {
  let prev = null;
  return p.map(({ chord, beats }) => {
    if (!chord) return rest(beats);
    const v = voice(chord, center, prev, opts.voices ?? 3);
    prev = v;
    if (opts.split) {
      // re-strike every `split` beats
      const out = [];
      let b = beats;
      while (b > 0.001) { const s = Math.min(opts.split, b); out.push(chordMml(v, s)); b -= s; }
      return out.join(' ');
    }
    return chordMml(v, beats);
  }).join(' ');
}

// Arpeggio. pattern: indices into [root-low, chord tones ascending...];
// numbers >= 10 add an octave (e.g. 10 = first tone up an octave).
export function arp(p, pattern, step = 0.5, center = 57, opts = {}) {
  let prev = null;
  return p.map(({ chord, beats }) => {
    if (!chord) return rest(beats);
    const v = voice(chord, center, prev, opts.voices ?? 3);
    prev = v;
    let bass = chord.bass;
    let b0 = v[0] - 12;
    while (b0 % 12 !== bass) b0--;
    const tones = [b0, ...v];
    const out = [];
    let t = 0, i = 0;
    while (t < beats - 0.001) {
      const idx = pattern[i % pattern.length];
      const oct = Math.floor(idx / 10);
      const k = idx % 10;
      const d = Math.min(step, beats - t);
      if (idx < 0) out.push(rest(d));
      else out.push(note(tones[k % tones.length] + 12 * oct + (k >= tones.length ? 12 : 0), d));
      t += d; i++;
    }
    return out.join(' ');
  }).join(' ');
}

// Bass lines. style: 'whole' 'half' 'pump' 'walk' 'octave' 'root5' 'waltz'
// or a rhythm string like "x..x..x." (x = root, 5 = fifth, o = octave,
// 3 = third, - = rest, . = hold previous) over 8th-notes by default.
export function bass(p, style = 'whole', base = 38, opts = {}) {
  const out = [];
  const rootMidi = (pc) => {
    let m = base;
    while (m % 12 !== pc) m++;
    if (m - base > 6) m -= 12;
    return m;
  };
  p.forEach(({ chord, beats }, idx) => {
    if (!chord) { out.push(rest(beats)); return; }
    const r = rootMidi(chord.bass);
    const fifth = r + 7;
    const third = r + chord.iv[1];
    if (style === 'whole') out.push(note(r, beats));
    else if (style === 'half') {
      let t = 0, k = 0;
      while (t < beats - 0.001) { const d = Math.min(2, beats - t); out.push(note(k % 2 ? fifth - 12 : r, d)); t += d; k++; }
    } else if (style === 'pump') {
      for (let t = 0; t < beats - 0.001; t += 0.5) out.push(note(r, 0.5));
    } else if (style === 'octave') {
      for (let t = 0, k = 0; t < beats - 0.001; t += 0.5, k++) out.push(note(k % 2 ? r + 12 : r, 0.5));
    } else if (style === 'root5') {
      for (let t = 0, k = 0; t < beats - 0.001; t += 1, k++) out.push(note([r, fifth, r + 12, fifth][k % 4], 1));
    } else if (style === 'waltz') {
      for (let t = 0; t < beats - 0.001; t += 3) out.push(note(r, 1), rest(2));
    } else if (style === 'walk') {
      const next = p[(idx + 1) % p.length].chord;
      const nr = next ? rootMidi(next.bass) : r;
      const steps = Math.round(beats);
      const line = [r, third, fifth, nr > r ? nr - 1 : nr + 1];
      if (steps === 2) out.push(note(r, 1), note(nr > r ? nr - 1 : nr + 1, 1));
      else for (let k = 0; k < steps; k++) out.push(note(k < 4 ? line[k] : line[k % 4], 1));
    } else {
      // rhythm string
      const stepLen = opts.step ?? 0.5;
      const pat = style;
      let t = 0, i = 0;
      const pending = [];
      while (t < beats - 0.001) {
        const c = pat[i % pat.length];
        const m = c === 'x' ? r : c === '5' ? fifth : c === 'o' ? r + 12 : c === '3' ? third : c === 'l' ? r - 12 : c === '7' ? r + (chord.iv[3] ?? 10) : null;
        if (m != null) pending.push([m, stepLen]);
        else if (c === '.' && pending.length) pending[pending.length - 1][1] += stepLen;
        else pending.push([null, stepLen]);
        t += stepLen; i++;
      }
      for (const [m, d] of pending) out.push(m == null ? rest(d) : note(m, d));
    }
  });
  return out.join(' ');
}

// Rhythmic chord comping: rhythm over 8ths, x = hit, . = hold, - = rest.
export function comp(p, rhythm, center = 64, opts = {}) {
  let prev = null;
  const step = opts.step ?? 0.5;
  return p.map(({ chord, beats }) => {
    if (!chord) return rest(beats);
    const v = voice(chord, center, prev, opts.voices ?? 3);
    prev = v;
    const out = [];
    let t = 0, i = 0;
    const items = [];
    while (t < beats - 0.001) {
      const c = rhythm[i % rhythm.length];
      if (c === 'x') items.push([v, step]);
      else if (c === '.' && items.length) items[items.length - 1][1] += step;
      else items.push([null, step]);
      t += step; i++;
    }
    for (const [notes, d] of items) out.push(notes ? chordMml(notes, d) : rest(d));
    return out.join(' ');
  }).join(' ');
}

// Oom-pah(-pah): bass on 1, chord on the rest.
export function oompah(p, beatsPerBar = 3, bassBase = 38, center = 60) {
  let prev = null;
  const out = [];
  p.forEach(({ chord, beats }) => {
    if (!chord) { out.push(rest(beats)); return; }
    const v = voice(chord, center, prev, 3);
    prev = v;
    let r = bassBase;
    while (r % 12 !== chord.bass) r++;
    if (r - bassBase > 6) r -= 12;
    for (let t = 0; t < beats - 0.001; t += beatsPerBar) {
      out.push(note(r, 1));
      for (let k = 1; k < beatsPerBar; k++) out.push(chordMml(v, 1));
    }
  });
  return out.join(' ');
}

export const rep = (s, n) => Array(n).fill(s).join(' ');
export const totalBeats = (p) => p.reduce((a, b) => a + b.beats, 0);
