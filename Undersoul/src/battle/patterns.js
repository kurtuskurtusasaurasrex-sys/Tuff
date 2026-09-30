// Attack patterns. Each is a generator: yield N waits N seconds (in bullet
// time, so PATIENCE's STILL slows them too). `c` is the pattern context:
//   c.box (live board rect) c.soul c.spawn(bullet) c.rng c.setMode(m, o)
//   c.d density multiplier, c.speed speed multiplier, c.sfx(name)
import { sfx } from '../audio/sfx.js';

const TAU = Math.PI * 2;
const R = (c, a, b) => c.rng.range(a, b);

function aimAt(c, x, y) { return Math.atan2(c.soul.y - y, c.soul.x - x); }
function edgePoint(c, side, t) {
  const b = c.box;
  if (side === 'top') return [b.x + b.w * t, b.y - 12];
  if (side === 'bottom') return [b.x + b.w * t, b.y + b.h + 12];
  if (side === 'left') return [b.x - 12, b.y + b.h * t];
  return [b.x + b.w + 12, b.y + b.h * t];
}

// Draw helpers for special bullets -------------------------------------------
function drawBeam(color) {
  return (g, b) => {
    g.save();
    g.translate(b.x, b.y);
    g.rotate(b.rot);
    const k = Math.min(1, (b.age) * 10);
    const fade = b.age > b.life - 0.2 ? Math.max(0, (b.life - b.age) / 0.2) : 1;
    g.globalAlpha = fade;
    g.shadowColor = color;
    g.shadowBlur = 16;
    g.fillStyle = color;
    g.fillRect(-b.w / 2, -b.h / 2 * k, b.w, b.h * k);
    g.fillStyle = '#fff';
    g.fillRect(-b.w / 2, -b.h / 4 * k, b.w, b.h / 2 * k);
    g.restore();
  };
}
function drawWarnLine(color) {
  return (g, b) => {
    g.save();
    g.translate(b.x, b.y);
    g.rotate(b.rot);
    g.globalAlpha = 0.35 + 0.35 * Math.sin(b.age * 40);
    g.strokeStyle = color;
    g.lineWidth = 2;
    g.setLineDash([8, 6]);
    g.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);
    g.restore();
  };
}

export function beam(c, x, y, rot, len, width, opts = {}) {
  sfx.charge();
  return c.spawn({
    x, y, rot, w: len, h: width, r: undefined, warn: opts.warn ?? 0.7, life: opts.life ?? 0.55, laser: true,
    kind: opts.kind ?? 'white', destroyable: false, unblockable: true, keep: true, graze: true,
    draw: drawBeam(opts.color ?? (opts.kind === 'cyan' ? '#46e6ff' : opts.kind === 'orange' ? '#ff9a1f' : '#ffffff')),
    drawWarn: drawWarnLine(opts.color ?? '#ffffff'),
    update: opts.update,
    onWarnUpdate: (b) => { if (b.warn <= 0.02 && !b.fired) { b.fired = true; sfx.laser(); } },
  });
}

// Lantern-head blaster for Wick: charges at a point, fires a beam.
export function lantern(c, x, y, angle, opts = {}) {
  const len = 1400;
  const w = opts.width ?? 38;
  const head = c.spawn({
    x, y, r: 16, harmless: true, life: (opts.warn ?? 0.75) + 0.9, keep: true, graze: false, destroyable: false,
    draw: (g, b) => {
      g.save();
      g.translate(b.x, b.y);
      g.rotate(angle - Math.PI / 2);
      const pull = b.age > (opts.warn ?? 0.75) ? Math.min(1, (b.age - (opts.warn ?? 0.75)) * 4) * 10 : 0;
      g.translate(0, -pull);
      g.fillStyle = '#e8f0ff';
      g.shadowColor = '#6ad8ff';
      g.shadowBlur = 14;
      g.fillRect(-18, -22, 36, 40);
      g.fillStyle = '#2a2a3a';
      g.fillRect(-14, -30, 28, 8);
      g.fillStyle = b.age > (opts.warn ?? 0.75) - 0.25 ? '#ffffff' : '#6ad8ff';
      g.fillRect(-10, -8, 7, 7); g.fillRect(3, -8, 7, 7);
      g.fillStyle = '#2a2a3a';
      g.fillRect(-9, 6, 18, 4);
      g.restore();
    },
  });
  void head;
  const bx = x + Math.cos(angle) * (len / 2 + 20), by = y + Math.sin(angle) * (len / 2 + 20);
  return beam(c, bx, by, angle, len, w, { warn: opts.warn ?? 0.75, life: 0.5, kind: opts.kind, color: opts.color ?? '#dff4ff' });
}

// Vertical/horizontal wax pillar wall with a gap (bone-style).
function pillarWall(c, side, gapPos, gapSize, speed, opts = {}) {
  const b = c.box;
  const horiz = side === 'left' || side === 'right';
  const span = horiz ? b.h : b.w;
  const segs = [];
  const gp = gapPos * span, gs = gapSize;
  if (gp - gs / 2 > 4) segs.push([0, gp - gs / 2]);
  if (gp + gs / 2 < span - 4) segs.push([gp + gs / 2, span]);
  for (const [a, z] of segs) {
    const len = z - a;
    if (horiz) {
      const x = side === 'left' ? b.x - 10 : b.x + b.w + 10;
      c.spawn({ x, y: b.y + a + len / 2, w: 12, h: len, shape: 'wax', vx: (side === 'left' ? 1 : -1) * speed, kind: opts.kind ?? 'white', destroyable: false, keep: true, life: 6 });
    } else {
      const y = side === 'top' ? b.y - 10 : b.y + b.h + 10;
      c.spawn({ x: b.x + a + len / 2, y, w: len, h: 12, rot: 0, shape: 'block', color: opts.color ?? '#fff', vy: (side === 'top' ? 1 : -1) * speed, kind: opts.kind ?? 'white', destroyable: false, keep: true, life: 6 });
    }
  }
}

// Floor pillars for gravity-mode jumping.
function floorPillar(c, fromLeft, h, speed, opts = {}) {
  const b = c.box;
  return c.spawn({
    x: fromLeft ? b.x - 10 : b.x + b.w + 10, y: b.y + b.h - h / 2, w: 12, h, shape: 'wax',
    vx: (fromLeft ? 1 : -1) * speed, kind: opts.kind ?? 'white', destroyable: false, keep: true, life: 8,
  });
}

// ===========================================================================
export const PATTERNS = {
  // ---------------- generic ----------------
  *rain(c, p = {}) {
    const n = Math.round((p.count ?? 18) * c.d);
    for (let i = 0; i < n; i++) {
      const [x, y] = edgePoint(c, 'top', R(c, 0.04, 0.96));
      c.spawn({ x, y, vy: (p.speed ?? 120) * c.speed * R(c, 0.8, 1.2), shape: p.shape ?? 'drop', r: p.r ?? 5, kind: p.kinds ? c.rng.pick(p.kinds) : 'white', rot: 0 });
      yield (p.interval ?? 0.22) / c.d;
    }
    yield 1.4;
  },

  *sideways(c, p = {}) {
    const n = Math.round((p.count ?? 14) * c.d);
    for (let i = 0; i < n; i++) {
      const left = c.rng.chance(0.5);
      const [x, y] = edgePoint(c, left ? 'left' : 'right', R(c, 0.08, 0.92));
      c.spawn({ x, y, vx: (left ? 1 : -1) * (p.speed ?? 130) * c.speed, shape: p.shape ?? 'orb', r: p.r ?? 6, kind: p.kinds ? c.rng.pick(p.kinds) : 'white' });
      yield (p.interval ?? 0.28) / c.d;
    }
    yield 1.4;
  },

  *aimed(c, p = {}) {
    const n = Math.round((p.count ?? 10) * c.d);
    for (let i = 0; i < n; i++) {
      const side = c.rng.pick(['top', 'left', 'right']);
      const [x, y] = edgePoint(c, side, R(c, 0.1, 0.9));
      const a = aimAt(c, x, y);
      const sp = (p.speed ?? 150) * c.speed;
      c.spawn({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, rot: a + Math.PI / 2, shape: p.shape ?? 'orb', r: p.r, w: p.w, h: p.h, kind: p.kinds ? c.rng.pick(p.kinds) : 'white' });
      yield (p.interval ?? 0.4) / c.d;
    }
    yield 1.4;
  },

  *ring(c, p = {}) {
    const waves = p.waves ?? 4;
    for (let wv = 0; wv < waves; wv++) {
      const cx = p.center ? c.box.x + c.box.w / 2 : R(c, c.box.x + 30, c.box.x + c.box.w - 30);
      const cy = p.center ? c.box.y + c.box.h / 2 : c.box.y + 20;
      const n = Math.round((p.n ?? 10) * Math.sqrt(c.d));
      const off = R(c, 0, TAU);
      for (let i = 0; i < n; i++) {
        const a = off + (i / n) * TAU;
        const sp = (p.speed ?? 90) * c.speed;
        c.spawn({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, shape: p.shape ?? 'orb', r: p.r ?? 5, kind: p.kind ?? 'white' });
      }
      yield p.interval ?? 1.1;
    }
    yield 1.2;
  },

  *spiral(c, p = {}) {
    const cx = c.box.x + c.box.w / 2, cy = p.top ? c.box.y + 10 : c.box.y + c.box.h / 2;
    const dur = p.time ?? 5;
    let a = 0;
    for (let t = 0; t < dur; t += 0.12 / c.d) {
      for (let k = 0; k < (p.arms ?? 2); k++) {
        const ang = a + (k / (p.arms ?? 2)) * TAU;
        const sp = (p.speed ?? 100) * c.speed;
        c.spawn({ x: cx, y: cy, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, shape: p.shape ?? 'orb', r: p.r ?? 5, kind: p.kind ?? 'white', rot: ang });
      }
      a += p.turn ?? 0.35;
      yield 0.12 / c.d;
    }
    yield 1;
  },

  *walls(c, p = {}) {
    const n = p.count ?? 6;
    for (let i = 0; i < n; i++) {
      const side = p.side ?? c.rng.pick(['left', 'right']);
      pillarWall(c, side, R(c, 0.25, 0.75), p.gap ?? 44, (p.speed ?? 140) * c.speed, { kind: p.kinds ? c.rng.pick(p.kinds) : 'white' });
      yield (p.interval ?? 0.9) / Math.sqrt(c.d);
    }
    yield 1.4;
  },

  *bounce(c, p = {}) {
    const n = Math.round((p.count ?? 4) * c.d);
    for (let i = 0; i < n; i++) {
      const b = c.box;
      const a = R(c, 0.3, 1.2) + (c.rng.chance(0.5) ? Math.PI / 2 : 0);
      const sp = (p.speed ?? 110) * c.speed;
      c.spawn({
        x: b.x + R(c, 20, b.w - 20), y: b.y + 12, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, shape: p.shape ?? 'block', w: p.size ?? 16, h: p.size ?? 16, keep: true, life: p.life ?? 6,
        update: (bb, dt, board) => {
          const bx = board.box;
          const hw = (bb.w ?? 0) / 2;
          if (bb.x < bx.x + hw) { bb.x = bx.x + hw; bb.vx = Math.abs(bb.vx); }
          if (bb.x > bx.x + bx.w - hw) { bb.x = bx.x + bx.w - hw; bb.vx = -Math.abs(bb.vx); }
          if (bb.y < bx.y + hw) { bb.y = bx.y + hw; bb.vy = Math.abs(bb.vy); }
          if (bb.y > bx.y + bx.h - hw) { bb.y = bx.y + bx.h - hw; bb.vy = -Math.abs(bb.vy); }
          bb.rot += dt * 2;
        },
      });
      yield 0.7;
    }
    yield (p.time ?? 5) - n * 0.7;
  },

  *homing(c, p = {}) {
    const n = Math.round((p.count ?? 5) * c.d);
    for (let i = 0; i < n; i++) {
      const [x, y] = edgePoint(c, c.rng.pick(['top', 'left', 'right']), R(c, 0.1, 0.9));
      c.spawn({
        x, y, shape: p.shape ?? 'eye', r: p.r ?? 8, life: p.life ?? 4, keep: true,
        update: (b, dt, board) => {
          const a = Math.atan2(board.soul.y - b.y, board.soul.x - b.x);
          const sp = (p.speed ?? 55) * c.speed;
          b.vx += (Math.cos(a) * sp - b.vx) * dt * 1.5;
          b.vy += (Math.sin(a) * sp - b.vy) * dt * 1.5;
          b.rot = 0;
        },
      });
      yield 0.8;
    }
    yield 2.5;
  },

  *zigzag(c, p = {}) {
    const n = Math.round((p.count ?? 12) * c.d);
    for (let i = 0; i < n; i++) {
      const [x, y] = edgePoint(c, 'top', R(c, 0.1, 0.9));
      const ph = R(c, 0, TAU);
      c.spawn({ x, y, vy: (p.speed ?? 80) * c.speed, shape: p.shape ?? 'leaf', w: 10, h: 16, kind: p.kinds ? c.rng.pick(p.kinds) : 'white', update: (b, dt) => { b.vx = Math.cos(b.age * (p.freq ?? 4) + ph) * (p.amp ?? 70); b.rot = Math.sin(b.age * 4 + ph) * 0.6; } });
      yield (p.interval ?? 0.35) / c.d;
    }
    yield 1.8;
  },

  // ---------------- Hollows ----------------
  *fly_swarm(c) {
    for (let i = 0; i < Math.round(10 * c.d); i++) {
      const left = i % 2 === 0;
      const [x, y] = edgePoint(c, left ? 'left' : 'right', R(c, 0.15, 0.85));
      const ph = R(c, 0, TAU);
      c.spawn({ x, y, vx: (left ? 1 : -1) * 90 * c.speed, shape: 'fly', r: 6, update: (b, dt) => { b.vy = Math.sin(b.age * 8 + ph) * 60; } });
      yield 0.33 / c.d;
    }
    yield 1.5;
  },

  *frog_hop(c) {
    for (let i = 0; i < 3; i++) {
      const b = c.box;
      const left = c.rng.chance(0.5);
      const x0 = left ? b.x + 10 : b.x + b.w - 10;
      c.spawn({
        x: x0, y: b.y + b.h - 10, r: 11, shape: 'orb', life: 3, keep: true, color: '#8aff7a',
        update: (bb, dt) => {
          const tt = bb.age;
          bb.x = x0 + (left ? 1 : -1) * tt * 95 * c.speed;
          bb.y = b.y + b.h - 12 - Math.abs(Math.sin(tt * 3.2)) * (b.h * 0.65);
        },
      });
      yield 1.2;
    }
    yield 1.3;
  },

  *tears(c) {
    for (let i = 0; i < Math.round(12 * c.d); i++) {
      const [x, y] = edgePoint(c, 'top', R(c, 0.1, 0.9));
      c.spawn({ x, y, vy: 70 * c.speed, shape: 'drop', w: 8, h: 12, color: '#bfe0ff', update: (b, dt) => { b.vx = Math.sin(b.age * 3 + x) * 25; } });
      yield 0.3 / c.d;
    }
    yield 2;
  },

  *stare(c) {
    const b = c.box;
    const n = Math.round(8 * c.d);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU;
      const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
      const x = cx + Math.cos(a) * b.w * 0.6, y = cy + Math.sin(a) * b.h * 0.6;
      c.spawn({ x, y, r: 7, shape: 'eye', warn: 0.5, life: 4, keep: true, update: (bb, dt, board) => { const ang = Math.atan2(board.soul.y - bb.y, board.soul.x - bb.x); if (bb.age < 0.6) { bb.vx = 0; bb.vy = 0; } else if (!bb.go) { bb.go = true; bb.vx = Math.cos(ang) * 150 * c.speed; bb.vy = Math.sin(ang) * 150 * c.speed; } } });
      yield 0.3;
    }
    yield 2.2;
  },

  *veggie(c) {
    for (let i = 0; i < Math.round(14 * c.d); i++) {
      const [x, y] = edgePoint(c, 'top', R(c, 0.05, 0.95));
      const green = c.rng.chance(0.2);
      c.spawn({ x, y, vy: 110 * c.speed, shape: green ? 'leaf' : 'diamond', w: 10, h: 18, kind: green ? 'green' : 'white', heal: 2, vrot: R(c, -3, 3) });
      yield 0.25 / c.d;
    }
    yield 1.5;
  },

  *scuttle_run(c) {
    const b = c.box;
    for (let i = 0; i < Math.round(9 * c.d); i++) {
      const lane = c.rng.int(0, 3);
      const left = c.rng.chance(0.5);
      const y = b.y + 16 + lane * ((b.h - 32) / 3);
      c.spawn({ x: left ? b.x - 10 : b.x + b.w + 10, y, vx: (left ? 1 : -1) * R(c, 120, 180) * c.speed, shape: 'spider', r: 8, update: (bb) => { bb.y = y + Math.sin(bb.age * 20) * 2; } });
      yield 0.45 / c.d;
    }
    yield 1.5;
  },

  *hush_sigh(c) {
    for (let i = 0; i < Math.round(10 * c.d); i++) {
      const [x, y] = edgePoint(c, 'top', R(c, 0.1, 0.9));
      c.spawn({ x, y, vy: 45 * c.speed, shape: 'drop', w: 9, h: 14, color: '#c8d0ff', update: (b) => { b.vx = Math.sin(b.age * 1.7 + x) * 40; } });
      yield 0.5 / c.d;
    }
    yield 2.5;
  },

  // Willow: amber leaves of fire.
  *willow_rain(c, p = {}) {
    const b = c.box;
    const gentle = p.gentle;
    for (let row = 0; row < 6; row++) {
      const gap = R(c, 0.2, 0.8);
      for (let k = 0; k < 8; k++) {
        const t = (k + 0.5) / 8;
        if (Math.abs(t - gap) < (gentle ? 0.28 : 0.16)) continue;
        c.spawn({ x: b.x + b.w * t, y: b.y - 10, vy: 105 * c.speed, shape: 'fire', w: 12, h: 18, color: '#ffb05a' });
      }
      yield 0.85;
    }
    yield 1.2;
  },

  *willow_hands(c, p = {}) {
    const b = c.box;
    for (let i = 0; i < 4; i++) {
      const left = i % 2 === 0;
      const y0 = c.soul.y;
      for (let k = 0; k < 7; k++) {
        c.spawn({ x: left ? b.x - 10 : b.x + b.w + 10, y: y0 + (k - 3) * 14 + R(c, -3, 3), vx: (left ? 1 : -1) * (110 + k * 6) * c.speed, shape: 'fire', w: 12, h: 16, color: '#ff9a4a', rot: left ? Math.PI / 2 : -Math.PI / 2, avoid: p.avoid });
        yield 0.07;
      }
      yield 0.9;
    }
    yield 1.2;
  },

  *willow_spiral(c, p = {}) {
    // At low HP her fire curves away from you.
    const b = c.box;
    const cx = b.x + b.w / 2, cy = b.y + 14;
    let a = 0;
    for (let t = 0; t < 4.5; t += 0.14) {
      for (const s of [-1, 1]) {
        const ang = Math.PI / 2 + Math.sin(a) * 1.2 * s;
        c.spawn({
          x: cx, y: cy, vx: Math.cos(ang) * 90 * c.speed, vy: Math.sin(ang) * 90 * c.speed, shape: 'fire', w: 11, h: 15, color: '#ffc06a',
          update: p.avoid ? (bb, dt, board) => { const dx = bb.x - board.soul.x, dy = bb.y - board.soul.y; const d = Math.hypot(dx, dy); if (d < 40) { bb.vx += (dx / d) * 600 * dt; bb.vy += (dy / d) * 600 * dt; } } : undefined,
        });
      }
      a += 0.3;
      yield 0.14;
    }
    yield 1.2;
  },

  // Sprig's "friendliness pellets" closing in.
  *sprig_ring(c) {
    const s = c.soul;
    const n = 22;
    const bullets = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU;
      bullets.push(c.spawn({ x: s.x + Math.cos(a) * 80, y: s.y + Math.sin(a) * 80, r: 5, shape: 'pellet', color: '#ffffff', keep: true, life: 30, dmg: 99, a }));
    }
    yield 1.2;
    // they close in, but very slowly
    for (let t = 0; t < 60; t++) {
      for (const b of bullets) { b.x += (s.x - b.x) * 0.012; b.y += (s.y - b.y) * 0.012; }
      yield 0.05;
    }
  },

  *sprig_pellets(c) {
    const b = c.box;
    for (let w = 0; w < 3; w++) {
      for (let i = 0; i < 5; i++) {
        const x = b.x + b.w / 2 + (i - 2) * 18, y = b.y + 12;
        const a = Math.atan2(c.soul.y - y, c.soul.x - x);
        c.spawn({ x, y, vx: Math.cos(a) * 60, vy: Math.sin(a) * 60, r: 5, shape: 'pellet', warn: 0.4, rot: a });
      }
      yield 1.2;
    }
    yield 1.5;
  },

  // ---------------- Frostmere ----------------
  *snow_puns(c) {
    for (let i = 0; i < Math.round(16 * c.d); i++) {
      const [x, y] = edgePoint(c, 'top', R(c, 0.05, 0.95));
      c.spawn({ x, y, vy: R(c, 60, 110) * c.speed, shape: 'snow', r: 7, vrot: 2, update: (b) => { b.vx = Math.sin(b.age * 2 + x) * 30; } });
      yield 0.22 / c.d;
    }
    yield 1.6;
  },

  *ice_bounce(c) { yield* PATTERNS.bounce(c, { count: 3, speed: 120, shape: 'block', size: 18 }); },

  *sword_swipe(c) {
    const b = c.box;
    for (let i = 0; i < 5; i++) {
      const kind = c.rng.chance(0.5) ? 'cyan' : 'orange';
      const top = c.rng.chance(0.5);
      c.spawn({ x: b.x - 20, y: top ? b.y + b.h * 0.3 : b.y + b.h * 0.7, w: 24, h: b.h * 0.55, shape: 'block', kind, vx: 170 * c.speed, destroyable: false, keep: true });
      yield 0.9;
    }
    yield 1.4;
  },

  *axe_sweep(c) {
    const b = c.box;
    for (let i = 0; i < 6; i++) {
      const kind = i % 2 ? 'cyan' : 'orange';
      const left = c.rng.chance(0.5);
      c.spawn({ x: left ? b.x - 20 : b.x + b.w + 20, y: b.y + b.h / 2, w: 14, h: b.h + 20, shape: 'block', kind, vx: (left ? 1 : -1) * 150 * c.speed, destroyable: false, keep: true });
      yield 0.8;
    }
    yield 1.3;
  },

  *blinky_still(c) {
    const b = c.box;
    for (let i = 0; i < 6; i++) {
      const left = i % 2 === 0;
      c.spawn({ x: left ? b.x - 20 : b.x + b.w + 20, y: b.y + b.h / 2, w: 16, h: b.h + 20, shape: 'block', kind: 'cyan', vx: (left ? 1 : -1) * 160 * c.speed, destroyable: false, keep: true });
      yield 0.55;
    }
    yield 1.5;
  },

  // Taper's gravity: jump the wax.
  *taper_jumps(c, p = {}) {
    c.setMode('gravity');
    yield 0.5;
    const n = p.count ?? 6;
    for (let i = 0; i < n; i++) {
      floorPillar(c, i % 2 === 0, R(c, 18, 36), (p.speed ?? 150) * c.speed);
      if (c.rng.chance(0.35)) {
        yield 0.35;
        floorPillar(c, i % 2 === 0, R(c, 18, 30), (p.speed ?? 150) * c.speed);
      }
      yield 0.95;
    }
    yield 1.4;
  },

  *taper_wave(c) {
    c.setMode('gravity');
    yield 0.4;
    const b = c.box;
    for (let i = 0; i < 16; i++) {
      const h = 20 + Math.abs(Math.sin(i * 0.5)) * 36;
      c.spawn({ x: b.x + b.w + 10, y: b.y + b.h - h / 2, w: 12, h, shape: 'wax', vx: -170 * c.speed, destroyable: false, keep: true, life: 6 });
      c.spawn({ x: b.x + b.w + 10, y: b.y + (b.h - h - 60) / 2, w: 12, h: Math.max(4, b.h - h - 60), shape: 'wax', vx: -170 * c.speed, destroyable: false, keep: true, life: 6 });
      yield 0.18;
    }
    yield 2.2;
  },

  *taper_cool(c) {
    // "the cool dude special": one giant pillar you must jump
    c.setMode('gravity');
    yield 0.6;
    const b = c.box;
    c.spawn({ x: b.x + b.w + 20, y: b.y + b.h - 22, w: 14, h: 44, shape: 'wax', vx: -120, destroyable: false, keep: true, life: 6 });
    yield 2.2;
    c.spawn({ x: b.x - 20, y: b.y + b.h - 22, w: 14, h: 44, shape: 'wax', vx: 120, destroyable: false, keep: true, life: 6 });
    yield 2.6;
  },

  // ---------------- Echofall ----------------
  *dumbbells(c) {
    for (let i = 0; i < Math.round(8 * c.d); i++) {
      const left = c.rng.chance(0.5);
      const b = c.box;
      const x0 = left ? b.x - 10 : b.x + b.w + 10;
      c.spawn({ x: x0, y: b.y + b.h - 10, w: 28, h: 10, shape: 'block', vx: (left ? 1 : -1) * 120 * c.speed, vy: -260, ay: 380, vrot: 5, keep: true });
      yield 0.55 / c.d;
    }
    yield 1.6;
  },

  *bubbles_up(c) {
    for (let i = 0; i < Math.round(14 * c.d); i++) {
      const [x, y] = edgePoint(c, 'bottom', R(c, 0.05, 0.95));
      const cy = c.rng.chance(0.3);
      c.spawn({ x, y, vy: -R(c, 50, 90) * c.speed, shape: 'bubble', r: R(c, 6, 11), kind: cy ? 'cyan' : 'white', update: (b) => { b.vx = Math.sin(b.age * 3 + x) * 25; } });
      yield 0.25 / c.d;
    }
    yield 1.8;
  },

  *gloop_drops(c) {
    for (let i = 0; i < Math.round(7 * c.d); i++) {
      const [x, y] = edgePoint(c, 'top', R(c, 0.1, 0.9));
      c.spawn({
        x, y, vy: 90 * c.speed, r: 9, color: '#8aff9a', update: (b, dt, board) => {
          if (!b.split && b.y > board.box.y + board.box.h * 0.55) {
            b.split = true; b.dead = true;
            for (const s of [-1, 1]) board.spawn({ x: b.x, y: b.y, vx: s * 90, vy: -60, ay: 200, r: 5, color: '#8aff9a' });
          }
        },
      });
      yield 0.6 / c.d;
    }
    yield 1.8;
  },

  *notes(c, p = {}) {
    const gentle = p.gentle;
    for (let i = 0; i < Math.round((gentle ? 8 : 14) * c.d); i++) {
      const left = c.rng.chance(0.5);
      const [x, y] = edgePoint(c, left ? 'left' : 'right', R(c, 0.15, 0.85));
      const ph = R(c, 0, TAU);
      c.spawn({ x, y, vx: (left ? 1 : -1) * (gentle ? 60 : 100) * c.speed, shape: 'note', w: 12, h: 16, kind: gentle && c.rng.chance(0.3) ? 'green' : 'white', heal: 1, update: (b) => { b.vy = Math.sin(b.age * 4 + ph) * 50; } });
      yield (gentle ? 0.5 : 0.3) / c.d;
    }
    yield 1.6;
  },

  // Maris: green-soul spears from four sides.
  *spear_guard(c, p = {}) {
    c.setMode('guard');
    yield 0.6;
    const n = p.count ?? 14;
    const dirs = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
    let interval = p.interval ?? 0.55;
    for (let i = 0; i < n; i++) {
      const d = c.rng.pick(dirs);
      const dist = 150;
      const cx = c.soul.x, cy = c.soul.y;
      const x = cx + Math.cos(d) * dist, y = cy + Math.sin(d) * dist;
      const sp = (p.speed ?? 170) * c.speed;
      const spear = c.spawn({ x, y, vx: -Math.cos(d) * sp, vy: -Math.sin(d) * sp, w: 10, h: 26, shape: 'arrow', rot: d - Math.PI / 2, color: '#46e6ff', keep: true, life: 3, destroyable: false });
      if (p.reverse && c.rng.chance(0.25)) {
        spear.color = '#ffe81f';
        spear.update = (b) => { if (!b.flipped && Math.hypot(b.x - cx, b.y - cy) < 60) { b.flipped = true; b.x = cx - (b.x - cx); b.y = cy - (b.y - cy); b.rot += Math.PI; } };
      }
      sfx.spearAppear();
      yield interval;
      interval = Math.max(0.28, interval * 0.97);
    }
    yield 1.1;
  },

  *spear_rain(c) {
    const b = c.box;
    for (let i = 0; i < Math.round(10 * c.d); i++) {
      const x = R(c, b.x + 10, b.x + b.w - 10);
      c.spawn({ x, y: b.y - 20, w: 8, h: 30, shape: 'spear', color: '#46e6ff', warn: 0.45, vy: 320 * c.speed, destroyable: false, drawWarn: (g, bb) => { g.save(); g.globalAlpha = 0.5; g.fillStyle = '#46e6ff'; g.fillRect(bb.x - 1, b.y, 2, b.h); g.restore(); } });
      yield 0.3 / c.d;
    }
    yield 1.2;
  },

  *spear_rows(c) {
    const b = c.box;
    for (let i = 0; i < 5; i++) {
      const gap = c.rng.int(0, 5);
      for (let k = 0; k < 6; k++) {
        if (k === gap) continue;
        const x = b.x + ((k + 0.5) / 6) * b.w;
        c.spawn({ x, y: b.y + b.h + 20, w: 8, h: 30, shape: 'spear', color: '#46e6ff', warn: 0.5, vy: -330 * c.speed, destroyable: false, drawWarn: (g, bb) => { g.save(); g.globalAlpha = 0.35; g.fillStyle = '#ff4a4a'; g.fillRect(bb.x - 10, b.y + b.h - 8, 20, 8); g.restore(); } });
      }
      yield 0.95;
    }
    yield 1.2;
  },

  // ---------------- Emberdeep ----------------
  *lava_spit(c) {
    const b = c.box;
    for (let i = 0; i < Math.round(9 * c.d); i++) {
      const x = R(c, b.x + 20, b.x + b.w - 20);
      c.spawn({ x, y: b.y + b.h + 10, vx: R(c, -40, 40), vy: -R(c, 260, 330), ay: 300, shape: 'fire', w: 12, h: 16, color: '#ff7a2a' });
      yield 0.4 / c.d;
    }
    yield 1.8;
  },

  *planes(c) {
    const b = c.box;
    for (let i = 0; i < Math.round(8 * c.d); i++) {
      const left = c.rng.chance(0.5);
      const y = R(c, b.y + 10, b.y + b.h * 0.5);
      c.spawn({
        x: left ? b.x - 10 : b.x + b.w + 10, y, vx: (left ? 1 : -1) * 140 * c.speed, w: 14, h: 14, shape: 'plane', rot: left ? Math.PI / 2 : -Math.PI / 2,
        update: (bb, dt, board) => { bb.bomb = (bb.bomb ?? R(c, 0.4, 1.2)) - dt; if (bb.bomb <= 0) { bb.bomb = 99; board.spawn({ x: bb.x, y: bb.y, vy: 60, ay: 200, r: 4 }); } },
      });
      yield 0.5 / c.d;
    }
    yield 1.8;
  },

  *steam_jets(c) {
    const b = c.box;
    for (let i = 0; i < 5; i++) {
      const y = R(c, b.y + 20, b.y + b.h - 20);
      const left = c.rng.chance(0.5);
      beam(c, b.x + b.w / 2, y, 0, b.w + 40, 18, { warn: 0.6, life: 0.4, color: '#e8f4ff' });
      void left;
      yield 0.9;
    }
    yield 1;
  },

  *guard_combo(c) {
    yield* PATTERNS.aimed(c, { count: 8, speed: 170, shape: 'arrow', w: 10, h: 22, interval: 0.35 });
  },

  // Madame Silk: purple web lanes.
  *silk_lanes(c, p = {}) {
    c.setMode('lanes', { n: 3 });
    yield 0.5;
    const b = c.box;
    const n = Math.round((p.count ?? 14) * c.d);
    for (let i = 0; i < n; i++) {
      const lane = c.rng.int(0, 2);
      const y = b.y + (b.h * (lane + 1)) / 4;
      const left = c.rng.chance(0.5);
      const croiss = c.rng.chance(0.3);
      c.spawn({ x: left ? b.x - 10 : b.x + b.w + 10, y, vx: (left ? 1 : -1) * R(c, 100, 160) * c.speed, shape: croiss ? 'croissant' : 'spider', w: 16, h: 14, r: croiss ? undefined : 7, color: croiss ? '#ffb05a' : '#d8a8ff' });
      yield 0.4 / c.d;
    }
    yield 1.4;
  },

  // LUXE: shooter mode, targets that must be shot, plus legs.
  *luxe_targets(c) {
    c.setMode('shooter');
    yield 0.5;
    const b = c.box;
    for (let i = 0; i < 5; i++) {
      const x = R(c, b.x + 20, b.x + b.w - 20);
      c.spawn({
        x, y: b.y + 18, r: 12, target: true, hp: 3, color: '#ff5ad0', shape: 'star', keep: true, life: 5, vy: 22, destroyable: false,
        onShot: (bb, board) => { bb.hp--; board.pop(bb.x, bb.y, '#ff5ad0'); if (bb.hp <= 0) { bb.dead = true; board.b.boost?.(); sfx.pop(); } },
        update: (bb, dt, board) => { if (bb.y > board.box.y + board.box.h - 16) { bb.dead = true; for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; board.spawn({ x: bb.x, y: bb.y, vx: Math.cos(a) * 120, vy: Math.sin(a) * 120, r: 4, color: '#ff5ad0' }); } sfx.explosion(); } },
      });
      yield 0.9;
    }
    yield 2.5;
  },

  *luxe_legs(c) {
    const b = c.box;
    for (let i = 0; i < 6; i++) {
      const left = i % 2 === 0;
      const y = R(c, b.y + b.h * 0.2, b.y + b.h * 0.8);
      c.spawn({ x: left ? b.x - 30 : b.x + b.w + 30, y, w: 60, h: 14, shape: 'block', color: '#ffe8f8', warn: 0.35, vx: (left ? 1 : -1) * 260 * c.speed, destroyable: false, keep: true });
      yield 0.55;
    }
    yield 1.4;
  },

  *luxe_disco(c) {
    const b = c.box;
    for (let i = 0; i < 6; i++) {
      const kind = i % 2 ? 'cyan' : 'orange';
      const vert = c.rng.chance(0.5);
      if (vert) beam(c, R(c, b.x + 20, b.x + b.w - 20), b.y + b.h / 2, Math.PI / 2, b.h + 40, 22, { kind, warn: 0.5, life: 0.6 });
      else beam(c, b.x + b.w / 2, R(c, b.y + 20, b.y + b.h - 20), 0, b.w + 40, 22, { kind, warn: 0.5, life: 0.6 });
      yield 0.75;
    }
    yield 1;
  },

  // ---------------- Deep lab ----------------
  *melt(c) {
    for (let i = 0; i < Math.round(12 * c.d); i++) {
      const [x, y] = edgePoint(c, 'top', R(c, 0.1, 0.9));
      c.spawn({ x, y, vy: 40, ay: 120, shape: 'drop', w: 10, h: 16, color: '#e8e0d8', update: (b) => { b.w = 10 + Math.sin(b.age * 6) * 2; } });
      yield 0.3 / c.d;
    }
    yield 2;
  },

  *static_blocks(c) {
    const b = c.box;
    for (let i = 0; i < 6; i++) {
      for (let k = 0; k < 3; k++) {
        const x = R(c, b.x + 12, b.x + b.w - 12), y = R(c, b.y + 12, b.y + b.h - 12);
        c.spawn({ x, y, w: 22, h: 22, shape: 'block', color: '#c8c8c8', warn: 0.6, life: 0.5, destroyable: false });
      }
      yield 0.7;
    }
    yield 1.2;
  },

  // ---------------- King Oakheart ----------------
  *king_rings(c, p = {}) {
    const b = c.box;
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    for (let wv = 0; wv < (p.waves ?? 4); wv++) {
      const n = 22;
      const gap = c.rng.int(0, n - 1);
      const kind = p.mixed ? c.rng.pick(['white', 'cyan', 'orange']) : 'white';
      for (let i = 0; i < n; i++) {
        if (Math.abs(i - gap) <= 1) continue;
        const a = (i / n) * TAU;
        const r0 = 170;
        c.spawn({ x: cx + Math.cos(a) * r0, y: cy + Math.sin(a) * r0, r: 7, shape: 'fire', color: kind === 'white' ? '#ffb05a' : undefined, kind, keep: true, life: 4, a, r0, update: (bb) => { const rr = bb.r0 - bb.age * 70 * c.speed; bb.x = cx + Math.cos(bb.a + bb.age * 0.4) * rr; bb.y = cy + Math.sin(bb.a + bb.age * 0.4) * rr; if (rr < 4) bb.dead = true; } });
      }
      yield 1.5;
    }
    yield 1.5;
  },

  *king_trident(c) {
    const b = c.box;
    for (let i = 0; i < 4; i++) {
      const vert = i % 2 === 1;
      const pos = vert ? c.soul.x : c.soul.y;
      if (vert) beam(c, pos, b.y + b.h / 2, Math.PI / 2, b.h + 40, 34, { warn: 0.7, life: 0.35, color: '#ffd84a' });
      else beam(c, b.x + b.w / 2, pos, 0, b.w + 40, 34, { warn: 0.7, life: 0.35, color: '#ffd84a' });
      yield 1.0;
    }
    yield 0.8;
  },

  // ---------------- Sprig, with every soul ----------------
  *sf_vines(c) {
    const b = c.box;
    for (let i = 0; i < 7; i++) {
      const side = c.rng.pick(['left', 'right', 'top', 'bottom']);
      const t = c.soul.x;
      const horiz = side === 'left' || side === 'right';
      const pos = horiz ? c.soul.y : t;
      if (horiz) beam(c, b.x + b.w / 2, pos, 0, b.w + 40, 20, { warn: 0.55, life: 0.4, color: '#6aff6a' });
      else beam(c, pos, b.y + b.h / 2, Math.PI / 2, b.h + 40, 20, { warn: 0.55, life: 0.4, color: '#6aff6a' });
      yield 0.6;
    }
    yield 0.8;
  },

  *sf_storm(c) { yield* PATTERNS.spiral(c, { shape: 'pellet', r: 5, speed: 120, arms: 4, turn: 0.28, time: 4 }); },

  *sf_fire(c) {
    const b = c.box;
    for (let i = 0; i < 40; i++) {
      const y = b.y + b.h / 2 + Math.sin(i * 0.3) * b.h * 0.4;
      c.spawn({ x: b.x + b.w + 10, y, vx: -220 * c.speed, shape: 'fire', w: 14, h: 18, color: '#ff7a2a', rot: -Math.PI / 2 });
      yield 0.09;
    }
    yield 1.2;
  },

  // ---------------- Rowan, Heart of Seven ----------------
  *rowan_stars(c) {
    const b = c.box;
    for (let i = 0; i < 6; i++) {
      const x = R(c, b.x + 20, b.x + b.w - 20), y = b.y + 10;
      const col = c.rng.pick(['#ff2a2a', '#ff9a1f', '#ffe81f', '#35ff58', '#46e6ff', '#2f6dff', '#c95cff']);
      c.spawn({
        x, y, r: 10, shape: 'star', color: col, vy: 60, vrot: 3, update: (bb, dt, board) => {
          if (!bb.burst && bb.age > 0.9) {
            bb.burst = true; bb.dead = true;
            for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; board.spawn({ x: bb.x, y: bb.y, vx: Math.cos(a) * 110, vy: Math.sin(a) * 110, r: 4, shape: 'star', color: col }); }
          }
        },
      });
      yield 0.7;
    }
    yield 1.6;
  },

  *rowan_rainbow(c) {
    const b = c.box;
    const cols = ['#ff2a2a', '#ff9a1f', '#ffe81f', '#35ff58', '#46e6ff', '#2f6dff', '#c95cff'];
    for (let i = 0; i < 7; i++) {
      const x = b.x + ((i + 0.5) / 7) * b.w;
      if (i === 3) continue;
      beam(c, x, b.y + b.h / 2, Math.PI / 2, b.h + 40, b.w / 8, { warn: 0.8 + i * 0.05, life: 0.5, color: cols[i] });
    }
    yield 1.8;
    for (let i = 0; i < 7; i++) {
      const y = b.y + ((i + 0.5) / 7) * b.h;
      if (i === 5) continue;
      beam(c, b.x + b.w / 2, y, 0, b.w + 40, b.h / 8, { warn: 0.8, life: 0.5, color: cols[i] });
    }
    yield 1.8;
  },

  *rowan_hearts(c) {
    yield* PATTERNS.spiral(c, { shape: 'heart', r: 7, speed: 95, arms: 3, turn: 0.4, time: 4.5 });
  },

  // ---------------- Wick, the last flame ----------------
  *wick_lanterns(c, p = {}) {
    const b = c.box;
    const n = p.count ?? 6;
    for (let i = 0; i < n; i++) {
      const side = c.rng.pick(['top', 'left', 'right']);
      let x, y, a;
      if (side === 'top') { x = c.soul.x + R(c, -20, 20); y = b.y - 50; a = Math.PI / 2; }
      else if (side === 'left') { x = b.x - 50; y = c.soul.y + R(c, -20, 20); a = 0; }
      else { x = b.x + b.w + 50; y = c.soul.y + R(c, -20, 20); a = Math.PI; }
      lantern(c, x, y, a, { warn: p.warn ?? 0.7 });
      yield p.interval ?? 0.55;
    }
    yield 1.4;
  },

  *wick_wax(c) {
    const b = c.box;
    for (let i = 0; i < 18; i++) {
      const h = 18 + (Math.sin(i * 0.7) + 1) * 26;
      const kind = i % 6 === 5 ? 'cyan' : 'white';
      c.spawn({ x: b.x + b.w + 10, y: b.y + b.h - h / 2, w: 11, h, shape: 'wax', kind, vx: -230 * c.speed, destroyable: false, keep: true, life: 5 });
      c.spawn({ x: b.x + b.w + 10, y: b.y + (b.h - h - 58) / 2, w: 11, h: Math.max(4, b.h - h - 58), shape: 'wax', kind, vx: -230 * c.speed, destroyable: false, keep: true, life: 5 });
      yield 0.14;
    }
    yield 1.6;
  },

  *wick_slam(c) {
    const dirs = ['down', 'left', 'up', 'right'];
    const b = c.box;
    for (let i = 0; i < 4; i++) {
      const d = dirs[i];
      c.setMode('gravity', { dir: 'down' });
      c.soul.vy = 600;
      sfx.impact();
      c.shake?.(0.25);
      for (let k = 0; k < 10; k++) {
        const x = b.x + ((k + 0.5) / 10) * b.w;
        c.spawn({ x, y: b.y + b.h - 10, w: 10, h: 26, shape: 'wax', warn: 0.4, life: 0.6, destroyable: false, drawWarn: (g, bb) => { g.save(); g.globalAlpha = 0.4; g.fillStyle = '#ff4a4a'; g.fillRect(bb.x - 5, b.y + b.h - 6, 10, 6); g.restore(); } });
      }
      void d;
      yield 1.1;
    }
    c.setMode('free');
    yield 0.6;
  },

  *wick_combo(c) {
    yield* PATTERNS.wick_lanterns(c, { count: 4, interval: 0.45 });
    yield* PATTERNS.walls(c, { count: 4, speed: 200, gap: 40, interval: 0.7 });
  },

  // Nothing. For monsters who don't fight.
  *nothing() { yield 0.5; },
};
