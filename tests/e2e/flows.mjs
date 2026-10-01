import { launch, serve, sleep, hookLogs, SHOTS, GAME } from './lib.mjs';
import fs from 'fs';
fs.mkdirSync(SHOTS, { recursive: true });
const web = serve(GAME, 8132);
await sleep(800);
const browser = await launch();
const errs = [];
let ok = true; const check = (c, m) => { console.log(c ? '  ok  :' : '  FAIL:', m); if (!c) ok = false; };
const mk = async (tag, opts = {}) => { const ctx = await browser.newContext({ viewport: { width: 1000, height: 667 }, ...opts }); const p = await ctx.newPage(); hookLogs(p, tag, errs); return p; };
const base = 'http://127.0.0.1:8132/index.html';
const boot = async (p) => { await p.goto(base); await p.waitForSelector('#s-title.show'); await p.keyboard.press('Enter'); await sleep(350); };

console.log('CONTROLS rebinding');
{
  const p = await mk('C'); await boot(p);
  await p.click('[data-go=controls]'); await sleep(400);
  await p.screenshot({ path: SHOTS + '/r-controls.png' });
  const before = await p.evaluate(() => document.querySelectorAll('#ctrl-grid .key')[4].textContent);   // ATTACK / P1
  await p.click('#ctrl-grid .key:nth-of-type(9)').catch(() => {});
  // click the P1 ATTACK key box (row 5, col 1) via evaluate, then press Q
  await p.evaluate(() => document.querySelectorAll('#ctrl-grid .key')[8].click());
  await sleep(150); await p.keyboard.press('KeyQ'); await sleep(200);
  const after = await p.evaluate(() => document.querySelectorAll('#ctrl-grid .key')[8].textContent);
  console.log('   P1 attack key:', before, '->', after);
  check(after === 'Q', 'clicking a key box and pressing Q rebinds it');
  check(await p.evaluate(() => JSON.parse(localStorage.getItem('tuff.keys')).p1.ATK[0] === 'KeyQ'), 'the new binding is saved to localStorage');
  await p.click('#ctrl-reset'); await sleep(150);
  check(await p.evaluate(() => document.querySelectorAll('#ctrl-grid .key')[8].textContent) === 'F', 'RESET restores the default (F)');
  await p.context().close();
}

console.log('LOCAL 2 PLAYERS + RESULTS');
{
  const p = await mk('L'); await boot(p);
  await p.click('[data-go=versus]'); await sleep(500);
  await p.keyboard.press('Digit2'); await sleep(150);          // slot 2: CPU -> HUMAN
  check(await p.evaluate(() => window.__tuff.lobby.slots[1].type) === 'HUMAN', 'pressing 2 turns the CPU slot into a second human');
  await p.keyboard.press('KeyF'); await sleep(150);             // P1 locks in
  await p.keyboard.press('Comma'); await sleep(250);            // P2 locks in
  await p.screenshot({ path: SHOTS + '/r-lobby-2p.png' });
  check(await p.evaluate(() => window.__tuff.lobby.slots[0].ready && window.__tuff.lobby.slots[1].ready), 'P1 (F) and P2 (comma) both locked in with their own keys');
  await p.keyboard.press('Enter'); await sleep(3000);
  check(await p.evaluate(() => window.__tuff.inMatch && window.__tuff.game.humanCount === 2), 'a 2-human local match started');
  await p.keyboard.down('KeyD'); await p.keyboard.down('ArrowLeft'); await sleep(700);
  const xs = await p.evaluate(() => window.__tuff.game.state.fighters.map((f) => Math.round(f.x)));
  await p.keyboard.up('KeyD'); await p.keyboard.up('ArrowLeft');
  check(xs[0] > 300 && xs[1] < 700, 'P1 (WASD) and P2 (arrows) move independently: ' + xs);
  await p.evaluate(() => { const s = window.__tuff.game.state; s.fighters[1].dmg = 80; s.timer = 2; });
  await p.waitForSelector('#s-result.show', { timeout: 15000 }); await sleep(900);
  await p.screenshot({ path: SHOTS + '/r-results-2p.png' });
  check((await p.textContent('#res-title')).includes('WINS'), 'results screen: ' + (await p.textContent('#res-title')));
  await p.context().close();
}

console.log('TOURNAMENT');
{
  const p = await mk('T'); await boot(p);
  await p.click('[data-go=tourney]'); await sleep(500);
  await p.keyboard.press('Enter'); await sleep(200);            // lock in
  check(await p.evaluate(() => !document.querySelector('#btn-fight').hidden && document.querySelector('#btn-fight').textContent.includes('TOURNAMENT')), 'START TOURNAMENT button appears');
  await p.keyboard.press('Enter'); await sleep(600);
  await p.waitForSelector('#s-bracket.show', { timeout: 8000 });
  await p.screenshot({ path: SHOTS + '/r-bracket-1.png' });
  let guard = 0;
  while (guard++ < 12) {
    const title = await p.textContent('#br-title');
    if (title.includes('CHAMPION')) break;
    const label = await p.textContent('#br-play');
    if (/WATCH/.test(label)) { await p.click('#br-skip'); await sleep(600); continue; }
    await p.click('#br-play'); await sleep(900);
    await p.evaluate(() => { const s = window.__tuff.game.state; s.fighters[1].dmg = 60; s.fighters[0].dmg = 0; s.timer = 2; });   // let fighter A win
    await p.waitForSelector('#s-bracket.show', { timeout: 20000 }); await sleep(500);
  }
  await p.screenshot({ path: SHOTS + '/r-bracket-done.png' });
  check((await p.textContent('#br-title')).includes('CHAMPION'), 'tournament reaches a champion after ' + guard + ' steps');
  await p.context().close();
}

console.log('JOIN errors');
{
  const p = await mk('J'); await boot(p);
  await p.click('[data-go=join]'); await sleep(300);
  await p.fill('#in-code', 'AB'); await p.click('#btn-join'); await sleep(200);
  check((await p.textContent('#join-status')).includes('5-letter'), 'short codes are rejected locally');
  await p.screenshot({ path: SHOTS + '/r-join.png' });
  await p.context().close();
}

console.log('TOUCH LAYOUT');
{
  const p = await mk('M', { viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true });
  await p.goto(base); await p.waitForSelector('#s-title.show'); await p.touchscreen.tap(400, 200); await sleep(500);
  await p.tap('[data-go=versus]'); await sleep(500);
  await p.screenshot({ path: SHOTS + '/r-touch-lobby.png' });
  await p.evaluate(() => { document.querySelector('#sel-grid .card').click(); }); await sleep(300);
  await p.tap('#btn-fight'); await sleep(2500);
  await p.screenshot({ path: SHOTS + '/r-touch-game.png' });
  check(await p.evaluate(() => !document.querySelector('#touch').hidden), 'touch controls are shown during a match on a touch device');
  await p.context().close();
}
console.log('console errors/warnings:', errs.length); errs.forEach((e) => console.log('  ', e.split('\n').slice(0, 3).join(' | ')));
await browser.close(); web.kill();
process.exit(ok && errs.length === 0 ? 0 : 1);
