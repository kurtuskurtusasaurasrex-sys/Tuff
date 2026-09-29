/* ==== p75_pet.js ==== */
/* PET — BRICKSY, a brick-built beagle waiting by her little red doghouse in the park.  Adopt her (E) and she follows
   you everywhere on foot: trots at your heel, gallops to catch up when you run, climbs a brick step like you do, sits
   and wags when you stop, finds her own way back to you after a train ride or a trip indoors, and barks now and then.
   Her nose is the best on the island: she sniffs out stud coins you haven't picked up yet — and, if you're close, the
   hidden red bricks — runs over and barks at the spot.  E near her: a pat on the head (she loves that).
   API: PET.S {adopted, x, z, y, state} */
const PET = (() => {
  const off = BA.flag('test') || /[?&]islandgp(?=&|=|$)/.test(location.search);
  const S = { adopted: false, x: 0, y: 0, z: 0, yaw: 0, v: 0, cyc: 0, sit: 0, idleT: 0, stuckT: 0, barkT: 8, sniffT: 6, fetch: null, fetchT: 0, hop: 0, away: true, happy: 0, name: 'Bricksy', house: null, g: null };
  const { cube, ball, seg, model, V3 } = DLX;
  const cell = (y) => Math.floor(y / 0.4 + 1e-4);

  function build(scene) {
    const G = new THREE.Group(); G.name = 'pet';
    const TAN = 'tan', BRN = 'brown', WH = 'white';
    G.add(model('pet body', (b) => {
      cube(b, 0, 1.35, 0, 1.3, 0.95, 2.3, TAN); cube(b, 0, 1.18, 0.98, 1.12, 0.62, 0.42, WH); cube(b, 0, 1.86, -0.25, 1.12, 0.1, 1.35, BRN);
      cube(b, 0, 0.93, 0.1, 1.0, 0.1, 1.6, WH);
    }));
    const head = new THREE.Group(); head.position.set(0, 1.78, 1.12); G.add(head);
    head.add(model('pet head', (b) => {
      cube(b, 0, 0.36, 0.28, 1.0, 0.86, 0.95, TAN); cube(b, 0, 0.19, 0.94, 0.62, 0.42, 0.56, WH); cube(b, 0, 0.38, 1.2, 0.28, 0.18, 0.1, 'black');
      cube(b, 0, 0.09, 1.08, 0.42, 0.05, 0.2, 'dkred');
      for (const s of [-1, 1]) { ball(b, s * 0.25, 0.52, 0.76, 0.15, 0.17, 0.08, 'black'); ball(b, s * 0.22, 0.55, 0.79, 0.05, 0.05, 0.03, WH, { glow: true }); cube(b, s * 0.56, 0.62, 0.2, 0.16, 0.72, 0.46, BRN); }
      cube(b, 0, -0.05, -0.02, 1.06, 0.16, 0.86, 'red'); ball(b, 0, -0.18, 0.44, 0.2, 0.2, 0.08, 'gold');
    }));
    const legs = [];
    for (const [sx, sz] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
      const L = new THREE.Group(); L.position.set(sx * 0.42, 1.0, sz * 0.78); G.add(L);
      L.add(model('pet leg', (b) => { cube(b, 0, -0.5, 0, 0.36, 1.0, 0.36, TAN); cube(b, 0, -0.95, 0.05, 0.42, 0.12, 0.48, WH); }));
      legs.push(L);
    }
    const tail = new THREE.Group(); tail.position.set(0, 1.72, -1.12); G.add(tail);
    tail.add(model('pet tail', (b) => { seg(b, 'cyl', new V3(0, 0, 0), new V3(0, 0.5, -0.42), 0.1, TAN); ball(b, 0, 0.56, -0.47, 0.22, 0.22, 0.22, WH); }));
    S.g = G; S.head = head; S.legs = legs; S.tail = tail; scene.add(G);
    // the doghouse, by the fountain
    S.home = DLX.openSpot(GAME.START_AT[0] - 11, GAME.START_AT[1] + 6, 3.5);
    S.house = model('doghouse', (b) => {
      b.box(-2, 0, -2, 4, 1, 4, 'dgray');
      b.box(-2, 1, -2, 1, 6, 4, 'red'); b.box(1, 1, -2, 1, 6, 4, 'red'); b.box(-1, 1, -2, 2, 6, 1, 'red'); b.box(-1, 5, 1, 2, 2, 1, 'red');
      b.slope(-2, 7, -2, 2, 4, 3, 'dkblue', 3, { top: 0 }); b.slope(0, 7, -2, 2, 4, 3, 'dkblue', 1, { top: 0 });
      b.tpl('box', 0, 5.3, 2.05, 'white', { sx: 1.5, sy: 0.5, sz: 0.05 });
      b.tpl('cyl', 3.2, 1, 1.2, 'lgray', { sx: 1.1, sz: 1.1, sy: 0.35 }); b.tpl('sphere', 3.0, 2.0, 1.1, 'white', { sx: 0.5, sy: 0.25, sz: 0.25 });   // bowl + bone
    });
    S.house.position.set(S.home[0], S.home[1], S.home[2]); S.house.rotation.y = 0; scene.add(S.house);
    S.x = S.home[0] + 1.5; S.z = S.home[2] + 3.2; S.y = WORLD.ground(S.x, S.z, S.home[1] + 1.3); S.yaw = 0;
    GAME.interact.add({ id: 'pet', pos: () => [S.x, S.y, S.z], r: 3.4, priority: (d) => (d < 2.5 ? 0.3 : 0), label: () => (S.adopted ? 'Pat ' + S.name : 'Adopt the puppy'), enabled: () => S.g.visible,
      act: () => { if (!S.adopted) { S.adopted = true; GAME.flag('pet', 1); S.away = false; DLX.pop(S.name.toUpperCase() + ' IS YOURS!', 'She follows you everywhere on foot — and sniffs out studs you missed', { kicker: 'New friend', icon: '&#128054;', col: '#e8b86a' }); } pat(); } });
  }
  function pat() { S.happy = 3; S.hop = 0.01; DLX.sfx('bark', { x: S.x, y: S.y + 1.5, z: S.z }); FX.puff(S.x, S.y + 2.6, S.z, { n: 4, col: 'red', size: 0.45, up: 2.2, spread: 0.5, life: 1.1 }); }
  BA.build('pet', 93, (scene) => { if (!off) build(scene); });
  if (!off && typeof GAME !== 'undefined') GAME.on('phase', (d) => { if (d && d.phase === 'play') { S.adopted = !!GAME.save.flags.pet; S.away = true; S.fetch = null; } });

  const wet = (x, z, g) => g < 0.5 && WORLD.isWater(x, z);
  function blocked(x, z, y) { const g = WORLD.ground(x, z, y + 1.3); if (g - y > 1.3 || wet(x, z, g)) return true; const cx = Math.floor(x), cz = Math.floor(z); for (let c = cell(g + 1.35); c <= cell(g + 2.2); c++) if (BR.solid(cx, c, cz)) return true; return false; }
  function placeNear(px, pz, py, yaw) {
    for (const r of [2.8, 4, 1.8, 5.5]) for (let k = 0; k < 10; k++) {
      const a = yaw + Math.PI + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 0.5, x = px + Math.sin(a) * r, z = pz + Math.cos(a) * r, g = WORLD.ground(x, z, py + 1.3);
      if (Math.abs(g - py) < 2 && !blocked(x, z, g)) { S.x = x; S.z = z; S.y = g; S.yaw = yaw; FX.puff(x, g + 0.6, z, { n: 6, col: 'white', size: 0.8, up: 1.4, life: 0.8 }); return true; }
    }
    return false;
  }
  function nearestFind(px, pz) {
    let best = null, bd = 1e9;
    const H = typeof HUD !== 'undefined' ? HUD : null; if (!H) return null;
    for (const c of H.coins || []) { if (c.got) continue; const d = Math.hypot(c.x - px, c.z - pz); if (d < 24 && d < bd) { bd = d; best = { x: c.x, z: c.z, y: c.g, kind: 'coin', ref: c }; } }
    for (const b of H.bricks || []) { if (b.got || b.found) continue; const bx = b.x, bz = b.z; if (bx === undefined) continue; const d = Math.hypot(bx - px, bz - pz); if (d < 16 && d < bd + 6) { bd = d; best = { x: bx, z: bz, y: b.g || 0, kind: 'brick', ref: b }; } }
    return best;
  }

  BA.onUpdate('pet', 51, (t, dt) => {
    if (off || !S.g) return;
    const G = S.g, inside = typeof INTERIOR !== 'undefined' && !!INTERIOR.cur;
    S.house.visible = !inside;
    let speed = 0, tx = S.x, tz = S.z, sitWant = false;
    if (!S.adopted || !DLX.play()) {
      // at home: sit by the doghouse, look at whoever's close
      G.visible = !inside; sitWant = true;
      const L = DLX.here(); if (Math.hypot(L.x - S.x, L.z - S.z) < 9) { S.yaw += M.angDiff(S.yaw, Math.atan2(L.x - S.x, L.z - S.z)) * Math.min(1, dt * 3); S.happy = Math.max(S.happy, 0.6); }
      if (S.adopted && !DLX.play()) { S.x = S.home[0] + 1.5; S.z = S.home[2] + 3.2; S.y = WORLD.ground(S.x, S.z, S.home[1] + 1.3); }
    } else if (!DLX.onFoot()) { G.visible = false; S.away = true; return; }
    else {
      const f = PLAYER.fig, fy = f.yaw, fwx = Math.sin(fy), fwz = Math.cos(fy);
      if (S.away) { S.away = false; if (!placeNear(f.x, f.z, f.gy, fy)) { S.x = f.x; S.z = f.z; S.y = f.gy; } }
      G.visible = true;
      const dP = Math.hypot(f.x - S.x, f.z - S.z);
      if (dP > 40 || Math.abs(f.gy - S.y) > 14) { placeNear(f.x, f.z, f.gy, fy); S.fetch = null; }
      // sniffing
      S.sniffT -= dt; if (S.sniffT <= 0 && !S.fetch) { S.sniffT = 9 + Math.random() * 6; const c = nearestFind(f.x, f.z); if (c) { S.fetch = c; S.fetchT = 16; S.told = false; } }
      if (S.fetch) {
        const c = S.fetch; if ((c.ref && (c.ref.got || c.ref.found)) || (S.fetchT -= dt) <= 0 || Math.hypot(c.x - f.x, c.z - f.z) > 34) { S.fetch = null; }
        else { tx = c.x - Math.sin(Math.atan2(c.x - S.x, c.z - S.z)) * 1.4; tz = c.z - Math.cos(Math.atan2(c.x - S.x, c.z - S.z)) * 1.4; }
      }
      if (!S.fetch) { tx = f.x - fwx * 2.9 + fwz * 1.3; tz = f.z - fwz * 2.9 - fwx * 1.3; }
      const d = Math.hypot(tx - S.x, tz - S.z);
      if (S.fetch && d < 1.2) { speed = 0; S.yaw += M.angDiff(S.yaw, Math.atan2(S.fetch.x - S.x, S.fetch.z - S.z)) * Math.min(1, dt * 6); if (!S.told) { S.told = true; S.barkT = 0; if (!GAME.flag('petFound')) { GAME.flag('petFound', 1); DLX.pop(S.name + ' found something!', S.fetch.kind === 'brick' ? 'Is that… a red brick?!' : 'Follow the barking — there are studs here', { icon: '&#128062;', col: '#e8b86a' }); } } if (S.barkT <= 0) { S.barkT = 1.6; DLX.sfx('bark', { x: S.x, y: S.y + 1.5, z: S.z }); S.hop = 0.01; } }
      else speed = d > 1.1 ? M.clamp(d * 2.4, 2, dP > 10 ? 15 : 12.5) : 0;
      sitWant = speed < 0.1 && PLAYER.speed < 0.5 && !S.fetch; S.idleT = sitWant ? S.idleT + dt : 0;
      if (speed > 0.1) {
        const a = Math.atan2(tx - S.x, tz - S.z); S.yaw += M.angDiff(S.yaw, a) * Math.min(1, dt * 8);
        const step = Math.min(d, speed * dt), mx = Math.sin(S.yaw) * step, mz = Math.cos(S.yaw) * step; let moved = false;
        for (const [ax, az] of [[mx, mz], [mx, 0], [0, mz]]) { if (!ax && !az) continue; if (!blocked(S.x + ax, S.z + az, S.y)) { S.x += ax; S.z += az; moved = true; break; } }
        S.stuckT = moved ? 0 : S.stuckT + dt; if (S.stuckT > 1.2 && dP > 4) { placeNear(f.x, f.z, f.gy, fy); S.stuckT = 0; }
      }
      // barking now and then
      S.barkT -= dt; if (S.barkT <= 0 && !S.fetch) { S.barkT = 14 + Math.random() * 20; if (dP < 20) DLX.sfx('bark', { x: S.x, y: S.y + 1.5, z: S.z }); }
      if (PLAYER.vy > 8 && PLAYER.grounded === false && S.hop === 0 && dP < 5) S.hop = 0.01;   // jumps with you
    }
    // ground + hop
    const g = WORLD.ground(S.x, S.z, S.y + 1.3); S.y = g > S.y ? g : Math.max(g, S.y - dt * 20);
    let hy = 0; if (S.hop > 0) { S.hop += dt; hy = Math.sin(Math.min(1, S.hop / 0.45) * Math.PI) * 1.1; if (S.hop > 0.45) S.hop = 0; }
    // animation
    S.v += (speed - S.v) * Math.min(1, dt * 8); S.cyc += S.v * dt * 1.6;
    S.sit += ((sitWant && S.idleT > 1.5) || (!S.adopted || !DLX.play()) ? dt * 3 : -dt * 5); S.sit = M.clamp(S.sit, 0, 1);
    S.happy = Math.max(0, S.happy - dt * 0.4);
    const sw = Math.min(1, S.v / 6) * 0.75, sit = S.sit;
    S.legs.forEach((L, i) => { const front = i < 2, ph = (i === 0 || i === 3 ? 0 : Math.PI); L.rotation.x = Math.sin(S.cyc + ph) * sw + (front ? 0 : -sit * 1.2); L.position.y = 1.0 - (front ? 0 : sit * 0.1); });
    S.tail.rotation.y = Math.sin(t * (S.happy > 0.5 || sit > 0.5 ? 14 : 6)) * (0.35 + Math.min(1, S.happy) * 0.35); S.tail.rotation.x = -0.2 + sit * 0.5;
    S.head.rotation.x = -sit * 0.25 + Math.sin(S.cyc * 2) * sw * 0.06; S.head.rotation.y = S.fetch ? 0 : Math.sin(t * 0.7) * 0.25 * (1 - Math.min(1, S.v / 3));
    G.position.set(S.x, S.y + hy + Math.abs(Math.sin(S.cyc)) * sw * 0.12 + sit * 0.3, S.z); G.rotation.set(-sit * 0.38, S.yaw, 0, 'YXZ');
  });
  return { S, pat };
})();
