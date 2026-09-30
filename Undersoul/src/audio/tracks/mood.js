// Atmosphere: genocide, game over, tension, memories.
import { prog, pad, arp, bass, rep } from './lib.js';
import { MOTIF_A, MOTIF_A2 } from './theme.js';
import { FALLEN_A, FALLEN_B, FALLEN_PA, FALLEN_PB } from './areas.js';

const HOME_FRAG = 'o5 <a4 >d4 e4 f+2 a4 g4 f+4 e4 d2. <b4 >d4 f+4 e4 d4 c+4 e2. r2.';

export const MOOD_TRACKS = {
  // Nobody is left. A music box that has forgotten half the tune.
  genocide: {
    bpm: 50,
    ch: [
      { ins: 'musicbox', vol: 0.45, rev: 0.8, mml: `L o5 <a8 r8 >d8 r8 r2 r1 r2 f+8 r8 r4 r1 <b8 r8 r4 r2 r1 r1 r1` },
      { ins: 'pad', vol: 0.5, rev: 0.7, mml: `L ${pad(prog('Dm:8 Bbmaj7:8 Gm6:8 A7:8'), 50)}` },
      { ins: 'sine', vol: 0.35, mml: `L o1 d1 d1 d1 d1 d1 d1 c+1 c+1` },
      { ins: 'bell', vol: 0.25, rev: 0.9, mml: `L o2 d1 r1 r1 r1 o2 d1 r1 r1 r1` },
    ],
  },

  // Game over: the first half of the leitmotif, very slowly, in C.
  gameover: {
    bpm: 64,
    ch: [
      { ins: 'piano', vol: 0.55, rev: 0.7, pan: 0.1, mml: `v10 L k-2 ${MOTIF_A} ${MOTIF_A2} k0` },
      { ins: 'bellpad', vol: 0.35, rev: 0.7, mml: `L ${pad(prog('C F Am Gsus4:2 G:2 C F:2 Dm:2 G7 C'), 64)}` },
      { ins: 'slowstr', vol: 0.3, rev: 0.7, mml: `L ${bass(prog('C F Am Gsus4:2 G:2 C F:2 Dm:2 G7 C'), 'whole', 36)}` },
    ],
  },

  // True lab: the Home lullaby on a music box, half a step out of itself.
  deep_lab: {
    bpm: 58,
    ch: [
      { ins: 'musicbox', vol: 0.5, rev: 0.8, pan: -0.2, mml: `r2. L ${HOME_FRAG} ${rep('r2.', 8)}` },
      { ins: 'musicbox', vol: 0.18, rev: 0.8, pan: 0.3, mml: `r2. L r4 k-1 ${HOME_FRAG.replace(' r2.', '')} k0 r2 ${rep('r2.', 8)}` },
      { ins: 'pad', vol: 0.45, rev: 0.7, mml: `r2. L ${pad(prog('Dm:6 Ebmaj7:6 Dm:6 C#dim:6 Dm:6 Ebmaj7:6 Bbm:6 A:6'), 52)}` },
      { ins: 'drums', vol: 0.2, mml: `r2. L [g4 r2 r2. r2. g8 g8 r4 r4]4` },
    ],
  },

  // Tension for cutscenes: tremolo strings, a heartbeat.
  ominous: {
    bpm: 60,
    ch: [
      { ins: 'strings', vol: 0.4, rev: 0.6, mml: `L [o3 d16 d16 d16 d16]8 [o3 e-16 e-16 e-16 e-16]4 [o3 d16 d16 d16 d16]4` },
      { ins: 'slowstr', vol: 0.35, rev: 0.6, mml: `L o2 d1 d1 e-1 d1` },
      { ins: 'timpani', vol: 0.35, rev: 0.5, mml: `L [o2 d8 d8 r4 r2]4` },
    ],
  },

  // Memories of the first child: the Fallen motif, music box and harp.
  fallen: {
    bpm: 72,
    ch: [
      { ins: 'musicbox', vol: 0.6, rev: 0.6, pan: 0.1, mml: `r1 L ${FALLEN_A} ${FALLEN_B}` },
      { ins: 'harp', vol: 0.35, rev: 0.6, pan: -0.2, mml: `${arp(prog('Am'), [0, 2, 3, 11], 0.5, 52)} L ${arp([...FALLEN_PA, ...FALLEN_PB], [0, 2, 3, 11], 0.5, 52)}` },
      { ins: 'slowstr', vol: 0.3, rev: 0.6, mml: `r1 L ${pad([...FALLEN_PA, ...FALLEN_PB], 60)}` },
    ],
  },
};
