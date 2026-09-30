// Small kit for building characters: painted faces, eyes, limbs.
import * as THREE from 'three';
import { toon, glow } from './materials.js';

const TAU = Math.PI * 2;

// A face decal painted on a canvas, mapped on a sphere cap.
// draw(g, W, expr) paints; returns mesh with userData.setExpr.
export function faceCap(radius, draw, opts = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = opts.res ?? 256;
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  const span = opts.span ?? 1.6;
  const vspan = opts.vspan ?? 1.5;
  const geo = new THREE.SphereGeometry(radius * 1.012, 24, 16, Math.PI / 2 - span / 2, span, Math.PI / 2 - vspan / 2 + (opts.vOffset ?? 0), vspan);
  const mat = opts.lit === false
    ? new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false })
    : new THREE.MeshToonMaterial({ map: t, transparent: true, depthWrite: false });
  const m = new THREE.Mesh(geo, mat);
  m.userData.noOutline = true;
  m.renderOrder = 2;
  let cur = null;
  m.userData.setExpr = (expr) => {
    if (expr === cur) return;
    cur = expr;
    const g = canvas.getContext('2d');
    g.clearRect(0, 0, canvas.width, canvas.height);
    draw(g, canvas.width, expr);
    t.needsUpdate = true;
  };
  m.userData.setExpr(opts.expr ?? 'neutral');
  return m;
}

// Common eye painting helpers
export function paintEyes(g, W, opts) {
  const { y = 0.45, gap = 0.28, r = 0.07, color = '#141018', white = false, expr = 'neutral', pupil = 0.5, lash = false } = opts;
  const xs = [0.5 - gap / 2, 0.5 + gap / 2];
  for (let i = 0; i < 2; i++) {
    const x = xs[i] * W, yy = y * W;
    if (expr === 'blink' || expr === 'happy' || expr === 'closed') {
      g.strokeStyle = color;
      g.lineWidth = W * 0.025;
      g.lineCap = 'round';
      g.beginPath();
      if (expr === 'happy') g.arc(x, yy + r * W * 0.4, r * W * 0.8, Math.PI * 1.15, Math.PI * 1.85);
      else { g.moveTo(x - r * W, yy); g.lineTo(x + r * W, yy); }
      g.stroke();
      continue;
    }
    if (white) {
      g.fillStyle = '#fff';
      g.beginPath();
      g.ellipse(x, yy, r * W, r * W * 1.2, 0, 0, TAU);
      g.fill();
      g.strokeStyle = '#141018';
      g.lineWidth = W * 0.012;
      g.stroke();
      g.fillStyle = color;
      g.beginPath();
      g.ellipse(x, yy + r * W * 0.15, r * W * pupil, r * W * pupil * 1.2, 0, 0, TAU);
      g.fill();
    } else {
      g.fillStyle = color;
      g.beginPath();
      g.ellipse(x, yy, r * W * 0.7, r * W, 0, 0, TAU);
      g.fill();
    }
    g.fillStyle = '#fff';
    g.beginPath();
    g.arc(x - r * W * 0.25, yy - r * W * 0.35, r * W * 0.25, 0, TAU);
    g.fill();
    if (lash) {
      g.strokeStyle = '#141018';
      g.lineWidth = W * 0.012;
      g.beginPath();
      const s = i === 0 ? -1 : 1;
      g.moveTo(x + s * r * W * 0.8, yy - r * W * 0.9);
      g.lineTo(x + s * r * W * 1.3, yy - r * W * 1.3);
      g.stroke();
    }
    if (expr === 'sad' || expr === 'angry') {
      g.strokeStyle = '#141018';
      g.lineWidth = W * 0.02;
      g.beginPath();
      const s = i === 0 ? 1 : -1;
      const up = expr === 'sad' ? 1 : -1;
      g.moveTo(x - s * r * W * 1.1, yy - r * W * 1.3 - up * r * W * 0.4);
      g.lineTo(x + s * r * W * 0.9, yy - r * W * 1.4 + up * r * W * 0.4);
      g.stroke();
    }
  }
}

export function paintMouth(g, W, opts) {
  const { y = 0.68, w = 0.12, expr = 'neutral', color = '#141018', fill = '#6a2a3a' } = opts;
  g.strokeStyle = color;
  g.lineWidth = W * 0.02;
  g.lineCap = 'round';
  const cx = W / 2, cy = y * W;
  g.beginPath();
  if (expr === 'happy' || expr === 'smile') g.arc(cx, cy - w * W * 0.4, w * W * 0.6, 0.15 * Math.PI, 0.85 * Math.PI);
  else if (expr === 'sad') g.arc(cx, cy + w * W * 0.6, w * W * 0.5, 1.2 * Math.PI, 1.8 * Math.PI);
  else if (expr === 'shock' || expr === 'talk') {
    g.fillStyle = fill;
    g.ellipse(cx, cy, w * W * 0.35, w * W * 0.45, 0, 0, TAU);
    g.fill();
  } else if (expr === 'grin') {
    g.fillStyle = '#fff';
    g.ellipse(cx, cy, w * W, w * W * 0.45, 0, 0, Math.PI);
    g.fill();
  } else { g.moveTo(cx - w * W * 0.4, cy); g.lineTo(cx + w * W * 0.4, cy); }
  g.stroke();
}

export function sphere(r, color, x = 0, y = 0, z = 0, seg = 16, opts) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(8, seg * 0.75)), typeof color === 'string' ? toon(color, opts) : color);
  m.position.set(x, y, z);
  return m;
}

export function capsule(r, len, color, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 12), typeof color === 'string' ? toon(color) : color);
  m.position.set(x, y, z);
  return m;
}

export function cone(r, h, color, x = 0, y = 0, z = 0, seg = 10) {
  const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), typeof color === 'string' ? toon(color) : color);
  m.position.set(x, y, z);
  return m;
}

export function cyl(rt, rb, h, color, x = 0, y = 0, z = 0, seg = 12) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), typeof color === 'string' ? toon(color) : color);
  m.position.set(x, y, z);
  return m;
}

export function boxm(w, h, d, color, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), typeof color === 'string' ? toon(color) : color);
  m.position.set(x, y, z);
  return m;
}

export function limb(parent, x, y, z, len, r, color, handColor) {
  const pivot = new THREE.Group();
  pivot.position.set(x, y, z);
  const arm = capsule(r, len, color, 0, -len / 2 - r * 0.3, 0);
  pivot.add(arm);
  if (handColor) pivot.add(sphere(r * 1.15, handColor, 0, -len - r * 0.6, 0, 10));
  parent.add(pivot);
  return pivot;
}

export function glowEye(r, color, x, y, z) {
  return sphere(r, glow(color, 2.2), x, y, z, 10);
}

// Emblem: a seven-pointed star (the royal crest) painted on a plane.
export function emblem(size = 0.5, color = '#e8c060') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = color;
  g.beginPath();
  for (let i = 0; i < 14; i++) {
    const r = i % 2 ? 22 : 56;
    const a = (i / 14) * TAU - Math.PI / 2;
    const x = 64 + Math.cos(a) * r, y = 64 + Math.sin(a) * r;
    if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
  }
  g.closePath();
  g.fill();
  g.fillStyle = '#ff3a3a';
  g.beginPath();
  g.arc(64, 64, 12, 0, TAU);
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshToonMaterial({ map: t, transparent: true }));
  m.userData.noOutline = true;
  return m;
}
