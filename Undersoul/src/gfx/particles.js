// GPU point particles: ambient fields (dust, snow, embers, spores) and
// one-shot bursts (sparkles, dust clouds).
import * as THREE from 'three';

const vert = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  uniform float uScale;
  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;
const frag = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  uniform float uSoft;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = mix(1.0, smoothstep(0.5, 0.0, d), uSoft);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

// Shared by every particle material; the engine sets it on resize so point
// sizes stay consistent across resolutions.
export const particleScale = { value: 10 };

function makeMaterial(additive, soft) {
  return new THREE.ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms: { uScale: particleScale, uSoft: { value: soft } },
    transparent: true,
    depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
}

const PRESETS = {
  dust: { color: '#fff2c8', size: [4, 10], alpha: [0.2, 0.6], vel: [0.05, 0.05, 0.05], additive: true, drift: 0.3 },
  snow: { color: '#ffffff', size: [5, 12], alpha: [0.5, 0.95], vel: [0.2, -0.9, 0.1], additive: false, drift: 0.6 },
  embers: { color: '#ff8a2a', size: [4, 9], alpha: [0.5, 1], vel: [0.05, 0.6, 0.05], additive: true, drift: 0.5, flicker: true },
  spores: { color: '#6ad8ff', size: [5, 11], alpha: [0.3, 0.9], vel: [0.05, 0.12, 0.05], additive: true, drift: 0.4, flicker: true },
  leaves: { color: '#ff5a2a', size: [8, 14], alpha: [0.7, 1], vel: [0.25, -0.4, 0.1], additive: false, drift: 0.8 },
  fireflies: { color: '#d8ff6a', size: [5, 10], alpha: [0.3, 1], vel: [0.1, 0.05, 0.1], additive: true, drift: 1, flicker: true },
  ash: { color: '#8a8a8a', size: [4, 8], alpha: [0.3, 0.7], vel: [0.1, -0.3, 0.05], additive: false, drift: 0.4 },
  gold: { color: '#ffd76a', size: [4, 9], alpha: [0.3, 0.9], vel: [0.03, 0.08, 0.03], additive: true, drift: 0.3, flicker: true },
};

export class ParticleField {
  constructor(kind, box, count = 300, opts = {}) {
    const p = { ...PRESETS[kind], ...opts };
    this.p = p;
    this.box = box; // {min: Vector3, max: Vector3}
    this.count = count;
    const geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(count * 3);
    this.vel = new Float32Array(count * 3);
    this.size = new Float32Array(count);
    this.alpha = new Float32Array(count);
    this.base = new Float32Array(count);
    this.col = new Float32Array(count * 3);
    this.phase = new Float32Array(count);
    const c = new THREE.Color(p.color);
    const c2 = p.color2 ? new THREE.Color(p.color2) : c;
    for (let i = 0; i < count; i++) {
      this.pos[i * 3] = THREE.MathUtils.lerp(box.min.x, box.max.x, Math.random());
      this.pos[i * 3 + 1] = THREE.MathUtils.lerp(box.min.y, box.max.y, Math.random());
      this.pos[i * 3 + 2] = THREE.MathUtils.lerp(box.min.z, box.max.z, Math.random());
      this.vel[i * 3] = (Math.random() - 0.5) * 2 * p.vel[0];
      this.vel[i * 3 + 1] = p.vel[1] * (0.6 + Math.random() * 0.8) + (Math.random() - 0.5) * 0.05;
      this.vel[i * 3 + 2] = (Math.random() - 0.5) * 2 * p.vel[2];
      this.size[i] = THREE.MathUtils.lerp(p.size[0], p.size[1], Math.random());
      this.base[i] = THREE.MathUtils.lerp(p.alpha[0], p.alpha[1], Math.random());
      this.alpha[i] = this.base[i];
      const mix = Math.random();
      this.col[i * 3] = c.r + (c2.r - c.r) * mix;
      this.col[i * 3 + 1] = c.g + (c2.g - c.g) * mix;
      this.col[i * 3 + 2] = c.b + (c2.b - c.b) * mix;
      this.phase[i] = Math.random() * 100;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3));
    this.geo = geo;
    this.points = new THREE.Points(geo, makeMaterial(p.additive, 1));
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    this.t = 0;
  }

  update(dt) {
    this.t += dt;
    const { min, max } = this.box;
    const p = this.p;
    const pos = this.pos, vel = this.vel;
    for (let i = 0; i < this.count; i++) {
      const k = i * 3;
      const ph = this.phase[i];
      pos[k] += (vel[k] + Math.sin(this.t * 0.7 + ph) * p.drift * 0.2) * dt;
      pos[k + 1] += vel[k + 1] * dt;
      pos[k + 2] += (vel[k + 2] + Math.cos(this.t * 0.6 + ph) * p.drift * 0.2) * dt;
      if (pos[k + 1] < min.y) pos[k + 1] = max.y;
      if (pos[k + 1] > max.y) pos[k + 1] = min.y;
      if (pos[k] < min.x) pos[k] = max.x;
      if (pos[k] > max.x) pos[k] = min.x;
      if (pos[k + 2] < min.z) pos[k + 2] = max.z;
      if (pos[k + 2] > max.z) pos[k + 2] = min.z;
      if (p.flicker) this.alpha[i] = this.base[i] * (0.55 + 0.45 * Math.sin(this.t * 2.5 + ph * 3));
    }
    this.geo.attributes.position.needsUpdate = true;
    if (p.flicker) this.geo.attributes.aAlpha.needsUpdate = true;
  }

  dispose() {
    this.geo.dispose();
    this.points.material.dispose();
  }
}

// Short-lived bursts, e.g. a monster turning to dust.
export class Burst {
  constructor(origin, opts = {}) {
    const n = opts.count ?? 80;
    this.n = n;
    this.life = opts.life ?? 1.4;
    this.t = 0;
    this.gravity = opts.gravity ?? -0.4;
    const geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(n * 3);
    this.vel = new Float32Array(n * 3);
    this.size = new Float32Array(n);
    this.alpha = new Float32Array(n);
    this.col = new Float32Array(n * 3);
    const c = new THREE.Color(opts.color ?? '#ffffff');
    const spread = opts.spread ?? [0.5, 0.8, 0.5];
    const speed = opts.speed ?? 1.5;
    for (let i = 0; i < n; i++) {
      const src = opts.from ? opts.from(i) : origin;
      this.pos[i * 3] = src.x + (Math.random() - 0.5) * spread[0];
      this.pos[i * 3 + 1] = src.y + (Math.random() - 0.5) * spread[1];
      this.pos[i * 3 + 2] = src.z + (Math.random() - 0.5) * spread[2];
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() * (opts.up ?? 0.8), Math.random() - 0.5).normalize();
      this.vel[i * 3] = dir.x * speed * Math.random() + (opts.wind ?? 0);
      this.vel[i * 3 + 1] = dir.y * speed * Math.random();
      this.vel[i * 3 + 2] = dir.z * speed * Math.random();
      this.size[i] = (opts.size ?? 8) * (0.5 + Math.random());
      this.alpha[i] = 1;
      this.col[i * 3] = c.r; this.col[i * 3 + 1] = c.g; this.col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3));
    this.geo = geo;
    this.points = new THREE.Points(geo, makeMaterial(opts.additive ?? true, 1));
    this.points.frustumCulled = false;
    this.points.renderOrder = 6;
    this.done = false;
  }
  update(dt) {
    this.t += dt;
    const k = Math.max(0, 1 - this.t / this.life);
    for (let i = 0; i < this.n; i++) {
      this.vel[i * 3 + 1] += this.gravity * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      this.alpha[i] = k;
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.aAlpha.needsUpdate = true;
    if (this.t >= this.life) {
      this.done = true;
      this.points.parent?.remove(this.points);
      this.geo.dispose();
      this.points.material.dispose();
    }
  }
}
