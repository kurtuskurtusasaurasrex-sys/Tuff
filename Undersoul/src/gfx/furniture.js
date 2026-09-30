// Interior and puzzle props.
import * as THREE from 'three';
import { toon, lit, glow, outlineAll, shadows } from './materials.js';
import { tex } from './textures.js';

const TAU = Math.PI * 2;

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

export function table(w = 1.6, d = 0.9, color = '#8a5a34') {
  const g = new THREE.Group();
  const m = toon(color);
  g.add(box(w, 0.08, d, m, 0, 0.75, 0));
  for (const x of [-w / 2 + 0.1, w / 2 - 0.1]) for (const z of [-d / 2 + 0.1, d / 2 - 0.1]) g.add(box(0.08, 0.75, 0.08, m, x, 0.375, z));
  const cloth = box(w * 0.7, 0.02, d + 0.02, toon('#e8e0f0'), 0, 0.8, 0);
  g.add(cloth);
  outlineAll(g, 0.015);
  return shadows(g, true, true);
}

export function chair(color = '#8a5a34') {
  const g = new THREE.Group();
  const m = toon(color);
  g.add(box(0.5, 0.06, 0.5, m, 0, 0.45, 0));
  g.add(box(0.5, 0.55, 0.06, m, 0, 0.75, -0.22));
  for (const x of [-0.2, 0.2]) for (const z of [-0.2, 0.2]) g.add(box(0.05, 0.45, 0.05, m, x, 0.22, z));
  outlineAll(g, 0.015);
  return shadows(g, true, true);
}

export function armchair(color = '#8a3a4a') {
  const g = new THREE.Group();
  const m = toon(color);
  g.add(box(1, 0.45, 0.9, m, 0, 0.25, 0));
  g.add(box(1, 0.9, 0.2, m, 0, 0.6, -0.38));
  for (const x of [-0.45, 0.45]) g.add(box(0.15, 0.65, 0.9, m, x, 0.35, 0));
  outlineAll(g, 0.02);
  return shadows(g, true, true);
}

export function bed(color = '#c86a8a') {
  const g = new THREE.Group();
  const wood = toon('#6a4428');
  g.add(box(1.2, 0.35, 2.2, wood, 0, 0.2, 0));
  g.add(box(1.1, 0.2, 2.0, toon('#f4f0ff'), 0, 0.45, 0.05));
  g.add(box(1.14, 0.22, 1.3, toon(color), 0, 0.5, 0.4));
  g.add(box(0.6, 0.15, 0.35, toon('#ffffff'), 0, 0.6, -0.7));
  g.add(box(1.2, 0.8, 0.1, wood, 0, 0.5, -1.1));
  outlineAll(g, 0.02);
  return shadows(g, true, true);
}

export function fireplace() {
  const g = new THREE.Group();
  const stone = lit('#8a7a6a', { map: tex.bricks('#8a7a6a', '#4a3a2a') });
  g.add(box(2, 1.6, 0.6, stone, 0, 0.8, 0));
  g.add(box(2.3, 0.15, 0.8, toon('#6a4428'), 0, 1.65, 0.05));
  g.add(box(1.1, 0.9, 0.2, new THREE.MeshBasicMaterial({ color: '#0a0503' }), 0, 0.55, 0.22));
  const fire = new THREE.Group();
  const flames = [];
  for (let i = 0; i < 5; i++) {
    const f = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.45, 6), glow(i % 2 ? '#ff8a2a' : '#ffd04a', 2.5));
    f.position.set(-0.3 + i * 0.15, 0.35, 0.35);
    fire.add(f);
    flames.push(f);
  }
  g.add(fire);
  const light = new THREE.PointLight('#ff9a4a', 6, 7, 2);
  light.position.set(0, 0.6, 0.8);
  g.add(light);
  g.userData.update = (dt, t) => {
    flames.forEach((f, i) => { f.scale.y = 1 + Math.sin(t * 13 + i * 2) * 0.25; });
    light.intensity = 6 + Math.sin(t * 17) * 0.8 + Math.sin(t * 7) * 0.5;
  };
  return shadows(g, true, true);
}

export function bookshelf(color = '#6a4428') {
  const g = new THREE.Group();
  const m = toon(color);
  g.add(box(1.6, 2.2, 0.45, m, 0, 1.1, 0));
  const cols = ['#c84a4a', '#4a7ac8', '#4ac87a', '#c8a44a', '#8a4ac8', '#e8e8e8'];
  for (let s = 0; s < 4; s++) {
    let x = -0.7;
    while (x < 0.65) {
      const w = 0.06 + Math.random() * 0.08;
      const h = 0.3 + Math.random() * 0.15;
      g.add(box(w, h, 0.3, toon(cols[Math.floor(Math.random() * cols.length)]), x + w / 2, 0.2 + s * 0.52 + h / 2, 0.1));
      x += w + 0.01;
    }
  }
  outlineAll(g, 0.015);
  return shadows(g, true, true);
}

export function rug(w = 2.6, d = 1.8, color = '#8f2f3a') {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), lit('#ffffff', { map: tex.carpet(color, '#e0b14a') }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.012;
  m.receiveShadow = true;
  const g = new THREE.Group();
  g.add(m);
  return g;
}

export function crate(s = 0.8, color = '#9a6a3a') {
  const g = new THREE.Group();
  g.add(box(s, s, s, lit(color, { map: tex.planks(color) }), 0, s / 2, 0));
  outlineAll(g, 0.015);
  return shadows(g, true, true);
}

// Floor switch / lever
export function lever(on = false) {
  const g = new THREE.Group();
  g.add(box(0.5, 0.3, 0.3, toon('#5a5a66'), 0, 0.15, 0));
  const arm = new THREE.Group();
  arm.position.y = 0.3;
  const stick = box(0.06, 0.45, 0.06, toon('#9a9aa6'), 0, 0.22, 0);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), toon('#e84a4a'));
  knob.position.y = 0.45;
  arm.add(stick, knob);
  g.add(arm);
  g.userData.set = (v) => { arm.rotation.z = v ? -0.7 : 0.7; knob.material = toon(v ? '#4ae84a' : '#e84a4a'); };
  g.userData.set(on);
  outlineAll(g, 0.015);
  return shadows(g, true, false);
}

// Wall switch (plate on a wall, press Z)
export function wallSwitch(color = '#ffd84a') {
  const g = new THREE.Group();
  g.add(box(0.4, 0.5, 0.08, toon('#6a5a7a'), 0, 1.1, 0));
  const b = box(0.2, 0.25, 0.08, lit(color, { emissive: color, emissiveIntensity: 0.6 }), 0, 1.1, 0.06);
  g.add(b);
  g.userData.set = (v) => { b.position.z = v ? 0.02 : 0.06; b.material = lit(v ? '#6aff6a' : color, { emissive: v ? '#6aff6a' : color, emissiveIntensity: 0.6 }); };
  return g;
}

// Retractable spikes filling a rectangle. set(true) = raised (solid).
export function spikes(w = 2, d = 1, color = '#c8c8d8') {
  const g = new THREE.Group();
  const base = box(w, 0.04, d, toon('#3a3a44'), 0, 0.02, 0);
  g.add(base);
  const geo = new THREE.ConeGeometry(0.08, 0.35, 4);
  const nx = Math.max(1, Math.floor(w / 0.3)), nz = Math.max(1, Math.floor(d / 0.3));
  const im = new THREE.InstancedMesh(geo, lit(color, { metalness: 0.6, roughness: 0.3 }), nx * nz);
  const m = new THREE.Matrix4();
  let k = 0;
  for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) {
    m.makeTranslation(-w / 2 + (i + 0.5) * (w / nx), 0.17, -d / 2 + (j + 0.5) * (d / nz));
    im.setMatrixAt(k++, m);
  }
  im.castShadow = true;
  const holder = new THREE.Group();
  holder.add(im);
  g.add(holder);
  g.userData.target = 1;
  g.userData.cur = 1;
  g.userData.set = (up) => { g.userData.target = up ? 1 : 0; };
  g.userData.update = (dt) => {
    const u = g.userData;
    u.cur += (u.target - u.cur) * Math.min(1, dt * 10);
    holder.position.y = (u.cur - 1) * 0.36;
  };
  return g;
}

// Pressure plate / X-O tile
export function tile(w = 1, color = '#8a5aaa', mark = '') {
  const g = new THREE.Group();
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const draw = (col, mk) => {
    const x = c.getContext('2d');
    x.fillStyle = col;
    x.fillRect(0, 0, 64, 64);
    x.strokeStyle = 'rgba(0,0,0,0.4)';
    x.lineWidth = 4;
    x.strokeRect(2, 2, 60, 60);
    x.lineWidth = 7;
    x.strokeStyle = '#fff';
    if (mk === 'X') { x.beginPath(); x.moveTo(16, 16); x.lineTo(48, 48); x.moveTo(48, 16); x.lineTo(16, 48); x.stroke(); }
    if (mk === 'O') { x.beginPath(); x.arc(32, 32, 16, 0, TAU); x.stroke(); }
    t.needsUpdate = true;
  };
  draw(color, mark);
  const m = new THREE.Mesh(new THREE.BoxGeometry(w * 0.94, 0.05, w * 0.94), lit('#ffffff', { map: t, emissive: '#ffffff', emissiveIntensity: 0.15, emissiveMap: t }));
  m.position.y = 0.025;
  m.receiveShadow = true;
  g.add(m);
  g.userData.draw = draw;
  return g;
}

export function doorFrame(w = 1.6, h = 2.6, color = '#5a3a6a') {
  const g = new THREE.Group();
  const m = toon(color);
  g.add(box(0.3, h, 0.4, m, -w / 2 - 0.15, h / 2, 0));
  g.add(box(0.3, h, 0.4, m, w / 2 + 0.15, h / 2, 0));
  g.add(box(w + 0.6, 0.4, 0.45, m, 0, h + 0.2, 0));
  const dark = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: '#000' }));
  dark.position.set(0, h / 2, -0.15);
  g.add(dark);
  return shadows(g, true, true);
}

export function scarecrow() {
  const g = new THREE.Group();
  const wood = toon('#6a4428');
  g.add(box(0.1, 1.2, 0.1, wood, 0, 0.6, 0));
  g.add(box(1.1, 0.08, 0.08, wood, 0, 1.0, 0));
  const sack = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), toon('#c8a870'));
  sack.scale.set(1, 1.2, 0.9);
  sack.position.y = 0.95;
  g.add(sack);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), toon('#d8b880'));
  head.position.y = 1.45;
  g.add(head);
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 8), toon('#222'));
    eye.rotation.x = Math.PI / 2;
    eye.position.set(s * 0.08, 1.48, 0.2);
    g.add(eye);
  }
  const hat = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.3, 10), toon('#c8a040'));
  hat.position.y = 1.7;
  g.add(hat);
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 16), toon('#c8a040'));
  brim.position.y = 1.58;
  g.add(brim);
  outlineAll(g, 0.02);
  return shadows(g, true, false);
}

export function sentryStation(color = '#8a5a34', sign = '#4a8ac8') {
  const g = new THREE.Group();
  const m = toon(color);
  g.add(box(2, 1, 0.9, m, 0, 0.5, 0));
  g.add(box(0.12, 2.4, 0.12, m, -0.9, 1.2, 0.35));
  g.add(box(0.12, 2.4, 0.12, m, 0.9, 1.2, 0.35));
  g.add(box(2.3, 0.35, 1.2, toon(sign), 0, 2.45, 0.2));
  g.add(box(2.2, 0.08, 1.0, toon('#f4f8ff'), 0, 2.66, 0.2));
  outlineAll(g, 0.02);
  return shadows(g, true, true);
}

export function giftTree() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1, 8), toon('#5a3a22'));
  trunk.position.y = 0.5;
  g.add(trunk);
  const cols = ['#e84a4a', '#4ae84a', '#ffd84a', '#4a8aff', '#ff8aff'];
  const lights = [];
  for (let i = 0; i < 4; i++) {
    const r = 1.5 - i * 0.32;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(r, 1.4, 10), toon('#1f5a3a'));
    cone.position.y = 1.2 + i * 0.75;
    g.add(cone);
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * TAU + i;
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), glow(cols[(k + i) % cols.length], 2));
      b.position.set(Math.cos(a) * r * 0.7, cone.position.y - 0.3, Math.sin(a) * r * 0.7);
      g.add(b);
      lights.push(b);
    }
  }
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), glow('#ffe45a', 3));
  star.position.y = 4.1;
  g.add(star);
  for (let k = 0; k < 5; k++) {
    const gift = box(0.4, 0.3, 0.4, toon(cols[k]), Math.cos(k * 1.3) * 1.3, 0.15, Math.sin(k * 1.3) * 1.3 + 0.3);
    g.add(gift);
  }
  g.userData.update = (dt, t) => { lights.forEach((b, i) => { b.visible = Math.sin(t * 3 + i) > -0.3; }); star.rotation.y = t; };
  return shadows(g, true, false);
}

export function tv() {
  const g = new THREE.Group();
  g.add(box(1.2, 0.8, 0.5, toon('#2a2a33'), 0, 0.9, 0));
  const screen = box(1.0, 0.62, 0.02, glow('#6ad8ff', 1.2), 0, 0.9, 0.26);
  g.add(screen);
  g.add(box(0.8, 0.5, 0.5, toon('#4a3a2a'), 0, 0.25, 0));
  g.userData.update = (dt, t) => { screen.material.color.setHSL((t * 0.2) % 1, 0.6, 0.55).multiplyScalar(1.3); };
  return shadows(g, true, true);
}

export function counter(w = 3, color = '#8a5a34') {
  const g = new THREE.Group();
  g.add(box(w, 1, 0.8, toon(color), 0, 0.5, 0));
  g.add(box(w + 0.1, 0.08, 0.9, toon('#c8a870'), 0, 1.04, 0));
  outlineAll(g, 0.015);
  return shadows(g, true, true);
}

export function coffin(color = '#6a4428', trim = '#ffffff') {
  const g = new THREE.Group();
  g.add(box(0.9, 0.5, 2, toon(color), 0, 0.25, 0));
  g.add(box(0.95, 0.08, 2.05, toon('#4a2e18'), 0, 0.52, 0));
  const heart = new THREE.Mesh(new THREE.CircleGeometry(0.12, 12), glow(trim, 1.2));
  heart.rotation.x = -Math.PI / 2;
  heart.position.set(0, 0.57, -0.4);
  g.add(heart);
  outlineAll(g, 0.015);
  return shadows(g, true, true);
}

export function throne(color = '#e8c060') {
  const g = new THREE.Group();
  const m = toon(color);
  g.add(box(1.6, 0.6, 1.2, m, 0, 0.3, 0));
  g.add(box(1.6, 2.4, 0.3, m, 0, 1.2, -0.5));
  g.add(box(0.25, 1, 1.2, m, -0.75, 0.6, 0));
  g.add(box(0.25, 1, 1.2, m, 0.75, 0.6, 0));
  g.add(box(1.3, 0.2, 1, toon('#a83a4a'), 0, 0.62, 0.05));
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.25, 0), glow('#fff4a0', 2));
  star.position.set(0, 2.6, -0.5);
  g.add(star);
  outlineAll(g, 0.02);
  return shadows(g, true, true);
}

export function jar(color = '#ff2a2a', empty = false) {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.8, 16, 1, true), new THREE.MeshStandardMaterial({ color: '#c8e8ff', transparent: true, opacity: 0.3, roughness: 0.1, side: THREE.DoubleSide }));
  glass.position.y = 0.9;
  g.add(glass);
  g.add(box(0.62, 0.1, 0.62, toon('#6a6a74'), 0, 1.35, 0));
  g.add(box(0.62, 0.5, 0.62, toon('#4a4a54'), 0, 0.25, 0));
  if (!empty) {
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), glow(color, 2.2));
    h.position.y = 0.9;
    g.add(h);
    const l = new THREE.PointLight(color, 2, 3, 2);
    l.position.y = 0.9;
    g.add(l);
    g.userData.update = (dt, t) => { h.position.y = 0.9 + Math.sin(t * 2 + g.position.x) * 0.06; };
  }
  return g;
}

export function statue(color = '#9a9aa4') {
  const g = new THREE.Group();
  const m = lit(color, { roughness: 0.8 });
  g.add(box(1, 0.5, 1, m, 0, 0.25, 0));
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.8, 6, 12), m);
  body.position.y = 1.2;
  g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), m);
  head.position.y = 2.0;
  g.add(head);
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.35, 6), m);
    ear.position.set(s * 0.22, 2.2, 0);
    ear.rotation.z = -s * 0.8;
    g.add(ear);
  }
  return shadows(g, true, true);
}

export function pipe(len = 4, r = 0.25, color = '#7a6a60') {
  const g = new THREE.Group();
  const m = lit(color, { metalness: 0.6, roughness: 0.4 });
  const p = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 12), m);
  p.rotation.z = Math.PI / 2;
  p.position.y = r;
  g.add(p);
  for (const x of [-len / 2 + 0.3, len / 2 - 0.3]) {
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.2, r * 1.2, 0.15, 12), m);
    ring.rotation.z = Math.PI / 2;
    ring.position.set(x, r, 0);
    g.add(ring);
  }
  return shadows(g, true, true);
}

// Steam vent: launches the player along a path.
export function vent() {
  const g = new THREE.Group();
  g.add(box(1, 0.1, 1, toon('#4a4a52'), 0, 0.05, 0));
  const grate = new THREE.Mesh(new THREE.CircleGeometry(0.38, 16), glow('#ff7a3a', 1.2));
  grate.rotation.x = -Math.PI / 2;
  grate.position.y = 0.11;
  g.add(grate);
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.3, 3), glow('#ffd84a', 2));
  arrow.rotation.x = Math.PI / 2;
  arrow.position.y = 0.14;
  g.add(arrow);
  g.userData.arrow = arrow;
  g.userData.update = (dt, t) => { grate.material.color.setScalar(1 + Math.sin(t * 6) * 0.3).multiply(new THREE.Color('#ff7a3a')); };
  return g;
}

export function laserGate(len = 3, color = '#46e6ff') {
  const g = new THREE.Group();
  const post = toon('#4a4a52');
  g.add(box(0.2, 1.2, 0.2, post, -len / 2, 0.6, 0));
  g.add(box(0.2, 1.2, 0.2, post, len / 2, 0.6, 0));
  const beams = [];
  for (let i = 0; i < 3; i++) {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, len, 6), glow(color, 3));
    b.rotation.z = Math.PI / 2;
    b.position.y = 0.3 + i * 0.35;
    g.add(b);
    beams.push(b);
  }
  g.userData.beams = beams;
  g.userData.update = (dt, t) => { beams.forEach((b, i) => { b.scale.x = 1 + Math.sin(t * 20 + i) * 0.3; }); };
  return g;
}
