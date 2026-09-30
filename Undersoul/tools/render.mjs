// node tools/render.mjs <trackId|all|validate> [seconds]
import * as esbuild from 'esbuild';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const here = path.dirname(new URL(import.meta.url).pathname);
const out = process.env.OUT || path.join(here, '..', '.renders');
fs.mkdirSync(out, { recursive: true });
await esbuild.build({ entryPoints: [path.join(here, 'render-entry.js')], bundle: true, format: 'iife', outfile: path.join(out, 'render.js'), logLevel: 'error' });
fs.writeFileSync(path.join(out, 'render.html'), '<!doctype html><script src="render.js"></script>');
const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
page.on('console', (m) => console.log('[page]', m.text()));
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto('file://' + path.join(out, 'render.html'));
const what = process.argv[2] || 'validate';
const secs = parseFloat(process.argv[3] || '30');
if (what === 'validate') {
  const rep = await page.evaluate(() => window.validate());
  console.log(rep.length ? rep.join('\n') : 'all tracks consistent');
  const ids = await page.evaluate(() => window.trackList());
  for (const id of ids) console.log(id, JSON.stringify(await page.evaluate((i) => window.trackInfo(i), id)));
} else {
  const ids = what === 'all' ? await page.evaluate(() => window.trackList()) : what.split(',');
  for (const id of ids) {
    const b64 = await page.evaluate(([i, s]) => window.renderTrack(i, s), [id, secs]);
    fs.writeFileSync(path.join(out, id + '.wav'), Buffer.from(b64, 'base64'));
    console.log('rendered', id);
  }
}
await browser.close();
