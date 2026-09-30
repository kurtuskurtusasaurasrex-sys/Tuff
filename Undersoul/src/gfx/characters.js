// Named characters. Every builder returns a Group with userData:
//   height, animate(dt, t, moving), setExpr(expr)
import * as THREE from 'three';
import { toon, lit, glow, outlineAll, shadows } from './materials.js';
import { faceCap, paintEyes, paintMouth, sphere, capsule, cone, cyl, boxm, limb, emblem } from './kit.js';
import { buildHuman, animateHuman, setFace } from './human.js';

const TAU = Math.PI * 2;

function finish(g, height, opts = {}) {
  outlineAll(g, opts.outline ?? 0.02);
  shadows(g, true, false);
  g.userData.height = height;
  g.userData.animate = g.userData.animate || (() => {});
  g.userData.setExpr = g.userData.setExpr || (() => {});
  return g;
}

function walkBob(parts, t, moving, amp = 1) {
  const s = Math.sin(t * 9);
  if (parts.legL) parts.legL.rotation.x = s * 0.6 * moving * amp;
  if (parts.legR) parts.legR.rotation.x = -s * 0.6 * moving * amp;
  if (parts.armL) parts.armL.rotation.x = -s * 0.4 * moving * amp;
  if (parts.armR) parts.armR.rotation.x = s * 0.4 * moving * amp;
}

// ---------------------------------------------------------------------------
export function sprig() {
  const g = new THREE.Group();
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.05, 0.25, 0), new THREE.Vector3(-0.04, 0.5, 0.02), new THREE.Vector3(0, 0.68, 0.04)]);
  const stem = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.035, 6), toon('#3f8a3a'));
  g.add(stem);
  for (const s of [-1, 1]) {
    const leaf = sphere(0.12, '#4aa044', s * 0.12, 0.22 + (s > 0 ? 0.05 : 0), 0, 10);
    leaf.scale.set(1.6, 0.25, 0.7);
    leaf.rotation.z = s * 0.4;
    g.add(leaf);
  }
  const head = new THREE.Group();
  head.position.set(0, 0.72, 0.05);
  g.add(head);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU;
    const p = sphere(0.1, '#ffd23a', Math.cos(a) * 0.17, Math.sin(a) * 0.17, -0.02, 10, { emissive: '#ffb000', emissiveIntensity: 0.15 });
    p.scale.set(1.25, 0.8, 0.35);
    p.rotation.z = a;
    head.add(p);
  }
  const disc = cyl(0.14, 0.14, 0.05, '#fff4d8', 0, 0, 0, 20);
  disc.rotation.x = Math.PI / 2;
  head.add(disc);
  const faceC = document.createElement('canvas');
  faceC.width = faceC.height = 128;
  const ft = new THREE.CanvasTexture(faceC);
  ft.colorSpace = THREE.SRGBColorSpace;
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.135, 24), new THREE.MeshBasicMaterial({ map: ft, transparent: true }));
  face.position.z = 0.027;
  face.userData.noOutline = true;
  head.add(face);
  let cur = '';
  const setExpr = (e) => {
    if (e === cur) return;
    cur = e;
    const x = faceC.getContext('2d');
    x.clearRect(0, 0, 128, 128);
    x.fillStyle = '#1a1010';
    x.strokeStyle = '#1a1010';
    x.lineWidth = 5;
    x.lineCap = 'round';
    if (e === 'evil') {
      x.fillStyle = '#000';
      x.beginPath(); x.ellipse(42, 50, 13, 17, 0.3, 0, TAU); x.ellipse(86, 50, 13, 17, -0.3, 0, TAU); x.fill();
      x.fillStyle = '#fff';
      x.beginPath(); x.arc(44, 54, 3, 0, TAU); x.arc(84, 54, 3, 0, TAU); x.fill();
      x.fillStyle = '#000';
      x.beginPath(); x.moveTo(24, 76); x.quadraticCurveTo(64, 120, 104, 76); x.quadraticCurveTo(64, 94, 24, 76); x.fill();
      x.fillStyle = '#fff';
      for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(34 + i * 11, 80 + (i % 2)); x.lineTo(39 + i * 11, 92); x.lineTo(44 + i * 11, 80 + (i % 2)); x.fill(); }
    } else {
      if (e === 'wink') { x.beginPath(); x.moveTo(34, 52); x.lineTo(50, 52); x.stroke(); }
      else { x.beginPath(); x.ellipse(42, 50, 6, 10, 0, 0, TAU); x.fill(); }
      x.beginPath(); x.ellipse(86, 50, 6, 10, 0, 0, TAU); x.fill();
      x.beginPath();
      if (e === 'sad') x.arc(64, 96, 16, 1.2 * Math.PI, 1.8 * Math.PI);
      else if (e === 'shock') { x.ellipse(64, 84, 8, 11, 0, 0, TAU); x.fill(); }
      else x.arc(64, 70, 20, 0.2 * Math.PI, 0.8 * Math.PI);
      x.stroke();
    }
    ft.needsUpdate = true;
  };
  setExpr('neutral');
  g.userData.setExpr = setExpr;
  g.userData.animate = (dt, t) => {
    head.rotation.z = Math.sin(t * 1.7) * 0.12;
    head.rotation.x = Math.sin(t * 1.3) * 0.05;
    head.position.y = 0.72 + Math.sin(t * 2.2) * 0.015;
  };
  return finish(g, 0.95);
}

// ---------------------------------------------------------------------------
function robe(color, h = 1.6, top = 0.3, bottom = 0.6) {
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const r = bottom + (top - bottom) * Math.pow(t, 0.8) + Math.sin(t * Math.PI) * 0.05;
    pts.push(new THREE.Vector2(r, t * h));
  }
  pts.push(new THREE.Vector2(0.001, h));
  const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 20), toon(color));
  return m;
}

export function willow() {
  const g = new THREE.Group();
  const body = robe('#5a4aa8', 1.5, 0.3, 0.62);
  g.add(body);
  const hem = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.035, 6, 30), toon('#e8c060'));
  hem.rotation.x = Math.PI / 2;
  hem.position.y = 0.05;
  g.add(hem);
  const em = emblem(0.42, '#e8d080');
  em.position.set(0, 1.1, 0.36);
  em.rotation.x = -0.12;
  g.add(em);
  const fur = '#f6eee2';
  const armL = limb(g, -0.36, 1.35, 0, 0.55, 0.1, '#5a4aa8', fur);
  const armR = limb(g, 0.36, 1.35, 0, 0.55, 0.1, '#5a4aa8', fur);
  armL.rotation.set(-0.5, 0, -0.35);
  armR.rotation.set(-0.5, 0, 0.35);
  const head = new THREE.Group();
  head.position.y = 1.85;
  g.add(head);
  head.add(cyl(0.12, 0.15, 0.25, fur, 0, -0.18, 0));
  const skull = sphere(0.3, fur, 0, 0.05, 0, 20);
  skull.scale.set(0.95, 1, 1);
  head.add(skull);
  const snout = sphere(0.16, fur, 0, -0.04, 0.22, 16);
  snout.scale.set(1.1, 0.8, 1);
  head.add(snout);
  head.add(sphere(0.045, '#4a3030', 0, 0.01, 0.37, 10));
  for (const s of [-1, 1]) {
    const ear = capsule(0.07, 0.34, fur, s * 0.32, -0.02, -0.04);
    ear.rotation.z = s * 1.1;
    ear.scale.set(1, 1, 0.45);
    head.add(ear);
    const inner = capsule(0.04, 0.26, '#f0b8b0', s * 0.33, -0.03, -0.01);
    inner.rotation.z = s * 1.1;
    inner.scale.set(1, 1, 0.3);
    head.add(inner);
  }
  const face = faceCap(0.3, (x, W, e) => {
    paintEyes(x, W, { y: 0.42, gap: 0.34, r: 0.06, color: '#b0602a', white: true, expr: e === 'blink' ? 'blink' : e, pupil: 0.55 });
  }, { span: 1.4, vspan: 1.0, vOffset: -0.1 });
  face.position.y = 0.05;
  head.add(face);
  let blink = 3;
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t, moving) => {
    head.rotation.z = Math.sin(t * 0.9) * 0.03;
    body.scale.set(1, 1 + Math.sin(t * 1.5) * 0.01, 1);
    armL.rotation.x = -0.5 + Math.sin(t * 8) * 0.25 * moving;
    armR.rotation.x = -0.5 - Math.sin(t * 8) * 0.25 * moving;
    g.position.y = Math.abs(Math.sin(t * 8)) * 0.03 * moving;
    blink -= dt;
    if (blink < 0) { face.userData.setExpr('blink'); if (blink < -0.12) { face.userData.setExpr('neutral'); blink = 3 + Math.random() * 3; } }
  };
  return finish(g, 2.3);
}

// ---------------------------------------------------------------------------
export function hush() {
  const g = new THREE.Group();
  const bodyMat = toon('#e8ecff', { transparent: true, opacity: 0.85 });
  const inner = new THREE.Group();
  g.add(inner);
  const body = sphere(0.38, bodyMat, 0, 0.8, 0, 20);
  body.scale.set(1, 1.35, 0.95);
  inner.add(body);
  const tail = cone(0.3, 0.5, bodyMat, 0, 0.25, 0);
  tail.rotation.x = Math.PI;
  inner.add(tail);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU;
    const tuft = sphere(0.1, '#f4f4ff', Math.cos(a) * 0.3, 1.18, Math.sin(a) * 0.25, 8);
    inner.add(tuft);
  }
  const wingMat = new THREE.MeshToonMaterial({ color: '#c8c8e8', transparent: true, opacity: 0.7, side: THREE.DoubleSide });
  const wings = [];
  for (const s of [-1, 1]) for (const up of [0, 1]) {
    const w = new THREE.Mesh(new THREE.CircleGeometry(0.42 - up * 0.1, 16), wingMat);
    w.scale.set(1, 0.7, 1);
    const pivot = new THREE.Group();
    pivot.position.set(s * 0.25, up ? 0.7 : 1.0, -0.15);
    w.position.set(s * 0.35, up ? -0.1 : 0.05, 0);
    w.userData.noOutline = true;
    pivot.add(w);
    pivot.rotation.z = s * (up ? -0.6 : -0.3);
    pivot.userData.s = s;
    pivot.userData.up = up;
    inner.add(pivot);
    wings.push(pivot);
  }
  for (const s of [-1, 1]) {
    const ant = cyl(0.01, 0.012, 0.4, '#8a8aa8', s * 0.12, 1.45, 0.05, 5);
    ant.rotation.z = -s * 0.5;
    inner.add(ant);
    inner.add(sphere(0.04, '#d8d8ff', s * 0.22, 1.62, 0.05, 8));
  }
  const face = faceCap(0.38, (x, W, e) => {
    x.strokeStyle = '#2a2a4a';
    x.lineWidth = W * 0.02;
    x.lineCap = 'round';
    for (const ex of [0.4, 0.6]) {
      x.beginPath();
      if (e === 'happy') x.arc(ex * W, 0.5 * W, W * 0.04, Math.PI * 1.1, Math.PI * 1.9);
      else { x.moveTo(ex * W - W * 0.05, 0.48 * W); x.lineTo(ex * W + W * 0.05, 0.5 * W); }
      x.stroke();
    }
    if (e !== 'happy') {
      x.fillStyle = '#8ab8ff';
      x.beginPath();
      x.ellipse(0.62 * W, 0.58 * W, W * 0.015, W * 0.03, 0, 0, TAU);
      x.fill();
    }
    paintMouth(x, W, { y: 0.66, w: 0.06, expr: e === 'happy' ? 'smile' : 'sad', color: '#2a2a4a' });
  }, { span: 1.3, vspan: 1.0 });
  face.position.y = 0.8;
  face.scale.set(1, 1.35, 0.95);
  inner.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    inner.position.y = 0.2 + Math.sin(t * 1.4) * 0.08;
    for (const w of wings) w.rotation.y = w.userData.s * (0.3 + Math.sin(t * 2.5 + w.userData.up) * 0.25);
  };
  return finish(g, 1.9, { outline: 0.015 });
}

// ---------------------------------------------------------------------------
// Candle brothers. Their flame is their mood.
function flame(color, size = 1) {
  const f = new THREE.Group();
  const outer = cone(0.09 * size, 0.28 * size, glow(color, 2.5), 0, 0.14 * size, 0);
  const inner = cone(0.05 * size, 0.18 * size, glow('#ffffff', 2), 0, 0.1 * size, 0.01);
  outer.userData.noOutline = inner.userData.noOutline = true;
  f.add(outer, inner);
  const l = new THREE.PointLight(color, 2.2 * size, 4 * size, 2);
  l.position.y = 0.15 * size;
  f.add(l);
  f.userData.outer = outer;
  f.userData.light = l;
  return f;
}

function drips(parent, r, y, color, n = 7) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + 0.3;
    const len = 0.06 + ((i * 37) % 10) / 60;
    const d = capsule(0.035, len, color, Math.cos(a) * r, y - len / 2, Math.sin(a) * r);
    parent.add(d);
  }
}

export function wick() {
  const g = new THREE.Group();
  const wax = '#f6f0e6';
  const legL = new THREE.Group(), legR = new THREE.Group();
  for (const [leg, s] of [[legL, -1], [legR, 1]]) {
    leg.position.set(s * 0.12, 0.28, 0);
    leg.add(capsule(0.08, 0.12, '#2a2a36', 0, -0.12, 0));
    const shoe = sphere(0.1, '#e8e0f8', 0, -0.25, 0.04, 10);
    shoe.scale.set(1, 0.6, 1.4);
    leg.add(shoe);
    g.add(leg);
  }
  const body = cyl(0.3, 0.32, 0.55, wax, 0, 0.55, 0, 20);
  g.add(body);
  // hoodie
  const hood = cyl(0.33, 0.35, 0.42, '#3a6ab8', 0, 0.5, 0, 20);
  g.add(hood);
  const zip = boxm(0.04, 0.4, 0.02, '#e8e8f0', 0, 0.5, 0.345);
  g.add(zip);
  const hoodBack = sphere(0.25, '#2f5aa0', 0, 0.78, -0.22, 12);
  hoodBack.scale.set(1.2, 0.6, 0.6);
  g.add(hoodBack);
  const armL = limb(g, -0.36, 0.66, 0, 0.26, 0.08, '#3a6ab8', wax);
  const armR = limb(g, 0.36, 0.66, 0, 0.26, 0.08, '#3a6ab8', wax);
  armL.rotation.z = -0.25;
  armR.rotation.z = 0.25;
  const head = new THREE.Group();
  head.position.y = 0.95;
  g.add(head);
  head.add(cyl(0.3, 0.3, 0.3, wax, 0, 0, 0, 20));
  drips(head, 0.29, 0.13, wax, 8);
  head.add(cyl(0.012, 0.012, 0.08, '#222', 0, 0.18, 0, 5));
  const fl = flame('#9ad8ff', 1);
  fl.position.y = 0.2;
  head.add(fl);
  const face = faceCap(0.3, (x, W, e) => {
    x.fillStyle = '#141018';
    for (const ex of [0.38, 0.62]) {
      x.beginPath();
      if (e === 'wink' && ex > 0.5) { x.fillRect(ex * W - W * 0.06, 0.44 * W, W * 0.12, W * 0.02); continue; }
      x.ellipse(ex * W, 0.44 * W, W * 0.055, W * 0.065, 0, 0, TAU);
      x.fill();
      if (e !== 'dark') {
        x.fillStyle = e === 'blue' ? '#6ad8ff' : '#ffffff';
        x.beginPath();
        x.arc(ex * W, 0.45 * W, W * 0.018, 0, TAU);
        x.fill();
        x.fillStyle = '#141018';
      }
    }
    x.strokeStyle = '#141018';
    x.lineWidth = W * 0.02;
    x.beginPath();
    x.moveTo(0.3 * W, 0.6 * W);
    x.quadraticCurveTo(0.5 * W, 0.72 * W, 0.7 * W, 0.6 * W);
    x.stroke();
    for (let i = 1; i < 5; i++) {
      const xx = (0.3 + i * 0.08) * W;
      x.beginPath(); x.moveTo(xx, 0.6 * W + Math.sin(i / 5 * Math.PI) * W * 0.05); x.lineTo(xx, 0.66 * W); x.stroke();
    }
  }, { span: 1.5, vspan: 1.0, vOffset: 0.1 });
  face.scale.set(1, 0.55, 1);
  face.position.y = 0.0;
  head.add(face);
  const parts = { legL, legR, armL, armR };
  g.userData.setExpr = (e) => {
    face.userData.setExpr(e);
    const col = e === 'blue' ? '#3ab8ff' : e === 'dark' ? '#202040' : '#9ad8ff';
    fl.userData.outer.material.color.set(col).multiplyScalar(2.5);
    fl.userData.light.color.set(col);
    fl.visible = e !== 'out';
  };
  g.userData.flame = fl;
  g.userData.animate = (dt, t, moving) => {
    walkBob(parts, t, moving, 0.8);
    fl.scale.set(1, 1 + Math.sin(t * 15) * 0.1 + Math.sin(t * 23) * 0.06, 1);
    fl.rotation.z = Math.sin(t * 3) * 0.1;
    head.rotation.z = Math.sin(t * 0.8) * 0.03;
  };
  return finish(g, 1.3);
}

export function taper() {
  const g = new THREE.Group();
  const wax = '#e8603a';
  const legL = new THREE.Group(), legR = new THREE.Group();
  for (const [leg, s] of [[legL, -1], [legR, 1]]) {
    leg.position.set(s * 0.12, 0.8, 0);
    leg.add(capsule(0.07, 0.6, '#f0f0f8', 0, -0.38, 0));
    const boot = capsule(0.1, 0.18, '#d83a3a', 0, -0.68, 0.03);
    leg.add(boot);
    g.add(leg);
  }
  const body = cyl(0.2, 0.24, 1.0, wax, 0, 1.3, 0, 18);
  g.add(body);
  const chest = cyl(0.27, 0.26, 0.5, '#f4f4fc', 0, 1.5, 0, 18);
  g.add(chest);
  const belt = cyl(0.26, 0.26, 0.08, '#e8c040', 0, 1.22, 0, 18);
  g.add(belt);
  // scarf / cape
  const cape = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 1.1, 1, 6), toon('#d83a3a', { side: THREE.DoubleSide }));
  cape.position.set(0, 1.25, -0.3);
  cape.rotation.x = 0.15;
  g.add(cape);
  const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.07, 8, 16), toon('#d83a3a'));
  scarf.rotation.x = Math.PI / 2;
  scarf.position.y = 1.8;
  g.add(scarf);
  const armL = limb(g, -0.34, 1.72, 0, 0.55, 0.07, '#f4f4fc', '#d83a3a');
  const armR = limb(g, 0.34, 1.72, 0, 0.55, 0.07, '#f4f4fc', '#d83a3a');
  armL.rotation.z = -0.3;
  armR.rotation.set(0, 0, 2.6);
  const head = new THREE.Group();
  head.position.y = 2.05;
  g.add(head);
  head.add(cyl(0.2, 0.2, 0.36, wax, 0, 0, 0, 18));
  drips(head, 0.19, 0.16, wax, 6);
  head.add(cyl(0.012, 0.012, 0.08, '#222', 0, 0.22, 0, 5));
  const fl = flame('#ffb03a', 1.5);
  fl.position.y = 0.24;
  head.add(fl);
  const face = faceCap(0.2, (x, W, e) => {
    paintEyes(x, W, { y: 0.42, gap: 0.34, r: 0.08, color: '#141018', white: true, expr: e === 'happy' ? 'neutral' : e, pupil: 0.45 });
    x.fillStyle = '#141018';
    x.beginPath();
    if (e === 'sad') x.arc(W / 2, 0.78 * W, W * 0.12, 1.15 * Math.PI, 1.85 * Math.PI);
    else x.ellipse(W / 2, 0.62 * W, W * 0.2, W * 0.12, 0, 0, Math.PI);
    x.fill();
    if (e !== 'sad') {
      x.fillStyle = '#fff';
      x.fillRect(0.34 * W, 0.62 * W, 0.32 * W, W * 0.035);
    }
  }, { span: 1.7, vspan: 1.2 });
  face.scale.set(1, 0.9, 1);
  head.add(face);
  const parts = { legL, legR };
  let pose = 'hero';
  g.userData.setExpr = (e) => {
    face.userData.setExpr(e);
    if (e === 'sad') pose = 'rest';
  };
  g.userData.setPose = (p) => { pose = p; };
  g.userData.animate = (dt, t, moving) => {
    walkBob(parts, t, moving, 1);
    fl.scale.set(1, 1 + Math.sin(t * 14) * 0.12, 1);
    cape.rotation.x = 0.15 + Math.sin(t * 2) * 0.08 + moving * 0.3;
    if (pose === 'hero') { armR.rotation.set(0, 0, 2.6 + Math.sin(t * 2) * 0.05); armL.rotation.set(Math.sin(t * 9) * 0.4 * moving, 0, -0.3); }
    else { armR.rotation.set(-Math.sin(t * 9) * 0.4 * moving, 0, 0.3); armL.rotation.set(Math.sin(t * 9) * 0.4 * moving, 0, -0.3); }
  };
  return finish(g, 2.5);
}

// ---------------------------------------------------------------------------
export function maris() {
  const g = new THREE.Group();
  const armor = '#2f5a6a', skin = '#6a8ab0', belly = '#e8eef8';
  const legL = new THREE.Group(), legR = new THREE.Group();
  for (const [leg, s] of [[legL, -1], [legR, 1]]) {
    leg.position.set(s * 0.16, 0.85, 0);
    leg.add(capsule(0.1, 0.6, armor, 0, -0.4, 0));
    leg.add(capsule(0.12, 0.12, '#1f3a44', 0, -0.76, 0.04));
    g.add(leg);
  }
  const torso = capsule(0.3, 0.45, armor, 0, 1.35, 0);
  g.add(torso);
  const plate = sphere(0.3, lit('#4a8a9a', { metalness: 0.6, roughness: 0.35 }), 0, 1.45, 0.12, 16);
  plate.scale.set(1, 1.1, 0.6);
  g.add(plate);
  for (const s of [-1, 1]) {
    const pad = sphere(0.18, lit('#4a8a9a', { metalness: 0.6, roughness: 0.35 }), s * 0.36, 1.72, 0, 12);
    pad.scale.set(1.2, 0.8, 1);
    g.add(pad);
  }
  const coral = cone(0.08, 0.25, '#ff6a5a', 0, 1.5, 0.3);
  coral.rotation.x = Math.PI / 2;
  g.add(coral);
  const armL = limb(g, -0.4, 1.7, 0, 0.55, 0.09, armor, skin);
  const armR = limb(g, 0.4, 1.7, 0, 0.55, 0.09, armor, skin);
  armL.rotation.z = -0.25;
  armR.rotation.set(-0.3, 0, 0.3);
  // spear
  const spear = new THREE.Group();
  spear.add(cyl(0.025, 0.025, 2.2, glow('#46e6ff', 1.5), 0, 0, 0, 6));
  const tip = cone(0.07, 0.3, glow('#9af4ff', 2.5), 0, 1.2, 0, 6);
  spear.add(tip);
  spear.position.set(0, -0.62, 0.1);
  spear.rotation.x = 0.1;
  armR.add(spear);
  const head = new THREE.Group();
  head.position.y = 2.1;
  g.add(head);
  const skull = sphere(0.32, skin, 0, 0, 0, 20);
  skull.scale.set(0.95, 0.9, 1.15);
  head.add(skull);
  const jaw = sphere(0.24, belly, 0, -0.12, 0.12, 14);
  jaw.scale.set(1.1, 0.6, 1);
  head.add(jaw);
  const fin = cone(0.14, 0.4, '#ff6a5a', 0, 0.35, -0.08, 4);
  fin.scale.set(0.35, 1, 1.2);
  fin.rotation.x = -0.35;
  head.add(fin);
  for (const s of [-1, 1]) {
    const gill = cone(0.08, 0.25, '#ff8a6a', s * 0.3, 0.05, -0.05, 4);
    gill.rotation.z = -s * 1.2;
    gill.scale.set(0.4, 1, 1);
    head.add(gill);
  }
  const face = faceCap(0.32, (x, W, e) => {
    const angry = e !== 'happy' && e !== 'soft';
    paintEyes(x, W, { y: 0.42, gap: 0.36, r: 0.07, color: '#ffd84a', white: true, expr: e === 'soft' ? 'neutral' : e, pupil: 0.35 });
    if (angry) {
      x.strokeStyle = '#141018';
      x.lineWidth = W * 0.03;
      x.beginPath(); x.moveTo(0.22 * W, 0.3 * W); x.lineTo(0.4 * W, 0.36 * W); x.moveTo(0.78 * W, 0.3 * W); x.lineTo(0.6 * W, 0.36 * W); x.stroke();
    }
    // scar over the left eye
    x.strokeStyle = '#8a3a4a';
    x.lineWidth = W * 0.018;
    x.beginPath(); x.moveTo(0.26 * W, 0.28 * W); x.lineTo(0.38 * W, 0.56 * W); x.stroke();
    // shark grin
    x.fillStyle = '#141018';
    x.beginPath(); x.moveTo(0.28 * W, 0.66 * W); x.quadraticCurveTo(0.5 * W, 0.84 * W, 0.72 * W, 0.66 * W); x.quadraticCurveTo(0.5 * W, 0.72 * W, 0.28 * W, 0.66 * W); x.fill();
    x.fillStyle = '#fff';
    for (let i = 0; i < 7; i++) { const xx = (0.32 + i * 0.055) * W; x.beginPath(); x.moveTo(xx, 0.68 * W); x.lineTo(xx + W * 0.022, 0.73 * W); x.lineTo(xx + W * 0.044, 0.68 * W); x.fill(); }
  }, { span: 1.4, vspan: 1.1 });
  face.scale.copy(skull.scale);
  head.add(face);
  const parts = { legL, legR, armL };
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.spear = spear;
  g.userData.animate = (dt, t, moving) => {
    walkBob(parts, t, moving, 1);
    torso.scale.y = 1 + Math.sin(t * 1.8) * 0.015;
    spear.rotation.z = Math.sin(t * 1.5) * 0.05;
  };
  return finish(g, 2.5);
}

// ---------------------------------------------------------------------------
export function lotl() {
  const g = new THREE.Group();
  const pink = '#ff9ac0';
  const legL = new THREE.Group(), legR = new THREE.Group();
  for (const [leg, s] of [[legL, -1], [legR, 1]]) {
    leg.position.set(s * 0.12, 0.25, 0);
    leg.add(capsule(0.08, 0.1, pink, 0, -0.1, 0));
    g.add(leg);
  }
  const body = sphere(0.33, pink, 0, 0.5, 0, 18);
  body.scale.set(1, 1.05, 0.9);
  g.add(body);
  const coat = cyl(0.3, 0.4, 0.5, '#f4f6fa', 0, 0.45, 0, 18);
  g.add(coat);
  const tail = cone(0.14, 0.5, pink, 0, 0.3, -0.35);
  tail.rotation.x = -1.9;
  g.add(tail);
  const armL = limb(g, -0.33, 0.62, 0, 0.18, 0.07, '#f4f6fa', pink);
  const armR = limb(g, 0.33, 0.62, 0, 0.18, 0.07, '#f4f6fa', pink);
  armL.rotation.set(-0.8, 0, -0.5);
  armR.rotation.set(-0.8, 0, 0.5);
  const head = new THREE.Group();
  head.position.y = 0.98;
  g.add(head);
  const skull = sphere(0.3, pink, 0, 0, 0, 18);
  skull.scale.set(1.25, 0.9, 1);
  head.add(skull);
  for (const s of [-1, 1]) for (let k = 0; k < 3; k++) {
    const gill = capsule(0.03, 0.2, '#e8406a', s * 0.36, 0.15 - k * 0.1, -0.02);
    gill.rotation.z = -s * (1.1 - k * 0.35);
    head.add(gill);
  }
  const glasses = new THREE.Group();
  for (const s of [-1, 1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.012, 6, 18), toon('#2a2a33'));
    ring.position.set(s * 0.12, 0.04, 0.28);
    glasses.add(ring);
  }
  head.add(glasses);
  const face = faceCap(0.3, (x, W, e) => {
    paintEyes(x, W, { y: 0.45, gap: 0.3, r: 0.035, color: '#141018', expr: e });
    paintMouth(x, W, { y: 0.66, w: 0.1, expr: e === 'happy' ? 'smile' : e === 'nervous' ? 'talk' : e });
    if (e === 'nervous') {
      x.fillStyle = '#8ad8ff';
      x.beginPath(); x.ellipse(0.8 * W, 0.35 * W, W * 0.02, W * 0.035, 0, 0, TAU); x.fill();
    }
  }, { span: 1.5, vspan: 1.0 });
  face.scale.copy(skull.scale);
  head.add(face);
  const parts = { legL, legR };
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t, moving) => {
    walkBob(parts, t, moving, 1);
    tail.rotation.z = Math.sin(t * 3) * 0.3;
    head.rotation.z = Math.sin(t * 1.2) * 0.05;
  };
  return finish(g, 1.3);
}

// ---------------------------------------------------------------------------
export function luxe(nova = false) {
  const g = new THREE.Group();
  const black = lit('#1a1a22', { metalness: 0.7, roughness: 0.25 });
  const gold = lit('#e8c060', { metalness: 0.9, roughness: 0.25 });
  const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.08, 10, 20), black);
  wheel.position.y = 0.3;
  g.add(wheel);
  const body = boxm(0.8, 1.0, 0.55, black, 0, 1.0, 0);
  g.add(body);
  const panel = boxm(0.6, 0.35, 0.02, glow('#ff5ad0', 1.4), 0, 0.95, 0.28);
  panel.userData.noOutline = true;
  g.add(panel);
  for (let i = 0; i < 5; i++) {
    const b = sphere(0.035, gold, -0.24 + i * 0.12, 1.35, 0.28, 8);
    g.add(b);
  }
  const armL = limb(g, -0.46, 1.35, 0, 0.6, 0.05, gold, black);
  const armR = limb(g, 0.46, 1.35, 0, 0.6, 0.05, gold, black);
  armL.rotation.z = -0.5;
  armR.rotation.set(0, 0, 2.3);
  const head = new THREE.Group();
  head.position.y = 1.8;
  g.add(head);
  head.add(cyl(0.05, 0.08, 0.3, gold, 0, -0.2, 0, 8));
  const lamp = cyl(0.3, 0.22, 0.5, black, 0, 0.12, 0, 20);
  lamp.rotation.x = Math.PI / 2 - 0.2;
  head.add(lamp);
  const screenC = document.createElement('canvas');
  screenC.width = screenC.height = 128;
  const st = new THREE.CanvasTexture(screenC);
  st.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(new THREE.CircleGeometry(0.27, 24), new THREE.MeshBasicMaterial({ map: st, toneMapped: false }));
  screen.position.set(0, 0.17, 0.25);
  screen.rotation.x = -0.2;
  screen.userData.noOutline = true;
  head.add(screen);
  const beam = new THREE.PointLight('#ffe8f8', 3, 6, 2);
  beam.position.set(0, 0.2, 0.6);
  head.add(beam);
  let cur = '';
  const setExpr = (e) => {
    if (e === cur) return;
    cur = e;
    const x = screenC.getContext('2d');
    const grd = x.createRadialGradient(64, 64, 10, 64, 64, 64);
    grd.addColorStop(0, '#ffe8ff');
    grd.addColorStop(1, '#ff5ad0');
    x.fillStyle = grd;
    x.fillRect(0, 0, 128, 128);
    x.fillStyle = '#1a0a1a';
    const px = (xx, yy, w = 8, h = 8) => x.fillRect(xx, yy, w, h);
    if (e === 'wink') { px(34, 50, 20, 6); } else { px(38, 42, 10, 18); }
    px(80, 42, 10, 18);
    if (e === 'angry') { px(30, 34, 24, 5); px(74, 34, 24, 5); }
    if (e === 'sad') { px(44, 86, 40, 6); px(36, 94, 8, 6); px(84, 94, 8, 6); }
    else { px(36, 78, 8, 8); px(44, 86, 40, 8); px(84, 78, 8, 8); }
    st.needsUpdate = true;
  };
  setExpr('neutral');
  if (nova) {
    const wingMat = glow('#ff7ad8', 1.8, { transparent: true, opacity: 0.7, additive: true, side: THREE.DoubleSide });
    for (const s of [-1, 1]) {
      const w = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.6, 3), wingMat);
      w.position.set(s * 0.8, 1.3, -0.3);
      w.rotation.z = -s * 1.1;
      w.userData.noOutline = true;
      g.add(w);
    }
  }
  g.userData.setExpr = setExpr;
  g.userData.animate = (dt, t, moving) => {
    wheel.rotation.x += dt * moving * 8;
    body.rotation.z = Math.sin(t * 2) * 0.03;
    head.rotation.z = Math.sin(t * 1.6) * 0.1;
    armR.rotation.z = 2.3 + Math.sin(t * 3) * 0.15;
    panel.material.color.setHSL((t * 0.15) % 1, 0.8, 0.6).multiplyScalar(1.4);
  };
  return finish(g, 2.2);
}

// ---------------------------------------------------------------------------
function antlers(parent, y, size, color, flowers = false) {
  const m = toon(color);
  for (const s of [-1, 1]) {
    const main = new THREE.Group();
    main.position.set(s * 0.18 * size, y, -0.02);
    main.rotation.z = -s * 0.5;
    const beam = cyl(0.035 * size, 0.05 * size, 0.7 * size, m, 0, 0.35 * size, 0, 6);
    main.add(beam);
    for (let k = 0; k < 3; k++) {
      const tine = cyl(0.02 * size, 0.03 * size, 0.32 * size, m, 0, 0.25 * size + k * 0.18 * size, 0, 5);
      tine.position.x = s * 0.1 * size;
      tine.rotation.z = -s * (0.9 - k * 0.2);
      main.add(tine);
      if (flowers && k === 1) {
        const f = sphere(0.05 * size, toon('#ffd23a', { emissive: '#ffb000', emissiveIntensity: 0.2 }), s * 0.05 * size, 0.3 * size, 0.04, 8);
        main.add(f);
      }
    }
    parent.add(main);
  }
}

export function king() {
  const g = new THREE.Group();
  const fur = '#8a5a3a';
  const cape = robe('#8a1f2f', 2.0, 0.55, 1.0);
  g.add(cape);
  const trim = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.06, 6, 30), toon('#e8c060'));
  trim.rotation.x = Math.PI / 2;
  trim.position.y = 0.06;
  g.add(trim);
  const chest = sphere(0.6, lit('#c8a050', { metalness: 0.6, roughness: 0.4 }), 0, 1.9, 0.12, 18);
  chest.scale.set(1, 0.95, 0.75);
  g.add(chest);
  const em = emblem(0.5, '#fff0b0');
  em.position.set(0, 1.95, 0.58);
  g.add(em);
  for (const s of [-1, 1]) {
    const pad = sphere(0.3, lit('#c8a050', { metalness: 0.6, roughness: 0.4 }), s * 0.6, 2.35, 0, 14);
    pad.scale.set(1.2, 0.7, 1);
    g.add(pad);
  }
  const armL = limb(g, -0.72, 2.3, 0, 0.8, 0.14, '#8a1f2f', fur);
  const armR = limb(g, 0.72, 2.3, 0, 0.8, 0.14, '#8a1f2f', fur);
  armL.rotation.z = -0.3;
  armR.rotation.z = 0.3;
  const head = new THREE.Group();
  head.position.y = 2.75;
  g.add(head);
  const skull = sphere(0.38, fur, 0, 0, 0, 20);
  skull.scale.set(0.95, 1, 1.05);
  head.add(skull);
  const snout = sphere(0.2, '#a87a54', 0, -0.08, 0.3, 14);
  snout.scale.set(1, 0.8, 1.1);
  head.add(snout);
  head.add(sphere(0.06, '#2a1a14', 0, -0.03, 0.5, 10));
  const beard = cone(0.22, 0.4, '#f0e6d8', 0, -0.35, 0.18, 10);
  beard.rotation.x = Math.PI + 0.3;
  head.add(beard);
  for (const s of [-1, 1]) {
    const ear = capsule(0.07, 0.22, fur, s * 0.38, 0.12, -0.02);
    ear.rotation.z = s * 1.3;
    head.add(ear);
  }
  antlers(head, 0.3, 1.5, '#d8c8a8', true);
  const face = faceCap(0.38, (x, W, e) => {
    paintEyes(x, W, { y: 0.4, gap: 0.36, r: 0.045, color: '#141018', expr: e });
  }, { span: 1.3, vspan: 0.9, vOffset: -0.1 });
  face.scale.copy(skull.scale);
  head.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t, moving) => {
    head.rotation.z = Math.sin(t * 0.7) * 0.02;
    armL.rotation.x = Math.sin(t * 7) * 0.2 * moving;
    armR.rotation.x = -Math.sin(t * 7) * 0.2 * moving;
    cape.scale.y = 1 + Math.sin(t * 1.2) * 0.008;
  };
  return finish(g, 3.4, { outline: 0.025 });
}

// ---------------------------------------------------------------------------
export function rowan(hope = false) {
  const g = new THREE.Group();
  const fur = '#f6f0e6';
  if (!hope) {
    const kid = buildHuman({ skin: 0, hair: 7, hairColor: 5, eyes: 1, shirt: 2, stripe: 3, pants: 1, shoes: 0, accessory: 0 }, { soulColor: '#9ae07a', outline: false });
    kid.scale.setScalar(1.05);
    g.add(kid);
    const head = kid.userData.parts.head;
    const snout = sphere(0.12, fur, 0, -0.05, 0.22, 12);
    snout.scale.set(1, 0.75, 0.9);
    head.add(snout);
    head.add(sphere(0.03, '#3a2a2a', 0, -0.02, 0.33, 8));
    for (const s of [-1, 1]) {
      const ear = capsule(0.05, 0.16, fur, s * 0.3, 0.02, -0.02);
      ear.rotation.z = s * 1.2;
      head.add(ear);
    }
    antlers(head, 0.2, 0.55, '#d8c8a8', false);
    g.userData.kid = kid;
    g.userData.setExpr = (e) => setFace(kid, e === 'sad' ? 'sad' : e === 'happy' ? 'happy' : 'neutral');
    g.userData.animate = (dt, t, moving) => animateHuman(kid, dt, moving ? 3 : 0);
    return finish(g, 1.5);
  }
  // Heart of Seven: robed, radiant.
  const r = robe('#101018', 2.0, 0.4, 1.0);
  g.add(r);
  const glowRing = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.05, 8, 40), glow('#ffffff', 2));
  glowRing.rotation.x = Math.PI / 2;
  glowRing.position.y = 0.06;
  glowRing.userData.noOutline = true;
  g.add(glowRing);
  const stripes = [];
  const cols = ['#ff2a2a', '#ff9a1f', '#ffe81f', '#35ff58', '#42e8ff', '#2f6dff', '#c95cff'];
  cols.forEach((c, i) => {
    const s = new THREE.Mesh(new THREE.TorusGeometry(0.9 - i * 0.07, 0.02, 6, 30), glow(c, 2));
    s.rotation.x = Math.PI / 2;
    s.position.y = 0.3 + i * 0.22;
    s.userData.noOutline = true;
    g.add(s);
    stripes.push(s);
  });
  const head = new THREE.Group();
  head.position.y = 2.4;
  g.add(head);
  const skull = sphere(0.36, fur, 0, 0, 0, 20);
  head.add(skull);
  const snout = sphere(0.18, fur, 0, -0.08, 0.28, 14);
  snout.scale.set(1, 0.8, 1);
  head.add(snout);
  antlers(head, 0.28, 1.6, '#fff8e0', false);
  const face = faceCap(0.36, (x, W, e) => {
    paintEyes(x, W, { y: 0.42, gap: 0.34, r: 0.06, color: e === 'angry' ? '#ff2a2a' : '#35ff58', white: true, expr: e, pupil: 0.6 });
  }, { span: 1.3, vspan: 0.9 });
  head.add(face);
  const wings = [];
  cols.forEach((c, i) => {
    const w = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 1.4), glow(c, 1.5, { transparent: true, opacity: 0.8, additive: true, side: THREE.DoubleSide }));
    const a = -1.2 + (i / 6) * 2.4;
    w.position.set(Math.sin(a) * 1.1, 2.2 + Math.cos(a) * 0.5, -0.4);
    w.rotation.z = -a;
    w.userData.noOutline = true;
    g.add(w);
    wings.push(w);
  });
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    stripes.forEach((s, i) => { s.position.y = 0.3 + i * 0.22 + Math.sin(t * 2 + i) * 0.03; });
    wings.forEach((w, i) => { w.material.opacity = 0.5 + 0.3 * Math.sin(t * 3 + i); });
    g.position.y = Math.sin(t * 1.3) * 0.1 + 0.2;
  };
  return finish(g, 3.2, { outline: 0.02 });
}

// ---------------------------------------------------------------------------
export function tuft() {
  const g = new THREE.Group();
  const scale = '#ffb04a';
  const legL = new THREE.Group(), legR = new THREE.Group();
  for (const [leg, s] of [[legL, -1], [legR, 1]]) {
    leg.position.set(s * 0.11, 0.3, 0);
    leg.add(capsule(0.08, 0.14, scale, 0, -0.14, 0));
    g.add(leg);
  }
  const body = capsule(0.2, 0.2, '#6a8ae8', 0, 0.55, 0);
  g.add(body);
  const stripe = cyl(0.205, 0.205, 0.08, '#e8e8f8', 0, 0.56, 0, 14);
  g.add(stripe);
  const tail = cone(0.1, 0.4, scale, 0, 0.35, -0.25);
  tail.rotation.x = -1.8;
  g.add(tail);
  const wings = [];
  for (const s of [-1, 1]) {
    const w = cone(0.08, 0.25, '#ff7a3a', s * 0.24, 0.75, -0.1, 3);
    w.rotation.z = -s * 1.2;
    g.add(w);
    wings.push(w);
  }
  const head = new THREE.Group();
  head.position.y = 0.95;
  g.add(head);
  const skull = sphere(0.28, scale, 0, 0, 0, 18);
  skull.scale.set(1, 0.95, 1);
  head.add(skull);
  const snout = sphere(0.14, scale, 0, -0.06, 0.22, 12);
  snout.scale.set(1.1, 0.7, 1);
  head.add(snout);
  for (const s of [-1, 1]) {
    const horn = cone(0.05, 0.16, '#f4ecd8', s * 0.15, 0.24, -0.05, 6);
    horn.rotation.z = -s * 0.4;
    head.add(horn);
  }
  const face = faceCap(0.28, (x, W, e) => {
    paintEyes(x, W, { y: 0.42, gap: 0.32, r: 0.075, color: '#141018', white: true, expr: e, pupil: 0.6 });
    paintMouth(x, W, { y: 0.74, w: 0.1, expr: e === 'sad' ? 'sad' : 'smile' });
  }, { span: 1.5, vspan: 1.1 });
  face.scale.copy(skull.scale);
  head.add(face);
  const parts = { legL, legR };
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t, moving) => {
    walkBob(parts, t, moving, 1.2);
    wings.forEach((w, i) => { w.rotation.x = Math.sin(t * 20 + i) * 0.4; });
    tail.rotation.z = Math.sin(t * 4) * 0.3;
    g.position.y = Math.abs(Math.sin(t * 10)) * 0.04 * moving;
  };
  return finish(g, 1.3);
}

// ---------------------------------------------------------------------------
export function silk() {
  const g = new THREE.Group();
  const purple = '#7a3ab8';
  const body = sphere(0.35, purple, 0, 0.55, 0, 18);
  body.scale.set(1, 1.1, 0.9);
  g.add(body);
  const apron = cyl(0.3, 0.42, 0.45, '#fff4f8', 0, 0.45, 0.02, 18);
  g.add(apron);
  const abdomen = sphere(0.3, '#5a2a8a', 0, 0.45, -0.4, 14);
  g.add(abdomen);
  const legs = [];
  for (let i = 0; i < 3; i++) for (const s of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(s * 0.28, 0.45 - i * 0.05, -0.1 + i * 0.08);
    const seg = capsule(0.035, 0.45, purple, s * 0.2, -0.15, 0);
    seg.rotation.z = s * 1.1;
    leg.add(seg);
    g.add(leg);
    legs.push(leg);
  }
  const arms = [];
  for (let k = 0; k < 2; k++) for (const s of [-1, 1]) {
    const a = limb(g, s * 0.32, 0.85 - k * 0.15, 0.05, 0.3, 0.04, purple, purple);
    a.rotation.set(-0.6, 0, s * (0.6 + k * 0.4));
    arms.push(a);
  }
  const head = new THREE.Group();
  head.position.y = 1.05;
  g.add(head);
  const skull = sphere(0.26, purple, 0, 0, 0, 18);
  head.add(skull);
  const bonnet = sphere(0.3, '#ff8ac8', 0, 0.08, -0.05, 16);
  bonnet.scale.set(1, 0.7, 1);
  head.add(bonnet);
  const bow = sphere(0.08, '#ff5aa8', 0, 0.28, -0.1, 10);
  bow.scale.set(2, 0.8, 0.8);
  head.add(bow);
  const face = faceCap(0.26, (x, W, e) => {
    const eyes = [[0.35, 0.42], [0.5, 0.38], [0.65, 0.42], [0.42, 0.52], [0.58, 0.52]];
    for (const [ex, ey] of eyes) {
      x.fillStyle = '#141018';
      x.beginPath(); x.ellipse(ex * W, ey * W, W * 0.035, W * 0.045, 0, 0, TAU); x.fill();
      x.fillStyle = '#fff';
      x.beginPath(); x.arc(ex * W - W * 0.01, ey * W - W * 0.015, W * 0.012, 0, TAU); x.fill();
    }
    paintMouth(x, W, { y: 0.7, w: 0.1, expr: e === 'angry' ? 'grin' : 'smile' });
  }, { span: 1.4, vspan: 1.0 });
  head.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    legs.forEach((l, i) => { l.rotation.x = Math.sin(t * 3 + i) * 0.15; });
    arms.forEach((a, i) => { a.rotation.x = -0.6 + Math.sin(t * 2 + i * 1.3) * 0.2; });
    head.rotation.z = Math.sin(t * 1.1) * 0.06;
  };
  return finish(g, 1.4);
}

// ---------------------------------------------------------------------------
// Townsfolk: a bunny/bear/cat/bird villager with colour options.
export function villager(kind = 'bunny', color = '#f0e8f0', clothes = '#6a8ac8') {
  const g = new THREE.Group();
  const legL = new THREE.Group(), legR = new THREE.Group();
  for (const [leg, s] of [[legL, -1], [legR, 1]]) {
    leg.position.set(s * 0.12, 0.35, 0);
    leg.add(capsule(0.08, 0.16, color, 0, -0.15, 0));
    g.add(leg);
  }
  const body = capsule(0.24, 0.3, clothes, 0, 0.7, 0);
  g.add(body);
  const armL = limb(g, -0.3, 0.9, 0, 0.26, 0.07, clothes, color);
  const armR = limb(g, 0.3, 0.9, 0, 0.26, 0.07, clothes, color);
  armL.rotation.z = -0.2;
  armR.rotation.z = 0.2;
  const head = new THREE.Group();
  head.position.y = 1.22;
  g.add(head);
  const skull = sphere(0.28, color, 0, 0, 0, 18);
  head.add(skull);
  if (kind === 'bunny') {
    for (const s of [-1, 1]) {
      const ear = capsule(0.07, 0.4, color, s * 0.12, 0.42, -0.02);
      ear.rotation.z = -s * 0.15;
      ear.scale.set(1, 1, 0.5);
      head.add(ear);
      const inner = capsule(0.04, 0.3, '#ffb8c8', s * 0.12, 0.42, 0.01);
      inner.rotation.z = -s * 0.15;
      inner.scale.set(1, 1, 0.3);
      head.add(inner);
    }
  } else if (kind === 'bear') {
    for (const s of [-1, 1]) head.add(sphere(0.09, color, s * 0.22, 0.22, 0, 10));
    const snout = sphere(0.12, '#e8d0b0', 0, -0.06, 0.22, 10);
    snout.scale.set(1.1, 0.8, 0.8);
    head.add(snout);
  } else if (kind === 'cat') {
    for (const s of [-1, 1]) {
      const ear = cone(0.09, 0.18, color, s * 0.17, 0.26, 0, 4);
      ear.rotation.z = -s * 0.3;
      head.add(ear);
    }
  } else if (kind === 'bird') {
    const beak = cone(0.07, 0.18, '#ffb03a', 0, -0.02, 0.3, 6);
    beak.rotation.x = Math.PI / 2;
    head.add(beak);
    const crest = cone(0.05, 0.2, '#ff5a3a', 0, 0.32, 0, 6);
    head.add(crest);
  } else if (kind === 'fire') {
    skull.material = glow('#ff8a2a', 1.5);
    body.material = toon('#2a2a33');
    for (let i = 0; i < 4; i++) {
      const f = cone(0.12 - i * 0.02, 0.35, glow(i % 2 ? '#ffb03a' : '#ff6a1a', 2.2), Math.sin(i * 2) * 0.08, 0.28 + i * 0.08, 0, 6);
      f.userData.noOutline = true;
      head.add(f);
    }
    const bow = sphere(0.05, '#e84a4a', 0, 0.98, 0.22, 8);
    bow.scale.set(2.2, 0.8, 0.8);
    g.add(bow);
  }
  const face = faceCap(0.28, (x, W, e) => {
    if (kind === 'fire') {
      x.fillStyle = 'rgba(255,255,255,0.9)';
      for (const ex of [0.38, 0.62]) { x.beginPath(); x.ellipse(ex * W, 0.46 * W, W * 0.06, W * 0.04, 0, 0, TAU); x.fill(); }
      return;
    }
    paintEyes(x, W, { y: 0.44, gap: 0.3, r: 0.05, color: '#141018', expr: e });
    if (kind !== 'bird' && kind !== 'bear') paintMouth(x, W, { y: 0.66, w: 0.08, expr: e === 'sad' ? 'sad' : 'smile' });
  }, { span: 1.4, vspan: 1.0 });
  head.add(face);
  const parts = { legL, legR, armL, armR };
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t, moving) => {
    walkBob(parts, t, moving, 1);
    head.rotation.z = Math.sin(t * 1.3 + color.length) * 0.05;
  };
  return finish(g, 1.6);
}

// Wren: the first child to fall. Looks almost like you.
export function wren() {
  const kid = buildHuman({ skin: 1, hair: 0, hairColor: 1, eyes: 3, shirt: 1, stripe: 1, pants: 1, shoes: 0, accessory: 0 }, { soulColor: '#ff1a1a' });
  kid.userData.height = 1.5;
  kid.userData.setExpr = (e) => setFace(kid, e);
  kid.userData.animate = (dt, t, moving) => animateHuman(kid, dt, moving ? 3 : 0);
  return kid;
}

// A glowing translucent child, for the echoes of the fallen.
export function echoGhost(color) {
  const kid = buildHuman({ skin: 0, hair: 1, hairColor: 5, eyes: 0, shirt: 7, stripe: 7, pants: 0, shoes: 0, accessory: 0 }, { outline: false });
  const mat = glow(color, 1.2, { transparent: true, opacity: 0.55, additive: true });
  kid.traverse((o) => { if (o.isMesh) o.material = mat; });
  kid.userData.height = 1.5;
  kid.userData.setExpr = () => {};
  kid.userData.animate = (dt, t) => { kid.position.y = 0.1 + Math.sin(t * 2) * 0.06; animateHuman(kid, dt, 0); };
  return kid;
}

export const CHARACTER_BUILDERS = {
  sprig, willow, hush, wick, taper, maris, lotl, luxe, king, rowan, tuft, silk, villager, wren, echoGhost,
  luxe_nova: () => luxe(true),
  rowan_hope: () => rowan(true),
};
