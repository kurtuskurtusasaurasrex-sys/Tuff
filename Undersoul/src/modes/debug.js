// Debug gallery (open index.html#models) to eyeball every model.
import * as THREE from 'three';
import { game } from '../core/game.js';
import { createScene } from '../gfx/scene.js';
import { buildModel, ALL_MODEL_IDS } from '../gfx/models.js';
import { lit } from '../gfx/materials.js';

export class ModelGallery {
  id = 'gallery';
  constructor(ids = ALL_MODEL_IDS) {
    const { scene, cam } = createScene({ bg: '#20202a', fogDensity: 0.005, hemi: 0.9, sky: '#ffffff', ground: '#404050' });
    this.scene = scene;
    this.cam = cam;
    const sun = new THREE.DirectionalLight('#ffffff', 2);
    sun.position.set(5, 10, 8);
    sun.castShadow = true;
    sun.shadow.camera.left = -20; sun.shadow.camera.right = 20; sun.shadow.camera.top = 20; sun.shadow.camera.bottom = -20;
    scene.add(sun);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), lit('#50505c'));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    this.models = [];
    const cols = 8;
    ids.forEach((id, i) => {
      const m = buildModel(id);
      m.position.set((i % cols - (cols - 1) / 2) * 3, 0, Math.floor(i / cols) * 3.5 - 6);
      scene.add(m);
      this.models.push(m);
    });
    this.labels = ids;
    this.t = 0;
  }
  run() { game.setMode(this); game.fadeAlpha = 0; return new Promise(() => {}); }
  enter() { game.engine.setView(this.scene, this.cam); }
  update(dt) {
    this.t += dt;
    this.cam.position.set(0, 9, 16);
    this.cam.lookAt(0, 0.5, -1);
    for (const m of this.models) m.userData.animate?.(dt, this.t, 0);
  }
  draw() {}
}
