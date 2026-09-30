// The C-menu: ITEM / STAT / SOUL (skill tree) / CELL, plus the ESC menu.
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { S, route } from '../core/save.js';
import { sfx } from '../audio/sfx.js';
import { FONTS } from './fonts.js';
import { ITEMS } from '../data/items.js';
import { SOULS } from '../data/souls.js';
import { maxHp, atk, def, baseAtk, baseDef, weaponAtk, armorDef, nextExp, nextHope, skillPoints, hasSkill, canUnlock } from '../data/stats.js';
import { useItem, itemInfo } from '../data/itemuse.js';
import { narrate } from './dialogue.js';
import { openSettings, ListMenu } from './menus.js';
import { drawRich } from './text.js';
import { PHONE } from '../story/phone.js';
import { music } from '../audio/sequencer.js';

const MAIN = ['ITEM', 'STAT', 'SOUL', 'CELL'];

class PauseMenu {
  constructor(w) {
    this.w = w;
    this.page = 'main';
    this.idx = 0;
    this.sub = 0;
    this.itemAct = 0;
    this.tree = { col: 0, row: 0 };
    this.t = 0;
    this.msg = null;
  }
  open() { return new Promise((r) => { this.resolve = r; game.pushOverlay(this); }); }
  close() { game.removeOverlay(this); this.resolve(); }

  contacts() { return PHONE.filter((c) => !c.when || c.when()); }

  update(dt, top) {
    this.t += dt;
    if (!top) return;
    const up = input.pressed('up'), down = input.pressed('down'), left = input.pressed('left'), right = input.pressed('right');
    const ok = input.pressed('confirm'), back = input.pressed('cancel') || input.pressed('menu');
    if (this.page === 'main') {
      if (up) { this.idx = (this.idx + 3) % 4; sfx.move(); }
      if (down) { this.idx = (this.idx + 1) % 4; sfx.move(); }
      if (back) { sfx.back(); this.close(); return; }
      if (ok) {
        const p = MAIN[this.idx];
        if (p === 'ITEM' && !S.items.length) { sfx.buzz(); return; }
        if (p === 'CELL' && !this.contacts().length) { sfx.buzz(); return; }
        sfx.select();
        this.page = p.toLowerCase();
        this.sub = 0;
        this.itemAct = -1;
      }
      return;
    }
    if (this.page === 'item') {
      if (this.itemAct < 0) {
        const n = S.items.length;
        if (up) { this.sub = (this.sub + n - 1) % n; sfx.move(); }
        if (down) { this.sub = (this.sub + 1) % n; sfx.move(); }
        if (ok) { this.itemAct = 0; sfx.select(); }
        if (back) { this.page = 'main'; sfx.back(); }
      } else {
        if (left) { this.itemAct = (this.itemAct + 2) % 3; sfx.move(); }
        if (right) { this.itemAct = (this.itemAct + 1) % 3; sfx.move(); }
        if (back) { this.itemAct = -1; sfx.back(); }
        if (ok) {
          const id = S.items[this.sub];
          if (this.itemAct === 0) {
            sfx.select();
            const res = useItem(this.sub);
            this.close();
            if (ITEMS[id].kind === 'food') sfx.heal();
            narrate(res.lines.join('\n'));
          } else if (this.itemAct === 1) {
            sfx.select();
            this.close();
            narrate(itemInfo(id));
          } else {
            sfx.select();
            S.items.splice(this.sub, 1);
            this.close();
            narrate(`* The ${ITEMS[id].name} was thrown away.`);
          }
        }
      }
      return;
    }
    if (this.page === 'stat') {
      if (back || ok) { this.page = 'main'; sfx.back(); }
      return;
    }
    if (this.page === 'soul') {
      const tr = this.tree;
      if (up) { tr.row = (tr.row + 3) % 4; sfx.move(); }
      if (down) { tr.row = (tr.row + 1) % 4; sfx.move(); }
      if (left) { tr.col = (tr.col + 2) % 3; sfx.move(); }
      if (right) { tr.col = (tr.col + 1) % 3; sfx.move(); }
      if (back) { this.page = 'main'; sfx.back(); }
      if (ok) {
        const node = this.node();
        if (canUnlock(node)) {
          S.skills.push(node.id);
          sfx.levelUp();
          this.flashNode = 0.6;
        } else sfx.buzz();
      }
      if (this.flashNode) this.flashNode = Math.max(0, this.flashNode - dt);
      return;
    }
    if (this.page === 'cell') {
      const list = this.contacts();
      if (up) { this.sub = (this.sub + list.length - 1) % list.length; sfx.move(); }
      if (down) { this.sub = (this.sub + 1) % list.length; sfx.move(); }
      if (back) { this.page = 'main'; sfx.back(); }
      if (ok) {
        const c = list[this.sub];
        sfx.select();
        this.close();
        this.w.run(async () => {
          sfx.phone();
          await game.wait(0.8);
          await c.call(this.w);
        });
      }
    }
  }

  node() {
    const t = SOULS[S.soul].tree;
    return [t.heart, t.soul, t.blade][this.tree.col][this.tree.row];
  }

  draw(ui) {
    const g = ui.ctx;
    const soul = SOULS[S.soul];
    // stats box
    ui.box(40, 36, 210, 130, { fill: 'rgba(0,0,0,0.95)' });
    ui.text(S.name, 60, 50, { size: 26 });
    ui.text(`LV  ${S.lv}`, 60, 84, { size: 18, family: FONTS.small });
    ui.text(`HP  ${S.hp}/${maxHp()}`, 60, 106, { size: 18, family: FONTS.small });
    ui.text(`G   ${S.gold}`, 60, 128, { size: 18, family: FONTS.small });
    ui.heart(225, 60, 14, soul.color);
    // menu box
    ui.box(40, 176, 210, 190, { fill: 'rgba(0,0,0,0.95)' });
    MAIN.forEach((m, i) => {
      const dis = (m === 'ITEM' && !S.items.length) || (m === 'CELL' && !this.contacts().length);
      const y = 198 + i * 40;
      ui.text(m, 96, y, { size: 28, color: dis ? '#666' : '#fff' });
      if (this.page === 'main' && i === this.idx) ui.heart(70, y + 15, 18, soul.color);
    });
    if (this.page === 'item') this.drawItems(ui);
    if (this.page === 'stat') this.drawStat(ui);
    if (this.page === 'soul') this.drawTree(ui);
    if (this.page === 'cell') this.drawCell(ui);
    void g;
  }

  drawItems(ui) {
    ui.box(268, 36, 652, 400, { fill: 'rgba(0,0,0,0.95)' });
    S.items.forEach((id, i) => {
      const it = ITEMS[id];
      const y = 62 + i * 40;
      ui.text(it ? it.name : id, 330, y, { size: 26, color: i === this.sub ? '#ffff00' : '#fff' });
      if (i === this.sub && this.itemAct < 0) ui.heart(304, y + 15, 18, SOULS[S.soul].color);
    });
    ['USE', 'INFO', 'DROP'].forEach((a, i) => {
      const x = 330 + i * 180;
      ui.text(a, x, 388, { size: 26, color: i === this.itemAct ? '#ffff00' : '#fff' });
      if (i === this.itemAct) ui.heart(x - 26, 403, 18, SOULS[S.soul].color);
    });
  }

  drawStat(ui) {
    const soul = SOULS[S.soul];
    ui.box(268, 36, 652, 470, { fill: 'rgba(0,0,0,0.95)' });
    const x = 300, y = 60;
    ui.text(`"${S.name}"`, x, y, { size: 28 });
    ui.text(`LV  ${S.lv}`, x, y + 50, { size: 24 });
    ui.text(`HOPE  ${S.hope}`, x + 300, y + 50, { size: 24, color: '#9ae0ff' });
    ui.text(`HP  ${S.hp} / ${maxHp()}`, x, y + 84, { size: 24 });
    ui.text(`AT  ${baseAtk()} (${weaponAtk()})`, x, y + 130, { size: 24 });
    ui.text(`DF  ${baseDef()} (${armorDef()})`, x, y + 164, { size: 24 });
    ui.text(`EXP: ${S.exp}`, x + 300, y + 130, { size: 24 });
    ui.text(`NEXT: ${nextExp()}`, x + 300, y + 164, { size: 24 });
    ui.text(`HOPE: ${S.hopeExp}  (next ${nextHope()})`, x + 300, y + 84, { size: 20, color: '#9ae0ff' });
    ui.text(`WEAPON: ${ITEMS[S.weapon]?.name ?? '-'}`, x, y + 214, { size: 24 });
    ui.text(`ARMOR: ${ITEMS[S.armor]?.name ?? '-'}`, x, y + 248, { size: 24 });
    ui.text(`GOLD: ${S.gold}`, x, y + 290, { size: 24 });
    ui.text(`KILLS: ${S.totalKills}`, x + 300, y + 290, { size: 24 });
    ui.text(`SPARES: ${S.spares}`, x + 300, y + 324, { size: 24 });
    ui.heart(x + 14, y + 358, 22, soul.color, { glow: 8 });
    ui.text(`${soul.trait}`, x + 36, y + 345, { size: 22, family: FONTS.title, color: soul.color });
    ui.text(`${soul.echo}, ${soul.echoTitle}`, x + 36, y + 380, { size: 20, color: '#aaa' });
    void atk; void def; void route;
  }

  drawTree(ui) {
    const g = ui.ctx;
    const soul = SOULS[S.soul];
    const col = soul.color;
    ui.box(268, 20, 672, 500, { fill: 'rgba(0,0,0,0.96)', stroke: col });
    ui.text(`${soul.trait} SOUL`, 294, 38, { size: 20, family: FONTS.title, color: col });
    ui.text(`SKILL POINTS  ${skillPoints()}`, 914, 40, { size: 20, family: FONTS.small, align: 'right', color: '#ffff00' });
    ui.text(`from LOVE ${S.lv - 1} + HOPE ${S.hope - 1}${S.bonusSP ? ` + ${S.bonusSP}` : ''}`, 914, 64, { size: 14, family: FONTS.small, align: 'right', color: '#999' });
    ui.text(`X: ${soul.action}   PASSIVE: ${soul.passive}`, 294, 66, { size: 16, family: FONTS.small, color: '#bbb' });
    const t = soul.tree;
    const cols = [t.heart, t.soul, t.blade];
    const names = ['HEART', 'SOUL', 'BLADE'];
    const cx = [400, 604, 808];
    cols.forEach((branch, c) => {
      ui.text(names[c], cx[c], 96, { size: 18, family: FONTS.small, align: 'center', color: '#ddd' });
      branch.forEach((n, r) => {
        const x = cx[c], y = 140 + r * 64;
        if (r > 0) {
          g.strokeStyle = hasSkill(n.id) ? col : '#444';
          g.lineWidth = 4;
          g.beginPath(); g.moveTo(x, y - 46); g.lineTo(x, y - 18); g.stroke();
        }
        const owned = hasSkill(n.id);
        const avail = canUnlock(n);
        const sel = this.tree.col === c && this.tree.row === r;
        g.save();
        g.beginPath();
        g.arc(x, y, 18, 0, Math.PI * 2);
        g.fillStyle = owned ? col : '#111';
        g.fill();
        g.lineWidth = sel ? 4 : 3;
        g.strokeStyle = sel ? '#ffff00' : avail ? col : '#555';
        if (avail && !owned) g.globalAlpha = 0.6 + Math.sin(this.t * 5) * 0.4;
        g.stroke();
        g.restore();
        const icon = n.type === 'ability' ? '*' : n.type === 'mod' ? '+' : '^';
        ui.text(icon, x, y - 12, { size: 20, family: FONTS.small, align: 'center', color: owned ? '#000' : '#aaa' });
        ui.text(n.name, x, y + 22, { size: 14, family: FONTS.small, align: 'center', color: owned ? col : sel ? '#ffff00' : '#aaa' });
      });
    });
    const n = this.node();
    const owned = hasSkill(n.id);
    ui.box(290, 400, 628, 108, { fill: '#000', border: 2 });
    ui.text(n.name, 308, 412, { size: 24, color: owned ? col : '#fff' });
    const kind = n.type === 'ability' ? 'SOUL SKILL' : n.type === 'mod' ? 'ACTION UPGRADE' : 'PASSIVE';
    ui.text(`${kind}   cost ${n.cost}`, 900, 416, { size: 16, family: FONTS.small, align: 'right', color: '#aaa' });
    drawRich(g, n.desc, 308, 446, { size: 20, width: 590 });
    const status = owned ? 'LEARNED' : canUnlock(n) ? 'Z to learn' : skillPoints() < n.cost ? 'Not enough points' : 'Learn the skill above first';
    ui.text(status, 900, 484, { size: 14, family: FONTS.small, align: 'right', color: owned ? col : '#888' });
  }

  drawCell(ui) {
    ui.box(268, 36, 652, 300, { fill: 'rgba(0,0,0,0.95)' });
    this.contacts().forEach((c, i) => {
      const y = 62 + i * 40;
      ui.text(c.name, 330, y, { size: 26, color: i === this.sub ? '#ffff00' : '#fff' });
      if (i === this.sub) ui.heart(304, y + 15, 18, SOULS[S.soul].color);
    });
  }
}

export async function openPause(w, system = false) {
  if (!system) return new PauseMenu(w).open();
  const choice = await new ListMenu('PAUSED', [
    { label: 'Resume', select: () => 'resume' },
    { label: 'Settings', select: () => 'settings' },
    { label: 'Return to title', select: () => 'title' },
  ], { w: 460 }).open();
  if (choice === 'settings') await openSettings(game.engine);
  if (choice === 'title') {
    const sure = await new ListMenu('Unsaved progress will be lost.', [
      { label: 'Stay', select: () => false },
      { label: 'Return to title', select: () => true },
    ], { w: 620 }).open();
    if (sure) {
      music.stop(0.8);
      await game.fadeOut(0.8);
      w.returnToTitle?.();
    }
  }
}
