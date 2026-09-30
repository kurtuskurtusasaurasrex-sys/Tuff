// The main leitmotif ("Seven Hearts") and pieces built directly on it.
// Motif, D major:  A D E F# A . F# | G F# E D | B D F# E D C# D | E
// Every arrangement here re-voices that same 16-bar tune.
import { prog, pad, arp, bass, oompah, rep } from './lib.js';

export const MOTIF_A = 'o5 <a8 >d8 e8 f+8 a4. f+8 g4 f+8 e8 d2 <b8 >d8 f+8 e8 d4 c+8 d8 e2. r4';
export const MOTIF_A2 = 'o5 <a8 >d8 e8 f+8 a4. b8 b4 a8 g8 f+4 e4 g4 f+8 e8 e4. d8 d1';
export const MOTIF_B = 'o5 d8 e8 f+4 f+8 e8 d8 c+8 <b4 >d4 g2 g8 f+8 e8 d8 e4 g4 a2 a8 g8 f+8 e8';
const down = (s) => s.replace(/^o5/, 'o4');

export const SONG = prog(`
  D G Bm Asus4:2 A:2
  D G:2 Em:2 A7 D
  Bm G Em A
  D G:2 Em:2 A7 D`);
const INTRO = prog('D D');

// 3/4 waltz version of the same harmony (home)
const W1 = prog('D D G G Bm A A A', 3);
const W2 = prog('D D G D Em A7 D D', 3);
const W3 = prog('Bm Bm A G G Em A7 A', 3);
const WALTZ = [...W1, ...W2, ...W3, ...W2];

export const THEME_TRACKS = {
  // Intro storybook: music box over harp, strings enter.
  tale: {
    bpm: 78,
    ch: [
      { ins: 'musicbox', vol: 0.8, rev: 0.45, pan: 0.1, mml: `r1 r1 L ${MOTIF_A} ${MOTIF_A2} ${MOTIF_B} ${MOTIF_A2}` },
      { ins: 'harp', vol: 0.45, rev: 0.4, pan: -0.25, mml: `${arp(INTRO, [0, 2, 3, 13, 11, 3, 2, 1], 0.5, 57)} L ${arp(SONG, [0, 2, 3, 13, 11, 3, 2, 1], 0.5, 57)}` },
      { ins: 'slowstr', vol: 0.5, rev: 0.5, mml: `r1 r1 L ${pad(SONG, 64)}` },
      { ins: 'piano', vol: 0.3, rev: 0.3, mml: `v9 r1 r1 L ${bass(SONG, 'whole', 38)}` },
    ],
  },

  // Title: solo piano, gentle, the motif with a left-hand broken chord.
  title: {
    bpm: 70,
    ch: [
      { ins: 'piano', vol: 0.62, rev: 0.5, pan: 0.1, mml: `v11 r1 r1 L ${MOTIF_A} ${MOTIF_A2}` },
      { ins: 'piano', vol: 0.38, rev: 0.5, pan: -0.15, mml: `v8 ${arp(INTRO, [0, 2, 3, 11, 12, 11, 3, 2], 0.5, 55)} L ${arp(SONG.slice(0, 10), [0, 2, 3, 11, 12, 11, 3, 2], 0.5, 55)}` },
      { ins: 'bellpad', vol: 0.3, rev: 0.6, mml: `r1 r1 L ${pad(SONG.slice(0, 10), 67)}` },
    ],
  },

  // Queen Willow's home: the motif slowed into a lullaby waltz (3/4).
  home: {
    bpm: 100,
    ch: [
      { ins: 'piano', vol: 0.6, rev: 0.45, pan: 0.12, mml: `v11 r2. L
        o5 <a4 >d4 e4 f+2 a4 g4 f+4 e4 d2. <b4 >d4 f+4 e4 d4 c+4 e2. r2.
        o5 <a4 >d4 e4 f+2 b4 b4 a4 g4 f+2 e4 g4 f+4 e4 e2 d4 d2. r2.
        @flute v10 o5 d4 e4 f+4 f+4 e4 d4 c+2. <b4 >d4 g4 g2. g4 f+4 e4 d4 e4 g4 a2.
        @piano v11 o5 <a4 >d4 e4 f+2 b4 b4 a4 g4 f+2 e4 g4 f+4 e4 e2 d4 d2. r2.` },
      { ins: 'piano', vol: 0.36, rev: 0.45, pan: -0.15, mml: `v8 r2. L ${oompah(WALTZ, 3, 38, 57)}` },
      { ins: 'strings', vol: 0.26, rev: 0.5, mml: `r2. L ${pad(WALTZ, 60)}` },
      { ins: 'harp', vol: 0.25, rev: 0.5, pan: -0.3, mml: `r2. L ${rep('r2.', 24)} ${arp(W2, [11, 12, 13, 12, 11, 3], 0.5, 69)}` },
    ],
  },

  // Credits / good ending: the full arrangement, warm and bright.
  ending: {
    bpm: 90,
    ch: [
      { ins: 'piano', vol: 0.5, rev: 0.4, pan: 0.15, mml: `v12 r1 r1 L ${MOTIF_A} ${MOTIF_A2} ${MOTIF_B} ${MOTIF_A2}` },
      { ins: 'flute', vol: 0.4, rev: 0.45, pan: -0.1, mml: `v11 r1 r1 L ${rep('r1', 8)} ${MOTIF_B} ${MOTIF_A2}` },
      { ins: 'strings', vol: 0.45, rev: 0.45, pan: -0.1, mml: `r1 r1 L ${rep('r1', 4)} ${down(MOTIF_A2)} ${pad(SONG.slice(10), 62)}` },
      { ins: 'harp', vol: 0.4, rev: 0.4, pan: -0.3, mml: `${arp(INTRO, [0, 2, 3, 13, 11, 3, 2, 1], 0.5, 57)} L ${arp(SONG, [0, 2, 3, 13, 11, 3, 2, 1], 0.5, 57)}` },
      { ins: 'slowstr', vol: 0.4, rev: 0.5, mml: `r1 r1 L ${pad(SONG, 64)}` },
      { ins: 'bass', vol: 0.42, mml: `r1 r1 L ${bass(SONG, 'x..5x.5.', 38)}` },
      { ins: 'drums', vol: 0.35, mml: `r1 r1 L [c4 e8 e8 d4 e8 c8 c4 e8 e8 d4 e8 e+8]8` },
    ],
  },
};
