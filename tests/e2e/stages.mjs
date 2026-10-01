import { launch, serve, sleep, hookLogs, SHOTS, GAME } from './lib.mjs';
import fs from 'fs';
fs.mkdirSync(SHOTS, { recursive: true });
const srv = serve(GAME, 8133); await sleep(700);
const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1000, height: 667 } })).newPage();
const errs = []; hookLogs(page, 'p', errs);
await page.goto('http://127.0.0.1:8133/index.html'); await page.waitForSelector('#s-title.show');
await page.keyboard.press('Enter'); await sleep(400);
await page.evaluate(() => {
  const T = window.__tuff, g = T.game;
  document.querySelectorAll('.screen').forEach((e) => e.classList.remove('show')); T.inMatch = true; T.ui_current = null;
  window.scenario = (cfg, init, stopWhen) => new Promise((res) => {
    g.startOffline(cfg); g.paused = false;
    if (init) new Function('s', init)(g.state);
    const stop = new Function('s', 'return ' + stopWhen);
    let ticks = 0;
    g.debugInputs = (s, bits) => {
      ticks++;
      if (stop(s) || ticks > 900) { g.paused = true; g.debugInputs = null; setTimeout(res, 100); return bits.map(() => 0); }
      return bits.map(() => 0);
    };
  });
});
const fighters4 = [{ char: 'sans', kind: 'cpu', lvl: 2 }, { char: 'papyrus', kind: 'cpu', lvl: 2 }, { char: 'papyrus', kind: 'cpu', lvl: 2 }, { char: 'sans', kind: 'cpu', lvl: 2 }];
async function shot(name, cfg, init, stopWhen) {
  await page.evaluate(([c, i, w]) => window.scenario(c, i, w), [cfg, init, stopWhen]);
  await page.screenshot({ path: `${SHOTS}/s-${name}.png` });
  console.log('shot', name);
}
await shot('ice', { fighters: fighters4, stage: 'ice', stocks: 3, seconds: 99 }, null, "s.phase==='fight' && s.phaseT===600");
await shot('hall', { fighters: fighters4, stage: 'hall', stocks: 3, seconds: 99 }, "s.hazT = 30;", "s.projs.some(p=>p.o===-1 && p.t===50)");
await shot('hall-bones', { fighters: fighters4, stage: 'hall', stocks: 3, seconds: 99 }, "s.hazT = 30;", "s.projs.some(p=>p.o===-1 && p.t===62)");
await shot('ball', { fighters: fighters4.slice(0, 2), stage: 'snowdin', stocks: 3, seconds: 99 }, "s.ballT = 5;", "s.ball && s.ball.t===40");
await shot('ko-zoom', { fighters: fighters4.slice(0, 2).map((f) => ({ ...f, kind: 'cpu' })), stage: 'snowdin', stocks: 1, seconds: 99 }, "s.phase='fight'; s.fighters[1].dmg=400; s.fighters[1].x=830; s.fighters[0].x=780; s.fighters[1].y=150; s.fighters[0].y=150; s.fighters[0].meter=0;", "s.phase==='over' && s.phaseT===34");
await shot('offscreen', { fighters: fighters4.slice(0, 3), stage: 'snowdin', stocks: 3, seconds: 99 }, "s.phase='fight'; s.fighters[1].st='launch'; s.fighters[1].stun=60; s.fighters[1].x=1150; s.fighters[1].y=80; s.fighters[1].vx=3; s.fighters[1].vy=0;", "s.phase==='fight' && s.phaseT===6");
console.log('errors', errs.length); errs.forEach((e) => console.log(e.split('\n').slice(0, 4).join('\n')));
await browser.close(); srv.kill(); process.exit(errs.length ? 1 : 0);
