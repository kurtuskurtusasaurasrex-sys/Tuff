// Reusable 3D props. Each returns a THREE.Group (plus optional update fn
// in userData.update(dt, t)).
import * as THREE from 'three';
import { toon, lit, glow, outlineAll, shadows } from './materials.js';
import { tex } from './textures.js';

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);

export function flowerBed(radius = 1.6, count = 70, colors = ['#ffd23a', '#ffe36a', '#f5c02a']) {
  const g = new THREE.Group();
  const stemGeo = new THREE.CylinderGeometry(0.012, 0.015, 0.25, 4);
  const petalGeo = new THREE.SphereGeometry(0.045, 6, 4);
  const centerGeo = new THREE.SphereGeometry(0.035, 6, 4);
  const stemMat = toon('#3f8a3a');
  const petalMats = colors.map((c) => toon(c, { emissive: c, emissiveIntensity: 0.15 }));
  const centerMat = toon('#c96a1a');
  const stems = new THREE.InstancedMesh(stemGeo, stemMat, count);
  const petals = new THREE.InstancedMesh(petalGeo, petalMats[0], count * 5);
  const centers = new THREE.InstancedMesh(centerGeo, centerMat, count);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const a = rand(0, TAU), r = Math.sqrt(Math.random()) * radius;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const h = rand(0.18, 0.3);
    m.compose(p.set(x, h / 2, z), q.identity(), s.set(1, h / 0.25, 1));
    stems.setMatrixAt(i, m);
    const top = new THREE.Vector3(x, h, z);
    q.setFromEuler(new THREE.Euler(rand(-0.4, 0.4), rand(0, TAU), rand(-0.4, 0.4)));
    for (let k = 0; k < 5; k++) {
      const pa = (k / 5) * TAU;
      const off = new THREE.Vector3(Math.cos(pa) * 0.05, 0, Math.sin(pa) * 0.05).applyQuaternion(q);
      m.compose(p.copy(top).add(off), q, s.set(1, 0.45, 1));
      petals.setMatrixAt(i * 5 + k, m);
      petals.setColorAt(i * 5 + k, color.set(colors[i % colors.length]));
    }
    m.compose(p.copy(top).add(new THREE.Vector3(0, 0.02, 0)), q, s.set(1, 0.7, 1));
    centers.setMatrixAt(i, m);
  }
  for (const im of [stems, petals, centers]) { im.castShadow = true; im.receiveShadow = true; g.add(im); }
  return g;
}

// Soft volumetric-looking shaft of light (additive cone with gradient).
export function lightShaft(height = 10, radius = 1.4, color = '#fff4d0', opacity = 0.35) {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({
    map: tex.shaft(), color: new THREE.Color(color), transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
  });
  for (let i = 0; i < 3; i++) {
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(radius * (0.55 + i * 0.12), radius * (0.9 + i * 0.2), height, 24, 1, true), mat);
    cone.position.y = height / 2;
    cone.rotation.y = i * 0.7;
    cone.userData.noOutline = true;
    g.add(cone);
  }
  const pool = new THREE.Mesh(new THREE.CircleGeometry(radius * 1.2, 32), new THREE.MeshBasicMaterial({
    map: tex.radial('#ffffff'), color: new THREE.Color(color), transparent: true, opacity: opacity * 1.4,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  }));
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.02;
  g.add(pool);
  return g;
}

// SAVE point: a slowly turning star of light. Walk up and press Z.
export function saveStar(color = '#ffe45a') {
  const g = new THREE.Group();
  const shape = new THREE.Shape();
  const pts = 7;
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 ? 0.1 : 0.24;
    const a = (i / (pts * 2)) * TAU + Math.PI / 2;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
  }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 1 });
  geo.center();
  const star = new THREE.Mesh(geo, glow(color, 2.2));
  star.position.y = 0.75;
  star.userData.noOutline = true;
  g.add(star);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.radial('#ffffff'), color, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.set(1.3, 1.3, 1);
  halo.position.y = 0.75;
  g.add(halo);
  const light = new THREE.PointLight(color, 3, 4, 2);
  light.position.y = 0.9;
  g.add(light);
  g.userData.update = (dt, t) => {
    star.rotation.y = t * 1.3;
    star.position.y = 0.75 + Math.sin(t * 2) * 0.06;
    halo.position.y = star.position.y;
    halo.material.opacity = 0.45 + Math.sin(t * 3) * 0.15;
  };
  return g;
}

export function pillar(h = 4, r = 0.35, color = '#8d63ae', opts = {}) {
  const g = new THREE.Group();
  const mat = lit(color, { map: opts.map || tex.bricks(color, '#3b2150'), roughness: 0.9 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.05, h, 12), mat);
  shaft.position.y = h / 2;
  g.add(shaft);
  const capMat = lit(new THREE.Color(color).offsetHSL(0, 0, 0.08).getStyle());
  const base = new THREE.Mesh(new THREE.BoxGeometry(r * 2.8, 0.3, r * 2.8), capMat);
  base.position.y = 0.15;
  g.add(base);
  const cap = base.clone();
  cap.position.y = h - 0.15;
  g.add(cap);
  shadows(g, true, true);
  return g;
}

export function pineTree(h = 3.2, snow = true) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, h * 0.3, 6), toon('#4a2f1f'));
  trunk.position.y = h * 0.15;
  g.add(trunk);
  const green = toon('#1f4a3a');
  const white = toon('#eef4ff');
  const tiers = 4;
  for (let i = 0; i < tiers; i++) {
    const r = (0.95 - i * 0.18) * (h / 3.2);
    const ch = h * 0.34;
    const y = h * 0.28 + i * h * 0.17;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(r, ch, 8), green);
    cone.position.y = y + ch / 2;
    cone.rotation.y = i * 0.4;
    g.add(cone);
    if (snow) {
      const cap = new THREE.Mesh(new THREE.ConeGeometry(r * 0.72, ch * 0.42, 8), white);
      cap.position.y = y + ch * 0.8;
      cap.rotation.y = i * 0.4;
      g.add(cap);
    }
  }
  outlineAll(g, 0.03);
  shadows(g, true, false);
  return g;
}

export function leafPile(radius = 1, color = '#e0462a') {
  const g = new THREE.Group();
  const cols = [color, '#ff7a3a', '#c9301f', '#ffa04a'];
  const geo = new THREE.CircleGeometry(0.09, 5);
  const count = Math.floor(90 * radius);
  const im = new THREE.InstancedMesh(geo, toon('#ffffff', { side: THREE.DoubleSide }), count);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const a = rand(0, TAU), r = Math.sqrt(Math.random()) * radius;
    const h = (1 - r / radius) * 0.3 * radius + 0.02;
    q.setFromEuler(new THREE.Euler(-Math.PI / 2 + rand(-0.5, 0.5), rand(-0.5, 0.5), rand(0, TAU)));
    m.compose(p.set(Math.cos(a) * r, Math.random() * h, Math.sin(a) * r), q, s);
    im.setMatrixAt(i, m);
    im.setColorAt(i, c.set(cols[i % cols.length]));
  }
  im.receiveShadow = true;
  g.add(im);
  return g;
}

export function rock(size = 1, color = '#5a5470') {
  const geo = new THREE.DodecahedronGeometry(size * 0.5, 0);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setXYZ(i, pos.getX(i) * rand(0.8, 1.15), pos.getY(i) * rand(0.6, 0.9), pos.getZ(i) * rand(0.8, 1.15));
  }
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, lit(color, { flat: true, roughness: 0.95 }));
  m.position.y = size * 0.25;
  m.rotation.y = rand(0, TAU);
  m.castShadow = true;
  m.receiveShadow = true;
  const g = new THREE.Group();
  g.add(m);
  return g;
}

export function crystal(h = 1, color = '#5ad8ff') {
  const g = new THREE.Group();
  const mat = lit(color, { emissive: color, emissiveIntensity: 0.9, roughness: 0.3, metalness: 0.1, flat: true, transparent: true, opacity: 0.9 });
  for (let i = 0; i < 4; i++) {
    const c = new THREE.Mesh(new THREE.OctahedronGeometry(0.2 * h * rand(0.6, 1.2), 0), mat);
    c.scale.y = 2.4;
    c.position.set(rand(-0.25, 0.25) * h, 0.3 * h, rand(-0.25, 0.25) * h);
    c.rotation.set(rand(-0.4, 0.4), rand(0, TAU), rand(-0.4, 0.4));
    g.add(c);
  }
  return g;
}

export function glowMushroom(h = 0.6, color = '#4ad8ff') {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05 * h * 2, 0.07 * h * 2, h, 8), toon('#dfe8ff'));
  stem.position.y = h / 2;
  g.add(stem);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.25 * h * 2, 14, 8, 0, TAU, 0, Math.PI / 2), lit(color, { emissive: color, emissiveIntensity: 1.2 }));
  cap.position.y = h;
  g.add(cap);
  return g;
}

// Echo flower: a tall blue bell that repeats the last thing said to it.
export function echoFlower() {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.8, 5), toon('#2f6a8a'));
  stem.position.y = 0.4;
  stem.rotation.z = 0.08;
  g.add(stem);
  const petalMat = lit('#5ad0ff', { emissive: '#3aaeff', emissiveIntensity: 1.4 });
  for (let i = 0; i < 5; i++) {
    const p = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 5), petalMat);
    const a = (i / 5) * TAU;
    p.position.set(Math.cos(a) * 0.06 + 0.03, 0.82, Math.sin(a) * 0.06);
    p.rotation.set(Math.sin(a) * 0.6, 0, -Math.cos(a) * 0.6 + Math.PI);
    g.add(p);
  }
  const l = new THREE.PointLight('#4ab8ff', 1.2, 2.5, 2);
  l.position.y = 0.8;
  g.add(l);
  g.userData.update = (dt, t) => { g.rotation.z = Math.sin(t * 1.3 + g.position.x) * 0.04; };
  return g;
}

export function lamp(color = '#ffc86a', h = 2.2) {
  const g = new THREE.Group();
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, h, 8), toon('#2a2a33'));
  post.position.y = h / 2;
  g.add(post);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), glow(color, 2.5));
  bulb.position.y = h + 0.1;
  g.add(bulb);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.18, 8), toon('#2a2a33'));
  cap.position.y = h + 0.3;
  g.add(cap);
  const l = new THREE.PointLight(color, 4, 6, 2);
  l.position.y = h + 0.1;
  g.add(l);
  shadows(g, true, false);
  return g;
}

export function sign(text = '') {
  const g = new THREE.Group();
  const wood = toon('#8a5a34');
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 0.1), wood);
  post.position.y = 0.45;
  g.add(post);
  const board = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 0.08), wood);
  board.position.y = 0.95;
  g.add(board);
  outlineAll(g, 0.02);
  shadows(g, true, false);
  g.userData.text = text;
  return g;
}

export function candle(h = 0.5, color = '#ffe8c0') {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, h, 10), toon(color));
  body.position.y = h / 2;
  g.add(body);
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), glow('#ffb03a', 3));
  flame.scale.y = 1.8;
  flame.position.y = h + 0.08;
  g.add(flame);
  const l = new THREE.PointLight('#ffa040', 1.5, 3, 2);
  l.position.y = h + 0.1;
  g.add(l);
  g.userData.update = (dt, t) => {
    const f = 1 + Math.sin(t * 17 + g.position.x * 3) * 0.08 + Math.sin(t * 29) * 0.05;
    flame.scale.set(1, 1.8 * f, 1);
    l.intensity = 1.5 * f;
  };
  return g;
}

export function bench(color = '#8a5a34') {
  const g = new THREE.Group();
  const m = toon(color);
  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 0.45), m);
  seat.position.y = 0.45;
  g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.08), m);
  back.position.set(0, 0.75, -0.2);
  g.add(back);
  for (const x of [-0.6, 0.6]) for (const z of [-0.15, 0.15]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.08), m);
    leg.position.set(x, 0.22, z);
    g.add(leg);
  }
  outlineAll(g, 0.02);
  shadows(g, true, true);
  return g;
}

// Simple house facade for towns.
export function house(w = 4, h = 3, d = 3, wall = '#b07a4a', roof = '#5a3a6a', opts = {}) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lit(wall, { map: opts.map || tex.planks(wall) }));
  body.position.y = h / 2;
  g.add(body);
  const roofGeo = new THREE.ConeGeometry(Math.max(w, d) * 0.78, h * 0.6, 4, 1);
  const r = new THREE.Mesh(roofGeo, lit(roof, { flat: true }));
  r.position.y = h + h * 0.3;
  r.rotation.y = Math.PI / 4;
  r.scale.set(w / Math.max(w, d) * 1.05, 1, d / Math.max(w, d) * 1.05);
  g.add(r);
  if (opts.snowRoof) {
    const s = new THREE.Mesh(roofGeo, lit('#f2f6ff', { flat: true }));
    s.position.y = r.position.y + 0.08;
    s.rotation.y = Math.PI / 4;
    s.scale.copy(r.scale).multiplyScalar(1.02);
    s.scale.y = 0.9;
    g.add(s);
  }
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.6, 0.1), toon('#4a2f1f'));
  door.position.set(opts.doorX ?? 0, 0.8, d / 2 + 0.03);
  g.add(door);
  const winMat = glow(opts.window ?? '#ffcf7a', 1.4);
  for (const x of [-w / 2 + 0.8, w / 2 - 0.8]) {
    if (Math.abs(x - (opts.doorX ?? 0)) < 1) continue;
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.6), winMat);
    win.position.set(x, h * 0.55, d / 2 + 0.02);
    g.add(win);
  }
  if (opts.light !== false) {
    const l = new THREE.PointLight(opts.window ?? '#ffcf7a', 2, 5, 2);
    l.position.set(0, h * 0.5, d / 2 + 0.8);
    g.add(l);
  }
  shadows(g, true, true);
  return g;
}

export function waterfall(w = 2, h = 5, color = '#5ab8ff') {
  const g = new THREE.Group();
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5); }
      void main(){
        vec2 uv = vUv; uv.y += uTime * 1.2;
        float streak = h(vec2(floor(uv.x * 40.0), 0.0));
        float f = fract(uv.y * (1.5 + streak) + streak * 10.0);
        float a = 0.45 + 0.35 * smoothstep(0.7, 1.0, f) + 0.2 * streak;
        vec3 c = mix(uColor, vec3(1.0), smoothstep(0.85, 1.0, f) * 0.8);
        float edge = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
        gl_FragColor = vec4(c * 1.4, a * edge);
      }`,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h, 1, 1), mat);
  plane.position.y = h / 2;
  plane.userData.noOutline = true;
  g.add(plane);
  const foam = new THREE.Mesh(new THREE.CircleGeometry(w * 0.7, 20), new THREE.MeshBasicMaterial({ map: tex.radial('#ffffff'), transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending }));
  foam.rotation.x = -Math.PI / 2;
  foam.position.set(0, 0.03, 0.3);
  g.add(foam);
  g.userData.update = (dt, t) => { mat.uniforms.uTime.value = t; };
  return g;
}

export function sparkleSprite(color = '#ffffff', size = 0.4) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.radial('#ffffff'), color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  s.scale.set(size, size, 1);
  return s;
}
