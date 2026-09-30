// The bullet board: box, SOUL physics, the seven SOUL actions, bullets,
// collision and grazing. All coordinates are virtual (960x540).
import { input } from '../core/input.js';
import { S, settings } from '../core/save.js';
import { hasSkill, maxHp, def as playerDef } from '../data/stats.js';
import { ITEMS } from '../data/items.js';
import { SOULS } from '../data/souls.js';
import { sfx } from '../audio/sfx.js';
import { sprite, KIND_COLORS } from './sprites.js';
import { game } from '../core/game.js';

const TAU = Math.PI * 2;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

export const MENU_BOX = { x: 48, y: 262, w: 864, h: 150 };

export class Board {
  constructor(battle) {
    this.b = battle;
    this.box = { ...MENU_BOX };
    this.target = { ...MENU_BOX };
    this.bullets = [];
    this.fx = [];
    this.soul = {
      x: 480, y: 337, r: 6, vx: 0, vy: 0, inv: 0, visible: false,
      mode: 'free', grounded: false, jumps: 0, gdir: 'down', facing: -Math.PI / 2,
      moving: false, stillT: 0, cd: 0, act: 0, focus: 2.5, anchor: null, shieldOn: false,
      dash: 0, dashDir: [0, 0], blockCount: 0, breakCount: 0, lane: 1, lanes: 3, guardDir: 0,
    };
    this.timeScale = 1;
    this.grey = 0;
    this.t = 0;
    this.shots = [];
    this.refused = false;
  }

  soulColor() {
    const s = this.soul;
    if (s.mode === 'gravity') return '#2f6dff';
    if (s.mode === 'guard') return '#35ff58';
    if (s.mode === 'lanes') return '#c95cff';
    if (s.mode === 'shooter') return '#ffe81f';
    return SOULS[S.soul].color;
  }

  resize(w, h, cx = 480, cy = 337) {
    this.target = { x: cx - w / 2, y: cy - h / 2, w, h };
  }
  resetBox() { this.target = { ...MENU_BOX }; }

  get boxSettled() {
    const a = this.box, t = this.target;
    return Math.abs(a.x - t.x) + Math.abs(a.y - t.y) + Math.abs(a.w - t.w) + Math.abs(a.h - t.h) < 1;
  }

  placeSoul(x, y) {
    const s = this.soul;
    s.x = x ?? this.target.x + this.target.w / 2;
    s.y = y ?? this.target.y + this.target.h / 2;
    s.vx = s.vy = 0;
    s.anchor = null;
  }

  setMode(mode, opts = {}) {
    const s = this.soul;
    s.mode = mode;
    s.gdir = opts.dir || 'down';
    s.vy = 0;
    s.vx = 0;
    if (mode === 'lanes') { s.lanes = opts.n || 3; s.lane = Math.floor(s.lanes / 2); }
    if (mode === 'guard') { s.x = this.box.x + this.box.w / 2; s.y = this.box.y + this.box.h / 2; s.guardDir = 0; }
    if (opts.flash !== false) sfx.soulBlink();
  }

  // ---------------------------------------------------------------- update
  update(dt, dodging) {
    this.t += dt;
    const k = 1 - Math.exp(-dt * 14);
    for (const key of ['x', 'y', 'w', 'h']) this.box[key] += (this.target[key] - this.box[key]) * k;
    if (!dodging) return;
    const s = this.soul;
    s.inv = Math.max(0, s.inv - dt);
    s.cd = Math.max(0, s.cd - dt);
    s.act = Math.max(0, s.act - dt);
    this.moveSoul(dt);
    this.soulAction(dt);
    this.passives(dt);
    const ts = this.timeScale * (this.b.freeze > 0 ? 0 : 1);
    this.updateBullets(dt * ts, dt);
    this.updateShots(dt);
  }

  moveSoul(dt) {
    const s = this.soul, bx = this.box;
    const ax = input.axis();
    let speed = 150;
    if (S.soul === 'bravery') speed *= hasSkill('br_momentum') ? 1.32 : 1.2;
    if (this.b.fx.speed) speed *= 1.15;
    if (s.shieldOn && !hasSkill('ki_steady')) speed *= 0.5;
    const pad = 8;
    if (s.mode === 'guard') {
      if (input.pressed('up')) s.guardDir = -Math.PI / 2;
      if (input.pressed('down')) s.guardDir = Math.PI / 2;
      if (input.pressed('left')) s.guardDir = Math.PI;
      if (input.pressed('right')) s.guardDir = 0;
      s.x = bx.x + bx.w / 2; s.y = bx.y + bx.h / 2;
      s.moving = false;
      return;
    }
    if (s.mode === 'lanes') {
      if (input.pressed('up')) s.lane = Math.max(0, s.lane - 1);
      if (input.pressed('down')) s.lane = Math.min(s.lanes - 1, s.lane + 1);
      const ly = bx.y + (bx.h * (s.lane + 1)) / (s.lanes + 1);
      s.y += (ly - s.y) * Math.min(1, dt * 25);
      s.x = clamp(s.x + ax.x * speed * dt, bx.x + pad, bx.x + bx.w - pad);
      s.moving = ax.x !== 0;
      return;
    }
    if (s.dash > 0) {
      s.dash -= dt;
      s.x += s.dashDir[0] * 720 * dt;
      s.y += s.dashDir[1] * 720 * dt;
    } else if (s.mode === 'gravity') {
      const g = 980;
      const jumpV = hasSkill('in_feather') ? 380 : 330;
      const maxJumps = S.soul === 'integrity' ? (hasSkill('in_feather') ? 3 : 2) : 1;
      s.x += ax.x * speed * dt;
      s.vy += g * dt;
      if (input.pressed('up') && s.jumps < maxJumps) { s.vy = -jumpV; s.jumps++; s.grounded = false; sfx.jump(); }
      if (!input.held('up') && s.vy < -120) s.vy = -120;
      s.y += s.vy * dt;
      const floor = bx.y + bx.h - pad;
      if (s.y >= floor) { if (!s.grounded && s.vy > 200) sfx.land(); s.y = floor; s.vy = 0; s.grounded = true; s.jumps = 0; }
      // platforms
      for (const b of this.bullets) {
        if (!b.platform || s.vy < 0) continue;
        if (s.x > b.x - b.w / 2 && s.x < b.x + b.w / 2 && s.y >= b.y - b.h / 2 - 7 && s.y <= b.y - b.h / 2 + 6) {
          s.y = b.y - b.h / 2 - 7; s.vy = 0; s.grounded = true; s.jumps = 0; s.x += b.vx * dt;
        }
      }
    } else {
      s.x += ax.x * speed * dt;
      s.y += ax.y * speed * dt;
    }
    s.moving = ax.x !== 0 || ax.y !== 0 || s.dash > 0;
    if (ax.x || ax.y) s.facing = Math.atan2(ax.y, ax.x);
    s.x = clamp(s.x, bx.x + pad, bx.x + bx.w - pad);
    s.y = clamp(s.y, bx.y + pad, bx.y + bx.h - pad);
  }

  // The SOUL's special action on X.
  soulAction(dt) {
    const s = this.soul;
    const kind = S.soul;
    const press = input.pressed('cancel');
    const hold = input.held('cancel');
    if (s.mode === 'shooter' && (input.pressed('confirm') || (kind === 'justice' && press))) { this.fire(); return; }
    if (s.mode === 'guard' || s.mode === 'lanes') return;
    switch (kind) {
      case 'determination':
        if (press && s.cd <= 0) {
          s.act = hasSkill('dt_temper') ? 0.8 : 0.5;
          s.inv = Math.max(s.inv, s.act);
          s.cd = hasSkill('dt_nerve') ? 3 : 4;
          sfx.block();
          this.ring(s.x, s.y, '#ff6a6a');
        }
        break;
      case 'patience': {
        const max = hasSkill('pa_longer') ? 3.5 : 2.5;
        if (hold && s.focus > 0) {
          s.focus = Math.max(0, s.focus - dt);
          this.timeScale = hasSkill('pa_deeper') ? 0.3 : 0.45;
          s.act = 0.1;
          if (press) sfx.magic();
        } else {
          this.timeScale = 1;
          s.focus = Math.min(max, s.focus + dt * 0.5);
        }
        break;
      }
      case 'bravery':
        if (press && s.cd <= 0) {
          const ax = input.axis();
          let dx = ax.x, dy = ax.y;
          if (!dx && !dy) { dx = Math.cos(s.facing); dy = Math.sin(s.facing); }
          const l = Math.hypot(dx, dy) || 1;
          s.dashDir = [dx / l, dy / l];
          s.dash = 0.13;
          s.inv = Math.max(s.inv, hasSkill('br_after') ? 0.35 : 0.2);
          s.cd = hasSkill('br_quick') ? 0.8 : 1.1;
          sfx.dash();
          this.trail = 0.2;
        }
        break;
      case 'integrity':
        if (press && s.cd <= 0) {
          const ax = input.axis();
          let dx = ax.x, dy = ax.y;
          if (!dx && !dy) { dx = 0; dy = -1; }
          const l = Math.hypot(dx, dy) || 1;
          const dist = hasSkill('in_stride') ? 90 : 62;
          this.ring(s.x, s.y, '#6a9aff');
          s.x = clamp(s.x + (dx / l) * dist, this.box.x + 8, this.box.x + this.box.w - 8);
          s.y = clamp(s.y + (dy / l) * dist, this.box.y + 8, this.box.y + this.box.h - 8);
          this.ring(s.x, s.y, '#6a9aff');
          s.cd = hasSkill('in_recover') ? 1.4 : 2;
          if (hasSkill('in_pirouette')) s.inv = Math.max(s.inv, 0.4);
          sfx.blink();
        }
        break;
      case 'perseverance':
        if (press && s.cd <= 0) {
          if (!s.anchor) { s.anchor = { x: s.x, y: s.y }; sfx.select(); }
          else {
            this.ring(s.x, s.y, '#c95cff');
            s.x = s.anchor.x; s.y = s.anchor.y;
            s.anchor = null;
            s.cd = 1.2;
            if (hasSkill('pe_bookmark')) this.b.heal(2, true);
            if (hasSkill('pe_epilogue')) s.inv = Math.max(s.inv, 0.5);
            sfx.blink();
            this.ring(s.x, s.y, '#c95cff');
          }
        }
        break;
      case 'kindness':
        s.shieldOn = hold;
        if (press) sfx.block();
        break;
      case 'justice':
        if (press) this.fire();
        break;
    }
  }

  fire() {
    const s = this.soul;
    if (s.cd > 0) return;
    s.cd = hasSkill('ju_draw') ? 0.16 : 0.24;
    const big = hasSkill('ju_iron');
    const angles = hasSkill('ju_spread') ? [-0.25, 0, 0.25] : [0];
    const dir = s.mode === 'gravity' && s.gdir === 'up' ? Math.PI / 2 : -Math.PI / 2;
    for (const a of angles) {
      this.shots.push({ x: s.x, y: s.y - 6, vx: Math.cos(dir + a) * 560, vy: Math.sin(dir + a) * 560, r: big ? 7 : 4, pierce: big ? 3 : 1, life: 1 });
    }
    sfx.shoot();
  }

  updateShots(dt) {
    const bx = this.box;
    for (const sh of this.shots) {
      sh.x += sh.vx * dt; sh.y += sh.vy * dt; sh.life -= dt;
      if (sh.y < bx.y - 30 || sh.y > bx.y + bx.h + 30) sh.life = 0;
      for (const b of this.bullets) {
        if (b.dead || sh.life <= 0) continue;
        if (b.target) {
          if (this.hitTest(b, sh.x, sh.y, sh.r)) { b.onShot?.(b, this); sh.pierce--; if (sh.pierce <= 0) sh.life = 0; }
          continue;
        }
        if (b.destroyable === false || (b.r ?? Math.max(b.w, b.h) / 2) > 22 || b.laser) continue;
        if (this.hitTest(b, sh.x, sh.y, sh.r)) {
          b.dead = true;
          this.pop(b.x, b.y, b.color || '#fff');
          sh.pierce--;
          if (sh.pierce <= 0) sh.life = 0;
          this.b.gainResolve(S.soul === 'justice' ? 2 : 1);
          if (hasSkill('ju_sharp')) { this.soul.breakCount++; if (this.soul.breakCount % 5 === 0) this.b.heal(1, true); }
        }
      }
    }
    this.shots = this.shots.filter((s) => s.life > 0);
  }

  passives(dt) {
    const s = this.soul;
    if (S.soul === 'patience' && s.mode !== 'guard') {
      if (!s.moving) {
        s.stillT += dt;
        const every = hasSkill('pa_serene') ? 0.75 : 1.5;
        if (s.stillT > 0.5) {
          s.regenT = (s.regenT || 0) + dt;
          if (s.regenT >= every) { s.regenT = 0; this.b.heal(1, true); }
        }
      } else { s.stillT = 0; s.regenT = 0; }
    }
    if (this.b.fx.regen) {
      this.regenAcc = (this.regenAcc || 0) + dt;
      if (this.regenAcc > 0.8) { this.regenAcc = 0; this.b.heal(1, true); }
    }
    if (this.trail) this.trail = Math.max(0, this.trail - dt);
  }

  // ---------------------------------------------------------------- bullets
  spawn(b) {
    const d = {
      x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0, rot: 0, vrot: 0, age: 0, life: 12, dmg: this.b.curAtk,
      kind: 'white', shape: 'orb', r: 6, alpha: 1, graze: true, grazeT: 0, warn: 0, outside: true, ...b,
    };
    if (!d.color) d.color = KIND_COLORS[d.kind] || '#fff';
    if (d.w !== undefined && d.h !== undefined && b.r === undefined) d.r = undefined;
    this.bullets.push(d);
    return d;
  }

  updateBullets(dt, realDt) {
    const s = this.soul, bx = this.box;
    for (const b of this.bullets) {
      if (b.dead) continue;
      b.age += dt;
      if (b.warn > 0) { b.warn -= dt; if (b.onWarnUpdate) b.onWarnUpdate(b, dt); continue; }
      if (b.update) b.update(b, dt, this);
      b.vx += b.ax * dt; b.vy += b.ay * dt;
      b.x += b.vx * dt; b.y += b.vy * dt;
      b.rot += b.vrot * dt;
      if (b.age > b.life) b.dead = true;
      const m = 120;
      if (b.age > 0.5 && !b.keep && (b.x < bx.x - m || b.x > bx.x + bx.w + m || b.y < bx.y - m || b.y > bx.y + bx.h + m)) b.dead = true;
      if (b.dead || b.harmless || b.target || b.platform) continue;
      // shield (kindness / guard)
      if ((s.shieldOn || s.mode === 'guard' || this.b.fx.aegis > 0) && !b.unblockable && this.shieldHit(b)) {
        b.dead = true;
        this.pop(b.x, b.y, '#35ff58');
        sfx.block();
        this.b.gainResolve(1.5);
        if (hasSkill('ki_reflect')) { s.blockCount++; if (s.blockCount % 3 === 0) this.b.heal(1, true); }
        continue;
      }
      // bravery: blaze trail burns small bullets during dash
      if (s.dash > 0 && hasSkill('br_blaze') && (b.r ?? 99) <= 10 && this.hitTest(b, s.x, s.y, 14)) { b.dead = true; this.pop(b.x, b.y, '#ff9a1f'); continue; }
      const hit = this.hitTest(b, s.x, s.y, s.r);
      if (hit) {
        if (b.kind === 'cyan' && !s.moving) { if (S.soul === 'patience' && hasSkill('pa_unhurried') && !b.healed) { b.healed = true; this.b.heal(1, true); } continue; }
        if (b.kind === 'orange' && s.moving) continue;
        if (b.kind === 'green') { b.dead = true; this.b.heal(b.heal ?? 1, false); sfx.heal(); continue; }
        if (s.inv > 0) continue;
        this.b.hurt(b.dmg, b);
        if (b.pierceHit !== true) b.dead = b.destroyOnHit !== false ? true : b.dead;
      } else if (b.graze && b.grazeT <= 0 && this.hitTest(b, s.x, s.y, s.r + 14)) {
        b.grazeT = 0.4;
        this.b.gainResolve(S.soul === 'determination' && hasSkill('dt_ember') ? 2.2 : 1.5);
        this.grazeFlash = 0.15;
        sfx.graze();
        if (this.grey > 0) { const g = Math.min(1, this.grey); this.grey -= g; this.b.heal(g, true); }
      }
      if (b.grazeT > 0) b.grazeT -= realDt;
    }
    this.bullets = this.bullets.filter((b) => !b.dead);
  }

  shieldHit(b) {
    const s = this.soul;
    const R = 26;
    const dx = b.x - s.x, dy = b.y - s.y;
    const d = Math.hypot(dx, dy);
    const br = b.r ?? Math.min(b.w, b.h) / 2;
    if (d > R + br || d < R - br - 10) return false;
    if (this.b.fx.aegis > 0) return true;
    const ang = Math.atan2(dy, dx);
    const face = s.mode === 'guard' ? s.guardDir : s.facing;
    let diff = Math.abs(((ang - face) % TAU + TAU * 1.5) % TAU - Math.PI);
    const arc = s.mode === 'guard' ? 0.8 : hasSkill('ki_wide') ? 1.25 : 0.9;
    return diff < arc;
  }

  hitTest(b, px, py, pr) {
    if (b.r !== undefined) {
      const dx = px - b.x, dy = py - b.y;
      return dx * dx + dy * dy < (b.r + pr) * (b.r + pr) * 0.85;
    }
    // rotated rectangle
    const c = Math.cos(-b.rot), sn = Math.sin(-b.rot);
    const lx = (px - b.x) * c - (py - b.y) * sn;
    const ly = (px - b.x) * sn + (py - b.y) * c;
    const hw = b.w / 2 - 1, hh = b.h / 2 - 1;
    const cx = clamp(lx, -hw, hw), cy = clamp(ly, -hh, hh);
    return (lx - cx) ** 2 + (ly - cy) ** 2 < pr * pr;
  }

  clear() { this.bullets = []; this.shots = []; this.timeScale = 1; }

  ring(x, y, color) { this.fx.push({ type: 'ring', x, y, color, t: 0, life: 0.35 }); }
  pop(x, y, color) { this.fx.push({ type: 'pop', x, y, color, t: 0, life: 0.25 }); }

  // ---------------------------------------------------------------- draw
  draw(ui, opts = {}) {
    const g = ui.ctx, bx = this.box;
    // box
    g.save();
    g.fillStyle = '#000';
    g.fillRect(bx.x, bx.y, bx.w, bx.h);
    g.restore();
    if (opts.dodging) {
      // lane lines
      const s = this.soul;
      if (s.mode === 'lanes') {
        g.save();
        g.strokeStyle = '#c95cff';
        g.lineWidth = 2;
        for (let i = 0; i < s.lanes; i++) {
          const y = bx.y + (bx.h * (i + 1)) / (s.lanes + 1);
          g.beginPath(); g.moveTo(bx.x, y); g.lineTo(bx.x + bx.w, y); g.stroke();
        }
        g.restore();
      }
      g.save();
      g.beginPath();
      g.rect(bx.x - 200, bx.y - 200, bx.w + 400, bx.h + 400);
      g.clip();
      this.drawBullets(ui);
      g.restore();
    }
    // border on top so bullets appear to enter the box
    g.save();
    g.strokeStyle = '#fff';
    g.lineWidth = 5;
    g.strokeRect(bx.x - 2.5, bx.y - 2.5, bx.w + 5, bx.h + 5);
    g.restore();
    if (opts.dodging) this.drawSoul(ui);
    this.drawFx(ui);
  }

  drawBullets(ui) {
    const g = ui.ctx;
    for (const b of this.bullets) {
      const w = b.r !== undefined ? b.r * 2 : b.w;
      const h = b.r !== undefined ? b.r * 2 : b.h;
      let alpha = b.alpha;
      if (b.warn > 0) {
        if (b.drawWarn) { b.drawWarn(g, b); continue; }
        alpha *= 0.3 + 0.3 * Math.sin(b.age * 30);
      }
      if (b.draw) { b.draw(g, b, this); continue; }
      const col = b.kind === 'white' ? (b.color || '#fff') : KIND_COLORS[b.kind];
      const sp = sprite(b.shape, Math.max(2, Math.round(w)), Math.max(2, Math.round(h)), col, b.glow ?? 6);
      g.save();
      g.globalAlpha = Math.max(0, Math.min(1, alpha * Math.min(1, b.age * 8 + (b.warn ? 1 : 0))));
      g.translate(b.x, b.y);
      g.rotate(b.rot);
      g.drawImage(sp.canvas, -sp.w / 2 - sp.pad, -sp.h / 2 - sp.pad);
      g.restore();
    }
    for (const sh of this.shots) {
      g.save();
      g.fillStyle = '#ffe81f';
      g.shadowColor = '#ffe81f';
      g.shadowBlur = 8;
      g.beginPath(); g.arc(sh.x, sh.y, sh.r, 0, TAU); g.fill();
      g.restore();
    }
  }

  drawSoul(ui) {
    const s = this.soul, g = ui.ctx;
    const col = this.soulColor();
    // anchor marker
    if (s.anchor) {
      g.save();
      g.strokeStyle = '#c95cff';
      g.globalAlpha = 0.6 + Math.sin(this.t * 6) * 0.3;
      g.lineWidth = 2;
      g.beginPath(); g.arc(s.anchor.x, s.anchor.y, 9, 0, TAU); g.stroke();
      g.beginPath(); g.moveTo(s.anchor.x, s.anchor.y - 12); g.lineTo(s.anchor.x, s.anchor.y + 12); g.stroke();
      g.restore();
    }
    // shield arc
    if (s.shieldOn || s.mode === 'guard' || this.b.fx.aegis > 0) {
      g.save();
      g.strokeStyle = '#35ff58';
      g.shadowColor = '#35ff58';
      g.shadowBlur = 10;
      g.lineWidth = 4;
      g.beginPath();
      if (this.b.fx.aegis > 0) g.arc(s.x, s.y, 26, 0, TAU);
      else {
        const face = s.mode === 'guard' ? s.guardDir : s.facing;
        const arc = s.mode === 'guard' ? 0.8 : hasSkill('ki_wide') ? 1.25 : 0.9;
        g.arc(s.x, s.y, 26, face - arc, face + arc);
      }
      g.stroke();
      g.restore();
    }
    if (s.mode === 'guard') {
      g.save();
      g.strokeStyle = '#35ff58';
      g.globalAlpha = 0.5;
      g.lineWidth = 2;
      g.beginPath(); g.arc(s.x, s.y, 40, 0, TAU); g.stroke();
      g.restore();
    }
    // patience field
    if (this.timeScale < 1) {
      g.save();
      g.strokeStyle = '#46e6ff';
      g.globalAlpha = 0.35;
      g.lineWidth = 2;
      const r = 30 + (this.t * 60) % 40;
      g.beginPath(); g.arc(s.x, s.y, r, 0, TAU); g.stroke();
      g.restore();
    }
    const blink = s.inv > 0 && s.act <= 0 && Math.floor(this.t * 20) % 2 === 0;
    if (!blink) {
      let c = col;
      if (s.act > 0 && S.soul === 'determination') c = '#e8e8f8';
      if (this.trail > 0) {
        for (let i = 1; i <= 3; i++) ui.heart(s.x - s.dashDir[0] * i * 12, s.y - s.dashDir[1] * i * 12, 16, col, { alpha: 0.25 / i });
      }
      const flip = s.mode === 'gravity' && s.gdir === 'up';
      ui.heart(s.x, s.y, 17, c, { glow: this.grazeFlash > 0 ? 12 : 4, rot: flip ? Math.PI : 0 });
    }
    if (this.grazeFlash) this.grazeFlash = Math.max(0, this.grazeFlash - 1 / 60);
  }

  drawFx(ui) {
    const g = ui.ctx;
    for (const f of this.fx) {
      f.t += 1 / 60;
      const k = f.t / f.life;
      g.save();
      g.globalAlpha = 1 - k;
      g.strokeStyle = f.color;
      g.fillStyle = f.color;
      if (f.type === 'ring') { g.lineWidth = 2; g.beginPath(); g.arc(f.x, f.y, 6 + k * 22, 0, TAU); g.stroke(); }
      else { for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU; g.fillRect(f.x + Math.cos(a) * k * 16 - 1.5, f.y + Math.sin(a) * k * 16 - 1.5, 3, 3); } }
      g.restore();
    }
    this.fx = this.fx.filter((f) => f.t < f.life);
  }
}

// Damage the SOUL takes from a hit of strength `atk`.
export function damageFromHit(atk) {
  const d = Math.max(1, Math.round(atk - Math.floor((playerDef() - 10) / 3)));
  return d;
}

export { maxHp, ITEMS, settings, game };
