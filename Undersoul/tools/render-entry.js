// Dev tool: renders tracks offline to WAV so they can be inspected
// (levels, clipping, spectrograms) without a speaker.
import { audio } from '../src/audio/audio.js';
import { parseTrack, validateTracks } from '../src/audio/sequencer.js';
import { ALL_TRACKS } from '../src/audio/tracks/index.js';
import { registerTracks } from '../src/audio/sequencer.js';

registerTracks(ALL_TRACKS);

function wav(buf) {
  const ch = buf.numberOfChannels, sr = buf.sampleRate, n = buf.length;
  const dv = new DataView(new ArrayBuffer(44 + n * ch * 2));
  const w = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); dv.setUint32(4, 36 + n * ch * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
  dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, ch, true);
  dv.setUint32(24, sr, true); dv.setUint32(28, sr * ch * 2, true); dv.setUint16(32, ch * 2, true);
  dv.setUint16(34, 16, true); w(36, 'data'); dv.setUint32(40, n * ch * 2, true);
  const data = [];
  for (let c = 0; c < ch; c++) data.push(buf.getChannelData(c));
  let o = 44;
  for (let i = 0; i < n; i++) for (let c = 0; c < ch; c++) {
    const v = Math.max(-1, Math.min(1, data[c][i]));
    dv.setInt16(o, v * 32767, true); o += 2;
  }
  return new Uint8Array(dv.buffer);
}

window.renderTrack = async (id, seconds, opts = {}) => {
  const ctx = new OfflineAudioContext(2, Math.floor(44100 * seconds), 44100);
  audio.init(ctx);
  const p = parseTrack(id);
  const spb = 60 / (p.def.bpm * (opts.rate || 1));
  const chanNodes = p.chans.map((c) => {
    const g = ctx.createGain(); g.gain.value = (c.vol ?? 0.7) * (p.def.volume ?? 1);
    const pan = ctx.createStereoPanner(); pan.pan.value = c.pan ?? 0;
    g.connect(pan); pan.connect(audio.musicOut);
    if (c.rev) { const r = ctx.createGain(); r.gain.value = c.rev; pan.connect(r); r.connect(audio.musicSend); }
    if (c.echo) { const r = ctx.createGain(); r.gain.value = c.echo; pan.connect(r); r.connect(audio.musicEchoSend); }
    return g;
  });
  audio.echoDelay.delayTime.value = spb * (p.def.echoBeats ?? 0.75);
  const loopLen = p.length - p.loopAt;
  p.chans.forEach((c, ci) => {
    let cycle = 0, idx = 0, guard = 0;
    while (guard++ < 20000) {
      if (idx >= c.events.length) {
        if (loopLen <= 0) break;
        cycle += loopLen; idx = c.events.findIndex((e) => e.t >= p.loopAt - 1e-6); if (idx < 0) break;
      }
      const e = c.events[idx++];
      let beat = e.t + cycle;
      if (p.def.swing && Math.abs((e.t % 1) - 0.5) < 0.001) beat += p.def.swing * 0.5;
      const when = 0.05 + beat * spb;
      if (when > seconds) break;
      audio.playNote(e.ins, e.m, when, e.d * spb * e.g, e.v, chanNodes[ci], { pitch: opts.pitch || 0 });
    }
  });
  const buf = await ctx.startRendering();
  const bytes = wav(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
};
window.validate = () => validateTracks();
window.trackList = () => Object.keys(ALL_TRACKS);
window.trackInfo = (id) => { const p = parseTrack(id); return { beats: p.length, loopAt: p.loopAt, bpm: p.def.bpm, secs: p.length * 60 / p.def.bpm }; };

// Render single notes of each instrument (tuning / timbre checks).
window.renderNotes = async (list, each = 1.5) => {
  const ctx = new OfflineAudioContext(2, Math.floor(44100 * each * list.length), 44100);
  audio.init(ctx);
  const g = ctx.createGain(); g.connect(audio.musicOut);
  list.forEach(([ins, m], i) => audio.playNote(ins, m, 0.02 + i * each, each * 0.6, 0.8, g));
  const buf = await ctx.startRendering();
  const bytes = wav(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
};
