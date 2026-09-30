// Character creator (name + look) and SOUL selection.
import * as THREE from 'three';
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { createScene, disposeScene, heartMesh } from '../gfx/scene.js';
import { buildHuman, animateHuman, LOOK_OPTIONS, setFace } from '../gfx/human.js';
import { ParticleField } from '../gfx/particles.js';
import { glow } from '../gfx/materials.js';
import { music } from '../audio/sequencer.js';
import { sfx } from '../audio/sfx.js';
import { FONTS } from '../ui/fonts.js';
import { Typer } from '../ui/text.js';
import { say, ask } from '../ui/dialogue.js';
import { DEFAULT_LOOK } from '../core/save.js';
import { SOULS, SOUL_ORDER } from '../data/souls.js';

// ---------------------------------------------------------------------------
// Name entry
const GRID = [
  'ABCDEFG', 'HIJKLMN', 'OPQRSTU', 'VWXYZ',
  'abcdefg', 'hijklmn', 'opqrstu', 'vwxyz',
];
const MAXLEN = 8;

// Names with something to say. [response, allowed]
const NAME_RESPONSES = {
  WREN: ['That name is already spoken for.', false],
  SPRIG: ['I already CHOSE that name.', false, 'sprig'],
  WICK: ['nope.', false, 'wick'],
  TAPER: ['I\'LL ALLOW IT!!!!', true, 'taper'],
  WILLOW: ['I think you should choose your own name, my child.', false, 'willow'],
  MARIS: ['GET YOUR OWN NAME!', false, 'maris'],
  LOTL: ['u-um... that one\'s taken... sorry...', false, 'lotl'],
  LUXE: ['OOOH! A FAN! Darling, you have EXCELLENT taste.', true, 'luxe'],
  OAKHEART: ['That name is too heavy to carry.', false],
  ROWAN: ['...', true],
  FRISK: ['A familiar name. But this is not their story.', true],
  CHARA: ['The name echoes somewhere far below.', true],
  HUSH: ['...oh... you can have it... i don\'t mind...', true, 'hush'],
  KID: ['A classic.', true],
  TUFT: ['WHOA! Same name as me! That\'s SO cool!', true, 'tuft'],
};

class NameEntry {
  constructor(initial = '') {
    this.name = initial;
    this.row = 0;
    this.col = 0;
    this.t = 0;
    this.blocking = true;
    this.listener = {
      onChar: (ch) => { if (this.name.length < MAXLEN) { this.name += ch; sfx.move(); } },
      onBackspace: () => { this.name = this.name.slice(0, -1); sfx.back(); },
      onEnter: () => {
        if (this.name.trim().length) { sfx.select(); this.close(this.name.trim()); } else sfx.buzz();
      },
    };
  }
  open() {
    return new Promise((resolve) => {
      this.resolve = resolve;
      input.pushText(this.listener);
      game.pushOverlay(this);
    });
  }
  close(v) {
    input.popText(this.listener);
    game.removeOverlay(this);
    this.resolve(v);
  }
  rows() { return GRID.length + 1; }
  rowLen(r) { return r === GRID.length ? 3 : GRID[r].length; }
  update(dt, top) {
    this.t += dt;
    if (!top) return;
    if (input.pressed('up')) { this.row = (this.row + this.rows() - 1) % this.rows(); this.col = Math.min(this.col, this.rowLen(this.row) - 1); sfx.move(); }
    if (input.pressed('down')) { this.row = (this.row + 1) % this.rows(); this.col = Math.min(this.col, this.rowLen(this.row) - 1); sfx.move(); }
    if (input.pressed('left')) { this.col = (this.col + this.rowLen(this.row) - 1) % this.rowLen(this.row); sfx.move(); }
    if (input.pressed('right')) { this.col = (this.col + 1) % this.rowLen(this.row); sfx.move(); }
    if (input.pressed('pause')) { sfx.back(); this.close(null); return; }
    if (input.pressed('confirm')) {
      if (this.row === GRID.length) {
        if (this.col === 0) { sfx.back(); this.close(null); }
        else if (this.col === 1) { this.name = this.name.slice(0, -1); sfx.back(); }
        else if (this.name.trim().length) { sfx.select(); this.close(this.name.trim()); }
        else sfx.buzz();
      } else if (this.name.length < MAXLEN) {
        this.name += GRID[this.row][this.col];
        sfx.select();
      } else sfx.buzz();
    }
    if (input.pressed('cancel')) { this.name = this.name.slice(0, -1); sfx.back(); }
  }
  draw(ui) {
    ui.fillScreen('#000', 0.92);
    ui.text('Name the fallen human.', 480, 36, { size: 30, align: 'center' });
    ui.text(this.name + (Math.floor(this.t * 2) % 2 ? '_' : ' '), 480, 88, { size: 40, align: 'center', color: '#fff' });
    GRID.forEach((row, r) => {
      for (let c = 0; c < row.length; c++) {
        const sel = r === this.row && c === this.col;
        const jx = Math.sin(this.t * 9 + r * 3 + c * 7) * 0.8, jy = Math.cos(this.t * 8 + c * 5 + r) * 0.8;
        ui.text(row[c], 230 + c * 80 + jx, 150 + r * 36 + jy, { size: 28, color: sel ? '#ffff00' : '#fff' });
      }
    });
    ['Quit', 'Backspace', 'Done'].forEach((w, c) => {
      const sel = this.row === GRID.length && c === this.col;
      ui.text(w, 250 + c * 220, 460, { size: 28, color: sel ? '#ffff00' : '#fff' });
    });
    ui.text('Type your name and press ENTER, or pick letters with the arrows.', 480, 510, { size: 14, family: FONTS.small, align: 'center', color: '#888' });
  }
}

// ---------------------------------------------------------------------------
const ROWS = [
  { key: 'name', label: 'NAME' },
  { key: 'skin', label: 'SKIN' },
  { key: 'hair', label: 'HAIR' },
  { key: 'hairColor', label: 'HAIR COLOR' },
  { key: 'eyes', label: 'EYES' },
  { key: 'shirt', label: 'SWEATER' },
  { key: 'stripe', label: 'STRIPES' },
  { key: 'pants', label: 'PANTS' },
  { key: 'shoes', label: 'SHOES' },
  { key: 'accessory', label: 'EXTRA' },
  { key: 'random', label: 'RANDOMIZE' },
  { key: 'done', label: 'DONE' },
];
const SWATCH = new Set(['skin', 'hairColor', 'shirt', 'stripe', 'pants', 'shoes']);

export class CreatorMode {
  id = 'creator';
  constructor(prev) {
    const { scene, cam } = createScene({ bg: '#07050c', fogDensity: 0.06, hemi: 0.5, sky: '#8a7ab0' });
    this.scene = scene;
    this.cam = cam;
    this.look = { ...(prev?.look || DEFAULT_LOOK) };
    this.name = prev?.name || '';
    const key = new THREE.DirectionalLight('#fff4e8', 2.2);
    key.position.set(2, 4, 4);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.DirectionalLight('#8a6aff', 2.5);
    rim.position.set(-3, 2, -3);
    scene.add(rim);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1, 0.12, 40), new THREE.MeshStandardMaterial({ color: '#1a1424', roughness: 0.6, metalness: 0.2 }));
    disc.position.y = -0.06;
    disc.receiveShadow = true;
    scene.add(disc);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.96, 0.015, 8, 64), glow('#ff4a4a', 2));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);
    this.ring = ring;
    this.particles = new ParticleField('gold', { min: new THREE.Vector3(-4, 0, -4), max: new THREE.Vector3(4, 4, 2) }, 150);
    scene.add(this.particles.points);
    this.row = 0;
    this.t = 0;
    this.spin = 0;
    this.rebuild();
  }

  run() { return new Promise((resolve) => { this.resolve = resolve; game.setMode(this); }); }

  enter() {
    game.engine.setView(this.scene, this.cam);
    game.engine.bloom.strength = 0.6;
    music.play('creator', { fade: 1 });
    game.fadeIn(0.6);
  }
  exit() { disposeScene(this.scene); this.particles.dispose(); }

  rebuild() {
    if (this.model) this.scene.remove(this.model);
    this.model = buildHuman(this.look);
    this.model.rotation.y = this.spin;
    this.scene.add(this.model);
  }

  change(key, d) {
    const n = LOOK_OPTIONS[key].length;
    this.look[key] = (this.look[key] + d + n) % n;
    this.rebuild();
    if (key === 'eyes' || key === 'accessory') setFace(this.model, 'happy');
    this.happyT = 0.8;
  }

  async editName() {
    const n = await new NameEntry(this.name).open();
    if (n == null) return;
    const up = n.toUpperCase();
    const resp = NAME_RESPONSES[up];
    if (resp) {
      await say(resp[2] || 'narrator', resp[0]);
      if (!resp[1]) return;
    }
    this.name = n;
  }

  async finishCreate() {
    if (!this.name) { await this.editName(); if (!this.name) return; }
    const yes = await ask('narrator', [`* Is this who fell?\n* ${this.name}.`], ['Yes', 'No']);
    if (yes === 0) {
      sfx.save();
      this.leaving = true;
      await game.fadeOut(0.8);
      this.resolve({ name: this.name, look: { ...this.look } });
    }
  }

  update(dt, busy) {
    this.t += dt;
    this.spin += dt * 0.5;
    this.model.rotation.y = Math.sin(this.spin * 0.6) * 0.9;
    animateHuman(this.model, dt, 0);
    if (this.happyT !== undefined) {
      this.happyT -= dt;
      if (this.happyT <= 0) { setFace(this.model, 'neutral'); this.happyT = undefined; }
    }
    this.particles.update(dt);
    this.ring.material.color.setHSL((this.t * 0.05) % 1, 0.8, 0.6).multiplyScalar(2);
    this.cam.position.set(0.95, 1.05, 3.3);
    this.cam.lookAt(0.95, 0.72, 0);
    if (busy || this.leaving) return;
    const n = ROWS.length;
    if (input.pressed('up')) { this.row = (this.row + n - 1) % n; sfx.move(); }
    if (input.pressed('down')) { this.row = (this.row + 1) % n; sfx.move(); }
    const r = ROWS[this.row];
    if (LOOK_OPTIONS[r.key]) {
      if (input.pressed('left')) { this.change(r.key, -1); sfx.move(); }
      if (input.pressed('right') || input.pressed('confirm')) { this.change(r.key, 1); sfx.move(); }
    } else if (input.pressed('confirm')) {
      sfx.select();
      if (r.key === 'name') this.editName();
      if (r.key === 'random') {
        for (const k of Object.keys(LOOK_OPTIONS)) this.look[k] = Math.floor(Math.random() * LOOK_OPTIONS[k].length);
        this.rebuild();
        setFace(this.model, 'happy');
        this.happyT = 0.8;
      }
      if (r.key === 'done') this.finishCreate();
    }
  }

  draw(ui) {
    const px = 560, py = 40, pw = 370;
    ui.box(px, py, pw, 460, { fill: 'rgba(0,0,0,0.78)' });
    ui.text('WHO FELL?', px + pw / 2, py + 18, { size: 18, family: FONTS.title, align: 'center' });
    ROWS.forEach((r, i) => {
      const y = py + 62 + i * 32;
      const sel = i === this.row;
      const col = sel ? '#ffff00' : '#fff';
      ui.text(r.label, px + 44, y, { size: 22, color: col });
      if (sel) ui.heart(px + 24, y + 12, 15, '#ff2020');
      let val = '';
      if (r.key === 'name') val = this.name || '(choose)';
      else if (LOOK_OPTIONS[r.key]) {
        const v = LOOK_OPTIONS[r.key][this.look[r.key]];
        if (SWATCH.has(r.key)) {
          ui.ctx.fillStyle = v;
          ui.ctx.fillRect(px + pw - 110, y + 2, 60, 20);
          ui.ctx.strokeStyle = '#fff';
          ui.ctx.lineWidth = 2;
          ui.ctx.strokeRect(px + pw - 110, y + 2, 60, 20);
        } else val = v;
      }
      if (val) ui.text(val, px + pw - 24, y, { size: 22, color: col, align: 'right' });
      if (sel && LOOK_OPTIONS[r.key]) {
        ui.text('<', px + pw - 132, y, { size: 22, color: '#888' });
        ui.text('>', px + pw - 40, y, { size: 22, color: '#888' });
      }
    });
    ui.text('ARROWS change    Z select', px + pw / 2, py + 440, { size: 12, family: FONTS.small, align: 'center', color: '#888' });
  }
}

// ---------------------------------------------------------------------------
export const ECHO_GREETING = {
  determination: 'You look like you don\'t give up easily. Good. Neither do I.',
  patience: '...Hello. There\'s no hurry. There never was.',
  bravery: 'OH, finally! Someone to go on an adventure with! Let\'s GO!',
  integrity: 'Stand up straight. There. Now we can begin properly.',
  perseverance: 'Um. Hi. I, uh, wrote down some notes. For you. In case.',
  kindness: 'Oh, sweetheart. You\'re shivering. Come here, I\'ll keep you warm.',
  justice: 'Howdy, partner. Reckon we\'re riding together now.',
};

export class SoulSelectMode {
  id = 'soul';
  constructor(look) {
    const { scene, cam } = createScene({ bg: '#030205', fogDensity: 0.05, hemi: 0.2 });
    this.scene = scene;
    this.cam = cam;
    this.hearts = SOUL_ORDER.map((id) => {
      const h = heartMesh(SOULS[id].color, 1.25);
      h.userData.halo.material.opacity = 0.3;
      h.scale.setScalar(0.5);
      scene.add(h);
      return h;
    });
    this.light = new THREE.PointLight('#ff2a2a', 8, 12, 2);
    this.light.position.set(0, 1, 2);
    scene.add(this.light);
    this.particles = new ParticleField('dust', { min: new THREE.Vector3(-6, -3, -6), max: new THREE.Vector3(6, 4, 3) }, 220, { color: '#ffffff' });
    scene.add(this.particles.points);
    this.idx = 0;
    this.angle = 0;
    this.t = 0;
    this.look = look;
    this.makeText();
  }

  run() { return new Promise((resolve) => { this.resolve = resolve; game.setMode(this); }); }
  enter() {
    game.engine.setView(this.scene, this.cam);
    game.engine.bloom.strength = 0.5;
    music.play('creator', { fade: 1 });
    game.fadeIn(1);
    this.intro = new Typer('Seven lights drift in the dark. One of them turns toward you.', { width: 800, size: 24, cps: 30 });
  }
  exit() { disposeScene(this.scene); this.particles.dispose(); }

  makeText() {
    const s = SOULS[SOUL_ORDER[this.idx]];
    this.greet = new Typer(`"${ECHO_GREETING[s.id]}"`, { width: 820, size: 22, cps: 45, onBlip: () => sfx.voice('echo'), blipEvery: 3 });
  }

  async choose() {
    const s = SOULS[SOUL_ORDER[this.idx]];
    const yes = await ask('narrator', [`* Take the ${s.trait} SOUL?`], ['Yes', 'No']);
    if (yes !== 0) return;
    this.leaving = true;
    sfx.soulFly();
    const h = this.hearts[this.idx];
    await game.tween(1.0, (k) => {
      h.position.lerp(new THREE.Vector3(0, 0.3, 4.2), k * 0.2);
      h.scale.setScalar(0.5 + k * 0.8);
    });
    game.flash(1);
    sfx.save();
    await game.fadeOut(0.3, s.color);
    await game.wait(0.3);
    game.fadeColor = '#000';
    this.resolve(s.id);
  }

  update(dt, busy) {
    this.t += dt;
    this.intro.update(dt);
    this.greet.update(dt);
    this.particles.update(dt);
    const n = this.hearts.length;
    const target = -(this.idx / n) * Math.PI * 2;
    let d = target - this.angle;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    this.angle += d * Math.min(1, dt * 6);
    if (!this.leaving) {
      this.hearts.forEach((h, i) => {
        const a = this.angle + (i / n) * Math.PI * 2;
        const sel = i === this.idx;
        h.position.set(Math.sin(a) * 2.3, 0.75 + Math.sin(this.t * 1.5 + i) * 0.08, Math.cos(a) * 2.3 - 1);
        const s = sel ? 0.62 + Math.sin(this.t * 4) * 0.03 : 0.38;
        h.scale.setScalar(h.scale.x + (s - h.scale.x) * Math.min(1, dt * 8));
        h.rotation.y = sel ? Math.sin(this.t * 1.5) * 0.5 : a;
      });
    }
    const col = new THREE.Color(SOULS[SOUL_ORDER[this.idx]].color);
    this.light.color.lerp(col, Math.min(1, dt * 4));
    this.particles.points.material.uniforms.uSoft.value = 1;
    this.cam.position.set(0, 0.9, 4.6);
    this.cam.lookAt(0, 0.1, 0);
    if (busy || this.leaving) return;
    if (input.pressed('left')) { this.idx = (this.idx + n - 1) % n; sfx.move(); this.makeText(); }
    if (input.pressed('right')) { this.idx = (this.idx + 1) % n; sfx.move(); this.makeText(); }
    if (input.pressed('confirm') && this.t > 0.6) { sfx.select(); this.choose(); }
  }

  draw(ui) {
    const s = SOULS[SOUL_ORDER[this.idx]];
    this.intro.draw(ui.ctx, 480 - 340, 22, this.t, 0.8);
    const y = 300;
    ui.box(40, y, 880, 222, { fill: 'rgba(0,0,0,0.82)', stroke: s.color });
    ui.text(s.trait, 70, y + 18, { size: 28, family: FONTS.title, color: s.color, glow: s.color, glowSize: 12 });
    ui.text(`${s.echo}, ${s.echoTitle}`, 890, y + 22, { size: 20, align: 'right', color: '#ccc' });
    this.greet.draw(ui.ctx, 70, y + 62, this.t);
    ui.text(s.blurb, 70, y + 96, { size: 20, color: '#aaa' });
    ui.text(`X ACTION: ${s.action}`, 70, y + 130, { size: 20, color: s.color });
    ui.text(s.actionDesc, 250, y + 130, { size: 20 });
    ui.text(`PASSIVE: ${s.passive}`, 70, y + 160, { size: 20, color: s.color });
    ui.text(s.passiveDesc, 250, y + 160, { size: 20 });
    const st = s.stats;
    const fmt = (k, v) => `${k} ${v > 0 ? '+' : ''}${v}`;
    ui.text([fmt('HP', st.hp), fmt('ATK', st.atk), fmt('DEF', st.def)].join('    '), 70, y + 190, { size: 18, family: FONTS.small, color: '#bbb' });
    ui.text('<  LEFT / RIGHT  >     Z choose', 890, y + 192, { size: 14, family: FONTS.small, align: 'right', color: '#777' });
  }
}
