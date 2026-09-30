// Generic list menu overlay + the settings screen.
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { sfx } from '../audio/sfx.js';
import { audio } from '../audio/audio.js';
import { settings, saveSettings } from '../core/save.js';
import { FONTS } from './fonts.js';
import { clearTextCache } from './text.js';

export class ListMenu {
  // items: [{ label, value?: () => string, left?, right?, select?, disabled? }]
  constructor(title, items, opts = {}) {
    this.title = title;
    this.items = items;
    this.idx = opts.start ?? 0;
    this.opts = opts;
    this.alpha = 0;
    this.blocking = true;
    this.pauseOverlay = !!opts.pauseOverlay;
  }

  open() {
    return new Promise((resolve) => {
      this.resolve = resolve;
      game.pushOverlay(this);
    });
  }

  close(v) {
    game.removeOverlay(this);
    this.resolve?.(v);
  }

  update(dt, top) {
    this.alpha = Math.min(1, this.alpha + dt * 8);
    if (!top) return;
    const n = this.items.length;
    if (input.pressed('up')) { this.idx = (this.idx + n - 1) % n; sfx.move(); }
    if (input.pressed('down')) { this.idx = (this.idx + 1) % n; sfx.move(); }
    const it = this.items[this.idx];
    if (input.pressed('left') && it.left) { it.left(); sfx.move(); }
    if (input.pressed('right') && it.right) { it.right(); sfx.move(); }
    if (input.pressed('confirm')) {
      if (it.disabled) sfx.buzz();
      else if (it.select) { sfx.select(); const r = it.select(); if (r !== undefined) this.close(r); }
      else if (it.right) { it.right(); sfx.move(); }
    }
    if (input.pressed('cancel') && !this.opts.noCancel) { sfx.back(); this.close(null); }
  }

  draw(ui) {
    const w = this.opts.w ?? 560;
    const rowH = this.opts.rowH ?? 40;
    const h = 90 + this.items.length * rowH;
    const x = (960 - w) / 2, y = this.opts.y ?? (540 - h) / 2;
    ui.ctx.save();
    ui.ctx.globalAlpha = this.alpha;
    if (this.opts.dim !== false) ui.fillScreen('#000', 0.55 * this.alpha);
    ui.box(x, y, w, h, { fill: 'rgba(0,0,0,0.95)' });
    ui.text(this.title, 480, y + 22, { size: 22, family: FONTS.title, align: 'center', color: this.opts.titleColor ?? '#fff' });
    this.items.forEach((it, i) => {
      const yy = y + 72 + i * rowH;
      const sel = i === this.idx;
      const col = it.disabled ? '#666' : sel ? '#ffff00' : '#fff';
      ui.text(it.label, x + 64, yy, { size: 26, color: col });
      if (it.value) ui.text(it.value(), x + w - 48, yy, { size: 26, color: col, align: 'right' });
      if (sel) ui.heart(x + 40, yy + 14, 18, this.opts.heartColor ?? '#ff2020');
    });
    if (this.opts.footer) ui.text(this.opts.footer, 480, y + h - 28, { size: 16, family: FONTS.small, align: 'center', color: '#999' });
    ui.ctx.restore();
  }
}

const bar = (v) => {
  const n = Math.round(v * 10);
  return '|'.repeat(n) + '.'.repeat(10 - n);
};

export function openSettings(engine, opts = {}) {
  const step = (k, d) => {
    settings[k] = Math.round(Math.max(0, Math.min(1, settings[k] + d)) * 10) / 10;
    audio.applyVolumes();
    saveSettings();
  };
  const QUAL = ['LOW', 'MEDIUM', 'HIGH'];
  const SPEED = { 0.6: 'SLOW', 1: 'NORMAL', 1.6: 'FAST' };
  const speeds = [0.6, 1, 1.6];
  const items = [
    { label: 'Master volume', value: () => bar(settings.master), left: () => step('master', -0.1), right: () => step('master', 0.1) },
    { label: 'Music', value: () => bar(settings.music), left: () => step('music', -0.1), right: () => step('music', 0.1) },
    { label: 'Sound effects', value: () => bar(settings.sfx), left: () => { step('sfx', -0.1); sfx.select(); }, right: () => { step('sfx', 0.1); sfx.select(); } },
    {
      label: 'Graphics', value: () => QUAL[settings.quality],
      left: () => { settings.quality = Math.max(0, settings.quality - 1); engine.setQuality(settings.quality); saveSettings(); },
      right: () => { settings.quality = Math.min(2, settings.quality + 1); engine.setQuality(settings.quality); saveSettings(); },
    },
    {
      label: 'Retro pixels', value: () => (settings.pixel ? 'ON' : 'OFF'),
      left: () => { settings.pixel = !settings.pixel; saveSettings(); }, right: () => { settings.pixel = !settings.pixel; saveSettings(); },
    },
    {
      label: 'Screen shake', value: () => (settings.shake ? 'ON' : 'OFF'),
      left: () => { settings.shake = !settings.shake; saveSettings(); }, right: () => { settings.shake = !settings.shake; saveSettings(); },
    },
    {
      label: 'Text speed', value: () => SPEED[settings.textSpeed] || 'NORMAL',
      left: () => { const i = speeds.indexOf(settings.textSpeed); settings.textSpeed = speeds[Math.max(0, (i < 0 ? 1 : i) - 1)]; saveSettings(); },
      right: () => { const i = speeds.indexOf(settings.textSpeed); settings.textSpeed = speeds[Math.min(2, (i < 0 ? 1 : i) + 1)]; saveSettings(); },
    },
    { label: 'Done', select: () => true },
  ];
  clearTextCache();
  return new ListMenu('SETTINGS', items, { w: 640, rowH: 42, footer: 'LEFT / RIGHT to change', ...opts }).open();
}
