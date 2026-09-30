// Area themes.
import { prog, pad, arp, bass, comp, rep } from './lib.js';
import { MOTIF_A, MOTIF_A2, MOTIF_B, SONG } from './theme.js';

// The second leitmotif ("Fallen"), A minor. It belongs to the first child
// who fell, and to the prince. It returns in the Wishing Room, the King's
// battle and the final fights.
export const FALLEN_A = `o4 a8 >e8 d4 c4 <b8 >c8 d4. c8 <a2 a8 >f8 e4 d4 c8 d8 e2. r4
  <a8 >e8 d4 c4 <b8 >c8 d4. e8 f4 g4 a4 g8 f8 e4 d4 c4 <b4 a2`;
export const FALLEN_B = `o5 a4 g8 f8 e4 c4 d4. e8 d2 g4 f8 e8 d4 <b4 >c2. r4
  f4 e8 d8 c4 <a4 b4. >c8 d2 <a2 g+2 b2 r2`;
export const FALLEN_PA = prog('Am F Dm E Am F Dm:2 E7:2 Am');
export const FALLEN_PB = prog('Fmaj7 G Em Am Dm7 G Esus4:2 E:2 E7');

const HOLLOW_INTRO = prog('Am Am');

// ---------------------------------------------------------------------------
const FROST_A = prog('F Dm Bb C F Dm Gm7:2 C7:2 F');
const FROST_B = prog('Bb C Am Dm Gm C F:2 D7:2 Gm:2 C7:2');
const FROST_MEL_A = `o5 c8 f8 a8 >c8 <a4 f4 g8 f8 e8 f8 d4 r4 d8 f8 b-8 >d8 c4 <b-4 a8 g8 f8 g8 e4 r4
  c8 f8 a8 >c8 <a4 f4 a8 b-8 a8 g8 f4 d4 f8 g8 a8 b-8 >c4 <b-4 a2 r2`;
const FROST_MEL_B = `o5 d4. c8 <b-4 >d4 e4. d8 c4 e4 c4. d8 e4 c4 f2 d4 r4
  d4 c8 <b-8 a4 g4 >e4 d8 c8 <b-4 >c4 f4 e4 f+4 d4 g4 f4 e4 c4`;

// ---------------------------------------------------------------------------
const ECHO_A = prog('C#m7 Amaj7 E B C#m7 Amaj7 F#m7 Bsus4:2 B:2');
const ECHO_B = prog('Amaj7 B G#m7 C#m7 F#m7 B Emaj7 G#7');
const ECHO_MEL = `o5 g+2 e4 f+4 e2. c+4 e4 g+4 b4 g+4 f+1 g+2 e4 f+4 e2 c+4 e4 a2 g+4 f+4 e2 d+2
  o5 c+4 e4 g+4 a4 b2 a4 f+4 g+2. d+4 e2 r2 c+4 e4 a4 >c+4 <b2 a4 f+4 g+2 e4 d+4 c4 d+4 g+2`;

// ---------------------------------------------------------------------------
const EMBER = prog('Fm7 Fm7 Dbmaj7 C7 Fm7 Fm7 Bbm7:2 C7:2 Fm7');
const EMBER_B = prog('Dbmaj7 Eb Cm7 Fm7 Bbm7 Eb7 Abmaj7:2 Db:2 C7');
const EMBER_MEL = `o5 r4 c8 e-8 f8 a-8 f4 e-8 c8 e-8 f8 r2 r4 f8 a-8 >c8 <b-8 a-4 g8 e8 c8 <b-8 >c4 r4
  r4 c8 e-8 f8 a-8 b-8 >c8 <a-4 f4 e-8 f8 r4 d-8 c8 <b-8 a-8 g8 a-8 b-8 >c8 f2 r2`;
const EMBER_MEL_B = `o5 f4. e-8 f8 a-8 r4 g4. f8 e-8 g8 r4 e-4 c4 <b-8 >c8 e-4 f2. r4
  f8 a-8 >c8 <b-8 a-8 f8 e-8 d-8 e-4 g4 b-4 g4 a-8 g8 f8 e-8 f8 e-8 d-8 c8 e2 r2`;

// ---------------------------------------------------------------------------
const CORE = prog('Em C D Bm Em C Am B7');
const CORE_MEL = `o5 e4. f+8 g4 b4 a4. g8 e2 f+4. g8 a4 >d4 c+4 <b4 f+2
  e4. f+8 g4 b4 >c4. <b8 g2 a4 >c4 e4 d4 d+2 <b2`;

// ---------------------------------------------------------------------------
const CAPITAL_A = prog('Gm Cm Eb D Gm Cm:2 Am7b5:2 D7 Gm');
const CAPITAL_B = prog('Eb Cm Am7b5 D Gm Cm:2 Am7b5:2 D7 Gm');
const CAPITAL_MEL = `o4 d8 g8 a8 b-8 >d4. <b-8 >c4 <b-8 a8 g2 e-8 g8 b-8 a8 g4 f+8 g8 a2. r4
  d8 g8 a8 b-8 >d4. e-8 e-4 d8 c8 <b-4 a4 >c4 <b-8 a8 a4. g8 g1
  o4 g8 a8 b-4 b-8 a8 g8 f+8 e-4 g4 >c2 c8 <b-8 a8 g8 a4 >c4 d2 d8 c8 <b-8 a8
  d8 g8 a8 b-8 >d4. e-8 e-4 d8 c8 <b-4 a4 >c4 <b-8 a8 a4. g8 g1`;

export const AREA_TRACKS = {
  hollows: {
    bpm: 88,
    ch: [
      { ins: 'piano', vol: 0.55, rev: 0.55, pan: 0.1, mml: `v11 r1 r1 L ${FALLEN_A} ${FALLEN_B}` },
      { ins: 'ocarina', vol: 0.3, rev: 0.6, pan: 0.2, mml: `v10 r1 r1 L ${rep('r1', 8)} ${FALLEN_B.replace('o5', 'o5')}` },
      { ins: 'harp', vol: 0.36, rev: 0.5, pan: -0.25, mml: `${arp(HOLLOW_INTRO, [0, 2, 3, 11, 12, 11, 3, 2], 0.5, 57)} L ${arp([...FALLEN_PA, ...FALLEN_PB], [0, 2, 3, 11, 12, 11, 3, 2], 0.5, 57)}` },
      { ins: 'slowstr', vol: 0.4, rev: 0.6, mml: `r1 r1 L ${pad([...FALLEN_PA, ...FALLEN_PB], 60)}` },
      { ins: 'tri', vol: 0.4, mml: `${bass(HOLLOW_INTRO, 'x...5...', 33)} L ${bass([...FALLEN_PA, ...FALLEN_PB], 'x...5...', 33)}` },
    ],
  },

  frostmere: {
    bpm: 118,
    ch: [
      { ins: 'glock', vol: 0.5, rev: 0.35, pan: 0.15, mml: `v12 r1 r1 L ${FROST_MEL_A} ${FROST_MEL_B}` },
      { ins: 'flute', vol: 0.3, rev: 0.4, pan: -0.1, mml: `v9 r1 r1 L ${rep('r1', 8)} ${FROST_MEL_B.replace('o5', 'o4')}` },
      { ins: 'pizz', vol: 0.5, rev: 0.3, pan: -0.2, mml: `${bass(prog('F F'), 'root5', 41)} L ${bass([...FROST_A, ...FROST_B], 'root5', 41)}` },
      { ins: 'strings', vol: 0.28, rev: 0.45, mml: `r1 r1 L ${pad([...FROST_A, ...FROST_B], 62)}` },
      { ins: 'harp', vol: 0.25, rev: 0.4, pan: 0.3, mml: `r1 r1 L ${arp([...FROST_A, ...FROST_B], [11, 12, 13, 12], 0.5, 65)}` },
      { ins: 'drums', vol: 0.3, mml: `[a+8 a+8 (a+ e)8 a+8]4 L [(c a+)8 a+8 (a+ d+)8 a+8 (c a+)8 a+8 (a+ d+)8 a+16 a+16]16` },
    ],
  },

  // Snowcap: the main leitmotif as a cosy town tune.
  snowcap: {
    bpm: 104,
    ch: [
      { ins: 'glock', vol: 0.45, rev: 0.35, pan: 0.15, mml: `v12 r1 r1 L ${MOTIF_A} ${MOTIF_A2} ${MOTIF_B} ${MOTIF_A2}` },
      { ins: 'flute', vol: 0.28, rev: 0.4, pan: -0.15, mml: `v10 r1 r1 L ${rep('r1', 8)} ${MOTIF_B.replace('o5', 'o4')} ${rep('r1', 4)}` },
      { ins: 'accordion', vol: 0.3, rev: 0.3, pan: -0.2, mml: `r1 r1 L ${comp(SONG, '-x-x-x-x', 62)}` },
      { ins: 'pizz', vol: 0.5, rev: 0.25, mml: `${bass(prog('D D'), 'root5', 38)} L ${bass(SONG, 'root5', 38)}` },
      { ins: 'drums', vol: 0.28, mml: `r1 r1 L [(c a+)8 a+8 (d+ a+)8 a+8 (c a+)8 (c a+)8 (d+ a+)8 a+8]16` },
    ],
  },

  echofall: {
    bpm: 80,
    ch: [
      { ins: 'piano', vol: 0.5, rev: 0.7, pan: 0.1, mml: `v10 r1 r1 L ${ECHO_MEL}` },
      { ins: 'kalimba', vol: 0.4, rev: 0.6, pan: -0.25, echo: 0.3, mml: `${arp(prog('C#m7 C#m7'), [11, 12, 13, 12], 0.5, 64)} L ${arp([...ECHO_A, ...ECHO_B], [11, 12, 13, 12], 0.5, 64)}` },
      { ins: 'pad', vol: 0.5, rev: 0.7, mml: `r1 r1 L ${pad([...ECHO_A, ...ECHO_B], 57)}` },
      { ins: 'sine', vol: 0.35, mml: `${bass(prog('C#m7 C#m7'), 'whole', 37)} L ${bass([...ECHO_A, ...ECHO_B], 'whole', 37)}` },
      { ins: 'drums', vol: 0.15, mml: `r1 r1 L [r2 a+4 r4 r4 a+8 a+8 r4 d+4]8` },
    ],
  },

  // Wishing Room: the Fallen motif, bare piano and strings.
  wishing: {
    bpm: 64,
    ch: [
      { ins: 'piano', vol: 0.55, rev: 0.7, pan: 0.1, mml: `v10 r1 L ${FALLEN_A} ${FALLEN_B}` },
      { ins: 'piano', vol: 0.3, rev: 0.7, pan: -0.15, mml: `v7 ${arp(prog('Am'), [0, 2, 3, 11, 3, 2, 3, 2], 0.5, 52)} L ${arp([...FALLEN_PA, ...FALLEN_PB], [0, 2, 3, 11, 3, 2, 3, 2], 0.5, 52)}` },
      { ins: 'slowstr', vol: 0.35, rev: 0.7, mml: `r1 L ${pad([...FALLEN_PA, ...FALLEN_PB], 62)}` },
      { ins: 'choir', vol: 0.4, rev: 0.7, mml: `r1 L ${rep('r1', 8)} ${pad(FALLEN_PB, 67)}` },
    ],
  },

  emberdeep: {
    bpm: 112,
    ch: [
      { ins: 'lead', vol: 0.45, rev: 0.3, echo: 0.2, pan: 0.1, mml: `v11 r1 r1 L ${EMBER_MEL} ${EMBER_MEL_B}` },
      { ins: 'epiano', vol: 0.4, rev: 0.3, pan: -0.2, mml: `r1 r1 L ${comp([...EMBER, ...EMBER_B], '-x.-x.-x', 63)}` },
      { ins: 'synbass', vol: 0.55, mml: `${bass(prog('Fm7 Fm7'), 'x..xo..x..x.5.o.', 29, { step: 0.25 })} L ${bass([...EMBER, ...EMBER_B], 'x..xo..x..x.5.o.', 29, { step: 0.25 })}` },
      { ins: 'drums', vol: 0.45, mml: `[(c e)8 e8 (d e)8 e8 e8 (c e)8 (d e)8 c+8]2 L [(c e)8 e8 (d e)8 e8 e8 (c e)8 (d e)8 (e c+)8 (c e)8 e8 (d e)8 e8 e8 (c e)8 (d e)8 f8]8` },
      { ins: 'brass', vol: 0.25, rev: 0.3, mml: `r1 r1 L ${rep('r1', 8)} ${pad(EMBER_B, 65, { split: 2 })}` },
    ],
  },

  core: {
    bpm: 140,
    ch: [
      { ins: 'lead', vol: 0.45, rev: 0.3, echo: 0.25, pan: 0.1, mml: `v11 r1 r1 L ${CORE_MEL} ${CORE_MEL}` },
      { ins: 'pulse12', vol: 0.35, rev: 0.25, pan: -0.25, mml: `${arp(prog('Em Em'), [1, 2, 3, 12, 11, 12, 3, 2], 0.25, 64)} L ${arp([...CORE, ...CORE], [1, 2, 3, 12, 11, 12, 3, 2], 0.25, 64)}` },
      { ins: 'synbass', vol: 0.5, mml: `${bass(prog('Em Em'), 'octave', 28)} L ${bass([...CORE, ...CORE], 'octave', 28)}` },
      { ins: 'pad', vol: 0.4, rev: 0.4, mml: `r1 r1 L ${pad([...CORE, ...CORE], 60)}` },
      { ins: 'drums', vol: 0.45, mml: `[(c e)8 e8 (d e)8 e8]4 L [(c e)8 e8 (d e)8 (c e)8 (c e)8 e8 (d e)8 f8]15 [(c b)8 e8 d8 d8 d16 d16 d16 d16 d8 d8]1` },
    ],
  },

  new_hallow: {
    bpm: 84,
    ch: [
      { ins: 'piano', vol: 0.5, rev: 0.55, pan: 0.1, mml: `v11 r1 L ${CAPITAL_MEL}` },
      { ins: 'strings', vol: 0.3, rev: 0.55, pan: -0.15, mml: `r1 L ${pad([...CAPITAL_A, ...CAPITAL_B], 60)}` },
      { ins: 'bell', vol: 0.25, rev: 0.7, mml: `o3 g1 L ${bass([...CAPITAL_A, ...CAPITAL_B], 'x.......', 55)}` },
      { ins: 'tri', vol: 0.4, mml: `r1 L ${bass([...CAPITAL_A, ...CAPITAL_B], 'half', 31)}` },
      { ins: 'drums', vol: 0.2, mml: `r1 L [c4 r4 c8 c8 r4]16` },
    ],
  },

  // Hall of Embers: the motif on bells, a choir underneath.
  hall: {
    bpm: 60,
    ch: [
      { ins: 'bell', vol: 0.35, rev: 0.8, mml: `r1 L ${MOTIF_A} ${MOTIF_A2} ${rep('r1', 8)}` },
      { ins: 'choir', vol: 0.5, rev: 0.8, mml: `r1 L ${pad(SONG, 62)}` },
      { ins: 'slowstr', vol: 0.25, rev: 0.8, mml: `r1 L ${bass(SONG, 'whole', 38)}` },
    ],
  },
};
