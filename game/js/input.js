// Turns keyboard / gamepad / touch into the 7-bit input word used by the sim.
// The game has exactly four controls: MOVE (a stick or WASD/arrows), ATTACK, SPECIAL, GUARD (+direction = dodge).

import { IN } from './config.js';

const KEYS = {
  solo: {   // online + vs CPU: both clusters work at once
    L: ['ArrowLeft', 'KeyA'], R: ['ArrowRight', 'KeyD'], U: ['ArrowUp', 'KeyW'], D: ['ArrowDown', 'KeyS'],
    ATK: ['KeyJ', 'KeyZ', 'Space'], SPC: ['KeyK', 'KeyX'], GRD: ['KeyL', 'KeyC', 'ShiftLeft', 'ShiftRight'],
  },
  p1: { L: ['KeyA'], R: ['KeyD'], U: ['KeyW'], D: ['KeyS'], ATK: ['KeyF'], SPC: ['KeyG'], GRD: ['KeyH'] },
  p2: { L: ['ArrowLeft'], R: ['ArrowRight'], U: ['ArrowUp'], D: ['ArrowDown'], ATK: ['KeyK'], SPC: ['KeyL'], GRD: ['Semicolon'] },
};
export const KEY_HELP = {
  solo: { move: 'WASD / Arrows', atk: 'J / Z / Space', spc: 'K / X', grd: 'L / C / Shift' },
  p1: { move: 'WASD', atk: 'F', spc: 'G', grd: 'H' },
  p2: { move: 'Arrows', atk: 'K', spc: 'L', grd: ';' },
};

const down = new Set();
const touch = { bits: 0 };
let mode = 'solo';                     // 'solo' | 'local'
const BLOCK = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space']);

addEventListener('keydown', (e) => {
  down.add(e.code);
  if (BLOCK.has(e.code) && !(e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName))) e.preventDefault();
});
addEventListener('keyup', (e) => down.delete(e.code));
addEventListener('blur', () => { down.clear(); touch.bits = 0; });

function fromKeys(map) {
  let b = 0;
  for (const [name, codes] of Object.entries(map)) if (codes.some((c) => down.has(c))) b |= IN[name];
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
  setMode(m) { mode = m; },
  get mode() { return mode; },
  touch,
  // slot: 0/1 for local 2P, anything else = the single local player
  bits(slot) {
    if (mode === 'local') {
      const p = pads();
      return fromKeys(slot === 0 ? KEYS.p1 : KEYS.p2) | fromPad(p[slot]);
    }
    let b = fromKeys(KEYS.solo) | touch.bits;
    for (const p of pads()) b |= fromPad(p);
    return b;
  },
  anyPad() { return pads().length > 0; },
  isDown: (code) => down.has(code),
};

// ---- on-screen controls (touch devices) --------------------------------------------------------
export function setupTouch(root) {
  const stick = root.querySelector('.tc-stick'), knob = root.querySelector('.tc-knob');
  const btns = root.querySelectorAll('[data-bit]');
  let stickId = null, cx = 0, cy = 0;
  const R = 52;

  function setStick(x, y) {
    let dx = x - cx, dy = y - cy;
    const l = Math.hypot(dx, dy);
    if (l > R) { dx = dx / l * R; dy = dy / l * R; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    let b = touch.bits & ~(IN.L | IN.R | IN.U | IN.D);
    const t = 16;
    if (dx < -t) b |= IN.L; else if (dx > t) b |= IN.R;
    if (dy < -t) b |= IN.U; else if (dy > t) b |= IN.D;
    touch.bits = b;
  }
  stick.addEventListener('pointerdown', (e) => {
    stickId = e.pointerId; stick.setPointerCapture(e.pointerId);
    const r = stick.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2;
    setStick(e.clientX, e.clientY); e.preventDefault();
  });
  stick.addEventListener('pointermove', (e) => { if (e.pointerId === stickId) setStick(e.clientX, e.clientY); });
  const endStick = (e) => {
    if (e.pointerId !== stickId) return;
    stickId = null; knob.style.transform = '';
    touch.bits &= ~(IN.L | IN.R | IN.U | IN.D);
  };
  stick.addEventListener('pointerup', endStick); stick.addEventListener('pointercancel', endStick);

  btns.forEach((el) => {
    const bit = IN[el.dataset.bit];
    el.addEventListener('pointerdown', (e) => { el.setPointerCapture(e.pointerId); touch.bits |= bit; el.classList.add('on'); e.preventDefault(); });
    const up = () => { touch.bits &= ~bit; el.classList.remove('on'); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('lostpointercapture', up);
  });
}
