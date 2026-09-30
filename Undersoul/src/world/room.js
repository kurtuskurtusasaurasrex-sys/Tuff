// Builds a playable room from its data: floor, auto walls, props,
// lighting, particles, water/lava. Also owns collision.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { THEMES, treeEdges } from './themes.js';
import { lit, toon, glow } from '../gfx/materials.js';
import { tex } from '../gfx/textures.js';
import * as P from '../gfx/props.js';
import * as F from '../gfx/furniture.js';
import { ParticleField } from '../gfx/particles.js';

// ---------------------------------------------------------------------------
// geometry helpers
function worldUV(geo, tile) {
  const pos = geo.attributes.position, nor = geo.attributes.normal, uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const nx = Math.abs(nor.getX(i)), ny = Math.abs(nor.getY(i)), nz = Math.abs(nor.getZ(i));
    if (ny > nx && ny > nz) uv.setXY(i, x / tile, z / tile);
    else if (nx > nz) uv.setXY(i, z / tile, y / tile);
    else uv.setXY(i, x / tile, y / tile);
  }
  uv.needsUpdate = true;
  return geo;
}

// Extract boundary edges of the union of integer rects.
export function computeEdges(rects) {
  let minX = Infinity, minZ = Infinity, maxX = -Infinity, maxZ = -Infinity;
  for (const [x0, z0, x1, z1] of rects) {
    minX = Math.min(minX, x0); minZ = Math.min(minZ, z0);
    maxX = Math.max(maxX, x1); maxZ = Math.max(maxZ, z1);
  }
  const W = Math.ceil(maxX - minX), D = Math.ceil(maxZ - minZ);
  const cell = new Uint8Array(W * D);
  for (const [x0, z0, x1, z1] of rects) {
    for (let x = Math.floor(x0); x < Math.ceil(x1); x++)
      for (let z = Math.floor(z0); z < Math.ceil(z1); z++) cell[(x - minX) + (z - minZ) * W] = 1;
  }
  const at = (ix, iz) => ix >= 0 && iz >= 0 && ix < W && iz < D && cell[ix + iz * W] === 1;
  const raw = { n: [], s: [], w: [], e: [] };
  for (let iz = 0; iz < D; iz++) for (let ix = 0; ix < W; ix++) {
    if (!at(ix, iz)) continue;
    const x = minX + ix, z = minZ + iz;
    if (!at(ix, iz - 1)) raw.n.push([z, x]);
    if (!at(ix, iz + 1)) raw.s.push([z + 1, x]);
    if (!at(ix - 1, iz)) raw.w.push([x, z]);
    if (!at(ix + 1, iz)) raw.e.push([x + 1, z]);
  }
  const edges = [];
  for (const side of ['n', 's', 'w', 'e']) {
    const list = raw[side].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let cur = null;
    for (const [line, pos] of list) {
      if (cur && cur.line === line && cur.end === pos) cur.end = pos + 1;
      else {
        if (cur) edges.push(cur);
        cur = { side, line, start: pos, end: pos + 1 };
      }
    }
    if (cur) edges.push(cur);
  }
  return {
    bounds: [minX, minZ, maxX, maxZ],
    edges: edges.map((e) => {
      const horiz = e.side === 'n' || e.side === 's';
      return { side: e.side, x: horiz ? e.start : e.line, z: horiz ? e.line : e.start, len: e.end - e.start, dx: horiz ? 1 : 0, dz: horiz ? 0 : 1 };
    }),
  };
}

// ---------------------------------------------------------------------------
// Prop factory. Returns { obj, collider?, interact? }
const DEFAULT_SOLID = {
  pillar: 0.5, tree: 0.5, rock: 0.5, lamp: 0.2, sign: 0.3, bench: [1.5, 0.5], table: [1.7, 1.0],
  chair: 0.3, armchair: [1.1, 1], bed: [1.3, 2.3], fireplace: [2.2, 0.7], bookshelf: [1.7, 0.5],
  crate: [0.9, 0.9], house: null, scarecrow: 0.35, station: [2.1, 1], gifttree: 1.4, tv: [1.3, 0.6],
  counter: null, coffin: [1, 2.1], throne: [1.8, 1.4], jar: 0.35, statue: [1.1, 1.1], save: 0.3,
  crystal: 0.4, mushroom: 0.3, echoflower: 0.2, lever: 0.3, candle: 0.15,
};

export function makeProp(p) {
  let obj;
  switch (p.t) {
    case 'pillar': obj = P.pillar(p.h ?? 4, p.r ?? 0.35, p.color ?? '#8d63ae'); break;
    case 'tree': obj = P.pineTree(p.h ?? 3.2, p.snow ?? true); break;
    case 'rock': obj = P.rock(p.s ?? 1, p.color ?? '#5a5470'); break;
    case 'crystal': obj = P.crystal(p.s ?? 1, p.color ?? '#5ad8ff'); break;
    case 'mushroom': obj = P.glowMushroom(p.s ?? 0.6, p.color ?? '#4ad8ff'); break;
    case 'echoflower': obj = P.echoFlower(); break;
    case 'lamp': obj = P.lamp(p.color ?? '#ffc86a', p.h ?? 2.2); break;
    case 'sign': obj = P.sign(); break;
    case 'candle': obj = P.candle(p.h ?? 0.5); break;
    case 'bench': obj = P.bench(p.color); break;
    case 'house': obj = P.house(p.w ?? 4, p.h ?? 3, p.d ?? 3, p.wall ?? '#b07a4a', p.roof ?? '#5a3a6a', p); break;
    case 'waterfall': obj = P.waterfall(p.w ?? 2, p.h ?? 5, p.color); break;
    case 'leaves': obj = P.leafPile(p.s ?? 1, p.color); break;
    case 'flowers': obj = P.flowerBed(p.r ?? 1.5, p.n ?? 60, p.colors); break;
    case 'shaft': obj = P.lightShaft(p.h ?? 12, p.r ?? 1.4, p.color ?? '#fff4d0', p.o ?? 0.1, p.layers ?? 1); break;
    case 'save': obj = P.saveStar(p.color); break;
    case 'table': obj = F.table(p.w, p.d, p.color); break;
    case 'chair': obj = F.chair(p.color); break;
    case 'armchair': obj = F.armchair(p.color); break;
    case 'bed': obj = F.bed(p.color); break;
    case 'fireplace': obj = F.fireplace(); break;
    case 'bookshelf': obj = F.bookshelf(p.color); break;
    case 'rug': obj = F.rug(p.w, p.d, p.color); break;
    case 'crate': obj = F.crate(p.s, p.color); break;
    case 'lever': obj = F.lever(p.on); break;
    case 'wallswitch': obj = F.wallSwitch(p.color); break;
    case 'spikes': obj = F.spikes(p.w ?? 2, p.d ?? 1); break;
    case 'tile': obj = F.tile(p.w ?? 1, p.color, p.mark); break;
    case 'door': obj = F.doorFrame(p.w, p.h, p.color); break;
    case 'scarecrow': obj = F.scarecrow(); break;
    case 'station': obj = F.sentryStation(p.color, p.sign); break;
    case 'gifttree': obj = F.giftTree(); break;
    case 'tv': obj = F.tv(); break;
    case 'counter': obj = F.counter(p.w, p.color); break;
    case 'coffin': obj = F.coffin(p.color, p.trim); break;
    case 'throne': obj = F.throne(p.color); break;
    case 'jar': obj = F.jar(p.color, p.empty); break;
    case 'statue': obj = F.statue(p.color); break;
    case 'pipe': obj = F.pipe(p.len, p.r, p.color); break;
    case 'vent': obj = F.vent(); break;
    case 'laser': obj = F.laserGate(p.len ?? 3, p.color); break;
    case 'custom': obj = p.build(); break;
    default:
      console.warn('unknown prop', p.t);
      obj = new THREE.Group();
  }
  obj.position.set(p.x ?? 0, p.y ?? 0, p.z ?? 0);
  if (p.ry) obj.rotation.y = p.ry;
  if (p.s && !['rock', 'crystal', 'mushroom', 'crate', 'leaves'].includes(p.t)) obj.scale.setScalar(p.s);
  let solid = p.solid !== undefined ? p.solid : DEFAULT_SOLID[p.t];
  let collider = null;
  if (typeof solid === 'number') collider = { type: 'c', x: p.x, z: p.z, r: solid * (p.s && p.t !== 'rock' ? p.s : 1) };
  else if (Array.isArray(solid)) {
    let [w, d] = solid;
    if (p.ry && Math.abs(Math.sin(p.ry)) > 0.7) [w, d] = [d, w];
    collider = { type: 'b', x0: p.x - w / 2, z0: p.z - d / 2, x1: p.x + w / 2, z1: p.z + d / 2 };
  }
  return { obj, collider, def: p };
}

// ---------------------------------------------------------------------------
function waterPlane(bounds, color, y = -0.3) {
  const [x0, z0, x1, z1] = bounds;
  const w = x1 - x0 + 60, d = z1 - z0 + 60;
  const mat = new THREE.ShaderMaterial({
    transparent: false,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, fogColor: { value: new THREE.Color() }, fogDensity: { value: 0 } },
    vertexShader: `varying vec2 vW; varying float vDepth;
      void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vW = wp.xz; vec4 mv = viewMatrix * wp; vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform float uTime; uniform vec3 uColor; varying vec2 vW; varying float vDepth;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
      void main(){
        vec2 p = vW * 0.6;
        float w = n(p + vec2(uTime*0.3, uTime*0.2)) * 0.6 + n(p*2.3 - vec2(uTime*0.4, 0.0)) * 0.4;
        vec3 c = uColor * (0.55 + w * 0.6);
        float sp = smoothstep(0.93, 1.0, n(p*6.0 + uTime*0.8));
        c += vec3(0.6, 0.8, 1.0) * sp * 0.8;
        float fog = 1.0 - exp(-vDepth * 0.04);
        gl_FragColor = vec4(mix(c, uColor * 0.2, fog), 1.0);
      }`,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  m.userData.update = (dt, t) => { mat.uniforms.uTime.value = t; };
  return m;
}

function lavaPlane(bounds, y = -0.8) {
  const [x0, z0, x1, z1] = bounds;
  const w = x1 - x0 + 60, d = z1 - z0 + 60;
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec2 vW; void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vW = wp.xz; gl_Position = projectionMatrix * viewMatrix * wp; }`,
    fragmentShader: `uniform float uTime; varying vec2 vW;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
      void main(){
        vec2 p = vW * 0.35;
        float a = n(p + vec2(uTime*0.05, uTime*0.08));
        float b = n(p*2.7 - vec2(uTime*0.12, 0.0));
        float v = a*0.6 + b*0.4;
        vec3 c = mix(vec3(0.5,0.05,0.0), vec3(1.6,0.55,0.1), smoothstep(0.35, 0.75, v));
        c = mix(c, vec3(2.2,1.4,0.4), smoothstep(0.78, 0.95, v));
        gl_FragColor = vec4(c, 1.0);
      }`,
    toneMapped: false,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  m.userData.update = (dt, t) => { mat.uniforms.uTime.value = t; };
  return m;
}

// ---------------------------------------------------------------------------
export class Room {
  constructor(def, world) {
    this.def = def;
    this.world = world;
    this.theme = THEMES[def.theme] || THEMES.hollows;
    this.group = new THREE.Group();
    this.colliders = [];
    this.props = new Map();
    this.updates = [];
    this.interactables = [];
    this.rects = def.floor;
    this.build();
  }

  build() {
    const def = this.def, th = this.theme, g = this.group;
    const { bounds, edges } = computeEdges(def.floor);
    this.bounds = bounds;
    this.edges = edges;
    const edgeStyle = def.edge ?? th.edgeStyle ?? (th.lava || def.platform ? 'platform' : 'walls');

    // floor
    const floorGeos = def.floor.map(([x0, z0, x1, z1]) => {
      const geo = new THREE.BoxGeometry(x1 - x0, 0.2, z1 - z0);
      geo.translate((x0 + x1) / 2, -0.1, (z0 + z1) / 2);
      return worldUV(geo, th.floorTile ?? 3);
    });
    const floorMat = def.floorMat ? def.floorMat() : th.floor();
    if (floorMat.map) { floorMat.map.repeat.set(1, 1); floorMat.map.needsUpdate = true; }
    const floor = new THREE.Mesh(mergeGeometries(floorGeos), floorMat);
    floor.receiveShadow = true;
    g.add(floor);

    // outdoor ground extends past the playable floor
    if (th.outdoor) {
      const [x0, z0, x1, z1] = bounds;
      const geo = worldUV(new THREE.BoxGeometry(x1 - x0 + 50, 0.2, z1 - z0 + 50), th.floorTile ?? 6);
      geo.translate((x0 + x1) / 2, -0.12, (z0 + z1) / 2);
      const ground = new THREE.Mesh(geo, floorMat);
      ground.receiveShadow = true;
      g.add(ground);
    }

    // walls
    if (edgeStyle === 'walls' && th.wall) {
      const H = def.wallH ?? th.wallH;
      const low = def.southWall ?? 0.35;
      const geos = [];
      const tops = [];
      for (const e of edges) {
        const h = e.side === 's' ? low : H;
        if (h <= 0) continue;
        let geo;
        if (e.side === 'n' || e.side === 's') {
          geo = new THREE.BoxGeometry(e.len + 1, h, 0.5);
          geo.translate(e.x + e.len / 2, h / 2, e.z + (e.side === 'n' ? -0.25 : 0.25));
        } else {
          geo = new THREE.BoxGeometry(0.5, h, e.len);
          geo.translate(e.x + (e.side === 'w' ? -0.25 : 0.25), h / 2, e.z + e.len / 2);
        }
        geos.push(worldUV(geo, th.wallTile ?? 3));
        if (e.side !== 's') {
          const cap = e.side === 'n' ? new THREE.BoxGeometry(e.len + 1.04, 0.1, 0.54) : new THREE.BoxGeometry(0.54, 0.1, e.len + 0.04);
          cap.translate(e.side === 'n' ? e.x + e.len / 2 : e.x + (e.side === 'w' ? -0.25 : 0.25), h + 0.05, e.side === 'n' ? e.z - 0.25 : e.z + e.len / 2);
          tops.push(cap);
        }
      }
      if (geos.length) {
        const wallMat = def.wallMat ? def.wallMat() : th.wall();
        const walls = new THREE.Mesh(mergeGeometries(geos), wallMat);
        walls.castShadow = true;
        walls.receiveShadow = true;
        g.add(walls);
      }
      if (tops.length) g.add(new THREE.Mesh(mergeGeometries(tops), toon(th.wallTop)));
    } else if (edgeStyle === 'trees') {
      treeEdges(g, edges, def.snow !== false);
      // snowbanks
      const bank = lit('#f4f8ff', { map: tex.snow() });
      for (const e of edges) {
        if (e.side === 's') continue;
        const len = e.len;
        const geo = new THREE.CylinderGeometry(0.5, 0.7, len + 1, 8, 1);
        geo.rotateZ(Math.PI / 2);
        if (e.side !== 'n') geo.rotateY(Math.PI / 2);
        const m = new THREE.Mesh(geo, bank);
        m.scale.y = 0.6;
        const cx = e.side === 'n' ? e.x + len / 2 : e.x + (e.side === 'w' ? -0.4 : 0.4);
        const cz = e.side === 'n' ? e.z - 0.4 : e.z + len / 2;
        m.position.set(cx, 0, cz);
        m.receiveShadow = true;
        g.add(m);
      }
    } else if (edgeStyle === 'platform') {
      const skirt = [];
      for (const e of edges) {
        let geo;
        if (e.side === 'n' || e.side === 's') {
          geo = new THREE.BoxGeometry(e.len, 3, 0.3);
          geo.translate(e.x + e.len / 2, -1.6, e.z + (e.side === 'n' ? 0.15 : -0.15));
        } else {
          geo = new THREE.BoxGeometry(0.3, 3, e.len);
          geo.translate(e.x + (e.side === 'w' ? 0.15 : -0.15), -1.6, e.z + e.len / 2);
        }
        skirt.push(worldUV(geo, 3));
      }
      if (skirt.length) {
        const m = new THREE.Mesh(mergeGeometries(skirt), th.wall ? th.wall() : lit('#3a3a44'));
        m.receiveShadow = true;
        g.add(m);
      }
    }

    if (th.decorate && edgeStyle === 'walls') th.decorate(def, g, edges);
    if (th.water || def.water) {
      const w = waterPlane(bounds, def.water || th.water);
      g.add(w);
      this.updates.push(w.userData.update);
    }
    if (th.lava || def.lava) {
      const l = lavaPlane(bounds);
      g.add(l);
      this.updates.push(l.userData.update);
      const glowLight = new THREE.HemisphereLight('#000000', '#ff5a1a', 0.8);
      g.add(glowLight);
    }
    if (th.ceilingStars || def.stars) {
      const [x0, z0, x1, z1] = bounds;
      const stars = new ParticleField('spores', { min: new THREE.Vector3(x0 - 6, 9, z0 - 6), max: new THREE.Vector3(x1 + 6, 12, z1 + 3) }, 260, { color: '#bfe4ff', vel: [0, 0, 0], drift: 0, size: [6, 14] });
      g.add(stars.points);
      this.updates.push((dt) => stars.update(dt));
      this.disposables = [stars];
    }

    // lighting
    const hemi = new THREE.HemisphereLight(th.hemi[0], th.hemi[1], def.hemi ?? th.hemi[2]);
    g.add(hemi);
    const sunDef = def.sun ?? th.sun;
    if (sunDef) {
      const [col, inten, dir] = sunDef;
      const sun = new THREE.DirectionalLight(col, inten);
      const [x0, z0, x1, z1] = bounds;
      const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
      sun.position.set(cx + dir[0], dir[1], cz + dir[2]);
      sun.target.position.set(cx, 0, cz);
      sun.castShadow = true;
      const size = Math.max(x1 - x0, z1 - z0) / 2 + 4;
      sun.shadow.camera.left = -size; sun.shadow.camera.right = size;
      sun.shadow.camera.top = size; sun.shadow.camera.bottom = -size;
      sun.shadow.camera.near = 1; sun.shadow.camera.far = 60;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.bias = -0.0006;
      sun.shadow.normalBias = 0.03;
      g.add(sun, sun.target);
    }
    for (const l of def.lights || []) {
      const pl = new THREE.PointLight(l.color ?? '#ffffff', l.i ?? 3, l.d ?? 8, 2);
      pl.position.set(l.x, l.y ?? 2.5, l.z);
      g.add(pl);
    }

    // particles
    const kind = def.particles !== undefined ? def.particles : th.particles;
    if (kind) {
      const [x0, z0, x1, z1] = bounds;
      const count = Math.min(600, Math.floor((x1 - x0 + 8) * (z1 - z0 + 8) * (kind === 'snow' ? 1.6 : 0.6)));
      this.particles = new ParticleField(kind, { min: new THREE.Vector3(x0 - 4, 0, z0 - 4), max: new THREE.Vector3(x1 + 4, kind === 'snow' ? 9 : 5, z1 + 4) }, count);
      g.add(this.particles.points);
    }

    // props
    for (const p of def.props || []) this.addProp(p);
    if (def.build) def.build(g, this);
  }

  addProp(p) {
    if (p.when && !p.when()) return null;
    const made = makeProp(p);
    this.group.add(made.obj);
    if (made.collider) {
      made.collider.prop = p.id;
      this.colliders.push(made.collider);
    }
    if (made.obj.userData.update) this.updates.push(made.obj.userData.update);
    const entry = { ...made, id: p.id };
    if (p.id) this.props.set(p.id, entry);
    if (p.text || p.run || p.t === 'save') {
      this.interactables.push({ x: p.x, z: p.z, r: p.reach ?? 1.3, text: p.text, run: p.run, save: p.t === 'save', prop: entry, def: p });
    }
    return entry;
  }

  removeProp(id) {
    const e = this.props.get(id);
    if (!e) return;
    this.group.remove(e.obj);
    this.colliders = this.colliders.filter((c) => c.prop !== id);
    this.interactables = this.interactables.filter((i) => i.prop !== e);
    this.props.delete(id);
  }

  setSolid(id, solid) {
    const e = this.props.get(id);
    if (!e || !e.collider) return;
    const has = this.colliders.includes(e.collider);
    if (solid && !has) this.colliders.push(e.collider);
    if (!solid && has) this.colliders = this.colliders.filter((c) => c !== e.collider);
  }

  // ---- collision ----
  inFloor(x, z) {
    for (const [x0, z0, x1, z1] of this.rects) if (x >= x0 && x <= x1 && z >= z0 && z <= z1) return true;
    return false;
  }

  blocked(x, z, r, ignore) {
    const pts = [[x, z], [x - r, z], [x + r, z], [x, z - r], [x, z + r], [x - r * 0.7, z - r * 0.7], [x + r * 0.7, z - r * 0.7], [x - r * 0.7, z + r * 0.7], [x + r * 0.7, z + r * 0.7]];
    for (const [px, pz] of pts) if (!this.inFloor(px, pz)) return true;
    for (const c of this.colliders) {
      if (c === ignore) continue;
      if (c.type === 'c') {
        const dx = x - c.x, dz = z - c.z;
        if (dx * dx + dz * dz < (c.r + r) * (c.r + r)) return true;
      } else if (x + r > c.x0 && x - r < c.x1 && z + r > c.z0 && z - r < c.z1) return true;
    }
    return false;
  }

  update(dt, t) {
    for (const u of this.updates) u(dt, t);
    if (this.particles) this.particles.update(dt);
  }

  dispose() {
    this.particles?.dispose();
    for (const d of this.disposables || []) d.dispose();
    this.group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
    });
  }
}
