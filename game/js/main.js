// Boot + screen flow: title -> menu -> (online lobby | local | cpu) -> character select -> match -> results.

import { loadAssets, Renderer } from './render.js';
import { Game, randomPair } from './game.js';
import { UI, Nav, Select, uiKey, uiBack, pollPadUi, $, $$ } from './ui.js';
import { Input, setupTouch } from './input.js';
import { Sound } from './audio.js';
import { Link, cleanCode } from './net.js';
import { CHARS, ROSTER } from './chars/index.js';
import { AI_LEVELS } from './ai.js';
import { RULES } from './config.js';

const App = {
  assets: null, game: null, select: null,
  kind: null,                // 'online' | 'local' | 'cpu'
  link: null, localIdx: 0,
  level: 1, lastPicks: null,
  inMatch: false, rematch: [false, false],
  isTouch: ('ontouchstart' in window) || navigator.maxTouchPoints > 0,
  joinCode: new URLSearchParams(location.search).get('join'),
};
window.__tuff = App;                         // handy for debugging / automated tests

// ------------------------------------------------------------------------------------------ boot
async function boot() {
  const bar = $('#load-bar'), txt = $('#load-text');
  try {
    App.assets = await loadAssets((p) => { bar.style.width = Math.round(p * 100) + '%'; });
  } catch (err) {
    txt.textContent = 'FAILED TO LOAD: ' + err.message; txt.style.color = '#ff8a8a'; return;
  }
  App.game = new Game(new Renderer($('#game'), App.assets));
  App.game.onOver = showResults;
  App.game.onDesync = (why) => leaveOnline('Game state diverged (' + why + '). Match closed.');
  App.select = new Select(App.assets);
  setupTouch($('#touch'));
  wireUi();
  startDemo();
  UI.show('title');
  if (App.joinCode) $('#press-any').textContent = 'PRESS ANY KEY TO JOIN ' + cleanCode(App.joinCode);
  requestAnimationFrame(loop);
}

function loop(ts) {
  if (!App.inMatch) pollPadUi();
  App.game.frame(ts);
  requestAnimationFrame(loop);
}

function startDemo() {
  App.inMatch = false;
  App.game.startOffline({ mode: 'demo', chars: randomPair() });
}

// ------------------------------------------------------------------------------------------ wiring
function wireUi() {
  // title -> menu
  let started = false;
  const advance = () => {
    if (started || UI.current !== 'title') return;
    started = true;
    Sound.unlock(); Sound.music('menu');
    Sound.play('menuOk');
    if (App.joinCode) { openOnline(); $('#in-code').value = cleanCode(App.joinCode); setTimeout(doJoin, 150); }
    else UI.show('menu');
  };
  document.addEventListener('tuff-any', advance);
  document.addEventListener('pointerdown', () => Sound.unlock());
  // advance on click (not pointerdown): otherwise the click that follows would land on the freshly shown menu button
  document.addEventListener('click', () => { if (UI.current === 'title') advance(); });

  document.addEventListener('keydown', (e) => {
    Sound.unlock();
    if (UI.current === 'title') { if (!e.metaKey && !e.ctrlKey && !['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) advance(); return; }
    if (e.code === 'F3') { App.game.debug = !App.game.debug; e.preventDefault(); return; }
    if (App.inMatch && !UI.current) {
      if ((e.code === 'Escape' || e.code === 'KeyP') && !e.repeat) { openPause(); e.preventDefault(); }
      return;
    }
    if (uiKey(e)) e.preventDefault();
  });

  // menu buttons
  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) { Sound.play('menuOk'); goto(go.dataset.go); return; }
    const act = e.target.closest('[data-act]');
    if (act) { Sound.play('menuOk'); doAct(act.dataset.act); }
  });
  UI.backHandlers['*'] = (t) => goto(t);
  UI.backHandlers.online = () => { Sound.play('menuBack'); cancelOnline(); goto('menu'); };
  UI.backHandlers.pause = () => doAct('resume');
  UI.backHandlers.result = () => {};

  // sound toggles
  const syncSnd = () => { $('#btn-music').textContent = 'MUSIC: ' + (Sound.musicVol > 0 ? 'ON' : 'OFF'); $('#btn-sfx').textContent = 'SFX: ' + (Sound.sfxVol > 0 ? 'ON' : 'OFF'); };
  $('#btn-music').addEventListener('click', () => { Sound.setMusic(Sound.musicVol > 0 ? 0 : 1); syncSnd(); });
  $('#btn-sfx').addEventListener('click', () => { Sound.setSfx(Sound.sfxVol > 0 ? 0 : 1); Sound.play('menuOk'); syncSnd(); });
  syncSnd();

  // online lobby
  $('#btn-create').addEventListener('click', doCreate);
  $('#btn-join').addEventListener('click', doJoin);
  $('#in-code').addEventListener('keydown', (e) => { if (e.code === 'Enter') doJoin(); });
  $('#in-code').addEventListener('input', (e) => { e.target.value = cleanCode(e.target.value); });
  $('#btn-online-back').addEventListener('click', () => { Sound.play('menuBack'); cancelOnline(); goto('menu'); });
  $('#btn-copy').addEventListener('click', copyLink);

  // cpu level
  $('#btn-level').addEventListener('click', () => { App.level = (App.level + 1) % AI_LEVELS.length; $('#btn-level').textContent = AI_LEVELS[App.level]; Sound.play('menuMove'); });

  // touch pause + auto-pause when the tab is hidden
  $('#btn-touch-pause').addEventListener('click', () => { if (App.inMatch && !UI.current) openPause(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && App.inMatch && !UI.current && App.kind !== 'online') openPause(); });
  addEventListener('beforeunload', () => { if (App.link) App.link.send({ t: 'leave' }); });
}

function goto(where) {
  switch (where) {
    case 'menu': App.inMatch = false; App.game.fx.reset(); startDemo(); Sound.music('menu'); showTouch(false); UI.show('menu'); break;
    case 'online': openOnline(); break;
    case 'local': openSelect('local'); break;
    case 'cpu': openSelect('cpu'); break;
    case 'howto': UI.show('howto'); break;
    case 'credits': UI.show('credits'); break;
  }
}

function showTouch(on) { $('#touch').hidden = !(on && App.isTouch); }

// ------------------------------------------------------------------------------------------ online lobby
function setStatus(msg, err = false) { const el = $('#on-status'); el.textContent = msg; el.classList.toggle('err', err); }

function openOnline() {
  cancelOnline();
  App.kind = 'online';
  $('#on-choose').hidden = false; $('#on-wait').hidden = true; setStatus('');
  UI.show('online');
  if (!App.joinCode) setTimeout(() => $('#btn-create').focus(), 50);
}

function newLink() {
  const link = new Link();
  link.onstatus = (s) => setStatus(s);
  link.onopen = () => onLinkOpen(link);
  link.onmessage = (m) => onNetMessage(m);
  link.onclose = (reason) => leaveOnline(reason || 'Connection closed.');
  return link;
}

async function doCreate() {
  if (App.link) return;
  setStatus('Opening room…');
  const link = App.link = newLink();
  App.localIdx = 0;
  try {
    const code = await link.host();
    $('#on-choose').hidden = true; $('#on-wait').hidden = false;
    $('#room-code').textContent = code;
    const url = location.origin + location.pathname.replace(/index\.html$/, '') + '?join=' + code;
    $('#room-link').value = url; App.shareUrl = url;
    setStatus('Share the code or the link. The match starts when your friend joins.');
  } catch (err) {
    setStatus(err.message, true); try { link.close(); } catch (e) { /* noop */ } App.link = null;
  }
}

async function doJoin() {
  if (App.link) return;
  const code = cleanCode($('#in-code').value);
  if (code.length < 5) { setStatus('Enter the 5-letter room code.', true); $('#in-code').focus(); return; }
  App.joinCode = null;
  const link = App.link = newLink();
  App.localIdx = 1;
  try {
    await link.join(code);
  } catch (err) {
    setStatus(err.message, true); try { link.close(); } catch (e) { /* noop */ } App.link = null;
  }
}

function copyLink() {
  const url = App.shareUrl || $('#room-link').value;
  const done = () => UI.toast('Link copied!');
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => { $('#room-link').select(); UI.toast('Press Ctrl+C to copy'); });
  else { $('#room-link').select(); try { document.execCommand('copy'); done(); } catch (e) { UI.toast('Press Ctrl+C to copy'); } }
}

function cancelOnline() {
  if (App.link) { try { App.link.send({ t: 'leave' }); } catch (e) { /* noop */ } App.link.close(); App.link = null; }
}

function leaveOnline(msg) {
  const had = !!App.link;
  if (App.link) { App.link.onclose = null; App.link.close(); App.link = null; }
  if (App.select) App.select.close();
  App.game.session = null;
  if (msg && (had || App.kind === 'online')) UI.toast(msg, true, 5000);
  if (UI.current === 'online') setStatus(msg || '', true);
  App.kind = null;
  if (App.inMatch || UI.current !== 'online') goto('menu');
}

function onLinkOpen(link) {
  link.send({ t: 'hello', v: 1 });
  Sound.play('spawn');
  openSelect('online');
}

// ------------------------------------------------------------------------------------------ messages from the peer
function onNetMessage(m) {
  switch (m.t) {
    case 'i': case 'h': App.game.receive(m); break;
    case 'hello': if (m.v !== 1) leaveOnline('The other player runs a different version of the game.'); break;
    case 'pick': App.select.setRemote(1 - App.localIdx, Math.max(0, ROSTER.indexOf(m.c)), !!m.ok); break;
    case 'start': if (App.localIdx === 1) beginOnline(m); break;
    case 'rematch': App.rematch[1 - App.localIdx] = true; $('#res-note').textContent = 'Opponent wants a rematch!'; maybeRematch(); break;
    case 'toselect': if (App.inMatch || UI.isShown('result')) { toSelectOnline(); } break;
    case 'leave': leaveOnline('Opponent left the match.'); break;
  }
}

// ------------------------------------------------------------------------------------------ character select
function openSelect(kind) {
  App.kind = kind;
  App.inMatch = false; showTouch(false);
  App.game.fx.reset();
  Sound.music('menu');
  Input.setMode(kind === 'local' ? 'local' : 'solo');
  $('#btn-level').textContent = AI_LEVELS[App.level];
  UI.show('select');
  App.select.open({
    kind, localIdx: App.localIdx, level: App.level,
    onPick: (idx, ok) => { if (App.link) App.link.send({ t: 'pick', c: ROSTER[idx], ok }); },
    onComplete: (picks) => {
      if (kind === 'online') { if (App.localIdx === 0) startOnlineMatch(picks); }
      else startOfflineMatch(kind, picks);
    },
    onBack: () => { if (kind === 'online') { cancelOnline(); App.kind = null; } goto('menu'); },
  });
  if (kind === 'online') App.select.announce();
}

function toSelectOnline() {
  App.rematch = [false, false];
  UI.hide('result'); UI.hide('pause');
  openSelect('online');
}

// ------------------------------------------------------------------------------------------ matches
function enterMatchUi() {
  for (const el of $$('.screen')) el.classList.remove('show');
  UI.current = null;
  App.inMatch = true; showTouch(true);
  Sound.music('snowdin'); Sound.restart('snowdin');
}

function startOfflineMatch(kind, picks) {
  App.lastPicks = picks; App.kind = kind;
  App.select.close();
  Input.setMode(kind === 'local' ? 'local' : 'solo');
  App.game.startOffline({ mode: kind, chars: picks, level: App.level });
  enterMatchUi();
}

function pickDelay(rtt) { return rtt < 45 ? 1 : rtt < 100 ? 2 : rtt < 170 ? 3 : 4; }

function startOnlineMatch(picks) {          // host only
  const q = Number(new URLSearchParams(location.search).get('seconds'));       // dev/test override: ?seconds=10
  const cfg = { seed: (Math.random() * 0x7fffffff | 0) || 1, chars: picks, delay: pickDelay(App.link ? App.link.rtt : 60), seconds: q >= 5 && q <= 600 ? q : RULES.seconds };
  App.link.send({ t: 'start', ...cfg });
  beginOnline(cfg);
}

function validCfg(c) {
  return c && Array.isArray(c.chars) && c.chars.length === 2 && c.chars.every((id) => typeof id === 'string' && CHARS[id])
    && Number.isInteger(c.seed) && Number.isInteger(c.delay) && c.delay >= 1 && c.delay <= 6
    && (c.seconds === undefined || (Number.isInteger(c.seconds) && c.seconds >= 5 && c.seconds <= 600));
}

function beginOnline(cfg) {
  if (!App.link) return;
  if (!validCfg(cfg)) { leaveOnline('Received an invalid match setup from the other player.'); return; }
  App.select.close();
  App.rematch = [false, false];
  App.lastPicks = cfg.chars;
  Input.setMode('solo');
  App.game.startOnline({ link: App.link, localIdx: App.localIdx, chars: cfg.chars, seed: cfg.seed, delay: cfg.delay, seconds: cfg.seconds });
  enterMatchUi();
}

// ------------------------------------------------------------------------------------------ pause + results
function openPause() {
  const online = App.kind === 'online';
  $('#pause-title').textContent = online ? 'MENU' : 'PAUSED';
  $('#pause-restart').hidden = online;
  $('#pause-note').textContent = online ? 'The match keeps running while this is open.' : '';
  if (!online) App.game.pause(true);
  showTouch(false);
  UI.show('pause');
}

function doAct(a) {
  switch (a) {
    case 'resume': UI.hide('pause'); UI.current = null; App.game.pause(false); showTouch(true); break;
    case 'restart': UI.hide('pause'); UI.current = null; startOfflineMatch(App.kind, App.lastPicks); break;
    case 'quit': if (App.kind === 'online') { cancelOnline(); } App.kind = null; UI.hide('pause'); UI.hide('result'); goto('menu'); break;
    case 'rematch':
      if (App.kind === 'online') {
        App.rematch[App.localIdx] = true; App.link && App.link.send({ t: 'rematch' });
        $('#res-note').textContent = 'Waiting for opponent…'; $('#res-rematch').disabled = true; maybeRematch();
      } else { UI.hide('result'); startOfflineMatch(App.kind, App.lastPicks); }
      break;
    case 'select':
      if (App.kind === 'online') { App.link && App.link.send({ t: 'toselect' }); toSelectOnline(); }
      else { UI.hide('result'); openSelect(App.kind); }
      break;
  }
}

function maybeRematch() {
  if (App.rematch[0] && App.rematch[1] && App.localIdx === 0) { UI.hide('result'); startOnlineMatch(App.lastPicks); }
}

function showResults(s, stats) {
  const w = s.winner;
  $('#res-title').textContent = w < 0 ? 'DRAW' : (App.game.labels && App.kind === 'online' ? (w === App.localIdx ? 'YOU WIN!' : 'YOU LOSE') : CHARS[s.fighters[w].char].name + ' WINS!');
  if (App.game.mode === 'demo') return;
  const nm = (i) => CHARS[s.fighters[i].char].name + (App.game.labels ? ` (${App.game.labels[i]})` : '');
  const row = (label, a, b) => `<div class="row"><span>${a}</span><span style="color:#ffe066">${label}</span><span>${b}</span></div>`;
  $('#res-stats').innerHTML =
    row('FIGHTER', nm(0), nm(1)) + row('DAMAGE DEALT', Math.round(stats[0].dmg) + '%', Math.round(stats[1].dmg) + '%') +
    row('HITS LANDED', stats[0].hits, stats[1].hits) + row('BEST COMBO', stats[0].maxCombo, stats[1].maxCombo) +
    row('KOs', stats[0].kos, stats[1].kos) + row('SUPERS', stats[0].supers, stats[1].supers) + row('PERFECT GUARDS', stats[0].parries, stats[1].parries);
  $('#res-note').textContent = s.reason === 'time' ? 'Time ran out - decided by stocks, then damage.' : '';
  $('#res-rematch').disabled = false;
  showTouch(false);
  UI.show('result');
}

boot();
