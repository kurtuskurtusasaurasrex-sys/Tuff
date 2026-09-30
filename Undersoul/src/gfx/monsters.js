// Monster species met in random encounters (and wandering the world).
import * as THREE from 'three';
import { toon, lit, glow, outlineAll, shadows } from './materials.js';
import { faceCap, paintEyes, paintMouth, sphere, capsule, cone, cyl, boxm, limb } from './kit.js';
import { scarecrow } from './furniture.js';

const TAU = Math.PI * 2;

function finish(g, height, opts = {}) {
  outlineAll(g, opts.outline ?? 0.02);
  shadows(g, true, false);
  g.userData.height = height;
  g.userData.animate = g.userData.animate || (() => {});
  g.userData.setExpr = g.userData.setExpr || (() => {});
  return g;
}

function bigEye(r, iris = '#2a8a4a') {
  const e = new THREE.Group();
  e.add(sphere(r, '#ffffff', 0, 0, 0, 14));
  const ir = sphere(r * 0.55, iris, 0, 0, r * 0.62, 12);
  ir.scale.z = 0.5;
  e.add(ir);
  const p = sphere(r * 0.3, '#101010', 0, 0, r * 0.8, 10);
  p.scale.z = 0.5;
  e.add(p);
  e.userData.pupil = p;
  e.userData.iris = ir;
  return e;
}

// --- Hollows ---------------------------------------------------------------
export function croakle() {
  const g = new THREE.Group();
  const body = sphere(0.45, '#6ab85a', 0, 0.38, 0, 18);
  body.scale.set(1.25, 0.8, 1);
  g.add(body);
  const belly = sphere(0.36, '#e8f4c8', 0, 0.32, 0.14, 14);
  belly.scale.set(1.1, 0.7, 0.8);
  g.add(belly);
  const eyes = [];
  for (const s of [-1, 1]) {
    const e = bigEye(0.13);
    e.position.set(s * 0.24, 0.72, 0.15);
    g.add(e);
    eyes.push(e);
    const foot = sphere(0.12, '#5aa84a', s * 0.35, 0.06, 0.2, 10);
    foot.scale.set(1.3, 0.4, 1.4);
    g.add(foot);
  }
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.02, 6, 16, Math.PI), toon('#2a4a2a'));
  mouth.position.set(0, 0.46, 0.4);
  mouth.rotation.z = Math.PI;
  g.add(mouth);
  g.userData.animate = (dt, t) => {
    const hop = Math.max(0, Math.sin(t * 2.2));
    g.children[0].scale.y = 0.8 - hop * 0.08;
    g.position.y = Math.pow(hop, 6) * 0.25;
    eyes.forEach((e, i) => { e.rotation.y = Math.sin(t * 0.7 + i) * 0.3; });
  };
  return finish(g, 1.0);
}

export function flutterby() {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  g.add(inner);
  const body = sphere(0.22, '#f4ecd0', 0, 0.9, 0, 14);
  body.scale.set(1, 1.3, 1);
  inner.add(body);
  for (let i = 0; i < 6; i++) inner.add(sphere(0.07, '#fff8e8', Math.cos(i) * 0.18, 1.12, Math.sin(i) * 0.12, 8));
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  x.fillStyle = '#b8d8f4'; x.beginPath(); x.arc(32, 32, 30, 0, TAU); x.fill();
  x.fillStyle = '#6a8ad8'; x.beginPath(); x.arc(32, 32, 12, 0, TAU); x.fill();
  x.fillStyle = '#fff'; x.beginPath(); x.arc(30, 30, 5, 0, TAU); x.fill();
  const tt = new THREE.CanvasTexture(c);
  tt.colorSpace = THREE.SRGBColorSpace;
  const wmat = new THREE.MeshToonMaterial({ map: tt, transparent: true, side: THREE.DoubleSide });
  const wings = [];
  for (const s of [-1, 1]) {
    const pv = new THREE.Group();
    pv.position.set(s * 0.12, 0.95, -0.05);
    const w = new THREE.Mesh(new THREE.CircleGeometry(0.42, 20), wmat);
    w.position.x = s * 0.42;
    w.userData.noOutline = true;
    pv.add(w);
    inner.add(pv);
    wings.push([pv, s]);
  }
  const face = faceCap(0.22, (x2, W, e) => {
    paintEyes(x2, W, { y: 0.45, gap: 0.3, r: 0.07, expr: e === 'happy' ? 'happy' : 'sad' });
  }, { span: 1.4, vspan: 1.0 });
  face.position.y = 0.9;
  face.scale.set(1, 1.3, 1);
  inner.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    inner.position.y = Math.sin(t * 2.4) * 0.1;
    for (const [pv, s] of wings) pv.rotation.y = s * Math.sin(t * 12) * 0.7;
  };
  return finish(g, 1.4, { outline: 0.012 });
}

export function ogleye() {
  const g = new THREE.Group();
  const body = sphere(0.5, '#8a5ab8', 0, 0.6, 0, 20);
  g.add(body);
  const eye = bigEye(0.33, '#c83a3a');
  eye.position.set(0, 0.66, 0.26);
  g.add(eye);
  for (const s of [-1, 1]) {
    const leg = capsule(0.07, 0.15, '#6a3a98', s * 0.2, 0.12, 0);
    g.add(leg);
    const arm = capsule(0.05, 0.25, '#6a3a98', s * 0.52, 0.55, 0);
    arm.rotation.z = s * 0.6;
    g.add(arm);
  }
  const lid = sphere(0.35, '#6a3a98', 0, 0.66, 0.24, 16);
  lid.scale.set(1, 0.05, 1);
  lid.visible = false;
  g.add(lid);
  g.userData.animate = (dt, t) => {
    eye.rotation.y = Math.sin(t * 0.9) * 0.25;
    eye.rotation.x = Math.sin(t * 0.6) * 0.15;
    body.scale.y = 1 + Math.sin(t * 2) * 0.03;
    lid.visible = (t % 4) < 0.12;
  };
  return finish(g, 1.2);
}

export function rootle() {
  const g = new THREE.Group();
  const bulb = sphere(0.42, '#f4ecf8', 0, 0.45, 0, 18);
  bulb.scale.set(1, 1.05, 1);
  g.add(bulb);
  const top = sphere(0.4, '#9a4ab8', 0, 0.6, 0, 18);
  top.scale.set(1.02, 0.6, 1.02);
  g.add(top);
  const root = cone(0.08, 0.3, '#e8dcc8', 0, 0.05, 0);
  root.rotation.x = Math.PI;
  g.add(root);
  const leaves = new THREE.Group();
  leaves.position.y = 0.9;
  for (let i = 0; i < 4; i++) {
    const l = sphere(0.14, '#4aa044', 0, 0.2, 0, 10);
    l.scale.set(0.5, 1.6, 0.25);
    const pv = new THREE.Group();
    pv.rotation.set(0.3, (i / 4) * TAU, 0.35);
    pv.add(l);
    leaves.add(pv);
  }
  g.add(leaves);
  const face = faceCap(0.42, (x, W, e) => {
    paintEyes(x, W, { y: 0.5, gap: 0.3, r: 0.05, expr: e === 'happy' ? 'happy' : 'angry' });
    paintMouth(x, W, { y: 0.7, w: 0.12, expr: e === 'happy' ? 'smile' : 'sad' });
  }, { span: 1.4, vspan: 1.0 });
  face.position.y = 0.45;
  face.scale.copy(bulb.scale);
  g.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    leaves.rotation.y = Math.sin(t * 1.2) * 0.3;
    g.rotation.z = Math.sin(t * 1.8) * 0.05;
  };
  return finish(g, 1.3);
}

export function scuttle() {
  const g = new THREE.Group();
  const shell = sphere(0.42, lit('#8a2a3a', { metalness: 0.3, roughness: 0.3 }), 0, 0.45, -0.05, 18);
  shell.scale.set(1, 0.75, 1.2);
  g.add(shell);
  const line = boxm(0.02, 0.2, 0.9, '#3a0a14', 0, 0.72, -0.05);
  g.add(line);
  const head = sphere(0.22, '#2a2a33', 0, 0.42, 0.42, 14);
  g.add(head);
  for (const s of [-1, 1]) {
    head.add(sphere(0.06, glow('#ffe84a', 1.5), s * 0.09, 0.05, 0.18, 8));
    const ant = cyl(0.012, 0.012, 0.35, '#2a2a33', s * 0.1, 0.22, 0.05, 4);
    ant.rotation.set(0.5, 0, -s * 0.4);
    head.add(ant);
  }
  const legs = [];
  for (let i = 0; i < 3; i++) for (const s of [-1, 1]) {
    const leg = capsule(0.03, 0.25, '#2a2a33', s * 0.42, 0.2, -0.3 + i * 0.3);
    leg.rotation.z = s * 0.9;
    g.add(leg);
    legs.push(leg);
  }
  g.userData.animate = (dt, t) => {
    legs.forEach((l, i) => { l.rotation.x = Math.sin(t * 10 + i * 2) * 0.3; });
    g.position.x = Math.sin(t * 1.5) * 0.08;
  };
  return finish(g, 0.9);
}

export function straw() {
  const g = scarecrow();
  g.userData.height = 1.9;
  g.userData.animate = (dt, t) => { g.rotation.z = Math.sin(t * 1.4) * 0.03; };
  g.userData.setExpr = () => {};
  return g;
}

// --- Frostmere -------------------------------------------------------------
export function frostbeak() {
  const g = new THREE.Group();
  const body = sphere(0.45, '#e8f0ff', 0, 0.55, 0, 18);
  body.scale.set(1, 1.1, 0.95);
  g.add(body);
  const beak = cone(0.12, 0.3, lit('#9ad8ff', { emissive: '#4ab8ff', emissiveIntensity: 0.4 }), 0, 0.62, 0.45, 6);
  beak.rotation.x = Math.PI / 2;
  g.add(beak);
  const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 6, 16), toon('#e84a6a'));
  scarf.rotation.x = Math.PI / 2;
  scarf.position.y = 0.38;
  g.add(scarf);
  for (let i = 0; i < 4; i++) {
    const sp = cone(0.05, 0.3, lit('#bfe8ff', { emissive: '#6ad0ff', emissiveIntensity: 0.3 }), -0.15 + i * 0.1, 1.05, -0.05, 5);
    sp.rotation.z = -0.4 + i * 0.25;
    g.add(sp);
  }
  const wings = [];
  for (const s of [-1, 1]) {
    const w = sphere(0.18, '#c8d8f8', s * 0.42, 0.55, -0.05, 10);
    w.scale.set(0.4, 1, 0.9);
    g.add(w);
    wings.push(w);
    g.add(cone(0.05, 0.12, '#ffb03a', s * 0.12, 0.05, 0.1, 4));
  }
  const face = faceCap(0.45, (x, W, e) => {
    paintEyes(x, W, { y: 0.4, gap: 0.28, r: 0.05, expr: e === 'happy' ? 'happy' : e });
  }, { span: 1.2, vspan: 0.8, vOffset: -0.1 });
  face.position.y = 0.55;
  face.scale.copy(body.scale);
  g.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    wings.forEach((w, i) => { w.rotation.z = (i ? -1 : 1) * Math.sin(t * 5) * 0.3; });
    g.rotation.y = Math.sin(t * 0.8) * 0.15;
  };
  return finish(g, 1.3);
}

export function chilly() {
  const g = new THREE.Group();
  const ice = new THREE.MeshStandardMaterial({ color: '#bfe8ff', transparent: true, opacity: 0.75, roughness: 0.1, metalness: 0.1, emissive: '#2a6aa8', emissiveIntensity: 0.3 });
  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), ice);
  cube.position.y = 0.45;
  cube.rotation.y = 0.3;
  g.add(cube);
  const hat = new THREE.Group();
  hat.add(cyl(0.2, 0.2, 0.35, '#1a1a22', 0, 0.2, 0, 14));
  hat.add(cyl(0.32, 0.32, 0.04, '#1a1a22', 0, 0.02, 0, 16));
  hat.add(cyl(0.205, 0.205, 0.07, '#e84a4a', 0, 0.1, 0, 14));
  hat.position.y = 0.8;
  hat.rotation.z = 0.15;
  g.add(hat);
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  paintEyes(x, 128, { y: 0.42, gap: 0.34, r: 0.06 });
  paintMouth(x, 128, { y: 0.66, w: 0.14, expr: 'smile' });
  const tt = new THREE.CanvasTexture(c);
  tt.colorSpace = THREE.SRGBColorSpace;
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), new THREE.MeshBasicMaterial({ map: tt, transparent: true }));
  face.position.set(0, 0, 0.352);
  face.userData.noOutline = true;
  cube.add(face);
  g.userData.animate = (dt, t) => {
    cube.position.y = 0.45 + Math.abs(Math.sin(t * 3)) * 0.05;
    hat.position.y = cube.position.y + 0.35;
    cube.rotation.y = 0.3 + Math.sin(t) * 0.1;
  };
  return finish(g, 1.3, { outline: 0.012 });
}

function dog(color = '#f4f0e8', armor = '#6a7ab0') {
  const g = new THREE.Group();
  const body = sphere(0.3, color, 0, 0.45, 0, 16);
  body.scale.set(0.9, 1, 1.2);
  g.add(body);
  const plate = sphere(0.31, lit(armor, { metalness: 0.5, roughness: 0.4 }), 0, 0.5, 0, 16);
  plate.scale.set(0.95, 0.8, 1.15);
  g.add(plate);
  for (const s of [-1, 1]) for (const f of [-1, 1]) g.add(capsule(0.06, 0.12, color, s * 0.15, 0.12, f * 0.2));
  const neck = new THREE.Group();
  neck.position.set(0, 0.62, 0.2);
  g.add(neck);
  const neckSeg = cyl(0.1, 0.12, 0.3, color, 0, 0.15, 0, 10);
  neck.add(neckSeg);
  const head = new THREE.Group();
  head.position.y = 0.35;
  neck.add(head);
  head.add(sphere(0.22, color, 0, 0, 0, 14));
  const snout = sphere(0.12, color, 0, -0.05, 0.18, 10);
  snout.scale.set(1, 0.8, 1.1);
  head.add(snout);
  head.add(sphere(0.04, '#1a1a1a', 0, -0.01, 0.3, 8));
  for (const s of [-1, 1]) {
    const ear = sphere(0.08, '#d8c8b0', s * 0.2, 0.05, -0.02, 8);
    ear.scale.set(0.5, 1.4, 0.8);
    head.add(ear);
  }
  const helmet = sphere(0.23, lit(armor, { metalness: 0.5, roughness: 0.4 }), 0, 0.08, -0.03, 14);
  helmet.scale.set(1, 0.6, 1);
  head.add(helmet);
  const tail = cone(0.05, 0.25, color, 0, 0.55, -0.38, 6);
  tail.rotation.x = -0.8;
  g.add(tail);
  const face = faceCap(0.22, (x, W, e) => {
    paintEyes(x, W, { y: 0.5, gap: 0.34, r: 0.05, expr: e === 'happy' ? 'happy' : 'neutral' });
  }, { span: 1.4, vspan: 1.0 });
  head.add(face);
  g.userData.parts = { neck, neckSeg, head, tail };
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  return g;
}

export function pupguard() {
  const g = dog('#f4f0e8', '#6a7ab0');
  const { tail, neck } = g.userData.parts;
  const sword = boxm(0.05, 0.5, 0.02, lit('#d8d8e8', { metalness: 0.8, roughness: 0.2 }), 0.35, 0.55, 0.25);
  g.add(sword);
  const shield = cyl(0.2, 0.2, 0.05, lit('#6a7ab0', { metalness: 0.5 }), -0.35, 0.5, 0.2, 14);
  shield.rotation.z = Math.PI / 2;
  g.add(shield);
  g.userData.stretch = 0;
  g.userData.animate = (dt, t) => {
    tail.rotation.y = Math.sin(t * 12) * 0.5;
    const s = g.userData.stretch;
    g.userData.parts.neckSeg.scale.y = 1 + s * 3;
    g.userData.parts.neckSeg.position.y = 0.15 + s * 0.45;
    g.userData.parts.head.position.y = 0.35 + s * 0.9;
    neck.rotation.x = Math.sin(t * 2) * 0.05;
  };
  return finish(g, 1.3);
}

export function snoot() {
  const g = new THREE.Group();
  const cols = [['#e8e0d0', '#3a3a5a'], ['#c8b8a8', '#5a3a5a']];
  const pair = [];
  cols.forEach(([fur, robe], i) => {
    const d = dog(fur, robe);
    d.position.x = i ? 0.55 : -0.55;
    d.rotation.y = i ? -0.2 : 0.2;
    const hood = cone(0.3, 0.45, robe, 0, 1.2, 0.15, 10);
    d.add(hood);
    const axe = new THREE.Group();
    axe.add(cyl(0.02, 0.02, 0.9, '#6a4428', 0, 0, 0, 5));
    const blade = boxm(0.25, 0.2, 0.03, lit('#c8c8d8', { metalness: 0.8, roughness: 0.2 }), 0.1, 0.4, 0);
    axe.add(blade);
    axe.position.set(i ? -0.3 : 0.3, 0.6, 0.25);
    d.add(axe);
    g.add(d);
    pair.push(d);
  });
  g.userData.setExpr = (e) => pair.forEach((d) => d.userData.setExpr(e));
  g.userData.animate = (dt, t) => {
    pair.forEach((d, i) => {
      d.userData.parts.tail.rotation.y = Math.sin(t * 10 + i) * 0.4;
      d.userData.parts.head.rotation.y = Math.sin(t * 0.8 + i * 2) * 0.4;
    });
  };
  return finish(g, 1.6);
}

export function blinky() {
  const g = dog('#d8c0a0', '#4a4a58');
  const { head, tail } = g.userData.parts;
  const shades = boxm(0.34, 0.08, 0.04, glow('#1a1a1a', 1), 0, 0.03, 0.2);
  head.add(shades);
  const pipe = cyl(0.015, 0.015, 0.18, '#6a4428', 0.12, -0.08, 0.26, 5);
  pipe.rotation.z = 1.2;
  head.add(pipe);
  g.userData.animate = (dt, t) => {
    tail.rotation.y = Math.sin(t * 3) * 0.2;
    head.rotation.y = Math.sin(t * 0.6) * 0.6;
  };
  return finish(g, 1.3);
}

// --- Echofall --------------------------------------------------------------
export function flexel() {
  const g = new THREE.Group();
  const col = '#4ad0c0';
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.05, -0.1), new THREE.Vector3(0.15, 0.1, 0), new THREE.Vector3(0, 0.3, 0.05), new THREE.Vector3(0, 0.6, 0)]);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.1, 8), toon(col)));
  const torso = sphere(0.35, col, 0, 0.9, 0, 16);
  torso.scale.set(1.2, 1, 0.8);
  g.add(torso);
  const armL = limb(g, -0.4, 1.05, 0, 0.3, 0.1, col, col);
  const armR = limb(g, 0.4, 1.05, 0, 0.3, 0.1, col, col);
  for (const [a, s] of [[armL, -1], [armR, 1]]) {
    a.rotation.z = s * 2.2;
    const bicep = sphere(0.15, col, 0, -0.12, 0, 10);
    a.add(bicep);
  }
  const head = new THREE.Group();
  head.position.y = 1.35;
  g.add(head);
  head.add(sphere(0.22, col, 0, 0, 0, 14));
  const snout = cyl(0.05, 0.07, 0.3, col, 0, -0.05, 0.22, 8);
  snout.rotation.x = Math.PI / 2;
  head.add(snout);
  const fin = cone(0.12, 0.3, '#ff8a5a', 0, 0.12, -0.18, 4);
  fin.rotation.x = -1;
  head.add(fin);
  const face = faceCap(0.22, (x, W, e) => { paintEyes(x, W, { y: 0.4, gap: 0.44, r: 0.07, white: true, expr: e === 'happy' ? 'happy' : 'neutral' }); }, { span: 1.8, vspan: 1.0 });
  head.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    const f = Math.sin(t * 3);
    armL.rotation.z = -2.2 - f * 0.2;
    armR.rotation.z = 2.2 + f * 0.2;
    torso.scale.x = 1.2 + Math.max(0, f) * 0.1;
  };
  return finish(g, 1.7);
}

export function scrubble() {
  const g = new THREE.Group();
  const tub = cyl(0.55, 0.45, 0.5, '#f4f4fa', 0, 0.35, 0, 20);
  g.add(tub);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.05, 8, 24), toon('#e8e8f0'));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.6;
  g.add(rim);
  const water = cyl(0.52, 0.52, 0.02, lit('#8ad8ff', { emissive: '#4ab8ff', emissiveIntensity: 0.3 }), 0, 0.56, 0, 20);
  g.add(water);
  for (const s of [-1, 1]) for (const f of [-1, 1]) {
    const foot = sphere(0.07, lit('#e8c060', { metalness: 0.7, roughness: 0.3 }), s * 0.35, 0.07, f * 0.3, 8);
    g.add(foot);
  }
  const bubbles = [];
  for (let i = 0; i < 9; i++) {
    const b = sphere(0.08 + (i % 3) * 0.03, new THREE.MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0.7, roughness: 0.1, emissive: '#8ab8ff', emissiveIntensity: 0.2 }), Math.cos(i * 1.7) * 0.35, 0.65, Math.sin(i * 1.7) * 0.3, 10);
    b.userData.noOutline = true;
    g.add(b);
    bubbles.push(b);
  }
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  paintEyes(x, 128, { y: 0.4, gap: 0.3, r: 0.07, white: true });
  paintMouth(x, 128, { y: 0.66, w: 0.12, expr: 'smile' });
  const tt = new THREE.CanvasTexture(c);
  tt.colorSpace = THREE.SRGBColorSpace;
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({ map: tt, transparent: true }));
  face.position.set(0, 0.35, 0.53);
  face.userData.noOutline = true;
  g.add(face);
  const brush = new THREE.Group();
  brush.add(cyl(0.02, 0.02, 0.5, '#8a5a34', 0, 0, 0, 5));
  brush.add(boxm(0.18, 0.08, 0.1, '#ffd84a', 0, 0.28, 0));
  brush.position.set(0.6, 0.8, 0.1);
  brush.rotation.z = -0.5;
  g.add(brush);
  g.userData.animate = (dt, t) => {
    bubbles.forEach((b, i) => { b.position.y = 0.65 + Math.abs(Math.sin(t * 1.5 + i)) * 0.1; });
    brush.rotation.z = -0.5 + Math.sin(t * 6) * 0.3;
  };
  return finish(g, 1.1);
}

export function gloop() {
  const g = new THREE.Group();
  const jelly = new THREE.MeshStandardMaterial({ color: '#6aff9a', transparent: true, opacity: 0.7, roughness: 0.15, emissive: '#2aaa5a', emissiveIntensity: 0.4 });
  const body = sphere(0.45, jelly, 0, 0.4, 0, 20);
  body.scale.set(1.2, 0.85, 1.1);
  body.userData.noOutline = true;
  g.add(body);
  const core = sphere(0.14, glow('#eaffaa', 1.5), 0, 0.45, 0, 10);
  g.add(core);
  const face = faceCap(0.45, (x, W, e) => {
    paintEyes(x, W, { y: 0.45, gap: 0.26, r: 0.05, color: '#1a4a2a', expr: e === 'happy' ? 'happy' : 'neutral' });
    paintMouth(x, W, { y: 0.62, w: 0.08, expr: 'smile', color: '#1a4a2a' });
  }, { span: 1.3, vspan: 1.0, lit: false });
  face.position.y = 0.4;
  face.scale.copy(body.scale);
  g.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    const w = Math.sin(t * 4);
    body.scale.set(1.2 + w * 0.06, 0.85 - w * 0.05, 1.1 + w * 0.06);
    face.scale.copy(body.scale);
    core.position.y = 0.45 + Math.sin(t * 2) * 0.05;
  };
  return finish(g, 0.9);
}

export function melodie() {
  const g = new THREE.Group();
  const shellMat = lit('#ffb8c8', { roughness: 0.4, emissive: '#ff6a9a', emissiveIntensity: 0.1 });
  const shell = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const t = i / 12;
    const s = sphere(0.1 + t * 0.35, shellMat, Math.cos(t * TAU * 1.5) * (0.4 - t * 0.3), 0.2 + t * 0.6, Math.sin(t * TAU * 1.5) * 0.2 - 0.2, 12);
    shell.add(s);
  }
  shell.position.x = 0.25;
  g.add(shell);
  const body = sphere(0.28, '#9ae0e8', -0.1, 0.55, 0.2, 16);
  g.add(body);
  const hair = sphere(0.3, '#4a8ad8', -0.1, 0.7, 0.12, 14);
  hair.scale.set(1.1, 0.8, 1);
  g.add(hair);
  const fins = [];
  for (const s of [-1, 1]) {
    const f = cone(0.1, 0.35, '#6ad8e8', -0.1 + s * 0.3, 0.45, 0.2, 4);
    f.rotation.z = -s * 1.2;
    g.add(f);
    fins.push(f);
  }
  const face = faceCap(0.28, (x, W, e) => {
    paintEyes(x, W, { y: 0.5, gap: 0.3, r: 0.045, expr: e === 'happy' ? 'happy' : 'closed', lash: true });
    x.fillStyle = '#ff8aa8';
    x.globalAlpha = 0.5;
    x.beginPath(); x.ellipse(0.32 * W, 0.62 * W, W * 0.06, W * 0.03, 0, 0, TAU); x.ellipse(0.68 * W, 0.62 * W, W * 0.06, W * 0.03, 0, 0, TAU); x.fill();
    x.globalAlpha = 1;
  }, { span: 1.4, vspan: 1.0 });
  face.position.set(-0.1, 0.55, 0.2);
  g.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    fins.forEach((f, i) => { f.rotation.x = Math.sin(t * 3 + i) * 0.3; });
    g.position.y = Math.sin(t * 1.5) * 0.05;
  };
  return finish(g, 1.2);
}

// --- Emberdeep -------------------------------------------------------------
export function kiln() {
  const g = new THREE.Group();
  const mtn = cone(0.5, 0.8, lit('#6a4a3a', { flat: true }), 0, 0.4, 0, 9);
  g.add(mtn);
  const crater = cyl(0.14, 0.14, 0.04, glow('#ff7a2a', 2.5), 0, 0.79, 0, 12);
  g.add(crater);
  const puffs = [];
  for (let i = 0; i < 4; i++) {
    const p = sphere(0.1, new THREE.MeshStandardMaterial({ color: '#b8b0a8', transparent: true, opacity: 0.8 }), 0, 1 + i * 0.15, 0, 8);
    p.userData.noOutline = true;
    g.add(p);
    puffs.push(p);
  }
  const face = faceCap(0.36, (x, W, e) => {
    paintEyes(x, W, { y: 0.5, gap: 0.3, r: 0.07, white: true, expr: e });
    paintMouth(x, W, { y: 0.7, w: 0.1, expr: e === 'sad' ? 'sad' : 'smile' });
  }, { span: 1.3, vspan: 0.9 });
  face.position.y = 0.35;
  g.add(face);
  const light = new THREE.PointLight('#ff7a2a', 2, 3, 2);
  light.position.y = 1;
  g.add(light);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    puffs.forEach((p, i) => {
      const k = (t * 0.6 + i / 4) % 1;
      p.position.y = 0.85 + k * 0.8;
      p.scale.setScalar(0.6 + k * 1.2);
      p.material.opacity = 0.8 * (1 - k);
    });
  };
  return finish(g, 1.2);
}

export function jetta() {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  g.add(inner);
  const fuselage = capsule(0.22, 0.7, '#e8e8f4', 0, 0.8, 0);
  fuselage.rotation.x = Math.PI / 2;
  inner.add(fuselage);
  const wing = boxm(1.4, 0.05, 0.3, '#5a8ae8', 0, 0.8, -0.05);
  inner.add(wing);
  const tailfin = boxm(0.05, 0.3, 0.2, '#5a8ae8', 0, 1.0, -0.45);
  inner.add(tailfin);
  const prop = new THREE.Group();
  prop.position.set(0, 0.8, 0.6);
  prop.add(boxm(0.5, 0.06, 0.02, '#3a3a44', 0, 0, 0));
  inner.add(prop);
  const face = faceCap(0.22, (x, W, e) => {
    paintEyes(x, W, { y: 0.45, gap: 0.3, r: 0.05, expr: e === 'happy' ? 'happy' : 'angry' });
    x.fillStyle = '#ff6a8a';
    x.globalAlpha = 0.6;
    x.beginPath(); x.ellipse(0.3 * W, 0.6 * W, W * 0.07, W * 0.035, 0, 0, TAU); x.ellipse(0.7 * W, 0.6 * W, W * 0.07, W * 0.035, 0, 0, TAU); x.fill();
    x.globalAlpha = 1;
  }, { span: 1.5, vspan: 1.0 });
  face.position.set(0, 0.8, 0.28);
  face.scale.set(1, 1, 0.3);
  inner.add(face);
  g.userData.setExpr = (e) => face.userData.setExpr(e);
  g.userData.animate = (dt, t) => {
    prop.rotation.z += dt * 30;
    inner.position.y = Math.sin(t * 2) * 0.1;
    inner.rotation.z = Math.sin(t * 1.3) * 0.1;
  };
  return finish(g, 1.3);
}

export function kettle() {
  const g = new THREE.Group();
  const metal = lit('#c8c8d8', { metalness: 0.8, roughness: 0.25 });
  const body = sphere(0.42, metal, 0, 0.45, 0, 20);
  body.scale.set(1, 0.9, 1);
  g.add(body);
  const lid = cyl(0.2, 0.28, 0.12, metal, 0, 0.85, 0, 16);
  g.add(lid);
  g.add(sphere(0.06, '#2a2a33', 0, 0.95, 0, 8));
  const spout = cyl(0.05, 0.1, 0.45, metal, 0.45, 0.55, 0, 10);
  spout.rotation.z = -1;
  g.add(spout);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 8, 16, Math.PI), toon('#2a2a33'));
  handle.position.set(-0.3, 0.6, 0);
  handle.rotation.z = Math.PI / 2;
  g.add(handle);
  const shades = boxm(0.5, 0.1, 0.05, glow('#101010', 1), 0, 0.55, 0.39);
  g.add(shades);
  const steam = [];
  for (let i = 0; i < 3; i++) {
    const s = sphere(0.07, new THREE.MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0.6 }), 0.7, 0.85, 0, 8);
    s.userData.noOutline = true;
    g.add(s);
    steam.push(s);
  }
  g.userData.animate = (dt, t) => {
    g.rotation.z = Math.sin(t * 4) * 0.05;
    g.position.y = Math.abs(Math.sin(t * 4)) * 0.05;
    steam.forEach((s, i) => {
      const k = (t * 0.8 + i / 3) % 1;
      s.position.set(0.7 + k * 0.2, 0.85 + k * 0.5, 0);
      s.scale.setScalar(0.6 + k * 1.5);
      s.material.opacity = 0.6 * (1 - k);
    });
  };
  return finish(g, 1.1);
}

export function guards() {
  const g = new THREE.Group();
  const specs = [['bear', '#8a6a4a'], ['bunny', '#f0e8f0']];
  const pair = [];
  specs.forEach(([kind, fur], i) => {
    const d = new THREE.Group();
    const armor = lit('#4a4a58', { metalness: 0.7, roughness: 0.3 });
    const body = capsule(0.3, 0.5, armor, 0, 0.75, 0);
    d.add(body);
    for (const s of [-1, 1]) d.add(capsule(0.1, 0.3, armor, s * 0.14, 0.25, 0));
    const helm = sphere(0.3, armor, 0, 1.35, 0, 16);
    d.add(helm);
    const visor = boxm(0.4, 0.06, 0.05, glow('#ff5a3a', 1.8), 0, 1.35, 0.28);
    d.add(visor);
    if (kind === 'bunny') for (const s of [-1, 1]) { const ear = capsule(0.06, 0.35, fur, s * 0.12, 1.75, 0); ear.scale.z = 0.5; d.add(ear); }
    else for (const s of [-1, 1]) d.add(sphere(0.09, fur, s * 0.22, 1.58, 0, 8));
    const weapon = new THREE.Group();
    weapon.add(cyl(0.025, 0.025, 1.3, '#6a4428', 0, 0, 0, 5));
    weapon.add(cone(0.08, 0.25, lit('#d8d8e8', { metalness: 0.8 }), 0, 0.75, 0, 4));
    weapon.position.set(i ? -0.4 : 0.4, 0.9, 0.2);
    d.add(weapon);
    d.position.x = i ? 0.6 : -0.6;
    g.add(d);
    pair.push(d);
  });
  g.userData.animate = (dt, t) => { pair.forEach((d, i) => { d.position.y = Math.abs(Math.sin(t * 3 + i * Math.PI)) * 0.03; }); };
  return finish(g, 1.9);
}

// --- Deep lab --------------------------------------------------------------
export function mergeling(color = '#e8e0d8') {
  const g = new THREE.Group();
  const mat = toon(color);
  const blobs = [];
  for (let i = 0; i < 7; i++) {
    const b = sphere(0.2 + (i % 3) * 0.08, mat, Math.cos(i * 2.1) * 0.3, 0.3 + (i % 4) * 0.22, Math.sin(i * 2.1) * 0.2, 12);
    g.add(b);
    blobs.push(b);
  }
  for (let i = 0; i < 5; i++) {
    const e = sphere(0.05 + (i % 2) * 0.03, '#101010', Math.cos(i * 1.3) * 0.25, 0.5 + i * 0.12, 0.3, 8);
    g.add(e);
  }
  for (let i = 0; i < 4; i++) {
    const d = capsule(0.04, 0.2 + i * 0.05, mat, -0.3 + i * 0.2, 0.12, 0.2);
    g.add(d);
  }
  g.userData.animate = (dt, t) => {
    blobs.forEach((b, i) => { b.scale.setScalar(1 + Math.sin(t * 2 + i * 1.7) * 0.08); });
    g.rotation.y = Math.sin(t * 0.5) * 0.2;
  };
  return finish(g, 1.3);
}

export const MONSTER_BUILDERS = {
  croakle, flutterby, ogleye, rootle, scuttle, straw,
  frostbeak, chilly, pupguard, snoot, blinky,
  flexel, scrubble, gloop, melodie,
  kiln, jetta, kettle, guards,
  mergeling,
};
