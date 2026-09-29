"""Exact edits to the original parts (name, old, new). Each `old` must occur exactly once in the original file.
Kept small on purpose: new features live in src/p7x_*.js and plug in through the game's own hooks."""

PATCHES = [
    # ---- branding
    ('title', '<title>The Brick Ages</title>', '<title>The Brick Ages · Deluxe</title>'),
    ('boot logo',
     '<div class="logo"><small>THE</small>BRICK AGES</div>',
     '<div class="logo"><small>THE</small>BRICK AGES<span class="dlx">DELUXE EDITION</span></div>'),
    ('boot logo css',
     '#boot .sub{margin-top:28px;',
     '#boot .logo .dlx{display:block;font-size:.2em;letter-spacing:.38em;font-style:normal;color:#fff;-webkit-text-stroke:0;text-shadow:3px 3px 0 #d2231d,5px 5px 0 #1a1a1a;margin-top:.45em;transform:rotate(3deg)}\n#boot .sub{margin-top:28px;'),

    # ---- settings: other parts add rows (GAME.xsettings: [{html(), bind(box, rerender)}])
    ('settings rows',
     "${opt(0, 'Best')}${opt(1, 'High')}${opt(2, 'Medium')}${opt(3, 'Low')}</div></div></div>${back}`;",
     "${opt(0, 'Best')}${opt(1, 'High')}${opt(2, 'Medium')}${opt(3, 'Low')}</div></div>${(GAME.xsettings || []).map((r) => { try { return r.html(); } catch (e) { return ''; } }).join('')}</div>${back}`;\n"
     "      for (const r of GAME.xsettings || []) { try { if (r.bind) r.bind(box, renderSub); } catch (e) { console.error(e); } }"),

    # ---- sky: a moon, a rainbow, twinkling stars (driven by src/p71_daynight.js); the env light can go dark at night
    ('sky uniforms',
     "uNightZen: { value: new THREE.Color(0.02, 0.015, 0.05) }, uNightHor: { value: new THREE.Color(0.16, 0.09, 0.22) }, uTime: BA.U.uTime };",
     "uNightZen: { value: new THREE.Color(0.02, 0.015, 0.05) }, uNightHor: { value: new THREE.Color(0.16, 0.09, 0.22) }, uTime: BA.U.uTime,\n"
     "    uMoonDir: { value: new THREE.Vector3(0.3, -0.5, -0.8) }, uMoonK: { value: 0 }, uRainbow: { value: 0 }, uStars: { value: 1 } };"),
    ('sky frag uniforms',
     "uniform vec3 uSunCol; uniform float uTime; varying vec3 vDir;",
     "uniform vec3 uSunCol; uniform float uTime; uniform vec3 uMoonDir; uniform float uMoonK; uniform float uRainbow; uniform float uStars; varying vec3 vDir;"),
    ('sky moon + rainbow',
     "if (uNight > 0.01 && h > 0.0) { vec2 g = floor(vec2(atan(d.z, d.x) * 180.0, h * 260.0)); float st = step(0.9965, h21(g)); c += vec3(st) * uNight * 1.6 * h21(g + 7.0); }",
     "if (uNight > 0.01 && h > 0.0) { vec2 g = floor(vec2(atan(d.z, d.x) * 180.0, h * 260.0)); float st = step(0.9965, h21(g)); c += vec3(st) * uNight * 1.6 * h21(g + 7.0) * uStars * (0.72 + 0.28 * sin(uTime * (1.5 + 3.0 * h21(g + 3.0)) + 6.2832 * h21(g + 5.0))); }\n"
     "        if (uMoonK > 0.001) { vec3 md = normalize(uMoonDir); float mc = dot(d, md); float disc = smoothstep(0.99930, 0.99950, mc);\n"
     "          vec3 mx = normalize(cross(md, vec3(0.0, 1.0, 0.0)) + vec3(1e-4)); vec3 my = cross(mx, md); vec2 mp = vec2(dot(d, mx), dot(d, my)) * 30.0;\n"
     "          float mar = smoothstep(0.35, 0.0, length(mp - vec2(0.25, 0.3))) * 0.18 + smoothstep(0.3, 0.0, length(mp - vec2(-0.35, -0.1))) * 0.14 + smoothstep(0.2, 0.0, length(mp - vec2(0.1, -0.4))) * 0.12;\n"
     "          c = mix(c, vec3(0.93, 0.95, 1.0) * (2.4 - mar * 4.0), disc * uMoonK);\n"
     "          c += vec3(0.45, 0.55, 0.85) * (pow(max(mc, 0.0), 900.0) * 0.6 + pow(max(mc, 0.0), 40.0) * 0.07) * uMoonK; }\n"
     "        if (uRainbow > 0.001 && h > -0.03) { float ra = degrees(acos(clamp(dot(d, -normalize(uSunDir)), -1.0, 1.0))); float rk = (ra - 40.2) / 2.4;\n"
     "          if (rk > -0.3 && rk < 1.3) { float hu = (1.0 - clamp(rk, 0.0, 1.0)) * 0.75; vec3 rb = clamp(vec3(abs(hu * 6.0 - 3.0) - 1.0, 2.0 - abs(hu * 6.0 - 2.0), 2.0 - abs(hu * 6.0 - 4.0)), 0.0, 1.0);\n"
     "            float rw = smoothstep(-0.3, 0.05, rk) * (1.0 - smoothstep(0.95, 1.3, rk)); c += rb * rw * uRainbow * 0.3 * smoothstep(-0.03, 0.12, h) * (1.0 - smoothstep(0.35, 0.75, h)); } }"),
    ('env night',
     "const n = skyU.uNight.value; skyU.uNight.value = 0;\n    envScene.clear(); envScene.add(clone);\n    // a soft warm \"floor\" so undersides pick up bounce instead of blue\n    const floor = new THREE.Mesh(new THREE.CircleGeometry(40, 32), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.34, 0.33, 0.22) }));\n    floor.rotation.x = -Math.PI / 2; floor.position.y = -6; envScene.add(floor);",
     "const n = skyU.uNight.value; skyU.uNight.value = G.envNight || 0; const mk = skyU.uMoonK.value; skyU.uMoonK.value = 0;\n    envScene.clear(); envScene.add(clone);\n    // a soft warm \"floor\" so undersides pick up bounce instead of blue (dimmer at night; one mesh, reused)\n    if (!G._envFloor) { G._envFloor = new THREE.Mesh(new THREE.CircleGeometry(40, 32), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.34, 0.33, 0.22) })); G._envFloor.rotation.x = -Math.PI / 2; G._envFloor.position.y = -6; }\n    const floor = G._envFloor; floor.material.color.setRGB(0.34, 0.33, 0.22).multiplyScalar(G.envFloorK === undefined ? 1 : G.envFloorK); envScene.add(floor);"),
    ('env night restore',
     "const rt = pmrem.fromScene(envScene, 0, 0.1, 200);\n    skyU.uNight.value = n;",
     "const rt = pmrem.fromScene(envScene, 0, 0.1, 200);\n    skyU.uNight.value = n; skyU.uMoonK.value = mk;"),

    # ---- pause menu: entries from the Deluxe parts (GAME.xpause: [{a, t, cls, act}])
    ('pause items',
     "      { a: 'settings', t: 'Settings', cls: 'white' },",
     "      ...(GAME.xpause || []).map((x) => ({ a: x.a, t: x.t, cls: x.cls || '', k: x.k })),\n      { a: 'settings', t: 'Settings', cls: 'white' },"),
    ('pause act',
     "    else if (a === 'build') { closePause(); exitVehicle(); BUILD.go(); }",
     "    else if (a === 'build') { closePause(); exitVehicle(); BUILD.go(); }\n    else { const x = (GAME.xpause || []).find((i) => i.a === a); if (x) { closePause(); try { x.act(); } catch (e) { console.error(e); } } }"),

    # ---- HUD: share the island map image (the minimap draws from it)
    ('hud map base',
     "  return Hx;\n})();",
     "  Hx.mapBase = () => { if (!mapBase) mapBase = buildMapBase(); return mapBase; };\n  return Hx;\n})();"),
]
