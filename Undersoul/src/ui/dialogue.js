// Dialogue boxes and choices. Everything is awaitable:
//   await say('willow', ['Hello, child.', 'Come along.'])
//   const i = await ask('taper', 'DO YOU LIKE PUZZLES?', ['Yes', 'No'])
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { Typer } from './text.js';
import { FONTS } from './fonts.js';
import { sfx } from '../audio/sfx.js';
import { settings } from '../core/save.js';

const speakers = {};
export function registerSpeakers(obj) { Object.assign(speakers, obj); }
export function speaker(id) { return speakers[id] || speakers.narrator || { voice: 'narrator' }; }

const BOX = { x: 40, y: 372, w: 880, h: 150 };

class DialogueBox {
  constructor(spk, pages, opts) {
    this.spk = spk;
    this.pages = pages;
    this.opts = opts;
    this.page = 0;
    this.choices = opts.choices || null;
    this.choiceIdx = opts.defaultChoice ?? 0;
    this.choosing = false;
    this.alpha = 0;
    this.closing = false;
    this.time = 0;
    this.makeTyper();
  }

  makeTyper() {
    const s = this.spk;
    const text = this.pages[this.page];
    const family = s.font || FONTS.ui;
    const size = s.size || (family === FONTS.taper ? 30 : family === FONTS.wick ? 27 : 26);
    this.typer = new Typer(text, {
      width: BOX.w - 70,
      size,
      family,
      cps: (s.cps || 32) * (this.opts.cps || 1) * settings.textSpeed,
      onBlip: () => sfx.voice(s.voice),
      blipEvery: s.blipEvery || 2,
      delay: this.page === 0 ? 0.08 : 0,
    });
    this.autoTimer = this.opts.auto ?? null;
  }

  update(dt, top) {
    this.time += dt;
    this.alpha = Math.min(1, this.alpha + dt * 8);
    if (this.closing) return;
    this.typer.update(dt);
    if (!top) return;
    if (this.choosing) {
      const n = this.choices.length;
      const horiz = n <= 2;
      const prev = horiz ? 'left' : 'up', next = horiz ? 'right' : 'down';
      if (input.pressed(prev)) { this.choiceIdx = (this.choiceIdx + n - 1) % n; sfx.move(); }
      if (input.pressed(next)) { this.choiceIdx = (this.choiceIdx + 1) % n; sfx.move(); }
      if (input.pressed('confirm')) { sfx.select(); this.finish(this.choiceIdx); }
      return;
    }
    if (!this.typer.done) {
      if (input.pressed('cancel') && !this.opts.noSkip) this.typer.skip();
      return;
    }
    if (this.choices && this.page === this.pages.length - 1) {
      this.choosing = true;
      return;
    }
    if (this.autoTimer != null) {
      this.autoTimer -= dt;
      if (this.autoTimer <= 0) this.advance();
      return;
    }
    if (input.pressed('confirm')) this.advance();
  }

  advance() {
    if (this.page < this.pages.length - 1) {
      this.page++;
      this.makeTyper();
    } else if (this.choices) {
      this.choosing = true;
    } else this.finish(0);
  }

  finish(v) {
    this.closing = true;
    game.removeOverlay(this);
    this.resolve(v);
  }

  draw(ui) {
    const g = ui.ctx;
    const pos = this.opts.pos === 'top' ? { ...BOX, y: 18 } : BOX;
    g.save();
    g.globalAlpha = this.alpha;
    ui.box(pos.x, pos.y, pos.w, pos.h, { fill: 'rgba(0,0,0,0.92)' });
    // speaker nameplate
    const s = this.spk;
    if (s.name && !this.opts.hideName) {
      const name = typeof s.name === 'function' ? s.name() : s.name;
      g.font = `20px ${FONTS.small}, monospace`;
      const w = g.measureText(name).width + 28;
      const ny = pos.y - 26;
      g.fillStyle = '#000';
      g.fillRect(pos.x + 18, ny, w, 30);
      g.strokeStyle = s.color || '#fff';
      g.lineWidth = 3;
      g.strokeRect(pos.x + 19.5, ny + 1.5, w - 3, 27);
      ui.text(name, pos.x + 32, ny + 5, { size: 20, family: FONTS.small, color: s.color || '#fff' });
    }
    this.typer.draw(g, pos.x + 32, pos.y + 22, this.time);
    if (this.choosing) {
      const n = this.choices.length;
      const baseY = pos.y + 22 + this.typer.layout.height + 6;
      if (n <= 2) {
        const cx = [pos.x + 180, pos.x + 520];
        this.choices.forEach((c, i) => {
          ui.text(c, cx[i], baseY, { size: 26, color: i === this.choiceIdx ? '#ffff00' : '#fff' });
          if (i === this.choiceIdx) ui.heart(cx[i] - 22, baseY + 13, 18, '#ff2020');
        });
      } else {
        this.choices.forEach((c, i) => {
          const col = i % 2, row = Math.floor(i / 2);
          const x = pos.x + 90 + col * 380, y = baseY + row * 30;
          ui.text(c, x, y, { size: 24, color: i === this.choiceIdx ? '#ffff00' : '#fff' });
          if (i === this.choiceIdx) ui.heart(x - 20, y + 12, 16, '#ff2020');
        });
      }
    } else if (this.typer.done && this.autoTimer == null) {
      const blink = Math.floor(this.time * 3) % 2 === 0;
      if (blink) ui.heart(pos.x + pos.w - 28, pos.y + pos.h - 24, 12, '#ffffff', { alpha: 0.8 });
    }
    g.restore();
  }
}

function open(spkId, pages, opts = {}) {
  if (typeof pages === 'string') pages = [pages];
  const spk = typeof spkId === 'object' ? spkId : speaker(spkId || 'narrator');
  return new Promise((resolve) => {
    const box = new DialogueBox(spk, pages, opts);
    box.resolve = resolve;
    game.pushOverlay(box);
  });
}

export function say(spk, pages, opts) { return open(spk, pages, opts); }

// Narrator shorthand: lines are prefixed with "* ".
export function narrate(pages, opts) {
  if (typeof pages === 'string') pages = [pages];
  return open('narrator', pages.map((p) => (p.startsWith('* ') || p.startsWith('(') ? p : '* ' + p)), opts);
}

export async function ask(spk, question, choices, opts = {}) {
  const pages = typeof question === 'string' ? [question] : question;
  return open(spk, pages, { ...opts, choices });
}

// A floating battle-style speech bubble that is not a full dialogue box.
export class Bubble {
  constructor(text, x, y, opts = {}) {
    this.x = x; this.y = y;
    this.opts = opts;
    this.w = opts.w ?? 220;
    this.typer = new Typer(text, {
      width: this.w - 24, size: opts.size ?? 20, family: opts.family ?? FONTS.ui,
      cps: opts.cps ?? 30, onBlip: () => sfx.voice(opts.voice || 'monster'),
    });
    this.time = 0;
  }
  update(dt) { this.time += dt; this.typer.update(dt); }
  draw(ui) {
    const g = ui.ctx;
    const h = this.typer.layout.height + 22;
    const x = this.x, y = this.y;
    g.save();
    g.fillStyle = '#fff';
    g.beginPath();
    if (g.roundRect) g.roundRect(x, y, this.w, h, 8);
    else g.rect(x, y, this.w, h);
    g.fill();
    // tail pointing left toward the speaker
    g.beginPath();
    g.moveTo(x + 2, y + 18);
    g.lineTo(x - 16, y + 26);
    g.lineTo(x + 2, y + 32);
    g.fill();
    g.restore();
    // draw text in black
    for (const gl of this.typer.glyphs) if (gl.color === '#ffffff') gl.color = '#000000';
    this.typer.draw(g, x + 12, y + 11, this.time);
  }
}
