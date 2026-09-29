/* ==== p72_dlxkit.js ==== */
/* DLX — small helpers the Deluxe parts share: brick-model primitives at any position (units, not the stud grid),
   a pop-up card for news / trophies, the listener's position, a pause-menu hook and a key hook that respects the game's
   own locks (modals, text fields, vehicles). */
const DLX = (() => {
  const V3 = THREE.Vector3, Q0 = new THREE.Quaternion(), Y = new V3(0, 1, 0);
  // primitives on a BR model builder, in model units (y up), like the creature kit in COMBAT
  const cube = (b, x, y, z, sx, sy, sz, col, o = {}) => b.tplM('box', new THREE.Matrix4().compose(new V3(x, y - sy / 2, z), o.q || Q0, new V3(sx, sy, sz)), col, o);
  const ball = (b, x, y, z, sx, sy, sz, col, o = {}) => b.tplM('sphere', new THREE.Matrix4().compose(new V3(x, y, z), Q0, new V3(sx, sy, sz)), col, o);
  const seg = (b, name, a, c, r, col, o = {}) => { const d = new V3().subVectors(c, a), L = d.length(); if (L < 1e-4) return; const q = new THREE.Quaternion().setFromUnitVectors(Y, d.clone().normalize()); b.tplM(name, new THREE.Matrix4().compose(a, q, new V3(r * 2, L, r * 2)), col, o); };
  const model = (name, fn) => { const g = BR.makeModel(fn, { name }); g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
  const play = () => typeof GAME !== 'undefined' && GAME.phase === 'play';
  const onFoot = () => play() && PLAYER.active && PLAYER.fig && !PLAYER.driving && !(typeof INTERIOR !== 'undefined' && INTERIOR.cur) && !(typeof TRAINRIDE !== 'undefined' && TRAINRIDE.S && TRAINRIDE.S.on);
  const here = () => { const p = play() ? GAME.playerPos() : null; return p ? { x: p[0], y: p[1], z: p[2] } : { x: CAM.tgt.x, y: CAM.tgt.y, z: CAM.tgt.z }; };
  const typing = (e) => e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
  const sfx = (n, o) => { if (typeof AUDIO !== 'undefined') AUDIO.sfx(n, o || {}); };

  /* an open, flat, dry patch of ground near (x, z) for a prop of half-size r: [x, groundY, z] (spiral search) */
  function openSpot(x, z, r = 2.5, rMax = 40) {
    const cell = (y) => Math.floor(y / 0.4 + 1e-4);
    const ok = (cx, cz) => {
      const g0 = WORLD.ground(cx, cz, WORLD.y(cx, cz) + 1.3); if (g0 < 0.3 && WORLD.isWater(cx, cz)) return null;
      for (let dx = -r; dx <= r; dx += 1) for (let dz = -r; dz <= r; dz += 1) {
        const px = cx + dx, pz = cz + dz, g = WORLD.ground(px, pz, g0 + 1.3);
        if (Math.abs(g - g0) > 0.45 || (g < 0.3 && WORLD.isWater(px, pz))) return null;
        for (let c = cell(g + 0.2); c <= cell(g + 4); c++) if (BR.solid(Math.floor(px), c, Math.floor(pz))) return null;
        if (typeof FIG !== 'undefined' && FIG.nowalk && (FIG.nowalk(px, pz) & 5)) return null;
        if (LAYOUT.TRACK && LAYOUT.TRACK.nearest(px, pz).d < 5) return null;
      }
      return g0;
    };
    for (let rr = 0; rr <= rMax; rr += 1.5) for (let a = 0; a < M.TAU; a += Math.max(0.2, 1.4 / Math.max(1, rr))) {
      const cx = Math.round(x + Math.cos(a) * rr) + 0.5, cz = Math.round(z + Math.sin(a) * rr) + 0.5, g = ok(cx, cz);
      if (g !== null) return [cx, g, cz];
    }
    const s = PLAYER.spawnNear(x, z); return [s[0], s[2], s[1]];
  }

  /* pop-up cards (bottom right, above the minimap, stacked): {title, sub, icon (html), col} */
  let box = null; const queue = [];
  function pop(title, sub, o = {}) {
    if (BA.flag('test') || BA.flag('shot')) return;
    if (!box) {
      const st = document.createElement('style'); st.textContent = `
        #dlx-pops{position:fixed;right:16px;bottom:252px;z-index:70;display:flex;flex-direction:column-reverse;gap:10px;pointer-events:none;max-width:min(360px,calc(100vw - 32px))}
        .dlx-pop{display:flex;align-items:center;gap:12px;background:#fffdf5;color:#1a1a1a;border:3px solid #1a1a1a;border-radius:12px;padding:10px 14px 10px 10px;box-shadow:0 5px 0 #1a1a1a,0 12px 28px rgba(0,0,0,.35);transform:translateX(120%);transition:transform .45s cubic-bezier(.3,1.5,.5,1),opacity .4s;font:600 13px var(--ui)}
        .dlx-pop.on{transform:none}.dlx-pop.off{opacity:0;transform:translateX(30%)}
        .dlx-pop .ic{flex:none;width:46px;height:46px;border-radius:10px;border:3px solid #1a1a1a;display:flex;align-items:center;justify-content:center;font:900 24px var(--chunky);color:#1a1a1a;box-shadow:inset 0 -5px 0 rgba(0,0,0,.14)}
        .dlx-pop .tx b{display:block;font:900 italic 16px var(--chunky);letter-spacing:.02em;margin-bottom:2px}
        .dlx-pop .tx small{display:block;font:800 10px var(--ui);letter-spacing:.14em;text-transform:uppercase;color:#d8262a;margin-bottom:2px}`;
      document.head.appendChild(st);
      box = document.createElement('div'); box.id = 'dlx-pops'; document.body.appendChild(box);
    }
    const el = document.createElement('div'); el.className = 'dlx-pop';
    el.innerHTML = `<div class="ic" style="background:${o.col || '#ffd21a'}">${o.icon || '&#9733;'}</div><div class="tx">${o.kicker ? `<small>${o.kicker}</small>` : ''}<b>${title}</b>${sub || ''}</div>`;
    box.appendChild(el); queue.push(el); while (queue.length > 3) { const x = queue.shift(); x.remove(); }
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('on')));
    setTimeout(() => { el.classList.add('off'); setTimeout(() => { el.remove(); const i = queue.indexOf(el); if (i >= 0) queue.splice(i, 1); }, 450); }, o.ms || 5200);
  }

  /* pause-menu entries from the Deluxe parts: GAME.xpause [{a, t, cls, act}] (patched into MENUS) */
  function pauseItem(it) { if (typeof GAME === 'undefined') return; (GAME.xpause = GAME.xpause || []).push(it); }
  function setting(row) { if (typeof GAME === 'undefined') return; (GAME.xsettings = GAME.xsettings || []).push(row); }

  return { cube, ball, seg, model, play, onFoot, here, typing, sfx, pop, pauseItem, setting, openSpot, V3 };
})();
