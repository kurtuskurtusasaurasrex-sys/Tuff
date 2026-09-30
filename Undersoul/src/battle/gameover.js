// SOUL breaks, the echo inside it speaks, you try again.
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { S, flag } from '../core/save.js';
import { SOULS } from '../data/souls.js';
import { sfx } from '../audio/sfx.js';
import { music } from '../audio/sequencer.js';
import { Typer } from '../ui/text.js';
import { FONTS } from '../ui/fonts.js';

export const GAMEOVER_LINES = {
  determination: ['Get up.', 'We\'re not done. Not even close.'],
  patience: ['...It\'s alright.', 'Take a breath. Then we try again.'],
  bravery: ['Hey! HEY! Falling down is part of it!', 'Up you get!'],
  integrity: ['Chin up. Posture.', 'We go again. Properly, this time.'],
  perseverance: ['Okay. Okay. That\'s fine.', 'We just... turn the page back. Again.'],
  kindness: ['Oh, sweetheart. Come here.', 'You did your best. Let\'s try once more.'],
  justice: ['Well, partner. That one got the drop on us.', 'Saddle up.'],
};

class GameOverMode {
  id = 'gameover';
  constructor(x, y) {
    this.x = x; this.y = y;
    this.t = 0;
    this.state = 'crack';
    this.shards = [];
    this.lines = flag('echoGone') ? ['...'] : GAMEOVER_LINES[S.soul] || GAMEOVER_LINES.determination;
    this.li = 0;
  }
  run() { return new Promise((r) => { this.resolve = r; game.setMode(this); }); }
  enter() {}
  update(dt) {
    this.t += dt;
    const color = SOULS[S.soul].color;
    if (this.state === 'crack' && this.t > 1.0) {
      this.state = 'shatter';
      sfx.shatter();
      for (let i = 0; i < 7; i++) this.shards.push({ x: this.x, y: this.y, vx: (Math.random() - 0.5) * 220, vy: -Math.random() * 180 - 40, r: Math.random() * 6, c: color });
    }
    if (this.state === 'crack' && !this.cracked && this.t > 0.5) { this.cracked = true; sfx.crack(); }
    for (const s of this.shards) { s.vy += 500 * dt; s.x += s.vx * dt; s.y += s.vy * dt; s.r += dt * 8; }
    if (this.state === 'shatter' && this.t > 2.6) {
      this.state = 'title';
      music.play('gameover', { fade: 1.5, restart: true });
    }
    if (this.state === 'title' && this.t > 4.2) {
      this.state = 'talk';
      this.typer = new Typer(this.lines[0], { width: 600, size: 26, cps: 16, onBlip: () => sfx.voice('echo') });
    }
    if (this.state === 'talk') {
      this.typer.update(dt);
      if (this.typer.done && input.pressed('confirm')) {
        this.li++;
        if (this.li < this.lines.length) this.typer = new Typer(this.lines[this.li], { width: 600, size: 26, cps: 16, onBlip: () => sfx.voice('echo') });
        else { this.state = 'out'; this.finish(); }
      }
    }
  }
  async finish() {
    music.stop(1.5);
    await game.fadeOut(1.2);
    this.resolve();
  }
  draw(ui) {
    ui.fillScreen('#000');
    const color = SOULS[S.soul].color;
    if (this.state === 'crack') ui.heart(this.x, this.y, 20, color, { broken: this.cracked });
    for (const s of this.shards) {
      ui.ctx.save();
      ui.ctx.fillStyle = s.c;
      ui.ctx.translate(s.x, s.y);
      ui.ctx.rotate(s.r);
      ui.ctx.fillRect(-3, -3, 6, 6);
      ui.ctx.fillRect(-1, 3, 3, 3);
      ui.ctx.restore();
    }
    if (this.state === 'title' || this.state === 'talk' || this.state === 'out') {
      const a = Math.min(1, (this.t - 2.6) / 1.5);
      ui.text('GAME', 480, 90, { size: 72, family: FONTS.title, align: 'center', alpha: a });
      ui.text('OVER', 480, 180, { size: 72, family: FONTS.title, align: 'center', alpha: a });
    }
    if (this.state === 'talk') {
      this.typer.draw(ui.ctx, 200, 340, this.t);
      const who = flag('echoGone') ? '' : SOULS[S.soul].echo;
      if (who) ui.text(`- ${who}`, 760, 420, { size: 18, family: FONTS.small, color, align: 'right', alpha: this.typer.done ? 1 : 0 });
    }
  }
}

export async function gameOver(x, y) {
  await new GameOverMode(x, y).run();
}
