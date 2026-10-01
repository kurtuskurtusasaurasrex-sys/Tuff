// Canvas renderer: stage, depth-sorted fighters/projectiles, effects and the HUD.
// Reads the sim state only; never mutates it.

import { W, H, ASPECT, STAGE, ARENA, RULES, toScreenY } from './config.js';
import { CHARS } from './chars/index.js';
import { STAGES, STAGE_ORDER } from './stages.js';

export const SLOT_COL = ['#ff5a5a', '#5ab0ff', '#5aff8a', '#ffd84d'];

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
  const A = { atlas: {}, stages: {} };
  let done = 0;
  const total = names.length + STAGE_ORDER.length;
  const tick = () => { done++; if (onProgress) onProgress(done / total); };
  await Promise.all([
    ...STAGE_ORDER.map((id) => loadImg(STAGES[id].bg).then((i) => { A.stages[id] = i; tick(); })),
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
    this.slotOf = null;                       // fighter index -> lobby slot (for stable player colours)
    this.ctx.imageSmoothingEnabled = false;
  }

  col(i) { return SLOT_COL[(this.slotOf && this.slotOf[i] !== undefined ? this.slotOf[i] : i) % 4]; }

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
    // the last KO of a match: punch in toward where it happened
    if (s.phase === 'over' && s.phaseT < 130 && s.reason === 'ko') {
      const k = Math.min(1, s.phaseT / 26), out = s.phaseT > 100 ? 1 - (s.phaseT - 100) / 30 : 1;
      const z = 1 + 0.55 * k * out;
      const fxp = Math.max(0, Math.min(W, s.koX)), fyp = Math.max(0, Math.min(H, toScreenY(s.koY)));
      const hw = W / 2 / z, hh = H / 2 / z;
      const tx = Math.max(hw, Math.min(W - hw, W / 2 + (fxp - W / 2) * 0.8)), ty = Math.max(hh, Math.min(H - hh, H / 2 + (fyp - H / 2) * 0.8));
      ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-tx, -ty);
    }
    if (fx && fx.shake > 0.3) ctx.translate(Math.round((Math.random() - 0.5) * fx.shake * 2), Math.round((Math.random() - 0.5) * fx.shake * 2));
    ctx.drawImage(this.A.stages[s.stage] || this.A.stages.snowdin, 0, 0, W, H);

    this.drawTelegraphs(ctx, s);
    this.drawEntities(ctx, s, fx, o);
    this.drawBeams(ctx, s);
    if (fx) fx.draw(ctx);
    ctx.restore();

    if (fx && fx.flash > 0) { ctx.globalAlpha = Math.min(0.85, fx.flash / 8); ctx.fillStyle = fx.flashColor; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    if (o.hud !== false) {
      this.drawOffscreen(ctx, s);
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
    if (s.ball) list.push({ y: s.ball.y, ref: s.ball, kind: 'ball' });
    for (const p of s.projs) {
      if (p.k === 'beam') list.push({ y: p.y, ref: p, kind: 'blaster' });
      else if (p.k === 'burst') list.push({ y: p.y, ref: p, kind: 'burst' });
      else if (p.k === 'orb') list.push({ y: p.y + 30, ref: p, kind: 'orb' });
    }
    list.sort((a, b) => a.y - b.y);
    for (const it of list) {
      if (it.f) this.drawFighter(ctx, s, it.ref, fx, o);
      else if (it.kind === 'ball') this.drawBall(ctx, it.ref, s);
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
      const col = this.col(f.i);
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
    const g = ctx.createLinearGradient(0, 0, 0, 100); g.addColorStop(0, 'rgba(0,0,12,0.7)'); g.addColorStop(1, 'rgba(0,0,12,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, 100);
    s.fighters.forEach((f) => this.drawPlayerHud(ctx, s, f, fx, o));

    const secs = Math.ceil(s.timer / 60);
    ctx.fillStyle = 'rgba(0,0,16,0.8)'; ctx.fillRect(W / 2 - 54, 8, 108, 52);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(W / 2 - 54, 8, 108, 52);
    text(ctx, String(secs).padStart(2, '0'), W / 2, 47, secs >= 100 ? 28 : 32, secs <= 10 ? '#ff6a6a' : '#fff', 'center');
    if (o.netInfo) text(ctx, o.netInfo, W / 2, 80, 8, o.netBad ? '#ff9a9a' : '#9fe8ff', 'center');
  }

  panelRect(i, n) {
    const pw = 214, gap = 6;
    const left = n === 2 ? [0] : n === 3 ? [0, 1] : [0, 1];
    const x = left.includes(i) ? 8 + left.indexOf(i) * (pw + gap) : W - 8 - pw - (n - 1 - i) * (pw + gap);
    return { x, y: 6, w: pw, h: 74 };
  }

  heart(ctx, x, y, sc, col) {                                  // the SOUL
    const rows = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
    ctx.fillStyle = col;
    rows.forEach((row, ry) => { for (let rx = 0; rx < 7; rx++) if (row[rx] === '#') ctx.fillRect(Math.round(x + rx * sc), Math.round(y + ry * sc), sc, sc); });
  }

  drawPlayerHud(ctx, s, f, fx, o) {
    const C = CHARS[f.char], col = this.col(f.i);
    const at = this.A.atlas[C.atlas], ic = at.frames.icon;
    const P = this.panelRect(f.i, s.n), out = f.stocks <= 0 && f.st === 'dead';
    ctx.fillStyle = 'rgba(0,0,16,0.82)'; ctx.fillRect(P.x, P.y, P.w, P.h);
    ctx.strokeStyle = out ? '#555' : col; ctx.lineWidth = 3; ctx.strokeRect(P.x + 1.5, P.y + 1.5, P.w - 3, P.h - 3);
    // portrait
    ctx.fillStyle = '#000'; ctx.fillRect(P.x + 6, P.y + 6, 50, 50);
    const iw = ic.w * at.scale, ih = ic.h * at.scale, isc = Math.min(1, 42 / Math.max(iw, ih));
    ctx.globalAlpha = out ? 0.35 : 1;
    ctx.drawImage(at.img, ic.x, ic.y, ic.w, ic.h, Math.round(P.x + 31 - iw * isc / 2), Math.round(P.y + 31 - ih * isc / 2), Math.round(iw * isc), Math.round(ih * isc));
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(P.x + 6, P.y + 6, 50, 50);
    // label + name
    const label = (o.labels && o.labels[f.i]) || 'P' + (f.i + 1);
    text(ctx, label, P.x + 64, P.y + 22, 10, col, 'left', null);
    text(ctx, C.name, P.x + 64 + (label.length + 1) * 10, P.y + 22, 10, '#fff', 'left', null);
    if (out) { text(ctx, 'OUT', P.x + 64, P.y + 54, 24, '#777', 'left', null); return; }
    // damage
    const pct = Math.floor(f.dmg);
    const pc = pct < 50 ? '#ffffff' : pct < 100 ? '#ffe066' : pct < 150 ? '#ff9a3c' : '#ff4a4a';
    const shake = fx && fx.flashFighter[f.i] > 0 ? ((s.frame & 1) ? 2 : -2) : 0;
    text(ctx, pct + '%', P.x + 64 + shake, P.y + 52, 26, pc, 'left', '#000');
    // stocks = souls, stacked in a column on the right edge
    const hx = P.x + P.w - 24;
    if (f.stocks <= 3) for (let k = 0; k < f.stocks; k++) this.heart(ctx, hx, P.y + 8 + k * 17, 2, col);
    else { this.heart(ctx, hx, P.y + 10, 2, col); text(ctx, 'x' + f.stocks, hx - 2, P.y + 44, 10, '#fff', 'left', null); }
    // super meter
    const mw = P.w - 64 - 30, mx = P.x + 64, my = P.y + 60, full = f.meter >= 100;
    ctx.fillStyle = '#000'; ctx.fillRect(mx, my, mw, 8);
    ctx.fillStyle = full ? (((s.frame >> 2) & 1) ? '#fff3a0' : '#ffb020') : (f.meter >= 50 ? '#6fe0ff' : '#3a78d0');
    ctx.fillRect(mx, my, Math.round(mw * Math.min(100, f.meter) / 100), 8);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(mx + Math.round(mw / 2), my, 2, 8);
    if (full) text(ctx, 'SUPER!', P.x + 64 + mw, P.y + 70, 8, '#ffe066', 'right', null);
    // combo counter under the panel
    if (f.hits >= 2) {
      const pulse = f.lastHit && s.frame - f.lastHit < 8 ? 1 + (8 - (s.frame - f.lastHit)) * 0.03 : 1;
      text(ctx, f.hits + ' HITS  ' + Math.round(f.comboDmg) + '%', P.x + 6, P.y + P.h + 20, Math.round(10 * pulse / 2) * 2, '#ffe066', 'left');
    }
  }

  // fighters launched off-screen get a portrait bubble at the edge pointing their way
  drawOffscreen(ctx, s) {
    for (const f of s.fighters) {
      if (f.st === 'dead' || f.st === 'spawn') continue;
      const px = f.x, py = toScreenY(f.y) - 40;
      if (px > -10 && px < W + 10 && py > -10 && py < H + 10) continue;
      const bx = Math.max(34, Math.min(W - 34, px)), by = Math.max(110, Math.min(H - 40, py));
      const C = CHARS[f.char], at = this.A.atlas[C.atlas], ic = at.frames.icon;
      const col = this.col(f.i);
      ctx.fillStyle = '#000'; ctx.fillRect(bx - 22, by - 22, 44, 44);
      const iw = ic.w * at.scale, ih = ic.h * at.scale, isc = Math.min(1, 34 / Math.max(iw, ih));
      ctx.drawImage(at.img, ic.x, ic.y, ic.w, ic.h, Math.round(bx - iw * isc / 2), Math.round(by - ih * isc / 2), Math.round(iw * isc), Math.round(ih * isc));
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.strokeRect(bx - 22, by - 22, 44, 44);
      const dx = px - bx, dy = py - by, l = Math.hypot(dx, dy) || 1;
      this.heart(ctx, bx + dx / l * 36 - 7, by + dy / l * 36 - 6, 2, col);
    }
  }

  drawBall(ctx, b, s) {
    const x = Math.round(b.x), gy = Math.round(toScreenY(b.y)), y = gy - 56 + Math.round(Math.sin(s.frame * 0.08) * 4);
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(x, gy + 2, 20, 8, 0, 0, 7); ctx.fill();
    const hue = (s.frame * 6) % 360, flash = b.fl > 0;
    ctx.save();
    for (let r = 3; r >= 1; r--) { ctx.globalAlpha = 0.12 * r; ctx.fillStyle = `hsl(${hue},100%,60%)`; ctx.beginPath(); ctx.arc(x, y, 22 + r * 7, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
    ctx.fillStyle = flash ? '#fff' : `hsl(${hue},90%,55%)`; ctx.strokeStyle = '#000'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(x, y, 24, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = flash ? `hsl(${hue},100%,70%)` : '#fff';
    ctx.beginPath(); ctx.arc(x, y, 14, 0, 7); ctx.fill();
    // four-point star
    ctx.fillStyle = '#000';
    const a = (s.frame * 0.05) % 6.283;
    ctx.beginPath();
    for (let k = 0; k < 8; k++) { const rr = k % 2 ? 4 : 13, ang = a + k * Math.PI / 4; ctx.lineTo(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr); }
    ctx.closePath(); ctx.fill();
    for (let k = 0; k < b.hp; k++) { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x - (b.hp - 1) * 7 + k * 14, y - 38, 4, 0, 7); ctx.fill(); ctx.stroke(); }
    ctx.restore();
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
