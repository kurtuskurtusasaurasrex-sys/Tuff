/* ==== p73_jetpack.js ==== */
/* JETPACK — the Classic Space jetpack.  It waits on a glowing launch stand in the park by the fountain (E to strap it on,
   J to take it off / put it back on).  Jump, then HOLD Space in the air to fly: twin tanks, trans-yellow fins, two
   nozzles with real flames and smoke; you steer with WASD as usual (a little faster in the air), the fuel gauge drains
   while you burn and refills the moment your boots touch ground.  Tops out at a respectable 140 studs.
   API: JETPACK.S {owned, on, flying, fuel} · JETPACK.equip(on) */
const JETPACK = (() => {
  const off = BA.flag('test') || /[?&]islandgp(?=&|=|$)/.test(location.search);
  const S = { owned: false, on: false, flying: false, fuel: 1, air: 0, jetT: 0, puffT: 0, stand: null, pack: null, flames: [], standPos: null, burn: 0, maxY: 0 };
  const FUEL_S = 5.5, REFILL_S = 2.4, THRUST = 30, CLIMB = 10.5, CEIL = 140;
  const { cube, ball, seg, model, V3 } = DLX;

  function buildPack() {
    const g = model('jetpack', (b) => {
      cube(b, 0, 0.1, -0.05, 0.62, 1.05, 0.4, 'blue');                      // body
      cube(b, 0, 0.66, -0.05, 0.5, 0.12, 0.34, 'lgray');                     // top plate
      for (const s of [-1, 1]) {
        seg(b, 'cyl', new V3(s * 0.46, -0.55, -0.12), new V3(s * 0.46, 0.55, -0.12), 0.26, 'lgray');   // tanks
        ball(b, s * 0.46, 0.56, -0.12, 0.52, 0.34, 0.52, 'silver');
        b.tplM('cone', new THREE.Matrix4().compose(new V3(s * 0.46, -0.5, -0.12), new THREE.Quaternion().setFromAxisAngle(new V3(1, 0, 0), Math.PI), new V3(0.44, 0.34, 0.44)), 'dgray');   // nozzles
        cube(b, s * 0.86, 0.35, -0.12, 0.34, 0.08, 0.7, 'tyellow', { glow: false });   // fins
        cube(b, s * 0.74, 0.36, -0.12, 0.12, 0.3, 0.12, 'lgray');
      }
      cube(b, 0, 0.3, 0.19, 0.3, 0.2, 0.06, 'tred', { glow: true });          // the little status light
    });
    const flames = [];
    for (const s of [-1, 1]) {
      const f = model('jet flame', (b) => { b.tplM('flame', new THREE.Matrix4().compose(new V3(0, 0, 0), new THREE.Quaternion().setFromAxisAngle(new V3(1, 0, 0), Math.PI), new V3(0.5, 1.2, 0.5)), 'torange', { glow: true }); ball(b, 0, -0.28, 0, 0.28, 0.55, 0.28, 'tyellow', { glow: true }); });
      f.position.set(s * 0.46, -0.9, -0.12); f.visible = false; g.add(f); flames.push(f);
    }
    return { g, flames };
  }
  function buildStand() {
    const st = model('jetpack stand', (b) => {
      b.box(-2, 0, -2, 4, 1, 4, 'lgray'); b.box(-1, 1, -1, 2, 3, 2, 'dgray'); b.plate(-2, 4, -2, 4, 4, 'blue');
      for (const [x, z] of [[-2, -2], [1, -2], [-2, 1], [1, 1]]) b.box(x, 1, z, 1, 3, 1, 'tyellow', BR.F.GLOW);
    });
    const ring = model('jetpack ring', (b) => { b.tplM('torus', new THREE.Matrix4().compose(new V3(0, 0, 0), new THREE.Quaternion().setFromAxisAngle(new V3(1, 0, 0), Math.PI / 2), new V3(2.6, 2.6, 1.6)), 'tyellow', { glow: true, pulse: true }); });
    ring.position.y = 2.2; st.add(ring); st.userData.ring = ring;
    return st;
  }

  BA.build('jetpack', 93, (scene) => {
    if (off) return;
    S.standPos = DLX.openSpot(GAME.START_AT[0] + 10, GAME.START_AT[1] + 4, 2.5);   // x, y, z
    S.stand = buildStand(); S.stand.position.set(S.standPos[0], S.standPos[1], S.standPos[2]); scene.add(S.stand);
    const pk = buildPack(); S.pack = pk.g; S.flames = pk.flames; S.pack.visible = false; scene.add(S.pack);
    S.demo = buildPack(); S.demo.g.position.set(S.standPos[0], S.standPos[1] + 3.4, S.standPos[2]); scene.add(S.demo.g);
    GAME.interact.add({ id: 'jetpack', pos: () => [S.standPos[0], S.standPos[1], S.standPos[2]], r: 4, priority: 0.4,
      label: () => (S.on ? 'Put the jetpack back' : 'Strap on the Classic Space jetpack'),
      act: () => { if (!S.owned) { S.owned = true; GAME.flag('jetpack', 1); DLX.pop('JETPACK!', 'Jump, then <b>hold Space</b> to fly · <b>J</b> takes it on / off', { kicker: 'New gear', icon: '&#128640;', col: '#4a90e2' }); DLX.sfx('gear', DLX.here()); } equip(!S.on); } });
  });

  function equip(on) { if (!S.owned) return; S.on = !!on; if (typeof GAME !== 'undefined' && GAME.save) GAME.save.flags.jetOn = S.on ? 1 : 0; DLX.sfx(S.on ? 'place' : 'remove', DLX.here()); if (!S.on) S.flying = false; }
  if (!off && typeof GAME !== 'undefined') GAME.on('phase', (d) => { if (d && d.phase === 'play') { S.owned = !!GAME.save.flags.jetpack; S.on = S.owned && GAME.save.flags.jetOn !== 0; S.fuel = 1; } });
  if (!off) window.addEventListener('keydown', (e) => { if (DLX.typing(e) || e.repeat || e.code !== 'KeyJ' || !DLX.play() || GAME.locked()) return; if (!S.owned) { DLX.pop('No jetpack yet', 'There\'s one on the launch stand in the park by the fountain', { icon: '?', col: '#e0e0e0' }); return; } equip(!S.on); });

  // fuel gauge (bottom centre, only while it matters)
  let gauge = null;
  function gaugeUI(show) {
    if (!gauge) {
      const st = document.createElement('style'); st.textContent = `#dlx-fuel{position:fixed;left:50%;bottom:74px;transform:translateX(-50%);z-index:45;width:180px;height:16px;border:3px solid #1a1a1a;border-radius:9px;background:#fffdf5;box-shadow:0 3px 0 #1a1a1a;overflow:hidden;opacity:0;transition:opacity .3s;pointer-events:none}
        #dlx-fuel.on{opacity:1}#dlx-fuel i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(#ffe45a,#ff9a1a);border-right:2px solid #1a1a1a}#dlx-fuel b{position:absolute;inset:0;text-align:center;font:900 10px/10px var(--ui);letter-spacing:.2em;color:#1a1a1a;padding-top:0}`;
      document.head.appendChild(st); gauge = document.createElement('div'); gauge.id = 'dlx-fuel'; gauge.innerHTML = '<i></i><b>JET FUEL</b>'; document.body.appendChild(gauge);
    }
    gauge.classList.toggle('on', show); gauge.firstChild.style.width = (S.fuel * 100).toFixed(1) + '%';
  }

  const _fw = new V3();
  // before the player moves (40): thrust feeds PLAYER.vy, the air speed feeds PLAYER.moveScale
  BA.onUpdate('jetpack', 39.9, (t, dt) => {
    if (off || !S.pack) return;
    if (S.stand) { const r = S.stand.userData.ring; r.rotation.y = t * 1.2; r.position.y = 2.2 + Math.sin(t * 2) * 0.15; if (S.demo) { S.demo.g.visible = !S.on; S.demo.g.rotation.y = t * 0.9; S.demo.g.position.y = S.standPos[1] + 3.4 + Math.sin(t * 1.6) * 0.25; } }
    const ok = S.on && DLX.onFoot() && !(typeof COMBAT !== 'undefined' && COMBAT.dead > 0);
    S.pack.visible = !!ok;
    if (!ok) { S.flying = false; for (const f of S.flames) f.visible = false; gaugeUI(false); return; }
    const f = PLAYER.fig, k = GAME.locked() ? {} : CAM.keys;
    const want = !!k.Space && !PLAYER.grounded && S.fuel > 0 && (PLAYER.vy < 6 || S.flying);
    if (PLAYER.grounded) { S.fuel = Math.min(1, S.fuel + dt / REFILL_S); S.air = 0; S.flying = false; }
    else S.air += dt;
    S.flying = want;
    if (want) {
      const climbCap = f.gy > CEIL ? 0 : CLIMB;
      PLAYER.vy = Math.min(climbCap, PLAYER.vy + (THRUST + 38) * dt);
      if (f.gy > CEIL && PLAYER.vy > 0) PLAYER.vy = 0;
      S.fuel = Math.max(0, S.fuel - dt / FUEL_S); S.burn += dt; S.maxY = Math.max(S.maxY, f.gy - WORLD.y(f.x, f.z));
      S.jetT -= dt; if (S.jetT <= 0) { S.jetT = 0.09; DLX.sfx('jet', { x: f.x, y: f.gy + 2, z: f.z }); }
      S.puffT -= dt; if (S.puffT <= 0) { S.puffT = 0.07; _fw.set(Math.sin(f.yaw), 0, Math.cos(f.yaw)); for (const s of [-1, 1]) { const rx = Math.cos(f.yaw) * s * 0.46; FX.puff(f.x - _fw.x * 0.9 + rx, f.gy + 1.2, f.z - _fw.z * 0.9 - Math.sin(f.yaw) * s * 0.46, { n: 1, col: Math.random() < 0.5 ? 'white' : 'lgray', size: 0.55, up: -2.5, spread: 0.4, life: 0.8 }); } }
    }
    if (!PLAYER.grounded) PLAYER.moveScale = S.flying ? 1.55 : 1.25;
    // the pack rides on your back
    const sy = Math.sin(f.yaw), cy = Math.cos(f.yaw);
    S.pack.position.set(f.x - sy * 0.72, f.gy + 2.38, f.z - cy * 0.72); S.pack.rotation.set(S.flying ? 0.12 : 0, f.yaw, 0);
    for (const fl of S.flames) { fl.visible = S.flying; if (S.flying) { const s = 0.8 + Math.random() * 0.45; fl.scale.set(1, s, 1); } }
    gaugeUI(S.flying || (S.fuel < 0.999 && !PLAYER.grounded) || (S.fuel < 0.999 && S.air === 0 && S.fuel < 0.98));
  });
  return { S, equip };
})();
