// Turns keyboard / gamepad / touch into the 7-bit input word used by the sim.
// The game has exactly four controls: MOVE (a stick or WASD/arrows), ATTACK, SPECIAL, GUARD (+direction = dodge).
// Keys are rebindable (CONTROLS screen) and saved in localStorage.

import { IN } from './config.js';

export const ACTIONS = ['L', 'R', 'U', 'D', 'ATK', 'SPC', 'GRD'];
export const ACTION_LABEL = { L: 'LEFT', R: 'RIGHT', U: 'UP', D: 'DOWN', ATK: 'ATTACK', SPC: 'SPECIAL', GRD: 'GUARD / DODGE' };

const DEFAULT_BINDS = {
  p1: { L: ['KeyA'], R: ['KeyD'], U: ['KeyW'], D: ['KeyS'], ATK: ['KeyF'], SPC: ['KeyG'], GRD: ['KeyH'] },
  p2: { L: ['ArrowLeft'], R: ['ArrowRight'], U: ['ArrowUp'], D: ['ArrowDown'], ATK: ['Comma', 'Numpad1'], SPC: ['Period', 'Numpad2'], GRD: ['Slash', 'Numpad3'] },
};
// extra keys that only work when ONE person plays on the keyboard (so anybody can pick up and play)
const SOLO_EXTRA = { ATK: ['KeyJ', 'KeyZ', 'Space'], SPC: ['KeyK', 'KeyX'], GRD: ['KeyL', 'KeyC', 'ShiftLeft', 'ShiftRight'] };

const clone = (o) => JSON.parse(JSON.stringify(o));
let binds = load();
function load() {
  try {
    const v = JSON.parse(localStorage.getItem('tuff.keys'));
    if (v && ['p1', 'p2'].every((p) => v[p] && ACTIONS.every((a) => Array.isArray(v[p][a])))) return v;
  } catch (e) { /* first run / private mode */ }
  return clone(DEFAULT_BINDS);
}
function persist() { try { localStorage.setItem('tuff.keys', JSON.stringify(binds)); } catch (e) { /* ignore */ } }

export function keyName(c) {
  const map = { Space: 'SPACE', ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓', Comma: ',', Period: '.', Slash: '/', Semicolon: ';', Quote: "'", BracketLeft: '[', BracketRight: ']', Backslash: '\\', Minus: '-', Equal: '=', Backquote: '`', ShiftLeft: 'L-SHIFT', ShiftRight: 'R-SHIFT', ControlLeft: 'L-CTRL', ControlRight: 'R-CTRL', AltLeft: 'L-ALT', AltRight: 'R-ALT', Enter: 'ENTER', Tab: 'TAB', Backspace: 'BKSP' };
  if (!c) return '-';
  if (map[c]) return map[c];
  if (c.startsWith('Key')) return c.slice(3);
  if (c.startsWith('Digit')) return c.slice(5);
  if (c.startsWith('Numpad')) return 'NUM ' + c.slice(6);
  return c;
}

const down = new Set();
const touch = { bits: 0 };
const BLOCK = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Tab', 'Slash', 'Quote']);
const typing = (e) => e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
addEventListener('keydown', (e) => {
  down.add(e.code);
  if (BLOCK.has(e.code) && !typing(e)) e.preventDefault();
});
addEventListener('keyup', (e) => down.delete(e.code));
addEventListener('blur', () => { down.clear(); touch.bits = 0; });

const anyDown = (codes) => codes.some((c) => down.has(c));
function fromKeys(...maps) {
  let b = 0;
  for (const m of maps) for (const a of ACTIONS) if (m[a] && anyDown(m[a])) b |= IN[a];
  return b;
}

function fromPad(pad) {
  if (!pad) return 0;
  let b = 0;
  const ax = pad.axes[0] || 0, ay = pad.axes[1] || 0, dz = 0.4;
  const btn = (i) => pad.buttons[i] && pad.buttons[i].pressed;
  if (ax < -dz || btn(14)) b |= IN.L;
  if (ax > dz || btn(15)) b |= IN.R;
  if (ay < -dz || btn(12)) b |= IN.U;
  if (ay > dz || btn(13)) b |= IN.D;
  if (btn(0) || btn(2)) b |= IN.ATK;
  if (btn(1) || btn(3)) b |= IN.SPC;
  if (btn(4) || btn(5) || btn(6) || btn(7)) b |= IN.GRD;
  return b;
}
const pads = () => (navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : []);

export const Input = {
  get binds() { return binds; },
  defaults: DEFAULT_BINDS,
  touch,
  // `ord` = which local human (0..3); `humans` = how many people share this keyboard.
  // One person: every key cluster works. Two: P1 and P2 use their own cluster. Pads always map by order.
  bits(ord, humans) {
    const p = pads();
    if (humans <= 1) {
      let b = fromKeys(binds.p1, binds.p2, SOLO_EXTRA) | touch.bits;
      for (const g of p) b |= fromPad(g);
      return b;
    }
    const keys = ord === 0 ? fromKeys(binds.p1) : ord === 1 ? fromKeys(binds.p2) : 0;
    return keys | fromPad(p[ord]);
  },
  // menu navigation for keyboard owners: returns { who: 'p1'|'p2'|'solo', action } or null
  menuAction(code) {
    const find = (m) => { for (const a of ACTIONS) if (m[a].includes(code)) return a; return null; };
    const map = { L: 'left', R: 'right', U: 'up', D: 'down', ATK: 'ok', SPC: 'back', GRD: 'back' };
    const a1 = find(binds.p1), a2 = find(binds.p2);
    if (a1) return { who: 'p1', action: map[a1] };
    if (a2) return { who: 'p2', action: map[a2] };
    for (const a of ['ATK', 'SPC', 'GRD']) if (SOLO_EXTRA[a].includes(code)) return { who: 'solo', action: map[a] };
    return null;
  },
  anyPad() { return pads().length > 0; },
  padCount() { return pads().length; },
  isDown: (code) => down.has(code),

  // ---- rebinding ----
  setBind(player, action, code) {
    for (const pl of ['p1', 'p2']) for (const a of ACTIONS) binds[pl][a] = binds[pl][a].filter((c) => c !== code);   // one key, one job
    binds[player][action] = [code];
    persist();
  },
  resetBinds() { binds = clone(DEFAULT_BINDS); persist(); },
  bindLabel(player, action) { return binds[player][action].map(keyName).join(' / ') || '-'; },
};

// ---- on-screen controls (touch devices): floating stick anywhere on the left half + three buttons ----------------------------
export function setupTouch(root) {
  const stick = root.querySelector('.tc-stick'), knob = root.querySelector('.tc-knob'), zone = root.querySelector('.tc-zone');
  const btns = root.querySelectorAll('[data-bit]');
  let stickId = null, cx = 0, cy = 0;
  const R = 52;

  function setStick(x, y) {
    let dx = x - cx, dy = y - cy;
    const l = Math.hypot(dx, dy);
    if (l > R) { cx += (dx / l) * (l - R); cy += (dy / l) * (l - R); dx = (dx / l) * R; dy = (dy / l) * R; }     // base follows the thumb
    stick.style.left = cx + 'px'; stick.style.top = cy + 'px';
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    let b = touch.bits & ~(IN.L | IN.R | IN.U | IN.D);
    const t = 14;
    if (dx < -t) b |= IN.L; else if (dx > t) b |= IN.R;
    if (dy < -t) b |= IN.U; else if (dy > t) b |= IN.D;
    touch.bits = b;
  }
  zone.addEventListener('pointerdown', (e) => {
    if (stickId !== null) return;
    stickId = e.pointerId; zone.setPointerCapture(e.pointerId);
    cx = e.clientX; cy = e.clientY;
    stick.classList.add('live'); setStick(e.clientX, e.clientY); e.preventDefault();
  });
  zone.addEventListener('pointermove', (e) => { if (e.pointerId === stickId) setStick(e.clientX, e.clientY); });
  const endStick = (e) => {
    if (e.pointerId !== stickId) return;
    stickId = null; stick.classList.remove('live'); knob.style.transform = '';
    touch.bits &= ~(IN.L | IN.R | IN.U | IN.D);
  };
  zone.addEventListener('pointerup', endStick); zone.addEventListener('pointercancel', endStick);

  btns.forEach((el) => {
    const bit = IN[el.dataset.bit];
    el.addEventListener('pointerdown', (e) => { el.setPointerCapture(e.pointerId); touch.bits |= bit; el.classList.add('on'); if (navigator.vibrate) navigator.vibrate(8); e.preventDefault(); });
    const up = () => { touch.bits &= ~bit; el.classList.remove('on'); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('lostpointercapture', up);
  });
}
