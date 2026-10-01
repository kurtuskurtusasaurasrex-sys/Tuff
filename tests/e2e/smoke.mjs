import { launch, serve, sleep, hookLogs, SHOTS, GAME } from './lib.mjs';
import fs from 'fs';
fs.mkdirSync(SHOTS, { recursive: true });
const srv = serve(GAME, 8130);
await sleep(700);
const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1000, height: 667 } })).newPage();
const errs = []; hookLogs(page, 'p', errs);
await page.goto('http://127.0.0.1:8130/index.html');
await page.waitForSelector('#s-title.show', { timeout: 15000 });
await sleep(800);
await page.keyboard.press('Enter'); await sleep(500);
await page.screenshot({ path: SHOTS + '/n-menu.png' });
await page.click('[data-go=versus]'); await sleep(700);
await page.keyboard.press('Digit3'); await sleep(200);          // add a CPU in slot 3
await page.keyboard.press('Digit4'); await sleep(200);          // and slot 4
await page.screenshot({ path: SHOTS + '/n-lobby.png' });
await page.keyboard.press('Enter'); await sleep(400);          // lock in (Sans)
await page.screenshot({ path: SHOTS + '/n-lobby-ready.png' });
await page.keyboard.press('Enter'); await sleep(2500);        // fight
console.log('inMatch', await page.evaluate(() => window.__tuff.inMatch), 'fighters', await page.evaluate(() => window.__tuff.game.state && window.__tuff.game.state.n));
await sleep(3000);
await page.screenshot({ path: SHOTS + '/n-match4.png' });
await sleep(8000);
await page.screenshot({ path: SHOTS + '/n-match4b.png' });
console.log('errors:', errs.length);
await browser.close(); srv.kill(); process.exit(errs.length ? 1 : 0);
