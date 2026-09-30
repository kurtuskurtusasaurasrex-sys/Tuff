// Renderer + post-processing chain. One composer; scenes swap in and out.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uVignette: { value: 0.35 },
    uTint: { value: new THREE.Vector3(1, 1, 1) },
    uSaturation: { value: 1.05 },
    uContrast: { value: 1.04 },
    uFade: { value: 0 },
    uFadeColor: { value: new THREE.Vector3(0, 0, 0) },
    uGrain: { value: 0.035 },
    uAberration: { value: 0.0012 },
    uPixel: { value: 0 },
    uFlash: { value: 0 },
    uWarp: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime, uVignette, uSaturation, uContrast, uFade, uGrain, uAberration, uPixel, uFlash, uWarp;
    uniform vec2 uRes;
    uniform vec3 uTint, uFadeColor;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec2 uv = vUv;
      if (uWarp > 0.0) {
        uv.x += sin(uv.y * 40.0 + uTime * 6.0) * 0.004 * uWarp;
        uv.y += cos(uv.x * 30.0 + uTime * 4.0) * 0.003 * uWarp;
      }
      if (uPixel > 1.0) {
        vec2 px = uPixel / uRes;
        uv = (floor(uv / px) + 0.5) * px;
      }
      vec2 dir = uv - 0.5;
      float ab = uAberration * (0.5 + length(dir) * 2.0);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + dir * ab).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - dir * ab).b;
      col *= uTint;
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l), col, uSaturation);
      col = (col - 0.5) * uContrast + 0.5;
      float v = smoothstep(0.95, 0.25, length(dir * vec2(1.0, 0.85)));
      col *= mix(1.0, v, uVignette);
      col += (hash(uv * uRes + fract(uTime) * 91.0) - 0.5) * uGrain;
      col = mix(col, vec3(1.0), uFlash);
      col = mix(col, uFadeColor, uFade);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `,
};

export class Engine {
  constructor(container) {
    this.container = container;
    this.quality = 1;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.id = 'gl';
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 400);

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.55, 0.5, 0.82);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.grade = new ShaderPass(GradeShader);
    this.composer.addPass(this.grade);

    this.post = this.grade.uniforms;
    this.shakeAmt = 0;
    this.shakeTime = 0;

    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  setQuality(q) {
    this.quality = q;
    const pr = Math.min(window.devicePixelRatio || 1, 2) * (q === 0 ? 0.6 : q === 1 ? 1 : 1);
    this.renderer.setPixelRatio(pr);
    this.renderer.shadowMap.enabled = q > 0;
    this.bloom.enabled = q > 0;
    this.resize();
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.width = w; this.height = h;
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
    this.bloom.setSize(Math.floor(w / 2), Math.floor(h / 2));
    const pr = this.renderer.getPixelRatio();
    this.post.uRes.value.set(w * pr, h * pr);
    this.updateCamera(this.camera);
  }

  updateCamera(cam) {
    if (!cam) return;
    cam.aspect = this.width / this.height;
    // Keep the 16:9 framing visible on tall screens by widening the fov.
    const base = cam.userData.baseFov || cam.fov;
    cam.userData.baseFov = base;
    if (cam.aspect < 16 / 9) {
      const t = Math.tan((base * Math.PI) / 360) * (16 / 9) / cam.aspect;
      cam.fov = (Math.atan(t) * 360) / Math.PI;
    } else cam.fov = base;
    cam.updateProjectionMatrix();
  }

  setView(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.renderPass.scene = scene;
    this.renderPass.camera = camera;
    this.updateCamera(camera);
  }

  shake(amount, time = 0.3) {
    this.shakeAmt = Math.max(this.shakeAmt, amount);
    this.shakeTime = Math.max(this.shakeTime, time);
  }

  render(dt, t) {
    this.post.uTime.value = t;
    const cam = this.camera;
    let ox = 0, oy = 0;
    if (this.shakeTime > 0) {
      this.shakeTime -= dt;
      const a = this.shakeAmt * Math.max(0, Math.min(1, this.shakeTime * 4));
      ox = (Math.random() - 0.5) * a;
      oy = (Math.random() - 0.5) * a;
      cam.position.x += ox; cam.position.y += oy;
    } else this.shakeAmt = 0;
    this.composer.render(dt);
    cam.position.x -= ox; cam.position.y -= oy;
  }
}
