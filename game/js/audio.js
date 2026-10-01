// Audio: streamed music tracks + procedurally synthesised 8-bit sound effects (rendered once into AudioBuffers,
// quantised to 6 bits at 22 kHz so they match the bit-crushed menu track).

const SR = 22050;
const BITS = 6;
const store = (k, d) => { try { return localStorage.getItem('tuff.' + k) ?? d; } catch (e) { return d; } };
const save = (k, v) => { try { localStorage.setItem('tuff.' + k, v); } catch (e) { /* private mode */ } };

const TRACKS = {
  menu: { src: 'assets/audio/character-select.mp3', vol: 0.55 },        // bit-crushed Character Select
  snowdin: { src: 'assets/audio/snowdin-ruder-monsters.mp3', vol: 0.5 },   // untouched Ruder Monsters
};

let ctx = null, master = null, sfxGain = null;
const bank = {};
const state = {
  music: parseFloat(store('music', '1')), sfx: parseFloat(store('sfx', '1')),
  cur: null, els: {}, fade: null,
};

// --------------------------------------------------------------------------------------- synth
function noise() { let s = 12345; return () => ((s = (Math.imul(s, 1103515245) + 12345) >>> 0) / 2147483648) - 1; }
const rnd = noise();
function make(sec, fn) {
  const n = Math.floor(sec * SR), out = new Float32Array(n), lv = (1 << BITS) / 2 - 1;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let v = fn(t, i / n, i);
    v = v > 1 ? 1 : v < -1 ? -1 : v;
    out[i] = Math.round(v * lv) / lv;                       // bit-crush
  }
  return out;
}
const sq = (f, t, duty = 0.5) => ((t * f) % 1 < duty ? 1 : -1);
const tri = (f, t) => Math.abs(((t * f) % 1) * 4 - 2) - 1;
const saw = (f, t) => ((t * f) % 1) * 2 - 1;
const env = (p, a = 0.02, pow = 2) => (p < a ? p / a : Math.pow(1 - (p - a) / (1 - a), pow));

function lowpassNoise(sec, cutFn, amp = 1) {
  const r = rnd; let y = 0;
  return make(sec, (t, p) => { const k = cutFn(p); y += (r() - y) * k; return y * amp; });
}

const SFX = {
  menuMove: () => make(0.05, (t, p) => sq(900, t) * env(p, 0.05) * 0.4),
  menuOk: () => make(0.18, (t, p) => sq(t < 0.07 ? 660 : 990, t, 0.25) * env(p, 0.02, 1.5) * 0.45),
  menuBack: () => make(0.14, (t, p) => sq(t < 0.06 ? 440 : 330, t) * env(p, 0.02, 1.5) * 0.4),
  count: () => make(0.14, (t, p) => sq(620, t) * env(p, 0.03, 1) * 0.5),
  fight: () => make(0.45, (t, p) => (sq(t < 0.12 ? 520 : 780, t, 0.3) + sq(t < 0.12 ? 262 : 392, t, 0.5) * 0.6) * env(p, 0.02, 1.2) * 0.42),
  swingL: () => lowpassNoise(0.11, (p) => 0.05 + 0.5 * p, 1.4).map((v, i, a) => v * env(i / a.length, 0.1, 1)),
  swingH: () => lowpassNoise(0.2, (p) => 0.04 + 0.4 * p, 1.7).map((v, i, a) => v * env(i / a.length, 0.15, 1)),
  hit1: () => make(0.12, (t, p) => (rnd() * 0.5 + sq(240 - 120 * p, t, 0.4) * 0.6) * env(p, 0.01, 2) * 0.9),
  hit2: () => make(0.2, (t, p) => (rnd() * 0.5 + tri(130 - 70 * p, t) * 0.9) * env(p, 0.01, 1.6)),
  hit3: () => make(0.34, (t, p) => (rnd() * 0.55 * (1 - p) + tri(95 - 55 * p, t) * 1.0 + sq(1500 - 1200 * p, t, 0.3) * 0.25 * (1 - p * 3 > 0 ? 1 - p * 3 : 0)) * env(p, 0.008, 1.5)),
  block: () => make(0.12, (t, p) => (sq(1300, t, 0.3) * 0.5 + sq(1950, t, 0.5) * 0.4) * env(p, 0.005, 3) * 0.7),
  parry: () => make(0.3, (t, p) => sq(t < 0.08 ? 900 : t < 0.16 ? 1350 : 1800, t, 0.25) * env(p, 0.01, 1.3) * 0.5),
  gbreak: () => make(0.45, (t, p) => (rnd() * 0.4 * (1 - p) + sq(900 - 700 * p, t, 0.2) * 0.5) * env(p, 0.005, 1.4)),
  dodge: () => lowpassNoise(0.14, (p) => 0.1 + 0.3 * p, 0.8).map((v, i, a) => v * env(i / a.length, 0.2, 1.2)),
  break: () => make(0.3, (t, p) => (sq(300 + 900 * p, t, 0.5) * 0.45 + rnd() * 0.2) * env(p, 0.01, 1.2)),
  tele: () => make(0.3, (t, p) => (tri(1400 - 1200 * p, t) * 0.6 + rnd() * 0.25 * (1 - p)) * env(p, 0.02, 1.1)),
  charge: () => make(0.6, (t, p) => (saw(90 + 520 * p * p, t) * 0.5 + sq(180 + 1040 * p * p, t, 0.25) * 0.2) * (0.4 + 0.6 * p) * (0.8 + 0.2 * sq(18, t))),
  blaster: () => make(0.75, (t, p) => (saw(70 - 30 * p, t) * 0.6 + rnd() * 0.55 * (1 - p) + sq(160 - 90 * p, t, 0.5) * 0.4) * env(p, 0.01, 1.3)),
  orb: () => make(0.3, (t, p) => { const f = 500 + (Math.floor(t * 60) * 7919 % 900); return sq(f, t, 0.3) * env(p, 0.01, 1.3) * 0.5; }),
  zap: () => make(0.25, (t, p) => (rnd() * 0.5 + sq(300 + (Math.floor(t * 90) * 5419 % 1200), t, 0.3) * 0.5) * env(p, 0.01, 1.5)),
  stomp: () => make(0.4, (t, p) => (tri(70 - 40 * p, t) * 1.0 + rnd() * 0.4 * (1 - p)) * env(p, 0.005, 1.6)),
  bone: () => make(0.1, (t, p) => (sq(t < 0.04 ? 340 : 230, t, 0.35) * 0.8 + rnd() * 0.2) * env(p, 0.005, 2.2)),
  ko: () => make(0.9, (t, p) => (rnd() * 0.7 * (1 - p) + tri(180 - 150 * p, t) * 0.9 + sq(1200 - 900 * p, t, 0.2) * 0.2 * (1 - p)) * env(p, 0.005, 1.2)),
  super: () => make(0.7, (t, p) => (saw(140 + 900 * p, t) * 0.45 + sq(280 + 1800 * p, t, 0.25) * 0.3) * (0.3 + 0.7 * p) * (p > 0.92 ? 0.3 : 1)),
  spawn: () => make(0.4, (t, p) => tri(300 + 700 * p, t) * env(p, 0.1, 1.1) * 0.5 * (0.8 + 0.2 * sq(30, t))),
  win: () => make(0.9, (t, p) => { const n = [523, 659, 784, 1047][Math.min(3, Math.floor(t / 0.12))]; return sq(n, t, 0.3) * (t < 0.48 ? env((t % 0.12) / 0.12, 0.02, 1) : env((t - 0.48) / 0.42, 0.02, 1.5)) * 0.45; }),
  blipLow: () => make(0.07, (t, p) => sq(110, t) * env(p, 0.05, 1) * 0.6),
  blipHigh: () => make(0.07, (t, p) => sq(260, t) * env(p, 0.05, 1) * 0.55),
};

function ensure() {
  if (ctx) return true;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();
  master = ctx.createGain(); master.connect(ctx.destination);
  sfxGain = ctx.createGain(); sfxGain.gain.value = state.sfx; sfxGain.connect(master);
  for (const [k, fn] of Object.entries(SFX)) {
    const data = fn();
    const buf = ctx.createBuffer(1, data.length, SR);
    buf.getChannelData(0).set(data);
    bank[k] = buf;
  }
  return true;
}

// --------------------------------------------------------------------------------------- music
function trackEl(name) {
  if (!state.els[name]) {
    const a = new Audio(TRACKS[name].src);
    a.loop = true; a.preload = 'auto'; a.volume = 0;
    state.els[name] = a;
  }
  return state.els[name];
}

function tickFade() {
  let busy = false;
  for (const [name, a] of Object.entries(state.els)) {
    const target = state.cur === name ? TRACKS[name].vol * state.music : 0;
    const d = target - a.volume;
    if (Math.abs(d) > 0.004) { a.volume = Math.max(0, Math.min(1, a.volume + Math.sign(d) * 0.012)); busy = true; }
    else { a.volume = Math.max(0, target); if (target === 0 && !a.paused) a.pause(); }
  }
  state.fade = busy ? requestAnimationFrame(tickFade) : null;
}

export const Sound = {
  get musicVol() { return state.music; }, get sfxVol() { return state.sfx; },
  unlock() { if (ensure() && ctx.state === 'suspended') ctx.resume(); },
  music(name) {                                  // 'menu' | 'snowdin' | null
    if (state.cur === name) return;
    state.cur = name;
    if (name && state.music > 0) { const a = trackEl(name); if (a.paused) { const p = a.play(); if (p && p.catch) p.catch(() => {}); } }
    if (!state.fade) state.fade = requestAnimationFrame(tickFade);
  },
  restart(name) { const a = trackEl(name); try { a.currentTime = 0; } catch (e) { /* not ready */ } },
  play(name, { vol = 1, rate = 1 } = {}) {
    if (!ensure() || state.sfx <= 0 || !bank[name]) return;
    if (ctx.state === 'suspended') ctx.resume();
    const src = ctx.createBufferSource(); src.buffer = bank[name]; src.playbackRate.value = rate;
    const g = ctx.createGain(); g.gain.value = vol;
    src.connect(g); g.connect(sfxGain); src.start();
  },
  setMusic(v) { state.music = v; save('music', v); if (state.cur) { const a = trackEl(state.cur); if (v > 0 && a.paused) { const p = a.play(); if (p && p.catch) p.catch(() => {}); } } if (!state.fade) state.fade = requestAnimationFrame(tickFade); },
  setSfx(v) { state.sfx = v; save('sfx', v); if (sfxGain) sfxGain.gain.value = v; },
};
