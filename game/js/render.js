// Canvas renderer: stage, depth-sorted fighters/projectiles, effects and the HUD.
// Reads the sim state only; never mutates it.

import { W, H, ASPECT, STAGE, ARENA, RULES, toScreenY } from './config.js';
import { CHARS } from './chars/index.js';

const FONT = '"Press Start 2P", monospace';

// ------------------------------------------------------------------------------------ assets
const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('failed to load ' + src)); i.src = src; });

function silhouette(img) {
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  x.globalCompositeOperation = 'source-in'; x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
  return c;
}

export async function loadAssets(onProgress) {
  const names = ['sans', 'papyrus', 'fx'];
  const A = { atlas: {}, stage: null };
  let done = 0;
  const tick = () => { done++; if (onProgress) onProgress(done / (names.length + 1)); };
  await Promise.all([
    loadImg('assets/stage/snowdin.webp').then((i) => { A.stage = i; tick(); }),
    ...names.map(async (n) => {
      const [img, meta] = await Promise.all([loadImg(`assets/sprites/${n}.png`), fetch(`assets/sprites/${n}.json`).then((r) => r.json())]);
      A.atlas[n] = { img, white: silhouette(img), frames: meta.frames, scale: meta.scale };
      tick();
    }),
  ]);
  if (document.fonts && document.fonts.load) { try { await document.fonts.load(`16px ${FONT}`); } catch (e) { /* fall back to monospace */ } }
  return A;
}

// ------------------------------------------------------------------------------------ procedural bones
const boneCache = new Map();
function boneSprite(len, cyan) {                    // vertical bone, `len` art-pixels tall, drawn 1px = 1 art pixel
  const key = len + (cyan ? 'c' : 'w');
  if (boneCache.has(key)) return boneCache.get(key);
  const w = 11, h = len + 2;
  const m = new Uint8Array(w * h);                  // 1 = fill, 2 = shade
  const set = (x, y, v) => { if (x >= 0 && x < w && y >= 0 && y < h) m[y * w + x] = v; };
  for (let y = 4; y < h - 5; y++) for (let x = 4; x <= 6; x++) set(x, y, x === 6 ? 2 : 1);
  const knob = (cx, cy) => { for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) if (x * x + y * y <= 5) set(cx + x, cy + y, x >= 1 ? 2 : 1); };
  knob(3, 3); knob(7, 3); knob(3, h - 4); knob(7, h - 4);
  const c = document.createElement('canvas'); c.width = w + 2; c.height = h + 2;
  const g = c.getContext('2d');
  const px = (x, y, col) => { g.fillStyle = col; g.fillRect(x + 1, y + 1, 1, 1); };
  for (let y = -1; y <= h; y++) for (let x = -1; x <= w; x++) {
    const v = x >= 0 && x < w && y >= 0 && y < h ? m[y * w + x] : 0;
    if (v) px(x, y, v === 2 ? (cyan ? '#6fb7e8' : '#cfd3e0') : (cyan ? '#bfeaff' : '#ffffff'));
    else {
      let near = false;
      for (let dy = -1; dy <= 1 && !near; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && xx < w && yy >= 0 && yy < h && m[yy * w + xx]) { near = true; break; } }
      if (near) px(x, y, '#000');
    }
  }
  boneCache.set(key, c);
  return c;
}

// ------------------------------------------------------------------------------------ helpers
export function text(ctx, str, x, y, size, color = '#fff', align = 'left', outline = '#000') {
  ctx.font = `${size}px ${FONT}`; ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
  if (outline) { ctx.lineWidth = Math.max(3, size / 4); ctx.strokeStyle = outline; ctx.lineJoin = 'round'; ctx.strokeText(str, x, y); }
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}
const sx = (x) => x;
const sy = (y) => toScreenY(y);

function poly(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
function capsule(x1, y1, x2, y2, r) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy) || 1, nx = -dy / l * r, ny = dx / l * r;
  return [[x1 + nx, sy(y1 + ny)], [x2 + nx, sy(y2 + ny)], [x2 - nx, sy(y2 - ny)], [x1 - nx, sy(y1 - ny)]];
}

// ------------------------------------------------------------------------------------ renderer
export class Renderer {
  constructor(canvas, assets) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d'); this.A = assets;
    canvas.width = W; canvas.height = H;
    this.ctx.imageSmoothingEnabled = false;
  }

  sprite(ctx, atlasName, name, x, y, { flip = false, alpha = 1, scale = 1, white = 0 } = {}) {
    const at = this.A.atlas[atlasName], m = at.frames[name];
    if (!m) return;
    const S = at.scale * scale;
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    if (flip) ctx.scale(-1, 1);
    ctx.globalAlpha = alpha;
    ctx.drawImage(at.img, m.x, m.y, m.w, m.h, Math.round(-m.ax * S), Math.round(-m.ay * S), Math.round(m.w * S), Math.round(m.h * S));
    if (white > 0) { ctx.globalAlpha = alpha * white; ctx.drawImage(at.white, m.x, m.y, m.w, m.h, Math.round(-m.ax * S), Math.round(-m.ay * S), Math.round(m.w * S), Math.round(m.h * S)); }
    ctx.restore();
  }

  frameHeight(atlasName, name, scale = 1) { const at = this.A.atlas[atlasName], m = at.frames[name]; return m ? m.ay * at.scale * scale : 0; }

  // ---- whole frame -------------------------------------------------------------------------
  draw(s, fx, o = {}) {
    const ctx = this.ctx;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (fx && fx.shake > 0.3) ctx.translate(Math.round((Math.random() - 0.5) * fx.shake * 2), Math.round((Math.random() - 0.5) * fx.shake * 2));
    ctx.drawImage(this.A.stage, 0, 0, W, H);

    this.drawTelegraphs(ctx, s);
    this.drawEntities(ctx, s, fx, o);
    this.drawBeams(ctx, s);
    if (fx) fx.draw(ctx);
    ctx.restore();

    if (fx && fx.flash > 0) { ctx.globalAlpha = Math.min(0.85, fx.flash / 8); ctx.fillStyle = fx.flashColor; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    if (o.hud !== false) {
      this.drawHud(ctx, s, fx, o);
      if (s.cut && s.hitstop > 0) this.drawCutIn(ctx, s);
      if (fx && fx.banner && !(s.cut && s.hitstop > 0)) this.drawBanner(ctx, fx.banner);
    }
    if (o.debug) this.drawDebug(ctx, s, o);
  }

  // ---- ground telegraph lines for blasters while they charge --------------------------------
  drawTelegraphs(ctx, s) {
    for (const p of s.projs) {
      if (p.k !== 'beam' || p.t >= p.a0) continue;
      const k = p.t / p.a0;
      const x1 = p.x + p.dx * p.mo, y1 = p.y + p.dy * p.mo, x2 = x1 + p.dx * p.bl, y2 = y1 + p.dy * p.bl;
      ctx.save();
      ctx.globalAlpha = 0.10 + 0.28 * k * k;
      ctx.fillStyle = '#ff6a8a';
      poly(ctx, capsule(x1, y1, x2, y2, p.r * 0.9)); ctx.fill();
      ctx.globalAlpha = 0.25 + 0.5 * k;
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.setLineDash([10, 10]);
      ctx.beginPath(); ctx.moveTo(x1, sy(y1)); ctx.lineTo(x2, sy(y2)); ctx.stroke();
      ctx.restore();
    }
  }

  // ---- fighters + projectile sprites, sorted by depth ---------------------------------------
  drawEntities(ctx, s, fx, o) {
    const list = [];
    // shadows first
    for (const f of s.fighters) {
      if (f.st === 'dead' || f.st === 'fall' || (f.st === 'spawn' && f.sf < 30)) continue;
      const C = CHARS[f.char], rx = C.hr * 1.15 * (f.st === 'spawn' ? Math.min(1, (f.sf - 30) / 34) : 1);
      ctx.fillStyle = 'rgba(0,0,0,0.38)';
      ctx.beginPath(); ctx.ellipse(sx(f.x), sy(f.y) + 2, rx, rx * 0.42, 0, 0, Math.PI * 2); ctx.fill();
    }
    for (const f of s.fighters) list.push({ y: f.y, f: true, ref: f });
    for (const p of s.projs) {
      if (p.k === 'beam') list.push({ y: p.y, ref: p, kind: 'blaster' });
      else if (p.k === 'burst') list.push({ y: p.y, ref: p, kind: 'burst' });
      else if (p.k === 'orb') list.push({ y: p.y + 30, ref: p, kind: 'orb' });
    }
    list.sort((a, b) => a.y - b.y);
    for (const it of list) {
      if (it.f) this.drawFighter(ctx, s, it.ref, fx, o);
      else if (it.kind === 'blaster') this.drawBlaster(ctx, it.ref);
      else if (it.kind === 'burst') this.drawBurst(ctx, it.ref);
      else this.drawOrb(ctx, it.ref, s);
    }
  }

  drawFighter(ctx, s, f, fx, o) {
    if (f.st === 'dead') return;
    const C = CHARS[f.char], pose = C.pose(f, s);
    let x = sx(f.x) + (pose.ox || 0), y = sy(f.y) + (pose.oy || 0);
    let alpha = pose.a === undefined ? 1 : pose.a, scale = 1;

    if (f.st === 'spawn') {                                    // light pillar, then drop in
      const k = f.sf;
      if (k < 30) { ctx.fillStyle = `rgba(190,235,255,${0.15 + 0.35 * (k / 30)})`; ctx.fillRect(x - 22, y - 260, 44, 262); return; }
      const d = (k - 30) / (RULES.spawnFrames - 30);
      y -= Math.pow(1 - Math.min(1, d), 2) * 220;
      ctx.fillStyle = `rgba(190,235,255,${0.35 * (1 - d)})`; ctx.fillRect(x - 22, y - 260, 44, 262);
    } else if (f.inv > 0 && f.st !== 'dodge' && f.st !== 'atk' && f.st !== 'fall') {
      alpha *= ((s.frame >> 2) & 1) ? 0.45 : 0.9;              // spawn protection blink
    }
    if (f.st === 'fall') {
      const grow = f.vy > 0 ? 1 : -1;
      scale = Math.max(0.35, Math.min(2, 1 + grow * 0.012 * f.sf));
      alpha *= Math.max(0, 1 - f.sf / (RULES.fallFrames + 6));
    }

    // afterimages while launched / dodging
    if (fx && (f.st === 'launch' || f.st === 'dodge')) {
      const tr = fx.trail[f.i];
      for (let i = 0; i < tr.length - 1; i++) this.sprite(ctx, C.atlas, pose.n, sx(tr[i].x), sy(tr[i].y), { flip: pose.flip, alpha: 0.12 + 0.05 * i, scale });
    }

    // guard bubble
    if (f.st === 'guard') {
      const r = C.hr * 1.9, pf = f.gdT <= 6;
      ctx.save();
      ctx.fillStyle = pf ? 'rgba(255,255,255,0.45)' : `rgba(120,200,255,${0.14 + 0.2 * (f.gd / 100)})`;
      ctx.strokeStyle = pf ? '#ffffff' : 'rgba(170,225,255,0.9)'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.ellipse(x, y - 34, r, r * 1.25, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.restore();
    }

    const white = fx && fx.flashFighter[f.i] > 0 ? 0.85 : 0;
    this.sprite(ctx, C.atlas, pose.n, x, y, { flip: pose.flip, alpha, scale, white });

    // tag above the head
    if (o.labels && f.st !== 'fall' && f.st !== 'spawn') {
      const h = this.frameHeight(C.atlas, pose.n) + 16;
      const col = f.i === 0 ? '#ff5a5a' : '#5ab0ff';
      ctx.fillStyle = col; ctx.strokeStyle = '#000'; ctx.lineWidth = 3;
      const tx = Math.round(sx(f.x)), ty = Math.round(sy(f.y) - h);
      ctx.beginPath(); ctx.moveTo(tx - 7, ty - 8); ctx.lineTo(tx + 7, ty - 8); ctx.lineTo(tx, ty); ctx.closePath(); ctx.stroke(); ctx.fill();
      text(ctx, o.labels[f.i], tx, ty - 12, 8, col, 'center');
    }
    // low guard gauge under the feet
    if (f.gd < 99 && f.st !== 'fall' && f.st !== 'spawn') {
      const gx = Math.round(sx(f.x)) - 22, gy = Math.round(sy(f.y)) + 10;
      ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(gx - 1, gy - 1, 46, 6);
      ctx.fillStyle = f.gd < 30 ? '#ff6a6a' : '#7fd0ff'; ctx.fillRect(gx, gy, Math.round(44 * f.gd / 100), 4);
    }
  }

  drawBlaster(ctx, p) {
    const d = (Math.abs(p.dx) > Math.abs(p.dy) * 1.2) ? (p.dx > 0 ? 'e' : 'w') : (p.dy > 0 ? 's' : 'n');
    const warm = p.a0, big = p.spr === 'giga';
    let frame;
    if (big) {
      const dir = p.dx >= 0 ? 'e' : 'w';
      const k = p.t < warm ? Math.min(3, Math.floor(p.t / warm * 4)) : 4 + ((p.t >> 2) & 1);
      frame = `giga_${dir}${Math.min(5, k)}`;
    } else {
      const k = p.t < warm * 0.55 ? Math.floor(p.t / (warm * 0.55) * 3) : p.t < warm ? 3 : 4 + ((p.t >> 2) & 1);
      frame = `gb_${d}${Math.min(5, k)}`;
    }
    const grow = Math.min(1, p.t / 8);
    const fade = p.t > p.a1 ? Math.max(0, 1 - (p.t - p.a1) / 8) : 1;
    const recoil = p.t >= p.a0 && p.t < p.a1 ? -((p.t - p.a0) % 4 < 2 ? 3 : 0) : 0;
    this.sprite(ctx, 'fx', frame, sx(p.x) - p.dx * recoil, sy(p.y) - 26 - p.dy * recoil * 0.6, { alpha: fade * grow, scale: (big ? 1 : 1) * (0.6 + 0.4 * grow) });
  }

  drawBeams(ctx, s) {
    for (const p of s.projs) {
      if (p.k !== 'beam' || p.t < p.a0 || p.t >= p.a1 + 6) continue;
      const k = Math.min(1, (p.t - p.a0) / (p.a1 - p.a0));
      const w = p.t >= p.a1 ? Math.max(0, 1 - (p.t - p.a1) / 6) * 0.3 : (k < 0.12 ? k / 0.12 : 1 - Math.pow((k - 0.12) / 0.88, 3));
      if (w <= 0.02) continue;
      const x1 = p.x + p.dx * p.mo, y1 = p.y + p.dy * p.mo, x2 = x1 + p.dx * p.bl, y2 = y1 + p.dy * p.bl;
      const fl = 0.9 + 0.1 * ((p.t & 1) ? 1 : -1);
      ctx.save();
      ctx.translate(0, -26);                                  // beam leaves the skull's mouth, not the floor
      ctx.globalAlpha = 0.4; ctx.fillStyle = '#6fd3ff'; poly(ctx, capsule(x1, y1, x2, y2, p.r * 1.45 * w * fl)); ctx.fill();
      ctx.globalAlpha = 0.95; ctx.fillStyle = '#ffffff'; poly(ctx, capsule(x1, y1, x2, y2, p.r * 0.95 * w * fl)); ctx.fill();
      ctx.globalAlpha = 1; ctx.fillStyle = '#ffffff'; poly(ctx, capsule(x1, y1, x2, y2, p.r * 0.55 * w)); ctx.fill();
      // muzzle flare
      ctx.fillStyle = '#e8fbff'; ctx.beginPath(); ctx.ellipse(sx(x1), sy(y1), p.r * 1.3 * w, p.r * 1.3 * w * 0.8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  }

  drawBurst(ctx, p) {
    const cx = sx(p.x), cy = sy(p.y);
    if (p.t < p.a0) {                                         // warning crack
      const k = p.t / p.a0;
      ctx.fillStyle = `rgba(20,24,50,${0.35 + 0.35 * k})`;
      ctx.beginPath(); ctx.ellipse(cx, cy, p.r * (0.4 + 0.6 * k), p.r * ASPECT * (0.4 + 0.6 * k), 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.3 + 0.5 * k})`; ctx.lineWidth = 2; ctx.stroke();
      return;
    }
    const age = p.t - p.a0, life = p.a1 - p.a0, k = age / life;
    const rise = k < 0.3 ? k / 0.3 : k > 0.75 ? Math.max(0, 1 - (k - 0.75) / 0.25) : 1;
    const bones = [[-24, -3, 22], [0, 6, 30], [24, -3, 22]];
    for (const [ox, oy, len] of bones) {
      const spr = boneSprite(len, false), h = Math.round(spr.height * 3 * rise);
      if (h < 3) continue;
      ctx.drawImage(spr, 0, 0, spr.width, Math.max(1, Math.round(spr.height * rise)), Math.round(cx + ox - spr.width * 1.5), Math.round(cy + oy * ASPECT - h), spr.width * 3, h);
    }
  }

  drawOrb(ctx, p, s) {
    const x = sx(p.x), y = sy(p.y) - 30, r = 14 + ((s.frame >> 1) & 1) * 2;
    ctx.save();
    for (let i = 3; i >= 1; i--) { ctx.globalAlpha = 0.1 * i; ctx.fillStyle = '#7fe0ff'; ctx.beginPath(); ctx.arc(x - p.vx * i * 1.6, y - p.vy * i * 1.6 * ASPECT, r - i * 2, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
    this.sprite(ctx, 'papyrus', 'orb', x, y, { scale: 2.4 + ((s.frame >> 2) & 1) * 0.3 });
    ctx.restore();
  }

  // ---- HUD ------------------------------------------------------------------------------------
  drawHud(ctx, s, fx, o) {
    // top gradient so text reads against the sky
    const g = ctx.createLinearGradient(0, 0, 0, 90); g.addColorStop(0, 'rgba(0,0,12,0.65)'); g.addColorStop(1, 'rgba(0,0,12,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, 90);

    for (const f of s.fighters) this.drawPlayerHud(ctx, s, f, fx, o);

    // timer
    const secs = Math.ceil(s.timer / 60);
    ctx.fillStyle = 'rgba(0,0,16,0.75)'; ctx.fillRect(W / 2 - 46, 10, 92, 52);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(W / 2 - 46, 10, 92, 52);
    text(ctx, String(secs).padStart(2, '0'), W / 2, 50, 32, secs <= 10 ? '#ff6a6a' : '#fff', 'center');

    if (o.netInfo) text(ctx, o.netInfo, W / 2, 80, 8, o.netBad ? '#ff9a9a' : '#9fe8ff', 'center');
  }

  drawPlayerHud(ctx, s, f, fx, o) {
    const C = CHARS[f.char], left = f.i === 0;
    const at = this.A.atlas[C.atlas], ic = at.frames.icon;
    const x0 = left ? 18 : W - 18;
    const dir = left ? 1 : -1;
    const col = left ? '#ff5a5a' : '#5ab0ff';

    // ---- top: portrait, name, super meter
    ctx.fillStyle = 'rgba(0,0,16,0.75)'; ctx.fillRect(left ? x0 : x0 - 64, 8, 64, 56);
    ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.strokeRect(left ? x0 : x0 - 64, 8, 64, 56);
    const ih = ic.h * at.scale, iw = ic.w * at.scale, isc = Math.min(1, 48 / Math.max(ih, iw));
    ctx.drawImage(at.img, ic.x, ic.y, ic.w, ic.h, Math.round((left ? x0 + 32 : x0 - 32) - iw * isc / 2), Math.round(36 - ih * isc / 2), Math.round(iw * isc), Math.round(ih * isc));
    const nx = left ? x0 + 74 : x0 - 74;
    text(ctx, (o.names && o.names[f.i]) || C.name, nx, 28, 12, '#fff', left ? 'left' : 'right');
    // meter
    const mw = 230, my = 38, mx = left ? nx : nx - mw;
    ctx.fillStyle = 'rgba(0,0,16,0.8)'; ctx.fillRect(mx - 2, my - 2, mw + 4, 18);
    const full = f.meter >= 100;
    const fill = Math.round(mw * Math.min(100, f.meter) / 100);
    const mg = ctx.createLinearGradient(0, my, 0, my + 14);
    if (full) { const pulse = (s.frame >> 2) & 1; mg.addColorStop(0, pulse ? '#fff6b0' : '#ffe066'); mg.addColorStop(1, pulse ? '#ffb020' : '#ff9a00'); }
    else { mg.addColorStop(0, f.meter >= 50 ? '#6fe0ff' : '#4a90e0'); mg.addColorStop(1, f.meter >= 50 ? '#2a8ed0' : '#2a5db0'); }
    ctx.fillStyle = mg;
    if (left) ctx.fillRect(mx, my, fill, 14); else ctx.fillRect(mx + mw - fill, my, fill, 14);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    for (const q of [0.25, 0.5, 0.75]) ctx.fillRect(Math.round(mx + mw * (left ? q : 1 - q)), my, q === 0.5 ? 3 : 1, 14);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(mx - 2, my - 2, mw + 4, 18);
    text(ctx, full ? 'SUPER READY!' : f.meter >= 50 ? 'BREAK OK' : 'SUPER', left ? mx : mx + mw, my + 34, 8, full ? '#ffe066' : '#bcd4ff', left ? 'left' : 'right');

    // ---- bottom: damage % + stocks
    const pct = Math.floor(f.dmg);
    const pc = pct < 50 ? '#ffffff' : pct < 100 ? '#ffe066' : pct < 150 ? '#ff9a3c' : '#ff4a4a';
    const bx = left ? 26 : W - 26;
    const shake = fx && fx.flashFighter[f.i] > 0 ? ((s.frame & 1) ? 2 : -2) : 0;
    const label = pct + '%';
    text(ctx, label, bx + shake, 652, 32, pc, left ? 'left' : 'right');
    ctx.font = `32px ${FONT}`;
    const tw = ctx.measureText(label).width;
    const w = ic.w * at.scale, h = ic.h * at.scale, sc = Math.min(1, 26 / Math.max(w, h));
    for (let k = 0; k < 3; k++) {
      ctx.globalAlpha = k < f.stocks ? 1 : 0.2;
      const px = left ? bx + tw + 22 + k * 32 : bx - tw - 22 - k * 32 - w * sc;
      ctx.drawImage(at.img, ic.x, ic.y, ic.w, ic.h, Math.round(px), 630, Math.round(w * sc), Math.round(h * sc));
    }
    ctx.globalAlpha = 1;
    // combo counter near the attacker's meter
    if (f.hits >= 2) {
      const pulse = f.lastHit && s.frame - f.lastHit < 8 ? 1 + (8 - (s.frame - f.lastHit)) * 0.03 : 1;
      text(ctx, f.hits + ' HITS', left ? 24 : W - 24, 108, Math.round(20 * pulse / 4) * 4, '#ffe066', left ? 'left' : 'right');
    }
  }

  drawCutIn(ctx, s) {
    const who = s.fighters[s.cut.who], C = CHARS[who.char];
    const k = 1 - s.hitstop / s.cut.n;
    const slide = Math.min(1, k * 5), out = k > 0.85 ? (k - 0.85) / 0.15 : 0;
    ctx.save();
    ctx.globalAlpha = 0.6 * slide * (1 - out); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1 - out;
    const y0 = 230, hh = 190, dir = who.i === 0 ? 1 : -1;
    const off = (1 - slide) * W * -dir;
    ctx.translate(off, 0);
    ctx.fillStyle = C.color || '#3b7be0';
    ctx.beginPath(); ctx.moveTo(-60, y0 + 30); ctx.lineTo(W + 60, y0 - 30); ctx.lineTo(W + 60, y0 + hh - 30); ctx.lineTo(-60, y0 + hh + 30); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.moveTo(-60, y0 + 22); ctx.lineTo(W + 60, y0 - 38); ctx.lineTo(W + 60, y0 - 30); ctx.lineTo(-60, y0 + 30); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-60, y0 + hh + 30); ctx.lineTo(W + 60, y0 + hh - 30); ctx.lineTo(W + 60, y0 + hh - 22); ctx.lineTo(-60, y0 + hh + 38); ctx.fill();
    const px = who.i === 0 ? 250 : W - 250;
    this.sprite(ctx, C.atlas, C.cutPose, px, y0 + hh + 20, { scale: 1.9 + k * 0.25, flip: who.i === 1 && C.cutFlip !== false });
    text(ctx, C.superName, who.i === 0 ? 420 : W - 420, y0 + 112, 34, '#fff', who.i === 0 ? 'left' : 'right');
    text(ctx, C.name + ' SUPER', who.i === 0 ? 424 : W - 424, y0 + 52, 12, '#ffe066', who.i === 0 ? 'left' : 'right');
    ctx.restore();
  }

  drawBanner(ctx, b) {
    const k = b.t / b.dur;
    const pop = b.t < 8 ? 0.6 + b.t / 8 * 0.4 : 1;
    const a = b.dur > 500 ? Math.min(1, b.t / 10) : k > 0.8 ? (1 - k) / 0.2 : 1;
    ctx.save(); ctx.globalAlpha = Math.max(0, a); ctx.translate(W / 2, b.size > 30 ? 290 : 130); ctx.scale(pop, pop);
    text(ctx, b.text, 0, 0, b.size, b.color, 'center');
    ctx.restore();
  }

  drawDebug(ctx, s, o) {
    ctx.save(); ctx.lineWidth = 1;
    for (const f of s.fighters) {
      ctx.strokeStyle = '#0f0'; ctx.beginPath(); ctx.ellipse(sx(f.x), sy(f.y), CHARS[f.char].hr, CHARS[f.char].hr * ASPECT, 0, 0, 7); ctx.stroke();
      const spec = f.st === 'atk' ? CHARS[f.char].moves[f.mv] : null;
      if (spec && spec.hits) for (const h of spec.hits) if (f.mf >= h.f0 && f.mf < h.f1) {
        ctx.strokeStyle = '#f00'; const cx = f.x + f.maimx * h.reach, cy = f.y + f.maimy * h.reach;
        ctx.beginPath(); ctx.ellipse(sx(cx), sy(cy), h.r, h.r * ASPECT, 0, 0, 7); ctx.stroke();
      }
    }
    ctx.strokeStyle = '#ff0'; ctx.strokeRect(STAGE.x0, STAGE.topY, STAGE.x1 - STAGE.x0, STAGE.frontY - STAGE.topY);
    if (o.debugText) o.debugText.forEach((t, i) => text(ctx, t, 8, 130 + i * 12, 8, '#0f0', 'left'));
    ctx.restore();
  }
}
