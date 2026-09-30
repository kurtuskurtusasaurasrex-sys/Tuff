// Stylised materials: cel-shaded toon with inverted-hull outlines for
// characters, lit standard materials for environments.
import * as THREE from 'three';

let gradient3 = null;
function gradientMap() {
  if (gradient3) return gradient3;
  const data = new Uint8Array([70, 70, 70, 255, 150, 150, 150, 255, 225, 225, 225, 255, 255, 255, 255, 255]);
  gradient3 = new THREE.DataTexture(data, 4, 1, THREE.RGBAFormat);
  gradient3.minFilter = THREE.NearestFilter;
  gradient3.magFilter = THREE.NearestFilter;
  gradient3.needsUpdate = true;
  return gradient3;
}

const cache = new Map();

export function toon(color, opts = {}) {
  const key = 'toon' + color + JSON.stringify(opts);
  if (!opts.map && !opts.unique && cache.has(key)) return cache.get(key);
  const m = new THREE.MeshToonMaterial({
    color: new THREE.Color(color),
    gradientMap: gradientMap(),
    map: opts.map || null,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
  });
  if (opts.emissive) {
    m.emissive = new THREE.Color(opts.emissive);
    m.emissiveIntensity = opts.emissiveIntensity ?? 1;
  }
  if (!opts.map && !opts.unique) cache.set(key, m);
  return m;
}

export function lit(color, opts = {}) {
  const key = 'lit' + color + JSON.stringify({ ...opts, map: !!opts.map });
  if (!opts.map && !opts.unique && cache.has(key)) return cache.get(key);
  const m = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: opts.roughness ?? 0.85,
    metalness: opts.metalness ?? 0,
    map: opts.map || null,
    normalMap: opts.normalMap || null,
    flatShading: !!opts.flat,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
  });
  if (opts.emissive) {
    m.emissive = new THREE.Color(opts.emissive);
    m.emissiveIntensity = opts.emissiveIntensity ?? 1;
    if (opts.emissiveMap) m.emissiveMap = opts.emissiveMap;
  }
  if (!opts.map && !opts.unique) cache.set(key, m);
  return m;
}

export function glow(color, intensity = 2, opts = {}) {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color).multiplyScalar(intensity),
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    blending: opts.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: !opts.additive,
    toneMapped: false,
    side: opts.side ?? THREE.FrontSide,
  });
}

const outlineMats = new Map();
function outlineMat(color) {
  if (!outlineMats.has(color)) {
    outlineMats.set(color, new THREE.MeshBasicMaterial({ color, side: THREE.BackSide }));
  }
  return outlineMats.get(color);
}

// Inverted-hull outline: a back-face copy pushed out along normals.
export function outline(mesh, thickness = 0.025, color = '#140c1c') {
  const geo = mesh.geometry;
  const mat = outlineMat(color).clone();
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uThick = { value: thickness };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uThick;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += normalize(normal) * uThick;');
  };
  const o = new THREE.Mesh(geo, mat);
  o.name = 'outline';
  o.raycast = () => {};
  mesh.add(o);
  return o;
}

// Walk a group and outline every mesh that asks for it.
export function outlineAll(group, thickness = 0.022, color) {
  const list = [];
  group.traverse((o) => {
    if (o.isMesh && o.name !== 'outline' && !o.userData.noOutline) list.push(o);
  });
  for (const m of list) {
    const s = m.scale;
    const avg = (Math.abs(s.x) + Math.abs(s.y) + Math.abs(s.z)) / 3 || 1;
    outline(m, thickness / avg, color);
  }
  return group;
}

export function shadows(group, cast = true, receive = false) {
  group.traverse((o) => {
    if (o.isMesh && o.name !== 'outline') {
      o.castShadow = cast;
      o.receiveShadow = receive;
    }
  });
  return group;
}
