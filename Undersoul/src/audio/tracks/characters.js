// Character themes.
import { prog, pad, arp, bass, comp, oompah, rep } from './lib.js';
import { MOTIF_A, MOTIF_A2 } from './theme.js';

// Sprig: a nursery tune with a chromatic creep (F#, Ab) that gives it away.
const SPRIG_P = prog('C C Ab G C C F:2 Fm:2 C');
export const SPRIG_MEL = `o5 e8 g8 >c8 <g8 e8 g8 c4 d8 e8 f+8 g8 a-4 g4 a-8 >c8 e-8 c8 <a-8 >c8 <a-4 g4 f8 e8 d4 <b4
  >e8 g8 >c8 <g8 e8 g8 c4 d8 e8 f+8 g8 a-4 g4 a4 >c4 <a-4 >c4 <c2 r2`;
export const SPRIG_EVIL_MEL = `o4 e-8 g8 >c8 <g8 e-8 g8 c4 d8 e-8 f+8 g8 a-4 g4 a-8 >c8 e-8 c8 <a-8 >c8 <a-4 g4 f8 e-8 d4 <b4
  >e-8 g8 >c8 <g8 e-8 g8 c4 d8 e-8 f+8 g8 a-4 g4 a-4 >c4 <a-4 >c4 <c2 r2`;
const SPRIG_EVIL_P = prog('Cm5 Cm5 Ab5 G5 Cm5 Cm5 F5 C5'.replace(/m5/g, '5'));

const WICK_P = prog('Dm7 G7 Cmaj7 A7 Dm7 G7 Em7:2 A7:2 Dm7');
const WICK_MEL1 = `o5 r8 d8 f8 a8 g+8 a8 r4 r8 f8 d8 <b8 >c4 <a4 >r8 e8 g8 b8 a8 g8 e4 c+8 d8 e8 g8 f8 e8 c+4
  r8 d8 f8 a8 >c8 <a8 g+8 a8 f8 d8 <b8 g8 a8 b8 >d4 g8 f8 e8 d8 c+8 e8 g8 b-8 a4 r4 r2`;
const WICK_MEL2 = `o5 r4 a8 g8 f8 e8 d4 r8 b8 >d8 <b8 g4 f4 e8 g8 b8 >d8 c4 <b4 a8 g8 e8 c+8 d4 e4
  f8 a8 >c8 <a8 g+8 a8 f4 d8 <b8 g8 f8 e8 d8 <b4 >r8 e8 g8 b8 >c+8 <b-8 g8 e8 d2 r2`;

const TAPER_A = prog('C G/B Am F C G F:2 G:2 C');
const TAPER_B = prog('F G Em Am Dm G E7 G7');
const TAPER_MEL = `o5 c4 g4 >c4. <g8 f8 e8 d8 e8 d4 <g4 a4 >e4 a4. e8 f8 e8 d8 c8 <a4 >c4
  c4 g4 >c4. d8 e8 d8 c8 <b8 >d4 <g4 a8 g8 f8 e8 d4 <b4 >c2 r2
  o5 a4. g8 f4 a4 g4. f8 e4 g4 e8 f8 g4 b4 g4 a2 >c2 <d4 f4 a4 >d4 c4 <b4 g4 f4 e4 g+4 b4 >d4 <g12 a12 b12 >c12 d12 e12 f4 d4`;

const HUSH_P = prog('Cm7 Abmaj7 Fm7 G7sus4:2 G7:2 Cm7 Abmaj7 Fm7 G7sus4:2 G7:2');
const HUSH_MEL = `o5 g4. e-8 f4 e-4 c2. r4 a-4. g8 f4 e-4 d2 <b2 >g4. e-8 f4 g4 >c2 <b-4 a-4 g4. f8 e-4 c4 d1`;

const LAB_A = prog('Bbmaj7 Gm7 Cm7 F7 Bbmaj7 Gm7 Cm7 F7');
const LAB_B = prog('Ebmaj7 D7 Gm7 C7 Cm7 F7 Bbmaj7:2 G7:2 Cm7:2 F7:2');
const LAB_MEL = `o5 d8 r8 f8 r8 a8 g8 f8 r8 d8 r8 b-8 a8 g4 r4 e-8 r8 g8 r8 b-8 a8 g8 e-8 f4 a4 >c4 r4
  <d8 r8 f8 r8 a8 g8 f8 r8 b-8 a8 g8 d8 f4 r4 e-8 g8 b-8 >d8 c4 <b-4 a2 r2`;
const LAB_MEL_B = `o5 g4 b-4 >d4 <b-4 a4 f+4 d4 c4 <b-4 >d4 f4 d4 e4 g4 b-4 g4
  e-4 g4 >c4 <b-4 a4 f4 e-4 c4 d4 f4 b4 g4 e-4 g4 f4 a4`;

const LUXE_A = prog('Am7 D9 Am7 D9 Fmaj7 E7 Am7:2 G:2 Fmaj7:2 E7:2');
const LUXE_B = prog('Dm7 G7 Cmaj7 Fmaj7 Bm7b5 E7 Am7 E7');
const LUXE_MEL = `o5 e4 r8 e8 g8 a8 r4 f+8 e8 d8 e8 r2 e4 r8 e8 g8 a8 >c8 d8 e8 d8 c8 <a8 r2
  a4 g8 a8 >c4 <a4 g+4 e8 f+8 g+4 b4 a4 g4 e4 d4 c4 <a4 b2
  o5 f4 a4 >c4 <a4 g4. f8 d4 <b4 >c8 e8 g8 b8 >c4 <g4 a2. r4 a4 f4 d4 <b4 >d4 <b4 g+4 e4 >c4 e4 a4 >c4 <b2 g+2`;

const SILK_A = prog('Dm A7 Dm A7 Bb F Gm A', 3);
const SILK_B = prog('F C Dm Am Bb Gm A7 Dm', 3);
const SILK_MEL = `o5 d8 f8 a8 f8 d8 f8 c+8 e8 a8 e8 c+8 e8 d8 f8 a8 >d8 c8 <b-8 a8 g8 f8 e8 d8 c+8
  d8 f8 b-8 f8 d8 f8 c8 f8 a8 f8 c8 f8 b-8 a8 g8 f8 e8 d8 c+4 e4 a4
  o5 a8 >c8 <a8 f8 c8 f8 e8 g8 >c8 <g8 e8 g8 f8 e8 d8 e8 f8 a8 e4 c4 <a4
  >d8 c8 <b-8 a8 b-8 >d8 g8 f8 e8 d8 e8 g8 f8 e8 d8 c+8 <b8 >c+8 d2.`;

const SHOP_P = prog('Fmaj7 Em7:2 A7:2 Dm7 Gm7:2 C7:2 Fmaj7 Bbmaj7 Gm7 C7');
const SHOP_MEL = `o5 e4 c8 <a8 r4 >c8 d8 e4 g4 e4 c+4 d4. f8 a4 f4 g4 b-4 a4 g4
  a4 f8 c8 r4 e8 f8 d2 f4 d4 b-4. a8 g4 f4 e2 r2`;

const HANG_A = prog('G Em C D G Em C:2 D:2 G');
const HANG_B = prog('C D Bm Em C D Am7:2 D7:2 D7');
const HANG_MEL = `o5 d8 g8 b8 g8 a4 g4 e8 g8 b8 g8 f+4 e4 e8 g8 >c8 <b8 a4 g4 f+4 a4 d2
  d8 g8 b8 >d8 c4 <b4 g8 b8 >e8 d8 <b4 g4 a8 g8 e8 g8 f+8 e8 d8 f+8 g2 r2
  o5 e4. g8 >c4 <g4 f+4. a8 >d4 <a4 b4. a8 f+4 d4 e2 g4 b4 >c4. <b8 a4 g4 f+4 e4 d4 f+4 e4 c4 f+4 a4 >c2 <a2`;

// Creator: the leitmotif in E, glassy and suspended.
const CREATE_P = prog('E A C#m Bsus4:2 B:2 E A:2 F#m:2 B7 E');

export const CHARACTER_TRACKS = {
  sprig: {
    bpm: 100,
    ch: [
      { ins: 'musicbox', vol: 0.7, rev: 0.4, pan: 0.1, mml: `r1 L ${SPRIG_MEL}` },
      { ins: 'pizz', vol: 0.5, rev: 0.3, pan: -0.2, mml: `${bass(prog('C'), 'x-5-x-5-', 36)} L ${bass(SPRIG_P, 'x-5-x-5-', 36)}` },
      { ins: 'marimba', vol: 0.35, rev: 0.3, pan: 0.25, mml: `r1 L ${comp(SPRIG_P, '-x-x-x-x', 64)}` },
      { ins: 'drums', vol: 0.2, mml: `r1 L [d+4 r4 d+4 d+8 d+8]8` },
    ],
  },

  sprig_evil: {
    bpm: 84,
    ch: [
      { ins: 'square', vol: 0.5, rev: 0.4, echo: 0.2, mml: `r1 L v11 ${SPRIG_EVIL_MEL}` },
      { ins: 'dguitar', vol: 0.5, dist: 6, pan: -0.2, mml: `r1 L ${comp(SPRIG_EVIL_P, 'x..x..x.', 50, { voices: 2 })}` },
      { ins: 'choir', vol: 0.45, rev: 0.6, mml: `r1 L ${pad(prog('Cm Cm Ab G Cm Cm Fm C'), 58)}` },
      { ins: 'bass', vol: 0.5, mml: `${bass(prog('Cm'), 'x..x..x.', 36)} L ${bass(prog('Cm Cm Ab G Cm Cm Fm C'), 'x..x..x.', 36)}` },
      { ins: 'drums', vol: 0.5, mml: `c4 r4 c4 d4 L [c4 r8 c8 d4 r4 c8 c8 r4 d4 r4]4` },
    ],
  },

  wick: {
    bpm: 112,
    swing: 0.3,
    ch: [
      { ins: 'epiano', vol: 0.55, rev: 0.3, pan: 0.15, mml: `r1 L v12 ${WICK_MEL1} @marimba ${WICK_MEL2} @epiano` },
      { ins: 'bass', vol: 0.55, mml: `${bass(prog('Dm7'), 'walk', 38)} L ${bass([...WICK_P, ...WICK_P], 'walk', 38)}` },
      { ins: 'piano', vol: 0.3, rev: 0.3, pan: -0.2, mml: `v8 r1 L ${comp([...WICK_P, ...WICK_P], 'x..x....', 60, { voices: 4 })}` },
      { ins: 'drums', vol: 0.35, mml: `[f+4 (f+ e)8 f+8 f+4 (f+ e)8 f+8]1 L [f+4 (f+ e)8 f+8 f+4 (f+ e)8 f+8 f+4 (f+ e)8 f+8 f+4 (f+ e d+)8 f+8]8` },
    ],
  },

  taper: {
    bpm: 132,
    ch: [
      { ins: 'square', vol: 0.5, rev: 0.25, pan: 0.1, mml: `r1 L v12 ${TAPER_MEL}` },
      { ins: 'brass', vol: 0.4, rev: 0.3, pan: -0.15, mml: `r1 L ${comp([...TAPER_A, ...TAPER_B], 'x.-x.-x-', 60)}` },
      { ins: 'bass', vol: 0.5, mml: `${bass(prog('C'), 'root5', 36)} L ${bass([...TAPER_A, ...TAPER_B], 'root5', 36)}` },
      { ins: 'timpani', vol: 0.4, rev: 0.3, mml: `o3 c4 r4 <g4 r4 L ${bass([...TAPER_A, ...TAPER_B], 'x...x...', 43)}` },
      { ins: 'drums', vol: 0.4, mml: `d16 d16 d16 d16 d16 d16 d16 d16 d16 d16 d16 d16 d8 d8 L [c8 d16 d16 d8 c8 c8 d16 d16 d4 c8 d16 d16 d8 c8 c8 d16 d16 (d b)4]8` },
    ],
  },

  hush: {
    bpm: 76,
    ch: [
      { ins: 'ocarina', vol: 0.4, rev: 0.6, pan: 0.1, mml: `r1 r1 L v10 ${HUSH_MEL}` },
      { ins: 'epiano', vol: 0.45, rev: 0.5, pan: -0.15, lp: 3000, mml: `r1 r1 L ${comp(HUSH_P, 'x..x..x.', 60, { voices: 4 })}` },
      { ins: 'sine', vol: 0.4, mml: `${bass(prog('Cm7 Cm7'), 'x...x.x.', 36)} L ${bass(HUSH_P, 'x...x.x.', 36)}` },
      { ins: 'drums', vol: 0.3, lp: 5000, mml: `[c4 r8 c8 d4 r4]2 L [c4 r8 c8 d4 r8 a+8 c8 r8 r8 c8 d4 r4]4` },
    ],
  },

  lab: {
    bpm: 104,
    ch: [
      { ins: 'pulse12', vol: 0.45, rev: 0.3, echo: 0.2, pan: 0.15, mml: `r1 L v12 ${LAB_MEL} @marimba ${LAB_MEL_B} @pulse12` },
      { ins: 'marimba', vol: 0.4, rev: 0.3, pan: -0.25, mml: `${arp(prog('Bbmaj7'), [1, 3, 2, 11], 0.5, 62)} L ${arp([...LAB_A, ...LAB_B], [1, 3, 2, 11], 0.5, 62)}` },
      { ins: 'synbass', vol: 0.45, mml: `${bass(prog('Bbmaj7'), 'x-x-5-x-', 34)} L ${bass([...LAB_A, ...LAB_B], 'x-x-5-x-', 34)}` },
      { ins: 'drums', vol: 0.3, mml: `[c8 e8 d+8 e8]2 L [c8 e8 d+8 e8 c8 c8 d+8 e8]16` },
    ],
  },

  luxe: {
    bpm: 122,
    ch: [
      { ins: 'brass', vol: 0.45, rev: 0.3, pan: 0.1, mml: `r1 r1 L v12 ${LUXE_MEL}` },
      { ins: 'strings', vol: 0.35, rev: 0.35, pan: -0.2, mml: `r1 r1 L ${comp([...LUXE_A, ...LUXE_B], 'x.-x-x--', 67)}` },
      { ins: 'synbass', vol: 0.5, mml: `${bass(prog('Am7 Am7'), 'octave', 33)} L ${bass([...LUXE_A, ...LUXE_B], 'octave', 33)}` },
      { ins: 'epiano', vol: 0.3, rev: 0.3, pan: 0.25, mml: `r1 r1 L ${comp([...LUXE_A, ...LUXE_B], '-x-x-x-x', 60, { voices: 4 })}` },
      { ins: 'drums', vol: 0.45, mml: `[(c e)8 f8 (c d c+)8 f8 (c e)8 f8 (c d c+)8 f8]2 L [(c e)8 f8 (c d c+)8 f8 (c e)8 f8 (c d c+)8 f8]16` },
    ],
  },

  silk: {
    bpm: 150,
    ch: [
      { ins: 'harpsi', vol: 0.5, rev: 0.3, pan: 0.15, mml: `r2. L v12 ${SILK_MEL}` },
      { ins: 'harpsi', vol: 0.35, rev: 0.3, pan: -0.2, mml: `v9 r2. L ${oompah([...SILK_A, ...SILK_B], 3, 38, 57)}` },
      { ins: 'pizz', vol: 0.45, rev: 0.2, mml: `r2. L ${bass([...SILK_A, ...SILK_B], 'waltz', 38)}` },
    ],
  },

  shop: {
    bpm: 88,
    swing: 0.25,
    ch: [
      { ins: 'flute', vol: 0.4, rev: 0.4, pan: 0.15, mml: `r1 L v11 ${SHOP_MEL}` },
      { ins: 'epiano', vol: 0.45, rev: 0.35, pan: -0.15, mml: `${comp(prog('Fmaj7'), 'x..x....', 62, { voices: 4 })} L ${comp(SHOP_P, 'x..x....', 62, { voices: 4 })}` },
      { ins: 'bass', vol: 0.45, mml: `${bass(prog('Fmaj7'), 'x..5..x.', 41)} L ${bass(SHOP_P, 'x..5..x.', 41)}` },
      { ins: 'drums', vol: 0.25, mml: `[a+8 a+8 (a+ d+)8 a+8]2 L [(c a+)8 a+8 (a+ d+)8 a+8 a+8 (c a+)8 (a+ d+)8 a+8]8` },
    ],
  },

  hangout: {
    bpm: 124,
    ch: [
      { ins: 'pulse25', vol: 0.45, rev: 0.25, pan: 0.1, mml: `r1 L v12 ${HANG_MEL}` },
      { ins: 'epiano', vol: 0.35, rev: 0.3, pan: -0.2, mml: `r1 L ${comp([...HANG_A, ...HANG_B], 'x.-x.-x-', 62)}` },
      { ins: 'bass', vol: 0.5, mml: `${bass(prog('G'), 'x.x.5.o.', 43)} L ${bass([...HANG_A, ...HANG_B], 'x.x.5.o.', 43)}` },
      { ins: 'drums', vol: 0.4, mml: `[c8 e8 d8 e8]2 L [(c e)8 e8 (d e)8 e8 (c e)8 (c e)8 (d e)8 e8]16` },
    ],
  },

  creator: {
    bpm: 84,
    ch: [
      { ins: 'glock', vol: 0.45, rev: 0.6, echo: 0.3, pan: 0.15, mml: `r1 r1 L k2 ${MOTIF_A} ${MOTIF_A2} k0` },
      { ins: 'pad', vol: 0.55, rev: 0.6, mml: `${pad(prog('E E'), 64)} L ${pad(CREATE_P, 64)}` },
      { ins: 'harp', vol: 0.3, rev: 0.6, pan: -0.3, mml: `${arp(prog('E E'), [1, 2, 3, 12], 0.5, 64)} L ${arp(CREATE_P, [1, 2, 3, 12], 0.5, 64)}` },
      { ins: 'sine', vol: 0.3, mml: `${bass(prog('E E'), 'whole', 40)} L ${bass(CREATE_P, 'whole', 40)}` },
    ],
  },
};
