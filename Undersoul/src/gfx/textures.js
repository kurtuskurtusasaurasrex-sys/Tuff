// Procedural canvas textures for environments. Deterministic per seed.
import * as THREE from 'three';
import { makeRng } from '../core/util.js';

const cache = new Map();

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function finish(c, repeat = [1, 1], opts = {}) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.colorSpace = opts.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (opts.pixel) {
    t.magFilter = THREE.NearestFilter;
    t.minFilter = THREE.NearestMipmapLinearFilter;
  }
  return t;
}

function shade(hex, amt) {
  const c = new THREE.Color(hex);
  c.offsetHSL(0, 0, amt);
  return '#' + c.getHexString();
}

function speckle(g, w, h, rng, colors, count, size = 2) {
  for (let i = 0; i < count; i++) {
    g.fillStyle = colors[Math.floor(rng.next() * colors.length)];
    g.globalAlpha = 0.15 + rng.next() * 0.25;
    const s = size * (0.5 + rng.next());
    g.fillRect(rng.next() * w, rng.next() * h, s, s);
  }
  g.globalAlpha = 1;
}

// key: cache key; build: (g, w, h, rng) => void
function make(key, w, h, build, opts = {}) {
  if (cache.has(key)) {
    const t = cache.get(key).clone();
    t.needsUpdate = true;
    return t;
  }
  const c = canvas(w, h);
  const g = c.getContext('2d');
  build(g, w, h, makeRng(opts.seed ?? 7));
  const t = finish(c, [1, 1], opts);
  cache.set(key, t);
  return t.clone();
}

export const tex = {
  bricks(base = '#6a3f8a', mortar = '#3b2150', opts = {}) {
    return make('bricks' + base + mortar, 256, 256, (g, w, h, rng) => {
      g.fillStyle = mortar;
      g.fillRect(0, 0, w, h);
      const rows = 8, bh = h / rows, bw = w / 4;
      for (let r = 0; r < rows; r++) {
        const off = r % 2 ? bw / 2 : 0;
        for (let c = -1; c < 5; c++) {
          const x = c * bw + off, y = r * bh;
          g.fillStyle = shade(base, (rng.next() - 0.5) * 0.08);
          g.fillRect(x + 2, y + 2, bw - 4, bh - 4);
          g.fillStyle = shade(base, 0.08);
          g.fillRect(x + 2, y + 2, bw - 4, 2);
          g.fillStyle = shade(base, -0.1);
          g.fillRect(x + 2, y + bh - 4, bw - 4, 2);
        }
      }
      speckle(g, w, h, rng, [shade(base, 0.15), shade(base, -0.2)], 600);
    }, opts);
  },

  tiles(base = '#7a4f9a', line = '#4b2d63', opts = {}) {
    return make('tiles' + base + line, 256, 256, (g, w, h, rng) => {
      g.fillStyle = line;
      g.fillRect(0, 0, w, h);
      const n = 4, s = w / n;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        g.fillStyle = shade(base, (rng.next() - 0.5) * 0.06);
        g.fillRect(x * s + 2, y * s + 2, s - 4, s - 4);
        g.fillStyle = shade(base, 0.05);
        g.fillRect(x * s + 2, y * s + 2, s - 4, 3);
      }
      // cracks
      g.strokeStyle = shade(line, -0.05);
      g.globalAlpha = 0.5;
      for (let i = 0; i < 6; i++) {
        g.beginPath();
        let x = rng.next() * w, y = rng.next() * h;
        g.moveTo(x, y);
        for (let k = 0; k < 5; k++) { x += (rng.next() - 0.5) * 30; y += (rng.next() - 0.5) * 30; g.lineTo(x, y); }
        g.stroke();
      }
      g.globalAlpha = 1;
      speckle(g, w, h, rng, [shade(base, 0.1), shade(base, -0.15)], 500);
    }, opts);
  },

  noise(base = '#ffffff', variance = 0.06, opts = {}) {
    return make('noise' + base + variance, 256, 256, (g, w, h, rng) => {
      g.fillStyle = base;
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < 3000; i++) {
        g.fillStyle = shade(base, (rng.next() - 0.5) * variance * 2);
        g.globalAlpha = 0.5;
        const s = 2 + rng.next() * 6;
        g.fillRect(rng.next() * w, rng.next() * h, s, s);
      }
      g.globalAlpha = 1;
    }, opts);
  },

  snow(opts = {}) {
    return make('snow', 256, 256, (g, w, h, rng) => {
      g.fillStyle = '#e9f1ff';
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < 200; i++) {
        const x = rng.next() * w, y = rng.next() * h, r = 8 + rng.next() * 30;
        const grd = g.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0, rng.next() < 0.5 ? 'rgba(200,215,255,0.35)' : 'rgba(255,255,255,0.5)');
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = grd;
        g.fillRect(x - r, y - r, r * 2, r * 2);
      }
      speckle(g, w, h, rng, ['#ffffff', '#c9d8f5'], 800, 2);
    }, opts);
  },

  planks(base = '#8a5a34', opts = {}) {
    return make('planks' + base, 256, 256, (g, w, h, rng) => {
      const n = 6, ph = h / n;
      for (let i = 0; i < n; i++) {
        g.fillStyle = shade(base, (rng.next() - 0.5) * 0.1);
        g.fillRect(0, i * ph, w, ph);
        g.strokeStyle = shade(base, -0.12);
        g.globalAlpha = 0.35;
        for (let k = 0; k < 6; k++) {
          g.beginPath();
          const yy = i * ph + rng.next() * ph;
          g.moveTo(0, yy);
          g.bezierCurveTo(w * 0.3, yy + (rng.next() - 0.5) * 8, w * 0.6, yy + (rng.next() - 0.5) * 8, w, yy);
          g.stroke();
        }
        g.globalAlpha = 1;
        g.fillStyle = shade(base, -0.2);
        g.fillRect(0, i * ph, w, 2);
        const cut = rng.next() * w;
        g.fillRect(cut, i * ph, 2, ph);
      }
    }, opts);
  },

  rock(base = '#2d3a5c', opts = {}) {
    return make('rock' + base, 256, 256, (g, w, h, rng) => {
      g.fillStyle = base;
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < 90; i++) {
        const x = rng.next() * w, y = rng.next() * h;
        const r = 10 + rng.next() * 40;
        g.fillStyle = shade(base, (rng.next() - 0.5) * 0.12);
        g.beginPath();
        g.moveTo(x + r, y);
        for (let a = 0; a < 7; a++) {
          const ang = (a / 7) * Math.PI * 2;
          const rr = r * (0.6 + rng.next() * 0.5);
          g.lineTo(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr);
        }
        g.fill();
      }
      speckle(g, w, h, rng, [shade(base, 0.12), shade(base, -0.15)], 700);
    }, opts);
  },

  metal(base = '#5b5f6e', opts = {}) {
    return make('metal' + base, 256, 256, (g, w, h, rng) => {
      g.fillStyle = base;
      g.fillRect(0, 0, w, h);
      const s = 128;
      for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
        g.fillStyle = shade(base, (rng.next() - 0.5) * 0.05);
        g.fillRect(x * s + 2, y * s + 2, s - 4, s - 4);
        g.fillStyle = shade(base, -0.2);
        for (const [dx, dy] of [[10, 10], [s - 14, 10], [10, s - 14], [s - 14, s - 14]]) {
          g.beginPath();
          g.arc(x * s + dx + 2, y * s + dy + 2, 4, 0, Math.PI * 2);
          g.fill();
        }
      }
      g.strokeStyle = shade(base, 0.1);
      g.globalAlpha = 0.2;
      for (let i = 0; i < 80; i++) {
        g.beginPath();
        const yy = rng.next() * h;
        g.moveTo(0, yy);
        g.lineTo(w, yy + (rng.next() - 0.5) * 4);
        g.stroke();
      }
      g.globalAlpha = 1;
    }, opts);
  },

  grass(base = '#3f7a3a', opts = {}) {
    return make('grass' + base, 256, 256, (g, w, h, rng) => {
      g.fillStyle = base;
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < 2500; i++) {
        g.strokeStyle = shade(base, (rng.next() - 0.4) * 0.2);
        g.beginPath();
        const x = rng.next() * w, y = rng.next() * h;
        g.moveTo(x, y);
        g.lineTo(x + (rng.next() - 0.5) * 4, y - 4 - rng.next() * 6);
        g.stroke();
      }
    }, opts);
  },

  carpet(base = '#8f2f3a', trim = '#e0b14a', opts = {}) {
    return make('carpet' + base + trim, 128, 256, (g, w, h) => {
      g.fillStyle = base;
      g.fillRect(0, 0, w, h);
      g.fillStyle = trim;
      g.fillRect(8, 0, 6, h);
      g.fillRect(w - 14, 0, 6, h);
      g.globalAlpha = 0.25;
      for (let y = 0; y < h; y += 32) {
        g.beginPath();
        g.moveTo(w / 2, y + 4);
        g.lineTo(w / 2 + 14, y + 16);
        g.lineTo(w / 2, y + 28);
        g.lineTo(w / 2 - 14, y + 16);
        g.fill();
      }
      g.globalAlpha = 1;
    }, opts);
  },

  // Tall soft gradient used for light shafts and glows.
  radial(color = '#ffffff') {
    return make('radial' + color, 128, 128, (g, w) => {
      const grd = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
      grd.addColorStop(0, color);
      grd.addColorStop(0.4, color + '88');
      grd.addColorStop(1, color + '00');
      g.fillStyle = grd;
      g.fillRect(0, 0, w, w);
    });
  },

  shaft() {
    return make('shaft', 64, 256, (g, w, h) => {
      const grd = g.createLinearGradient(0, 0, 0, h);
      grd.addColorStop(0, 'rgba(255,255,255,0)');
      grd.addColorStop(0.25, 'rgba(255,255,255,0.8)');
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grd;
      g.fillRect(0, 0, w, h);
      const side = g.createLinearGradient(0, 0, w, 0);
      side.addColorStop(0, 'rgba(0,0,0,1)');
      side.addColorStop(0.5, 'rgba(0,0,0,0)');
      side.addColorStop(1, 'rgba(0,0,0,1)');
      g.globalCompositeOperation = 'destination-out';
      g.fillStyle = side;
      g.fillRect(0, 0, w, h);
    });
  },

  // Stained glass for the Hall of Embers windows.
  stained(opts = {}) {
    return make('stained', 128, 256, (g, w, h, rng) => {
      g.fillStyle = '#2a1a08';
      g.fillRect(0, 0, w, h);
      const cols = ['#ffcf4a', '#ff9c2a', '#fff1a8', '#e8b33a', '#ffd97a'];
      for (let y = 8; y < h - 8; y += 24) for (let x = 8; x < w - 8; x += 28) {
        g.fillStyle = cols[Math.floor(rng.next() * cols.length)];
        g.fillRect(x, y, 24, 20);
      }
      g.fillStyle = '#2a1a08';
      g.beginPath();
      g.arc(w / 2, 60, 30, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = '#ff4a4a';
      g.beginPath();
      g.arc(w / 2, 60, 22, 0, Math.PI * 2);
      g.fill();
    }, opts);
  },
};

export function repeatTex(t, rx, ry) {
  const c = t.clone();
  c.repeat.set(rx, ry);
  c.needsUpdate = true;
  return c;
}
