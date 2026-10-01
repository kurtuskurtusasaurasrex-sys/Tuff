import { launch, serve, sleep, hookLogs, SHOTS, GAME, PSERVER } from './lib.mjs';
import { spawn } from 'child_process';
import fs from 'fs';
fs.mkdirSync(SHOTS, { recursive: true });
const web = serve(GAME, 8131);
const ps = spawn('node', [PSERVER], { stdio: 'ignore' });
await sleep(1500);
const browser = await launch();
const errs = [];
let ok = true; const check = (c, m) => { console.log(c ? '  ok  :' : '  FAIL:', m); if (!c) ok = false; };
const mk = async (tag) => { const ctx = await browser.newContext({ viewport: { width: 1000, height: 667 } }); const p = await ctx.newPage(); hookLogs(p, tag, errs); p._ctx = ctx; return p; };
const Q = 'peerHost=127.0.0.1&peerPort=9000&peerSecure=0';
const base = 'http://127.0.0.1:8131/index.html';

const H = await mk('H'), G1 = await mk('G1'), G2 = await mk('G2'), G3 = await mk('G3');
const guests = [G1, G2, G3];

await H.goto(`${base}?${Q}&seconds=30`); await H.waitForSelector('#s-title.show'); await H.keyboard.press('Enter'); await sleep(300);
await H.click('[data-go=host]');
await H.waitForFunction(() => document.querySelector('#room-code') && document.querySelector('#room-code').textContent.length === 5 && document.querySelector('#s-select').classList.contains('show'), null, { timeout: 20000 });
const code = await H.textContent('#room-code');
console.log('room code', code);
await H.screenshot({ path: SHOTS + '/q-host-lobby.png' });

for (const [i, g] of guests.entries()) {
  await g.goto(`${base}?${Q}&join=${code}`); await g.waitForSelector('#s-title.show'); await sleep(300); await g.keyboard.press('Enter');
  await g.waitForSelector('#s-select.show', { timeout: 25000 });
  await sleep(300);
}
check(true, 'three guests joined the host room through WebRTC');
await sleep(600);
const slotTypes = await H.evaluate(() => window.__tuff.lobby.slots.map((s) => s.type));
check(JSON.stringify(slotTypes) === JSON.stringify(['HUMAN', 'REMOTE', 'REMOTE', 'REMOTE']), 'host lobby shows 3 remote players: ' + slotTypes);
// everyone picks: guests choose Papyrus (press right then enter), host picks Sans
await H.keyboard.press('Enter');
for (const g of guests) { await g.keyboard.press('ArrowRight'); await sleep(100); await g.keyboard.press('Enter'); await sleep(150); }
await sleep(700);
await H.screenshot({ path: SHOTS + '/q-host-lobby-ready.png' });
await G1.screenshot({ path: SHOTS + '/q-guest-lobby.png' });
const ready = await H.evaluate(() => window.__tuff.lobby.slots.map((s) => s.ready + ':' + s.char));
console.log('   ready:', ready.join(' '));
check(await H.evaluate(() => !document.querySelector('#btn-fight').hidden), 'host sees the FIGHT button once everyone is ready');
check(await G1.evaluate(() => document.querySelector('#btn-fight').hidden), 'guests do not get a FIGHT button');
await H.click('#btn-fight');
for (const p of [H, ...guests]) await p.waitForFunction(() => window.__tuff.inMatch === true, null, { timeout: 15000 });
check(true, 'match started on all four machines');
const ns = await Promise.all([H, ...guests].map((p) => p.evaluate(() => window.__tuff.game.state.n)));
check(ns.every((n) => n === 4), 'all four peers simulate 4 fighters');

const keys = ['KeyD', 'KeyA', 'KeyW', 'KeyS']; const btns = ['KeyJ', 'KeyK', 'KeyL'];
async function mash(page, ms, seed) {
  let s = seed; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const end = Date.now() + ms; let held = [];
  while (Date.now() < end) {
    for (const k of held) await page.keyboard.up(k).catch(() => {});
    held = [];
    if (rnd() < 0.7) held.push(keys[(rnd() * 4) | 0]);
    if (rnd() < 0.3) held.push(keys[(rnd() * 4) | 0]);
    if (rnd() < 0.5) held.push(btns[(rnd() * 3) | 0]);
    for (const k of held) await page.keyboard.down(k).catch(() => {});
    await sleep(60 + rnd() * 160);
  }
  for (const k of held) await page.keyboard.up(k).catch(() => {});
}
const players = [H, ...guests];
await Promise.all(players.map((p, i) => mash(p, 12000, 11 + i * 17)));
await H.screenshot({ path: SHOTS + '/q-match-host.png' });
await G2.screenshot({ path: SHOTS + '/q-match-g2.png' });
let info = await Promise.all(players.map((p) => p.evaluate(() => { const s = window.__tuff.game.session; return { frame: s.frame, desynced: s.desynced, hashOk: s.stats.hashOk, rollbacks: s.stats.rollbacks, stalls: s.stats.stalls, maxDepth: s.stats.maxDepth }; })));
console.log('   ', JSON.stringify(info));
check(info.every((i) => !i.desynced), 'no desync on any of the 4 peers');
check(info.every((i) => i.hashOk >= 3), 'periodic state hashes agreed on every peer: ' + info.map((i) => i.hashOk));
check(Math.max(...info.map((i) => i.frame)) - Math.min(...info.map((i) => i.frame)) < 40, 'peers are within a few frames of each other: ' + info.map((i) => i.frame));

// a guest drops: the others carry on, a CPU takes over that fighter
await G3._ctx.close();
for (const p of [H, G1, G2]) await p.waitForFunction(() => window.__tuff.game.state.fighters[3].cpu === 1, null, { timeout: 25000 });
const cpuFlags = await Promise.all([H, G1, G2].map((p) => p.evaluate(() => window.__tuff.game.state.fighters.map((f) => f.cpu))));
console.log('   cpu flags after drop:', JSON.stringify(cpuFlags));
check(cpuFlags.every((c) => c[3] === 1 && c[0] === 0 && c[1] === 0 && c[2] === 0), 'every remaining peer agrees fighter 4 is now a CPU');
await Promise.all([H, G1, G2].map((p, i) => mash(p, 4000, 91 + i)));
const info2 = await Promise.all([H, G1, G2].map((p) => p.evaluate(() => { const s = window.__tuff.game.session; return { frame: s.frame, desynced: s.desynced, hashOk: s.stats.hashOk }; })));
check(info2.every((i) => !i.desynced), 'still in sync after the takeover: ' + JSON.stringify(info2));

// match end -> results on everyone, host rematches
for (const p of [H, G1, G2]) await p.waitForSelector('#s-result.show', { timeout: 60000 });
check(true, 'results screen reached on host and both remaining guests');
await H.screenshot({ path: SHOTS + '/q-results-host.png' });
await G1.screenshot({ path: SHOTS + '/q-results-guest.png' });
check(await G1.evaluate(() => document.querySelector('#res-rematch').hidden), 'guest results have no rematch button (host decides)');
await H.click('[data-act=rematch]');
for (const p of [H, G1, G2]) await p.waitForFunction(() => window.__tuff.inMatch && window.__tuff.game.state.phase === 'intro', null, { timeout: 15000 });
check(true, 'host rematch restarted the match for everyone');
await sleep(1500);
await H.keyboard.press('Escape'); await sleep(300);
await H.click('[data-act=quit]');
await G1.waitForSelector('#s-menu.show', { timeout: 15000 });
check(true, 'guests are returned to the menu when the host quits');
console.log('console errors/warnings:', errs.length); errs.forEach((e) => console.log('  ', e.split('\n')[0]));
await browser.close(); web.kill(); ps.kill();
process.exit(ok ? 0 : 1);
