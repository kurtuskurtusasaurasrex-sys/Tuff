// Shops: BUY / SELL / TALK / EXIT.
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { S } from '../core/save.js';
import { ITEMS } from '../data/items.js';
import { sfx } from '../audio/sfx.js';
import { FONTS } from './fonts.js';
import { drawRich } from './text.js';
import { say } from './dialogue.js';

class Shop {
  constructor(w, opts) {
    this.w = w;
    this.o = opts;
    this.page = 'main';
    this.idx = 0;
    this.sub = 0;
    this.msg = opts.greet || '* Hello, traveler.\n* How can I help you?';
  }
  open() { return new Promise((r) => { this.resolve = r; game.pushOverlay(this); }); }
  close() { game.removeOverlay(this); this.resolve(); }
  menu() { return ['Buy', ...(this.o.sell !== false ? ['Sell'] : []), ...(this.o.talk ? ['Talk'] : []), 'Exit']; }
  update(dt, top) {
    if (!top) return;
    if (this.page === 'main') {
      const m = this.menu();
      if (input.pressed('up')) { this.idx = (this.idx + m.length - 1) % m.length; sfx.move(); }
      if (input.pressed('down')) { this.idx = (this.idx + 1) % m.length; sfx.move(); }
      if (input.pressed('cancel')) { sfx.back(); this.close(); return; }
      if (input.pressed('confirm')) {
        const c = m[this.idx];
        sfx.select();
        if (c === 'Exit') { this.close(); return; }
        if (c === 'Buy') { this.page = 'buy'; this.sub = 0; this.msg = '* Take your time.'; }
        if (c === 'Sell') { this.page = 'sell'; this.sub = 0; this.msg = S.items.length ? '* What have you got?' : '* You have nothing to sell.'; }
        if (c === 'Talk') { this.close(); this.o.talk(this.w); }
      }
      return;
    }
    const list = this.page === 'buy' ? this.o.items : S.items;
    const n = list.length + 1;
    if (input.pressed('up')) { this.sub = (this.sub + n - 1) % n; sfx.move(); }
    if (input.pressed('down')) { this.sub = (this.sub + 1) % n; sfx.move(); }
    if (input.pressed('cancel') || (input.pressed('confirm') && this.sub === n - 1)) { sfx.back(); this.page = 'main'; this.msg = '* Anything else?'; return; }
    if (input.pressed('confirm')) {
      if (this.page === 'buy') {
        const [id, price] = this.o.items[this.sub];
        if (S.gold < price) { sfx.buzz(); this.msg = '* You don\'t have enough gold.'; }
        else if (S.items.length >= 8) { sfx.buzz(); this.msg = '* You\'re carrying too much.'; }
        else { S.gold -= price; S.items.push(id); sfx.buy(); this.msg = '* Thanks for your purchase!'; }
      } else {
        const id = S.items[this.sub];
        const it = ITEMS[id];
        const price = Math.max(1, Math.floor((it.price || 4) / 2));
        S.items.splice(this.sub, 1);
        S.gold += price;
        sfx.buy();
        this.msg = `* Sold the ${it.name} for ${price}G.`;
        this.sub = Math.min(this.sub, S.items.length);
      }
    }
  }
  draw(ui) {
    ui.fillScreen('#000', 0.6);
    ui.box(40, 260, 560, 250, { fill: 'rgba(0,0,0,0.96)' });
    ui.box(600, 260, 320, 250, { fill: 'rgba(0,0,0,0.96)' });
    ui.text(this.o.name, 480, 220, { size: 22, family: FONTS.title, align: 'center', glow: '#000' });
    if (this.page === 'main') {
      drawRich(ui.ctx, this.msg, 70, 290, { size: 24, width: 500 });
      this.menu().forEach((m, i) => {
        ui.text(m, 660, 290 + i * 40, { size: 26, color: i === this.idx ? '#ffff00' : '#fff' });
        if (i === this.idx) ui.heart(638, 304 + i * 40, 16, '#ff2020');
      });
    } else {
      const list = this.page === 'buy' ? this.o.items.map(([id, p]) => [ITEMS[id].name, `${p}G`]) : S.items.map((id) => [ITEMS[id].name, `${Math.max(1, Math.floor((ITEMS[id].price || 4) / 2))}G`]);
      list.push(['Exit', '']);
      list.forEach(([name, price], i) => {
        const y = 280 + i * 30;
        ui.text(name, 90, y, { size: 22, color: i === this.sub ? '#ffff00' : '#fff' });
        ui.text(price, 560, y, { size: 22, align: 'right', color: '#ffb04a' });
        if (i === this.sub) ui.heart(70, y + 12, 14, '#ff2020');
      });
      drawRich(ui.ctx, this.msg, 620, 290, { size: 20, width: 280 });
      const cur = this.page === 'buy' ? this.o.items[this.sub]?.[0] : S.items[this.sub];
      if (cur && ITEMS[cur]) drawRich(ui.ctx, ITEMS[cur].desc, 620, 380, { size: 16, width: 280, family: FONTS.small });
    }
    ui.text(`${S.gold}G   ${S.items.length}/8`, 900, 480, { size: 20, align: 'right', color: '#ffb04a' });
  }
}

export async function openShop(w, opts) {
  await new Shop(w, opts).open();
  if (opts.bye) await say(opts.keeper, opts.bye);
}
