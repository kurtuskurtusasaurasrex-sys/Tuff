// Opening storybook, told through small 3D dioramas under a sepia grade.
import * as THREE from 'three';
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { createScene, disposeScene, ground, heartMesh, skyDome } from '../gfx/scene.js';
import { toon, lit, glow, outlineAll, shadows } from '../gfx/materials.js';
import { pineTree, rock, lightShaft } from '../gfx/props.js';
import { ParticleField } from '../gfx/particles.js';
import { Typer } from '../ui/text.js';
import { FONTS } from '../ui/fonts.js';
import { music } from '../audio/sequencer.js';
import { SOULS, SOUL_ORDER } from '../data/souls.js';
import { ease } from '../core/util.js';

const PANELS = [
  { text: 'Long ago, two peoples shared the surface of the world: HUMANS and MONSTERS.', at: 0 },
  { text: 'One day, a war broke out between them.', at: 1 },
  { text: 'Seven human mages each gave up a piece of their heart...', at: 2 },
  { text: '...and wove a BARRIER that sealed the monsters beneath the mountain.', at: 3 },
  { text: 'The seven lights scattered into the dark. Legends say they are still looking for someone to belong to.', at: 4 },
  { text: 'MT. HALLOW\n20XX', at: 5, center: true },
  { text: 'Those who climb the mountain, it is said, never return.', at: 6 },
  { text: '', at: 7 },
];

const SPACING = 120;
const SKIES = [['#c8b890', '#fff0d0'], ['#6a2a1a', '#e07a3a'], null, ['#5a4a6a', '#e0a070'], null, ['#3a2a4a', '#e08a4a'], ['#1a1830', '#6a5a7a'], null];

function figure(color, h = 0.9, monster = false) {
  const g = new THREE.Group();
  if (monster) {
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.35 * h, 14, 10), toon(color));
    body.scale.set(1, 1.1, 1);
    body.position.y = 0.38 * h;
    g.add(body);
    for (const s of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.1 * h, 0.3 * h, 6), toon(color));
      ear.position.set(s * 0.18 * h, 0.78 * h, 0);
      ear.rotation.z = -s * 0.3;
      g.add(ear);
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05 * h, 6, 5), glow('#fff6d0', 1.6));
      eye.position.set(s * 0.12 * h, 0.5 * h, 0.3 * h);
      g.add(eye);
    }
  } else {
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.16 * h, 0.4 * h, 4, 10), toon(color));
    body.position.y = 0.4 * h;
    g.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.17 * h, 12, 10), toon('#e8c8a0'));
    head.position.y = 0.88 * h;
    g.add(head);
  }
  outlineAll(g, 0.02);
  shadows(g, true, false);
  return g;
}

function robed(color) {
  const g = new THREE.Group();
  const robe = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.3, 10), toon('#3a2a22'));
  robe.position.y = 0.65;
  g.add(robe);
  const hood = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), toon('#3a2a22'));
  hood.position.y = 1.35;
  g.add(hood);
  const orb = heartMesh(color, 2.6);
  orb.scale.setScalar(0.28);
  orb.position.set(0, 1.1, 0.42);
  g.add(orb);
  g.userData.orb = orb;
  outlineAll(g, 0.02);
  return g;
}

function mountain(h = 8, r = 8, color = '#5a4a3a') {
  const geo = new THREE.ConeGeometry(r, h, 9, 4);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y < h / 2 - 0.1) {
      pos.setX(i, pos.getX(i) * (0.85 + Math.random() * 0.3));
      pos.setZ(i, pos.getZ(i) * (0.85 + Math.random() * 0.3));
    }
  }
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, lit(color, { flat: true }));
  m.position.y = h / 2;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function buildPanels(scene) {
  const P = [];
  const grass = lit('#6a8a4a', { roughness: 1 });
  for (let i = 0; i < 8; i++) {
    const root = new THREE.Group();
    root.position.x = i * SPACING;
    scene.add(root);
    P.push(root);
  }
  const skies = SKIES;
  const _unused = [['#c8b890', '#fff0d0'], ['#6a2a1a', '#e07a3a'], null, ['#5a4a6a', '#e0a070'], null, ['#3a2a4a', '#e08a4a'], ['#1a1830', '#6a5a7a'], null];
  skies.forEach((c, i) => { if (c) P[i].add(skyDome(c[0], c[1], 55)); });
  // 0: humans & monsters under a tree
  {
    const r = P[0];
    r.add(ground([120, 120], grass));
    const hill = new THREE.Mesh(new THREE.SphereGeometry(6, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), grass);
    hill.scale.y = 0.25;
    hill.position.set(0, -1.1, -3.5);
    hill.receiveShadow = true;
    r.add(hill);
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 2.4, 8), toon('#5a3a22'));
    trunk.position.y = 1.2;
    tree.add(trunk);
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 1), toon('#4a7a3a'));
    crown.position.y = 3;
    tree.add(crown);
    tree.position.set(0, 0.2, -3.2);
    shadows(tree, true, false);
    r.add(tree);
    const cols = ['#7a5a9a', '#9a6a4a', '#5a7aa0', '#a0a05a'];
    for (let k = 0; k < 8; k++) {
      const f = figure(cols[k % 4], 1.3, k % 2 === 1);
      const a = -1.2 + k * 0.34;
      f.position.set(Math.sin(a) * 3.4, 0, Math.cos(a) * 1.4 + 0.4);
      f.rotation.y = a * 0.5;
      r.add(f);
    }
    const sunDisc = new THREE.Mesh(new THREE.CircleGeometry(1.4, 32), glow('#ffe8a0', 1.5));
    sunDisc.position.set(5, 7, -12);
    r.add(sunDisc);
  }
  // 1: war
  {
    const r = P[1];
    r.add(ground([120, 120], lit('#6a5a3a')));
    for (let k = 0; k < 6; k++) {
      const h = figure('#8a3a2a', 1);
      h.position.set(-3 + (k % 3) * 0.8, 0, -1 + Math.floor(k / 3) * 1.1);
      h.rotation.y = Math.PI / 2;
      const spear = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.8, 5), toon('#3a2a1a'));
      spear.position.set(0.25, 0.9, 0);
      spear.rotation.z = -0.5;
      h.add(spear);
      r.add(h);
      const m = figure('#5a4a7a', 1.1, true);
      m.position.set(3 - (k % 3) * 0.8, 0, -1 + Math.floor(k / 3) * 1.1);
      m.rotation.y = -Math.PI / 2;
      r.add(m);
    }
    const smoke = new ParticleField('ash', { min: new THREE.Vector3(-6, 0, -5), max: new THREE.Vector3(6, 7, 3) }, 140, { color: '#6a5a50' });
    smoke.points.position.x = 0;
    r.add(smoke.points);
    r.userData.fx = smoke;
  }
  // 2: seven mages in a ring
  {
    const r = P[2];
    r.add(ground([30, 30], lit('#3a3a44')));
    const orbs = [];
    SOUL_ORDER.forEach((id, k) => {
      const m = robed(SOULS[id].color);
      const a = (k / 7) * Math.PI * 2;
      m.position.set(Math.sin(a) * 2.4, 0, Math.cos(a) * 2.4);
      m.rotation.y = a + Math.PI;
      r.add(m);
      orbs.push(m.userData.orb);
      const l = new THREE.PointLight(SOULS[id].color, 3, 4, 2);
      l.position.copy(m.position).setY(1.2);
      r.add(l);
    });
    const beam = lightShaft(9, 0.5, '#ffffff', 0.45);
    r.add(beam);
    r.userData.orbs = orbs;
  }
  // 3: barrier over the mountain
  {
    const r = P[3];
    r.add(ground([120, 120], lit('#4a5a3a')));
    r.add(mountain(9, 8));
    const dome = new THREE.Mesh(new THREE.SphereGeometry(9.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffffff'), transparent: true, opacity: 0.12, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    r.add(dome);
    r.userData.dome = dome;
    for (let k = 0; k < 5; k++) {
      const m = figure('#4a3a5a', 0.8, true);
      m.position.set(-1 + k * 0.5, 0, 8.5 - k * 0.4);
      m.rotation.y = Math.PI;
      r.add(m);
    }
  }
  // 4: seven lights drifting down into the dark
  {
    const r = P[4];
    const lights = [];
    SOUL_ORDER.forEach((id, k) => {
      const h = heartMesh(SOULS[id].color, 2.6);
      h.scale.setScalar(0.35);
      h.position.set((k - 3) * 1.1, 4 + Math.sin(k) * 0.6, 0);
      r.add(h);
      lights.push(h);
    });
    for (let k = 0; k < 10; k++) {
      const rk = rock(1 + (k % 3), '#2a2230');
      rk.position.set((k - 5) * 1.6, -2 + (k % 2), -3 - (k % 3));
      r.add(rk);
    }
    r.userData.lights = lights;
  }
  // 5: mountain at dusk
  {
    const r = P[5];
    r.add(ground([120, 120], lit('#3a4a2a')));
    const mt = mountain(14, 12, '#4a3e36');
    mt.position.z = -10;
    r.add(mt);
    for (let k = 0; k < 14; k++) {
      const t = pineTree(2 + (k % 3), false);
      t.position.set(-10 + k * 1.6, 0, -2 + (k % 3) * 1.5);
      r.add(t);
    }
  }
  // 6: the child at the summit near the hole
  {
    const r = P[6];
    const top = new THREE.Mesh(new THREE.CylinderGeometry(5, 7, 2, 9), lit('#4a3e36', { flat: true }));
    top.position.y = -1;
    top.receiveShadow = true;
    r.add(top);
    const hole = new THREE.Mesh(new THREE.CircleGeometry(1.3, 24), new THREE.MeshBasicMaterial({ color: '#000' }));
    hole.rotation.x = -Math.PI / 2;
    hole.position.set(0.5, 0.01, 0);
    r.add(hole);
    const kid = figure('#3f7fbf', 1);
    kid.position.set(-1.3, 0, 0.3);
    kid.rotation.y = Math.PI / 2;
    r.add(kid);
    r.userData.kid = kid;
    const vines = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.05, 5, 20, 2), toon('#3a5a2a'));
    vines.rotation.x = -Math.PI / 2;
    vines.position.set(-0.6, 0.05, -0.1);
    r.add(vines);
  }
  // 7: falling
  {
    const r = P[7];
    const shaft = lightShaft(20, 1.3, '#fff0d0', 0.3);
    shaft.position.y = -18;
    r.add(shaft);
    const kid = figure('#3f7fbf', 1);
    kid.position.y = 0;
    r.add(kid);
    r.userData.kid = kid;
  }
  return P;
}

// Camera framing per panel: [position, lookAt]
const SHOTS = [
  [[0, 3.2, 9], [0, 1.2, -1], [1.5, 3, 8], [0, 1.2, -1]],
  [[0, 2.6, 7], [0, 0.9, 0], [0, 2.2, 5.5], [0, 0.9, 0]],
  [[0, 6, 6], [0, 1, 0], [0, 4.5, 5], [0, 1.2, 0]],
  [[0, 8, 26], [0, 4, 0], [0, 6, 21], [0, 4, 0]],
  [[0, 4, 9], [0, 3, 0], [0, 2.5, 8], [0, 1, 0]],
  [[0, 3, 12], [0, 6, -10], [0, 2.5, 10], [0, 7, -10]],
  [[3, 2, 5], [0, 0.6, 0], [2.4, 1.6, 4], [0, 0.6, 0]],
  [[0.01, 6, 0], [0, -10, 0], [0.01, 3, 0], [0, -10, 0]],
];

export class IntroMode {
  id = 'intro';
  constructor() {
    const { scene, cam } = createScene({ bg: '#1a1208', fogDensity: 0.02, hemi: 0.9, sky: '#e8d0a0', ground: '#3a2a1a' });
    this.scene = scene;
    this.cam = cam;
    const d = new THREE.DirectionalLight('#ffe8c0', 2.2);
    d.position.set(4, 10, 6);
    d.castShadow = true;
    d.shadow.mapSize.set(2048, 2048);
    d.shadow.camera.left = -14; d.shadow.camera.right = 14; d.shadow.camera.top = 14; d.shadow.camera.bottom = -14;
    scene.add(d, d.target);
    this.sunLight = d;
    this.panels = buildPanels(scene);
    this.idx = 0;
    this.pt = 0;
    this.skipHeld = 0;
    this.typer = null;
    this.textAlpha = 0;
  }

  run() { return new Promise((resolve) => { this.resolve = resolve; game.setMode(this); }); }

  enter() {
    game.engine.setView(this.scene, this.cam);
    const e = game.engine.post;
    e.uSaturation.value = 0.35;
    e.uTint.value.set(1.12, 0.98, 0.78);
    e.uVignette.value = 0.8;
    game.engine.bloom.strength = 0.8;
    music.play('tale', { fade: 0.5, restart: true });
    this.startPanel(0);
    game.fadeIn(1.2);
  }

  exit() {
    const e = game.engine.post;
    e.uSaturation.value = 1.05;
    e.uTint.value.set(1, 1, 1);
    e.uVignette.value = 0.35;
    disposeScene(this.scene);
  }

  startPanel(i) {
    this.idx = i;
    this.pt = 0;
    const p = PANELS[i];
    this.typer = new Typer(p.text, { width: 760, size: 28, family: FONTS.ui, cps: 22 });
    const root = this.panels[i];
    this.scene.fog.color.set(SKIES[i] ? SKIES[i][1] : '#050308');
    this.scene.fog.density = SKIES[i] ? 0.011 : 0.05;
    this.sunLight.position.set(root.position.x + 4, 10, 6);
    this.sunLight.target.position.set(root.position.x, 0, 0);
  }

  async finish() {
    if (this.finishing) return;
    this.finishing = true;
    music.stop(1.5);
    await game.fadeOut(1.2, '#000');
    this.resolve();
  }

  update(dt) {
    this.pt += dt;
    const i = this.idx;
    const root = this.panels[i];
    const [p0, l0, p1, l1] = SHOTS[i];
    const dur = i === 7 ? 4 : 8.5;
    const k = ease.inOutSine(Math.min(1, this.pt / dur));
    const lerp3 = (a, b) => new THREE.Vector3(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k);
    this.cam.position.copy(lerp3(p0, p1)).add(root.position);
    this.cam.lookAt(lerp3(l0, l1).add(root.position));
    this.typer.update(dt);
    // panel-specific motion
    const u = root.userData;
    if (u.fx) u.fx.update(dt);
    if (u.orbs) u.orbs.forEach((o, n) => { o.position.y = 1.1 + Math.sin(this.pt * 2 + n) * 0.08 + this.pt * 0.04; o.rotation.y = this.pt; });
    if (u.dome) u.dome.material.opacity = 0.08 + 0.06 * Math.sin(this.pt * 2);
    if (u.lights) u.lights.forEach((h, n) => {
      h.position.y = 4 - this.pt * (0.4 + n * 0.05);
      h.position.x = (n - 3) * (1.1 + this.pt * 0.25);
      h.rotation.y = this.pt * (1 + n * 0.2);
    });
    if (i === 6 && u.kid) {
      u.kid.position.x = -1.3 + Math.min(1.6, this.pt * 0.3);
      if (this.pt > 6) u.kid.position.y = -(this.pt - 6) * (this.pt - 6) * 3;
    }
    if (i === 7 && u.kid) {
      u.kid.position.y = -this.pt * this.pt * 1.5;
      u.kid.rotation.z = this.pt * 3;
      u.kid.rotation.x = this.pt * 2;
    }
    if (i === 6 && this.pt > 6.5 && !this.fellSound) this.fellSound = true;
    // text fade
    this.textAlpha = Math.min(1, this.pt * 2) * (this.pt > dur - 0.6 ? Math.max(0, (dur - this.pt) / 0.6) : 1);
    if (this.pt >= dur) {
      if (i + 1 < PANELS.length) this.startPanel(i + 1);
      else this.finish();
    }
    // skip: tap confirm to advance, hold to skip all
    if (input.pressed('confirm') && this.typer.done && this.pt > 1) this.pt = dur - 0.5;
    if (input.held('cancel') || input.held('confirm')) this.skipHeld += dt; else this.skipHeld = 0;
    if (this.skipHeld > 1.2) this.finish();
  }

  draw(ui) {
    const p = PANELS[this.idx];
    ui.ctx.save();
    const y = p.center ? 230 : 420;
    ui.ctx.fillStyle = 'rgba(0,0,0,0.35)';
    if (!p.center && p.text) ui.ctx.fillRect(80, y - 18, 800, 110);
    if (p.center) {
      // center each line
      const lines = p.text.split('\n');
      lines.forEach((ln, n) => ui.text(ln.slice(0, Math.max(0, this.typer.shown - n * 10)), 480, y + n * 44, { size: 32, align: 'center', color: '#f0e0c0', alpha: this.textAlpha }));
    } else this.typer.draw(ui.ctx, 110, y, this.pt, this.textAlpha);
    if (this.skipHeld > 0.1) ui.text('Skipping...', 940, 510, { size: 14, family: FONTS.small, align: 'right', color: '#aaa', alpha: Math.min(1, this.skipHeld) });
    ui.ctx.restore();
  }
}
