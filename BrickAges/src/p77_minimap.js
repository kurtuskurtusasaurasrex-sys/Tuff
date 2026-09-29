/* ==== p77_minimap.js ==== */
/* MINIMAP — a round radar in the bottom-right corner while you play: the island map (the same booklet-style image as
   the big M map) turns with your camera so "up" is always where you're looking; your arrow in the middle, the quest
   target as a star (pinned to the rim when it's far), your vehicles, the train, Bricksy and the jetpack stand; N on the
   rim, the land's name + the clock on top.  Click it for the big map.  Settings: Minimap on / off.
   API: MINIMAP.S {on, zoom} */
const MINIMAP = (() => {
  const off = BA.flag('test') || /[?&]islandgp(?=&|=|$)/.test(location.search);
  const S = { on: true, zoom: 1.7, base: null, el: null, cv: null, g: null, acc: 0, D: 164 };
  try { const v = localStorage.getItem('brickages.minimap.v1'); if (v === '0') S.on = false; } catch (e) { /* */ }
  const setOn = (v) => { S.on = !!v; try { localStorage.setItem('brickages.minimap.v1', S.on ? '1' : '0'); } catch (e) { /* */ } };
  const ZN = { town: 'TOWN', castle: 'CASTLE', forest: 'FORESTMEN', fright: 'FRIGHT KNIGHTS', rock: 'ROCK RAIDERS', space: 'SPACE', desert: 'WILD WEST', island: 'ISLANDERS', pirate: 'PIRATES', bay: "BUILDER'S BAY" };

  BA.build('minimap', 98, () => {
    if (off) return;
    const st = document.createElement('style'); st.textContent = `
      #dlx-mini{position:fixed;right:16px;bottom:16px;z-index:44;width:${S.D + 8}px;display:none;flex-direction:column;align-items:center;gap:6px;pointer-events:none}
      body.ph-play #dlx-mini.on{display:flex}
      #dlx-mini .ring{position:relative;width:${S.D + 8}px;height:${S.D + 8}px;border-radius:50%;border:4px solid #1a1a1a;background:#0b2b66;box-shadow:0 5px 0 #1a1a1a,0 12px 26px rgba(0,0,0,.35);overflow:hidden;pointer-events:auto;cursor:pointer}
      #dlx-mini canvas{display:block;width:${S.D}px;height:${S.D}px}
      #dlx-mini .zn{font:900 italic 12px var(--chunky);letter-spacing:.06em;color:#fff;text-shadow:2px 2px 0 #1a1a1a,-1px -1px 0 #1a1a1a,1px -1px 0 #1a1a1a,-1px 1px 0 #1a1a1a;white-space:nowrap}
      body.ph-play #dlx-clock{position:static;transform:none;order:-1}`;
    document.head.appendChild(st);
    const el = document.createElement('div'); el.id = 'dlx-mini'; el.innerHTML = `<div class="ring"><canvas></canvas></div><div class="zn"></div>`;
    (document.getElementById('ui') || document.body).appendChild(el);
    S.el = el; S.cv = el.querySelector('canvas'); S.zn = el.querySelector('.zn');
    const dpr = Math.min(2, window.devicePixelRatio || 1); S.dpr = dpr; S.cv.width = S.cv.height = Math.round(S.D * dpr); S.g = S.cv.getContext('2d');
    el.querySelector('.ring').addEventListener('click', () => { const H = GAME.mod('hud'); if (H && H.openMap && !GAME.locked()) H.openMap(); });
    // the clock rides on top of the minimap while playing
    const ck = document.getElementById('dlx-clock'); if (ck) el.insertBefore(ck, el.firstChild);
    try { S.base = HUD.mapBase(); } catch (e) { console.error('minimap base', e); }
  });

  const _d = new THREE.Vector3();
  function star(g, x, y, r, fill, stroke) { g.beginPath(); for (let k = 0; k < 10; k++) { const rr = k % 2 ? r * 0.45 : r, a = k / 10 * M.TAU - Math.PI / 2; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); g.fillStyle = fill; g.fill(); g.lineWidth = 2; g.strokeStyle = stroke; g.stroke(); }
  function dot(g, x, y, r, fill, txt) { g.beginPath(); g.arc(x, y, r, 0, M.TAU); g.fillStyle = fill; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1a1a1a'; g.stroke(); if (txt) { g.fillStyle = '#1a1a1a'; g.font = `900 ${Math.round(r * 1.3)}px Arial`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, x, y + 0.5); } }
  function draw() {
    const g = S.g, dpr = S.dpr, D = S.D * dpr, c = D / 2, R = c - 2, s = S.zoom * dpr, N = WORLD.N, HALF = WORLD.HALF;
    const p = GAME.playerPos(); if (!p) return; const px = p[0], pz = p[2];
    GFX.camera.getWorldDirection(_d); const th = -Math.PI / 2 - Math.atan2(_d.z, _d.x);
    const cs = Math.cos(th), sn = Math.sin(th);
    const scr = (x, z) => { const dx = (x - px) * s, dz = (z - pz) * s; return [c + dx * cs - dz * sn, c + dx * sn + dz * cs]; };
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, D, D);
    g.save(); g.beginPath(); g.arc(c, c, R, 0, M.TAU); g.clip();
    g.fillStyle = '#1c5fb8'; g.fillRect(0, 0, D, D);
    if (S.base) { g.save(); g.translate(c, c); g.rotate(th); g.scale(s, s); g.translate(-(px + HALF), -(pz + HALF)); g.imageSmoothingEnabled = false; g.drawImage(S.base, 0, 0, N, N); g.restore(); }
    // night: the map dims a touch
    if (typeof DAYNIGHT !== 'undefined' && DAYNIGHT.S) { const n = DAYNIGHT.S.night; if (n > 0.02) { g.fillStyle = `rgba(8,14,40,${(n * 0.45).toFixed(3)})`; g.fillRect(0, 0, D, D); } }
    // markers
    const D0 = GAME.mod('drive'); if (D0 && D0.markers) { try { for (const m of D0.markers()) { if (m.kind === 'gate' || m.kind === 'race' || m.kind === 'dock') continue; const [x, y] = scr(m.x, m.z); if (Math.hypot(x - c, y - c) < R - 6) dot(g, x, y, 5.5 * dpr, m.kind === 'car' ? '#d8262a' : m.kind === 'horse' ? '#a0703a' : '#4a90e2'); } } catch (e) { /* */ } }
    if (typeof TRAIN !== 'undefined' && TRAIN.cars && TRAIN.cars[0]) { const q = TRAIN.cars[0].position, [x, y] = scr(q.x, q.z); if (Math.hypot(x - c, y - c) < R - 6) { g.fillStyle = '#f2f3f0'; g.strokeStyle = '#1a1a1a'; g.lineWidth = 2; g.fillRect(x - 6 * dpr, y - 4 * dpr, 12 * dpr, 8 * dpr); g.strokeRect(x - 6 * dpr, y - 4 * dpr, 12 * dpr, 8 * dpr); } }
    if (typeof JETPACK !== 'undefined' && JETPACK.S.standPos && !JETPACK.S.owned) { const q = JETPACK.S.standPos, [x, y] = scr(q[0], q[2]); if (Math.hypot(x - c, y - c) < R - 6) dot(g, x, y, 6 * dpr, '#ffd21a', 'J'); }
    if (typeof PET !== 'undefined' && PET.S.g && PET.S.g.visible) { const [x, y] = scr(PET.S.x, PET.S.z); if (Math.hypot(x - c, y - c) < R - 6) dot(g, x, y, 4.5 * dpr, '#e8b86a'); }
    // quest target: a star, pinned to the rim when it's out of range
    const Q = GAME.mod('quest'); let tr = null; try { tr = Q && Q.tracked ? Q.tracked() : null; } catch (e) { /* */ }
    if (tr && tr.target) { let [x, y] = scr(tr.target[0], tr.target[2]); const dd = Math.hypot(x - c, y - c); if (dd > R - 10) { x = c + (x - c) / dd * (R - 10); y = c + (y - c) / dd * (R - 10); } star(g, x, y, 8 * dpr, '#ffd21a', '#d8262a'); }
    g.restore();
    // rim: N
    { const a = th - Math.PI / 2, x = c + Math.cos(a) * (R - 11 * dpr), y = c + Math.sin(a) * (R - 11 * dpr); dot(g, x, y, 8 * dpr, '#fffdf5', 'N'); }
    // you
    const f = PLAYER.fig, yaw = PLAYER.driving && D0 && D0.S && D0.S.cur ? D0.S.cur.yaw || 0 : f ? f.yaw : 0;
    g.save(); g.translate(c, c); g.rotate(th + Math.atan2(Math.cos(yaw), Math.sin(yaw)) + Math.PI / 2); g.scale(dpr, dpr);
    g.beginPath(); g.moveTo(0, -10); g.lineTo(7, 7); g.lineTo(0, 3.5); g.lineTo(-7, 7); g.closePath(); g.fillStyle = '#ffd21a'; g.strokeStyle = '#1a1a1a'; g.lineWidth = 2.5; g.lineJoin = 'round'; g.fill(); g.stroke(); g.restore();
  }
  BA.onUpdate('minimap', 65, (t, dt) => {
    if (off || !S.el) return;
    const show = S.on && DLX.play() && !(typeof INTERIOR !== 'undefined' && INTERIOR.cur) && !(typeof BUILD !== 'undefined' && BUILD.S && BUILD.S.active) && !(GAME.mod('hud') && GAME.mod('hud').mapOn);
    S.el.classList.toggle('on', show); if (!show) return;
    S.acc += dt; if (S.acc < 1 / 20) return; S.acc = 0;
    try { draw(); } catch (e) { if (!S.err) { S.err = true; console.error('minimap', e); } }
    const z = typeof UI !== 'undefined' ? UI.S.zone : null, zn = z && ZN[z] ? ZN[z] : ''; if (S.zn.textContent !== zn) S.zn.textContent = zn;
  });
  return { S, setOn };
})();
