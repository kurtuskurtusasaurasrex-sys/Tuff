// Scene helpers shared by title, intro, creator, world and battle.
import * as THREE from 'three';
import { glow } from './materials.js';
import { tex } from './textures.js';

export function createScene(opts = {}) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(opts.bg ?? '#050308');
  if (opts.fog !== false) scene.fog = new THREE.FogExp2(opts.fogColor ?? opts.bg ?? '#050308', opts.fogDensity ?? 0.05);
  const hemi = new THREE.HemisphereLight(opts.sky ?? '#6a5a8a', opts.ground ?? '#1a1020', opts.hemi ?? 0.6);
  scene.add(hemi);
  scene.userData.hemi = hemi;
  const cam = new THREE.PerspectiveCamera(opts.fov ?? 40, 16 / 9, 0.1, 300);
  cam.userData.baseFov = opts.fov ?? 40;
  return { scene, cam };
}

export function sun(scene, color = '#ffffff', intensity = 1.5, pos = [5, 12, 6], size = 14) {
  const d = new THREE.DirectionalLight(color, intensity);
  d.position.set(...pos);
  d.castShadow = true;
  d.shadow.mapSize.set(2048, 2048);
  d.shadow.camera.left = -size; d.shadow.camera.right = size;
  d.shadow.camera.top = size; d.shadow.camera.bottom = -size;
  d.shadow.camera.near = 0.5; d.shadow.camera.far = 60;
  d.shadow.bias = -0.0005;
  d.shadow.normalBias = 0.02;
  scene.add(d);
  scene.add(d.target);
  return d;
}

let heartGeo = null;
export function heartGeometry() {
  if (heartGeo) return heartGeo;
  const s = new THREE.Shape();
  s.moveTo(0, -0.5);
  s.bezierCurveTo(-0.1, -0.35, -0.55, -0.1, -0.5, 0.18);
  s.bezierCurveTo(-0.45, 0.45, -0.1, 0.5, 0, 0.25);
  s.bezierCurveTo(0.1, 0.5, 0.45, 0.45, 0.5, 0.18);
  s.bezierCurveTo(0.55, -0.1, 0.1, -0.35, 0, -0.5);
  heartGeo = new THREE.ExtrudeGeometry(s, { depth: 0.18, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.06, bevelSegments: 3, curveSegments: 16 });
  heartGeo.center();
  return heartGeo;
}

// A glowing 3D SOUL.
export function heartMesh(color, intensity = 2.2, withHalo = true) {
  const g = new THREE.Group();
  const m = new THREE.Mesh(heartGeometry(), glow(color, intensity));
  g.add(m);
  if (withHalo) {
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.radial('#ffffff'), color, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.set(2.2, 2.2, 1);
    g.add(halo);
    g.userData.halo = halo;
  }
  g.userData.heart = m;
  return g;
}

export function disposeScene(scene) {
  scene.traverse((o) => {
    if (o.geometry && o.geometry !== heartGeo) o.geometry.dispose();
    if (o.material) {
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (m.map && m.map.isCanvasTexture && !m.map.userData?.shared) m.map.dispose();
        if (!m.userData?.shared) m.dispose();
      }
    }
  });
}

export function ground(size, material, y = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size[0], size[1]), material);
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.receiveShadow = true;
  return m;
}

// Gradient sky dome (inside of a big sphere).
export function skyDome(top = '#8ab0ff', bottom = '#ffe0b0', radius = 60, horizon = 0.0) {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { uTop: { value: new THREE.Color(top) }, uBot: { value: new THREE.Color(bottom) }, uH: { value: horizon } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 uTop; uniform vec3 uBot; uniform float uH; varying vec3 vP; void main(){ float t = smoothstep(uH - 0.1, 0.6, vP.y); gl_FragColor = vec4(mix(uBot, uTop, t), 1.0); }',
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 16), mat);
  m.renderOrder = -10;
  m.userData.noOutline = true;
  return m;
}
