// The customizable protagonist, built from primitives with a painted face.
import * as THREE from 'three';
import { toon, outlineAll, shadows } from './materials.js';

export const LOOK_OPTIONS = {
  skin: ['#ffe3cc', '#f6cba5', '#e7b28a', '#c98e62', '#a8693f', '#7b4a2c', '#553220'],
  hair: ['Bob', 'Short', 'Long', 'Spiky', 'Bun', 'Braids', 'Ponytail', 'Buzz'],
  hairColor: ['#3b2517', '#6e4220', '#18171d', '#d1a04a', '#b3432b', '#ece6da', '#6a4ab8', '#3f7fbf', '#e06aa0', '#4aa36a'],
  eyes: ['Closed', 'Open', 'Sleepy', 'Bright', 'Determined'],
  shirt: ['#3f7fbf', '#c94a4a', '#4a9a5a', '#e0b23a', '#8a5ac9', '#e07a3a', '#3fb5b5', '#e8e8e8', '#34343f', '#e087b0'],
  stripe: ['#b04ab0', '#e8e8e8', '#e0b23a', '#34343f', '#c94a4a', '#3f7fbf', '#4a9a5a', '#e07a3a', '#3fb5b5', '#e087b0'],
  pants: ['#5a4a3a', '#2f3f6a', '#38383f', '#6a7a4a', '#8a3a4a', '#b0a080'],
  shoes: ['#3a2a1f', '#1f1f24', '#c94a4a', '#e8e8e8', '#3f7fbf'],
  accessory: ['None', 'Scarf', 'Bandage', 'Flower', 'Glasses', 'Bow', 'Beanie'],
};

const TAU = Math.PI * 2;

function shirtTexture(base, stripe) {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, 64, 128);
  g.fillStyle = stripe;
  g.fillRect(0, 50, 64, 12);
  g.fillRect(0, 76, 64, 12);
  // knit texture
  g.globalAlpha = 0.08;
  g.fillStyle = '#000';
  for (let y = 0; y < 128; y += 4) g.fillRect(0, y, 64, 1);
  g.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Face painting. expr: 'neutral' | 'happy' | 'sad' | 'shock' | 'blink' | 'angry'
export function paintFace(canvas, look, expr = 'neutral', soulColor = '#ff2a2a') {
  const g = canvas.getContext('2d');
  const W = canvas.width;
  g.clearRect(0, 0, W, W);
  const style = LOOK_OPTIONS.eyes[look.eyes] || 'Closed';
  const ink = '#2a1a14';
  const ex = [W * 0.36, W * 0.64], ey = W * 0.5;
  g.lineCap = 'round';
  g.lineWidth = W * 0.028;
  g.strokeStyle = ink;
  g.fillStyle = ink;
  const closed = style === 'Closed' || expr === 'blink' || expr === 'happy';
  for (let i = 0; i < 2; i++) {
    const x = ex[i];
    if (closed) {
      g.beginPath();
      if (expr === 'happy') g.arc(x, ey + W * 0.02, W * 0.05, Math.PI * 1.1, Math.PI * 1.9);
      else { g.moveTo(x - W * 0.05, ey); g.lineTo(x + W * 0.05, ey); }
      g.stroke();
    } else if (style === 'Sleepy') {
      g.beginPath();
      g.ellipse(x, ey + W * 0.01, W * 0.04, W * 0.028, 0, 0, Math.PI);
      g.fill();
      g.beginPath();
      g.moveTo(x - W * 0.055, ey);
      g.lineTo(x + W * 0.055, ey);
      g.stroke();
    } else {
      const big = style === 'Bright' ? 0.062 : 0.045;
      g.beginPath();
      g.ellipse(x, ey, W * big * 0.8, W * big, 0, 0, TAU);
      g.fill();
      if (style === 'Bright' || style === 'Determined') {
        g.fillStyle = soulColor;
        g.globalAlpha = 0.55;
        g.beginPath();
        g.ellipse(x, ey + W * 0.012, W * big * 0.5, W * big * 0.55, 0, 0, TAU);
        g.fill();
        g.globalAlpha = 1;
        g.fillStyle = ink;
      }
      g.fillStyle = '#fff';
      g.beginPath();
      g.arc(x - W * 0.012, ey - W * 0.018, W * 0.014, 0, TAU);
      g.fill();
      g.fillStyle = ink;
      if (style === 'Determined' || expr === 'angry') {
        g.beginPath();
        const s = i === 0 ? 1 : -1;
        g.moveTo(x - W * 0.06 * s, ey - W * 0.085);
        g.lineTo(x + W * 0.05 * s, ey - W * 0.06);
        g.stroke();
      }
    }
    if (expr === 'sad') {
      g.beginPath();
      const s = i === 0 ? 1 : -1;
      g.moveTo(x - W * 0.05 * s, ey - W * 0.06);
      g.lineTo(x + W * 0.05 * s, ey - W * 0.085);
      g.stroke();
    }
  }
  // blush
  g.fillStyle = '#ff8a8a';
  g.globalAlpha = 0.3;
  for (const x of ex) {
    g.beginPath();
    g.ellipse(x, ey + W * 0.1, W * 0.05, W * 0.025, 0, 0, TAU);
    g.fill();
  }
  g.globalAlpha = 1;
  // mouth
  g.lineWidth = W * 0.02;
  g.beginPath();
  const my = W * 0.68;
  if (expr === 'happy') g.arc(W / 2, my - W * 0.02, W * 0.04, 0.15 * Math.PI, 0.85 * Math.PI);
  else if (expr === 'sad') g.arc(W / 2, my + W * 0.03, W * 0.035, 1.15 * Math.PI, 1.85 * Math.PI);
  else if (expr === 'shock') { g.ellipse(W / 2, my, W * 0.022, W * 0.03, 0, 0, TAU); }
  else { g.moveTo(W / 2 - W * 0.025, my); g.lineTo(W / 2 + W * 0.025, my); }
  g.stroke();
  if (look.accessory === 2) {
    // bandage on cheek
    g.fillStyle = '#f4ecd8';
    g.save();
    g.translate(W * 0.68, W * 0.63);
    g.rotate(-0.4);
    g.fillRect(-W * 0.06, -W * 0.022, W * 0.12, W * 0.044);
    g.fillStyle = '#d8c8a8';
    g.fillRect(-W * 0.015, -W * 0.022, W * 0.03, W * 0.044);
    g.restore();
  }
}

function capsule(r, len, mat) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 14), mat);
  return m;
}

export function buildHuman(look, opts = {}) {
  const L = LOOK_OPTIONS;
  const root = new THREE.Group();
  root.name = 'human';
  const skin = toon(L.skin[look.skin]);
  const hairMat = toon(L.hairColor[look.hairColor]);
  const shirtMat = toon('#ffffff', { map: shirtTexture(L.shirt[look.shirt], L.stripe[look.stripe]) });
  const sleeveMat = toon(L.shirt[look.shirt]);
  const pantsMat = toon(L.pants[look.pants]);
  const shoeMat = toon(L.shoes[look.shoes]);

  const body = new THREE.Group();
  body.position.y = 0;
  root.add(body);

  const torso = capsule(0.2, 0.2, shirtMat);
  torso.position.y = 0.62;
  torso.scale.set(1, 1, 0.85);
  body.add(torso);

  const hips = capsule(0.17, 0.02, pantsMat);
  hips.position.y = 0.42;
  hips.scale.set(1.05, 1, 0.85);
  body.add(hips);

  const mkLeg = (x) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.4, 0);
    const leg = capsule(0.075, 0.18, pantsMat);
    leg.position.y = -0.16;
    pivot.add(leg);
    const shoe = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 8), shoeMat);
    shoe.scale.set(0.9, 0.55, 1.35);
    shoe.position.set(0, -0.34, 0.035);
    pivot.add(shoe);
    body.add(pivot);
    return pivot;
  };
  const legL = mkLeg(-0.095), legR = mkLeg(0.095);

  const mkArm = (x) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.8, 0);
    const arm = capsule(0.062, 0.2, sleeveMat);
    arm.position.y = -0.14;
    pivot.add(arm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 8), skin);
    hand.position.y = -0.3;
    pivot.add(hand);
    pivot.rotation.z = x < 0 ? -0.12 : 0.12;
    body.add(pivot);
    return pivot;
  };
  const armL = mkArm(-0.255), armR = mkArm(0.255);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.1, 10), skin);
  neck.position.y = 0.86;
  body.add(neck);

  const head = new THREE.Group();
  head.position.y = 1.07;
  body.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.27, 28, 20), skin);
  skull.scale.set(1, 0.96, 0.96);
  head.add(skull);
  // ears
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), skin);
    ear.position.set(s * 0.265, -0.02, 0);
    ear.scale.set(0.5, 1, 0.8);
    head.add(ear);
  }

  // face decal
  const faceCanvas = document.createElement('canvas');
  faceCanvas.width = faceCanvas.height = 256;
  const faceTex = new THREE.CanvasTexture(faceCanvas);
  faceTex.colorSpace = THREE.SRGBColorSpace;
  const face = new THREE.Mesh(
    new THREE.SphereGeometry(0.273, 24, 16, Math.PI / 2 - 0.85, 1.7, Math.PI / 2 - 0.8, 1.6),
    new THREE.MeshToonMaterial({ map: faceTex, transparent: true, depthWrite: false, gradientMap: skin.gradientMap })
  );
  face.scale.copy(skull.scale);
  face.userData.noOutline = true;
  face.renderOrder = 2;
  head.add(face);

  buildHair(head, look, hairMat);
  buildAccessory(head, body, look);

  root.userData = {
    parts: { body, torso, head, armL, armR, legL, legR },
    faceCanvas, faceTex, look: { ...look }, soulColor: opts.soulColor || '#ff2a2a',
    phase: 0, blink: 2 + Math.random() * 3, expr: 'neutral', moving: 0,
  };
  paintFace(faceCanvas, look, 'neutral', root.userData.soulColor);
  faceTex.needsUpdate = true;
  if (opts.outline !== false) outlineAll(root, 0.018);
  shadows(root, true, false);
  return root;
}

function buildHair(head, look, mat) {
  const style = LOOK_OPTIONS.hair[look.hair];
  const R = 0.285;
  // back/side shell that leaves the face open
  const shell = (thetaLen, r = R) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 26, 16, Math.PI / 2 + 0.78, TAU - 1.56, 0, thetaLen), mat);
    m.scale.set(1.02, 0.98, 1.0);
    head.add(m);
    return m;
  };
  const fringe = (len = 0.72, r = R - 0.004) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 10, Math.PI / 2 - 0.95, 1.9, 0, len), mat);
    m.scale.set(1.02, 0.98, 1.0);
    head.add(m);
    return m;
  };
  const top = () => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(R, 24, 12, 0, TAU, 0, 0.9), mat);
    m.scale.set(1.02, 0.98, 1.0);
    head.add(m);
  };
  switch (style) {
    case 'Bob':
      shell(2.05); top(); fringe(0.78);
      break;
    case 'Short':
      shell(1.55); top(); fringe(0.62);
      break;
    case 'Long': {
      shell(2.1); top(); fringe(0.78);
      const back = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.25, 6, 12), mat);
      back.position.set(0, -0.28, -0.12);
      back.scale.set(1.25, 1, 0.55);
      head.add(back);
      break;
    }
    case 'Spiky': {
      shell(1.5); top(); fringe(0.6);
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI - Math.PI / 2 + Math.PI;
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.2, 8), mat);
        const tilt = 0.5 + (i % 2) * 0.35;
        cone.position.set(Math.sin(a) * 0.2, 0.2, Math.cos(a) * 0.2 - 0.02);
        cone.rotation.set(Math.cos(a) * tilt, 0, -Math.sin(a) * tilt);
        head.add(cone);
      }
      const front = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 8), mat);
      front.position.set(0.05, 0.24, 0.12);
      front.rotation.set(0.9, 0, -0.3);
      head.add(front);
      break;
    }
    case 'Bun': {
      shell(1.7); top(); fringe(0.7);
      const bun = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), mat);
      bun.position.set(0, 0.27, -0.1);
      head.add(bun);
      break;
    }
    case 'Braids': {
      shell(1.9); top(); fringe(0.74);
      for (const s of [-1, 1]) {
        for (let k = 0; k < 3; k++) {
          const b = new THREE.Mesh(new THREE.SphereGeometry(0.065 - k * 0.006, 10, 8), mat);
          b.position.set(s * 0.25, -0.22 - k * 0.1, -0.05);
          head.add(b);
        }
        const tie = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), toon('#e04a6a'));
        tie.position.set(s * 0.25, -0.5, -0.05);
        head.add(tie);
      }
      break;
    }
    case 'Ponytail': {
      shell(1.6); top(); fringe(0.7);
      const tail = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.28, 6, 10), mat);
      tail.position.set(0, -0.05, -0.33);
      tail.rotation.x = 0.5;
      head.add(tail);
      break;
    }
    case 'Buzz': {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.276, 24, 12, 0, TAU, 0, 1.25), mat);
      m.scale.set(1.0, 0.97, 0.97);
      head.add(m);
      break;
    }
    default: shell(2.0); top(); fringe(0.75);
  }
}

function buildAccessory(head, body, look) {
  const acc = LOOK_OPTIONS.accessory[look.accessory];
  if (acc === 'Scarf') {
    const m = toon('#d94a4a');
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.06, 8, 20), m);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.86;
    body.add(ring);
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.28, 0.04), m);
    tail.position.set(0.1, 0.72, 0.17);
    tail.rotation.z = 0.15;
    body.add(tail);
  } else if (acc === 'Flower') {
    const petal = toon('#ffd23a');
    const f = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), petal);
      const a = (i / 5) * TAU;
      p.position.set(Math.cos(a) * 0.04, Math.sin(a) * 0.04, 0);
      f.add(p);
    }
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 6), toon('#e07a2a'));
    c.position.z = 0.015;
    f.add(c);
    f.position.set(0.2, 0.17, 0.12);
    f.rotation.y = 0.7;
    head.add(f);
  } else if (acc === 'Glasses') {
    const m = toon('#222222');
    for (const s of [-1, 1]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.052, 0.01, 6, 18), m);
      ring.position.set(s * 0.075, 0.0, 0.265);
      head.add(ring);
    }
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.012, 0.012), m);
    bridge.position.set(0, 0.01, 0.27);
    head.add(bridge);
  } else if (acc === 'Bow') {
    const m = toon('#e04a6a');
    for (const s of [-1, 1]) {
      const c = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 8), m);
      c.position.set(s * 0.07 + 0.1, 0.27, 0.02);
      c.rotation.z = s * Math.PI / 2;
      head.add(c);
    }
    const knot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), m);
    knot.position.set(0.1, 0.27, 0.02);
    head.add(knot);
  } else if (acc === 'Beanie') {
    const m = toon('#3f6fbf');
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.3, 22, 12, 0, TAU, 0, 1.25), m);
    cap.position.y = 0.02;
    head.add(cap);
    const brim = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.035, 8, 24), toon('#e8e8e8'));
    brim.rotation.x = Math.PI / 2;
    brim.position.y = 0.1;
    head.add(brim);
    const pom = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), toon('#e8e8e8'));
    pom.position.y = 0.31;
    head.add(pom);
  }
}

export function setFace(model, expr) {
  const u = model.userData;
  if (!u.faceCanvas || u.expr === expr) return;
  u.expr = expr;
  paintFace(u.faceCanvas, u.look, expr, u.soulColor);
  u.faceTex.needsUpdate = true;
}

// Walk cycle / idle. speed: world units per second.
export function animateHuman(model, dt, speed = 0) {
  const u = model.userData;
  const p = u.parts;
  u.moving += ((speed > 0.1 ? 1 : 0) - u.moving) * Math.min(1, dt * 10);
  u.phase += dt * (speed > 0.1 ? 3.2 + speed * 1.6 : 1.4);
  const w = u.moving;
  const s = Math.sin(u.phase * 2);
  p.legL.rotation.x = s * 0.7 * w;
  p.legR.rotation.x = -s * 0.7 * w;
  p.armL.rotation.x = -s * 0.6 * w;
  p.armR.rotation.x = s * 0.6 * w;
  p.body.position.y = Math.abs(Math.cos(u.phase * 2)) * 0.05 * w;
  const breathe = Math.sin(u.phase) * 0.012 * (1 - w);
  p.torso.scale.y = 1 + breathe;
  p.head.position.y = 1.07 + breathe * 0.6;
  p.head.rotation.z = Math.sin(u.phase * 0.5) * 0.03 * (1 - w);
  // blinking
  u.blink -= dt;
  if (u.blink <= 0 && u.expr === 'neutral') {
    paintFace(u.faceCanvas, u.look, 'blink', u.soulColor);
    u.faceTex.needsUpdate = true;
    u.blinkUntil = 0.12;
    u.blink = 2.5 + Math.random() * 3;
  }
  if (u.blinkUntil !== undefined) {
    u.blinkUntil -= dt;
    if (u.blinkUntil <= 0) {
      u.blinkUntil = undefined;
      paintFace(u.faceCanvas, u.look, u.expr, u.soulColor);
      u.faceTex.needsUpdate = true;
    }
  }
}
