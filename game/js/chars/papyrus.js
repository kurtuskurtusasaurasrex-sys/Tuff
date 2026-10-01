// PAPYRUS - heavy bruiser. Slower, hard to launch, huge area moves, spinning charge and a bone-line super.

const H_ = (o) => o;

export default {
  id: 'papyrus',
  name: 'PAPYRUS',
  tag: 'Heavy brawler',
  blurb: 'The Great Papyrus! Big kicks, a ground-shaking stomp, electric orbs and a SPINNING charge.',
  atlas: 'papyrus',
  color: '#e8541a', superName: 'SPECIAL ATTACK!', cutPose: 'cape1', cutFlip: false,
  stats: { power: 5, speed: 2, weight: 5, range: 3 },
  moveList: [
    ['ATTACK', 'Kick combo (x3)'],
    ['MOVE + ATTACK', 'NYEH! Stomp: hits all around'],
    ['SPECIAL', 'Electric orb (one at a time)'],
    ['MOVE + SPECIAL', 'SPIN! multi-hit charge'],
    ['METER FULL + SPECIAL', 'SPECIAL ATTACK: bone lines'],
  ],
  weight: 1.2,
  speed: 3.0,
  hr: 20,
  moves: {
    jab1: { len: 24, lunge: [[0, 6, 1.5]], cancel: [11, 23],
      hits: [H_({ g: 0, f0: 6, f1: 10, reach: 36, len: 14, r: 19, dmg: 4.5, kb: 4, kbs: 0.02, stun: 14, hs: 4, gd: 10, ang: 'away', fx: 'kick' })] },
    jab2: { len: 24, lunge: [[0, 6, 1.5]], cancel: [11, 23],
      hits: [H_({ g: 0, f0: 6, f1: 10, reach: 36, len: 14, r: 19, dmg: 4, kb: 4.2, kbs: 0.02, stun: 14, hs: 4, gd: 10, ang: 'away', fx: 'kick' })] },
    jab3: { len: 42, lunge: [[6, 13, 2.6]],
      hits: [H_({ g: 0, f0: 11, f1: 15, reach: 40, len: 24, r: 24, dmg: 7, kb: 10, kbs: 0.12, stun: 22, hs: 7, gd: 20, ang: 'mix', fx: 'kick' })] },
    // NYEH! stomp - hits everything around him
    strike: { len: 58,
      hits: [H_({ g: 0, f0: 21, f1: 25, reach: 0, len: 0, r: 76, dmg: 10, kb: 11, kbs: 0.14, stun: 28, hs: 9, gd: 30, ang: 'away', fx: 'stomp' })],
      ev: [{ f: 21, do: 'shock', r: 76 }] },
    // Electric orb (Invisible Electricity Maze) - one at a time
    special: { len: 36, lim: 'orb',
      ev: [{ f: 14, do: 'orb', off: 34, speed: 8.4, life: 110, r: 16,
        h: H_({ dmg: 8, kb: 6, kbs: 0.075, stun: 22, hs: 6, gd: 14, ang: 'aim', fx: 'zap' }) }] },
    // SPIN! - multi-hit charge in the held direction
    spcDir: { len: 62, spin: { f0: 6, f1: 48, speed: 4.8 },
      hits: [
        H_({ g: 0, f0: 8, f1: 12, reach: 0, len: 0, r: 40, dmg: 3, kb: 2.5, kbs: 0.01, stun: 14, hs: 2, gd: 8, ang: 'away', fx: 'spin' }),
        H_({ g: 1, f0: 16, f1: 20, reach: 0, len: 0, r: 40, dmg: 3, kb: 2.5, kbs: 0.01, stun: 14, hs: 2, gd: 8, ang: 'away', fx: 'spin' }),
        H_({ g: 2, f0: 24, f1: 28, reach: 0, len: 0, r: 40, dmg: 3, kb: 2.5, kbs: 0.01, stun: 14, hs: 2, gd: 8, ang: 'away', fx: 'spin' }),
        H_({ g: 3, f0: 32, f1: 36, reach: 0, len: 0, r: 40, dmg: 3, kb: 2.5, kbs: 0.01, stun: 14, hs: 2, gd: 8, ang: 'away', fx: 'spin' }),
        H_({ g: 4, f0: 40, f1: 44, reach: 0, len: 0, r: 42, dmg: 4, kb: 9, kbs: 0.1, stun: 22, hs: 6, gd: 16, ang: 'aim', fx: 'spin' }),
      ] },
    // SPECIAL ATTACK! - three lines of bones erupt toward the opponent
    super: { len: 170, cut: 50, inv: [0, 14],
      ev: [{ f: 26, do: 'bonelines', lines: 3, spacing: 50, n: 9, step: 48, every: 5, warn: 20, life: 14, r: 27,
        h: H_({ dmg: 3.4, kb: 7, kbs: 0.06, stun: 30, hs: 5, gd: 30, ang: 'away', fx: 'bone' }) }] },
  },

  pose(f, s) {
    const t = s.frame;
    const side = Math.abs(f.vx) > Math.abs(f.vy) * 0.8;
    const moving = Math.abs(f.vx) + Math.abs(f.vy) > 0.6;
    switch (f.st) {
      case 'idle': return { n: ((t >> 5) & 1) ? 'idle2' : 'idle0', flip: false };
      case 'walk': {
        const k = (t / 6 | 0) & 3;
        if (side || !moving) return { n: 'side' + k, flip: f.face > 0 };
        if (f.vy < 0) return { n: 'back' + k, flip: false };
        return { n: 'idle' + k, flip: false };
      }
      case 'guard': return { n: 'spin0', flip: false };
      case 'dodge': return { n: 'spin' + ((t >> 1) & 3), flip: false, a: 0.75 };
      case 'hurt': return { n: ((f.sf >> 2) & 1) ? 'angry3' : 'angry2', flip: false, ox: ((f.sf >> 1) & 1) ? 3 : -3 };
      case 'launch': return { n: 'flail', flip: f.vx < 0 };
      case 'gbreak': return { n: 'angry1', flip: false, ox: ((t >> 1) & 1) ? 2 : -2 };
      case 'fall': return { n: ((f.sf >> 2) & 1) ? 'flail2' : 'flail', flip: ((f.sf >> 3) & 1) === 1 };
      case 'spawn': return { n: 'idle0', flip: false, a: f.sf < 30 ? 0 : 1 };
      case 'win': return { n: 'cape' + (((t >> 3) % 5 + 5) % 5), flip: false };
      case 'atk': return atkPose(f, s);
    }
    return { n: 'idle0', flip: false };
  },
};

function atkPose(f, s) {
  const mf = f.mf, ax = f.maimx;
  switch (f.mv) {
    case 'jab1': return { n: mf < 3 ? 'idle0' : 'kickR', flip: ax < 0 };
    case 'jab2': return { n: mf < 3 ? 'idle0' : 'kickL', flip: ax < 0 };
    case 'jab3': return { n: mf < 8 ? 'kickR' : mf < 22 ? 'fists' : 'angry0', flip: false };
    case 'strike': return { n: mf < 10 ? 'kickR' : mf < 24 ? 'kickL' : mf < 40 ? 'fists' : 'angry0', flip: false };
    case 'special': return { n: mf < 8 ? 'orb0' : mf < 14 ? 'orb1' : mf < 28 ? 'orb2' : 'idle0', flip: ax > 0 };
    case 'spcDir': return { n: mf < 6 ? 'idle0' : 'spin' + ((mf / 3 | 0) & 3), flip: false };
    case 'super': return { n: 'cape' + Math.min(4, (mf / 7 | 0) % 5), flip: false };
  }
  return { n: 'idle0', flip: false };
}
