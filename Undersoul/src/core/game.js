// Central game object: mode switching, overlay stack, async scheduling,
// screen fades. Cutscenes are written as async functions that await these.
import { input } from './input.js';

class Game {
  constructor() {
    this.time = 0;
    this.realTime = 0;
    this.mode = null;
    this.overlays = [];
    this.waiters = [];
    this.fadeAlpha = 0;
    this.fadeColor = '#000';
    this.fadeTween = null;
    this.topDrawers = new Set();
    this.paused = false;
    this.flashAlpha = 0;
    this.letterbox = 0;
    this.letterboxTarget = 0;
  }

  init(engine, ui) {
    this.engine = engine;
    this.ui = ui;
  }

  setMode(mode) {
    if (this.mode && this.mode.exit) this.mode.exit();
    this.mode = mode;
    if (mode && mode.enter) mode.enter();
  }

  // ---- async helpers ----
  wait(sec) {
    return new Promise((resolve) => this.waiters.push({ t: this.time + sec, resolve }));
  }
  frame() {
    return new Promise((resolve) => this.waiters.push({ t: -1, resolve }));
  }
  async waitUntil(pred) {
    while (!pred()) await this.frame();
  }
  async waitConfirm() {
    await this.frame();
    while (!input.pressed('confirm')) await this.frame();
  }

  // Tween any numeric function over time; resolves when done.
  tween(duration, fn, easeFn = (t) => t) {
    return new Promise((resolve) => {
      const start = this.time;
      const step = () => {
        const t = Math.min(1, (this.time - start) / Math.max(duration, 0.0001));
        fn(easeFn(t));
        if (t >= 1) resolve();
        else this.frame().then(step);
      };
      step();
    });
  }

  fade(to, duration = 0.5, color) {
    if (color) this.fadeColor = color;
    const from = this.fadeAlpha;
    return this.tween(duration, (t) => { this.fadeAlpha = from + (to - from) * t; });
  }
  fadeOut(d = 0.5, color = '#000') { return this.fade(1, d, color); }
  fadeIn(d = 0.5) { return this.fade(0, d); }

  flash(amount = 1) { this.flashAlpha = amount; }

  // ---- overlays (dialogue boxes, menus) ----
  pushOverlay(o) {
    this.overlays.push(o);
    return o;
  }
  removeOverlay(o) {
    const i = this.overlays.indexOf(o);
    if (i >= 0) this.overlays.splice(i, 1);
  }
  get busy() {
    return this.overlays.some((o) => o.blocking !== false);
  }

  update(dt) {
    this.realTime += dt;
    if (this.paused) {
      const top = this.overlays[this.overlays.length - 1];
      if (top && top.pauseOverlay) top.update(dt, true);
      return;
    }
    this.time += dt;
    // resolve timers
    if (this.waiters.length) {
      const ready = [];
      this.waiters = this.waiters.filter((w) => {
        if (w.t <= this.time) { ready.push(w); return false; }
        return true;
      });
      for (const w of ready) w.resolve();
    }
    // top overlay gets input; if any overlay was open at the start of the
    // frame, the mode must not also react to this frame's key presses.
    const busyBefore = this.busy;
    const top = this.overlays[this.overlays.length - 1];
    for (const o of [...this.overlays]) o.update(dt, o === top);
    if (this.mode) this.mode.update(dt, busyBefore || this.busy);
    this.flashAlpha = Math.max(0, this.flashAlpha - dt * 3);
    this.letterbox += (this.letterboxTarget - this.letterbox) * Math.min(1, dt * 6);
  }

  draw(ui) {
    if (this.mode && this.mode.draw) this.mode.draw(ui);
    if (this.letterbox > 0.002) {
      const g = ui.ctx;
      const h = 60 * this.letterbox;
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.fillStyle = '#000';
      const H = ui.canvas.height, W = ui.canvas.width;
      const px = h * ui.scale * ui.dpr + ui.oy * ui.dpr;
      g.fillRect(0, 0, W, px);
      g.fillRect(0, H - px, W, px);
      g.restore();
    }
    for (const o of this.overlays) o.draw(ui);
    if (this.fadeAlpha > 0.001) ui.fillScreen(this.fadeColor, this.fadeAlpha);
    if (this.flashAlpha > 0.001) ui.fillScreen('#fff', this.flashAlpha);
    for (const d of this.topDrawers) d(ui);
  }
}

export const game = new Game();
