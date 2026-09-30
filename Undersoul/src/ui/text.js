// Rich text with inline tags and a typewriter.
// Tags: [red] [yellow] [blue] [cyan] [orange] [green] [purple] [pink] [gray]
//       [shake] [wave] [/] (reset)  [p] short pause  [P] long pause
//       [s:0.5] speed multiplier
import { font, FONTS } from './fonts.js';

export const COLORS = {
  white: '#ffffff',
  red: '#ff3434',
  yellow: '#ffff00',
  blue: '#2f7dff',
  cyan: '#46e6ff',
  orange: '#ff9a1f',
  green: '#35ff58',
  purple: '#c95cff',
  pink: '#ff79d6',
  gray: '#8d8d8d',
  gold: '#ffd257',
};

const measureCanvas = document.createElement('canvas').getContext('2d');
const widthCache = new Map();

function charWidth(ch, fontStr) {
  const key = fontStr + '|' + ch;
  let w = widthCache.get(key);
  if (w === undefined) {
    measureCanvas.font = fontStr;
    w = measureCanvas.measureText(ch).width;
    widthCache.set(key, w);
  }
  return w;
}

export function clearTextCache() { widthCache.clear(); }

export function parseRich(str) {
  const out = [];
  let color = COLORS.white, fx = null, speed = 1;
  let i = 0;
  while (i < str.length) {
    const c = str[i];
    if (c === '[') {
      const end = str.indexOf(']', i);
      if (end > i) {
        const tag = str.slice(i + 1, end);
        let handled = true;
        if (COLORS[tag]) color = COLORS[tag];
        else if (tag.startsWith('#')) color = tag;
        else if (tag === '/') { color = COLORS.white; fx = null; speed = 1; }
        else if (tag === 'shake' || tag === 'wave') fx = tag;
        else if (tag === 'p') { if (out.length) out[out.length - 1].pause += 0.3; }
        else if (tag === 'P') { if (out.length) out[out.length - 1].pause += 0.8; }
        else if (tag.startsWith('s:')) speed = parseFloat(tag.slice(2)) || 1;
        else handled = false;
        if (handled) { i = end + 1; continue; }
      }
    }
    out.push({ ch: c, color, fx, speed, pause: 0, x: 0, y: 0 });
    i++;
  }
  return out;
}

// Assign x/y to glyphs with word wrap and "* " hanging indents.
export function layoutRich(glyphs, maxWidth, size, family, lineHeight) {
  const f = font(size, family);
  let x = 0, y = 0, indent = 0;
  let lineStart = true;
  let i = 0;
  const n = glyphs.length;
  let lines = 1;
  while (i < n) {
    const g = glyphs[i];
    if (g.ch === '\n') {
      g.x = x; g.y = y; g.hidden = true;
      x = 0; y += lineHeight; lines++;
      indent = 0; lineStart = true;
      i++;
      continue;
    }
    if (lineStart && g.ch === '*' && glyphs[i + 1] && glyphs[i + 1].ch === ' ') {
      indent = charWidth('* ', f);
    }
    lineStart = false;
    if (g.ch === ' ') {
      g.x = x; g.y = y;
      x += charWidth(' ', f);
      i++;
      continue;
    }
    // measure the whole word
    let j = i, ww = 0;
    while (j < n && glyphs[j].ch !== ' ' && glyphs[j].ch !== '\n') {
      ww += charWidth(glyphs[j].ch, f);
      j++;
    }
    if (x + ww > maxWidth && x > indent) {
      x = indent; y += lineHeight; lines++;
    }
    for (let k = i; k < j; k++) {
      glyphs[k].x = x; glyphs[k].y = y;
      x += charWidth(glyphs[k].ch, f);
    }
    i = j;
  }
  return { lines, height: lines * lineHeight };
}

export function drawGlyphs(ctx, glyphs, ox, oy, count, size, family, time, alpha = 1) {
  ctx.save();
  ctx.font = font(size, family);
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.globalAlpha = alpha;
  const lim = Math.min(count, glyphs.length);
  for (let i = 0; i < lim; i++) {
    const g = glyphs[i];
    if (g.hidden || g.ch === ' ') continue;
    let dx = 0, dy = 0;
    if (g.fx === 'shake') {
      dx = (Math.random() - 0.5) * 2.2;
      dy = (Math.random() - 0.5) * 2.2;
    } else if (g.fx === 'wave') {
      dy = Math.sin(time * 6 + i * 0.6) * 2.5;
    }
    ctx.fillStyle = g.color;
    ctx.fillText(g.ch, Math.round(ox + g.x + dx), Math.round(oy + g.y + dy));
  }
  ctx.restore();
}

export class Typer {
  constructor(text, opts = {}) {
    this.size = opts.size ?? 26;
    this.family = opts.family ?? FONTS.ui;
    this.lineHeight = opts.lineHeight ?? Math.round(this.size * 1.35);
    this.cps = opts.cps ?? 32;
    this.onBlip = opts.onBlip;
    this.blipEvery = opts.blipEvery ?? 2;
    this.glyphs = parseRich(text);
    this.layout = layoutRich(this.glyphs, opts.width ?? 700, this.size, this.family, this.lineHeight);
    this.shown = 0;
    this.timer = opts.delay ?? 0;
    this.blipCount = 0;
    this.done = this.glyphs.length === 0;
    this.instant = !!opts.instant;
    if (this.instant) this.skip();
  }

  skip() {
    this.shown = this.glyphs.length;
    this.done = true;
  }

  update(dt) {
    if (this.done) return;
    this.timer -= dt;
    let guard = 0;
    while (this.timer <= 0 && !this.done && guard++ < 50) {
      const g = this.glyphs[this.shown];
      this.shown++;
      let delay = 1 / (this.cps * g.speed);
      const next = this.glyphs[this.shown];
      if (/[.!?]/.test(g.ch) && (!next || next.ch === ' ' || next.ch === '\n')) delay += 0.18;
      else if (g.ch === ',' || g.ch === ';' || g.ch === ':') delay += 0.1;
      else if (g.ch === '.' && next && next.ch === '.') delay += 0.1;
      delay += g.pause;
      if (/[A-Za-z0-9]/.test(g.ch)) {
        if (this.blipCount % this.blipEvery === 0 && this.onBlip) this.onBlip(g.ch);
        this.blipCount++;
      }
      this.timer += delay;
      if (this.shown >= this.glyphs.length) this.done = true;
    }
  }

  draw(ctx, x, y, time, alpha = 1) {
    drawGlyphs(ctx, this.glyphs, x, y, this.shown, this.size, this.family, time, alpha);
  }
}

// Static rich text helper (fully revealed).
export function drawRich(ctx, text, x, y, opts = {}) {
  const t = new Typer(text, { ...opts, instant: true });
  let ox = x;
  if (opts.align === 'center') {
    let maxX = 0;
    for (const g of t.glyphs) maxX = Math.max(maxX, g.x + charWidth(g.ch, font(t.size, t.family)));
    ox = x - maxX / 2;
  }
  t.draw(ctx, ox, y, opts.time ?? 0, opts.alpha ?? 1);
  return t.layout;
}
