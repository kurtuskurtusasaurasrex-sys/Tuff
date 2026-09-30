// Battle and boss music.
import { prog, pad, arp, bass, comp, rep } from './lib.js';
import { MOTIF_A, MOTIF_A2, MOTIF_B, SONG } from './theme.js';
import { FALLEN_A, FALLEN_B } from './areas.js';
import { SPRIG_EVIL_MEL } from './characters.js';

// Rock drum bars (4 beats each)
const ROCK = '(c e)8 e8 (d e)8 e8 (c e)8 (c e)8 (d e)8 e8';
const ROCK_FILL = '(c e)8 e8 (d e)8 e8 d16 d16 d16 d16 a16 a16 g16 g16';
const DRIVE = '(c e)8 (c e)8 (d e)8 e8 (c e)8 (c e)8 (d e)8 (c e)8';

// ---------------------------------------------------------------------------
const BAT_A = prog('Em Em C D Em Em Am B7');
const BAT_B = prog('C D Bm Em C D B7sus4:2 B7:2 B7');
const BAT_MEL = `o4 r8 e8 g8 b8 >e4 d8 <b8 a8 g8 f+8 g8 e4 r4 r8 e8 g8 >c8 e4 d8 c8 <b8 a8 f+8 a8 d4 r4
  r8 e8 g8 b8 >e4 f+8 g8 f+8 e8 d8 <b8 >e4. r8 c8 <b8 a8 >c8 e8 d8 c8 <a8 b8 >d+8 f+8 a8 f+8 d+8 <b8 a8
  o5 e4. d8 c4 <g4 a4. b8 >c4 d4 f+4. e8 d4 <b4 >e2. r4 e4. d8 c4 <g4 a4. b8 >c4 d4 e4 d+4 f+4 d+4 <b2 r2`;

// ---------------------------------------------------------------------------
const BLUES = prog('Bb7 Eb7 Bb7 Bb7 Eb7 Eb7 Bb7 Bb7 F7 Eb7 Bb7 F7');
const R_BB = 'o4 b-8 >d-8 d8 f8 a-8 f8 d8 <b-8';
const R_EB = 'o4 e-8 g-8 g8 b-8 >d-8 <b-8 g8 e-8';
const R_F = 'o4 f8 a-8 a8 >c8 e-8 c8 <a8 f8';
const R_TURN = 'o4 f8 a8 >c8 e-8 f4 r4';
const BLUES_MEL = [R_BB, R_EB, R_BB, R_BB, R_EB, R_EB, R_BB, R_BB, R_F, R_EB, R_BB, R_TURN].join(' ');

// ---------------------------------------------------------------------------
const QUEEN_A = prog('Dm Bb Gm A Dm Bb Gm:2 A:2 Dm');
const QUEEN_B = prog('Bb C Am Dm Gm A Bb:2 C:2 A7');
export const MINOR_MOTIF = `o4 a8 >d8 e8 f8 a4. f8 g4 f8 e8 d2 <b-8 >d8 f8 e8 d4 c+8 d8 e2. r4
  <a8 >d8 e8 f8 a4. b-8 b-4 a8 g8 f4 e4 g4 f8 e8 e4. d8 d1`;
const QUEEN_MEL_B = `o5 f4. e8 d4 f4 e4. d8 c2 c4. d8 e4 c4 f2. r4 g4. f8 e4 d4 c+4. d8 e4 a4 g4 f4 e4 c4 c+2 e2`;

// ---------------------------------------------------------------------------
const TB_A = prog('Am F C G Am F E7 E7');
const TB_B = prog('F G C Am F G E7:2 Am:2 E7');
const TB_MEL = `o5 e8 e8 a8 e8 >c8 <a8 e8 a8 f8 f8 a8 f8 >c8 <a8 f8 a8 g8 g8 >c8 <g8 >e8 c8 <g8 >c8 d4 <b4 g4 d4
  e8 e8 a8 e8 >c8 <a8 e8 a8 f8 f8 a8 f8 >c8 d8 e8 f8 e4 d4 c4 <b4 g+4 e4 b4 g+4
  o5 a2 >c2 <b2 >d2 e2. d8 c8 <a1 a4 >c4 f4 e4 d4 <b4 g4 >d4 e4 d4 c4 <b4 g+2 b2`;

// ---------------------------------------------------------------------------
const MARIS_P = prog('Em Em C C Am Am B7 B7');
const MARIS_CALL = 'o4 e2. b4 o5 e1 o4 c2. g4 o5 c1 o4 a2. o5 e4 a1 o5 d+2 f+2 b1';

const MB_A = prog('Em D C B7 Em D C B7');
const MB_B = prog('Am Em C D Am Em F B7');
const MB_MEL = `o5 e8 f+8 g8 a8 b4 a8 g8 f+8 e8 d8 e8 f+4 d4 e8 d8 c8 d8 e4 g4 f+4 d+4 <b4 >d+4
  e8 f+8 g8 a8 b4 >e4 d4 <a4 f+4 a4 g4 e4 c4 e4 d+4 f+4 b2
  o5 a2 >c4. <b8 g2 e4 b4 >c2 <b4 g4 a2 f+4 d4 e4 a4 >c4 e4 d4 <b4 g4 b4 a4 >c4 f4 e4 d+2 <b2`;

// ---------------------------------------------------------------------------
const LB_A = prog('Em C G D Em C G B');
const LB_B = prog('C D Em G C D B7sus4:2 B7:2 B7');
const LB_MEL = `o5 b4. a8 g4 e4 g4. a8 e2 d4. e8 g4 b4 a2 f+2 b4. >c8 d4 e4 e4. d8 c4 <g4 b4 a4 g4 d4 d+2 f+2
  o5 e4 g4 >c4. <b8 a4 f+4 d4 f+4 g4. f+8 e4 b4 d2 g2 >c4. <b8 a4 g4 f+4 a4 >d4 c+4 <e4 f+4 d+4 f+4 b1`;

// ---------------------------------------------------------------------------
const KING_P = prog('Dm Bb Gm A Dm Bb Gm:2 A:2 Dm');
const KING_P2 = prog('Dm Bb Gm A Dm Bb Gm:2 A7:2 Dm');

// ---------------------------------------------------------------------------
const SF_A = prog('Cm5 Cm5 Ab5 G5 Cm5 Cm5 F5 C5'.replace(/Cm5/g, 'C5'));
const SF_B = prog('Ab Bb Cm Cm Ab Bb G G');
const SF_MEL_B = 'o5 c4 e-4 a-4 g4 f4 d4 b-4 a-4 g2 >c2 <b2 g2 a-4 >c4 e-4 d4 c4 <b-4 >d4 c4 <b1 g1';

// ---------------------------------------------------------------------------
const LF_A = prog('Dm Dm C C Bb Bb A A');
const LF_B = prog('Gm A Dm Dm Gm A Bb A7');
const LF_RIFF = `o5 d8 d8 >d8 <a8 r8 g+8 a8 f8 d8 f8 a8 >c8 <a8 g+8 a8 >d8 <c8 c8 >c8 <g8 r8 f+8 g8 e8 c8 e8 g8 b-8 g8 f+8 g8 >c8
  <<b-8 b-8 >b-8 f8 r8 e8 f8 d8 <b-8 >d8 f8 a-8 f8 e8 f8 b-8 a4 c+4 e4 g4 f4 e4 d4 c+4`;
const LF_MEL_B = 'o5 g4. a8 b-4 a4 g4 f4 e4 c+4 d2 f2 a2. r4 b-4. a8 g4 f4 e4 f4 g4 a4 b-2 >d2 c+1';

export const BATTLE_TRACKS = {
  battle: {
    bpm: 152,
    ch: [
      { ins: 'square', vol: 0.45, rev: 0.2, pan: 0.1, mml: `r1 r1 L v12 ${BAT_MEL}` },
      { ins: 'pulse25', vol: 0.28, rev: 0.2, pan: -0.25, mml: `r1 r1 L ${comp([...BAT_A, ...BAT_B], '-x-x-x-x', 64)}` },
      { ins: 'pulse12', vol: 0.2, rev: 0.25, pan: 0.3, mml: `r1 r1 L ${rep('r1', 8)} ${arp(BAT_B, [1, 2, 3, 2], 0.25, 72)}` },
      { ins: 'bass', vol: 0.55, mml: `${bass(prog('Em Em'), 'x.xox.xo', 40)} L ${bass([...BAT_A, ...BAT_B], 'x.xox.xo', 40)}` },
      { ins: 'drums', vol: 0.45, mml: `${ROCK} ${ROCK_FILL} L [${ROCK} ${ROCK} ${ROCK} ${ROCK_FILL}]4` },
    ],
  },

  // Royal guard pups: a daft 12-bar shuffle.
  dogguard: {
    bpm: 144,
    swing: 0.33,
    ch: [
      { ins: 'square', vol: 0.4, rev: 0.2, pan: 0.1, mml: `r1 L v12 ${BLUES_MEL}` },
      { ins: 'organ', vol: 0.3, rev: 0.25, pan: -0.2, mml: `r1 L ${comp(BLUES, '-x-x-x-x', 62, { voices: 4 })}` },
      { ins: 'bass', vol: 0.5, mml: `${bass(prog('Bb7'), 'walk', 34)} L ${bass(BLUES, 'walk', 34)}` },
      { ins: 'drums', vol: 0.4, mml: `(c f+)4 (d f+)4 (c f+)4 (d f+)8 d8 L [(c f+)4 (d f+)8 f+8 (c f+)4 (d f+)8 f+8]12` },
    ],
  },

  queen_battle: {
    bpm: 140,
    ch: [
      { ins: 'strings', vol: 0.5, rev: 0.35, pan: 0.1, mml: `r1 r1 L v12 ${MINOR_MOTIF} ${QUEEN_MEL_B}` },
      { ins: 'piano', vol: 0.4, rev: 0.3, pan: -0.2, mml: `v9 r1 r1 L ${arp([...QUEEN_A, ...QUEEN_B], [0, 1, 2, 3, 11, 3, 2, 1], 0.5, 57)}` },
      { ins: 'choir', vol: 0.35, rev: 0.5, mml: `r1 r1 L ${rep('r1', 8)} ${pad(QUEEN_B, 62)}` },
      { ins: 'bass', vol: 0.5, mml: `${bass(prog('Dm Dm'), 'pump', 38)} L ${bass([...QUEEN_A, ...QUEEN_B], 'pump', 38)}` },
      { ins: 'timpani', vol: 0.45, rev: 0.3, mml: `o2 d8 d8 d8 d8 d8 d8 d8 d8 d16 d16 d16 d16 d16 d16 d16 d16 a4 d4 L ${bass([...QUEEN_A, ...QUEEN_B], 'x...x...', 38)}` },
      { ins: 'drums', vol: 0.35, mml: `r1 r1 L [c8 d16 d16 c8 d8 c8 c8 d8 d16 d16]16` },
    ],
  },

  taper_battle: {
    bpm: 168,
    ch: [
      { ins: 'square', vol: 0.45, rev: 0.2, pan: 0.1, mml: `r1 L v12 ${TB_MEL}` },
      { ins: 'brass', vol: 0.35, rev: 0.3, pan: -0.15, mml: `r1 L ${rep('r1', 8)} ${pad(TB_B, 62, { split: 1 })}` },
      { ins: 'pulse25', vol: 0.25, rev: 0.2, pan: -0.25, mml: `r1 L ${comp(TB_A, 'x-x-x-x-', 60)} ${rep('r1', 8)}` },
      { ins: 'bass', vol: 0.55, mml: `${bass(prog('Am'), 'pump', 33)} L ${bass([...TB_A, ...TB_B], 'pump', 33)}` },
      { ins: 'drums', vol: 0.45, mml: `d16 d16 d16 d16 d16 d16 d16 d16 a16 a16 g16 g16 (c b)4 L [${DRIVE} ${DRIVE} ${DRIVE} ${ROCK_FILL}]4` },
    ],
  },

  // Captain Maris closing in: ostinato strings, brass calls, war drums.
  maris: {
    bpm: 150,
    ch: [
      { ins: 'brass', vol: 0.45, rev: 0.4, pan: 0.1, mml: `r1 L ${MARIS_CALL} ${MARIS_CALL}` },
      { ins: 'strings', vol: 0.45, rev: 0.35, pan: -0.2, mml: `${arp(prog('Em'), [1, 1, 2, 1, 3, 1, 2, 1], 0.25, 59)} L ${arp([...MARIS_P, ...MARIS_P], [1, 1, 2, 1, 3, 1, 2, 1], 0.25, 59)}` },
      { ins: 'choir', vol: 0.3, rev: 0.5, mml: `r1 L ${rep('r1', 8)} ${pad(MARIS_P, 60)}` },
      { ins: 'timpani', vol: 0.45, rev: 0.3, mml: `o2 e4 e4 e4 e8 e8 L ${bass([...MARIS_P, ...MARIS_P], 'x.x.x...', 40)}` },
      { ins: 'drums', vol: 0.35, mml: `g8 g8 a8 a8 g16 g16 g16 g16 a8 a8 L [(c g)8 g8 (d a)8 g8 (c g)8 (c g)8 (d a)8 a8]16` },
    ],
  },

  maris_battle: {
    bpm: 172,
    ch: [
      { ins: 'lead', vol: 0.5, rev: 0.25, echo: 0.15, pan: 0.1, mml: `r1 r1 L v12 ${MB_MEL}` },
      { ins: 'dguitar', vol: 0.5, dist: 7, pan: -0.25, mml: `r1 r1 L ${comp([...MB_A, ...MB_B].map((x) => ({ ...x, chord: x.chord && { ...x.chord, iv: [0, 7] } })), 'x.x.x.xx', 52, { voices: 2 })}` },
      { ins: 'brass', vol: 0.3, rev: 0.3, pan: 0.2, mml: `r1 r1 L ${rep('r1', 8)} ${pad(MB_B, 64, { split: 2 })}` },
      { ins: 'bass', vol: 0.55, mml: `${bass(prog('Em Em'), 'octave', 40)} L ${bass([...MB_A, ...MB_B], 'octave', 40)}` },
      { ins: 'drums', vol: 0.5, mml: `${DRIVE} ${ROCK_FILL} L [${DRIVE} ${DRIVE} ${DRIVE} ${ROCK_FILL}]4` },
    ],
  },

  luxe_battle: {
    bpm: 132,
    ch: [
      { ins: 'lead', vol: 0.45, rev: 0.3, echo: 0.25, pan: 0.1, mml: `r1 r1 L v12 ${LB_MEL}` },
      { ins: 'pulse12', vol: 0.3, rev: 0.25, pan: -0.25, echo: 0.2, mml: `${arp(prog('Em Em'), [1, 2, 3, 12], 0.25, 64)} L ${arp([...LB_A, ...LB_B], [1, 2, 3, 12], 0.25, 64)}` },
      { ins: 'pad', vol: 0.4, rev: 0.4, mml: `r1 r1 L ${pad([...LB_A, ...LB_B], 60)}` },
      { ins: 'synbass', vol: 0.5, mml: `${bass(prog('Em Em'), 'octave', 28)} L ${bass([...LB_A, ...LB_B], 'octave', 28)}` },
      { ins: 'drums', vol: 0.45, mml: `[(c e)8 f8 (c d c+)8 f8 (c e)8 f8 (c d c+)8 f8]2 L [(c e)8 f8 (c d c+)8 f8 (c e)8 f8 (c d c+)8 f8]16` },
    ],
  },

  // King Oakheart: his motif is the main theme turned minor; halfway, the
  // choir sings the Fallen motif under it.
  king: {
    bpm: 116,
    ch: [
      { ins: 'brass', vol: 0.5, rev: 0.45, pan: 0.1, mml: `r1 r1 L v12 ${MINOR_MOTIF} ${rep('r1', 8)}` },
      { ins: 'choir', vol: 0.45, rev: 0.6, mml: `r1 r1 L ${pad(KING_P, 60)} k-7 ${FALLEN_A} k0` },
      { ins: 'strings', vol: 0.4, rev: 0.4, pan: -0.2, mml: `${arp(prog('Dm Dm'), [1, 2, 3, 2], 0.5, 57)} L ${arp([...KING_P, ...KING_P2], [1, 2, 3, 2], 0.5, 57)}` },
      { ins: 'bass', vol: 0.45, mml: `${bass(prog('Dm Dm'), 'x.x.x.x.', 38)} L ${bass([...KING_P, ...KING_P2], 'x.x.x.x.', 38)}` },
      { ins: 'timpani', vol: 0.5, rev: 0.35, mml: `o2 d4 r4 d8 d8 d4 d16 d16 d16 d16 d16 d16 d16 d16 a4 r4 L ${bass([...KING_P, ...KING_P2], 'x...x.x.', 38)}` },
      { ins: 'bell', vol: 0.25, rev: 0.7, mml: `r1 r1 L ${bass([...KING_P, ...KING_P2], 'x.......', 62)}` },
      { ins: 'drums', vol: 0.3, mml: `r1 r1 L [c4 d8 d16 d16 c4 d4]16` },
    ],
  },

  // Neutral final: Sprig with stolen souls. Industrial nursery rhyme.
  sprig_final: {
    bpm: 160,
    ch: [
      { ins: 'lead', vol: 0.45, rev: 0.25, echo: 0.2, dist: 3, pan: 0.1, mml: `r1 r1 L v12 ${SPRIG_EVIL_MEL.replace(/^o4/, 'o5')} ${SF_MEL_B}` },
      { ins: 'dguitar', vol: 0.5, dist: 8, pan: -0.25, mml: `r1 r1 L ${comp([...SF_A, ...SF_B].map((x) => ({ ...x, chord: x.chord && { ...x.chord, iv: [0, 7] } })), 'xxx.xxx.', 48, { voices: 2 })}` },
      { ins: 'orchhit', vol: 0.4, rev: 0.4, mml: `r1 r1 L [o4 c4 r4 r2 r1 r1 r1]4` },
      { ins: 'synbass', vol: 0.55, mml: `${bass(prog('C C'), 'pump', 36)} L ${bass([...SF_A, ...SF_B], 'pump', 36)}` },
      { ins: 'drums', vol: 0.5, mml: `[c8 c8 d8 c8 c8 c8 d8 d8]2 L [${DRIVE} ${DRIVE} ${DRIVE} ${ROCK_FILL}]4` },
    ],
  },

  // True final: everything the story has carried, at full strength.
  rowan: {
    bpm: 148,
    ch: [
      { ins: 'lead', vol: 0.45, rev: 0.35, echo: 0.2, pan: 0.1, mml: `r1 r1 L v12 ${MOTIF_A} ${MOTIF_A2} ${MOTIF_B} ${MOTIF_A2}` },
      { ins: 'choir', vol: 0.4, rev: 0.6, mml: `r1 r1 L ${pad(SONG, 64)}` },
      { ins: 'piano', vol: 0.35, rev: 0.3, pan: -0.2, mml: `v9 ${arp(prog('D D'), [0, 1, 2, 3, 11, 3, 2, 1], 0.5, 60)} L ${arp(SONG, [0, 1, 2, 3, 11, 3, 2, 1], 0.5, 60)}` },
      { ins: 'strings', vol: 0.35, rev: 0.4, pan: 0.25, mml: `r1 r1 L ${rep('r1', 8)} ${MOTIF_B.replace('o5', 'o4')} ${MOTIF_A2.replace('o5', 'o4')}` },
      { ins: 'bass', vol: 0.5, mml: `${bass(prog('D D'), 'octave', 38)} L ${bass(SONG, 'octave', 38)}` },
      { ins: 'drums', vol: 0.45, mml: `${ROCK} ${ROCK_FILL} L [${ROCK} ${ROCK} ${ROCK} ${ROCK_FILL}]4` },
    ],
  },

  // Wick, when there is no one left. Built on his own chromatic figure.
  last_flame: {
    bpm: 176,
    ch: [
      { ins: 'square', vol: 0.5, rev: 0.25, echo: 0.2, pan: 0.1, mml: `r1 r1 L v13 ${LF_RIFF} ${LF_MEL_B}` },
      { ins: 'dguitar', vol: 0.5, dist: 8, pan: -0.25, mml: `${comp(prog('D5 D5'), 'x.xxx.xx', 50, { voices: 2 })} L ${comp(prog('D5 D5 C5 C5 Bb5 Bb5 A5 A5 G5 A5 D5 D5 G5 A5 Bb5 A5'), 'x.xxx.xx', 50, { voices: 2 })}` },
      { ins: 'organ', vol: 0.25, rev: 0.4, mml: `r1 r1 L ${rep('r1', 8)} ${pad(LF_B, 62)}` },
      { ins: 'bass', vol: 0.55, mml: `${bass(prog('Dm Dm'), 'octave', 38)} L ${bass([...LF_A, ...LF_B], 'octave', 38)}` },
      { ins: 'drums', vol: 0.5, mml: `[c16 c16 d8]7 (c b)8 d8 L [${DRIVE} ${DRIVE} ${DRIVE} ${ROCK_FILL}]4` },
    ],
  },
};

export { FALLEN_B, MOTIF_A2 };
