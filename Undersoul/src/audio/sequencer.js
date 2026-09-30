// MML sequencer. Tracks are hand-written in a Music Macro Language dialect:
//   c d e f g a b   notes (+ or # sharp, - flat), then optional length
//   4 = quarter, 8 = eighth, 12 = eighth-triplet, dots extend, ^8 ties
//   r rest   o4 octave   < down   > up   l8 default length   v0-15 velocity
//   q1-8 gate   k-2 transpose   @piano instrument   L loop point
//   [ ... | ... ]3 repeat (part after | is skipped on the final pass)
//   (c e g)2 chord     ; comment to end of line
// Drum channels: c kick, c+ clap, d snare, d+ rim, e hat, f open hat,
//   f+ ride, g low tom, g+ mid tom, a high tom, a+ shaker, b crash
import { audio } from './audio.js';
import { makeRng } from '../core/util.js';

const NOTE = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };

function findClose(s, i, open, close) {
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === open) depth++;
    else if (s[j] === close) { depth--; if (depth === 0) return j; }
  }
  throw new Error('MML: unbalanced ' + open);
}

function splitTop(s, sep) {
  const parts = [];
  let depth = 0, last = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[') depth++;
    else if (s[i] === ']') depth--;
    else if (s[i] === sep && depth === 0) { parts.push(s.slice(last, i)); last = i + 1; }
  }
  parts.push(s.slice(last));
  return parts;
}

function parseSeq(s, st, ev) {
  let i = 0;
  const readNum = () => {
    const m = /^-?\d+/.exec(s.slice(i, i + 6));
    if (!m) return null;
    i += m[0].length;
    return parseInt(m[0], 10);
  };
  const readDots = (b) => {
    let add = b / 2, beats = b;
    while (s[i] === '.') { beats += add; add /= 2; i++; }
    return beats;
  };
  const readLen = () => {
    const n = readNum();
    let beats = readDots(n ? 4 / n : st.len);
    while (s[i] === '^') {
      i++;
      const m = readNum();
      beats += readDots(m ? 4 / m : st.len);
    }
    return beats;
  };
  const push = (midi, beats) => {
    ev.push({ t: st.t, d: beats, m: midi + st.tr, v: st.vel / 15, g: st.gate, ins: st.ins });
  };
  while (i < s.length) {
    const c = s[i];
    if (c === ' ' || c === '\n' || c === '\t' || c === '\r' || c === '|') { i++; continue; }
    if (NOTE[c] !== undefined) {
      i++;
      let semi = NOTE[c];
      while (s[i] === '+' || s[i] === '#') { semi++; i++; }
      while (s[i] === '-') { semi--; i++; }
      const beats = readLen();
      push((st.oct + 1) * 12 + semi, beats);
      st.t += beats;
      continue;
    }
    switch (c) {
      case 'r': { i++; st.t += readLen(); break; }
      case 'o': { i++; st.oct = readNum() ?? 4; break; }
      case '<': { i++; st.oct--; break; }
      case '>': { i++; st.oct++; break; }
      case 'l': { i++; const n = readNum(); st.len = readDots(4 / (n || 4)); break; }
      case 'v': { i++; st.vel = readNum() ?? 12; break; }
      case 'q': { i++; st.gate = (readNum() ?? 7) / 8; break; }
      case 'k': { i++; st.tr = readNum() ?? 0; break; }
      case 'L': { i++; st.loopAt = st.t; break; }
      case '@': {
        i++;
        const m = /^[a-z0-9_]+/.exec(s.slice(i));
        if (m) { st.ins = m[0]; i += m[0].length; }
        break;
      }
      case '[': {
        const j = findClose(s, i, '[', ']');
        const body = s.slice(i + 1, j);
        i = j + 1;
        const n = readNum() ?? 2;
        const parts = splitTop(body, '|');
        for (let k = 0; k < n; k++) {
          parseSeq(parts[0], st, ev);
          if (parts.length > 1 && k < n - 1) parseSeq(parts.slice(1).join('|'), st, ev);
        }
        break;
      }
      case '(': {
        const j = findClose(s, i, '(', ')');
        const body = s.slice(i + 1, j);
        i = j + 1;
        let oct = st.oct;
        const notes = [];
        for (let k = 0; k < body.length; k++) {
          const ch = body[k];
          if (NOTE[ch] !== undefined) {
            let semi = NOTE[ch];
            while (body[k + 1] === '+' || body[k + 1] === '#') { semi++; k++; }
            while (body[k + 1] === '-') { semi--; k++; }
            notes.push((oct + 1) * 12 + semi);
          } else if (ch === '<') oct--;
          else if (ch === '>') oct++;
          else if (ch === 'o') { oct = parseInt(body[k + 1], 10); k++; }
        }
        const beats = readLen();
        for (const m of notes) push(m, beats);
        st.t += beats;
        break;
      }
      case ';': { while (i < s.length && s[i] !== '\n') i++; break; }
      default:
        console.warn('MML: unexpected', JSON.stringify(c), 'near', JSON.stringify(s.slice(Math.max(0, i - 12), i + 12)));
        i++;
    }
  }
}

export function parseChannel(src, ins) {
  const st = { t: 0, oct: 4, len: 1, vel: 12, gate: 0.92, tr: 0, ins, loopAt: null };
  const events = [];
  parseSeq(src.replace(/;[^\n]*/g, ''), st, events);
  events.sort((a, b) => a.t - b.t);
  return { events, length: st.t, loopAt: st.loopAt };
}

const TRACKS = {};
const PARSED = {};

export function registerTracks(obj) { Object.assign(TRACKS, obj); }
export function trackIds() { return Object.keys(TRACKS); }

export function parseTrack(id) {
  if (PARSED[id]) return PARSED[id];
  const def = TRACKS[id];
  if (!def) return null;
  const chans = def.ch.map((c) => ({ ...c, ...parseChannel(c.mml, c.ins) }));
  let length = 0;
  for (const c of chans) length = Math.max(length, c.length);
  const loopAt = chans.find((c) => c.loopAt != null)?.loopAt ?? 0;
  const p = { id, def, chans, length: def.length ?? length, loopAt };
  PARSED[id] = p;
  return p;
}

// Development aid: report channels whose lengths disagree.
export function validateTracks() {
  const report = [];
  for (const id of Object.keys(TRACKS)) {
    try {
      const p = parseTrack(id);
      const lens = p.chans.map((c) => +c.length.toFixed(3));
      const bad = lens.filter((l) => Math.abs(l - p.length) > 0.01 && l > 0);
      if (bad.length) report.push(`${id}: lengths ${lens.join(', ')}`);
      const loops = p.chans.map((c) => c.loopAt).filter((x) => x != null);
      if (loops.some((l) => Math.abs(l - loops[0]) > 0.01)) report.push(`${id}: loop points ${loops.join(', ')}`);
    } catch (e) {
      report.push(`${id}: ${e.message}`);
    }
  }
  return report;
}

class TrackPlayer {
  constructor(parsed, opts) {
    const ctx = audio.ctx;
    this.p = parsed;
    this.def = parsed.def;
    this.rate = opts.rate ?? 1;
    this.pitch = opts.pitch ?? 0;
    this.loop = this.def.loop !== false && opts.loop !== false;
    this.spb = 60 / (this.def.bpm * this.rate);
    this.start = ctx.currentTime + 0.08;
    this.rng = makeRng(opts.seed ?? 1234);
    this.swing = this.def.swing ?? 0;
    this.out = ctx.createGain();
    this.out.gain.value = 0;
    const vol = (opts.volume ?? 1) * (this.def.volume ?? 1);
    this.out.gain.setValueAtTime(0, ctx.currentTime);
    this.out.gain.linearRampToValueAtTime(vol, ctx.currentTime + Math.max(0.01, opts.fade ?? 0.02));
    this.out.connect(audio.musicOut);
    this.done = false;
    this.chans = parsed.chans.map((c) => {
      const g = ctx.createGain();
      g.gain.value = c.vol ?? 0.7;
      const pan = ctx.createStereoPanner();
      pan.pan.value = c.pan ?? 0;
      g.connect(pan);
      let tail = pan;
      if (c.lp) {
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.value = c.lp;
        tail.connect(f);
        tail = f;
      }
      if (c.dist) {
        const ws = ctx.createWaveShaper();
        ws.curve = distCurve(c.dist);
        ws.oversample = '2x';
        const post = ctx.createBiquadFilter();
        post.type = 'lowpass';
        post.frequency.value = 3800;
        tail.connect(ws);
        ws.connect(post);
        tail = post;
      }
      tail.connect(this.out);
      if (c.rev) {
        const rs = ctx.createGain();
        rs.gain.value = c.rev;
        tail.connect(rs);
        rs.connect(audio.musicSend);
        this.sends = (this.sends || []).concat(rs);
      }
      if (c.echo) {
        const es = ctx.createGain();
        es.gain.value = c.echo;
        tail.connect(es);
        es.connect(audio.musicEchoSend);
        this.sends = (this.sends || []).concat(es);
      }
      return { src: c, input: g, idx: 0, cycle: 0 };
    });
    // tempo-synced echo: dotted eighth
    audio.echoDelay.delayTime.setValueAtTime(Math.min(1.9, this.spb * (this.def.echoBeats ?? 0.75)), ctx.currentTime);
  }

  beatToTime(b) { return this.start + b * this.spb; }

  pump(until) {
    if (this.done) return;
    const len = this.p.length;
    const loopLen = len - this.p.loopAt;
    let active = false;
    for (const ch of this.chans) {
      const evs = ch.src.events;
      let guard = 0;
      while (guard++ < 400) {
        if (ch.idx >= evs.length) {
          if (!this.loop || loopLen <= 0.001) break;
          ch.cycle += loopLen;
          ch.idx = evs.findIndex((e) => e.t >= this.p.loopAt - 1e-6);
          if (ch.idx < 0) { ch.idx = evs.length; break; }
        }
        const e = evs[ch.idx];
        let beat = e.t + ch.cycle;
        if (this.swing && Math.abs((e.t % 1) - 0.5) < 0.001) beat += this.swing * 0.5;
        const when = this.beatToTime(beat);
        if (when > until) { active = true; break; }
        ch.idx++;
        if (when < audio.ctx.currentTime - 0.05) continue;
        const isDrum = e.ins === 'drums';
        const jitter = (this.rng.next() - 0.5) * (isDrum ? 0.004 : 0.01);
        let vel = e.v * (1 + (this.rng.next() - 0.5) * 0.12);
        if (Math.abs(e.t % 4) < 0.001) vel *= 1.06;
        else if (Math.abs(e.t % 1) < 0.001) vel *= 1.02;
        vel = Math.min(1, vel);
        const dur = e.d * this.spb * e.g;
        audio.playNote(e.ins, e.m, Math.max(audio.ctx.currentTime, when + jitter), dur, vel, ch.input, { pitch: this.pitch });
        active = true;
      }
    }
    if (!this.loop && !active) {
      const endTime = this.beatToTime(len);
      if (audio.ctx.currentTime > endTime + 2) this.done = true;
    }
  }

  // Position in beats within the song (for syncing visuals).
  beat() {
    const b = (audio.ctx.currentTime - this.start) / this.spb;
    if (!this.loop || b < this.p.length) return b;
    const loopLen = this.p.length - this.p.loopAt;
    return this.p.loopAt + ((b - this.p.loopAt) % loopLen);
  }

  stop(fade = 0.5) {
    const ctx = audio.ctx;
    const t = ctx.currentTime;
    this.out.gain.cancelScheduledValues(t);
    this.out.gain.setValueAtTime(this.out.gain.value, t);
    this.out.gain.linearRampToValueAtTime(0, t + Math.max(0.01, fade));
    for (const s of this.sends || []) {
      s.gain.setValueAtTime(s.gain.value, t);
      s.gain.linearRampToValueAtTime(0, t + Math.max(0.01, fade));
    }
    this.done = true;
    setTimeout(() => {
      try { this.out.disconnect(); } catch { /* ignore */ }
      for (const s of this.sends || []) try { s.disconnect(); } catch { /* ignore */ }
    }, (fade + 4) * 1000);
  }
}

function distCurve(amount) {
  const n = 1024;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = Math.tanh(x * amount) / Math.tanh(amount);
  }
  return curve;
}

class Music {
  constructor() {
    this.player = null;
    this.currentId = null;
    this.stack = [];
    this.timer = null;
  }

  ensureTimer() {
    if (this.timer) return;
    this.timer = setInterval(() => this.pump(), 25);
  }

  pump() {
    if (!audio.ctx) return;
    const until = audio.ctx.currentTime + 0.15;
    if (this.player) this.player.pump(until);
    if (this.oneShots) {
      for (const p of this.oneShots) p.pump(until);
      this.oneShots = this.oneShots.filter((p) => !p.done);
    }
  }

  play(id, opts = {}) {
    if (!audio.ready) { this.pending = [id, opts]; return; }
    if (id === this.currentId && this.player && !opts.restart &&
      (opts.rate ?? 1) === this.player.rate && (opts.pitch ?? 0) === this.player.pitch) return;
    const parsed = parseTrack(id);
    if (!parsed) { console.warn('no track', id); return; }
    if (this.player) this.player.stop(opts.fadeOut ?? 0.4);
    this.player = new TrackPlayer(parsed, opts);
    this.currentId = id;
    this.currentOpts = opts;
    this.ensureTimer();
    this.pump();
  }

  // Play a non-looping jingle on top of (or instead of) the music.
  jingle(id, opts = {}) {
    if (!audio.ready) return;
    const parsed = parseTrack(id);
    if (!parsed) return;
    const p = new TrackPlayer(parsed, { ...opts, loop: false });
    this.oneShots = (this.oneShots || []).concat(p);
    this.ensureTimer();
    this.pump();
    return p;
  }

  stop(fade = 0.5) {
    if (this.player) this.player.stop(fade);
    this.player = null;
    this.currentId = null;
  }

  // Remember what was playing so a cutscene can restore it.
  push(fade = 0.3) {
    this.stack.push([this.currentId, this.currentOpts]);
    this.stop(fade);
  }
  pop(fade = 0.6) {
    const [id, opts] = this.stack.pop() || [];
    if (id) this.play(id, { ...(opts || {}), fade, restart: true });
  }

  muffle(on, time = 0.4) {
    if (!audio.ctx) return;
    const f = audio.musicFilter.frequency;
    f.cancelScheduledValues(audio.ctx.currentTime);
    f.setTargetAtTime(on ? 700 : 20000, audio.ctx.currentTime, time / 3);
  }

  beat() { return this.player ? this.player.beat() : 0; }
}

export const music = new Music();
