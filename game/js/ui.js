// DOM screens, menu navigation and the character-select screen.

import { CHARS, ROSTER, LOCKED_SLOTS } from './chars/index.js';
import { Sound } from './audio.js';

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// ------------------------------------------------------------------------------------ screens
let toastTimer = 0;
export const UI = {
  current: null,
  backHandlers: {},
  show(id) {
    for (const el of $$('.screen')) el.classList.toggle('show', el.id === 's-' + id);
    this.current = id;
    const menu = $('#s-' + id + ' [data-menu]');
    if (menu) Nav.focus(menu, 0);
  },
  hide(id) { const el = $('#s-' + id); if (el) el.classList.remove('show'); if (this.current === id) this.current = null; },
  isShown(id) { const el = $('#s-' + id); return !!el && el.classList.contains('show'); },
  toast(msg, err = false, ms = 3200) {
    const t = $('#toast'); t.textContent = msg; t.className = 'show' + (err ? ' err' : '');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.className = ''; }, ms);
  },
};

// vertical button menus: keyboard, gamepad, mouse and touch
export const Nav = {
  menu: null, idx: 0,
  focus(menu, i) {
    this.menu = menu; this.idx = i;
    const bs = this.buttons();
    bs.forEach((b, k) => b.classList.toggle('sel', k === i));
  },
  buttons() { return this.menu ? $$('button:not(:disabled)', this.menu).filter((b) => b.offsetParent !== null || true) : []; },
  move(d) {
    const bs = this.buttons(); if (!bs.length) return;
    this.idx = (this.idx + d + bs.length) % bs.length;
    bs.forEach((b, k) => b.classList.toggle('sel', k === this.idx));
    Sound.play('menuMove');
  },
  ok() { const b = this.buttons()[this.idx]; if (b) { Sound.play('menuOk'); b.click(); } },
};
document.addEventListener('pointerover', (e) => {
  const b = e.target.closest && e.target.closest('[data-menu] button');
  if (!b) return;
  const menu = b.closest('[data-menu]'); const i = $$('button', menu).indexOf(b);
  if (Nav.menu !== menu || Nav.idx !== i) Nav.focus(menu, i);
});

const KEY_ACTION = {
  ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
  Enter: 'ok', Space: 'ok', KeyJ: 'ok', KeyZ: 'ok', Escape: 'back', Backspace: 'back', KeyK: 'back', KeyX: 'back',
};

let selectHook = null;       // the Select instance while its screen is up
export function setSelectHook(h) { selectHook = h; }

// returns true if the UI consumed the key
export function uiKey(e) {
  const tag = e.target && e.target.tagName;
  if (tag === 'INPUT') {
    if (e.code === 'Escape') { e.target.blur(); return true; }
    return false;                                           // typing / Enter handled by the page
  }
  const cur = UI.current;
  if (!cur || cur === 'loading' || cur === 'title') return false;
  if (selectHook && cur === 'select') return selectHook.key(e);
  const act = KEY_ACTION[e.code];
  if (!act) return false;
  const screen = $('#s-' + cur);
  if (screen && $('[data-menu]', screen)) {
    if (act === 'up') { Nav.move(-1); return true; }
    if (act === 'down') { Nav.move(1); return true; }
    if (act === 'ok') { Nav.ok(); return true; }
  } else if (act === 'ok' && (e.code === 'Enter' || e.code === 'Space') && tag !== 'BUTTON') {
    return false;
  }
  if (act === 'back') { uiBack(); return true; }
  return false;
}

export function uiBack() {
  const cur = UI.current; if (!cur) return;
  const target = $('#s-' + cur).dataset.back;
  if (UI.backHandlers[cur]) UI.backHandlers[cur]();
  else if (target) { Sound.play('menuBack'); if (UI.backHandlers['*']) UI.backHandlers['*'](target); }
}

// ------------------------------------------------------------------------------------ gamepad edge detector for menus
const padPrev = {};
export function pollPadUi() {
  if (!navigator.getGamepads) return;
  const pads = Array.from(navigator.getGamepads()).filter(Boolean);
  pads.forEach((pad, pi) => {
    const prev = padPrev[pi] || (padPrev[pi] = {});
    const ax = pad.axes[0] || 0, ay = pad.axes[1] || 0;
    const now = {
      up: ay < -0.6 || (pad.buttons[12] && pad.buttons[12].pressed), down: ay > 0.6 || (pad.buttons[13] && pad.buttons[13].pressed),
      left: ax < -0.6 || (pad.buttons[14] && pad.buttons[14].pressed), right: ax > 0.6 || (pad.buttons[15] && pad.buttons[15].pressed),
      ok: (pad.buttons[0] && pad.buttons[0].pressed) || (pad.buttons[9] && pad.buttons[9].pressed),
      back: pad.buttons[1] && pad.buttons[1].pressed,
    };
    for (const a of Object.keys(now)) {
      if (now[a] && !prev[a]) padAction(a, pi);
      prev[a] = now[a];
    }
  });
}
function padAction(a, pi) {
  const cur = UI.current;
  if (!cur || cur === 'loading') return;
  if (cur === 'title') { document.dispatchEvent(new CustomEvent('tuff-any')); return; }
  if (selectHook && cur === 'select') return selectHook.pad(pi, a);
  const screen = $('#s-' + cur);
  if (screen && $('[data-menu]', screen)) {
    if (a === 'up') Nav.move(-1); else if (a === 'down') Nav.move(1); else if (a === 'ok') Nav.ok();
  }
  if (a === 'back') uiBack();
}

// ------------------------------------------------------------------------------------ character select
const CARD_SLOTS = ROSTER.length + LOCKED_SLOTS;

export class Select {
  constructor(assets) {
    this.A = assets;
    this.grid = $('#sel-grid'); this.info = $('#sel-info');
    this.buildCards();
    $('#btn-sel-back').addEventListener('click', () => this.back());
  }

  buildCards() {
    this.grid.innerHTML = '';
    this.cards = [];
    for (let i = 0; i < CARD_SLOTS; i++) {
      const card = document.createElement('div');
      card.className = 'card' + (i >= ROSTER.length ? ' locked' : '');
      if (i < ROSTER.length) {
        const C = CHARS[ROSTER[i]];
        const cv = document.createElement('canvas'); cv.width = 128; cv.height = 150;
        this.portrait(cv, C);
        card.appendChild(cv);
        const nm = document.createElement('div'); nm.className = 'nm'; nm.textContent = C.name; card.appendChild(nm);
        card.insertAdjacentHTML('beforeend', '<span class="mark p1">P1</span><span class="mark p2">P2</span>');
        card.addEventListener('click', () => this.click(i));
        card.addEventListener('pointerenter', () => this.hover(i));
      }
      this.grid.appendChild(card);
      this.cards.push(card);
    }
  }

  portrait(cv, C) {
    const at = this.A.atlas[C.atlas], name = C.atlas === 'sans' ? 'idle_eye' : 'idle0', m = at.frames[name];
    const g = cv.getContext('2d'); g.imageSmoothingEnabled = false;
    const s = Math.max(1, Math.floor(Math.min(cv.width / m.w, (cv.height - 8) / m.h)));
    g.drawImage(at.img, m.x, m.y, m.w, m.h, Math.round((cv.width - m.w * s) / 2), cv.height - 4 - m.h * s, m.w * s, m.h * s);
  }

  // kind: 'local' | 'cpu' | 'online'
  open({ kind, localIdx = 0, onComplete, onPick, onBack, level }) {
    this.kind = kind; this.localIdx = localIdx; this.onComplete = onComplete; this.onPick = onPick; this.onBackCb = onBack;
    this.cur = [0, ROSTER.length > 1 ? 1 : 0];          // cursor per slot (indices into ROSTER)
    this.ok = [false, false];
    this.active = kind === 'online' ? localIdx : 0;     // which slot the (single) human is steering
    this.focusSlot = this.active;
    this.done = false;
    $('#cpu-opts').hidden = kind !== 'cpu';
    $('#sel-title').textContent = kind === 'online' ? 'CHOOSE YOUR FIGHTER' : kind === 'cpu' ? 'CHOOSE YOUR FIGHTER' : 'PLAYERS, PICK YOUR FIGHTERS';
    setSelectHook(this);
    this.render();
  }
  close() { setSelectHook(null); }

  // remote player's cursor / lock-in (online)
  setRemote(slot, idx, ok) { if (this.kind !== 'online') return; this.cur[slot] = idx; this.ok[slot] = ok; this.render(); this.check(); }

  humanSlots() { return this.kind === 'local' ? [0, 1] : [this.active]; }

  click(i) {
    if (this.kind === 'local') { const s = this.ok[0] ? 1 : 0; this.cur[s] = i; this.confirm(s); }
    else { this.cur[this.active] = i; this.confirm(this.active); }
  }
  hover(i) {
    if (this.kind === 'local') { const s = this.ok[0] ? 1 : 0; if (!this.ok[s]) { this.cur[s] = i; this.focusSlot = s; this.render(); } }
    else if (!this.ok[this.active]) { this.cur[this.active] = i; this.focusSlot = this.active; this.render(); this.announce(); }
  }

  announce() { if (this.kind === 'online' && this.onPick) this.onPick(this.cur[this.localIdx], this.ok[this.localIdx]); }

  move(slot, dir) {
    if (this.ok[slot]) return;
    let i = this.cur[slot];
    const cols = 4;
    let n = i;
    if (dir === 'left') n = i - 1; else if (dir === 'right') n = i + 1; else if (dir === 'up') n = i - cols; else if (dir === 'down') n = i + cols;
    if (n < 0 || n >= ROSTER.length) n = (dir === 'left' || dir === 'up') ? (i > 0 ? i : ROSTER.length - 1) : (dir === 'right' || dir === 'down') ? (i < ROSTER.length - 1 ? i : 0) : i;
    if (n !== i) Sound.play('menuMove');
    this.cur[slot] = n; this.focusSlot = slot;
    this.render(); this.announce();
  }

  confirm(slot) {
    if (this.ok[slot]) return;
    this.ok[slot] = true; this.focusSlot = slot;
    Sound.play('menuOk');
    if (this.kind === 'cpu' && slot === 0) { this.active = 1; this.cur[1] = this.cur[0]; this.ok[1] = false; }
    this.render(); this.announce(); this.check();
  }

  cancel(slot) {
    if (this.kind === 'cpu') {
      if (this.ok[1] || this.active === 1) { this.ok[1] = false; this.active = 0; this.ok[0] = false; this.render(); Sound.play('menuBack'); return; }
    }
    if (this.ok[slot]) { this.ok[slot] = false; Sound.play('menuBack'); this.render(); this.announce(); return; }
    this.back();
  }

  back() { Sound.play('menuBack'); this.close(); if (this.onBackCb) this.onBackCb(); }

  check() {
    if (this.done) return;
    const ready = this.ok[0] && this.ok[1];
    if (!ready) return;
    this.done = true;
    setTimeout(() => { if (this.done && this.onComplete) this.onComplete([ROSTER[this.cur[0]], ROSTER[this.cur[1]]]); }, 450);
  }

  // ---- input ------------------------------------------------------------------------------
  key(e) {
    const c = e.code;
    if (e.repeat && (c === 'Enter' || c === 'Space')) return true;
    if (this.kind === 'local') {
      const m1 = { KeyA: 'left', KeyD: 'right', KeyW: 'up', KeyS: 'down' }, m2 = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
      if (m1[c]) { this.move(0, m1[c]); return true; } if (m2[c]) { this.move(1, m2[c]); return true; }
      if (c === 'KeyF') { this.confirm(0); return true; } if (c === 'KeyG' || c === 'KeyH') { this.cancel(0); return true; }
      if (c === 'KeyK' || c === 'Enter') { this.confirm(1); return true; } if (c === 'KeyL' || c === 'Semicolon') { this.cancel(1); return true; }
      if (c === 'Escape' || c === 'Backspace') { this.back(); return true; }
      return false;
    }
    const slot = this.active;
    const mv = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down' };
    if (mv[c]) { this.move(slot, mv[c]); return true; }
    if (c === 'Enter' || c === 'Space' || c === 'KeyJ' || c === 'KeyZ' || c === 'KeyF') { this.confirm(slot); return true; }
    if (c === 'Escape' || c === 'Backspace' || c === 'KeyK' || c === 'KeyX' || c === 'KeyL' || c === 'KeyC') { this.cancel(slot); return true; }
    return false;
  }
  pad(pi, a) {
    const slot = this.kind === 'local' ? Math.min(pi, 1) : this.active;
    if (a === 'ok') this.confirm(slot); else if (a === 'back') this.cancel(slot); else this.move(slot, a);
  }

  // ---- drawing ----------------------------------------------------------------------------
  render() {
    this.cards.forEach((c, i) => {
      if (i >= ROSTER.length) return;
      const on1 = this.cur[0] === i, on2 = this.cur[1] === i;
      c.classList.toggle('c1', on1); c.classList.toggle('c2', on2);
      c.classList.toggle('ok', (on1 && this.ok[0]) || (on2 && this.ok[1]));
    });
    const C = CHARS[ROSTER[this.cur[this.focusSlot]]];
    const stat = (k, v) => `<div class="stat"><span>${k}</span><i><b style="width:${v * 20}%"></b></i></div>`;
    this.info.innerHTML = `<h3>${C.name}</h3><div class="tag">${C.tag}</div><div class="blurb">${C.blurb}</div>
      ${stat('POWER', C.stats.power)}${stat('SPEED', C.stats.speed)}${stat('WEIGHT', C.stats.weight)}${stat('RANGE', C.stats.range)}
      <div class="moves">${C.moveList.map(([k, v]) => `<div><span>${k}</span><span>${v}</span></div>`).join('')}</div>`;
    const badge = (slot) => {
      const el = $('#sel-p' + (slot + 1));
      const who = this.kind === 'online' ? (slot === this.localIdx ? 'YOU' : 'OPPONENT') : this.kind === 'cpu' ? (slot === 0 ? 'YOU' : 'CPU') : 'PLAYER ' + (slot + 1);
      el.textContent = `${who}: ${CHARS[ROSTER[this.cur[slot]]].name}${this.ok[slot] ? '  ✓' : ''}`.replace('✓', 'OK');
      el.classList.toggle('ok', this.ok[slot]);
    };
    badge(0); badge(1);
    $('#sel-hint').innerHTML = this.hint();
  }

  hint() {
    if (this.kind === 'local') return 'P1: WASD + F &nbsp;·&nbsp; P2: Arrows + K<br>(or click / gamepad)';
    if (this.kind === 'cpu') return this.active === 0 ? 'Pick YOUR fighter<br>Arrows / WASD + J (Enter)' : 'Now pick the CPU\'s fighter';
    return this.ok[this.localIdx] ? 'Waiting for your opponent…' : 'Arrows / WASD to choose · J or Enter to lock in';
  }
}
