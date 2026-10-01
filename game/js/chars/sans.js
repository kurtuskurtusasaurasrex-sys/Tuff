// SANS - fast, fragile zoner. Light (gets launched far), small hurtbox, teleport + Gaster Blasters.
// Moves are plain data; game/js/sim.js interprets them. `pose()` picks the sprite for the renderer.

const H_ = (o) => o;   // readability marker for hit definitions

export default {
  id: 'sans',
  name: 'SANS',
  tag: 'Teleporting zoner',
  blurb: 'Short, lazy and far too dangerous. Warps around the arena and calls down Gaster Blasters.',
  atlas: 'sans',
  color: '#2f6fe0', superName: 'BAD TIME', cutPose: 'idle_eye2',
  stats: { power: 3, speed: 4, weight: 2, range: 5 },
  moveList: [
    ['ATTACK', 'Bone-poke combo (x3)'],
    ['MOVE + ATTACK', 'Gravity Slam: big area hit'],
    ['SPECIAL', 'Gaster Blaster: beam through the target'],
    ['MOVE + SPECIAL', 'Shortcut: teleport that way'],
    ['METER FULL + SPECIAL', 'BAD TIME: 4 Giga Blasters'],
  ],
  weight: 0.85,         // knockback is divided by this
  speed: 3.5,
  hr: 14,               // hurtbox radius (ground units)
  moves: {
    jab1: { len: 20, lunge: [[0, 6, 1.7]], cancel: [9, 19],
      hits: [H_({ g: 0, f0: 5, f1: 8, reach: 28, len: 16, r: 13, dmg: 3, kb: 3.2, kbs: 0.015, stun: 13, hs: 3, gd: 8, ang: 'away', fx: 'bone' })] },
    jab2: { len: 20, lunge: [[0, 6, 1.7]], cancel: [9, 19],
      hits: [H_({ g: 0, f0: 5, f1: 8, reach: 28, len: 16, r: 13, dmg: 3, kb: 3.4, kbs: 0.015, stun: 13, hs: 3, gd: 8, ang: 'away', fx: 'bone' })] },
    jab3: { len: 38, lunge: [[4, 10, 2.4]],
      hits: [H_({ g: 0, f0: 9, f1: 13, reach: 32, len: 22, r: 16, dmg: 5, kb: 8, kbs: 0.1, stun: 20, hs: 6, gd: 16, ang: 'mix', fx: 'bone' })] },
    // Gravity Slam - big slow area hit in the direction you hold
    strike: { len: 54,
      hits: [H_({ g: 0, f0: 22, f1: 26, reach: 58, len: 0, r: 30, dmg: 9, kb: 10, kbs: 0.14, stun: 26, hs: 9, gd: 26, ang: 'mix', fx: 'slam' })],
      ev: [{ f: 14, do: 'telegraph', reach: 58, r: 30 }] },
    // Gaster Blaster - appears behind Sans and fires through him along the aim line
    special: { len: 52, lim: 'beam',
      ev: [{ f: 10, do: 'beam', back: 62, mo: 22, warm: 30, fire: 16, bl: 470, r: 22, spr: 'gb',
        h: H_({ dmg: 9, kb: 7, kbs: 0.085, stun: 32, hs: 10, gd: 40, ang: 'aim', fx: 'beam' }) }] },
    // Shortcut - teleport in the held direction
    spcDir: { len: 26, inv: [3, 18],
      ev: [{ f: 6, do: 'tele', dist: 135 }] },
    // Bad Time - four Giga Blasters surround the opponent
    super: { len: 150, cut: 50, inv: [0, 14],
      ev: [{ f: 12, do: 'ring', n: 4, dist: 175, warm: 36, stag: 9, fire: 24, bl: 520, r: 30, spr: 'giga',
        h: H_({ dmg: 9, kb: 8, kbs: 0.10, stun: 40, hs: 7, gd: 60, ang: 'aim', fx: 'beam' }) }] },
  },

  // ---- sprite selection ---------------------------------------------------------------------
  pose(f, s) {
    const t = s.frame;
    const side = Math.abs(f.vx) > Math.abs(f.vy) * 0.8;
    const moving = Math.abs(f.vx) + Math.abs(f.vy) > 0.6;
    switch (f.st) {
      case 'idle':
        return { n: (t % 220) < 7 ? 'idle_blink' : 'idle', flip: false };
      case 'walk':
        if (side || !moving) return { n: ((t >> 3) & 1) ? 'side_walk0' : 'side', flip: f.face > 0, oy: ((t >> 2) & 1) ? -2 : 0 };
        return { n: 'idle', flip: ((t >> 4) & 1) === 1, oy: ((t >> 2) & 1) ? -3 : 0 };
      case 'guard': return { n: 'guard', flip: false };
      case 'dodge': return { n: side ? 'side' : 'idle', flip: f.vx > 0, a: 0.7 };
      case 'hurt': return { n: ((f.sf >> 2) & 1) ? 'hurt2' : 'hurt', flip: f.face > 0, ox: ((f.sf >> 1) & 1) ? 3 : -3 };
      case 'launch': return { n: ((f.sf >> 3) & 1) ? 'shurt2' : 'shurt', flip: f.vx < 0 };
      case 'gbreak': return { n: 'hurt2', flip: false, ox: ((t >> 1) & 1) ? 2 : -2 };
      case 'fall': {
        const k = (f.sf >> 2) & 3;
        return { n: ['hurt', 'shurt2', 'hurt2', 'shurt'][k], flip: (k & 1) === 1 };
      }
      case 'spawn': return { n: 'idle', flip: false, a: f.sf < 30 ? 0 : 1 };
      case 'win': return { n: ((t >> 4) & 1) ? 'idle_eye' : 'idle', flip: false };
      case 'atk': return atkPose(f, s);
    }
    return { n: 'idle', flip: false };
  },
};

function atkPose(f, s) {
  const mf = f.mf, ax = f.maimx, ay = f.maimy;
  const horiz = Math.abs(ax) >= Math.abs(ay) * 0.8;
  switch (f.mv) {
    case 'jab1': case 'jab2': case 'jab3': {
      if (horiz) {
        const n = mf < 4 ? 'lr1' : mf < 14 ? (f.mv === 'jab3' && mf < 9 ? 'lr3' : 'lr4') : mf < 20 ? 'lr5' : 'lr2';
        return { n, flip: ax < 0 };
      }
      if (ay < 0) return { n: mf < 4 ? 'ud0' : 'ud1', flip: false };
      return { n: mf < 4 ? 'ud3' : 'ud4', flip: false };
    }
    case 'strike': return { n: mf < 8 ? 'ud0' : mf < 22 ? 'ud1' : mf < 30 ? 'ud2' : mf < 40 ? 'ud3' : 'ud4', flip: false };
    case 'special': return { n: mf < 8 ? 'ud0' : mf < 32 ? 'ud1' : 'lr4', flip: horiz ? ax < 0 : false };
    case 'spcDir': return { n: 'idle_eye', flip: false, a: mf >= 6 && mf < 18 ? 0.12 : 1 };
    case 'super': return { n: mf < 44 ? 'idle_eye2' : mf < 100 ? 'ud1' : 'idle', flip: false };
  }
  return { n: 'idle', flip: false };
}
