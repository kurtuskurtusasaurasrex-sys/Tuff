// DOM screens: navigation, the lobby (character select + slot panels), tournament bracket and rebinding grid.
// Game logic lives in main.js; this file only renders and reports what the player did.

import { CHARS, ROSTER, LOCKED_SLOTS } from './chars/index.js';
import { STAGES, STAGE_ORDER } from './stages.js';
import { Sound } from './audio.js';
import { Input, ACTIONS, ACTION_LABEL } from './input.js';
import { AI_LEVELS } from './ai.js';

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
export const SLOT_COLORS = ['#ff5a5a', '#5ab0ff', '#5aff8a', '#ffd84d'];

// ------------------------------------------------------------------------------------ screens
let toastTimer = 0, typeTimer = 0;
export const UI = {
  current: null,
  backHandlers: {},
  hooks: {},                       // screen id -> { key(e) -> bool, pad(index, action) }
  show(id) {
    for (const el of $$('.screen')) el.classList.toggle('show', el.id === 's-' + id);
    this.current = id;
    const menu = $('#s-' + id + ' [data-menu]');
    if (menu) Nav.focus(menu, 0);
  },
  hideAll() { for (const el of $$('.screen')) el.classList.remove('show'); this.current = null; },
  hide(id) { const el = $('#s-' + id); if (el) el.classList.remove('show'); if (this.current === id) this.current = null; },
  isShown(id) { const el = $('#s-' + id); return !!el && el.classList.contains('show'); },
  toast(msg, err = false, ms = 3200) {
    const t = $('#toast'); t.textContent = msg; t.className = 'show' + (err ? ' err' : '');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.className = ''; }, ms);
  },
  // Undertale-style typewriter text; a leading "!" makes a line yellow
  type(el, lines, speed = 22) {
    clearInterval(typeTimer);
    const html = (l) => (l.startsWith('!') ? `<span class="hi">* ${l.slice(1)}</span>` : '* ' + l);
    const full = lines.map(html).join('<br>');
    if (speed <= 0) { el.innerHTML = full; return; }
    let n = 0; const flat = lines.join('\n').length;
    el.innerHTML = '';
    typeTimer = setInterval(() => {
      n += 2;
      const out = []; let left = n;
      for (const l of lines) { const take = Math.max(0, Math.min(l.replace(/^!/, '').length, left)); left -= l.replace(/^!/, '').length + 1; out.push((l.startsWith('!') ? '!' : '') + l.replace(/^!/, '').slice(0, take)); if (left <= 0) break; }
      el.innerHTML = out.map(html).join('<br>');
      if (n > flat + 4) { clearInterval(typeTimer); el.innerHTML = full; }
    }, speed);
  },
};

// vertical button menus: keyboard, gamepad, mouse and touch
export const Nav = {
  menu: null, idx: 0,
  focus(menu, i) {
    this.menu = menu; this.idx = i;
    this.buttons().forEach((b, k) => b.classList.toggle('sel', k === i));
  },
  buttons() { return this.menu ? $$('button:not(:disabled):not([hidden])', this.menu) : []; },
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
  const menu = b.closest('[data-menu]'); const i = $$('button:not(:disabled):not([hidden])', menu).indexOf(b);
  if (i >= 0 && (Nav.menu !== menu || Nav.idx !== i)) Nav.focus(menu, i);
});

const MENU_KEYS = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', Enter: 'ok', Space: 'ok', KeyJ: 'ok', KeyZ: 'ok', KeyF: 'ok', Escape: 'back', Backspace: 'back', KeyK: 'back', KeyX: 'back' };

// returns true if the UI consumed the key
export function uiKey(e) {
  const tag = e.target && e.target.tagName;
  if (tag === 'INPUT') { if (e.code === 'Escape') { e.target.blur(); return true; } return false; }
  const cur = UI.current;
  if (!cur || cur === 'loading' || cur === 'title') return false;
  const hook = UI.hooks[cur];
  if (hook && hook.key && hook.key(e)) return true;
  const act = MENU_KEYS[e.code];
  if (!act) return false;
  const screen = $('#s-' + cur);
  if (screen && $('[data-menu]', screen)) {
    if (act === 'up') { Nav.move(-1); return true; }
    if (act === 'down') { Nav.move(1); return true; }
    if (act === 'ok') { Nav.ok(); return true; }
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

// gamepad edge detector for menus
const padPrev = {};
export function pollPadUi() {
  if (!navigator.getGamepads) return;
  const pads = Array.from(navigator.getGamepads()).filter(Boolean);
  pads.forEach((pad, pi) => {
    const prev = padPrev[pi] || (padPrev[pi] = {});
    const ax = pad.axes[0] || 0, ay = pad.axes[1] || 0, b = (i) => pad.buttons[i] && pad.buttons[i].pressed;
    const now = { up: ay < -0.6 || b(12), down: ay > 0.6 || b(13), left: ax < -0.6 || b(14), right: ax > 0.6 || b(15), ok: b(0) || b(9), back: b(1) };
    for (const a of Object.keys(now)) { if (now[a] && !prev[a]) padAction(a, pi); prev[a] = now[a]; }
  });
}
function padAction(a, pi) {
  const cur = UI.current;
  if (!cur || cur === 'loading') return;
  if (cur === 'title') { document.dispatchEvent(new CustomEvent('tuff-any')); return; }
  const hook = UI.hooks[cur];
  if (hook && hook.pad && hook.pad(pi, a)) return;
  const screen = $('#s-' + cur);
  if (screen && $('[data-menu]', screen)) {
    if (a === 'up') Nav.move(-1); else if (a === 'down') Nav.move(1); else if (a === 'ok') Nav.ok();
  }
  if (a === 'back') uiBack();
}

// ------------------------------------------------------------------------------------ portraits
export function portrait(cv, assets, id, { pad = 4 } = {}) {
  const g = cv.getContext('2d'); g.imageSmoothingEnabled = false; g.clearRect(0, 0, cv.width, cv.height);
  const C = CHARS[id]; if (!C) return;
  const at = assets.atlas[C.atlas], name = C.atlas === 'sans' ? 'idle_eye' : 'idle0', m = at.frames[name];
  const s = Math.max(1, Math.floor(Math.min(cv.width / m.w, (cv.height - pad * 2) / m.h)));
  g.drawImage(at.img, m.x, m.y, m.w, m.h, Math.round((cv.width - m.w * s) / 2), cv.height - pad - m.h * s, m.w * s, m.h * s);
}
export function icon(cv, assets, id) {
  const g = cv.getContext('2d'); g.imageSmoothingEnabled = false; g.clearRect(0, 0, cv.width, cv.height);
  const C = CHARS[id]; if (!C) return;
  const at = assets.atlas[C.atlas], m = at.frames.icon;
  const s = Math.max(1, Math.floor(Math.min(cv.width / m.w, cv.height / m.h)));
  g.drawImage(at.img, m.x, m.y, m.w, m.h, Math.round((cv.width - m.w * s) / 2), Math.round((cv.height - m.h * s) / 2), m.w * s, m.h * s);
}

// ------------------------------------------------------------------------------------ lobby (character select)
// The model is owned by main.js:
//   { slots: [{type:'HUMAN'|'CPU'|'REMOTE'|'OFF', char, ready, cur}], settings: {...}, net: null|{role, code, mySlot, count},
//     locals: [slot indices steered by this machine], focus: slot }
export class SelectUI {
  constructor(assets, cb) {
    this.A = assets; this.cb = cb;                       // cb: { act(slot, action), click(i), cycle(slot), setting(name, delta), fight(), back(), copy() }
    this.grid = $('#sel-grid'); this.info = $('#sel-info'); this.slotsEl = $('#sel-slots');
    this.cells = ROSTER.length + 1 + LOCKED_SLOTS - 1;        // chars + RANDOM + locked fillers (8 total)
    this.build();
    this.shownChar = null;
    const bind = (id, name, d) => $(id).addEventListener('click', () => cb.setting(name, d));
    $('#set-mode').addEventListener('click', () => cb.setting('mode', 1));
    $('#set-size').addEventListener('click', () => cb.setting('size', 1));
    $('#set-stage').addEventListener('click', () => cb.setting('stage', 1));
    $('#set-cpu').addEventListener('click', () => cb.setting('level', 1));
    bind('#stocks-dn', 'stocks', -1); bind('#stocks-up', 'stocks', 1); bind('#time-dn', 'seconds', -1); bind('#time-up', 'seconds', 1);
    $('#btn-fight').addEventListener('click', () => cb.fight());
    $('#btn-sel-back').addEventListener('click', () => cb.back());
    $('#btn-copy').addEventListener('click', () => cb.copy());
  }

  build() {
    this.grid.innerHTML = ''; this.cardEls = [];
    for (let i = 0; i < this.cells; i++) {
      const card = document.createElement('div');
      const isChar = i < ROSTER.length, isRandom = i === ROSTER.length;
      card.className = 'card' + (isChar ? '' : isRandom ? ' random' : ' locked');
      if (isChar) {
        const C = CHARS[ROSTER[i]];
        const cv = document.createElement('canvas'); cv.width = 128; cv.height = 150;
        portrait(cv, this.A, ROSTER[i]);
        card.appendChild(cv);
      }
      if (isChar || isRandom) {
        const nm = document.createElement('div'); nm.className = 'nm'; nm.textContent = isRandom ? 'RANDOM' : CHARS[ROSTER[i]].name; card.appendChild(nm);
        const marks = document.createElement('div'); marks.className = 'marks'; card.appendChild(marks);
        card.addEventListener('click', () => this.cb.click(i));
        card.addEventListener('pointerenter', () => this.cb.hover && this.cb.hover(i));
      }
      this.grid.appendChild(card); this.cardEls.push(card);
    }
    this.slotEls = [];
    this.slotsEl.innerHTML = '';
    for (let s = 0; s < 4; s++) {
      const el = document.createElement('div'); el.className = 'slot s' + s;
      el.innerHTML = `<div class="sh"><span class="lbl"></span><button class="cyc" title="Change who plays in this slot">&#10227;</button></div>
        <div class="sb"><canvas width="66" height="76"></canvas><div class="sn"></div></div><div class="st"></div>`;
      $('.cyc', el).addEventListener('click', () => this.cb.cycle(s));
      el.addEventListener('click', (e) => { if (!e.target.closest('.cyc')) this.cb.slotClick && this.cb.slotClick(s); });
      this.slotsEl.appendChild(el); this.slotEls.push(el);
    }
  }

  render(M) {
    const net = M.net, st = M.settings;
    const guest = net && net.role === 'guest';
    // header + settings
    $('#sel-title').textContent = st.mode === 'tourney' ? 'TOURNAMENT - CHOOSE FIGHTERS' : 'CHOOSE YOUR FIGHTER';
    const room = $('#sel-room'); room.hidden = !net || net.role !== 'host';
    if (net && net.role === 'host') { $('#room-code').textContent = net.code; $('#room-count').textContent = net.count + ' friend' + (net.count === 1 ? '' : 's') + ' connected'; }
    $('#set-mode').textContent = st.mode === 'tourney' ? 'MODE: TOURNAMENT' : 'MODE: VERSUS';
    $('#set-size').hidden = st.mode !== 'tourney'; $('#set-size').textContent = 'BRACKET: ' + st.bracket;
    $('#set-stage').textContent = st.stage === 'random' ? 'STAGE: RANDOM' : STAGES[st.stage].name;
    $('#stocks-val').textContent = st.stocks; $('#time-val').textContent = st.seconds;
    $('#set-cpu').textContent = 'CPU: ' + AI_LEVELS[st.level];
    $('#set-mode').hidden = !!net;
    for (const id of ['#set-stage', '#set-cpu', '#stocks-dn', '#stocks-up', '#time-dn', '#time-up', '#set-size']) $(id).disabled = !!guest;

    // grid markers
    this.cardEls.forEach((c, i) => {
      const marks = $('.marks', c); if (!marks) return;
      marks.innerHTML = '';
      M.slots.forEach((s, k) => {
        if ((s.type === 'HUMAN' || s.type === 'REMOTE') && !s.ready && s.cur === i) marks.insertAdjacentHTML('beforeend', `<span class="mk s${k}">P${k + 1}</span>`);
      });
      c.classList.toggle('focus', M.slots[M.focus] && M.slots[M.focus].cur === i);
    });

    // slot panels
    M.slots.forEach((s, k) => {
      const el = this.slotEls[k], off = s.type === 'OFF';
      el.classList.toggle('off', off); el.classList.toggle('me', M.locals.includes(k) || (net && net.mySlot === k));
      const mine = net && net.role === 'guest' ? net.mySlot === k : false;
      let label = 'P' + (k + 1);
      if (s.type === 'CPU') label = 'CPU'; else if (off) label = 'OFF';
      else if (s.type === 'REMOTE') label = 'P' + (k + 1) + ' ONLINE';
      else if (net && net.role === 'host' && k === 0) label = 'P1 (HOST)';
      if (mine) label += ' (YOU)';
      $('.lbl', el).textContent = label;
      const canCycle = !guest && k > 0 && s.type !== 'REMOTE';
      $('.cyc', el).style.visibility = canCycle ? 'visible' : 'hidden';
      const showChar = off ? null : (s.type === 'HUMAN' || s.type === 'REMOTE') && !s.ready ? (s.cur < ROSTER.length ? ROSTER[s.cur] : null) : s.char;
      const cv = $('canvas', el);
      if (showChar) { portrait(cv, this.A, showChar); cv.style.opacity = s.ready || s.type === 'CPU' ? 1 : 0.5; } else { cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); }
      const name = off ? '' : showChar ? CHARS[showChar].name : '?';
      $('.sn', el).innerHTML = off ? '' : `<b>${name}</b>`;
      const stEl = $('.st', el);
      let status = '';
      if (off) status = k > 0 && !guest ? 'press ' + (k + 1) + ' / click to add' : '';
      else if (s.type === 'CPU') status = 'CPU ' + AI_LEVELS[st.level];
      else status = s.ready ? 'READY!' : 'choosing...';
      stEl.textContent = status; stEl.classList.toggle('ok', status === 'READY!');
    });

    // info panel for the focused slot
    const fs = M.slots[M.focus];
    const cur = fs ? fs.cur : 0;
    const cid = fs && fs.ready && fs.char ? fs.char : cur < ROSTER.length ? ROSTER[cur] : null;
    if (cid !== this.shownChar) { this.shownChar = cid; this.renderInfo(cid); }

    // fight button + hint
    const fight = $('#btn-fight');
    fight.hidden = !(M.canFight && !guest);
    fight.textContent = st.mode === 'tourney' ? 'START TOURNAMENT' : 'FIGHT!';
    $('#sel-hint').innerHTML = M.hint || '';
  }

  renderInfo(cid) {
    if (!cid) {
      this.info.innerHTML = `<h3>RANDOM</h3><div class="tag">Leave it to fate</div><div class="quote">* Who will it be?<br>* The DETERMINATION is strong.</div>`;
      return;
    }
    const C = CHARS[cid];
    const stat = (k, v) => `<div class="stat"><span>${k}</span><i><b style="width:${v * 20}%"></b></i></div>`;
    this.info.innerHTML = `<h3>${C.name}</h3><div class="tag">${C.tag}</div><div class="quote"></div>
      ${stat('POWER', C.stats.power)}${stat('SPEED', C.stats.speed)}${stat('WEIGHT', C.stats.weight)}${stat('RANGE', C.stats.range)}
      <div class="moves">${C.moveList.map(([k, v]) => `<div><span>${k}</span><span>${v}</span></div>`).join('')}</div>`;
    UI.type($('.quote', this.info), [C.quote || C.blurb], 18);
  }
}

// ------------------------------------------------------------------------------------ tournament bracket
export function renderBracket(tour, assets, next) {
  const tree = $('#br-tree'); tree.innerHTML = '';
  const R = tour.rounds.length;
  tour.rounds.forEach((round, r) => {
    const col = document.createElement('div'); col.className = 'br-col';
    col.insertAdjacentHTML('beforeend', `<h4>${r === R - 1 ? 'FINAL' : r === R - 2 && R > 2 ? 'SEMIS' : 'ROUND ' + (r + 1)}</h4>`);
    const body = document.createElement('div'); body.className = 'br-body'; col.appendChild(body);
    round.forEach((m, k) => {
      const box = document.createElement('div'); box.className = 'br-match' + (next && next.r === r && next.m === k ? ' next' : '');
      for (const side of ['a', 'b']) {
        const idx = m[side], ent = idx === null ? null : tour.ents[idx];
        const el = document.createElement('div');
        el.className = 'br-ent' + (!ent ? ' tbd' : m.w !== null ? (m.w === idx ? ' won' : ' lost') : (next && next.r === r && next.m === k ? ' next' : ''));
        if (ent) {
          const cv = document.createElement('canvas'); cv.width = 22; cv.height = 22; icon(cv, assets, ent.char); el.appendChild(cv);
          const t = document.createElement('span'); t.textContent = ent.name; t.style.color = ent.kind === 'human' ? SLOT_COLORS[ent.slot % 4] : '#fff'; el.appendChild(t);
        } else el.textContent = '?';
        box.appendChild(el);
      }
      body.appendChild(box);
    });
    tree.appendChild(col);
  });
  // champion column
  const champ = document.createElement('div'); champ.className = 'br-col';
  champ.insertAdjacentHTML('beforeend', '<h4>CHAMPION</h4>');
  const cbody = document.createElement('div'); cbody.className = 'br-body'; champ.appendChild(cbody);
  const box = document.createElement('div'); box.className = 'br-match';
  const el = document.createElement('div'); el.className = 'br-ent' + (tour.champ === null ? ' tbd' : ' won');
  if (tour.champ !== null) { const e = tour.ents[tour.champ]; const cv = document.createElement('canvas'); cv.width = 22; cv.height = 22; icon(cv, assets, e.char); el.appendChild(cv); el.append(e.name); } else el.textContent = '?';
  box.appendChild(el); cbody.appendChild(box); tree.appendChild(champ);
}

// ------------------------------------------------------------------------------------ controls (rebinding)
export function buildControls(onCapture) {
  const g = $('#ctrl-grid'); g.innerHTML = '';
  g.insertAdjacentHTML('beforeend', '<span></span><span class="hd p1">PLAYER 1</span><span class="hd p2">PLAYER 2</span>');
  for (const a of ACTIONS) {
    g.insertAdjacentHTML('beforeend', `<span class="lab">${ACTION_LABEL[a]}</span>`);
    for (const p of ['p1', 'p2']) {
      const b = document.createElement('button'); b.className = 'key'; b.textContent = Input.bindLabel(p, a);
      b.addEventListener('click', () => { for (const k of $$('.key.wait', g)) { k.classList.remove('wait'); } b.classList.add('wait'); b.textContent = 'PRESS A KEY'; onCapture(p, a, b); });
      g.appendChild(b);
    }
  }
}
export function refreshControls() {
  const keys = $$('#ctrl-grid .key'); let i = 0;
  for (const a of ACTIONS) for (const p of ['p1', 'p2']) { keys[i].classList.remove('wait'); keys[i++].textContent = Input.bindLabel(p, a); }
}
