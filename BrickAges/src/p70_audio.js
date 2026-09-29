/* ==== p70_audio.js ==== */
/* AUDIO — the island finally makes a sound.  Everything is synthesised live with WebAudio: no samples, no files.
   MUSIC · a little generative band for every land, composed as it plays (a motif, its answer, a cadence; the theme comes
         back, the B part changes every time round): Town's bouncy glockenspiel pop, a Castle dance on recorder + harp, a
         pastoral Forestmen flute jig, the Fright Knights' organ + choir, Rock Raiders' industrial synth, Classic Space
         arpeggios, a Wild West twang with galloping woodblocks, Islanders' marimba + log drums, a Pirate shanty on
         squeezebox, the Deep Delve's dripping dark, a heroic title theme and a battle layer when the monsters come.
         Lands crossfade at the next bar; night thins the band; indoors it sounds like it's coming through the wall.
   AMBIENCE · surf by the sea, wind up high, birdsong + gulls by day, crickets + owls at night, rain and thunder.
   SFX · plastic footsteps (grass, stone, wood, sand), jumps + landings, stud pickups (silver / gold / blue), quest
         jingles, gear, swings, hits, bricks bursting, hurt + defeat, the Builder's click-on / pop-off, doors, engines,
         hooves, the 9V horn + clickety-clack, cannon booms, UI clicks.
   The context starts on the first click / key (the browser's rule).  N mutes · volumes live in Settings.
   API: AUDIO.sfx(name, {x,y,z,vel}) · AUDIO.setVol(bus, v) · AUDIO.toggleMute() · AUDIO.S */
const AUDIO = (() => {
  const S = { ctx: null, on: false, muted: false, vol: { master: 0.8, music: 0.5, sfx: 0.8, amb: 0.65 }, voices: 0, style: null, ctxName: null, duck: 1, muffle: 0, night: 0, rain: 0, battle: 0, lastT: 0 };
  const disabled = BA.flag('noaudio') || BA.flag('test') || BA.flag('shot') || /[?&]islandgp(?=&|=|$)/.test(location.search);
  const KEY = 'brickages.audio.v1';
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s) { Object.assign(S.vol, s.vol || {}); S.muted = !!s.muted; } } catch (e) { /* blocked storage */ }
  const saveCfg = () => { try { localStorage.setItem(KEY, JSON.stringify({ vol: S.vol, muted: S.muted })); } catch (e) { /* */ } };
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const rnd = Math.random;
  let ctx = null, master = null, comp = null, bus = {}, verb = null, verbIn = null, noiseBuf = null, pinkBuf = null;

  /* ================= boot (first gesture) ================= */
  function makeNoise(pink) {
    const len = ctx.sampleRate * 3, b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch); let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < len; i++) {
        const w = rnd() * 2 - 1;
        if (!pink) { d[i] = w; continue; }
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      }
    }
    return b;
  }
  function makeVerb(sec, decay) {
    const len = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < len; i++) { const t = i / len; d[i] = (rnd() * 2 - 1) * Math.pow(1 - t, decay) * (i < 90 ? i / 90 : 1); } }
    return b;
  }
  function init() {
    if (ctx || disabled) return;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    try { ctx = new AC({ latencyHint: 'interactive' }); } catch (e) { return; }
    S.ctx = ctx;
    comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.22;
    master = ctx.createGain(); master.gain.value = S.muted ? 0 : S.vol.master;
    master.connect(comp); S.an = ctx.createAnalyser(); S.an.fftSize = 2048; comp.connect(S.an); S.an.connect(ctx.destination);
    verb = ctx.createConvolver(); verb.buffer = makeVerb(2.6, 3.2); const vg = ctx.createGain(); vg.gain.value = 0.55; verb.connect(vg); vg.connect(master);
    verbIn = ctx.createGain(); verbIn.gain.value = 1; verbIn.connect(verb);
    // music: bus -> muffle filter (indoors / underwater) -> master; every bus sends some reverb
    const mf = ctx.createBiquadFilter(); mf.type = 'lowpass'; mf.frequency.value = 20000; mf.Q.value = 0.5;
    bus.music = ctx.createGain(); bus.music.gain.value = S.vol.music; bus.music.connect(mf); mf.connect(master); bus.musicF = mf;
    bus.musicDuck = ctx.createGain(); bus.musicDuck.gain.value = 1; bus.musicDuck.connect(bus.music);
    bus.sfx = ctx.createGain(); bus.sfx.gain.value = S.vol.sfx; bus.sfx.connect(master);
    bus.amb = ctx.createGain(); bus.amb.gain.value = S.vol.amb; bus.amb.connect(master);
    for (const k of ['music', 'sfx', 'amb']) { const s = ctx.createGain(); s.gain.value = k === 'music' ? 0.32 : k === 'sfx' ? 0.12 : 0.2; bus[k].connect(s); s.connect(verbIn); bus[k + 'Verb'] = s; }
    noiseBuf = makeNoise(false); pinkBuf = makeNoise(true);
    startAmbience();
    S.on = true;
    setInterval(tickSched, 40);
  }
  function resume() { if (!ctx) init(); if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {}); }
  if (!disabled) {
    const kick = () => { resume(); };
    window.addEventListener('pointerdown', kick, true); window.addEventListener('keydown', kick, true); window.addEventListener('touchstart', kick, true);
    document.addEventListener('visibilitychange', () => { if (!ctx) return; if (document.hidden) ctx.suspend().catch(() => {}); else ctx.resume().catch(() => {}); });
  }

  /* ================= low-level building blocks ================= */
  const now = () => (ctx ? ctx.currentTime : 0);
  function voice(dur) { S.voices++; setTimeout(() => { S.voices--; }, (dur + 0.3) * 1000); }
  function gainEnv(t, a, peak, d, dest, curve = 'exp') {
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + Math.max(0.002, a));
    if (curve === 'exp') g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); else g.gain.linearRampToValueAtTime(0.0001, t + a + d);
    g.connect(dest); return g;
  }
  function osc(type, f, t, end, dest, det = 0) { const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); if (det) o.detune.setValueAtTime(det, t); o.connect(dest); o.start(t); o.stop(end + 0.05); return o; }
  function noise(t, dur, dest, pink) { const s = ctx.createBufferSource(); s.buffer = pink ? pinkBuf : noiseBuf; s.loop = true; s.connect(dest); s.start(t, rnd() * 2); s.stop(t + dur + 0.05); return s; }
  function filt(type, f, q, dest) { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; b.connect(dest); return b; }
  function panner(p, dest) { if (!ctx.createStereoPanner) return dest; const n = ctx.createStereoPanner(); n.pan.value = Math.max(-1, Math.min(1, p)); n.connect(dest); return n; }

  /* ================= instruments: fn(dest, t, midi, dur, vel) ================= */
  const INST = {
    // glockenspiel: bright bell partials
    glock(d, t, m, dur, v) { const f = mtof(m); const L = 1.4; const g = gainEnv(t, 0.002, 0.16 * v, L, d); osc('sine', f, t, t + L, g); const g2 = gainEnv(t, 0.001, 0.05 * v, 0.25, d); osc('sine', f * 2.76, t, t + 0.3, g2); const g3 = gainEnv(t, 0.001, 0.025 * v, 0.1, d); osc('sine', f * 5.4, t, t + 0.12, g3); voice(L); },
    // electric piano (a soft tine): sine + a little FM bite
    ep(d, t, m, dur, v) { const f = mtof(m), L = Math.min(2.2, dur + 0.6); const g = gainEnv(t, 0.004, 0.11 * v, L, d); const o = osc('sine', f, t, t + L, g); const mod = ctx.createOscillator(); mod.frequency.value = f * 2; const mg = ctx.createGain(); mg.gain.setValueAtTime(f * 1.2, t); mg.gain.exponentialRampToValueAtTime(1, t + 0.4); mod.connect(mg); mg.connect(o.frequency); mod.start(t); mod.stop(t + L + 0.05); voice(L); },
    marimba(d, t, m, dur, v) { const f = mtof(m); const g = gainEnv(t, 0.002, 0.2 * v, 0.55, d); osc('sine', f, t, t + 0.6, g); const g2 = gainEnv(t, 0.001, 0.07 * v, 0.08, d); osc('sine', f * 3.93, t, t + 0.1, g2); voice(0.6); },
    pluck(d, t, m, dur, v) { const f = mtof(m), L = Math.min(1.4, 0.35 + dur); const lp = filt('lowpass', 1, 0.8, d); lp.frequency.setValueAtTime(f * 9, t); lp.frequency.exponentialRampToValueAtTime(f * 1.5, t + L * 0.7); const g = gainEnv(t, 0.002, 0.14 * v, L, lp); osc('sawtooth', f, t, t + L, g); osc('triangle', f, t, t + L, g, 4); voice(L); },
    harp(d, t, m, dur, v) { const f = mtof(m), L = 1.8; const lp = filt('lowpass', f * 6, 0.5, d); const g = gainEnv(t, 0.002, 0.14 * v, L, lp); osc('triangle', f, t, t + L, g); const g2 = gainEnv(t, 0.001, 0.04 * v, 0.4, lp); osc('sine', f * 2, t, t + 0.45, g2); voice(L); },
    twang(d, t, m, dur, v) { const f = mtof(m), L = Math.min(1.6, dur + 0.5); const lp = filt('lowpass', 1, 2.5, d); lp.frequency.setValueAtTime(f * 12, t); lp.frequency.exponentialRampToValueAtTime(f * 2, t + 0.5); const g = gainEnv(t, 0.002, 0.12 * v, L, lp); const o = osc('sawtooth', f * 0.97, t, t + L, g); o.frequency.exponentialRampToValueAtTime(f, t + 0.06); const vib = ctx.createOscillator(); vib.frequency.value = 5.5; const vg = ctx.createGain(); vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(f * 0.012, t + 0.4); vib.connect(vg); vg.connect(o.frequency); vib.start(t); vib.stop(t + L); voice(L); },
    flute(d, t, m, dur, v) { const f = mtof(m), L = dur + 0.12; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.1 * v, t + 0.06); g.gain.setValueAtTime(0.09 * v, t + Math.max(0.07, dur - 0.02)); g.gain.linearRampToValueAtTime(0.0001, t + L); g.connect(d);
      const o = osc('sine', f, t, t + L, g); osc('triangle', f * 2, t, t + L, (() => { const h = ctx.createGain(); h.gain.value = 0.12; h.connect(g); return h; })());
      const vib = ctx.createOscillator(); vib.frequency.value = 5; const vg = ctx.createGain(); vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(f * 0.008, t + 0.3); vib.connect(vg); vg.connect(o.frequency); vib.start(t); vib.stop(t + L);
      const bp = filt('bandpass', f * 2, 4, g); const ng = ctx.createGain(); ng.gain.value = 0.25; ng.connect(bp); noise(t, L, ng); voice(L); },
    organ(d, t, m, dur, v) { const f = mtof(m), L = dur + 0.25; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.05 * v, t + 0.04); g.gain.setValueAtTime(0.05 * v, t + dur); g.gain.linearRampToValueAtTime(0.0001, t + L); g.connect(d);
      [[1, 1], [2, 0.6], [3, 0.35], [4, 0.3], [6, 0.12], [0.5, 0.5]].forEach(([h, a]) => { const hg = ctx.createGain(); hg.gain.value = a; hg.connect(g); osc('sine', f * h, t, t + L, hg); }); voice(L); },
    pad(d, t, m, dur, v) { const f = mtof(m), L = dur + 1.2; const lp = filt('lowpass', 1100, 0.7, d); const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.045 * v, t + 0.7); g.gain.setValueAtTime(0.045 * v, t + dur); g.gain.linearRampToValueAtTime(0.0001, t + L); g.connect(lp);
      osc('sawtooth', f, t, t + L, g, -8); osc('sawtooth', f, t, t + L, g, 8); osc('triangle', f / 2, t, t + L, g); voice(L); },
    strings(d, t, m, dur, v) { const f = mtof(m), L = dur + 0.5; const lp = filt('lowpass', 2400, 0.6, d); const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.04 * v, t + 0.18); g.gain.setValueAtTime(0.04 * v, t + dur); g.gain.linearRampToValueAtTime(0.0001, t + L); g.connect(lp);
      for (const det of [-11, 0, 12]) { const o = osc('sawtooth', f, t, t + L, g, det); const vib = ctx.createOscillator(); vib.frequency.value = 5 + det * 0.02; const vg = ctx.createGain(); vg.gain.value = 3; vib.connect(vg); vg.connect(o.detune); vib.start(t); vib.stop(t + L); } voice(L); },
    choir(d, t, m, dur, v) { const f = mtof(m), L = dur + 0.9; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.09 * v, t + 0.5); g.gain.setValueAtTime(0.09 * v, t + dur); g.gain.linearRampToValueAtTime(0.0001, t + L); g.connect(d);
      const src = ctx.createGain(); src.gain.value = 1; osc('sawtooth', f, t, t + L, src, -6); osc('sawtooth', f, t, t + L, src, 7);
      for (const [ff, q, a] of [[700, 8, 1], [1150, 9, 0.6], [2600, 12, 0.25]]) { const b = ctx.createBiquadFilter(); b.type = 'bandpass'; b.frequency.value = ff; b.Q.value = q; const bg = ctx.createGain(); bg.gain.value = a; src.connect(b); b.connect(bg); bg.connect(g); } voice(L); },
    brass(d, t, m, dur, v) { const f = mtof(m), L = dur + 0.15; const lp = filt('lowpass', 1, 1.2, d); lp.frequency.setValueAtTime(f * 1.2, t); lp.frequency.linearRampToValueAtTime(f * 7, t + 0.07); lp.frequency.linearRampToValueAtTime(f * 4, t + 0.3);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.09 * v, t + 0.04); g.gain.setValueAtTime(0.075 * v, t + Math.max(0.05, dur - 0.03)); g.gain.linearRampToValueAtTime(0.0001, t + L); g.connect(lp);
      osc('sawtooth', f, t, t + L, g, -4); osc('sawtooth', f, t, t + L, g, 5); voice(L); },
    squeeze(d, t, m, dur, v) { const f = mtof(m), L = dur + 0.08; const bp = filt('lowpass', 2600, 0.9, d); const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.055 * v, t + 0.03); g.gain.setValueAtTime(0.05 * v, t + Math.max(0.04, dur - 0.02)); g.gain.linearRampToValueAtTime(0.0001, t + L); g.connect(bp);
      osc('square', f, t, t + L, g, -9); osc('square', f, t, t + L, g, 9); osc('sawtooth', f * 2, t, t + L, (() => { const h = ctx.createGain(); h.gain.value = 0.3; h.connect(g); return h; })()); voice(L); },
    synth(d, t, m, dur, v) { const f = mtof(m), L = Math.min(0.9, dur + 0.25); const lp = filt('lowpass', 1, 4, d); lp.frequency.setValueAtTime(f * 10, t); lp.frequency.exponentialRampToValueAtTime(f * 1.5, t + L * 0.8); const g = gainEnv(t, 0.003, 0.08 * v, L, lp); osc('square', f, t, t + L, g); osc('sawtooth', f, t, t + L, g, 7); voice(L); },
    blip(d, t, m, dur, v) { const f = mtof(m); const g = gainEnv(t, 0.002, 0.08 * v, 0.22, d); const o = osc('square', f * 2, t, t + 0.25, g); o.frequency.exponentialRampToValueAtTime(f, t + 0.05); voice(0.25); },
    celesta(d, t, m, dur, v) { const f = mtof(m); const g = gainEnv(t, 0.002, 0.12 * v, 2.2, d); osc('sine', f, t, t + 2.3, g); const g2 = gainEnv(t, 0.001, 0.05 * v, 0.6, d); osc('sine', f * 4, t, t + 0.7, g2); const g3 = gainEnv(t, 0.001, 0.02 * v, 1.4, d); osc('sine', f * 2.01, t, t + 1.5, g3); voice(2.3); },
    bass(d, t, m, dur, v) { const f = mtof(m), L = Math.min(1.6, dur + 0.12); const lp = filt('lowpass', 1, 1, d); lp.frequency.setValueAtTime(f * 6, t); lp.frequency.exponentialRampToValueAtTime(f * 2.2, t + 0.25); const g = gainEnv(t, 0.004, 0.22 * v, L, lp); osc('triangle', f, t, t + L, g); osc('sawtooth', f, t, t + L, (() => { const h = ctx.createGain(); h.gain.value = 0.25; h.connect(g); return h; })()); osc('sine', f / 2, t, t + L, (() => { const h = ctx.createGain(); h.gain.value = 0.5; h.connect(g); return h; })()); voice(L); },
    subBass(d, t, m, dur, v) { const f = mtof(m), L = dur + 0.3; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.2 * v, t + 0.3); g.gain.setValueAtTime(0.2 * v, t + dur); g.gain.linearRampToValueAtTime(0.0001, t + L); g.connect(d); osc('sine', f, t, t + L, g); osc('triangle', f * 2, t, t + L, (() => { const h = ctx.createGain(); h.gain.value = 0.15; h.connect(g); return h; })()); voice(L); },
    synthBass(d, t, m, dur, v) { const f = mtof(m), L = Math.min(0.5, dur + 0.05); const lp = filt('lowpass', 1, 6, d); lp.frequency.setValueAtTime(f * 14, t); lp.frequency.exponentialRampToValueAtTime(f * 1.4, t + 0.18); const g = gainEnv(t, 0.002, 0.16 * v, L, lp); osc('sawtooth', f, t, t + L, g); osc('square', f / 2, t, t + L, (() => { const h = ctx.createGain(); h.gain.value = 0.5; h.connect(g); return h; })()); voice(L); },
  };
  /* ================= drums: fn(dest, t, vel) ================= */
  const DRUM = {
    kick(d, t, v) { const g = gainEnv(t, 0.002, 0.55 * v, 0.32, d); const o = osc('sine', 150, t, t + 0.35, g); o.frequency.exponentialRampToValueAtTime(42, t + 0.13); const c = gainEnv(t, 0.001, 0.08 * v, 0.02, d); noise(t, 0.03, filt('lowpass', 2500, 0.7, c)); voice(0.35); },
    snare(d, t, v) { const g = gainEnv(t, 0.001, 0.22 * v, 0.16, d); noise(t, 0.2, filt('highpass', 1300, 0.7, g)); const b = gainEnv(t, 0.001, 0.14 * v, 0.08, d); const o = osc('triangle', 210, t, t + 0.1, b); o.frequency.exponentialRampToValueAtTime(150, t + 0.08); voice(0.2); },
    rim(d, t, v) { const g = gainEnv(t, 0.001, 0.14 * v, 0.04, d); osc('square', 820, t, t + 0.05, filt('bandpass', 1700, 3, g)); voice(0.06); },
    hat(d, t, v) { const g = gainEnv(t, 0.001, 0.07 * v, 0.045, d); noise(t, 0.06, filt('highpass', 7500, 0.8, g)); voice(0.06); },
    ohat(d, t, v) { const g = gainEnv(t, 0.001, 0.06 * v, 0.22, d); noise(t, 0.25, filt('highpass', 6500, 0.8, g)); voice(0.25); },
    shaker(d, t, v) { const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.06 * v, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08); g.connect(d); noise(t, 0.1, filt('bandpass', 5200, 1.2, g)); voice(0.1); },
    tamb(d, t, v) { const g = gainEnv(t, 0.001, 0.07 * v, 0.14, d); noise(t, 0.16, filt('bandpass', 8500, 2, g)); const j = gainEnv(t, 0.001, 0.02 * v, 0.1, d); osc('square', 5100, t, t + 0.12, j); voice(0.16); },
    tom(d, t, v, f = 120) { const g = gainEnv(t, 0.002, 0.34 * v, 0.3, d); const o = osc('sine', f * 1.5, t, t + 0.32, g); o.frequency.exponentialRampToValueAtTime(f * 0.7, t + 0.25); voice(0.32); },
    lowTom(d, t, v) { DRUM.tom(d, t, v, 80); },
    hiTom(d, t, v) { DRUM.tom(d, t, v, 170); },
    timp(d, t, v) { const g = gainEnv(t, 0.003, 0.35 * v, 0.9, d); const o = osc('sine', 98, t, t + 0.95, g); o.frequency.exponentialRampToValueAtTime(90, t + 0.6); const n = gainEnv(t, 0.002, 0.08 * v, 0.2, d); noise(t, 0.22, filt('lowpass', 400, 1, n)); voice(0.95); },
    bongo(d, t, v) { const g = gainEnv(t, 0.001, 0.25 * v, 0.14, d); const o = osc('sine', 420, t, t + 0.15, g); o.frequency.exponentialRampToValueAtTime(300, t + 0.1); voice(0.15); },
    conga(d, t, v) { const g = gainEnv(t, 0.001, 0.28 * v, 0.24, d); const o = osc('sine', 230, t, t + 0.26, g); o.frequency.exponentialRampToValueAtTime(175, t + 0.18); voice(0.26); },
    log(d, t, v) { const g = gainEnv(t, 0.001, 0.2 * v, 0.2, d); osc('sine', 330, t, t + 0.22, g); const g2 = gainEnv(t, 0.001, 0.08 * v, 0.06, d); osc('sine', 330 * 2.9, t, t + 0.07, g2); voice(0.22); },
    wood(d, t, v) { const g = gainEnv(t, 0.001, 0.18 * v, 0.05, d); osc('sine', 1250, t, t + 0.06, g); const g2 = gainEnv(t, 0.001, 0.06 * v, 0.03, d); osc('square', 2400, t, t + 0.04, filt('bandpass', 2400, 4, g2)); voice(0.06); },
    clang(d, t, v) { const g = gainEnv(t, 0.001, 0.07 * v, 0.5, d); for (const f of [523, 1187, 1633, 2811]) osc('square', f, t, t + 0.52, filt('bandpass', f, 12, g)); voice(0.52); },
    clap(d, t, v) { for (let i = 0; i < 3; i++) { const g = gainEnv(t + i * 0.011, 0.001, 0.14 * v, i === 2 ? 0.12 : 0.02, d); noise(t + i * 0.011, 0.14, filt('bandpass', 1400, 1.4, g)); } voice(0.16); },
    drip(d, t, v) { const g = gainEnv(t, 0.001, 0.12 * v, 0.25, d); const f = 900 + rnd() * 900; const o = osc('sine', f, t, t + 0.28, g); o.frequency.exponentialRampToValueAtTime(f * 1.9, t + 0.05); voice(0.28); },
  };

  /* ================= music: styles ================= */
  const MAJ = [0, 2, 4, 5, 7, 9, 11], MIN = [0, 2, 3, 5, 7, 8, 10], DOR = [0, 2, 3, 5, 7, 9, 10], HMIN = [0, 2, 3, 5, 7, 8, 11], MIX = [0, 2, 4, 5, 7, 9, 10], LYD = [0, 2, 4, 6, 7, 9, 11], PHD = [0, 1, 4, 5, 7, 8, 10];
  // perc strings: one char per 16th step (12 for triple time), '0'..'9' velocity; '.' = 0
  const STY = {
    title: { bpm: 104, steps: 16, root: 60, scale: MAJ, prog: [0, 4, 5, 3, 0, 4, 3, 4], swing: 0, lead: 'brass', leadOct: 12, lead2: 'strings', chords: 'strings', chordPat: 'pad', bass: 'bass', bassPat: 'rootFifth', rhythm: 'march', density: 0.75,
      perc: { timp: '9.......6.......', snare: '....5.......5.35', hat: '2.2.2.2.2.2.2.2.' }, verb: 0.4 },
    town: { bpm: 116, steps: 16, root: 60, scale: MAJ, prog: [0, 5, 3, 4, 0, 5, 1, 4], swing: 0.14, lead: 'glock', leadOct: 12, chords: 'ep', chordPat: 'offbeat', bass: 'bass', bassPat: 'bounce', rhythm: 'bouncy', density: 0.7,
      perc: { kick: '8.......8.....5.', snare: '....6.......6...', hat: '3.2.3.2.3.2.3.2.', shaker: '..3...3...3...3.' }, verb: 0.22 },
    castle: { bpm: 100, steps: 12, root: 62, scale: DOR, prog: [0, 6, 0, 6, 2, 6, 3, 4], swing: 0, lead: 'flute', leadOct: 12, chords: 'harp', chordPat: 'arp3', bass: 'subBass', bassPat: 'drone', rhythm: 'dance', density: 0.8,
      perc: { tom: '8.....5.....', tamb: '...4.....4..', hiTom: '.........3.3' }, verb: 0.35 },
    forest: { bpm: 92, steps: 12, root: 67, scale: MAJ, mel: [0, 1, 2, 4, 5], prog: [0, 3, 0, 4, 0, 3, 4, 0], swing: 0, lead: 'flute', leadOct: 0, chords: 'harp', chordPat: 'arp6', bass: 'bass', bassPat: 'root', rhythm: 'jig', density: 0.65,
      perc: { shaker: '4.2.2.4.2.2.', conga: '6.....3.....' }, verb: 0.4 },
    fright: { bpm: 70, steps: 16, root: 62, scale: HMIN, prog: [0, 0, 5, 4, 0, 3, 4, 4], swing: 0, lead: 'celesta', leadOct: 12, chords: 'organ', chordPat: 'pad', lead2: 'choir', bass: 'subBass', bassPat: 'root', rhythm: 'sparse', density: 0.45,
      perc: { timp: '8...............', hat: '........2.......' }, verb: 0.6 },
    rock: { bpm: 124, steps: 16, root: 52, scale: MIN, prog: [0, 0, 5, 6, 0, 0, 3, 4], swing: 0, lead: 'synth', leadOct: 24, chords: 'brass', chordPat: 'stab', bass: 'synthBass', bassPat: 'eighths', rhythm: 'drive', density: 0.6,
      perc: { kick: '9.....7.9.....5.', snare: '....8.......8...', hat: '5353535353535353', clang: '..............4.' }, verb: 0.25 },
    space: { bpm: 100, steps: 16, root: 57, scale: LYD, prog: [0, 1, 0, 1, 3, 4, 5, 4], swing: 0, lead: 'blip', leadOct: 24, chords: 'pad', chordPat: 'pad', arp: 'synth', bass: 'synthBass', bassPat: 'pulse', rhythm: 'float', density: 0.5,
      perc: { kick: '7.......7.......', hat: '..3...3...3...3.', rim: '....4.......4...' }, verb: 0.5 },
    desert: { bpm: 112, steps: 16, root: 57, scale: MIX, prog: [0, 0, 6, 6, 3, 3, 4, 4], swing: 0.1, lead: 'twang', leadOct: 12, lead2: 'squeeze', chords: 'pluck', chordPat: 'boomchick', bass: 'bass', bassPat: 'rootFifth', rhythm: 'gallop', density: 0.65,
      perc: { wood: '7..47..47..47..4', kick: '6.......6.......', shaker: '....3.......3...' }, verb: 0.28 },
    island: { bpm: 118, steps: 16, root: 65, scale: MAJ, mel: [0, 1, 2, 4, 5], prog: [0, 3, 4, 0, 0, 3, 4, 4], swing: 0.08, lead: 'marimba', leadOct: 12, chords: 'marimba', chordPat: 'offbeat', bass: 'bass', bassPat: 'bounce', rhythm: 'bouncy', density: 0.75,
      perc: { log: '7..5..7...5.5...', bongo: '..4...4..4...4.4', shaker: '3232323232323232', conga: '6.......6.......' }, verb: 0.25 },
    pirate: { bpm: 126, steps: 12, root: 62, scale: MIN, prog: [0, 0, 6, 6, 5, 3, 4, 0], swing: 0, lead: 'squeeze', leadOct: 12, chords: 'pluck', chordPat: 'oompah', bass: 'bass', bassPat: 'oompah', rhythm: 'shanty', density: 0.8,
      perc: { kick: '8.....7.....', snare: '...5.....5..', tamb: '.3..3..3..3.' }, verb: 0.3 },
    bay: { bpm: 96, steps: 16, root: 60, scale: LYD, prog: [0, 1, 3, 4, 0, 1, 5, 4], swing: 0.1, lead: 'ep', leadOct: 12, chords: 'ep', chordPat: 'offbeat', bass: 'bass', bassPat: 'root', rhythm: 'float', density: 0.55,
      perc: { kick: '6.......6.......', rim: '....4.......4...', shaker: '..3...3...3...3.' }, verb: 0.35 },
    deep: { bpm: 64, steps: 16, root: 52, scale: MIN, prog: [0, 0, 5, 5, 3, 3, 4, 4], swing: 0, lead: 'celesta', leadOct: 12, chords: 'pad', chordPat: 'pad', bass: 'subBass', bassPat: 'drone', rhythm: 'sparse', density: 0.3,
      perc: { drip: '....5.....3.....', timp: '6...............' }, verb: 0.7 },
    battle: { bpm: 144, steps: 16, root: 64, scale: HMIN, prog: [0, 0, 5, 4, 0, 0, 3, 4], swing: 0, lead: 'brass', leadOct: 12, chords: 'strings', chordPat: 'ostinato', bass: 'synthBass', bassPat: 'eighths', rhythm: 'drive', density: 0.55,
      perc: { kick: '9.....8.9.....8.', snare: '....9.......9.5.', lowTom: '..5.....5.5.....', hat: '4444444444444444' }, verb: 0.2 },
    interior: null,
  };
  const RHY = {   // onset patterns per bar (steps), picked per motif
    march: [[0, 4, 8, 12], [0, 4, 6, 8, 12], [0, 6, 8, 12, 14], [0, 8], [0, 4, 8, 10, 12, 14]],
    bouncy: [[0, 3, 6, 8, 12], [0, 2, 4, 8, 10, 12], [0, 4, 6, 10, 12], [0, 2, 6, 8, 11, 14], [0, 8, 12]],
    dance: [[0, 4, 8], [0, 2, 4, 8, 10], [0, 6, 8], [0, 3, 4, 6, 8]],
    jig: [[0, 2, 4, 6, 8, 10], [0, 4, 6, 10], [0, 2, 4, 6, 10], [0, 6]],
    sparse: [[0, 8], [0], [0, 6, 12], [4, 12], [0, 12]],
    drive: [[0, 3, 6, 10, 12], [0, 2, 4, 6, 8, 12], [0, 6, 8, 14], [0, 4, 8, 12]],
    float: [[0, 6, 12], [0, 8], [2, 8, 14], [0, 4, 10]],
    gallop: [[0, 3, 4, 8, 11, 12], [0, 4, 8, 12], [0, 6, 8, 12, 14], [0, 8, 11]],
    shanty: [[0, 3, 6, 9], [0, 2, 3, 6, 9], [0, 6, 8], [0, 3, 4, 6, 9, 10]],
  };
  // a player: one running band
  function Player(id, st) {
    const P = { id, st, out: ctx.createGain(), bar: 0, step: 0, next: 0, seed: (Math.random() * 1e9) | 0, motifA: null, motifB: null, lastLead: null, lastChord: null, loop: 0, stopping: 0 };
    P.out.gain.value = 0.0001; P.out.connect(bus.musicDuck);
    P.verb = ctx.createGain(); P.verb.gain.value = st.verb || 0.25; P.out.connect(P.verb); P.verb.connect(verbIn);
    P.lead = ctx.createGain(); P.lead.gain.value = 1; P.lead.connect(P.out);
    P.drums = ctx.createGain(); P.drums.gain.value = 1; P.drums.connect(P.out);
    P.pads = ctx.createGain(); P.pads.gain.value = 1; P.pads.connect(P.out);
    // an echo on the lead for the dreamy styles
    if (st.verb >= 0.35) { const dl = ctx.createDelay(1.2); dl.delayTime.value = 60 / st.bpm * 0.75; const fb = ctx.createGain(); fb.gain.value = 0.28; const lp = filt('lowpass', 2600, 0.5, fb); P.lead.connect(dl); dl.connect(lp); fb.connect(dl); fb.connect(P.out); }
    return P;
  }
  const deg2midi = (st, deg, base) => { const sc = st.scale, o = Math.floor(deg / 7), i = ((deg % 7) + 7) % 7; return (base !== undefined ? base : st.root) + sc[i] + o * 12; };
  const chordDegs = (d) => [d, d + 2, d + 4];
  function closestVoicing(st, degs, prev, center) {
    let best = null, bs = 1e9;
    for (let inv = 0; inv < 3; inv++) for (let oc = -1; oc <= 1; oc++) {
      const ns = degs.map((d, i) => deg2midi(st, d + (i < inv ? 7 : 0)) + oc * 12).sort((a, b) => a - b);
      const c = ns.reduce((a, b) => a + b, 0) / ns.length; let s = Math.abs(c - center) * 0.6;
      if (prev) s += ns.reduce((a, n, i) => a + Math.abs(n - (prev[i] || n)), 0);
      if (s < bs) { bs = s; best = ns; }
    }
    return best;
  }
  // a melodic motif over two bars: [{s: step from motif start, rel: scale steps above the chord root, len}]
  function makeMotif(st, R, bars = 2) {
    const pats = RHY[st.rhythm] || RHY.march, out = []; let cur = R() < 0.5 ? 2 : 4;   // start on the 3rd or the 5th
    for (let b = 0; b < bars; b++) {
      const pat = pats[Math.floor(R() * pats.length)];
      for (let k = 0; k < pat.length; k++) {
        if (R() > st.density + 0.2 && k > 0) continue;
        const s = b * st.steps + pat[k], strong = pat[k] % (st.steps / 2) === 0;
        if (strong) { const tones = [0, 2, 4, 7]; let bestT = 0, bd = 99; for (const tt of tones) { const dd = Math.abs(tt - cur) + (R() < 0.3 ? R() * 3 : 0); if (dd < bd) { bd = dd; bestT = tt; } } cur = bestT; }
        else { const r = R(); const step = r < 0.35 ? 1 : r < 0.7 ? -1 : r < 0.82 ? 2 : r < 0.94 ? -2 : (R() < 0.5 ? 3 : -3); cur = M.clamp(cur + step, -3, 9); }
        out.push({ s, rel: cur });
      }
    }
    for (let i = 0; i < out.length; i++) out[i].len = (i + 1 < out.length ? out[i + 1].s : bars * st.steps) - out[i].s;
    return out;
  }
  function vary(st, mot, R, amt) { return mot.map((n) => (R() < amt ? Object.assign({}, n, { rel: n.rel + (R() < 0.5 ? 1 : -1) }) : n)); }
  function cadence(mot) { const m = mot.map((n) => Object.assign({}, n)); if (m.length) { const L = m[m.length - 1]; L.rel = 0; L.cad = true; } return m; }
  // the song form: [intro 4] [A A' B A''] x2 [break 4] — the motif is the land's theme; B changes every loop
  function barRole(P) {
    const L = 4 + 16 + 4, b = P.bar % L;
    if (b < 4) return { part: 'intro', i: b };
    if (b < 20) { const k = b - 4; return { part: 'theme', i: k % 8, half: Math.floor(k / 8) }; }
    return { part: 'break', i: b - 20 };
  }
  function schedBar(P, t0) {
    const st = P.st, sd = 60 / st.bpm / 4, steps = st.steps, role = barRole(P);
    if (P.bar % 24 === 0) { const R = M.rng(P.seed + P.loop * 7919); if (!P.motifA || P.loop % 3 === 0) P.motifA = makeMotif(st, R); P.motifB = makeMotif(st, R); P.loop++; }
    const deg = st.prog[P.bar % st.prog.length];
    const nightK = S.night, battle = st === STY.battle;
    const swing = (s) => (s % 4 === 2 ? st.swing * sd * 2 : 0);
    const T = (s) => t0 + s * sd + swing(s);
    const R = M.rng(P.seed + P.bar * 131);
    // ---- chords
    const ch = closestVoicing(st, chordDegs(deg), P.lastChord, st.root + 4); P.lastChord = ch;
    const CI = INST[st.chords], vel = 0.8 * (1 - nightK * 0.25);
    const barDur = steps * sd;
    if (CI) {
      const pat = st.chordPat;
      if (pat === 'pad') ch.forEach((n) => CI(P.pads, T(0), n, barDur * 0.95, vel));
      else if (pat === 'offbeat') for (const s of steps === 16 ? [2, 6, 10, 14] : [3, 9]) ch.forEach((n) => CI(P.pads, T(s), n, sd * 1.5, vel * 0.8));
      else if (pat === 'stab') for (const s of [0, 6, 10]) ch.forEach((n) => CI(P.pads, T(s), n, sd * 1.2, vel * 0.7));
      else if (pat === 'arp3') { const ns = [ch[0], ch[1], ch[2], ch[1] + 12, ch[2], ch[1]]; ns.forEach((n, i) => CI(P.pads, T(i * 2), n, sd * 2, vel * 0.8)); }
      else if (pat === 'arp6') { const ns = [ch[0], ch[1], ch[2], ch[0] + 12, ch[2], ch[1]]; for (let i = 0; i < 12; i++) CI(P.pads, T(i), ns[i % 6], sd, vel * (i % 3 === 0 ? 0.85 : 0.6)); }
      else if (pat === 'boomchick' || pat === 'oompah') { const offs = steps === 12 ? [3, 9] : [4, 12]; for (const s of offs) ch.forEach((n) => CI(P.pads, T(s), n, sd * 1.6, vel * 0.75)); }
      else if (pat === 'ostinato') for (let s = 0; s < steps; s += 2) CI(P.pads, T(s), ch[(s / 2) % 3] + (s % 8 === 6 ? 12 : 0), sd * 1.8, vel * 0.6);
    }
    if (st.arp && INST[st.arp] && role.part !== 'intro') { const ns = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 24]; for (let s = 0; s < steps; s++) INST[st.arp](P.pads, T(s), ns[s % 4], sd * 0.9, 0.45 * (s % 4 === 0 ? 1 : 0.6) * (1 - nightK * 0.4)); }
    // ---- bass
    const BI = INST[st.bass];
    if (BI) {
      const r = deg2midi(st, deg) - 24, f5 = r + 7, bp = st.bassPat, bv = 0.9;
      if (bp === 'root') BI(P.pads, T(0), r, barDur * 0.9, bv);
      else if (bp === 'drone') { BI(P.pads, T(0), deg2midi(st, 0) - 24, barDur, bv * 0.9); }
      else if (bp === 'rootFifth') { const h = steps / 2; BI(P.pads, T(0), r, sd * h * 0.8, bv); BI(P.pads, T(h), f5, sd * h * 0.8, bv * 0.8); }
      else if (bp === 'bounce') for (const [s, n] of [[0, r], [6, r], [8, f5], [11, r + 12], [12, f5]]) BI(P.pads, T(s), n, sd * 1.6, s === 0 ? bv : bv * 0.7);
      else if (bp === 'eighths') for (let s = 0; s < steps; s += 2) BI(P.pads, T(s), s === steps - 2 && R() < 0.5 ? f5 : r, sd * 1.7, s % 8 === 0 ? bv : bv * 0.75);
      else if (bp === 'pulse') for (let s = 0; s < steps; s += 4) BI(P.pads, T(s), s === 8 ? r + 12 : r, sd * 3, bv * 0.7);
      else if (bp === 'oompah') { const offs = steps === 12 ? [0, 6] : [0, 8]; BI(P.pads, T(offs[0]), r, sd * 2.5, bv); BI(P.pads, T(offs[1]), f5 - 12, sd * 2.5, bv * 0.85); }
    }
    // ---- percussion
    const drumK = (role.part === 'break' ? 0.25 : role.part === 'intro' && role.i < 2 ? 0 : 1) * (1 - nightK * 0.7) * (battle ? 1 : 1);
    if (drumK > 0.01) for (const k in st.perc) {
      const pat = st.perc[k], fn = DRUM[k]; if (!fn) continue;
      for (let s = 0; s < steps && s < pat.length; s++) { const c = pat.charCodeAt(s) - 48; if (c > 0 && c <= 9) fn(P.drums, T(s), (c / 9) * drumK * (0.9 + R() * 0.2)); }
    }
    // a fill at the end of every 4th bar
    if (drumK > 0.5 && P.bar % 4 === 3 && (st.perc.snare || st.perc.tom || st.perc.conga)) { const f = DRUM[st.perc.snare ? 'snare' : st.perc.tom ? 'tom' : 'conga']; for (const s of [steps - 3, steps - 2, steps - 1]) f(P.drums, T(s), 0.45 * drumK); }
    // ---- lead
    const LI = INST[st.lead];
    if (LI && role.part === 'theme') {
      let mot = null, off = 0;
      const i = role.i;
      if (i < 2) { mot = P.motifA; off = i; }
      else if (i < 4) { mot = role.half ? vary(st, P.motifA, M.rng(P.seed + P.loop), 0.35) : P.motifA; off = i - 2; }
      else if (i < 6) { mot = P.motifB; off = i - 4; }
      else { mot = cadence(P.motifA); off = i - 6; }
      const base = st.root + (st.leadOct || 0);
      for (const n of mot) {
        if (n.s < off * steps || n.s >= (off + 1) * steps) continue;
        const s = n.s - off * steps; let d = deg + n.rel;
        if (n.cad) d = Math.round(d / 7) * 7;   // land on the tonic
        if (st.mel) { const ii = ((d % 7) + 7) % 7; if (!st.mel.includes(ii)) d += 1; }
        let m = deg2midi(st, d, base); while (m > base + 19) m -= 12; while (m < base - 5) m += 12;
        if (nightK > 0.5 && R() < 0.3 * nightK && !n.cad) continue;
        LI(P.lead, T(s), m, Math.max(1, n.len) * sd * 0.92, 0.85 + (s === 0 ? 0.15 : 0));
        P.lastLead = m;
      }
    }
    // a counter-line on the second instrument in the second half / break
    const L2 = INST[st.lead2];
    if (L2 && (role.part === 'break' || (role.part === 'theme' && role.half === 1 && role.i >= 4))) { const n = ch[R() < 0.5 ? 1 : 2] + (st.lead2 === 'choir' ? 0 : 12); L2(P.lead, T(0), n, barDur * 0.9, 0.55); }
    P.bar++;
  }
  const players = [];
  function setStyle(id) {
    if (!ctx || S.style === id) return;
    S.style = id;
    const t = now();
    for (const P of players) if (!P.stopping) { P.stopping = t + 2.4; P.out.gain.cancelScheduledValues(t); P.out.gain.setValueAtTime(Math.max(0.0001, P.out.gain.value), t); P.out.gain.linearRampToValueAtTime(0.0001, t + 2.2); }
    const st = STY[id]; if (!st) return;
    const P = Player(id, st); const bar = st.steps * 60 / st.bpm / 4;
    P.next = t + 0.12; P.bar = 0;
    P.out.gain.setValueAtTime(0.0001, t); P.out.gain.linearRampToValueAtTime(1, t + 1.6);
    void bar; players.push(P);
  }
  function tickSched() {
    if (!ctx || ctx.state !== 'running') return;
    const t = now();
    for (let i = players.length - 1; i >= 0; i--) {
      const P = players[i];
      if (P.stopping && t > P.stopping) { try { P.out.disconnect(); } catch (e) { /* */ } players.splice(i, 1); continue; }
      const barDur = P.st.steps * 60 / P.st.bpm / 4;
      if (P.next < t - 0.5) P.next = t + 0.05;   // fell behind (tab was hidden): pick up cleanly
      while (P.next < t + 0.35 && S.voices < 220) { try { schedBar(P, P.next); } catch (e) { console.error('music', e); } P.next += barDur; }
    }
  }

  /* ================= SFX ================= */
  const L = new THREE.Vector3(), _cr = new THREE.Vector3(), _d = new THREE.Vector3();
  function spatial(o) {   // -> [gain, pan] from a world position relative to the camera / listener
    if (!o || o.x === undefined) return [1, 0];
    const cam = GFX.camera; _d.set(o.x - L.x, (o.y || L.y) - L.y, o.z - L.z); const dist = _d.length();
    _cr.set(1, 0, 0).applyQuaternion(cam.quaternion); const pan = dist > 0.5 ? M.clamp(_d.dot(_cr) / dist, -1, 1) * 0.75 : 0;
    const r = o.r || 18; return [1 / (1 + Math.max(0, dist - 2) / r) * (dist > (o.max || 140) ? 0 : 1), pan];
  }
  function out(o, extra = 1) { const [g, p] = spatial(o); if (g < 0.01) return null; const gg = ctx.createGain(); gg.gain.value = g * extra * (o && o.vel !== undefined ? o.vel : 1); gg.connect(panner(p, bus.sfx)); return gg; }
  const SFX = {
    click(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.001, 0.12, 0.05, d); osc('square', 1800, t, t + 0.06, filt('bandpass', 2200, 3, g)); },
    hover(o) { const d = out(o, 0.5); if (!d) return; const t = now(); const g = gainEnv(t, 0.001, 0.05, 0.03, d); osc('sine', 2400, t, t + 0.04, g); },
    // stud coins: silver ping, gold two-note, blue arpeggio sparkle
    coin(o) { const d = out(o); if (!d) return; const t = now(); for (const [m, dt] of [[88, 0], [95, 0.055]]) INST.glock(d, t + dt, m - 12 + (o.pitch || 0), 0.2, 1.1); },
    coinGold(o) { const d = out(o); if (!d) return; const t = now(); [84, 88, 91, 96].forEach((m, i) => INST.glock(d, t + i * 0.05, m - 12, 0.2, 1.1)); },
    coinBlue(o) { const d = out(o); if (!d) return; const t = now(); [72, 76, 79, 84, 88, 91, 96, 100].forEach((m, i) => INST.celesta(d, t + i * 0.045, m, 0.2, 1)); SFX.sparkle(o); },
    cash(o) { const d = out(o); if (!d) return; const t = now(); [79, 84, 88, 91].forEach((m, i) => INST.glock(d, t + i * 0.07, m, 0.2, 1.1)); const g = gainEnv(t + 0.3, 0.001, 0.12, 0.4, d); noise(t + 0.3, 0.45, filt('bandpass', 6000, 3, g)); },
    sparkle(o) { const d = out(o, 0.6); if (!d) return; const t = now(); for (let i = 0; i < 8; i++) { const g = gainEnv(t + i * 0.04, 0.001, 0.04, 0.2, d); osc('sine', 2600 + rnd() * 2600, t + i * 0.04, t + i * 0.04 + 0.22, g); } },
    pickup(o) { const d = out(o); if (!d) return; const t = now(); [76, 81, 88].forEach((m, i) => INST.ep(d, t + i * 0.07, m, 0.3, 1.3)); },
    questOffer(o) { const d = out(o); if (!d) return; const t = now(); INST.glock(d, t, 79, 0.2, 1); INST.glock(d, t + 0.12, 84, 0.3, 1); },
    questStart(o) { const d = out(o); if (!d) return; const t = now(); [67, 72, 76, 79].forEach((m, i) => INST.brass(d, t + i * 0.09, m, 0.12, 0.9)); INST.brass(d, t + 0.36, 84, 0.4, 1); duck(1.2); },
    questStep(o) { const d = out(o); if (!d) return; const t = now(); [79, 83, 86].forEach((m, i) => INST.glock(d, t + i * 0.08, m, 0.2, 1.1)); },
    questDone(o) { const d = out(o); if (!d) return; const t = now(); duck(3.8);
      const seq = [[60, 0, 0.14], [64, 0.14, 0.14], [67, 0.28, 0.14], [72, 0.42, 0.42], [67, 0.84, 0.14], [72, 0.98, 0.9]];
      for (const [m, dt, dur] of seq) { INST.brass(d, t + dt, m, dur, 1); INST.brass(d, t + dt, m + 7, dur, 0.5); }
      for (const m of [48, 55, 60]) INST.strings(d, t + 0.98, m, 1.6, 1.2); DRUM.timp(d, t + 0.98, 1); DRUM.snare(d, t + 0.84, 0.6); for (let i = 0; i < 6; i++) DRUM.snare(d, t + 0.84 + i * 0.023, 0.3); SFX.sparkle(o); },
    unlock(o) { const d = out(o); if (!d) return; const t = now(); [72, 76, 79, 84, 79, 84, 88].forEach((m, i) => INST.celesta(d, t + 0.9 + i * 0.07, m, 0.3, 0.9)); },
    secret(o) { const d = out(o); if (!d) return; const t = now(); duck(2.5); [67, 71, 74, 79, 83, 86, 91].forEach((m, i) => INST.glock(d, t + i * 0.06, m, 0.2, 1.2)); [55, 62, 67].forEach((m) => INST.strings(d, t + 0.42, m, 1.4, 1)); },
    talk(o) { const d = out(o, 0.8); if (!d) return; const t = now(); INST.blip(d, t, 84, 0.1, 0.7); INST.blip(d, t + 0.06, 88, 0.1, 0.6); },
    talkClose(o) { const d = out(o, 0.6); if (!d) return; const t = now(); INST.blip(d, t, 86, 0.1, 0.5); INST.blip(d, t + 0.06, 79, 0.1, 0.5); },
    babble(o) { const d = out(o, 0.35); if (!d) return; const t = now(); const g = gainEnv(t, 0.004, 0.06, 0.05, d); const p = (o.pitch || 0) + 280 + rnd() * 90; osc('triangle', p, t, t + 0.07, filt('bandpass', 900, 1.5, g)); },
    // footsteps: a hollow plastic tick, tinted by the surface
    step(o) { const d = out(o); if (!d) return; const t = now(); const s = o.surf || 'grass';
      const [f, q, n, a] = s === 'wood' ? [900, 3, 0.06, 0.13] : s === 'stone' ? [2200, 4, 0.04, 0.12] : s === 'sand' ? [3500, 0.7, 0.08, 0.07] : s === 'snow' ? [2800, 0.6, 0.1, 0.07] : s === 'water' ? [1200, 0.8, 0.12, 0.1] : [1600, 1.2, 0.05, 0.09];
      const g = gainEnv(t, 0.001, a, n, d); noise(t, n + 0.02, filt('bandpass', f * (0.9 + rnd() * 0.2), q, g));
      const k = gainEnv(t, 0.001, 0.05, 0.03, d); osc('sine', 330 + rnd() * 60, t, t + 0.04, k); },
    jump(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.003, 0.08, 0.16, d); const oo = osc('triangle', 280, t, t + 0.18, g); oo.frequency.exponentialRampToValueAtTime(620, t + 0.14); const n = gainEnv(t, 0.002, 0.04, 0.1, d); noise(t, 0.12, filt('highpass', 2500, 0.7, n)); },
    land(o) { const d = out(o); if (!d) return; const t = now(); const v = M.clamp(o.hard || 0.5, 0.2, 1.2); const g = gainEnv(t, 0.001, 0.22 * v, 0.14, d); const oo = osc('sine', 130, t, t + 0.16, g); oo.frequency.exponentialRampToValueAtTime(60, t + 0.12); const n = gainEnv(t, 0.001, 0.08 * v, 0.08, d); noise(t, 0.1, filt('bandpass', 1400, 1, n)); },
    whoosh(o) { const d = out(o); if (!d) return; const t = now(); const bp = filt('bandpass', 400, 1.2, d); bp.frequency.exponentialRampToValueAtTime(2400, t + 0.16); const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.14 * (o.vel || 1), t + 0.07); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22); g.connect(bp); noise(t, 0.25, g); },
    hit(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.001, 0.3, 0.1, d); noise(t, 0.12, filt('lowpass', 1800, 1, g)); const k = gainEnv(t, 0.001, 0.2, 0.12, d); const oo = osc('square', 190, t, t + 0.14, filt('lowpass', 900, 1, k)); oo.frequency.exponentialRampToValueAtTime(70, t + 0.1); },
    clank(o) { const d = out(o); if (!d) return; const t = now(); DRUM.clang(d, t, 1.4); SFX.hit(o); },
    // bricks bursting apart: a clatter of little plastic ticks
    burst(o) { const d = out(o); if (!d) return; const t = now(); const n = o.n || 14; for (let i = 0; i < n; i++) { const dt = rnd() * 0.35 * (i / n + 0.2); const g = gainEnv(t + dt, 0.001, 0.07 + rnd() * 0.05, 0.03, d); osc('square', 1500 + rnd() * 3200, t + dt, t + dt + 0.04, filt('bandpass', 2600 + rnd() * 2000, 4, g)); } const g = gainEnv(t, 0.001, 0.15, 0.18, d); noise(t, 0.2, filt('bandpass', 900, 0.8, g)); },
    hurt(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.005, 0.12, 0.25, d); const oo = osc('square', 520, t, t + 0.28, filt('lowpass', 1600, 1, g)); oo.frequency.exponentialRampToValueAtTime(260, t + 0.22); SFX.hit(Object.assign({}, o, { vel: 0.6 })); },
    defeat(o) { const d = out(o); if (!d) return; const t = now(); duck(2.5); SFX.burst(Object.assign({}, o, { n: 30 })); [67, 66, 65, 64].forEach((m, i) => INST.brass(d, t + 0.3 + i * 0.22, m - 12, i === 3 ? 0.8 : 0.2, 0.8)); },
    respawn(o) { const d = out(o); if (!d) return; const t = now(); for (let i = 0; i < 12; i++) { const g = gainEnv(t + i * 0.035, 0.001, 0.06, 0.03, d); osc('square', 1200 + i * 180, t + i * 0.035, t + i * 0.035 + 0.04, filt('bandpass', 2500, 3, g)); } INST.glock(d, t + 0.45, 84, 0.3, 1); },
    gear(o) { const d = out(o); if (!d) return; const t = now(); duck(2); [60, 67, 72, 76, 79, 84].forEach((m, i) => INST.brass(d, t + i * 0.07, m, i === 5 ? 0.6 : 0.1, 0.8)); SFX.sparkle(o); },
    bow(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.001, 0.14, 0.18, d); const oo = osc('triangle', 180, t, t + 0.2, g); oo.frequency.exponentialRampToValueAtTime(120, t + 0.15); SFX.whoosh(Object.assign({}, o, { vel: 0.6 })); },
    laser(o) { const d = out(o, 0.8); if (!d) return; const t = now(); const g = gainEnv(t, 0.001, 0.08, 0.12, d); const oo = osc('square', 1800, t, t + 0.14, filt('lowpass', 3000, 2, g)); oo.frequency.exponentialRampToValueAtTime(300, t + 0.12); },
    magic(o) { const d = out(o); if (!d) return; const t = now(); for (let i = 0; i < 5; i++) { const g = gainEnv(t + i * 0.03, 0.002, 0.05, 0.25, d); const oo = osc('sine', 700 + i * 260, t + i * 0.03, t + 0.35, g); oo.frequency.exponentialRampToValueAtTime(1600 + i * 300, t + 0.3); } },
    gun(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.001, 0.4, 0.14, d); noise(t, 0.16, filt('lowpass', 3200, 0.8, g)); const k = gainEnv(t, 0.001, 0.25, 0.1, d); const oo = osc('sine', 160, t, t + 0.12, k); oo.frequency.exponentialRampToValueAtTime(50, t + 0.1); },
    reload(o) { const d = out(o, 0.7); if (!d) return; const t = now(); for (const dt of [0, 0.18, 0.5]) { const g = gainEnv(t + dt, 0.001, 0.1, 0.03, d); noise(t + dt, 0.04, filt('bandpass', 3000, 3, g)); } },
    boom(o) { const d = out(o, 1.3); if (!d) return; const t = now() + (o.delay || 0); const g = gainEnv(t, 0.002, 0.7, 1.2, d); noise(t, 1.3, filt('lowpass', 420, 0.8, g), true); const k = gainEnv(t, 0.002, 0.5, 0.5, d); const oo = osc('sine', 90, t, t + 0.6, k); oo.frequency.exponentialRampToValueAtTime(30, t + 0.5); },
    thunder(o) { const d = out(o, 1.4); if (!d) return; const t = now() + (o.delay || 0); const lp = filt('lowpass', 900, 0.6, d); lp.frequency.exponentialRampToValueAtTime(120, t + 3.2); const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.8, t + 0.05); g.gain.exponentialRampToValueAtTime(0.25, t + 0.6); g.gain.linearRampToValueAtTime(0.45, t + 0.9); g.gain.exponentialRampToValueAtTime(0.0001, t + 3.6); g.connect(lp); noise(t, 3.7, g, true); },
    // the Builder: bricks click on, pop off
    place(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.001, 0.22, 0.04, d); noise(t, 0.05, filt('bandpass', 3200, 2.5, g)); const g2 = gainEnv(t + 0.028, 0.001, 0.18, 0.035, d); noise(t + 0.028, 0.05, filt('bandpass', 4200, 3, g2)); const k = gainEnv(t, 0.001, 0.12, 0.06, d); osc('sine', 520, t, t + 0.07, k); },
    remove(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.001, 0.2, 0.05, d); noise(t, 0.06, filt('bandpass', 2400, 2, g)); const k = gainEnv(t, 0.001, 0.1, 0.09, d); const oo = osc('sine', 700, t, t + 0.1, k); oo.frequency.exponentialRampToValueAtTime(1300, t + 0.08); },
    door(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.01, 0.1, 0.35, d); const oo = osc('sawtooth', 110, t, t + 0.4, filt('bandpass', 600, 5, g)); oo.frequency.linearRampToValueAtTime(150, t + 0.3); const k = gainEnv(t + 0.34, 0.001, 0.3, 0.12, d); noise(t + 0.34, 0.14, filt('lowpass', 700, 1, k)); },
    engine(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.05, 0.16, 0.8, d, 'lin'); const oo = osc('sawtooth', 40, t, t + 0.9, filt('lowpass', 500, 2, g)); oo.frequency.linearRampToValueAtTime(75, t + 0.3); oo.frequency.linearRampToValueAtTime(55, t + 0.8); },
    neigh(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.05, 0.08, 0.9, d, 'lin'); const oo = osc('sawtooth', 700, t, t + 1, filt('bandpass', 1400, 2, g)); for (let i = 0; i < 8; i++) oo.frequency.linearRampToValueAtTime(i % 2 ? 620 : 820 - i * 30, t + 0.1 + i * 0.09); oo.frequency.linearRampToValueAtTime(380, t + 0.95); },
    splash(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.005, 0.25, 0.45, d); const bp = filt('lowpass', 3000, 0.7, g); bp.frequency.exponentialRampToValueAtTime(500, t + 0.4); noise(t, 0.5, bp); },
    horn(o) { const d = out(o, 1.2); if (!d) return; const t = now(); for (const [dt, dur] of [[0, 0.45], [0.55, 0.9]]) { const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t + dt); g.gain.linearRampToValueAtTime(0.09, t + dt + 0.05); g.gain.setValueAtTime(0.09, t + dt + dur - 0.05); g.gain.linearRampToValueAtTime(0.0001, t + dt + dur); g.connect(filt('lowpass', 2200, 1, d));
      for (const f of [311, 370, 466]) osc('sawtooth', f, t + dt, t + dt + dur, g); } },
    clack(o) { const d = out(o, 0.7); if (!d) return; const t = now(); for (const dt of [0, 0.09]) { const g = gainEnv(t + dt, 0.001, 0.14, 0.05, d); noise(t + dt, 0.06, filt('bandpass', 1900, 2, g)); } },
    bell(o) { const d = out(o); if (!d) return; const t = now(); INST.celesta(d, t, o.m || 76, 0.3, 1.4); },
    pause(o) { const d = out(o, 0.7); if (!d) return; const t = now(); INST.ep(d, t, 76, 0.2, 1); INST.ep(d, t + 0.08, 72, 0.3, 1); },
    zone(o) { const d = out(o, 0.7); if (!d) return; const st = STY[o.style] || STY.town; const I = INST[st.lead] || INST.glock; const t = now() + 0.05; [0, 2, 4, 7].forEach((dg, i) => I(d, t + i * 0.13, deg2midi(st, dg, st.root + 12), i === 3 ? 0.5 : 0.14, 0.9)); },
    firework(o) { const d = out(o, 1.2); if (!d) return; const t = now() + (o.delay || 0); const g = gainEnv(t, 0.002, 0.45, 0.6, d); noise(t, 0.7, filt('lowpass', 1600, 0.8, g), true); for (let i = 0; i < 16; i++) { const dt = 0.25 + rnd() * 0.9; const c = gainEnv(t + dt, 0.001, 0.04, 0.03, d); noise(t + dt, 0.04, filt('bandpass', 4000 + rnd() * 3000, 3, c)); } },
    launch(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.05, 0.08, 0.9, d, 'lin'); const bp = filt('bandpass', 800, 2, g); bp.frequency.exponentialRampToValueAtTime(3500, t + 0.9); noise(t, 1, bp); },
    jet(o) { const d = out(o, 0.6); if (!d) return; const t = now(); const g = gainEnv(t, 0.02, 0.1, 0.18, d, 'lin'); noise(t, 0.22, filt('bandpass', 700 + rnd() * 300, 0.8, g)); },
    bark(o) { const d = out(o); if (!d) return; const t = now(); for (const dt of [0, 0.16]) { const g = gainEnv(t + dt, 0.005, 0.12, 0.09, d); const oo = osc('sawtooth', 520, t + dt, t + dt + 0.12, filt('bandpass', 1100, 2, g)); oo.frequency.exponentialRampToValueAtTime(300, t + dt + 0.1); } },
    photo(o) { const d = out(o); if (!d) return; const t = now(); const g = gainEnv(t, 0.001, 0.2, 0.05, d); noise(t, 0.06, filt('highpass', 2000, 1, g)); const g2 = gainEnv(t + 0.08, 0.001, 0.15, 0.06, d); noise(t + 0.08, 0.07, filt('bandpass', 1500, 2, g2)); },
    trophy(o) { const d = out(o); if (!d) return; const t = now(); duck(2); [72, 76, 79, 84].forEach((m, i) => { INST.glock(d, t + i * 0.09, m, 0.2, 1.1); INST.ep(d, t + i * 0.09, m - 12, 0.3, 0.8); }); [60, 64, 67, 72].forEach((m) => INST.strings(d, t + 0.36, m, 1.1, 0.8)); },
  };
  function sfx(name, o = {}) { if (!ctx || !S.on || S.muted || document.hidden) return; const f = SFX[name]; if (!f) return; try { f(o); } catch (e) { console.error('sfx ' + name, e); } }
  function duck(sec) { if (!ctx) return; const g = bus.musicDuck.gain, t = now(); g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(0.3, t + 0.15); g.setValueAtTime(0.3, t + sec); g.linearRampToValueAtTime(1, t + sec + 1.2); }

  /* ================= ambience ================= */
  const AMB = {};
  function loopNoise(dest, pink) { const s = ctx.createBufferSource(); s.buffer = pink ? pinkBuf : noiseBuf; s.loop = true; s.connect(dest); s.start(); return s; }
  function startAmbience() {
    // surf: pink noise, low-passed, swelling
    AMB.sea = ctx.createGain(); AMB.sea.gain.value = 0; AMB.sea.connect(bus.amb);
    const sw = ctx.createGain(); sw.gain.value = 0.6; sw.connect(AMB.sea); const lp = filt('lowpass', 700, 0.4, sw); loopNoise(lp, true);
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.11; const lg = ctx.createGain(); lg.gain.value = 0.4; lfo.connect(lg); lg.connect(sw.gain); lfo.start();
    const lfo2 = ctx.createOscillator(); lfo2.frequency.value = 0.07; const lg2 = ctx.createGain(); lg2.gain.value = 300; lfo2.connect(lg2); lg2.connect(lp.frequency); lfo2.start();
    // wind: band-passed noise, its band wandering
    AMB.wind = ctx.createGain(); AMB.wind.gain.value = 0; AMB.wind.connect(bus.amb);
    const wbp = filt('bandpass', 420, 0.9, AMB.wind); loopNoise(wbp, true);
    const wl = ctx.createOscillator(); wl.frequency.value = 0.05; const wlg = ctx.createGain(); wlg.gain.value = 220; wl.connect(wlg); wlg.connect(wbp.frequency); wl.start();
    // rain: bright hiss + a low patter
    AMB.rain = ctx.createGain(); AMB.rain.gain.value = 0; AMB.rain.connect(bus.amb);
    const rh = filt('highpass', 1500, 0.5, AMB.rain); loopNoise(filt('lowpass', 9000, 0.5, rh), false);
    const rl = ctx.createGain(); rl.gain.value = 0.7; rl.connect(AMB.rain); loopNoise(filt('lowpass', 500, 0.5, rl), true);
    // space hum
    AMB.hum = ctx.createGain(); AMB.hum.gain.value = 0; AMB.hum.connect(bus.amb);
    osc('sine', 55, now(), now() + 1e6, AMB.hum); osc('sine', 82.6, now(), now() + 1e6, (() => { const h = ctx.createGain(); h.gain.value = 0.5; h.connect(AMB.hum); return h; })());
    // engine (while driving)
    AMB.eng = ctx.createGain(); AMB.eng.gain.value = 0; AMB.eng.connect(bus.sfx);
    AMB.engLP = filt('lowpass', 500, 2, AMB.eng); AMB.engO = osc('sawtooth', 45, now(), now() + 1e6, AMB.engLP); AMB.engO2 = osc('square', 22.5, now(), now() + 1e6, (() => { const h = ctx.createGain(); h.gain.value = 0.4; h.connect(AMB.engLP); return h; })());
    AMB.nextBird = 0; AMB.nextCricket = 0; AMB.nextOwl = 0; AMB.nextGull = 0; AMB.nextDrip = 0;
  }
  function chirp(pan, v) {
    const t = now(), d = panner(pan, bus.amb); const n = 2 + Math.floor(rnd() * 5), base = 2600 + rnd() * 1800;
    for (let i = 0; i < n; i++) { const tt = t + i * (0.07 + rnd() * 0.06); const g = gainEnv(tt, 0.004, 0.045 * v, 0.06, d); const o = osc('sine', base, tt, tt + 0.09, g); o.frequency.exponentialRampToValueAtTime(base * (0.7 + rnd() * 0.8), tt + 0.06); }
  }
  function gull(pan, v) { const t = now(), d = panner(pan, bus.amb); for (let i = 0; i < 3; i++) { const tt = t + i * 0.28; const g = gainEnv(tt, 0.02, 0.05 * v, 0.2, d); const o = osc('sawtooth', 1500, tt, tt + 0.24, filt('bandpass', 1700, 3, g)); o.frequency.exponentialRampToValueAtTime(900, tt + 0.2); } }
  function cricket(pan, v) { const t = now(), d = panner(pan, bus.amb); const f = 4200 + rnd() * 900; for (let i = 0; i < 6; i++) { const tt = t + i * 0.045; const g = gainEnv(tt, 0.003, 0.02 * v, 0.025, d); osc('sine', f, tt, tt + 0.03, g); } }
  function owl(pan, v) { const t = now(), d = panner(pan, bus.amb); for (const [dt, dur] of [[0, 0.3], [0.45, 0.18], [0.7, 0.5]]) { const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t + dt); g.gain.linearRampToValueAtTime(0.05 * v, t + dt + 0.06); g.gain.linearRampToValueAtTime(0.0001, t + dt + dur); g.connect(d); const o = osc('sine', 390, t + dt, t + dt + dur, g); o.frequency.linearRampToValueAtTime(360, t + dt + dur); } }
  const smooth = (param, v, k = 0.3) => { const t = now(); param.cancelScheduledValues(t); param.setTargetAtTime(v, t, k); };
  let ambT = 0, seaK = 0, lastAmbZone = null;
  function ambience(dt, zone) {
    ambT -= dt; if (ambT > 0) return; ambT = 0.4;
    const cam = GFX.camera.position, inside = zone && zone.startsWith && zone.startsWith('in:'), deep = zone === 'deep';
    // how much sea is around the listener
    let wet = 0, n = 0;
    if (!inside && !deep) for (const r of [14, 30, 55]) for (let a = 0; a < 8; a++) { const x = L.x + Math.cos(a * 0.785) * r, z = L.z + Math.sin(a * 0.785) * r; n++; if (WORLD.inside(Math.floor(x), Math.floor(z)) ? WORLD.isWater(x, z) : true) wet += r === 14 ? 1.4 : r === 30 ? 1 : 0.6; }
    seaK = n ? M.clamp(wet / (n * 0.9), 0, 1) : 0;
    const high = M.clamp((cam.y - 30) / 160, 0, 1);
    smooth(AMB.sea.gain, inside || deep ? 0 : seaK * 0.55 * (1 - high * 0.7), 0.8);
    smooth(AMB.wind.gain, inside ? 0.0 : deep ? 0.08 : 0.06 + high * 0.35 + (zone === 'fright' ? 0.12 : 0) + S.rain * 0.12, 1.2);
    smooth(AMB.rain.gain, inside || deep ? S.rain * 0.08 : S.rain * 0.5, 1.5);
    smooth(AMB.hum.gain, zone === 'space' && !inside ? 0.05 : inside && /space|ice/.test(zone) ? 0.06 : 0, 1.5);
    lastAmbZone = zone;
    if (inside || high > 0.7) return;
    const t = BA.t, day = 1 - S.night, landy = zone && !deep && ['town', 'castle', 'forest', 'island', 'pirate', 'desert'].includes(zone);
    if (deep) { if (t > AMB.nextDrip) { AMB.nextDrip = t + 1.2 + rnd() * 3.5; DRUM.drip(panner(rnd() * 1.6 - 0.8, bus.amb), now(), 0.6); } return; }
    if (landy && day > 0.4 && S.rain < 0.3 && t > AMB.nextBird) { AMB.nextBird = t + (zone === 'forest' ? 1.2 : 3) + rnd() * 5; chirp(rnd() * 1.6 - 0.8, day * (zone === 'forest' ? 1.2 : 0.8)); }
    if (seaK > 0.25 && day > 0.5 && t > AMB.nextGull) { AMB.nextGull = t + 6 + rnd() * 12; gull(rnd() * 1.6 - 0.8, seaK); }
    if (S.night > 0.5 && zone !== 'space' && S.rain < 0.3 && t > AMB.nextCricket) { AMB.nextCricket = t + 0.25 + rnd() * 0.9; cricket(rnd() * 1.8 - 0.9, S.night); }
    if ((S.night > 0.6 || zone === 'fright') && (zone === 'forest' || zone === 'fright' || zone === 'castle') && t > AMB.nextOwl) { AMB.nextOwl = t + 9 + rnd() * 16; owl(rnd() * 1.4 - 0.7, 1); }
  }

  /* ================= listening to the game ================= */
  const hookGame = () => {
    if (typeof GAME === 'undefined') return;
    const at = () => { const p = GAME.playerPos(); return p ? { x: p[0], y: p[1] + 2, z: p[2] } : {}; };
    GAME.on('studs', (d) => { if (!d || !d.delta) return; const o = d.x !== undefined ? { x: d.x, y: d.y, z: d.z } : at(); if (d.delta >= 1000) sfx(d.delta === 1000 ? 'coinBlue' : 'cash', o); else if (d.delta >= 100) sfx(d.delta === 100 ? 'coinGold' : 'cash', o); else if (d.delta > 0) sfx('coin', o); else sfx('coin', Object.assign(o, { pitch: -7 })); });
    GAME.on('pickup', (d) => { if (d && d.kind === 'quest') sfx('pickup', at()); });
    GAME.on('redbrick', () => sfx('secret', at()));
    GAME.on('quest:offer', () => sfx('questOffer', at()));
    GAME.on('quest:start', () => sfx('questStart', at()));
    GAME.on('quest:step', () => sfx('questStep', at()));
    GAME.on('quest:done', () => sfx('questDone', at()));
    GAME.on('unlockZone', () => sfx('unlock', at()));
    GAME.on('easteregg', () => sfx('secret', at()));
    GAME.on('talk:open', () => sfx('talk', at()));
    GAME.on('talk:close', () => sfx('talkClose', at()));
    GAME.on('vehicle:enter', (d) => { const k = (d && d.kind) || (GAME.mod('drive') && GAME.mod('drive').kind()); sfx(k === 'horse' ? 'neigh' : k === 'boat' ? 'splash' : 'engine', at()); });
    GAME.on('vehicle:exit', () => sfx('door', at()));
    GAME.on('train:board', () => { sfx('bell', Object.assign(at(), { m: 84 })); setTimeout(() => sfx('horn', at()), 500); });
    GAME.on('interior:enter', () => sfx('door', at()));
    GAME.on('interior:exit', () => sfx('door', at()));
    GAME.on('build:open', () => sfx('whoosh', {})); GAME.on('build:close', () => sfx('whoosh', {}));
    GAME.on('pause', () => sfx('pause', {}));
    GAME.on('arrival:done', () => sfx('zone', { style: 'town' }));
    GAME.on('racers:open', () => { S.racers = true; }); GAME.on('racers:close', () => { S.racers = false; });
  };
  // UI clicks (every chunky button in the game's DOM)
  if (!disabled) document.addEventListener('click', (e) => { const b = e.target && e.target.closest && e.target.closest('.bbtn,.mn-pb,[role=button],button,.card,.mn-sw,.mn-part,.tab'); if (b) sfx('click', {}); }, true);

  /* per-frame observers: footsteps, jumps, combat, the Builder, driving, the train, thunder */
  const O = { cyc: 0, grounded: true, fallV: 0, hp: null, kills: 0, atk: 0, projN: 0, dead: 0, build: null, lightning: 0, trainD: 1e9, trainHorn: 0, clackT: 0, enemyHp: new Map(), zoneStable: null, zoneT: 0, lastStyle: null, babbleT: 0 };
  const SURF = { tan: 'sand', sand: 'sand', dkorange: 'sand', white: 'snow', brown: 'wood', dgray: 'stone', lgray: 'stone', stone: 'stone', black: 'stone', water: 'water', tlblue: 'water' };
  function observe(dt) {
    // listener
    const pp = typeof GAME !== 'undefined' && GAME.phase === 'play' ? GAME.playerPos() : null;
    if (pp) L.set(pp[0], pp[1] + 2, pp[2]); else if (typeof CAM !== 'undefined') L.copy(CAM.tgt); else L.copy(GFX.camera.position);
    // player feet
    if (PLAYER.active && PLAYER.fig && !PLAYER.driving) {
      const f = PLAYER.fig, o = { x: f.x, y: f.gy + 0.3, z: f.z };
      if (PLAYER.grounded && f.anim !== 'idle' && PLAYER.speed > 1) {
        const ph = Math.floor(f.cyc / Math.PI);
        if (ph !== O.cyc) { O.cyc = ph; let top = 'green'; try { top = COL.names[WORLD.TOP[WORLD.I(Math.floor(f.x), Math.floor(f.z))]]; } catch (e) { /* */ } const onBrick = Math.abs(f.gy - WORLD.y(f.x, f.z)) > 0.3; o.surf = onBrick ? 'wood' : SURF[top] || 'grass'; o.vel = PLAYER.speed > 8 ? 1 : 0.75; sfx('step', o); }
      } else O.cyc = Math.floor(f.cyc / Math.PI);
      if (O.grounded && !PLAYER.grounded && PLAYER.vy > 5) sfx('jump', o);
      if (!PLAYER.grounded) O.fallV = Math.min(O.fallV, PLAYER.vy);
      if (!O.grounded && PLAYER.grounded) { if (O.fallV < -6) sfx('land', Object.assign(o, { hard: -O.fallV / 22 })); O.fallV = 0; }
      O.grounded = PLAYER.grounded;
    }
    // combat
    if (typeof COMBAT !== 'undefined' && COMBAT && !COMBAT.off && PLAYER.active) {
      const C = COMBAT, me = pp ? { x: pp[0], y: pp[1] + 2, z: pp[2] } : {};
      if (O.hp !== null && C.hp < O.hp - 0.01 && C.hp > 0) sfx('hurt', me);
      if (C.dead > 0 && !O.dead) sfx('defeat', me);
      if (!C.dead && O.dead) sfx('respawn', me);
      O.dead = C.dead > 0; O.hp = C.hp;
      if (C.atkT > O.atk + 0.05 && C.atkKind === 'melee') sfx('whoosh', Object.assign({}, me, { vel: C.gear === 'drill' ? 1.3 : 0.9 }));
      O.atk = C.atkT;
      if (C.proj && C.proj.length > O.projN) { for (let i = O.projN; i < C.proj.length; i++) { const p = C.proj[i]; if (!p || p.enemy || p.foe) continue; const k = p.kind || p.proj || ''; sfx(/arrow/.test(k) ? 'bow' : /magic/.test(k) ? 'magic' : /laser/.test(k) ? 'laser' : /bullet|ball/.test(k) ? 'gun' : 'whoosh', me); break; } }
      O.projN = C.proj ? C.proj.length : 0;
      if (C.kills > O.kills) sfx('burst', me); O.kills = C.kills;
      // enemies taking hits near you + the battle music layer
      let aggro = 0;
      if (C.list) for (const E of C.list) {
        if (!E.alive) { O.enemyHp.delete(E); continue; }
        const d = Math.hypot(E.x - L.x, E.z - L.z); if (d > 60) continue;
        const h0 = O.enemyHp.get(E); if (h0 !== undefined && E.hp < h0 - 0.01) sfx(E.T && E.T.heavy ? 'clank' : 'hit', { x: E.x, y: (E.gy || 0) + 2, z: E.z });
        O.enemyHp.set(E, E.hp);
        if ((E.st === 'chase' || E.st === 'wind' || E.st === 'attack') && d < 30) aggro++;
      }
      S.battle = aggro > 0 ? 6 : Math.max(0, S.battle - dt);
    } else S.battle = 0;
    // the Builder
    if (typeof BUILD !== 'undefined' && BUILD.S && BUILD.S.active && BUILD._count) { const n = BUILD._count(); if (O.build !== null && n !== O.build) sfx(n > O.build ? 'place' : 'remove', {}); O.build = n; } else O.build = null;
    // driving: the engine hum follows the throttle
    const D = typeof GAME !== 'undefined' && GAME.mod('drive');
    if (AMB.eng) {
      let eg = 0;
      if (D && D.active && D.active() && D.S && D.S.cur) { const v = Math.abs(D.S.cur.v || 0), k = D.kind();
        if (k === 'car') { eg = 0.09; AMB.engO.frequency.setTargetAtTime(38 + v * 5.5, now(), 0.1); AMB.engO2.frequency.setTargetAtTime(19 + v * 2.75, now(), 0.1); AMB.engLP.frequency.setTargetAtTime(380 + v * 60, now(), 0.1); }
        else if (k === 'boat') { eg = 0.05 + Math.min(0.05, v * 0.004); AMB.engO.frequency.setTargetAtTime(30 + v * 3, now(), 0.2); AMB.engLP.frequency.setTargetAtTime(300, now(), 0.2); if (v > 3 && rnd() < dt * 1.5) sfx('splash', Object.assign(at0(), { vel: 0.4 })); }
        else if (k === 'horse' && v > 1) { O.hoof = (O.hoof || 0) + dt * (1.4 + v * 0.22); if (O.hoof > 1) { O.hoof = 0; const t = now(), dd = bus.sfx; for (const dt2 of [0, 0.08, 0.2]) DRUM.wood(dd, t + dt2, 0.5); } } }
      smooth(AMB.eng.gain, eg, 0.15);
    }
    // the 9V Express: horn as it closes on you, clickety-clack as it passes
    if (typeof TRAIN !== 'undefined' && TRAIN.cars && TRAIN.cars[0] && !(typeof INTERIOR !== 'undefined' && INTERIOR.cur)) {
      const c = TRAIN.cars[0].position, d = Math.hypot(c.x - L.x, c.z - L.z), v = Math.abs(TRAIN.v || 0);
      if (d < 70 && O.trainD >= 70 && v > 4 && BA.t > O.trainHorn) { O.trainHorn = BA.t + 25; sfx('horn', { x: c.x, y: c.y, z: c.z, r: 40 }); }
      O.trainD = d;
      if (v > 2 && d < 55) { O.clackT += dt * v / 9; if (O.clackT > 1) { O.clackT = 0; sfx('clack', { x: c.x, y: c.y, z: c.z, r: 25 }); } }
    }
    // thunder follows the Fright Knights' lightning
    const lt = BA.U.uLightning.value; if (lt > 0.5 && O.lightning <= 0.5 && typeof FRIGHT !== 'undefined' && LAYOUT.P.fright) { const fx = SPREAD.at('fright', LAYOUT.P.fright[0], LAYOUT.P.fright[1]); const dd = Math.hypot(fx[0] - L.x, fx[1] - L.z); if (dd < 260) sfx('thunder', { delay: Math.min(2.5, dd / 120), vel: 0.6 }); } O.lightning = lt;
  }
  const at0 = () => ({ x: L.x, y: L.y, z: L.z });
  const inDeep = () => typeof INTERIOR !== 'undefined' && INTERIOR.cur === 'deep';

  /* which band plays */
  function wantStyle() {
    if (S.racers) return null;
    const ph = typeof GAME !== 'undefined' ? GAME.phase : 'explore';
    if (ph === 'boot') return null;
    if (ph === 'title' || ph === 'creator') return 'title';
    if (inDeep()) return S.battle > 0 ? 'battle' : 'deep';
    if (S.battle > 0) return 'battle';
    const z = typeof UI !== 'undefined' ? UI.S.zone : null;
    if (!z) return O.lastStyle || 'town';
    if (z.startsWith('in:')) return O.lastStyle || 'town';
    return STY[z] ? z : 'town';
  }
  BA.onUpdate('audio', 70, (t, dt) => {
    if (!ctx || !S.on) return;
    try {
      observe(dt);
      const z = typeof UI !== 'undefined' ? UI.S.zone : null;
      const deepOn = inDeep();
      ambience(dt, deepOn ? 'deep' : z);
      // muffle indoors (the band plays on outside)
      const inside = !deepOn && !!(z && z.startsWith && z.startsWith('in:'));
      S.muffle += ((inside ? 1 : 0) - S.muffle) * Math.min(1, dt * 3);
      bus.musicF.frequency.setTargetAtTime(20000 * Math.pow(0.03, S.muffle), now(), 0.1);
      // pick the band (a land has to hold for 2.5 s before it takes over; battle cuts in at once)
      const w = wantStyle();
      if (w !== O.zoneStable) { O.zoneStable = w; O.zoneT = 0; }
      O.zoneT += dt;
      if (w && w !== S.style && (O.zoneT > 2.5 || w === 'battle' || w === 'title' || !S.style)) { const was = S.style; setStyle(w); if (w !== 'battle' && w !== 'title' && w !== 'deep') { if (was && was !== 'battle' && was !== 'title' && GAME.phase === 'play') sfx('zone', { style: w }); O.lastStyle = w; } }
      if (!w && S.style) { setStyle(null); }
      const mv = S.racers ? 0 : S.vol.music;
      bus.music.gain.setTargetAtTime(mv, now(), 0.3);
    } catch (e) { if (!S.err) { S.err = true; console.error('audio', e); } }
  });
  hookGame();

  /* ================= controls ================= */
  function setVol(k, v) { S.vol[k] = M.clamp(v, 0, 1); if (ctx) { if (k === 'master') master.gain.setTargetAtTime(S.muted ? 0 : S.vol.master, now(), 0.05); else if (bus[k]) bus[k].gain.setTargetAtTime(S.vol[k], now(), 0.05); } saveCfg(); }
  function toggleMute(on) { S.muted = on === undefined ? !S.muted : !!on; if (ctx) master.gain.setTargetAtTime(S.muted ? 0 : S.vol.master, now(), 0.05); saveCfg(); if (typeof UI !== 'undefined' && UI.toast) UI.toast(S.muted ? 'SOUND OFF' : 'SOUND ON', 'N toggles sound · volumes in Settings'); }
  if (!disabled) window.addEventListener('keydown', (e) => { if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return; if (e.code === 'KeyN' && !e.repeat && !e.ctrlKey && !e.metaKey) { resume(); toggleMute(); } });

  // level meter (tests / debugging): {rms, peak} of the mix over the last ~40 ms
  function meter() { if (!S.an) return null; const a = new Float32Array(S.an.fftSize); S.an.getFloatTimeDomainData(a); let r = 0, pk = 0; for (const v of a) { r += v * v; pk = Math.max(pk, Math.abs(v)); } return { rms: Math.sqrt(r / a.length), peak: pk }; }
  return { S, sfx, setVol, toggleMute, duck, resume, meter, setStyle, STY, INST, DRUM, SFX, get ctx() { return ctx; }, get listener() { return L; } };
})();
