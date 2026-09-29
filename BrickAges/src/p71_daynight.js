/* ==== p71_daynight.js ==== */
/* DAYNIGHT — the island keeps time.  The sun climbs out of the east, swings through the south and sets in the west
   (golden hour is the original look, frame for frame: 16:30); dusk turns the sky orange then deep blue, the moon comes
   up with its maria and a halo, the stars twinkle, and the island lights up: every street lamp throws a warm pool on
   the road, torches flicker, windows glow in the houses, fireflies drift over the meadows and the odd shooting star
   crosses the sky.  Nights pass twice as fast as days.
   WEATHER: clear spells, rain showers (the sky greys, streaks fall round you, the sea hisses), thunderstorms (lightning
   bolts on the horizon, the screen flashes, thunder rolls in after), snow, and a rainbow when a daytime shower clears.
   Settings: time of day (cycle / morning / noon / golden hour / sunset / night), day length, weather (auto or fixed).
   Title + creator keep the original golden hour; ?shot / ?test stay untouched unless ?tod=<hour> / ?wx=<kind> ask.
   API: DAYNIGHT.S (hour, night, sunEl, W{kind, cloud, rain, snow, rainbow}) · DAYNIGHT.set(hour) · DAYNIGHT.weather(kind) */
const DAYNIGHT = (() => {
  const harness = BA.flag('shot') || BA.flag('test');
  const off = /[?&]islandgp(?=&|=|$)/.test(location.search) || (harness && !BA.q.has('tod') && !BA.q.has('wx'));
  const S = { hour: 16.5, night: 0, sunEl: 33, mode: 'cycle', dayMin: 24, wxMode: 'auto', W: { kind: 'clear', left: 400, cloud: 0, rain: 0, snow: 0, rainbow: 0, rbT: 0, bolt: 0, nextBolt: 5 }, env: { t: -9, night: -1, el: -99, cloud: -1 }, lamps: [], panes: [], torches: [], built: false };
  const KEY = 'brickages.daynight.v1';
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s) { if (s.mode !== undefined) S.mode = s.mode; if (s.dayMin) S.dayMin = s.dayMin; if (s.wxMode) S.wxMode = s.wxMode; } } catch (e) { /* */ }
  const saveCfg = () => { try { localStorage.setItem(KEY, JSON.stringify({ mode: S.mode, dayMin: S.dayMin, wxMode: S.wxMode })); } catch (e) { /* */ } };
  if (harness) { S.mode = BA.q.has('tod') ? BA.num('tod', 16.5) : 16.5; S.wxMode = BA.str('wx', 'clear'); }
  if (S.wxMode !== 'auto' && ({ clear: 1, rain: 1, storm: 1, snow: 1 })[S.wxMode]) { S.W.kind = S.wxMode; S.W.left = 1e9; if (harness) { const k = { clear: [0, 0, 0], rain: [0.72, 0.75, 0], storm: [1, 1, 0], snow: [0.6, 0, 1] }[S.wxMode]; S.W.cloud = k[0]; S.W.rain = k[1]; S.W.snow = k[2]; } } else S.wxMode = 'auto';
  const sst = M.sstep, lerp = M.lerp;

  /* ---------------- where the sun and moon are (hour -> elevation, azimuth from south toward west, degrees) ---------- */
  const SUN = [[-3, -40, -150], [2.5, -34, -140], [4.5, -16, -118], [5.5, -6, -110], [6.2, 0, -104], [7.5, 12, -92], [9.5, 32, -68], [12.5, 58, 0], [14.5, 48, 27], [16.5, 33.02, 45.58], [18.0, 15, 66], [19.0, 3, 80], [19.8, -5, 92], [21, -16, 106], [23, -34, 135], [26.5, -40, 210], [28.5, -34, 220]];
  function path(K, h) {   // Catmull-Rom through the keys
    let i = 0; while (i < K.length - 2 && K[i + 1][0] <= h) i++;
    const p0 = K[Math.max(0, i - 1)], p1 = K[i], p2 = K[i + 1], p3 = K[Math.min(K.length - 1, i + 2)];
    const t = M.clamp((h - p1[0]) / (p2[0] - p1[0])), t2 = t * t, t3 = t2 * t;
    const cr = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
    return [cr(p0[1], p1[1], p2[1], p3[1]), cr(p0[2], p1[2], p2[2], p3[2])];
  }
  const sunAt = (h) => path(SUN, h < 4.5 ? h + 24 : h);
  function moonAt(h) { const mh = ((h - 19.3) % 24 + 24) % 24; const k = mh / 10.6; return k <= 1 ? [54 * Math.sin(Math.PI * k), -100 + 200 * k] : [-10 - 20 * Math.sin(Math.PI * (k - 1) / 1.26), 100]; }
  const dirOf = (el, az, out) => { const e = M.deg(el), a = M.deg(az); return out.set(-Math.cos(e) * Math.sin(a), Math.sin(e), Math.cos(e) * Math.cos(a)).normalize(); };

  /* ---------------- the light at each sun elevation (the 33.02° row is the original, untouched) ---------------- */
  const C = (r, g, b) => new THREE.Color(r, g, b), H = (x) => new THREE.Color().setHex(x);
  const KEYS = [
    // el     sunCol                 sunI  hemiI expo  zen                      hor                    glow                   fog     hemi sky      hemi ground
    [60, C(1.0, 0.96, 0.9), 3.6, 0.46, 0.97, C(0.07, 0.23, 0.72), C(0.6, 0.75, 0.93), C(0.28, 0.22, 0.14), 0.0014, H(0xaec8f7), H(0x7d6b4a)],
    [33.02, C(1.0, 0.86, 0.69), 3.35, 0.42, 1.0, C(0.082, 0.25, 0.7), C(0.62, 0.74, 0.9), C(0.45, 0.27, 0.12), 0.0016, H(0xa9c2f5), H(0x7d6b4a)],
    [16, C(1.0, 0.74, 0.5), 3.0, 0.4, 1.03, C(0.08, 0.21, 0.6), C(0.74, 0.72, 0.8), C(0.62, 0.32, 0.12), 0.0017, H(0xb4bde8), H(0x7d6a48)],
    [5, C(1.0, 0.58, 0.32), 2.5, 0.38, 1.08, C(0.09, 0.18, 0.48), C(0.84, 0.56, 0.44), C(0.95, 0.4, 0.12), 0.00145, H(0xc8a8c8), H(0x6e5a40)],
    [-1.5, C(0.95, 0.42, 0.22), 0.5, 0.32, 1.16, C(0.06, 0.1, 0.3), C(0.62, 0.37, 0.36), C(0.7, 0.22, 0.08), 0.0015, H(0x9a88b8), H(0x4a4038)],
    [-7, C(0.6, 0.5, 0.6), 0.0, 0.26, 1.28, C(0.03, 0.05, 0.17), C(0.2, 0.18, 0.32), C(0.18, 0.06, 0.04), 0.0018, H(0x5a6aa0), H(0x2a2622)],
    [-16, C(0.6, 0.7, 1.0), 0.0, 0.3, 1.42, C(0.02, 0.03, 0.1), C(0.08, 0.1, 0.2), C(0, 0, 0), 0.0015, H(0x4a5c98), H(0x221f1c)],
  ];
  const P = { sunCol: C(1, 1, 1), zen: C(0, 0, 0), hor: C(0, 0, 0), glow: C(0, 0, 0), hs: C(0, 0, 0), hg: C(0, 0, 0), sunI: 0, hemiI: 0, expo: 1, fog: 0.0016 };
  function params(el) {
    let i = 0; while (i < KEYS.length - 1 && KEYS[i + 1][0] >= el) i++;
    const a = KEYS[i], b = KEYS[Math.min(KEYS.length - 1, i + 1)];
    let t = a === b ? 0 : M.clamp((a[0] - el) / (a[0] - b[0])); t = t * t * (3 - 2 * t);
    P.sunCol.copy(a[1]).lerp(b[1], t); P.sunI = lerp(a[2], b[2], t); P.hemiI = lerp(a[3], b[3], t); P.expo = lerp(a[4], b[4], t);
    P.zen.copy(a[5]).lerp(b[5], t); P.hor.copy(a[6]).lerp(b[6], t); P.glow.copy(a[7]).lerp(b[7], t); P.fog = lerp(a[8], b[8], t); P.hs.copy(a[9]).lerp(b[9], t); P.hg.copy(a[10]).lerp(b[10], t);
    return P;
  }
  const MOONCOL = C(0.56, 0.67, 1.0), NZEN = C(0.008, 0.016, 0.05), NHOR = C(0.05, 0.075, 0.16), FZEN = C(0.02, 0.015, 0.05), FHOR = C(0.16, 0.09, 0.22);

  /* ---------------- night lights: hooks on the kit's lamps, torches and window panes (world builds only) ---------------- */
  const inStrip = (z) => z > SPREAD.HALF - 70;   // the interiors' studio strip (lit by its own rooms)
  if (!off && typeof KIT !== 'undefined') {
    const lamp0 = KIT.lamp, torch0 = KIT.torch, pane0 = KIT.pane;
    KIT.lamp = function (b, x, y, z, o = {}) { const r = lamp0.apply(this, arguments); try { if (b && b.ctx && b.ctx.mode === 'world') { const [wx, wz] = b.P(x + 0.5, z + 0.5); if (!inStrip(wz)) S.lamps.push({ x: wx, z: wz, y: (b.oy + y + (o.h || 5) * 3 + 0.9) * BA.PLATE, col: o.col || 'tyellow' }); } } catch (e) { /* */ } return r; };
    KIT.torch = function (b, x, y, z) { const r = torch0.apply(this, arguments); try { if (b && b.ctx && b.ctx.mode === 'world') { const [wx, wz] = b.P(x + 0.5, z + 0.5); if (!inStrip(wz)) S.torches.push({ x: wx, z: wz, y: (b.oy + y + 3.4) * BA.PLATE }); } } catch (e) { /* */ } return r; };
    KIT.pane = function (b, x, y, z, w, hP, col = 'tclear') { const r = pane0.apply(this, arguments); try { if (b && b.ctx && b.ctx.mode === 'world' && (col === 'tclear' || col === 'tyellow' || col === 'tlblue')) { const a = b.P(x, z), c = b.P(x + w, z + 1); if (!inStrip(a[1])) S.panes.push({ x0: Math.min(a[0], c[0]), x1: Math.max(a[0], c[0]), z0: Math.min(a[1], c[1]), z1: Math.max(a[1], c[1]), y0: (b.oy + y) * BA.PLATE, y1: (b.oy + y + hP) * BA.PLATE, yellow: col === 'tyellow' }); } } catch (e) { /* */ } return r; };
  }

  /* ---------------- shaders ---------------- */
  const U = { uK: { value: 0 }, uTime: BA.U.uTime, uScale: { value: 400 } };
  const glowPts = (n, o = {}) => new THREE.ShaderMaterial({
    uniforms: Object.assign({ uK: o.uK || U.uK, uTime: BA.U.uTime, uScale: U.uScale }, o.uniforms || {}),
    vertexShader: `attribute vec3 aCol; attribute float aSize; attribute float aPh; uniform float uK; uniform float uScale; uniform float uTime; varying vec3 vC;
      void main(){ vec3 p = position; ${o.move || ''} vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
        float fl = ${o.flicker || '0.9 + 0.1 * sin(uTime * 7.0 + aPh * 6.2832)'}; gl_PointSize = clamp(aSize * uScale / max(-mv.z, 0.5), 0.0, 256.0); vC = aCol * uK * fl; }`,
    fragmentShader: `varying vec3 vC; void main(){ vec2 q = gl_PointCoord * 2.0 - 1.0; float r = dot(q, q); if (r > 1.0) discard; float a = exp(-r * ${o.fall || '5.0'}) - exp(-${o.fall || '5.0'}); gl_FragColor = vec4(vC * a, 1.0); }`,
    blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, depthTest: true,
  });
  function points(list, fn, mat) {
    const g = new THREE.BufferGeometry(), n = list.length, pos = new Float32Array(n * 3), col = new Float32Array(n * 3), sz = new Float32Array(n), ph = new Float32Array(n);
    list.forEach((it, i) => { const r = fn(it, i); pos.set(r.p, i * 3); col.set(r.c, i * 3); sz[i] = r.s; ph[i] = r.ph !== undefined ? r.ph : Math.random(); });
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aCol', new THREE.BufferAttribute(col, 3)); g.setAttribute('aSize', new THREE.BufferAttribute(sz, 1)); g.setAttribute('aPh', new THREE.BufferAttribute(ph, 1));
    const m = new THREE.Points(g, mat); m.frustumCulled = false; m.renderOrder = 5; return m;
  }
  // a warm pool of light on the ground under every lamp (additive, so it simply isn't there by day)
  const poolMat = new THREE.ShaderMaterial({
    uniforms: { uK: U.uK },
    vertexShader: `attribute vec3 aCol; varying vec2 vUv; varying vec3 vC; void main(){ vUv = uv; vC = aCol; vec4 p = vec4(position, 1.0);
      #ifdef USE_INSTANCING
      p = instanceMatrix * p;
      #endif
      gl_Position = projectionMatrix * modelViewMatrix * p; }`,
    fragmentShader: `uniform float uK; varying vec2 vUv; varying vec3 vC; void main(){ float r = length(vUv - 0.5) * 2.0; float a = pow(max(0.0, 1.0 - r), 2.2); gl_FragColor = vec4(vC * a * uK, 1.0); }`,
    blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  const winU = { uK: { value: 0 } };
  const winMat = new THREE.ShaderMaterial({
    uniforms: winU,
    vertexShader: `attribute vec3 aCol; varying vec3 vC; varying vec2 vUv; void main(){ vC = aCol; vUv = uv; vec4 p = vec4(position, 1.0);
      #ifdef USE_INSTANCING
      p = instanceMatrix * p;
      #endif
      gl_Position = projectionMatrix * modelViewMatrix * p; }`,
    fragmentShader: `uniform float uK; varying vec3 vC; varying vec2 vUv; void main(){ vec2 q = abs(vUv - 0.5) * 2.0; float e = 1.0 - smoothstep(0.6, 1.0, max(q.x, q.y)) * 0.55; float bar = 1.0 - step(abs(vUv.x - 0.5), 0.03) * 0.7; gl_FragColor = vec4(vC * uK * e * bar, 1.0); }`,
    blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.DoubleSide,
  });
  const lin = (n) => { const c = COL.lin[COL.c(n)] || COL.lin[0]; return [c.r, c.g, c.b]; };
  const W = { group: null };
  function buildLights(scene) {
    const G = new THREE.Group(); G.name = 'dlx night'; scene.add(G); W.group = G;
    // halos round every lamp bulb + torch flame
    if (S.lamps.length) { W.halos = points(S.lamps, (l) => ({ p: [l.x, l.y, l.z], c: l.col === 'tgreen' ? [0.5, 1.4, 0.35] : [1.6, 1.15, 0.55], s: 5.5 }), glowPts(0, { flicker: '1.0' })); G.add(W.halos); }
    if (S.torches.length) { W.flames = points(S.torches, (t) => ({ p: [t.x, t.y, t.z], c: [1.8, 0.8, 0.25], s: 3.6 }), glowPts(0, { flicker: '0.9 + 0.1 * sin(uTime * 11.0 + aPh * 30.0) * sin(uTime * 7.3 + aPh * 11.0)' })); G.add(W.flames); }
    // ground pools
    const pools = S.lamps.map((l) => ({ l, r: 6.5, c: l.col === 'tgreen' ? [0.25, 0.7, 0.18] : [0.95, 0.62, 0.28] }));
    if (pools.length) {
      const geo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2); const cols = new Float32Array(pools.length * 3);
      const im = new THREE.InstancedMesh(geo, poolMat, pools.length); const m4 = new THREE.Matrix4();
      pools.forEach((p, i) => { let g = 1e9; for (const [dx, dz] of [[1.6, 0], [-1.6, 0], [0, 1.6], [0, -1.6]]) g = Math.min(g, WORLD.ground(p.l.x + dx, p.l.z + dz, p.l.y - 0.5)); if (!isFinite(g)) g = WORLD.y(p.l.x, p.l.z); m4.makeScale(p.r * 2, 1, p.r * 2).setPosition(p.l.x, g + 0.03, p.l.z); im.setMatrixAt(i, m4); cols.set(p.c, i * 3); });
      geo.setAttribute('aCol', new THREE.InstancedBufferAttribute(cols, 3)); im.frustumCulled = false; im.renderOrder = 4; G.add(im); W.pools = im;
    }
    // lit windows: a warm glow just inside most panes (a few stay dark: somebody's asleep)
    const R = M.rng(424242), wins = S.panes.filter(() => R() < 0.72);
    if (wins.length) {
      const geo = new THREE.PlaneGeometry(1, 1); const cols = new Float32Array(wins.length * 3); const im = new THREE.InstancedMesh(geo, winMat, wins.length); const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
      wins.forEach((w, i) => { const alongX = (w.x1 - w.x0) >= (w.z1 - w.z0); const len = alongX ? w.x1 - w.x0 : w.z1 - w.z0; const hgt = w.y1 - w.y0;
        e.set(0, alongX ? 0 : Math.PI / 2, 0); q.setFromEuler(e); m4.compose(new THREE.Vector3((w.x0 + w.x1) / 2, (w.y0 + w.y1) / 2, (w.z0 + w.z1) / 2), q, new THREE.Vector3(Math.max(0.3, len - 0.25), Math.max(0.3, hgt - 0.2), 1)); im.setMatrixAt(i, m4);
        const k = 0.75 + R() * 0.5, tint = R(); cols.set(w.yellow ? [1.5 * k, 1.1 * k, 0.3 * k] : tint < 0.15 ? [0.55 * k, 0.75 * k, 1.2 * k] : [1.45 * k, 0.95 * k, 0.45 * k], i * 3); });
      geo.setAttribute('aCol', new THREE.InstancedBufferAttribute(cols, 3)); im.frustumCulled = false; im.renderOrder = 1; G.add(im); W.wins = im;
    }
    // headlights: a beam of light on the road ahead of every car, buggy and crawler at night (updated each frame)
    { const NH = 40, geo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
      const mat = new THREE.ShaderMaterial({ uniforms: { uK: U.uK }, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; vec4 p = vec4(position, 1.0);
          #ifdef USE_INSTANCING
          p = instanceMatrix * p;
          #endif
          gl_Position = projectionMatrix * modelViewMatrix * p; }`,
        fragmentShader: `uniform float uK; varying vec2 vUv; void main(){ float along = vUv.y; float w = 0.18 + 0.82 * along; float x = abs(vUv.x - 0.5) * 2.0 / w; float a = (1.0 - smoothstep(0.55, 1.0, x)) * smoothstep(0.0, 0.06, along) * pow(1.0 - along, 1.3); gl_FragColor = vec4(vec3(1.0, 0.85, 0.55) * a * 0.9 * uK, 1.0); }` });
      W.heads = new THREE.InstancedMesh(geo, mat, NH); W.heads.count = 0; W.heads.frustumCulled = false; W.heads.renderOrder = 4; G.add(W.heads); }
    // fireflies (placed round the listener, re-seeded as you travel)
    const NF = 220; W.ff = { n: NF, cx: 1e9, cz: 1e9, base: new Float32Array(NF * 3), ph: new Float32Array(NF) };
    { const list = Array.from({ length: NF }, () => 0); W.fly = points(list, () => ({ p: [0, -500, 0], c: [0.75, 1.3, 0.25], s: 0.9 }), glowPts(0, { uK: (W.ffK = { value: 0 }), flicker: 'max(0.0, sin(uTime * (1.3 + aPh) + aPh * 40.0)) * 1.2', fall: '3.5' })); W.fly.geometry.attributes.position.setUsage(THREE.DynamicDrawUsage); G.add(W.fly); }
    // rain: streaks in a box that follows the camera (anchored to the world, so they don't swim when you turn)
    { const N = 7000, pos = new Float32Array(N * 6), end = new Float32Array(N * 2);
      for (let i = 0; i < N; i++) { const x = Math.random(), y = Math.random(), z = Math.random(); pos.set([x, y, z, x, y, z], i * 6); end[i * 2] = 0; end[i * 2 + 1] = 1; }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aEnd', new THREE.BufferAttribute(end, 1));
      W.rainU = { uCam: { value: new THREE.Vector3() }, uTime: BA.U.uTime, uK: { value: 0 }, uBox: { value: new THREE.Vector3(80, 50, 80) }, uWind: { value: new THREE.Vector2(3, 1.5) } };
      const mat = new THREE.ShaderMaterial({ uniforms: W.rainU, transparent: true, depthWrite: false,
        vertexShader: `attribute float aEnd; uniform vec3 uCam; uniform float uTime; uniform vec3 uBox; uniform vec2 uWind; uniform float uK; varying float vA;
          void main(){ vec3 s = position; float sp = 38.0 + s.x * 10.0; float fall = uTime * sp;
            vec3 o = uCam - uBox * 0.5; vec3 w = vec3(s.x * uBox.x + uWind.x * uTime, s.y * uBox.y - fall, s.z * uBox.z + uWind.y * uTime);
            vec3 p = o + mod(w - o, uBox); vec3 v = normalize(vec3(uWind.x, -sp, uWind.y)); p -= v * aEnd * (0.9 + s.z * 0.6);
            vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; float d = length(p - uCam);
            vA = uK * (0.55 - 0.35 * smoothstep(8.0, 40.0, d)) * (1.0 - aEnd * 0.8) * step(fract(s.y * 7.13), uK * 1.2); }`,
        fragmentShader: `varying float vA; void main(){ if (vA < 0.004) discard; gl_FragColor = vec4(vec3(0.62, 0.68, 0.8) * 0.9, vA); }` });
      W.rain = new THREE.LineSegments(g, mat); W.rain.frustumCulled = false; W.rain.renderOrder = 6; G.add(W.rain); }
    // snow: soft flakes that drift and sway
    { const N = 4500, pos = new Float32Array(N * 3); for (let i = 0; i < N * 3; i++) pos[i] = Math.random();
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      W.snowU = { uCam: W.rainU.uCam, uTime: BA.U.uTime, uK: { value: 0 }, uBox: { value: new THREE.Vector3(90, 50, 90) }, uScale: U.uScale };
      const mat = new THREE.ShaderMaterial({ uniforms: W.snowU, transparent: true, depthWrite: false,
        vertexShader: `uniform vec3 uCam; uniform float uTime; uniform vec3 uBox; uniform float uK; uniform float uScale; varying float vA;
          void main(){ vec3 s = position; float fall = uTime * (2.2 + s.x * 1.6);
            vec3 o = uCam - uBox * 0.5; vec3 w = vec3(s.x * uBox.x + sin(uTime * 0.7 + s.y * 40.0) * 1.2 + uTime * 0.8, s.y * uBox.y - fall, s.z * uBox.z + cos(uTime * 0.5 + s.x * 30.0) * 1.2);
            vec3 p = o + mod(w - o, uBox); vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
            gl_PointSize = clamp((0.09 + s.z * 0.08) * uScale / max(-mv.z, 0.5), 1.0, 16.0); vA = uK * step(fract(s.y * 5.7), uK * 1.1) * (1.0 - smoothstep(20.0, 45.0, length(p - uCam))); }`,
        fragmentShader: `varying float vA; void main(){ vec2 q = gl_PointCoord * 2.0 - 1.0; float r = dot(q, q); if (r > 1.0 || vA < 0.004) discard; gl_FragColor = vec4(vec3(1.3), vA * (1.0 - r)); }` });
      W.snow = new THREE.Points(g, mat); W.snow.frustumCulled = false; W.snow.renderOrder = 6; G.add(W.snow); }
    // a shooting star (one at a time) + a storm's lightning bolt on the horizon
    { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3)); g.setAttribute('color', new THREE.BufferAttribute(new Float32Array([4, 4, 4.5, 0, 0, 0]), 3));
      W.star = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, fog: false }));
      W.star.frustumCulled = false; W.star.visible = false; W.star.renderOrder = -900; G.add(W.star); W.starT = 0; W.nextStar = 20; }
    { const NB = 14, g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NB * 2 * 3 * 2), 3));
      W.bolt = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: new THREE.Color(6, 6, 9), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
      W.bolt.frustumCulled = false; W.bolt.visible = false; G.add(W.bolt); }
    S.built = true;
    BA.log('daynight:', S.lamps.length, 'lamps', S.torches.length, 'torches', S.panes.length, 'panes (' + wins.length + ' lit)');
  }
  if (!off) BA.build('day + night lights', 91, (scene) => buildLights(scene));

  /* ---------------- weather ---------------- */
  const WX = { clear: { cloud: 0, rain: 0, snow: 0 }, rain: { cloud: 0.72, rain: 0.75, snow: 0 }, storm: { cloud: 1, rain: 1, snow: 0 }, snow: { cloud: 0.6, rain: 0, snow: 1 } };
  function roll() {
    const r = Math.random(), was = S.W.kind;
    const k = was !== 'clear' ? 'clear' : r < 0.62 ? 'clear' : r < 0.84 ? 'rain' : r < 0.94 ? 'storm' : 'snow';
    S.W.kind = k; S.W.left = k === 'clear' ? 260 + Math.random() * 420 : k === 'rain' ? 110 + Math.random() * 150 : k === 'storm' ? 90 + Math.random() * 110 : 140 + Math.random() * 120;
    if (was !== 'clear' && was !== 'snow' && k === 'clear' && S.sunEl > 6) S.W.rbT = 80;   // the sun's out after the shower: a rainbow
  }
  function weather(kind) { S.wxMode = kind; if (kind !== 'auto') { S.W.kind = kind; S.W.left = 1e9; } else { S.W.left = 30; } saveCfg(); }
  function bolt(cam) {
    const a = Math.random() * M.TAU, r = 140 + Math.random() * 180, x = cam.x + Math.cos(a) * r, z = cam.z + Math.sin(a) * r, top = 120, bot = WORLD.y(x, z);
    const pa = W.bolt.geometry.attributes.position, arr = pa.array; let px = x, py = top, pz = z, k = 0;
    const segs = 14, dy = (top - bot) / segs;
    for (let i = 0; i < segs && k + 6 <= arr.length; i++) { const nx = px + (Math.random() - 0.5) * 9, ny = py - dy, nz = pz + (Math.random() - 0.5) * 9; arr.set([px, py, pz, nx, ny, nz], k); k += 6; px = nx; py = ny; pz = nz; }
    for (; k < arr.length; k++) arr[k] = arr[k % 6];
    pa.needsUpdate = true; W.bolt.visible = true; S.W.bolt = 0.22;
    if (typeof AUDIO !== 'undefined') AUDIO.sfx('thunder', { delay: Math.min(2.8, r / 150), vel: 0.9 });
  }

  /* ---------------- the frame ---------------- */
  const _sun = new THREE.Vector3(), _moon = new THREE.Vector3(), _ml = new THREE.Vector3(), _c = new THREE.Color(), _g = new THREE.Color();
  let envClock = 0;
  function update(t, dt) {
    const inside = typeof INTERIOR !== 'undefined' && !!INTERIOR.cur;
    const ph = typeof GAME !== 'undefined' ? GAME.phase : 'explore';
    // the clock
    const fixedLook = !harness && (ph === 'title' || ph === 'creator' || ph === 'boot');
    if (!fixedLook && S.mode === 'cycle' && !BA.paused) { const hps = 24 / (S.dayMin * 60) * (S.night > 0.5 ? 2 : 1); S.hour = (S.hour + dt * hps) % 24; }
    else if (!fixedLook && typeof S.mode === 'number') S.hour += M.angDiff(S.hour / 24 * M.TAU, S.mode / 24 * M.TAU) / M.TAU * 24 * Math.min(1, dt * 1.5);
    const hour = fixedLook ? 16.5 : ((S.hour % 24) + 24) % 24;
    if (ph === 'play' && typeof GAME !== 'undefined' && GAME.save) GAME.save.flags.dlxHour = +S.hour.toFixed(3);
    // weather
    const Wt = S.W, wxOn = !fixedLook;
    if (wxOn && S.wxMode === 'auto') { Wt.left -= dt; if (Wt.left <= 0) roll(); }
    const tgt = wxOn ? WX[Wt.kind] || WX.clear : WX.clear, rate = Math.min(1, dt / 22);
    Wt.cloud += (tgt.cloud - Wt.cloud) * rate; Wt.rain += (tgt.rain - Wt.rain) * rate * 1.3; Wt.snow += (tgt.snow - Wt.snow) * rate;
    Wt.rbT = Math.max(0, Wt.rbT - dt); Wt.rainbow += ((Wt.rbT > 0 && Wt.cloud < 0.35 ? 1 : 0) - Wt.rainbow) * Math.min(1, dt / 6);
    if (inside) { if (W.group) W.group.visible = false; return; }   // the room keeps its own light; the island waits
    if (W.group) W.group.visible = true;
    // sun, moon
    const [sel, saz] = sunAt(hour); S.sunEl = sel; dirOf(sel, saz, _sun);
    const [mel, maz] = moonAt(hour); dirOf(mel, maz, _moon); dirOf(Math.max(mel, 16), maz, _ml);
    const p = params(sel), night = sst(-2, -14, sel), cl = Wt.cloud; S.night = night;
    const G = GFX, sk = G.skyU, U0 = BA.U;
    if (sel > -4) { U0.uSunDir.value.copy(_sun); U0.uSunCol.value.copy(p.sunCol); G.sunI = p.sunI * (1 - 0.72 * cl); }
    else { U0.uSunDir.value.copy(_ml); U0.uSunCol.value.copy(MOONCOL); G.sunI = 0.9 * sst(-4, -12, sel) * sst(-6, 8, mel) * (1 - 0.8 * cl); }
    G.hemiI = p.hemiI * (1 + 0.4 * cl); G.exposure = p.expo * (1 + 0.1 * cl);
    G.fog.density = p.fog * (1 + 1.6 * cl + 1.2 * Wt.rain + 1.5 * Wt.snow); G.shafts = 0.34 * (1 - cl) * (1 - night);
    if (G.hemi) { G.hemi.color.copy(p.hs); G.hemi.groundColor.copy(p.hg); if (cl > 0.01) { _g.setRGB(0.55, 0.58, 0.62).multiplyScalar(0.3 + 0.7 * (1 - night)); G.hemi.color.lerp(_g, cl * 0.6); } }
    // sky colours (overcast greys them down; the fog follows because it reads the same colours)
    const l = (p.hor.r * 0.3 + p.hor.g * 0.55 + p.hor.b * 0.15);
    sk.uZen.value.copy(p.zen).lerp(_c.setRGB(l * 0.62, l * 0.66, l * 0.74), cl * 0.85);
    sk.uHor.value.copy(p.hor).lerp(_c.setRGB(l * 0.86, l * 0.9, l * 0.96), cl * 0.85);
    sk.uGlow.value.copy(p.glow).multiplyScalar(1 - 0.85 * cl);
    // night: the zone's own mood (the Fright Knights' storm) wins where it is stronger
    const moodN = sk.uNight.value || 0, myN = night * 0.95;
    sk.uNight.value = Math.max(moodN, myN);
    const fk = moodN > myN ? 1 : moodN / Math.max(1e-3, myN + moodN);
    sk.uNightZen.value.copy(NZEN).lerp(FZEN, fk); sk.uNightHor.value.copy(NHOR).lerp(FHOR, fk);
    sk.uMoonDir.value.copy(_moon); sk.uMoonK.value = sst(-3, -10, sel) * sst(-3, 3, mel) * (1 - 0.95 * cl);
    sk.uStars.value = 1 - cl * 0.95; sk.uRainbow.value = Wt.rainbow * (1 - night) * sst(4, 12, sel);
    if (BR.U && BR.U.uGlowI) BR.U.uGlowI.value = 2.6 * (1 + 0.4 * night + 0.15 * cl);
    // image light: refresh the PMREM when the sky has moved on enough (throttled)
    G.envNight = night * 0.92; G.envFloorK = 1 - night * 0.85 - cl * 0.3;
    envClock -= dt; const E = S.env;
    if (envClock <= 0 && (Math.abs(E.night - night) > 0.04 || Math.abs(E.el - sel) > 2.5 || Math.abs(E.cloud - cl) > 0.06)) {
      envClock = 1.2; E.night = night; E.el = sel; E.cloud = cl; try { G.updateEnv(); } catch (e) { /* */ }
    }
    // the night lights
    U.uK.value = Math.max(sst(4, -3, sel), cl * 0.5);   // lamps come on at dusk (and under a dark storm sky)
    winU.uK.value = sst(3, -5, sel);
    const cam = G.camera.position; U.uScale.value = GFX.H * 0.5 * G.camera.projectionMatrix.elements[5];
    // headlights on everything that drives
    if (W.heads) {
      let n = 0;
      if (U.uK.value > 0.01) {
        const m4 = W._m4 || (W._m4 = new THREE.Matrix4()), q = W._q || (W._q = new THREE.Quaternion()), e = W._e || (W._e = new THREE.Euler()), v = W._v || (W._v = new THREE.Vector3()), sc = W._s || (W._s = new THREE.Vector3());
        const lights = [];
        if (typeof VEH !== 'undefined') for (const V of VEH.list) { if (!V.obj || !V.obj.visible || V.horses || !V.len) continue; lights.push([V.x, V.z, V.yaw, V.len, V.wid || 4, V.fixedY !== undefined ? V.fixedY : null]); }
        const D0 = typeof GAME !== 'undefined' && GAME.mod('drive'); if (D0 && D0.S && D0.S.cur && D0.S.cur.kind === 'car') { const c = D0.S.cur; lights.push([c.x, c.z, c.yaw || 0, 10, 4, null]); }
        for (const [x, z, yaw, len, wid] of lights) {
          if (n >= W.heads.instanceMatrix.count) break; if (Math.hypot(x - cam.x, z - cam.z) > 220) continue;
          const L = 13, fx = Math.sin(yaw), fz = Math.cos(yaw), cx = x + fx * (len / 2 + L / 2 - 0.5), cz = z + fz * (len / 2 + L / 2 - 0.5);
          const g = WORLD.ground(cx, cz, WORLD.y(cx, cz) + 1.5);
          e.set(0, yaw + Math.PI, 0); q.setFromEuler(e); m4.compose(v.set(cx, g + 0.05, cz), q, sc.set(Math.max(4, wid * 1.2), 1, L)); W.heads.setMatrixAt(n++, m4);
        }
      }
      W.heads.count = n; W.heads.instanceMatrix.needsUpdate = n > 0;
    }
    // fireflies: out on warm dry nights, on land, near the listener
    if (W.fly) {
      const want = night > 0.55 && Wt.rain < 0.2 && Wt.snow < 0.2 && cam.y < 120 ? 1 : 0; W.ffK.value += (want - W.ffK.value) * Math.min(1, dt * 0.5);
      if (W.ffK.value > 0.01) {
        const F = W.ff, pp = typeof GAME !== 'undefined' && GAME.phase === 'play' ? GAME.playerPos() : null; const lx = pp ? pp[0] : CAM.tgt.x, lz = pp ? pp[2] : CAM.tgt.z;
        if (Math.hypot(lx - F.cx, lz - F.cz) > 25) { F.cx = lx; F.cz = lz; for (let i = 0; i < F.n; i++) { const a = Math.random() * M.TAU, r = 4 + Math.sqrt(Math.random()) * 38, x = lx + Math.cos(a) * r, z = lz + Math.sin(a) * r; const wet = !WORLD.inside(Math.floor(x), Math.floor(z)) || WORLD.isWater(x, z); F.base[i * 3] = x; F.base[i * 3 + 1] = wet ? -999 : WORLD.y(x, z) + 0.8 + Math.random() * 2.4; F.base[i * 3 + 2] = z; F.ph[i] = Math.random() * 100; } }
        const pa = W.fly.geometry.attributes.position, A = pa.array;
        for (let i = 0; i < F.n; i++) { const q = F.ph[i] + t * 0.35; A[i * 3] = F.base[i * 3] + Math.sin(q * 1.3) * 1.6 + Math.sin(q * 3.1) * 0.4; A[i * 3 + 1] = F.base[i * 3 + 1] + Math.sin(q * 2.2) * 0.5; A[i * 3 + 2] = F.base[i * 3 + 2] + Math.cos(q * 1.1) * 1.6; }
        pa.needsUpdate = true; W.fly.visible = true;
      } else W.fly.visible = false;
    }
    // rain + snow round the camera; lightning in a storm
    if (W.rainU) { W.rainU.uCam.value.copy(cam); W.rainU.uK.value = Wt.rain * (cam.y < 160 ? 1 : 0); W.rain.visible = W.rainU.uK.value > 0.005; W.snowU.uK.value = Wt.snow * (cam.y < 160 ? 1 : 0); W.snow.visible = W.snowU.uK.value > 0.005; }
    if (Wt.kind === 'storm' && Wt.rain > 0.6) { Wt.nextBolt -= dt; if (Wt.nextBolt <= 0) { Wt.nextBolt = 5 + Math.random() * 10; bolt(cam); } }
    if (Wt.bolt > 0) { Wt.bolt -= dt; G.flash = Wt.bolt > 0.12 ? 0.22 * (Math.sin(Wt.bolt * 70) > 0 ? 1 : 0.4) : 0; if (Wt.bolt <= 0) { W.bolt.visible = false; G.flash = 0; } }
    // a shooting star now and then on a clear night
    if (W.star) {
      W.nextStar -= dt;
      if (W.starT > 0) { W.starT -= dt; const k = 1 - W.starT / 0.9; const a = W.starA; const pa = W.star.geometry.attributes.position.array; const R0 = 3200;
        const hx = a.x0 + (a.x1 - a.x0) * k, hy = a.y0 + (a.y1 - a.y0) * k, hz = a.z0 + (a.z1 - a.z0) * k, tk = Math.max(0, k - 0.18);
        pa.set([cam.x + hx * R0, cam.y + hy * R0, cam.z + hz * R0, cam.x + (a.x0 + (a.x1 - a.x0) * tk) * R0, cam.y + (a.y0 + (a.y1 - a.y0) * tk) * R0, cam.z + (a.z0 + (a.z1 - a.z0) * tk) * R0]); W.star.geometry.attributes.position.needsUpdate = true; if (W.starT <= 0) W.star.visible = false; }
      else if (W.nextStar <= 0 && night > 0.8 && cl < 0.3) { W.nextStar = 14 + Math.random() * 30; W.starT = 0.9; const a = Math.random() * M.TAU, e = 0.35 + Math.random() * 0.4, da = 0.25 + Math.random() * 0.2;
        const d0 = dirOf(e * 57.3, a * 57.3, new THREE.Vector3()), d1 = dirOf(e * 57.3 - 9, a * 57.3 + da * 57.3, new THREE.Vector3());
        W.starA = { x0: d0.x, y0: d0.y, z0: d0.z, x1: d1.x, y1: d1.y, z1: d1.z }; W.star.visible = true; }
    }
    // tell the sound
    if (typeof AUDIO !== 'undefined') { AUDIO.S.night = night; AUDIO.S.rain = Math.max(Wt.rain, Wt.kind === 'storm' ? Wt.rain : 0); }
  }
  if (!off) BA.onUpdate('day + night', 31.5, (t, dt) => { try { update(t, dt); } catch (e) { if (!S.err) { S.err = true; console.error('daynight', e); } } });

  /* ---------------- the game: where the clock starts ---------------- */
  if (!off && typeof GAME !== 'undefined') GAME.on('phase', (d) => {
    if (!d) return;
    if (d.phase === 'play') { const h = GAME.save && GAME.save.flags && GAME.save.flags.dlxHour; S.hour = typeof h === 'number' && isFinite(h) ? h : 8.5; if (typeof S.mode === 'number') S.hour = S.mode; }
    if (d.phase === 'explore' && d.prev === 'title') S.hour = typeof S.mode === 'number' ? S.mode : 16.5;
  });
  if (harness) S.hour = typeof S.mode === 'number' ? S.mode : 16.5;

  /* ---------------- a little clock under the compass ---------------- */
  if (!off && !harness) BA.build('daynight clock', 97, () => {
    const st = document.createElement('style'); st.textContent = `
      #dlx-clock{position:fixed;left:50%;top:58px;transform:translateX(-50%);z-index:44;pointer-events:none;display:none;align-items:center;gap:7px;padding:3px 11px 3px 8px;background:rgba(255,253,245,.92);color:#1a1a1a;border:2px solid #1a1a1a;border-radius:999px;font:800 12px var(--ui);letter-spacing:.04em;box-shadow:0 3px 0 #1a1a1a}
      #dlx-clock i{display:inline-block;width:14px;height:14px;border-radius:50%;background:#ffd21a;border:2px solid #1a1a1a;box-shadow:inset -3px -2px 0 rgba(0,0,0,.12)}
      #dlx-clock.night i{background:#e8eefc;box-shadow:inset 4px -1px 0 #3a4a80}
      #dlx-clock small{font-weight:700;color:#5a5a5a;letter-spacing:.06em;text-transform:uppercase;font-size:10px}
      body.ph-play #dlx-clock,body.ph-explore #dlx-clock{display:flex}`;
    document.head.appendChild(st);
    const el = document.createElement('div'); el.id = 'dlx-clock'; (document.getElementById('ui') || document.body).appendChild(el); let last = '';
    BA.onUpdate('daynight clock', 64, () => {
      const h = ((S.hour % 24) + 24) % 24, hh = Math.floor(h), mm = Math.floor((h - hh) * 60 / 10) * 10;
      const wx = S.W.rain > 0.3 ? (S.W.kind === 'storm' ? 'Storm' : 'Rain') : S.W.snow > 0.3 ? 'Snow' : S.W.rainbow > 0.3 ? 'Rainbow!' : S.W.cloud > 0.4 ? 'Cloudy' : '';
      const txt = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}|${wx}|${S.night > 0.5}`;
      if (txt !== last) { last = txt; el.className = S.night > 0.5 ? 'night' : ''; el.innerHTML = `<i></i>${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}${wx ? `<small>${wx}</small>` : ''}`; }
    });
  });

  function set(h) { S.mode = h; if (typeof h === 'number') S.hour = h; saveCfg(); }
  // jump straight to a time + weather (tests / screenshots): no easing, the image light refreshed at once
  function snap(h, kind) { S.mode = h; S.hour = h; if (kind) { const k = WX[kind] || WX.clear; S.W.kind = kind; S.W.left = 1e9; S.W.cloud = k.cloud; S.W.rain = k.rain; S.W.snow = k.snow; } envClock = 0; S.env.el = -99; }
  return { S, set, snap, weather, setDayLength: (m) => { S.dayMin = m; saveCfg(); }, sunAt, moonAt, params };
})();
