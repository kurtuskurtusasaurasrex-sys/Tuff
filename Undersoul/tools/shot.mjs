// Drive the game in headless Chromium and capture screenshots.
// node tools/shot.mjs "wait 800; key z; wait 2000; shot title; hold x 1500; ..."
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.join(here, '..');
const out = path.join(root, '.renders', 'shots');
fs.mkdirSync(out, { recursive: true });
const script = (process.argv[2] || 'wait 1500; shot boot').split(';').map((s) => s.trim()).filter(Boolean);
const w = parseInt(process.env.W || '1280'), h = parseInt(process.env.H || '720');
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: w, height: h } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => errors.push('[pageerror] ' + e.message));
if (process.env.PRE) await page.addInitScript(process.env.PRE);
await page.goto('file://' + path.join(root, 'index.html') + (process.env.HASH || ''));
const KEYS = { z: 'KeyZ', x: 'KeyX', c: 'KeyC', up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', enter: 'Enter', esc: 'Escape' };
for (const cmd of script) {
  const [op, a, b] = cmd.split(/\s+/);
  if (op === 'wait') await page.waitForTimeout(parseInt(a));
  else if (op === 'key') { const n = parseInt(b || '1'); for (let i = 0; i < n; i++) { await page.keyboard.down(KEYS[a] || a); await page.waitForTimeout(110); await page.keyboard.up(KEYS[a] || a); await page.waitForTimeout(140); } }
  else if (op === 'hold') { await page.keyboard.down(KEYS[a] || a); await page.waitForTimeout(parseInt(b)); await page.keyboard.up(KEYS[a] || a); }
  else if (op === 'type') { await page.keyboard.type(a, { delay: 60 }); }
  else if (op === "eval") { console.log("eval:", JSON.stringify(await page.evaluate(cmd.slice(5)))); }
  else if (op === 'until') {
    const expr = cmd.slice(6);
    const t0 = Date.now();
    while (Date.now() - t0 < 30000) {
      if (await page.evaluate(expr).catch(() => false)) break;
      await page.waitForTimeout(100);
    }
  }
  else if (op === 'mode') {
    const t0 = Date.now();
    while (Date.now() - t0 < 30000) {
      const m = await page.evaluate(() => window.__game?.mode?.id).catch(() => null);
      if (m === a) break;
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(parseInt(b || '300'));
  }
  else if (op === 'idle') {
    // wait until no overlays and no fade
    const t0 = Date.now();
    while (Date.now() - t0 < 30000) {
      const ok = await page.evaluate(() => { const g = window.__game; return g && g.overlays.length === 0 && g.fadeAlpha < 0.01; }).catch(() => false);
      if (ok) break;
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(parseInt(a || '200'));
  }
  else if (op === 'talk') {
    // advance dialogue until none is open (or `a` presses), waiting for it to appear first
    const t0 = Date.now();
    while (Date.now() - t0 < 20000) {
      const n = await page.evaluate(() => window.__game.overlays.length);
      if (n) break;
      await page.waitForTimeout(100);
    }
    for (let i = 0; i < parseInt(a || '30'); i++) {
      const st = await page.evaluate(() => { const o = window.__game.overlays[window.__game.overlays.length - 1]; return o ? { done: o.typer ? o.typer.done : true, choosing: !!o.choosing } : null; });
      if (!st) { await page.waitForTimeout(1800); const again = await page.evaluate(() => window.__game.overlays.length); if (!again) break; continue; }
      if (!st.done) { await page.waitForTimeout(150); i--; continue; }
      await page.keyboard.down('KeyZ'); await page.waitForTimeout(110); await page.keyboard.up('KeyZ'); await page.waitForTimeout(250);
    }
  }
  else if (op === 'shot') { await page.screenshot({ path: path.join(out, a + '.png') }); console.log('shot', a); }
}
console.log(errors.length ? errors.slice(0, 30).join('\n') : 'no console errors');
await browser.close();
