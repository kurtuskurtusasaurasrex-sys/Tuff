/* ==== p74_fireworks.js ==== */
/* FIREWORKS — every night between nine and half past eleven the harbour puts on a show over the bay: rockets whistle
   up on sparkling trails and burst into peonies, rings, gold willows, crackling crossettes and — of course — the odd
   2×4 BRICK drawn in sparks, studs and all.  Finish a quest and a volley goes up over your head (day or night), and
   the fireworks crate on the quay launches a salvo for 10 studs.  Bursts light up the island for a moment.
   API: FIREWORKS.launch(x, z, o) · FIREWORKS.volley(x, z, n) */
const FIREWORKS = (() => {
  const off = BA.flag('test') || /[?&]islandgp(?=&|=|$)/.test(location.search);
  const MAX = 3600;
  const S = { n: 0, pts: null, showT: 0, glow: 0, crate: null, cratePos: null, launched: 0 };
  const px = new Float32Array(MAX), py = new Float32Array(MAX), pz = new Float32Array(MAX), vx = new Float32Array(MAX), vy = new Float32Array(MAX), vz = new Float32Array(MAX);
  const cr = new Float32Array(MAX), cg = new Float32Array(MAX), cb = new Float32Array(MAX), life = new Float32Array(MAX), age = new Float32Array(MAX), size = new Float32Array(MAX), drag = new Float32Array(MAX), grav = new Float32Array(MAX), kind = new Uint8Array(MAX), bt = new Uint8Array(MAX), trailT = new Float32Array(MAX);
  const PAL = [[3.2, 0.35, 0.25], [3.2, 2.4, 0.3], [0.45, 1.0, 3.4], [0.5, 3.0, 0.7], [3.0, 3.0, 3.0], [2.2, 0.6, 3.2], [3.4, 1.3, 0.2], [0.4, 2.6, 3.0]];
  const TYPES = ['peony', 'peony', 'ring', 'willow', 'crossette', 'brick', 'peony', 'ring'];
  function add(x, y, z, ux, uy, uz, c, L, sz, dr, gr, k, b = 0) {
    if (S.n >= MAX) return -1; const i = S.n++;
    px[i] = x; py[i] = y; pz[i] = z; vx[i] = ux; vy[i] = uy; vz[i] = uz; cr[i] = c[0]; cg[i] = c[1]; cb[i] = c[2]; life[i] = L; age[i] = 0; size[i] = sz; drag[i] = dr; grav[i] = gr; kind[i] = k; bt[i] = b; trailT[i] = 0; return i;
  }
  function kill(i) { const j = --S.n; if (i === j) return; px[i] = px[j]; py[i] = py[j]; pz[i] = pz[j]; vx[i] = vx[j]; vy[i] = vy[j]; vz[i] = vz[j]; cr[i] = cr[j]; cg[i] = cg[j]; cb[i] = cb[j]; life[i] = life[j]; age[i] = age[j]; size[i] = size[j]; drag[i] = drag[j]; grav[i] = grav[j]; kind[i] = kind[j]; bt[i] = bt[j]; trailT[i] = trailT[j]; }

  /* a rocket: kind 1, bt = burst type index, colour = its burst colour */
  function launch(x, z, o = {}) {
    if (off || !S.pts) return;
    const y0 = (o.y !== undefined ? o.y : Math.max(0, WORLD.y(x, z))) + 0.5, h = o.h || 52 + Math.random() * 26, t = 1.6 + Math.random() * 0.5;
    const c = o.col || PAL[Math.floor(Math.random() * PAL.length)], type = o.type !== undefined ? o.type : TYPES[Math.floor(Math.random() * TYPES.length)];
    add(x, y0, z, (Math.random() - 0.5) * 3, h / t + 5.5 * t * 0.5, (Math.random() - 0.5) * 3, c, t, 0.7, 0, 5.5, 1, TYPES.indexOf(type) >= 0 ? TYPES.indexOf(type) : 0);
    DLX.sfx('launch', { x, y: y0, z, r: 60, max: 400 });
    S.launched++;
  }
  const _r = new THREE.Vector3(), _u = new THREE.Vector3(0, 1, 0), _f = new THREE.Vector3();
  function burst(i) {
    const x = px[i], y = py[i], z = pz[i], c = [cr[i], cg[i], cb[i]], type = TYPES[bt[i]] || 'peony';
    const c2 = PAL[Math.floor(Math.random() * PAL.length)];
    if (type === 'peony') { const n = 110, sp = 15 + Math.random() * 4; for (let k = 0; k < n; k++) { const u = Math.random() * 2 - 1, a = Math.random() * M.TAU, s = Math.sqrt(1 - u * u), v = sp * (0.85 + Math.random() * 0.3); add(x, y, z, Math.cos(a) * s * v, u * v, Math.sin(a) * s * v, k % 5 === 0 ? c2 : c, 1.5 + Math.random() * 0.7, 0.6, 1.5, 6, 0); } }
    else if (type === 'ring') { const n = 80, sp = 17; const ax = new THREE.Vector3(Math.random() - 0.5, Math.random() * 0.6, Math.random() - 0.5).normalize(); const b1 = new THREE.Vector3().crossVectors(ax, _u).normalize(); const b2 = new THREE.Vector3().crossVectors(ax, b1); for (let k = 0; k < n; k++) { const a = k / n * M.TAU, dx = b1.x * Math.cos(a) + b2.x * Math.sin(a), dy = b1.y * Math.cos(a) + b2.y * Math.sin(a), dz = b1.z * Math.cos(a) + b2.z * Math.sin(a); add(x, y, z, dx * sp, dy * sp, dz * sp, c, 1.7, 0.65, 1.3, 5, 0); } for (let k = 0; k < 14; k++) add(x, y, z, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, c2, 1.2, 0.8, 1, 3, 0); }
    else if (type === 'willow') { const n = 120, gold = [3.2, 2.0, 0.55]; for (let k = 0; k < n; k++) { const u = Math.random() * 2 - 1, a = Math.random() * M.TAU, s = Math.sqrt(1 - u * u), v = 12 + Math.random() * 3; add(x, y, z, Math.cos(a) * s * v, u * v + 2, Math.sin(a) * s * v, gold, 2.8 + Math.random() * 0.8, 0.5, 2.2, 7.5, 2); } }
    else if (type === 'crossette') { for (let k = 0; k < 14; k++) { const u = Math.random() * 2 - 1, a = Math.random() * M.TAU, s = Math.sqrt(1 - u * u), v = 13; add(x, y, z, Math.cos(a) * s * v, u * v, Math.sin(a) * s * v, c, 0.7 + Math.random() * 0.2, 0.8, 0.8, 5, 3); } }
    else if (type === 'brick') {
      // a 2x4 brick in sparks, facing the camera: the body outline, four studs on top
      const cam = GFX.camera; _f.subVectors(cam.position, new THREE.Vector3(x, y, z)).setY(0).normalize(); _r.crossVectors(_u, _f).normalize();
      const pts = [], W = 4, Hh = 1.2, per = (a, b, n) => { for (let k = 0; k < n; k++) pts.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]); };
      per([-W / 2, -Hh / 2], [W / 2, -Hh / 2], 22); per([W / 2, -Hh / 2], [W / 2, Hh / 2], 8); per([W / 2, Hh / 2], [-W / 2, Hh / 2], 22); per([-W / 2, Hh / 2], [-W / 2, -Hh / 2], 8);
      for (let s = 0; s < 4; s++) { const cx = -1.5 + s; for (let k = 0; k < 9; k++) { const a = Math.PI * k / 8; pts.push([cx + Math.cos(a) * 0.3, Hh / 2 + 0.05 + Math.sin(a) * 0.28]); } }
      const col = [3.4, 0.5, 0.3], sc = 4.2;
      for (const [a, b] of pts) add(x, y, z, _r.x * a * sc, b * sc + 0.5, _r.z * a * sc, col, 1.9, 0.75, 1.2, 1.2, 0);
      for (let k = 0; k < 24; k++) add(x, y, z, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, [3, 2.8, 2.4], 0.8, 0.6, 1, 4, 0);
    }
    S.glow = Math.min(1.4, S.glow + 0.8);
    const cam = GFX.camera.position, d = Math.hypot(x - cam.x, y - cam.y, z - cam.z);
    DLX.sfx('firework', { x, y, z, r: 70, max: 600, delay: Math.min(2.2, d / 170) });
  }
  function volley(x, z, n = 5, o = {}) { for (let k = 0; k < n; k++) setTimeout(() => launch(x + (Math.random() - 0.5) * (o.spread || 10), z + (Math.random() - 0.5) * (o.spread || 10), { y: o.y, h: o.h }), k * (o.gap || 380)); }

  /* the particles: one Points object, additive, drawn with a soft glow */
  BA.build('fireworks', 93, (scene) => {
    if (off) return;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX * 3), 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aCol', new THREE.BufferAttribute(new Float32Array(MAX * 3), 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(MAX), 1).setUsage(THREE.DynamicDrawUsage));
    S.U = { uScale: { value: 500 } };
    const mat = new THREE.ShaderMaterial({ uniforms: S.U, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
      vertexShader: `attribute vec3 aCol; attribute float aSize; uniform float uScale; varying vec3 vC; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = clamp(aSize * 1.5 * uScale / max(-mv.z, 0.5), 2.0, 72.0); vC = aCol; }`,
      fragmentShader: `varying vec3 vC; void main(){ vec2 q = gl_PointCoord * 2.0 - 1.0; float r = dot(q, q); if (r > 1.0) discard; float a = exp(-r * 3.5); gl_FragColor = vec4(vC * a, 1.0); }` });
    S.pts = new THREE.Points(g, mat); S.pts.frustumCulled = false; S.pts.renderOrder = 7; S.pts.name = 'fireworks'; scene.add(S.pts);
    // the crate on the quay
    const hb = LAYOUT.P.harbor; S.cratePos = DLX.openSpot(hb[0] - 6, hb[1] - 4, 2.5);
    S.crate = DLX.model('fireworks crate', (b) => {
      b.box(-1, 0, -1, 3, 3, 2, 'red'); b.plate(-1, 3, -1, 3, 2, 'yellow');
      for (let k = 0; k < 3; k++) { b.tpl('cyl', -0.5 + k, 4, 0, ['blue', 'white', 'green'][k], { sx: 0.35, sz: 0.35, sy: 1.5 }); b.tpl('cone', -0.5 + k, 7.6, 0, 'red', { sx: 0.45, sz: 0.45, sy: 0.5 }); }
      b.box(-1, 1, 1, 3, 1, 1, 'yellow', 0);
    });
    S.crate.position.set(S.cratePos[0], S.cratePos[1], S.cratePos[2]); scene.add(S.crate);
    GAME.interact.add({ id: 'fireworks', pos: () => S.cratePos, r: 3.6, label: 'Launch fireworks! (10 studs)', act: () => {
      if (GAME.save.studs < 10) { DLX.pop('Not enough studs', 'Fireworks cost 10 studs', { icon: '!', col: '#e0e0e0' }); return; }
      GAME.addStuds(-10); GAME.flag('fireworks', (GAME.flag('fireworks') || 0) + 1); volley(hb[0] + 4, hb[1] + 16, 7, { spread: 26, gap: 420, y: 0.5 }); } });
  });

  // quest done → a volley over your head
  if (!off && typeof GAME !== 'undefined') GAME.on('quest:done', () => { const p = GAME.playerPos(); if (p) setTimeout(() => volley(p[0], p[2], 5, { spread: 12, y: p[1], h: 34 }), 1200); });

  const Wd = new THREE.Vector3();
  BA.onUpdate('fireworks', 60, (t, dt) => {
    if (off || !S.pts) return;
    const inside = typeof INTERIOR !== 'undefined' && !!INTERIOR.cur;
    // the nightly show over the bay
    if (typeof DAYNIGHT !== 'undefined' && DAYNIGHT.S && !inside && DLX.play()) {
      const h = DAYNIGHT.S.hour % 24, hb = LAYOUT.P.harbor, L = DLX.here();
      if (h > 20.8 && h < 23.5 && DAYNIGHT.S.night > 0.6 && DAYNIGHT.S.W.rain < 0.3 && Math.hypot(L.x - hb[0], L.z - hb[1]) < 420) {
        S.showT -= dt; if (S.showT <= 0) { S.showT = 1.1 + Math.random() * 2.4; launch(hb[0] + (Math.random() - 0.5) * 60, hb[1] + 18 + Math.random() * 20, { y: 0.5 }); if (Math.random() < 0.2) setTimeout(() => launch(hb[0] + (Math.random() - 0.5) * 60, hb[1] + 20 + Math.random() * 16, { y: 0.5 }), 250); }
      }
    }
    // simulate
    for (let i = S.n - 1; i >= 0; i--) {
      age[i] += dt;
      if (age[i] >= life[i]) {
        if (kind[i] === 1) burst(i);
        else if (kind[i] === 3) { for (let k = 0; k < 5; k++) { const a = k / 5 * M.TAU + Math.random(); add(px[i], py[i], pz[i], Math.cos(a) * 7, (Math.random() - 0.3) * 6, Math.sin(a) * 7, [cr[i], cg[i], cb[i]], 0.9, 0.5, 1.2, 5, 0); } }
        kill(i); continue;
      }
      const dk = Math.exp(-drag[i] * dt); vx[i] *= dk; vy[i] *= dk; vz[i] *= dk; vy[i] -= grav[i] * dt;
      px[i] += vx[i] * dt; py[i] += vy[i] * dt; pz[i] += vz[i] * dt;
      if (kind[i] === 1 || kind[i] === 2) { trailT[i] -= dt; if (trailT[i] <= 0) { trailT[i] = kind[i] === 1 ? 0.018 : 0.06; add(px[i], py[i], pz[i], (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8 - 1, (Math.random() - 0.5) * 0.8, kind[i] === 1 ? [2.6, 1.6, 0.6] : [cr[i] * 0.6, cg[i] * 0.6, cb[i] * 0.6], kind[i] === 1 ? 0.45 : 0.7, 0.32, 2, 2, 0); } }
    }
    // upload
    const g = S.pts.geometry, P = g.attributes.position.array, C = g.attributes.aCol.array, Z = g.attributes.aSize.array;
    for (let i = 0; i < S.n; i++) {
      const k = age[i] / life[i], fade = kind[i] === 1 ? 1 : (1 - k * k) * (k > 0.7 ? (0.6 + 0.4 * Math.sin(age[i] * 40 + i)) : 1);
      P[i * 3] = px[i]; P[i * 3 + 1] = py[i]; P[i * 3 + 2] = pz[i]; C[i * 3] = cr[i] * fade; C[i * 3 + 1] = cg[i] * fade; C[i * 3 + 2] = cb[i] * fade; Z[i] = size[i] * (kind[i] === 0 ? 1 - k * 0.4 : 1);
    }
    g.attributes.position.needsUpdate = true; g.attributes.aCol.needsUpdate = true; g.attributes.aSize.needsUpdate = true; g.setDrawRange(0, S.n);
    S.U.uScale.value = GFX.H * 0.5 * GFX.camera.projectionMatrix.elements[5];
    S.pts.visible = !inside;
    // bursts light the island for a moment (on top of the day/night light, which is rewritten every frame)
    S.glow = Math.max(0, S.glow - dt * 2.2);
    if (S.glow > 0.01 && typeof DAYNIGHT !== 'undefined' && DAYNIGHT.S.built && !inside) GFX.hemiI += S.glow * 0.35 * DAYNIGHT.S.night;
    void Wd;
  });
  return { S, launch, volley };
})();
