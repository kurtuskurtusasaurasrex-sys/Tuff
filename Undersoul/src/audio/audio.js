// Audio system: context, buses (music / sfx / reverb / echo), instrument
// voices. Sampled instruments come from bank.js; the rest are built from
// oscillators per note with real envelopes, filters and delayed vibrato.
import { buildBank, DRUM_MAP } from './bank.js';
import { noiseGen } from './dsp.js';
import { settings } from '../core/save.js';

export const INSTRUMENTS = {
  // ---- sampled ----
  piano: { kind: 'sample', bank: 'piano', gain: 0.85, release: 0.35, velFilter: true },
  musicbox: { kind: 'sample', bank: 'musicbox', gain: 0.5, release: 0.9 },
  glock: { kind: 'sample', bank: 'glock', gain: 0.45, release: 0.7 },
  bell: { kind: 'sample', bank: 'bell', gain: 0.55, release: 2.5 },
  marimba: { kind: 'sample', bank: 'marimba', gain: 0.75, release: 0.3 },
  kalimba: { kind: 'sample', bank: 'kalimba', gain: 0.6, release: 0.6 },
  epiano: { kind: 'sample', bank: 'epiano', gain: 0.6, release: 0.4, velFilter: true },
  harp: { kind: 'sample', bank: 'harp', gain: 0.75, release: 1.5 },
  guitar: { kind: 'sample', bank: 'guitar', gain: 0.7, release: 0.25 },
  pizz: { kind: 'sample', bank: 'pizz', gain: 0.75, release: 0.2 },
  harpsi: { kind: 'sample', bank: 'harpsi', gain: 0.5, release: 0.2 },
  timpani: { kind: 'sample', bank: 'timpani', gain: 0.9, release: 1.2 },
  orchhit: { kind: 'sample', bank: 'orchhit', gain: 0.7, release: 0.2 },
  drums: { kind: 'drums', gain: 0.85 },
  // ---- oscillator ----
  square: { kind: 'osc', wave: 'pulse50', a: 0.004, d: 0.15, s: 0.7, r: 0.05, gain: 0.13, vib: [0.2, 5.6, 14] },
  pulse25: { kind: 'osc', wave: 'pulse25', a: 0.004, d: 0.15, s: 0.7, r: 0.05, gain: 0.13, vib: [0.2, 5.6, 14] },
  pulse12: { kind: 'osc', wave: 'pulse12', a: 0.003, d: 0.12, s: 0.65, r: 0.04, gain: 0.14, vib: [0.2, 5.8, 12] },
  chip: { kind: 'osc', wave: 'pulse25', a: 0.002, d: 0.08, s: 0.5, r: 0.02, gain: 0.11 },
  tri: { kind: 'osc', wave: 'triangle', a: 0.003, d: 0.2, s: 0.9, r: 0.04, gain: 0.42 },
  sine: { kind: 'osc', wave: 'sine', a: 0.01, d: 0.2, s: 0.8, r: 0.15, gain: 0.3, vib: [0.3, 5, 10] },
  saw: { kind: 'osc', wave: 'sawtooth', a: 0.005, d: 0.2, s: 0.7, r: 0.08, gain: 0.08, filter: { f: 2600, q: 0.7 } },
  strings: { kind: 'osc', wave: 'sawtooth', unison: [-9, 0, 9], a: 0.14, d: 0.3, s: 0.85, r: 0.45, gain: 0.05, filter: { f: 2000, vel: 1800, q: 0.6 }, vib: [0.35, 5, 9] },
  slowstr: { kind: 'osc', wave: 'sawtooth', unison: [-10, 0, 10], a: 0.55, d: 0.5, s: 0.9, r: 0.9, gain: 0.045, filter: { f: 1700, vel: 1200, q: 0.5 }, vib: [0.5, 4.6, 8] },
  brass: { kind: 'osc', wave: 'sawtooth', unison: [-5, 5], a: 0.035, d: 0.25, s: 0.75, r: 0.14, gain: 0.07, filter: { f: 500, env: [2600, 0.08, 1500], q: 1.2 }, vib: [0.3, 5.4, 12] },
  flute: { kind: 'osc', wave: 'flute', a: 0.05, d: 0.1, s: 0.9, r: 0.12, gain: 0.24, breath: 0.08, vib: [0.2, 5.2, 16] },
  ocarina: { kind: 'osc', wave: 'sine', a: 0.03, d: 0.1, s: 0.85, r: 0.1, gain: 0.3, breath: 0.05, vib: [0.25, 5.5, 18] },
  choir: { kind: 'choir', a: 0.28, d: 0.3, s: 0.9, r: 0.6, gain: 0.06, vib: [0.4, 4.6, 10] },
  organ: { kind: 'osc', wave: 'organ', a: 0.01, d: 0.05, s: 1, r: 0.08, gain: 0.1, trem: [6.2, 0.18] },
  bass: { kind: 'osc', wave: 'sawtooth', sub: 0.5, a: 0.004, d: 0.35, s: 0.55, r: 0.06, gain: 0.2, filter: { f: 240, env: [1300, 0.1, 420], q: 1 } },
  synbass: { kind: 'osc', wave: 'pulse25', a: 0.003, d: 0.2, s: 0.6, r: 0.04, gain: 0.16, filter: { f: 280, env: [2600, 0.07, 600], q: 5 } },
  lead: { kind: 'osc', wave: 'sawtooth', unison: [-6, 6], a: 0.008, d: 0.2, s: 0.7, r: 0.1, gain: 0.06, filter: { f: 3600, q: 1 }, vib: [0.25, 5.5, 15] },
  dguitar: { kind: 'osc', wave: 'sawtooth', unison: [-9, 9], a: 0.003, d: 0.4, s: 0.75, r: 0.08, gain: 0.05, filter: { f: 3000, q: 0.8 } },
  accordion: { kind: 'osc', wave: 'pulse25', unison: [0, 11], a: 0.03, d: 0.1, s: 0.9, r: 0.08, gain: 0.07, filter: { f: 2400, q: 0.8 }, trem: [5, 0.12] },
  pad: { kind: 'osc', wave: 'sawtooth', unison: [-14, 0, 14], a: 0.9, d: 0.5, s: 0.9, r: 1.6, gain: 0.035, filter: { f: 1100, q: 0.6 } },
  bellpad: { kind: 'osc', wave: 'triangle', unison: [-6, 6], a: 0.6, d: 0.5, s: 0.9, r: 1.8, gain: 0.12, vib: [0.8, 4, 6] },
  whistle: { kind: 'osc', wave: 'sine', a: 0.04, d: 0.1, s: 0.9, r: 0.08, gain: 0.22, breath: 0.03, vib: [0.15, 6, 22] },
};

class AudioSystem {
  constructor() {
    this.ready = false;
    this.ctx = null;
  }

  // ctxOverride lets tools render music offline (OfflineAudioContext).
  init(ctxOverride) {
    if (this.ctx && !ctxOverride) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC && !ctxOverride) return;
    this.ctx = ctxOverride || new AC({ latencyHint: 'interactive' });
    const ctx = this.ctx;

    this.limiter = ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -8;
    this.limiter.knee.value = 8;
    this.limiter.ratio.value = 10;
    this.limiter.attack.value = 0.003;
    this.limiter.release.value = 0.25;
    this.limiter.connect(ctx.destination);

    this.master = ctx.createGain();
    this.master.connect(this.limiter);

    this.musicOut = ctx.createGain();
    this.musicFilter = ctx.createBiquadFilter();
    this.musicFilter.type = 'lowpass';
    this.musicFilter.frequency.value = 20000;
    this.musicFilter.Q.value = 0.5;
    this.musicOut.connect(this.musicFilter);
    // makeup gain: the arrangements are mixed with headroom per voice
    this.musicMakeup = ctx.createGain();
    this.musicMakeup.gain.value = 2.2;
    this.musicFilter.connect(this.musicMakeup);
    this.musicMakeup.connect(this.master);

    this.sfxOut = ctx.createGain();
    this.sfxOut.connect(this.master);

    // reverb
    this.reverbIn = ctx.createGain();
    this.convolver = ctx.createConvolver();
    this.convolver.buffer = this.makeImpulse(2.8, 0.62);
    this.reverbOut = ctx.createGain();
    this.reverbOut.gain.value = 0.55;
    this.reverbIn.connect(this.convolver);
    this.convolver.connect(this.reverbOut);
    this.reverbOut.connect(this.musicMakeup);
    // music sends pass through the music volume
    this.musicSend = ctx.createGain();
    this.musicSend.connect(this.reverbIn);
    this.musicEchoSend = ctx.createGain();

    this.sfxReverbIn = ctx.createGain();
    this.sfxReverbIn.connect(this.convolver);

    // echo (tempo-synced by the sequencer)
    this.echoIn = ctx.createGain();
    this.echoDelay = ctx.createDelay(2);
    this.echoDelay.delayTime.value = 0.36;
    this.echoFb = ctx.createGain();
    this.echoFb.gain.value = 0.32;
    this.echoLp = ctx.createBiquadFilter();
    this.echoLp.type = 'lowpass';
    this.echoLp.frequency.value = 2600;
    this.musicEchoSend.connect(this.echoIn);
    this.echoIn.connect(this.echoDelay);
    this.echoDelay.connect(this.echoLp);
    this.echoLp.connect(this.echoFb);
    this.echoFb.connect(this.echoDelay);
    const echoOut = ctx.createGain();
    echoOut.gain.value = 0.5;
    this.echoLp.connect(echoOut);
    echoOut.connect(this.musicMakeup);
    echoOut.connect(this.reverbIn);

    this.waves = this.makeWaves();
    this.noiseBuf = this.makeNoise(2);
    this.bank = buildBank(ctx);
    this.applyVolumes();
    this.ready = true;
  }

  resume() {
    if (this.ctx && this.ctx.state !== 'running') this.ctx.resume();
  }

  applyVolumes() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(settings.master, t, 0.05);
    this.musicOut.gain.setTargetAtTime(settings.music, t, 0.05);
    this.musicSend.gain.setTargetAtTime(settings.music, t, 0.05);
    this.musicEchoSend.gain.setTargetAtTime(settings.music, t, 0.05);
    this.sfxOut.gain.setTargetAtTime(settings.sfx, t, 0.05);
  }

  makeImpulse(dur, decay) {
    const ctx = this.ctx;
    const sr = ctx.sampleRate;
    const len = Math.floor(sr * dur);
    const buf = ctx.createBuffer(2, len, sr);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      const rnd = noiseGen(77 + c * 1000);
      let lp = 0;
      for (let i = 0; i < len; i++) {
        const t = i / sr;
        const fc = 9000 * Math.exp(-t * 1.6) + 900;
        const a = 1 - Math.exp((-2 * Math.PI * fc) / sr);
        lp += a * (rnd() - lp);
        const pre = t < 0.012 ? 0 : 1;
        d[i] = lp * Math.exp(-t / decay) * pre * 0.9;
      }
      // a few early reflections
      for (const [tt, g] of [[0.013, 0.5], [0.021, 0.35], [0.034, 0.3], [0.047, 0.22]]) {
        const idx = Math.floor((tt + c * 0.003) * sr);
        if (idx < len) d[idx] += g;
      }
    }
    return buf;
  }

  makeNoise(sec) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * sec);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    const rnd = noiseGen(4242);
    for (let i = 0; i < len; i++) d[i] = rnd();
    return buf;
  }

  makeWaves() {
    const ctx = this.ctx;
    const N = 48;
    const pulse = (duty) => {
      const re = new Float32Array(N), im = new Float32Array(N);
      for (let n = 1; n < N; n++) re[n] = (2 * Math.sin(Math.PI * n * duty)) / (Math.PI * n);
      return ctx.createPeriodicWave(re, im);
    };
    const fromAmps = (amps) => {
      const re = new Float32Array(amps.length + 1), im = new Float32Array(amps.length + 1);
      amps.forEach((a, i) => { im[i + 1] = a; });
      return ctx.createPeriodicWave(re, im);
    };
    return {
      pulse50: pulse(0.5),
      pulse25: pulse(0.25),
      pulse12: pulse(0.125),
      flute: fromAmps([1, 0.12, 0.06, 0.02]),
      organ: fromAmps([1, 0.7, 0.45, 0.5, 0, 0.3, 0, 0.35, 0, 0, 0, 0.15]),
    };
  }

  setOsc(osc, wave) {
    if (this.waves[wave]) osc.setPeriodicWave(this.waves[wave]);
    else osc.type = wave;
  }

  // ------------------------------------------------------------------
  // Play one note. dest = channel input node. when/dur in seconds.
  playNote(insName, midi, when, dur, vel, dest, opts = {}) {
    const ins = INSTRUMENTS[insName];
    if (!ins) return;
    const pitch = opts.pitch || 0;
    if (ins.kind === 'sample') return this.playSample(ins, midi + pitch, when, dur, vel, dest, opts);
    if (ins.kind === 'drums') return this.playDrum(midi, when, vel, dest, ins, opts);
    if (ins.kind === 'choir') return this.playChoir(ins, midi + pitch, when, dur, vel, dest);
    return this.playOsc(ins, midi + pitch, when, dur, vel, dest);
  }

  playSample(ins, midi, when, dur, vel, dest, opts) {
    const ctx = this.ctx;
    const set = this.bank[ins.bank];
    let best = set[0];
    for (const s of set) if (Math.abs(s.root - midi) < Math.abs(best.root - midi)) best = s;
    const src = ctx.createBufferSource();
    src.buffer = best.buffer;
    src.playbackRate.value = Math.pow(2, (midi - best.root) / 12);
    const g = ctx.createGain();
    const peak = ins.gain * vel * vel;
    g.gain.setValueAtTime(peak, when);
    const end = when + (opts.ring ? best.buffer.duration : dur);
    g.gain.setValueAtTime(peak, end);
    g.gain.setTargetAtTime(0, end, ins.release / 4);
    let head = src;
    if (ins.velFilter) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = 1400 + vel * vel * 11000;
      f.Q.value = 0.3;
      src.connect(f);
      head = f;
    }
    head.connect(g);
    g.connect(dest);
    src.start(when);
    src.stop(Math.min(when + best.buffer.duration / src.playbackRate.value, end + ins.release * 1.5) + 0.05);
  }

  playDrum(midi, when, vel, dest, ins, opts) {
    const name = DRUM_MAP[((midi % 12) + 12) % 12];
    const buf = this.bank.drums[name];
    if (!buf) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    if (opts.pitch) src.playbackRate.value = Math.pow(2, opts.pitch / 24);
    const g = ctx.createGain();
    g.gain.value = ins.gain * vel * vel;
    src.connect(g);
    g.connect(dest);
    src.start(when);
  }

  playOsc(ins, midi, when, dur, vel, dest) {
    const ctx = this.ctx;
    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    const out = ctx.createGain();
    const peak = ins.gain * (0.35 + 0.65 * vel);
    const a = ins.a, d = ins.d, s = ins.s, r = ins.r;
    const g = out.gain;
    g.setValueAtTime(0, when);
    g.linearRampToValueAtTime(peak, when + a);
    g.setTargetAtTime(peak * s, when + a, d / 3);
    const off = when + Math.max(dur, a + 0.01);
    g.cancelScheduledValues(off);
    g.setTargetAtTime(0, off, r / 4);
    const stopAt = off + r * 1.6 + 0.05;

    let target = out;
    if (ins.filter) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.Q.value = ins.filter.q ?? 0.7;
      const base = ins.filter.f + (ins.filter.vel ? ins.filter.vel * vel : 0);
      if (ins.filter.env) {
        const [peakF, time, sus] = ins.filter.env;
        f.frequency.setValueAtTime(base, when);
        f.frequency.linearRampToValueAtTime(peakF * (0.6 + vel * 0.5), when + 0.005);
        f.frequency.setTargetAtTime(sus, when + 0.005, time);
      } else f.frequency.value = base;
      f.connect(out);
      target = f;
    }
    let vibGain = null, lfo = null;
    if (ins.vib && dur > ins.vib[0]) {
      lfo = ctx.createOscillator();
      lfo.frequency.value = ins.vib[1];
      vibGain = ctx.createGain();
      vibGain.gain.setValueAtTime(0, when);
      vibGain.gain.setValueAtTime(0, when + ins.vib[0]);
      vibGain.gain.linearRampToValueAtTime(ins.vib[2], when + ins.vib[0] + 0.3);
      lfo.connect(vibGain);
      lfo.start(when);
      lfo.stop(stopAt);
    }
    if (ins.trem) {
      const tl = ctx.createOscillator();
      tl.frequency.value = ins.trem[0];
      const tg = ctx.createGain();
      tg.gain.value = ins.trem[1] * peak;
      tl.connect(tg);
      tg.connect(out.gain);
      tl.start(when);
      tl.stop(stopAt);
    }
    const dets = ins.unison || [0];
    const per = 1 / Math.sqrt(dets.length);
    for (const det of dets) {
      const o = ctx.createOscillator();
      this.setOsc(o, ins.wave);
      o.frequency.value = freq;
      o.detune.value = det;
      if (vibGain) vibGain.connect(o.detune);
      const og = ctx.createGain();
      og.gain.value = per;
      o.connect(og);
      og.connect(target);
      o.start(when);
      o.stop(stopAt);
    }
    if (ins.sub) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = freq / 2;
      const og = ctx.createGain();
      og.gain.value = ins.sub * 2.2;
      o.connect(og);
      og.connect(out);
      o.start(when);
      o.stop(stopAt);
    }
    if (ins.breath) {
      const n = ctx.createBufferSource();
      n.buffer = this.noiseBuf;
      n.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = Math.min(9000, freq * 2);
      bp.Q.value = 2;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0, when);
      ng.gain.linearRampToValueAtTime(ins.breath * 4, when + 0.02);
      ng.gain.setTargetAtTime(ins.breath, when + 0.02, 0.05);
      n.connect(bp);
      bp.connect(ng);
      ng.connect(out);
      n.start(when, Math.random() * 1.5);
      n.stop(stopAt);
    }
    out.connect(dest);
  }

  playChoir(ins, midi, when, dur, vel, dest) {
    const ctx = this.ctx;
    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    const out = ctx.createGain();
    const peak = ins.gain * (0.4 + 0.6 * vel);
    out.gain.setValueAtTime(0, when);
    out.gain.linearRampToValueAtTime(peak, when + ins.a);
    const off = when + Math.max(dur, ins.a);
    out.gain.setValueAtTime(peak, off);
    out.gain.setTargetAtTime(0, off, ins.r / 4);
    const stopAt = off + ins.r * 1.6 + 0.05;
    const mix = ctx.createGain();
    const formants = [[750, 6, 1], [1150, 8, 0.55], [2800, 12, 0.22], [350, 3, 0.4]];
    for (const [f, q, gg] of formants) {
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = f;
      bp.Q.value = q;
      const fg = ctx.createGain();
      fg.gain.value = gg * 3;
      mix.connect(bp);
      bp.connect(fg);
      fg.connect(out);
    }
    const lfo = ctx.createOscillator();
    lfo.frequency.value = ins.vib[1];
    const vg = ctx.createGain();
    vg.gain.setValueAtTime(0, when);
    vg.gain.linearRampToValueAtTime(ins.vib[2], when + ins.vib[0] + 0.2);
    lfo.connect(vg);
    lfo.start(when);
    lfo.stop(stopAt);
    for (const det of [-7, 6]) {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = freq;
      o.detune.value = det;
      vg.connect(o.detune);
      o.connect(mix);
      o.start(when);
      o.stop(stopAt);
    }
    out.connect(dest);
  }
}

export const audio = new AudioSystem();
