// Title screen: the flower bed where every story here begins.
import * as THREE from 'three';
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { createScene, disposeScene, ground, heartMesh } from '../gfx/scene.js';
import { flowerBed, lightShaft, pillar, rock } from '../gfx/props.js';
import { ParticleField } from '../gfx/particles.js';
import { lit } from '../gfx/materials.js';
import { tex } from '../gfx/textures.js';
import { buildHuman, animateHuman } from '../gfx/human.js';
import { music } from '../audio/sequencer.js';
import { sfx } from '../audio/sfx.js';
import { peekSave, getMeta } from '../core/save.js';
import { SOULS, SOUL_ORDER } from '../data/souls.js';
import { FONTS } from '../ui/fonts.js';
import { openSettings } from '../ui/menus.js';
import { formatTime } from '../core/util.js';

export class TitleMode {
  id = 'title';
  constructor() {
    const { scene, cam } = createScene({ bg: '#040206', fogDensity: 0.07, hemi: 0.35, sky: '#4a3a6a' });
    this.scene = scene;
    this.cam = cam;
    this.save = peekSave();
    this.meta = getMeta();
    const floor = ground([60, 60], lit('#2a2230', { map: tex.rock('#2a2230') }));
    floor.material.map.repeat.set(10, 10);
    scene.add(floor);
    const bed = flowerBed(1.7, 110);
    scene.add(bed);
    const shaft = lightShaft(16, 1.6, '#fff0c8', 0.28);
    scene.add(shaft);
    const spot = new THREE.SpotLight('#fff1cf', 60, 30, 0.32, 0.6, 1.4);
    spot.position.set(0, 16, 0);
    spot.target.position.set(0, 0, 0);
    spot.castShadow = true;
    spot.shadow.mapSize.set(1024, 1024);
    scene.add(spot, spot.target);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.3;
      const p = pillar(5 + (i % 3), 0.4, '#5e4478');
      p.position.set(Math.cos(a) * 9, 0, Math.sin(a) * 9);
      p.rotation.z = (i % 2 ? 1 : -1) * 0.04;
      scene.add(p);
      const r = rock(1 + (i % 3) * 0.5, '#3a3048');
      r.position.set(Math.cos(a + 0.4) * 6.5, 0, Math.sin(a + 0.4) * 6.5);
      scene.add(r);
    }
    this.dust = new ParticleField('dust', { min: new THREE.Vector3(-1.6, 0, -1.6), max: new THREE.Vector3(1.6, 12, 1.6) }, 160);
    scene.add(this.dust.points);
    // If there is a save, the kid stands in the flowers.
    if (this.save) {
      const color = SOULS[this.save.soul]?.color;
      this.kid = buildHuman(this.save.look, { soulColor: color });
      this.kid.rotation.y = 0.4;
      scene.add(this.kid);
    }
    // genocide memory: a cracked red soul floats over the bed
    if (this.meta.genocideDone) {
      this.crack = heartMesh('#ff2020', 2.5);
      this.crack.scale.setScalar(0.4);
      this.crack.position.set(0, 2.2, 0);
      scene.add(this.crack);
    }
    this.items = this.save
      ? [{ label: 'Continue', id: 'continue' }, { label: 'Reset', id: 'new' }, { label: 'Settings', id: 'settings' }]
      : [{ label: 'Begin Game', id: 'new' }, { label: 'Settings', id: 'settings' }];
    this.idx = 0;
    this.t = 0;
    this.show = 0;
    this.confirmReset = false;
  }

  run() {
    return new Promise((resolve) => { this.resolve = resolve; game.setMode(this); });
  }

  enter() {
    game.engine.setView(this.scene, this.cam);
    const e = game.engine.post;
    e.uSaturation.value = 1.0;
    e.uTint.value.set(1, 1, 1);
    e.uVignette.value = 0.5;
    game.engine.bloom.strength = 0.7;
    music.play('title', { fade: 1.5 });
  }

  exit() {
    disposeScene(this.scene);
    this.dust.dispose();
  }

  update(dt, busy) {
    this.t += dt;
    this.show = Math.min(1, this.show + dt * 0.5);
    const a = this.t * 0.06;
    this.cam.position.set(Math.sin(a) * 7.5, 3.2 + Math.sin(this.t * 0.2) * 0.3, Math.cos(a) * 7.5);
    this.cam.lookAt(0, 1.1, 0);
    this.dust.update(dt);
    if (this.kid) animateHuman(this.kid, dt, 0);
    if (this.crack) this.crack.rotation.y = this.t;
    if (busy || this.show < 0.3) return;
    const n = this.items.length;
    if (input.pressed('up')) { this.idx = (this.idx + n - 1) % n; sfx.move(); this.confirmReset = false; }
    if (input.pressed('down')) { this.idx = (this.idx + 1) % n; sfx.move(); this.confirmReset = false; }
    if (input.pressed('confirm')) {
      const id = this.items[this.idx].id;
      if (id === 'settings') { sfx.select(); openSettings(game.engine); return; }
      if (id === 'new' && this.save && !this.confirmReset) { sfx.select(); this.confirmReset = true; return; }
      sfx.select();
      this.resolve(id);
    }
    if (input.pressed('cancel')) this.confirmReset = false;
  }

  draw(ui) {
    const g = ui.ctx;
    const a = this.show;
    g.save();
    g.globalAlpha = a;
    // logo
    const bob = Math.sin(this.t * 1.2) * 2;
    ui.text('UNDERSOUL', 480, 70 + bob, { size: 58, family: FONTS.title, align: 'center', color: '#fff', glow: '#ff2a2a', glowSize: 28 });
    ui.text('UNDERSOUL', 480, 70 + bob, { size: 58, family: FONTS.title, align: 'center', color: '#fff' });
    ui.text('SEVEN HEARTS BENEATH THE MOUNTAIN', 480, 146, { size: 16, family: FONTS.small, align: 'center', color: '#c8b8e8' });
    SOUL_ORDER.forEach((id, i) => {
      const x = 480 + (i - 3) * 34;
      const y = 184 + Math.sin(this.t * 2 + i * 0.8) * 4;
      ui.heart(x, y, 16, SOULS[id].color, { glow: 10 });
    });
    // menu
    const baseY = 395;
    this.items.forEach((it, i) => {
      const y = baseY + i * 40;
      const sel = i === this.idx;
      let label = it.label;
      if (it.id === 'new' && this.save && this.confirmReset) label = 'Really reset?  (Z)';
      ui.text(label, 480, y, { size: 28, align: 'center', color: sel ? '#ffff00' : '#fff' });
      if (sel) ui.heart(480 - ui.measure(label, 28) / 2 - 26, y + 15, 18, '#ff2020');
    });
    if (this.save) {
      const s = this.save;
      const line = `${s.name}   LV ${s.lv}   ${formatTime(s.playTime || 0)}   ${s.saveRoomName || ''}`;
      ui.text(line, 480, 350, { size: 20, align: 'center', color: '#bbb' });
    }
    ui.text('Z / ENTER  confirm     X / SHIFT  back     C  menu', 480, 505, { size: 14, family: FONTS.small, align: 'center', color: '#777' });
    ui.text('v1.0', 940, 520, { size: 12, family: FONTS.small, align: 'right', color: '#555' });
    g.restore();
  }
}
