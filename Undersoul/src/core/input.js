// Unified input: keyboard, gamepad and on-screen touch buttons all feed the
// same action map. `pressed` is edge-triggered and cleared at end of frame.

const KEYMAP = {
  ArrowUp: 'up', KeyW: 'up',
  ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left',
  ArrowRight: 'right', KeyD: 'right',
  KeyZ: 'confirm', Enter: 'confirm', NumpadEnter: 'confirm', Space: 'confirm',
  KeyX: 'cancel', ShiftLeft: 'cancel', ShiftRight: 'cancel', Backspace: 'cancel',
  KeyC: 'menu', ControlLeft: 'menu', ControlRight: 'menu',
  Escape: 'pause',
};

const ACTIONS = ['up', 'down', 'left', 'right', 'confirm', 'cancel', 'menu', 'pause'];

class Input {
  constructor() {
    this.down = {};
    this.pressedNow = {};
    this.releasedNow = {};
    this.sources = {}; // action -> Set of sources holding it
    this.textListeners = [];
    this.lastDevice = 'keyboard';
    this.padPrev = {};
    for (const a of ACTIONS) {
      this.down[a] = false;
      this.sources[a] = new Set();
    }
    this.onFirstGesture = [];
    this._gestured = false;

    window.addEventListener('keydown', (e) => {
      this._gesture();
      if (this.textListeners.length && this._routeText(e)) return;
      const a = KEYMAP[e.code];
      if (!a) return;
      e.preventDefault();
      if (e.repeat) return;
      this.lastDevice = 'keyboard';
      this._press(a, 'key:' + e.code);
    });
    window.addEventListener('keyup', (e) => {
      const a = KEYMAP[e.code];
      if (!a) return;
      e.preventDefault();
      this._release(a, 'key:' + e.code);
    });
    window.addEventListener('blur', () => this.releaseAll());
    window.addEventListener('pointerdown', () => this._gesture(), { passive: true });
    window.addEventListener('touchstart', () => this._gesture(), { passive: true });
  }

  _gesture() {
    if (this._gestured) return;
    this._gestured = true;
    for (const fn of this.onFirstGesture) fn();
  }

  _routeText(e) {
    // Name-entry screens want raw characters.
    const top = this.textListeners[this.textListeners.length - 1];
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && /[A-Za-z0-9 !?.'-]/.test(e.key)) {
      e.preventDefault();
      top.onChar(e.key);
      return true;
    }
    if (e.code === 'Backspace') {
      e.preventDefault();
      top.onBackspace();
      return true;
    }
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && top.onEnter) {
      e.preventDefault();
      if (!e.repeat) top.onEnter();
      return true;
    }
    return false;
  }

  pushText(listener) { this.textListeners.push(listener); }
  popText(listener) {
    const i = this.textListeners.indexOf(listener);
    if (i >= 0) this.textListeners.splice(i, 1);
  }

  _press(a, src) {
    const set = this.sources[a];
    if (set.size === 0) {
      this.down[a] = true;
      this.pressedNow[a] = true;
    }
    set.add(src);
  }

  _release(a, src) {
    const set = this.sources[a];
    if (!set.has(src)) return;
    set.delete(src);
    if (set.size === 0) {
      this.down[a] = false;
      this.releasedNow[a] = true;
    }
  }

  releaseAll() {
    for (const a of ACTIONS) {
      this.sources[a].clear();
      this.down[a] = false;
    }
  }

  // Called once per frame before game logic.
  poll() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (const pad of pads) {
      if (!pad) continue;
      const b = (i) => pad.buttons[i] && pad.buttons[i].pressed;
      const ax = pad.axes[0] || 0, ay = pad.axes[1] || 0;
      const state = {
        confirm: b(0),
        cancel: b(1) || b(2),
        menu: b(3),
        pause: b(9),
        up: b(12) || ay < -0.5,
        down: b(13) || ay > 0.5,
        left: b(14) || ax < -0.5,
        right: b(15) || ax > 0.5,
      };
      const key = 'pad' + pad.index;
      for (const a of ACTIONS) {
        const was = this.padPrev[key + a];
        if (state[a] && !was) { this._press(a, key); this.lastDevice = 'gamepad'; this._gesture(); }
        if (!state[a] && was) this._release(a, key);
        this.padPrev[key + a] = state[a];
      }
    }
  }

  endFrame() {
    this.pressedNow = {};
    this.releasedNow = {};
  }

  held(a) { return this.down[a]; }
  pressed(a) { return !!this.pressedNow[a]; }
  released(a) { return !!this.releasedNow[a]; }
  consume(a) { const p = !!this.pressedNow[a]; this.pressedNow[a] = false; return p; }

  axis() {
    let x = 0, y = 0;
    if (this.down.left) x -= 1;
    if (this.down.right) x += 1;
    if (this.down.up) y -= 1;
    if (this.down.down) y += 1;
    return { x, y };
  }

  // Touch buttons call these.
  touchPress(a, id) { this.lastDevice = 'touch'; this._press(a, 'touch:' + id); }
  touchRelease(a, id) { this._release(a, 'touch:' + id); }
}

export const input = new Input();
