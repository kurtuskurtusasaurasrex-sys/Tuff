// 2D overlay canvas. Everything UI-side draws in a fixed 960x540 virtual
// space that is letterboxed onto the window.
import { font, FONTS } from './fonts.js';

export const VW = 960;
export const VH = 540;

const HEART = [
  '..XX...XX..',
  '.XXXX.XXXX.',
  'XXXXXXXXXXX',
  'XXXXXXXXXXX',
  'XXXXXXXXXXX',
  '.XXXXXXXXX.',
  '..XXXXXXX..',
  '...XXXXX...',
  '....XXX....',
  '.....X.....',
];
const HEART_BROKEN = [
  '..XX...XX..',
  '.XXXX.XXXX.',
  'XXXXX.XXXXX',
  'XXXX.XXXXXX',
  'XXXXX.XXXXX',
  '.XXXXX.XXX.',
  '..XXX.XXX..',
  '...XX.XX...',
  '....X.X....',
  '.....X.....',
];

const heartCache = new Map();

function heartSprite(color, broken = false, glow = 0) {
  const key = color + broken + glow;
  if (heartCache.has(key)) return heartCache.get(key);
  const px = 4;
  const pad = glow ? 10 : 0;
  const c = document.createElement('canvas');
  c.width = 11 * px + pad * 2;
  c.height = 10 * px + pad * 2;
  const g = c.getContext('2d');
  const rows = broken ? HEART_BROKEN : HEART;
  if (glow) {
    g.shadowColor = color;
    g.shadowBlur = glow;
  }
  g.fillStyle = color;
  for (let y = 0; y < rows.length; y++)
    for (let x = 0; x < rows[y].length; x++)
      if (rows[y][x] === 'X') g.fillRect(pad + x * px, pad + y * px, px, px);
  const s = { canvas: c, pad, w: 11 * px, h: 10 * px };
  heartCache.set(key, s);
  return s;
}

export class UI {
  constructor(container) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'ui';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.scale = 1;
    this.ox = 0;
    this.oy = 0;
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.scale = Math.min(w / VW, h / VH);
    this.ox = (w - VW * this.scale) / 2;
    this.oy = (h - VH * this.scale) / 2;
  }

  begin() {
    const g = this.ctx;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const s = this.scale * this.dpr;
    g.setTransform(s, 0, 0, s, this.ox * this.dpr, this.oy * this.dpr);
    g.imageSmoothingEnabled = false;
    g.textBaseline = 'top';
  }

  // Fill the full window (not just the 16:9 area), e.g. for fades.
  fillScreen(color, alpha = 1) {
    const g = this.ctx;
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalAlpha = alpha;
    g.fillStyle = color;
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    g.restore();
  }

  box(x, y, w, h, opts = {}) {
    const g = this.ctx;
    const bw = opts.border ?? 4;
    g.save();
    g.globalAlpha = opts.alpha ?? 1;
    g.fillStyle = opts.fill ?? '#000';
    g.fillRect(x, y, w, h);
    if (bw) {
      g.strokeStyle = opts.stroke ?? '#fff';
      g.lineWidth = bw;
      g.strokeRect(x + bw / 2, y + bw / 2, w - bw, h - bw);
    }
    g.restore();
  }

  text(str, x, y, opts = {}) {
    const g = this.ctx;
    g.save();
    g.font = font(opts.size ?? 24, opts.family ?? FONTS.ui, opts.weight);
    g.textAlign = opts.align ?? 'left';
    g.textBaseline = opts.baseline ?? 'top';
    g.globalAlpha = opts.alpha ?? 1;
    if (opts.shadow) {
      g.fillStyle = opts.shadow;
      g.fillText(str, x + 2, y + 2);
    }
    if (opts.glow) {
      g.shadowColor = opts.glow;
      g.shadowBlur = opts.glowSize ?? 12;
    }
    g.fillStyle = opts.color ?? '#fff';
    g.fillText(str, x, y);
    g.restore();
  }

  measure(str, size = 24, family = FONTS.ui) {
    const g = this.ctx;
    g.save();
    g.font = font(size, family);
    const w = g.measureText(str).width;
    g.restore();
    return w;
  }

  // Draw the SOUL heart centred on (x, y). size = width in px.
  heart(x, y, size = 16, color = '#ff0000', opts = {}) {
    const s = heartSprite(color, !!opts.broken, opts.glow ?? 0);
    const scale = size / s.w;
    const g = this.ctx;
    g.save();
    g.globalAlpha = opts.alpha ?? 1;
    g.translate(x, y);
    if (opts.rot) g.rotate(opts.rot);
    g.drawImage(
      s.canvas,
      -(s.w / 2 + s.pad) * scale,
      -(s.h / 2 + s.pad) * scale,
      s.canvas.width * scale,
      s.canvas.height * scale
    );
    g.restore();
  }

  bar(x, y, w, h, frac, fg = '#ffff00', bg = '#c00000') {
    const g = this.ctx;
    g.fillStyle = bg;
    g.fillRect(x, y, w, h);
    g.fillStyle = fg;
    g.fillRect(x, y, Math.max(0, Math.min(1, frac)) * w, h);
  }

  // Convert window pixel coords to virtual coords (for touch hit tests).
  toVirtual(px, py) {
    return [(px - this.ox) / this.scale, (py - this.oy) / this.scale];
  }
}
