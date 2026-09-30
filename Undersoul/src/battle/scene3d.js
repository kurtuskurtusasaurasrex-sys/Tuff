// The 3D stage behind the bullet board: enemies on a lit platform.
import * as THREE from 'three';
import { createScene, disposeScene } from '../gfx/scene.js';
import { buildModel } from '../gfx/models.js';
import { ParticleField, Burst } from '../gfx/particles.js';
import { lit } from '../gfx/materials.js';

const STAGES = {
  hollows: { bg: '#0a0510', floor: '#3a2448', light: '#c8a0ff', particles: 'dust' },
  frostmere: { bg: '#0a1020', floor: '#c8d8f0', light: '#dfe8ff', particles: 'snow' },
  echofall: { bg: '#020714', floor: '#1a2a5a', light: '#5aa8ff', particles: 'spores' },
  emberdeep: { bg: '#1a0402', floor: '#4a2018', light: '#ff9a5a', particles: 'embers' },
  capital: { bg: '#0a0a0e', floor: '#4a4a54', light: '#e0e0f0', particles: 'ash' },
  hall: { bg: '#1a1004', floor: '#c8a870', light: '#ffd070', particles: 'gold' },
  deeplab: { bg: '#020303', floor: '#2a2e2e', light: '#8ab0a0', particles: 'ash' },
  void: { bg: '#000000', floor: '#101010', light: '#ffffff', particles: 'dust' },
  rainbow: { bg: '#05020a', floor: '#1a1030', light: '#ffffff', particles: 'gold' },
};

export class BattleStage {
  constructor(stage = 'hollows') {
    const st = STAGES[stage] || STAGES.hollows;
    const { scene, cam } = createScene({ bg: st.bg, fogDensity: 0.05, hemi: 0.6, sky: st.light, ground: st.bg });
    this.scene = scene;
    this.cam = cam;
    const floor = new THREE.Mesh(new THREE.CircleGeometry(7, 48), lit(st.floor, { roughness: 0.8 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    const key = new THREE.SpotLight(st.light, 60, 20, 0.6, 0.5, 1.4);
    key.position.set(2, 8, 5);
    key.target.position.set(0, 1, 0);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key, key.target);
    const rim = new THREE.DirectionalLight(st.light, 1.4);
    rim.position.set(-4, 3, -5);
    scene.add(rim);
    const front = new THREE.DirectionalLight('#ffffff', 0.8);
    front.position.set(0, 2, 8);
    scene.add(front);
    this.particles = new ParticleField(st.particles, { min: new THREE.Vector3(-8, 0, -6), max: new THREE.Vector3(8, 7, 3) }, 200);
    scene.add(this.particles.points);
    this.slots = [];
    this.bursts = [];
    this.t = 0;
    this.camY = 1.3;
  }

  addEnemies(list) {
    const n = list.length;
    let maxH = 1;
    list.forEach((e, i) => {
      const m = buildModel(e.def.model || e.id, { arg: e.def.modelArg });
      const x = (i - (n - 1) / 2) * (n > 2 ? 2.4 : 2.8);
      m.position.set(x, 0, 0);
      if (e.def.scale) m.scale.setScalar(e.def.scale);
      if (e.def.float) m.position.y = e.def.float;
      this.scene.add(m);
      const h = (m.userData.height || 1.4) * (e.def.scale || 1);
      maxH = Math.max(maxH, h);
      e.model = m;
      e.baseX = x;
      e.height = h;
      m.traverse((o) => {
        if (o.isMesh && o.material && o.name !== 'outline' && o.material.emissive) {
          o.userData.baseEmissive = o.material.emissive.clone();
        }
      });
    });
    // Frame everyone in the top part of the screen.
    // Enemies should fill roughly the top 40% of the screen.
    const dist = Math.max(4.8, 3.7 * maxH) + (n > 2 ? 1.8 : 0);
    this.camBase = new THREE.Vector3(0, maxH * 0.6, dist);
    this.lookAt = new THREE.Vector3(0, -0.2 * maxH, 0);
    this.cam.position.copy(this.camBase);
    this.cam.lookAt(this.lookAt);
  }

  // Screen position (virtual coords) of a point on an enemy.
  screenOf(e, ui, frac = 1) {
    const p = new THREE.Vector3(e.model.position.x, e.model.position.y + (e.height || 1.4) * frac, e.model.position.z).project(this.cam);
    return ui.toVirtual(((p.x + 1) / 2) * window.innerWidth, ((1 - p.y) / 2) * window.innerHeight);
  }

  hurt(e) { e.shake = 0.5; e.flash = 0.25; }

  dust(e) {
    const m = e.model;
    const box = new THREE.Box3().setFromObject(m);
    const size = box.getSize(new THREE.Vector3());
    const b = new Burst(box.getCenter(new THREE.Vector3()), { count: 260, color: '#e8e8e8', spread: [size.x, size.y, size.z], speed: 1.2, up: 0.5, gravity: 0.3, wind: 0.6, size: 7, life: 2.2, additive: false });
    this.scene.add(b.points);
    this.bursts.push(b);
    e.dying = 0.01;
  }

  spare(e) {
    const m = e.model;
    const c = new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3());
    const b = new Burst(c, { count: 70, color: '#ffffff', spread: [1, 1.4, 1], speed: 1.8, up: 1, gravity: 0, size: 9, life: 1.4 });
    this.scene.add(b.points);
    this.bursts.push(b);
    e.sparing = 0.01;
    m.traverse((o) => {
      if (o.isMesh && o.material) {
        o.material = o.material.clone();
        o.material.transparent = true;
      }
    });
  }

  update(dt, enemies) {
    this.t += dt;
    this.particles.update(dt);
    for (const e of enemies) {
      const m = e.model;
      if (!m) continue;
      if (!e.dying && !e.sparing) m.userData.animate?.(dt, this.t, 0);
      m.position.x = e.baseX + (e.shake > 0 ? Math.sin(this.t * 80) * e.shake * 0.25 : 0);
      if (e.shake > 0) e.shake = Math.max(0, e.shake - dt * 1.6);
      if (e.flash !== undefined) {
        const on = e.flash > 0 && Math.floor(this.t * 30) % 2 === 0;
        m.traverse((o) => {
          if (o.isMesh && o.material?.emissive && o.userData.baseEmissive) o.material.emissive.copy(on ? new THREE.Color('#ffffff') : o.userData.baseEmissive);
        });
        e.flash -= dt;
        if (e.flash < -1) e.flash = undefined;
      }
      if (e.dying) {
        e.dying += dt;
        const k = Math.min(1, e.dying / 0.9);
        m.scale.setScalar((e.def.scale || 1) * (1 - k * 0.2));
        m.visible = k < 0.95;
        m.position.y = -k * 0.3;
      }
      if (e.sparing) {
        e.sparing += dt;
        const k = Math.min(1, e.sparing / 1.0);
        m.traverse((o) => { if (o.isMesh && o.material) o.material.opacity = (1 - k) * (o.material.userData.o ?? 1); });
        m.position.y = (e.def.float || 0) + k * 0.4;
        m.visible = k < 1;
      }
    }
    this.bursts = this.bursts.filter((b) => { b.update(dt); return !b.done; });
    if (this.camBase) {
      this.cam.position.set(this.camBase.x + Math.sin(this.t * 0.25) * 0.25, this.camBase.y, this.camBase.z);
      this.cam.lookAt(this.lookAt);
    }
  }

  dispose() { this.particles.dispose(); disposeScene(this.scene); }
}
