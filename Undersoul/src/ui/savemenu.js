// The SAVE box shown at save stars.
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { S } from '../core/save.js';
import { sfx } from '../audio/sfx.js';
import { formatTime } from '../core/util.js';
import { FONTS } from './fonts.js';
import { world } from '../world/world.js';

class SaveMenu {
  constructor(roomName, doSave) {
    this.roomName = roomName;
    this.doSave = doSave;
    this.idx = 0;
    this.saved = false;
    this.t = 0;
  }
  open() { return new Promise((r) => { this.resolve = r; game.pushOverlay(this); }); }
  close() { game.removeOverlay(this); this.resolve(); }
  update(dt, top) {
    this.t += dt;
    if (!top) return;
    if (this.saved) {
      if (input.pressed('confirm') || input.pressed('cancel')) this.close();
      return;
    }
    if (input.pressed('left') || input.pressed('right')) { this.idx = 1 - this.idx; sfx.move(); }
    if (input.pressed('cancel')) { sfx.back(); this.close(); }
    if (input.pressed('confirm')) {
      if (this.idx === 0) {
        if (world) S.pos = [world.player.x, world.player.z, world.player.facing];
        this.doSave();
        this.saved = true;
        sfx.save();
      } else { sfx.back(); this.close(); }
    }
  }
  draw(ui) {
    const x = 170, y = 150, w = 620, h = 190;
    ui.box(x, y, w, h, { fill: 'rgba(0,0,0,0.95)' });
    const col = this.saved ? '#ffff00' : '#fff';
    ui.text(S.name, x + 40, y + 30, { size: 30, color: col });
    ui.text(`LV ${S.lv}`, x + 290, y + 30, { size: 30, color: col });
    ui.text(formatTime(S.playTime), x + w - 40, y + 30, { size: 30, color: col, align: 'right' });
    ui.text(this.roomName, x + 40, y + 80, { size: 28, color: col });
    if (this.saved) ui.text('File saved.', x + 80, y + 132, { size: 28, color: col });
    else {
      ['Save', 'Return'].forEach((s, i) => {
        const xx = x + 80 + i * 250;
        ui.text(s, xx, y + 132, { size: 28, color: i === this.idx ? '#ffff00' : '#fff' });
        if (i === this.idx) ui.heart(xx - 24, y + 146, 18, '#ff2020');
      });
    }
    void FONTS;
  }
}

export function openSaveMenu(roomName, doSave) { return new SaveMenu(roomName, doSave).open(); }
