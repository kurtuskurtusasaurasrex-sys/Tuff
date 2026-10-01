// Boot + app flow: title -> menu -> lobby (versus / tournament / online host+guests) -> match -> results.

import { loadAssets, Renderer } from './render.js';
import { Game, randomChar } from './game.js';
import { UI, SelectUI, uiKey, pollPadUi, renderBracket, buildControls, refreshControls, $, $$ } from './ui.js';
import { Input, setupTouch } from './input.js';
import { Sound } from './audio.js';
import { HostHub, GuestLink, cleanCode } from './net.js';
import { CHARS, ROSTER } from './chars/index.js';
import { STAGES, STAGE_ORDER } from './stages.js';
import { AI_LEVELS } from './ai.js';
import { RULES } from './config.js';
import { createState, step } from './sim.js';

const PROTO = 2;
const TIMES = [30, 60, 90, 120, 150, 180, 240, 300];

const App = {
  assets: null, game: null, ui: null,
  lobby: null,                       // { slots, settings, focus }
  hub: null, link: null,             // online: host hub or guest link
  net: null,                         // { role: 'host'|'guest', code, mySlot }
  fighterOfSlot: null,
  inMatch: false, kind: 'versus',    // kind: 'versus' | 'tourney'
  lastCfg: null, tour: null, capture: null,
  isTouch: ('ontouchstart' in window) || navigator.maxTouchPoints > 0,
  joinCode: new URLSearchParams(location.search).get('join'),
};
window.__tuff = App;                 // handy for debugging / automated tests

// ============================================================================================== boot
async function boot() {
  const bar = $('#load-bar'), txt = $('#load-text');
  try {
    App.assets = await loadAssets((p) => { bar.style.width = Math.round(p * 100) + '%'; });
  } catch (err) { txt.textContent = 'FAILED TO LOAD: ' + err.message; txt.style.color = '#ff8a8a'; return; }
  App.game = new Game(new Renderer($('#game'), App.assets));
  App.game.onOver = onMatchOver;
  App.game.onDemoDone = startDemo;
  App.game.onStallDrop = (fi) => { const f = App.lastCfg && App.lastCfg.fighters[fi]; if (f && App.hub) App.hub.kick(f.slot); };
  App.game.onDesync = (why) => leaveOnline('Game state diverged (' + why + '). Match closed.');
  App.ui = new SelectUI(App.assets, lobbyCallbacks());
  setupTouch($('#touch'));
  newLobby();
  wireUi();
  startDemo();
  UI.show('title');
  if (App.joinCode) $('#press-any').textContent = 'PRESS ANY KEY TO JOIN ' + cleanCode(App.joinCode);
  requestAnimationFrame(loop);
  // A tiny worker keeps the heartbeat alive in a background tab (rAF is paused there), so online matches never stall for others.
  try {
    const w = new Worker(URL.createObjectURL(new Blob(['setInterval(function(){postMessage(0)},16)'], { type: 'text/javascript' })));
    w.onmessage = () => { if (document.hidden && App.game.session) App.game.frame(performance.now(), { draw: false }); };
  } catch (e) { /* no workers: foreground play is unaffected */ }
}

function loop(ts) {
  if (!App.inMatch) pollPadUi();
  const g = App.game;
  if (g.session && App.net) g.session.rtt = App.net.role === 'guest' && App.link ? App.link.rtt : 0;
  g.frame(ts);
  requestAnimationFrame(loop);
}

function startDemo() {
  App.inMatch = false;
  const stage = STAGE_ORDER[Math.random() * STAGE_ORDER.length | 0];
  const pick = () => ({ char: randomChar(), kind: 'cpu', lvl: 2 });
  App.game.startOffline({ fighters: [pick(), pick()], stage, stocks: 3, seconds: 90 }, 'demo');
}

// ============================================================================================== lobby model
function newLobby() {
  App.lobby = {
    slots: [
      { type: 'HUMAN', char: null, ready: false, cur: 0 },
      { type: 'CPU', char: randomChar(), ready: true, cur: 0 },
      { type: 'OFF', char: randomChar(), ready: true, cur: 0 },
      { type: 'OFF', char: randomChar(), ready: true, cur: 0 },
    ],
    settings: { mode: 'versus', bracket: 4, stage: 'snowdin', stocks: RULES.stocks, seconds: RULES.seconds, level: 1 },
    focus: 0,
  };
}
const L = () => App.lobby;
const isGuest = () => !!App.net && App.net.role === 'guest';
const isHost = () => !!App.net && App.net.role === 'host';

// slots this machine steers
function locals() {
  if (isGuest()) return [App.net.mySlot];
  return L().slots.map((s, i) => (s.type === 'HUMAN' ? i : -1)).filter((i) => i >= 0);
}
const isPlayerSlot = (s) => s.type === 'HUMAN' || s.type === 'REMOTE';
function activeSlots() { return L().slots.map((s, i) => ({ ...s, i })).filter((s) => s.type !== 'OFF'); }
function allReady() {
  const a = activeSlots();
  const need = L().settings.mode === 'tourney' ? 1 : 2;
  return a.length >= need && a.some(isPlayerSlot) && a.every((s) => (isPlayerSlot(s) ? s.ready && !!s.char : true));
}

function slotCycleOptions(i) {
  if (App.net) return i >= 1 ? ['CPU', 'OFF'] : [];
  const pads = Input.padCount();
  if (i === 1) return ['CPU', 'HUMAN', 'OFF'];
  return pads >= i ? ['OFF', 'CPU', 'HUMAN'] : ['OFF', 'CPU'];
}

function renderLobby() {
  const M = {
    slots: L().slots, settings: L().settings, locals: locals(), focus: L().focus,
    net: App.net ? { role: App.net.role, code: App.net.code, mySlot: App.net.mySlot, count: App.hub ? App.hub.count() : 0 } : null,
    canFight: allReady(), hint: lobbyHint(),
  };
  App.ui.render(M);
}

function lobbyHint() {
  if (isGuest()) return L().slots[App.net.mySlot].ready ? 'Waiting for the host to start...' : 'Arrows / WASD to choose &middot; J or Enter to lock in &middot; Esc to leave';
  const n = locals().length;
  const add = App.net ? '' : '<br>[2] [3] [4] add CPUs or players';
  if (n >= 2) return 'P1: WASD + F &nbsp;&middot;&nbsp; P2: Arrows + , (see CONTROLS)' + add;
  return 'Arrows / WASD &middot; J, Space or Enter to pick &middot; K to undo' + add;
}

const pubSlot = (s) => ({ type: s.type, char: s.char, ready: s.ready, cur: s.cur });

// pushes lobby state to everyone / tells the host about our pick
function sync() {
  renderLobby();
  if (isHost()) App.hub.broadcast({ t: 'lobby', slots: L().slots.map(pubSlot), settings: L().settings });
  else if (isGuest()) {
    const s = L().slots[App.net.mySlot];
    App.link.send({ t: 'pick', cur: s.cur, char: s.ready ? s.char : null });
  }
}

function lobbyCallbacks() {
  return {
    click: (i) => {
      const own = locals().filter((s) => !L().slots[s].ready);
      const s = own.length ? own[0] : locals()[0];
      if (s === undefined) return;
      L().slots[s].cur = i; L().focus = s; lobbyAct(s, 'ok');
    },
    hover: (i) => {
      const own = locals().filter((s) => !L().slots[s].ready);
      if (!own.length) return;
      L().slots[own[0]].cur = i; L().focus = own[0]; sync();
    },
    cycle: (s) => cycleSlot(s),
    slotClick: (s) => {
      const sl = L().slots[s];
      if (isGuest()) return;
      if (sl.type === 'CPU') { sl.char = ROSTER[(ROSTER.indexOf(sl.char) + 1) % ROSTER.length]; Sound.play('menuMove'); sync(); }
      else if (sl.type === 'OFF') cycleSlot(s);
    },
    setting: (name, d) => changeSetting(name, d),
    fight: () => doFight(),
    back: () => leaveLobby(),
    copy: () => copyLink(),
  };
}

function cycleSlot(i) {
  if (isGuest() || i === 0) return;
  const s = L().slots[i];
  if (!s || s.type === 'REMOTE') return;
  const opts = slotCycleOptions(i);
  if (!opts.length) return;
  const next = opts[(opts.indexOf(s.type) + 1) % opts.length];
  s.type = next;
  s.ready = next !== 'HUMAN';
  if (next === 'HUMAN') { s.char = null; s.cur = 0; }
  if (next === 'CPU' && !s.char) s.char = randomChar();
  Sound.play('menuMove');
  sync();
}

function changeSetting(name, d) {
  if (isGuest()) return;
  const st = L().settings;
  switch (name) {
    case 'mode': if (App.net) return; st.mode = st.mode === 'versus' ? 'tourney' : 'versus'; App.kind = st.mode; break;
    case 'size': st.bracket = st.bracket === 4 ? 8 : 4; break;
    case 'stage': { const o = [...STAGE_ORDER, 'random']; st.stage = o[(o.indexOf(st.stage) + 1) % o.length]; break; }
    case 'stocks': st.stocks = Math.max(1, Math.min(9, st.stocks + d)); break;
    case 'seconds': st.seconds = TIMES[Math.max(0, Math.min(TIMES.length - 1, TIMES.indexOf(st.seconds) + d))]; break;
    case 'level': st.level = (st.level + 1) % AI_LEVELS.length; break;
  }
  Sound.play('menuMove');
  sync();
}

// one lobby input: slot = which player slot, action = left/right/up/down/ok/back
function lobbyAct(slot, action) {
  const s = L().slots[slot];
  if (!s || !(s.type === 'HUMAN' || (isGuest() && slot === App.net.mySlot))) return;
  L().focus = slot;
  const cells = ROSTER.length + 1;                 // characters + RANDOM
  if (action === 'ok') {
    if (!s.ready) {
      s.char = s.cur >= ROSTER.length ? randomChar() : ROSTER[s.cur];
      s.ready = true; Sound.play('menuOk');
    } else if (allReady() && !isGuest()) { doFight(); return; }
  } else if (action === 'back') {
    if (s.ready) { s.ready = false; Sound.play('menuBack'); }
    else { leaveLobby(); return; }
  } else if (!s.ready) {
    const cols = 4;
    let n = s.cur;
    if (action === 'left') n = s.cur - 1; else if (action === 'right') n = s.cur + 1;
    else if (action === 'up') n = s.cur - cols; else if (action === 'down') n = s.cur + cols;
    if (n < 0 || n >= cells) n = action === 'left' || action === 'up' ? (s.cur > 0 ? s.cur : cells - 1) : (s.cur < cells - 1 ? s.cur : 0);
    if (n !== s.cur) Sound.play('menuMove');
    s.cur = n;
  }
  sync();
}

// ---- keyboard / pad into the lobby -----------------------------------------------------------
function slotForWho(who) {
  const l = locals(); if (!l.length) return -1;
  if (who === 'solo' || l.length === 1) return l[0];
  return who === 'p2' ? (l[1] ?? l[0]) : l[0];
}
UI.hooks.select = {
  key(e) {
    if (e.code === 'Escape') { leaveLobby(); return true; }
    if (/^Digit[234]$/.test(e.code) && !e.repeat) { cycleSlot(+e.code.slice(5) - 1); return true; }
    if (e.code === 'Enter') { if (!e.repeat) lobbyAct(slotForWho('solo'), 'ok'); return true; }
    const m = Input.menuAction(e.code);
    if (!m) return false;
    if (e.repeat && (m.action === 'ok' || m.action === 'back')) return true;
    const slot = slotForWho(m.who);
    if (slot >= 0) lobbyAct(slot, m.action);
    return true;
  },
  pad(pi, a) {
    const l = locals(); if (!l.length) return false;
    lobbyAct(l.length === 1 ? l[0] : (l[pi] ?? l[0]), a);
    return true;
  },
};

// ============================================================================================== wiring
function wireUi() {
  let started = false;
  const advance = () => {
    if (started || UI.current !== 'title') return;
    started = true;
    Sound.unlock(); Sound.music('menu'); Sound.play('menuOk');
    if (App.joinCode) { openJoin(); $('#in-code').value = cleanCode(App.joinCode); setTimeout(doJoin, 200); }
    else UI.show('menu');
  };
  document.addEventListener('tuff-any', advance);
  document.addEventListener('pointerdown', () => Sound.unlock());
  document.addEventListener('click', () => { if (UI.current === 'title') advance(); });    // click, not pointerdown: no click-through into the menu

  document.addEventListener('keydown', (e) => {
    Sound.unlock();
    if (App.capture) { captureKey(e); return; }
    if (UI.current === 'title') { if (!e.metaKey && !e.ctrlKey && !['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) advance(); return; }
    if (e.code === 'F3') { App.game.debug = !App.game.debug; e.preventDefault(); return; }
    if (App.inMatch && !UI.current) {
      if ((e.code === 'Escape' || e.code === 'KeyP') && !e.repeat) { openPause(); e.preventDefault(); }
      return;
    }
    if (uiKey(e)) e.preventDefault();
  });

  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) { Sound.play('menuOk'); goto(go.dataset.go); return; }
    const act = e.target.closest('[data-act]');
    if (act) { Sound.play('menuOk'); doAct(act.dataset.act); }
  });
  UI.backHandlers['*'] = (t) => goto(t);
  UI.backHandlers.join = () => { Sound.play('menuBack'); goto('menu'); };
  UI.backHandlers.pause = () => doAct('resume');
  UI.backHandlers.bracket = () => {};
  UI.backHandlers.result = () => {};

  // sound toggles
  const syncSnd = () => { $('#btn-music').textContent = 'MUSIC: ' + (Sound.musicVol > 0 ? 'ON' : 'OFF'); $('#btn-sfx').textContent = 'SFX: ' + (Sound.sfxVol > 0 ? 'ON' : 'OFF'); };
  $('#btn-music').addEventListener('click', () => { Sound.setMusic(Sound.musicVol > 0 ? 0 : 1); syncSnd(); });
  $('#btn-sfx').addEventListener('click', () => { Sound.setSfx(Sound.sfxVol > 0 ? 0 : 1); Sound.play('menuOk'); syncSnd(); });
  syncSnd();

  // join screen
  $('#btn-join').addEventListener('click', doJoin);
  $('#btn-join-back').addEventListener('click', () => { Sound.play('menuBack'); goto('menu'); });
  $('#in-code').addEventListener('keydown', (e) => { if (e.code === 'Enter') doJoin(); });
  $('#in-code').addEventListener('input', (e) => { e.target.value = cleanCode(e.target.value); });

  // controls screen
  $('#ctrl-reset').addEventListener('click', () => { Input.resetBinds(); refreshControls(); Sound.play('menuOk'); });
  $('#ctrl-back').addEventListener('click', () => { Sound.play('menuBack'); goto('menu'); });

  // bracket buttons
  $('#br-play').addEventListener('click', () => bracketPlay());
  $('#br-skip').addEventListener('click', () => bracketPlay(true));
  $('#br-quit').addEventListener('click', () => { Sound.play('menuBack'); App.tour = null; openLobby('tourney'); });

  // touch pause + auto-pause when the tab is hidden (offline only; online keeps going via the worker heartbeat)
  $('#btn-touch-pause').addEventListener('click', () => { if (App.inMatch && !UI.current) openPause(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && App.inMatch && !UI.current && !App.net) openPause(); });
  addEventListener('beforeunload', () => { try { if (App.link) App.link.send({ t: 'leave' }); } catch (e) { /* noop */ } });
}

const MENU_QUIPS = ['* The air is filled with the smell of snow.', '* Knock your rivals off the slab.', '* It fills you with DETERMINATION.', '* Smells like bones and spaghetti.', '* Four controls. Infinite bad times.'];
function goto(where) {
  switch (where) {
    case 'menu':
      App.inMatch = false; App.game.fx.reset(); App.tour = null; App.kind = 'versus'; closeNet(); startDemo();
      Sound.music('menu'); showTouch(false);
      UI.show('menu'); $('#menu-hint').textContent = MENU_QUIPS[Math.random() * MENU_QUIPS.length | 0]; break;
    case 'versus': closeNet(); newLobby(); openLobby('versus'); break;
    case 'tourney': closeNet(); newLobby(); openLobby('tourney'); break;
    case 'host': hostOnline(); break;
    case 'join': openJoin(); break;
    case 'controls': buildControls(startCapture); UI.show('controls'); break;
    case 'howto': UI.show('howto'); break;
    case 'credits': UI.show('credits'); break;
  }
}
function showTouch(on) { $('#touch').hidden = !(on && App.isTouch); }

// ---- rebinding -----------------------------------------------------------------------------
function startCapture(p, a, btn) { App.capture = { p, a, btn }; }
function captureKey(e) {
  e.preventDefault();
  const c = App.capture;
  if (e.code === 'Escape') { App.capture = null; refreshControls(); return; }
  if (['MetaLeft', 'MetaRight', 'ContextMenu', 'F5', 'F12'].includes(e.code)) return;
  Input.setBind(c.p, c.a, e.code);
  App.capture = null; refreshControls(); Sound.play('menuOk');
}

// ============================================================================================== lobby screen
function openLobby(kind) {
  App.kind = kind; App.inMatch = false; showTouch(false);
  App.game.fx.reset();
  Sound.music('menu');
  L().settings.mode = kind;
  UI.show('select');
  App.ui.shownChar = undefined;
  renderLobby();
}

function leaveLobby() {
  Sound.play('menuBack');
  goto('menu');
}

function doFight() {
  if (!allReady() || isGuest()) return;
  Sound.play('menuOk');
  if (isHost()) return startOnlineMatch();
  if (L().settings.mode === 'tourney') return startTourney();
  startVersus();
}

function resolveStage() {
  const s = L().settings.stage;
  return s === 'random' ? STAGE_ORDER[Math.random() * STAGE_ORDER.length | 0] : s;
}

function fighterList() {
  return activeSlots().map((s) => ({ slot: s.i, char: s.char, kind: isPlayerSlot(s) ? 'human' : 'cpu', lvl: L().settings.level }));
}

// ============================================================================================== offline matches
function enterMatch() {
  UI.hideAll();
  App.inMatch = true; showTouch(true);
  const track = STAGES[App.game.state.stage].music;
  Sound.music(track); Sound.restart(track);
}

function startVersus() {
  const cfg = { fighters: fighterList(), stage: resolveStage(), stocks: L().settings.stocks, seconds: L().settings.seconds };
  App.lastCfg = cfg;
  App.game.startOffline(cfg);
  enterMatch();
}

function onMatchOver(s, stats) {
  if (App.game.mode === 'demo') return;
  if (App.kind === 'tourney' && App.tour && App.tour.cur) return tourneyMatchOver(s);
  showResults(s, stats);
}

function showResults(s, stats) {
  const g = App.game, n = s.n;
  const label = (i) => g.labels[i];
  const w = s.winner;
  let title;
  if (w < 0) title = 'DRAW';
  else if (App.net) title = w === g.localIdx ? 'YOU WIN!' : label(w) + ' WINS!';
  else title = label(w) + ' WINS!';
  $('#res-title').textContent = title;
  const rank = s.rank.length ? s.rank : [...Array(n).keys()];
  const nm = (i) => CHARS[s.fighters[i].char].name;
  const col = (i) => g.r.slotOf[i];
  const row = (lab, f) => `<div class="row" style="--cols:${n + 1}"><span style="text-align:left">${lab}</span>${rank.map((i) => `<span class="c${col(i)}">${f(i)}</span>`).join('')}</div>`;
  $('#res-stats').innerHTML =
    `<div class="row hd" style="--cols:${n + 1}"><span></span>${rank.map((i, k) => `<span class="c${col(i)}">${['1ST', '2ND', '3RD', '4TH'][k]}</span>`).join('')}</div>` +
    row('FIGHTER', (i) => `${label(i)}<br>${nm(i)}`) + row('DAMAGE', (i) => Math.round(stats[i].dmg) + '%') + row('HITS', (i) => stats[i].hits) +
    row('BEST COMBO', (i) => stats[i].maxCombo) + row('KOs', (i) => stats[i].kos) + row('SUPERS', (i) => stats[i].supers) + row('PERFECT', (i) => stats[i].parries);
  const guest = isGuest();
  const lines = [];
  if (w >= 0) { lines.push(w === g.localIdx || (!App.net && label(w) !== 'CPU') ? '!YOU WON!' : 'You lost...'); lines.push('It fills you with DETERMINATION.'); }
  else lines.push('Nobody won. ...');
  if (s.reason === 'time') lines.push('Time ran out - decided by stocks, then damage.');
  if (guest) lines.push('!Waiting for the host...');
  UI.type($('#res-dialog'), lines, 14);
  $('#res-rematch').hidden = guest; $('#res-select').hidden = guest;
  showTouch(false);
  UI.show('result');
}

// ============================================================================================== pause / results actions
function openPause() {
  const online = !!App.net;
  $('#pause-title').textContent = online ? 'MENU' : 'PAUSED';
  $('#pause-restart').hidden = online || App.kind === 'tourney';
  const k = (p, a) => Input.bindLabel(p, a);
  const solo = App.game.humanCount <= 1;
  UI.type($('#pause-controls'), solo
    ? ['Move: WASD / arrows   Attack: J or ' + k('p1', 'ATK'), 'Special: K or ' + k('p1', 'SPC') + '   Guard: L or ' + k('p1', 'GRD'), 'Hold a direction + Attack/Special for the other moves.', online ? 'The match keeps running while this is open.' : 'ESC resumes.']
    : ['P1: ' + k('p1', 'ATK') + ' atk  ' + k('p1', 'SPC') + ' spc  ' + k('p1', 'GRD') + ' guard', 'P2: ' + k('p2', 'ATK') + ' atk  ' + k('p2', 'SPC') + ' spc  ' + k('p2', 'GRD') + ' guard'], 0);
  if (!online) App.game.pause(true);
  showTouch(false);
  UI.show('pause');
}

function doAct(a) {
  switch (a) {
    case 'resume': UI.hide('pause'); UI.current = null; App.game.pause(false); showTouch(true); break;
    case 'restart': UI.hide('pause'); UI.current = null; App.game.startOffline({ ...App.lastCfg, seed: undefined }); App.inMatch = true; showTouch(true); break;
    case 'quit': App.tour = null; UI.hide('pause'); UI.hide('result'); goto('menu'); break;
    case 'rematch':
      UI.hide('result');
      if (isHost()) startOnlineMatch();
      else if (App.kind === 'tourney') startTourney();
      else { App.game.startOffline({ ...App.lastCfg, seed: undefined }); enterMatch(); }
      break;
    case 'select':
      UI.hide('result');
      if (isHost()) { App.hub.broadcast({ t: 'tolobby' }); toLobbyOnline(); }
      else { App.game.stop(); startDemo(); openLobby(L().settings.mode); }
      break;
  }
}

// ============================================================================================== tournament (offline)
function startTourney() {
  const ents = []; let cpuN = 0;
  for (const s of activeSlots()) {
    if (isPlayerSlot(s)) ents.push({ name: 'P' + (s.i + 1), kind: 'human', slot: s.i, char: s.char });
    else ents.push({ name: 'CPU ' + (++cpuN), kind: 'cpu', slot: s.i, char: s.char });
  }
  const size = Math.max(L().settings.bracket, ents.length > 4 ? 8 : 4);
  while (ents.length < size) ents.push({ name: 'CPU ' + (++cpuN), kind: 'cpu', slot: ents.length % 4, char: randomChar() });
  for (let i = ents.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ents[i], ents[j]] = [ents[j], ents[i]]; }
  const rounds = []; let n = size / 2;
  rounds.push(Array.from({ length: n }, (_, k) => ({ a: 2 * k, b: 2 * k + 1, w: null })));
  while (n > 1) { n /= 2; rounds.push(Array.from({ length: n }, () => ({ a: null, b: null, w: null }))); }
  App.tour = { ents, rounds, champ: null, cur: null };
  App.kind = 'tourney';
  openBracket();
}

function nextMatch() {
  const T = App.tour;
  for (let r = 0; r < T.rounds.length; r++) for (let m = 0; m < T.rounds[r].length; m++) {
    const x = T.rounds[r][m];
    if (x.w === null && x.a !== null && x.b !== null) return { r, m };
  }
  return null;
}
const isCpuMatch = (nm) => { const x = App.tour.rounds[nm.r][nm.m]; return App.tour.ents[x.a].kind === 'cpu' && App.tour.ents[x.b].kind === 'cpu'; };

function openBracket() {
  App.inMatch = false; showTouch(false);
  Sound.music('menu');
  const T = App.tour, nm = nextMatch();
  renderBracket(T, App.assets, nm);
  $('#br-title').textContent = T.champ !== null ? 'CHAMPION!' : 'TOURNAMENT';
  const play = $('#br-play'), skip = $('#br-skip');
  if (T.champ !== null) {
    const e = T.ents[T.champ];
    UI.type($('#br-dialog'), [`${e.name} (${CHARS[e.char].name}) won the whole tournament.`, 'It fills you with DETERMINATION.'], 20);
    play.textContent = 'BACK TO LOBBY'; skip.hidden = true;
  } else {
    const x = T.rounds[nm.r][nm.m], A = T.ents[x.a], B = T.ents[x.b];
    UI.type($('#br-dialog'), [`NEXT: ${A.name} (${CHARS[A.char].name}) vs ${B.name} (${CHARS[B.char].name})`, isCpuMatch(nm) ? '!The CPUs will fight it out. Watch or skip.' : '!Press PLAY MATCH to fight.'], 14);
    play.textContent = isCpuMatch(nm) ? 'WATCH MATCH' : 'PLAY MATCH'; skip.hidden = !isCpuMatch(nm);
  }
  UI.show('bracket');
}

function bracketPlay(skip = false) {
  const T = App.tour;
  if (T.champ !== null) { App.tour = null; return openLobby('tourney'); }
  const nm = nextMatch(); if (!nm) return;
  Sound.play('menuOk');
  const x = T.rounds[nm.r][nm.m], A = T.ents[x.a], B = T.ents[x.b];
  T.cur = { ...nm, a: x.a, b: x.b };
  if (skip && isCpuMatch(nm)) return reportMatch(simulateInstant(A, B));
  const mk = (e) => ({ slot: e.slot, char: e.char, kind: e.kind, lvl: L().settings.level });
  const cfg = { fighters: [mk(A), mk(B)], stage: resolveStage(), stocks: L().settings.stocks, seconds: L().settings.seconds };
  App.lastCfg = cfg;
  App.game.startOffline(cfg);
  enterMatch();
}

function simulateInstant(A, B) {
  const s = createState({ seed: (Math.random() * 0x7fffffff | 0) || 1, chars: [A.char, B.char], stage: resolveStage(), stocks: L().settings.stocks, seconds: L().settings.seconds, cpu: [1, 1], lvl: [L().settings.level, L().settings.level] });
  let f = 0;
  while (s.phase !== 'over' && f++ < 60 * 400) step(s, [0, 0]);
  if (s.winner < 0) return Math.random() < 0.5 ? 0 : 1;
  return s.winner;
}

function tourneyMatchOver(s) {
  if (s.winner < 0) { UI.toast('DRAW! Fight again!', false, 2200); App.game.startOffline({ ...App.lastCfg, seed: undefined }); return; }
  reportMatch(s.winner);
}

function reportMatch(winnerSide) {   // 0 = fighter A, 1 = fighter B
  const T = App.tour, c = T.cur, x = T.rounds[c.r][c.m];
  const w = winnerSide === 0 ? x.a : x.b;
  x.w = w;
  if (c.r + 1 < T.rounds.length) { const nx = T.rounds[c.r + 1][c.m >> 1]; if (c.m % 2 === 0) nx.a = w; else nx.b = w; } else T.champ = w;
  T.cur = null;
  App.game.stop(); startDemo();
  openBracket();
}

// ============================================================================================== online
function setJoinStatus(msg, err = false) { const el = $('#join-status'); el.textContent = msg; el.classList.toggle('err', err); }

function openJoin() {
  closeNet();
  setJoinStatus('');
  UI.show('join');
  setTimeout(() => $('#in-code').focus(), 60);
}

function closeNet() {
  if (App.hub) { const h = App.hub; App.hub = null; try { h.broadcast({ t: 'kicked' }); } catch (e) { /* noop */ } setTimeout(() => h.close(), 200); }
  if (App.link) { const l = App.link; App.link = null; try { l.send({ t: 'leave' }); } catch (e) { /* noop */ } l.close(); }
  App.net = null; App.fighterOfSlot = null;
}

function leaveOnline(msg) {
  const had = !!App.net || !!App.link;
  closeNet();
  if (App.game.session) App.game.stop();
  if (msg && had) UI.toast(msg, true, 5000);
  goto('menu');
}

async function hostOnline() {
  closeNet(); newLobby();
  L().slots[1].type = 'OFF'; L().slots[1].ready = true;
  const hub = new HostHub();
  App.hub = hub;
  hub.accept = acceptGuest;
  hub.onmessage = onGuestMessage;
  hub.onleave = onGuestLeave;
  UI.toast('Opening room...', false, 8000);
  try {
    const code = await hub.open();
    App.net = { role: 'host', code, mySlot: 0 };
    App.shareUrl = location.origin + location.pathname.replace(/index\.html$/, '') + '?join=' + code;
    UI.toast('Room ' + code + ' is open!', false, 2500);
    openLobby('versus');
  } catch (err) {
    UI.toast(err.message, true, 6000); try { hub.close(); } catch (e) { /* noop */ } App.hub = null;
  }
}

function acceptGuest() {
  if (App.inMatch) return -1;
  for (let i = 1; i < 4; i++) {
    const s = L().slots[i];
    if (s.type === 'OFF' || s.type === 'CPU') {
      L().slots[i] = { type: 'REMOTE', char: null, ready: false, cur: 0 };
      setTimeout(() => {
        if (!App.hub) return;
        App.hub.send(i, { t: 'welcome', v: PROTO, slot: i, lobby: { slots: L().slots.map(pubSlot), settings: L().settings } });
        UI.toast('P' + (i + 1) + ' joined!', false, 2000); Sound.play('spawn');
        sync();
      }, 50);
      return i;
    }
  }
  return -1;
}

function onGuestMessage(slot, m) {
  if (!m || typeof m !== 'object' || !App.hub) return;
  if (m.t === 'i' || m.t === 'h') { const idx = App.fighterOfSlot ? App.fighterOfSlot[slot] : undefined; if (idx !== undefined) App.game.receive(idx, m); return; }
  if (m.t === 'pick') {
    const s = L().slots[slot];
    if (!s || s.type !== 'REMOTE' || !Number.isInteger(m.cur) || App.inMatch) return;
    s.cur = Math.max(0, Math.min(ROSTER.length, m.cur));
    if (typeof m.char === 'string' && ROSTER.includes(m.char)) { s.char = m.char; s.ready = true; } else { s.ready = false; s.char = null; }
    renderLobby(); App.hub.broadcast({ t: 'lobby', slots: L().slots.map(pubSlot), settings: L().settings });
  } else if (m.t === 'leave') App.hub.kick(slot);
}

function onGuestLeave(slot) {
  const idx = App.fighterOfSlot ? App.fighterOfSlot[slot] : undefined;
  if (App.inMatch && idx !== undefined) {
    App.game.linkClosed(idx);
    UI.toast('P' + (slot + 1) + ' disconnected - a CPU takes over', true, 4000);
  } else if (L().slots[slot].type === 'REMOTE') UI.toast('P' + (slot + 1) + ' left', true, 2500);
  L().slots[slot] = { type: 'OFF', char: randomChar(), ready: true, cur: 0 };
  if (!App.inMatch && App.hub) sync();
}

async function doJoin() {
  if (App.link) return;
  const code = cleanCode($('#in-code').value);
  if (code.length < 5) { setJoinStatus('Enter the 5-letter room code.', true); $('#in-code').focus(); return; }
  App.joinCode = null;
  const link = new GuestLink();
  App.link = link;
  link.onstatus = (s) => setJoinStatus(s);
  link.onmessage = onHostMessage;
  link.onclose = (reason) => leaveOnline(reason || 'Disconnected.');
  setJoinStatus('Connecting...');
  try {
    await link.join(code);
    link.send({ t: 'hello', v: PROTO });
    setJoinStatus('Connected! Waiting for the host...');
  } catch (err) {
    setJoinStatus(err.message, true); try { link.close(); } catch (e) { /* noop */ } App.link = null;
  }
}

function onHostMessage(m) {
  if (!m || typeof m !== 'object') return;
  switch (m.t) {
    case 'full': leaveOnline('That room is full or already in a match.'); break;
    case 'kicked': leaveOnline('The host closed the room.'); break;
    case 'welcome':
      if (m.v !== PROTO) { leaveOnline('The host runs a different version of the game.'); return; }
      if (!Number.isInteger(m.slot) || m.slot < 1 || m.slot > 3) return;
      App.net = { role: 'guest', code: App.link.code, mySlot: m.slot };
      newLobby();
      applyLobby(m.lobby, true);
      openLobby(L().settings.mode || 'versus');
      sync();
      break;
    case 'lobby': if (App.net) { applyLobby(m, false); renderLobby(); } break;
    case 'start': if (validCfg(m.cfg)) beginOnlineMatch(m.cfg); else leaveOnline('Received an invalid match setup.'); break;
    case 'tolobby': toLobbyOnline(); break;
    case 'i': case 'h': case 'drop': App.game.receive(0, m); break;
  }
}

function applyLobby(lb, first) {
  if (!lb || !Array.isArray(lb.slots) || lb.slots.length !== 4) return;
  const mine = App.net ? App.net.mySlot : -1;
  const prevMine = L().slots[mine];
  L().slots = lb.slots.map((s) => ({ type: ['HUMAN', 'CPU', 'REMOTE', 'OFF'].includes(s.type) ? s.type : 'OFF', char: ROSTER.includes(s.char) ? s.char : null, ready: !!s.ready, cur: Number.isInteger(s.cur) ? Math.max(0, Math.min(ROSTER.length, s.cur)) : 0 }));
  if (!first && prevMine) L().slots[mine] = prevMine;              // our own pick is authoritative locally (no flicker)
  const st = lb.settings || {};
  const S = L().settings;
  if (STAGES[st.stage] || st.stage === 'random') S.stage = st.stage;
  if (Number.isInteger(st.stocks)) S.stocks = Math.max(1, Math.min(9, st.stocks));
  if (TIMES.includes(st.seconds)) S.seconds = st.seconds;
  if (Number.isInteger(st.level)) S.level = Math.max(0, Math.min(2, st.level));
  S.mode = 'versus';
  L().focus = mine;
}

function validCfg(c) {
  return c && Array.isArray(c.fighters) && c.fighters.length >= 2 && c.fighters.length <= 4
    && c.fighters.every((f) => f && typeof f.char === 'string' && CHARS[f.char] && (f.kind === 'human' || f.kind === 'cpu') && Number.isInteger(f.slot) && f.slot >= 0 && f.slot < 4 && (f.lvl === undefined || (Number.isInteger(f.lvl) && f.lvl >= 0 && f.lvl <= 2)))
    && Number.isInteger(c.seed) && Number.isInteger(c.delay) && c.delay >= 1 && c.delay <= 6 && !!STAGES[c.stage]
    && Number.isInteger(c.stocks) && c.stocks >= 1 && c.stocks <= 9 && Number.isInteger(c.seconds) && c.seconds >= 5 && c.seconds <= 600
    && c.fighters[0].kind === 'human' && c.fighters[0].slot === 0;
}

const pickDelay = (rtt) => (rtt < 45 ? 1 : rtt < 100 ? 2 : rtt < 170 ? 3 : 4);

function startOnlineMatch() {
  const q = Number(new URLSearchParams(location.search).get('seconds'));       // dev/test override: ?seconds=10
  const cfg = {
    seed: (Math.random() * 0x7fffffff | 0) || 1, stage: resolveStage(), stocks: L().settings.stocks,
    seconds: q >= 5 && q <= 600 ? Math.floor(q) : L().settings.seconds, delay: pickDelay(App.hub.maxRtt()), fighters: fighterList(),
  };
  App.hub.broadcast({ t: 'start', cfg });
  beginOnlineMatch(cfg);
}

function beginOnlineMatch(cfg) {
  if (!App.net) return;
  App.lastCfg = cfg;
  App.fighterOfSlot = {};
  cfg.fighters.forEach((f, i) => { App.fighterOfSlot[f.slot] = i; });
  const localIdx = App.fighterOfSlot[App.net.mySlot];
  if (localIdx === undefined) { leaveOnline('You are not part of this match.'); return; }
  const host = App.net.role === 'host';
  const links = host ? cfg.fighters.map((f, i) => (i !== 0 && f.kind === 'human' ? i : -1)).filter((i) => i >= 0) : [0];
  const send = host ? (to, m) => { if (App.hub) App.hub.send(cfg.fighters[to].slot, m); } : (to, m) => { if (App.link) App.link.send(m); };
  App.game.startOnline({ cfg, localIdx, links, send });
  App.game.rttFn = host ? () => (App.hub ? App.hub.maxRtt() : 0) : () => (App.link ? App.link.rtt : 0);
  enterMatch();
}

function toLobbyOnline() {
  App.game.stop(); startDemo();
  UI.hide('result'); UI.hide('pause');
  for (const s of L().slots) if (isPlayerSlot(s)) { s.ready = false; s.char = null; }
  openLobby('versus');
  sync();
}

function copyLink() {
  const url = App.shareUrl || '';
  const done = () => UI.toast('Link copied!');
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => UI.toast(url, false, 8000));
  else UI.toast(url, false, 8000);
}

boot();
