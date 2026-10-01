// Shared helpers for the browser tests. Needs Playwright (global or local) and a Chromium build:
//   PLAYWRIGHT_CHROMIUM=/path/to/chromium   (optional - falls back to Playwright's own browser)
import { createRequire } from 'module';
import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const GAME = path.resolve(here, '../../game');
export const SHOTS = process.env.SHOTS || path.join(here, 'shots');
export const PSERVER = path.join(here, 'pserver.cjs');

function loadPlaywright() {
  const roots = [here];
  try { roots.push(execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()); } catch {}
  if (process.env.NODE_PATH) roots.push(...process.env.NODE_PATH.split(path.delimiter));
  for (const r of roots) {
    try { return createRequire(path.join(r, 'noop.js'))('playwright'); } catch {}
  }
  throw new Error('Playwright not found - run `npm i -g playwright` or `npm i` inside tests/e2e');
}
export const { chromium } = loadPlaywright();

// static file server for the game folder (python3 is everywhere; no extra dependency)
export function serve(dir, port) {
  return spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { cwd: dir || GAME, stdio: 'ignore' });
}
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export async function launch() {
  const opts = { args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--use-fake-ui-for-media-stream', '--allow-loopback-in-peer-connection'] };
  if (process.env.PLAYWRIGHT_CHROMIUM) opts.executablePath = process.env.PLAYWRIGHT_CHROMIUM;
  return chromium.launch(opts);
}
export function hookLogs(page, tag, errs) {
  page.on('console', (m) => { const t = m.type(); if (t === 'error' || t === 'warning') { const s = `[${tag}] ${t}: ${m.text()}`; errs.push(s); console.log(s); } });
  page.on('pageerror', (e) => { const s = `[${tag}] PAGEERROR: ${e.message}\n${(e.stack || '').split('\n').slice(0, 6).join('\n')}`; errs.push(s); console.log(s); });
}
