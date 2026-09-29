/* ==== p76_trophies.js ==== */
/* TROPHIES — thirty-three things to do on the island, from your first hundred studs of walking to the Rock Monster
   King.  Each one pops up a card with a fanfare when you earn it; the pause menu's TROPHIES page is the trophy room
   (earned ones in gold, the rest with a hint).  Kept in the save: GAME.save.flags['tr:<id>'], plus a few running totals
   (dlxWalk, dlxKills, dlxJet, dlxHigh).  API: TROPHIES.list · TROPHIES.award(id) · TROPHIES.open() */
const TROPHIES = (() => {
  const off = BA.flag('test') || /[?&]islandgp(?=&|=|$)/.test(location.search);
  const F = () => (typeof GAME !== 'undefined' && GAME.save ? GAME.save.flags : {});
  const num = (k) => +(F()[k] || 0);
  const qDone = () => { const s = GAME.save.quests || {}; return Object.keys(s).filter((k) => s[k] && s[k].state === 'done').length; };
  const qAll = () => { const Q = GAME.mod('quest'); try { const L = Q && Q.list ? Q.list() : []; return L.length > 0 && L.every((q) => q.state === 'done'); } catch (e) { return false; } };
  const gear = () => (typeof COMBAT !== 'undefined' && COMBAT.ORDER ? COMBAT.ORDER.filter((g) => g !== 'fists' && COMBAT.owned && COMBAT.owned(g)).length : 0);
  const LANDS = ['town', 'castle', 'forest', 'fright', 'rock', 'space', 'desert', 'island', 'pirate'];
  const lands = () => LANDS.filter((l) => F()['land:' + l]).length;
  const T = [
    ['firstSteps', 'First Steps', 'Walk 100 studs', '&#128099;', () => num('dlxWalk') >= 100],
    ['marathon', 'Marathon Minifig', 'Walk 5,000 studs', '&#127939;', () => num('dlxWalk') >= 5000],
    ['studs1k', 'Pocket Money', 'Hold 1,000 studs', '&#9679;', () => GAME.save.studs >= 1000],
    ['studs10k', 'Stud Tycoon', 'Hold 10,000 studs', '&#9673;', () => GAME.save.studs >= 10000],
    ['studs50k', 'Brick Billionaire', 'Hold 50,000 studs', '&#128176;', () => GAME.save.studs >= 50000],
    ['red1', 'Something Red', 'Find a hidden red brick', '&#129521;', () => (GAME.save.redBricks || []).length >= 1],
    ['red10', 'Red Brick Collector', 'Find all ten red bricks', '&#127942;', () => (GAME.save.redBricks || []).length >= 10],
    ['quest1', 'Helping Hand', 'Complete a quest', '&#10004;', () => qDone() >= 1],
    ['quest5', 'Hero of the Island', 'Complete five quests', '&#9876;', () => qDone() >= 5],
    ['questAll', 'Legend of the Brick Ages', 'Complete every quest', '&#128081;', () => qAll()],
    ['lands', 'Grand Tourist', 'Set foot in all nine lands', '&#127758;', () => lands() >= 9],
    ['sets', 'Set Collector', 'Walk into five of the classic sets', '&#127968;', () => typeof INTERIOR !== 'undefined' && INTERIOR.setsFound && INTERIOR.setsFound() >= 5],
    ['train', 'All Aboard!', 'Ride the 9V Express', '&#128646;', () => !!F()['tr_train']],
    ['car', 'Sunday Driver', 'Drive the Town pickup', '&#128663;', () => !!F()['tr_car']],
    ['horse', 'Saddle Up', 'Ride the horse by the jousting lists', '&#128052;', () => !!F()['tr_horse']],
    ['boat', 'Sea Legs', 'Take a boat out', '&#9973;', () => !!F()['tr_boat']],
    ['kills10', 'Monster Masher', 'Defeat 10 creatures', '&#128165;', () => num('dlxKills') >= 10],
    ['kills100', 'Brick Breaker', 'Defeat 100 creatures', '&#128481;', () => num('dlxKills') >= 100],
    ['king', 'King Slayer', 'Defeat the Rock Monster King', '&#128142;', () => !!F()['tr_king']],
    ['respawn', 'Brick by Brick', 'Fall apart and snap back together', '&#129513;', () => !!F()['tr_respawn']],
    ['gear', 'Armed and Ready', 'Collect four pieces of land gear', '&#128737;', () => gear() >= 4],
    ['builder', 'Master Builder', "Build 50 bricks at Builder's Bay", '&#129521;', () => num('dlxBuilt') >= 50],
    ['jet', 'Rocket Minifig', 'Fly the jetpack for 30 seconds', '&#128640;', () => num('dlxJet') >= 30],
    ['jetHigh', 'Sky High', 'Fly 100 studs above the ground', '&#9729;', () => num('dlxHigh') >= 100],
    ['pet', 'Best Friends', 'Adopt Bricksy', '&#128054;', () => !!F().pet],
    ['petFind', 'Good Nose!', 'Let Bricksy sniff out a treasure', '&#128062;', () => !!F().petFound],
    ['night', 'Night Owl', 'Be out and about at midnight', '&#127769;', () => !!F()['tr_night']],
    ['storm', 'Singing in the Rain', 'Get caught in a thunderstorm', '&#9928;', () => !!F()['tr_storm']],
    ['rainbow', 'Over the Rainbow', 'See a rainbow after the rain', '&#127752;', () => !!F()['tr_rainbow']],
    ['snow', 'Brick Christmas', 'Stand in falling snow', '&#10052;', () => !!F()['tr_snow']],
    ['fireworks', 'Pyrotechnician', 'Launch fireworks from the quay', '&#127878;', () => num('fireworks') >= 1],
    ['racer', 'Brickspeed Champion', 'Win a race at the Brickspeed Raceway', '&#127937;', () => GAME.unlocked && !!GAME.save.unlocks['print:racer']],
    ['mark', 'Creative Visit', 'Find the creative lab by the river', '&#127912;', () => GAME.unlocked && !!GAME.save.unlocks['face:markBeard']],
  ];
  const has = (id) => !!F()['tr:' + id];
  function award(id) {
    const t = T.find((x) => x[0] === id); if (!t || has(id)) return false;
    F()['tr:' + id] = Date.now();
    const n = T.filter((x) => has(x[0])).length;
    DLX.pop(t[1], `${t[2]} <span style="color:#888">· ${n}/${T.length}</span>`, { kicker: 'Trophy unlocked', icon: t[3], col: '#ffd21a', ms: 6000 });
    DLX.sfx('trophy', {});
    if (GAME.store) GAME.store();
    return true;
  }

  /* running totals + event flags */
  const O = { lx: null, lz: null, dead: 0, built: null, chkT: 0 };
  if (!off && typeof GAME !== 'undefined') {
    GAME.on('train:board', () => { F().tr_train = 1; });
    GAME.on('vehicle:enter', () => { const D = GAME.mod('drive'); const k = D && D.kind ? D.kind() : null; if (k) F()['tr_' + k] = 1; });
    GAME.on('phase', (d) => { if (d && d.phase === 'play') { O.lx = null; O.dead = 0; O.built = null; } });
  }
  if (!off && typeof COMBAT !== 'undefined' && COMBAT.onKill) COMBAT.onKill((E) => { if (!DLX.play()) return; F().dlxKills = num('dlxKills') + 1; if (E && E.T && E.T.boss) F().tr_king = 1; });

  BA.onUpdate('trophies', 66, (t, dt) => {
    if (off || !DLX.play()) return;
    const f = PLAYER.active && PLAYER.fig;
    if (f && !PLAYER.driving) { if (O.lx !== null) { const d = Math.hypot(f.x - O.lx, f.z - O.lz); if (d < 5 && PLAYER.grounded) F().dlxWalk = num('dlxWalk') + d; } O.lx = f.x; O.lz = f.z; } else O.lx = null;
    if (typeof COMBAT !== 'undefined') { if (O.dead && !(COMBAT.dead > 0)) F().tr_respawn = 1; O.dead = COMBAT.dead > 0; }
    if (typeof JETPACK !== 'undefined') { const J = JETPACK.S; if (J.flying) F().dlxJet = num('dlxJet') + dt; if (J.maxY > num('dlxHigh')) F().dlxHigh = Math.round(J.maxY); }
    if (typeof BUILD !== 'undefined' && BUILD.S && BUILD.S.active && BUILD._count) { const n = BUILD._count(); if (O.built !== null && n > O.built) F().dlxBuilt = num('dlxBuilt') + (n - O.built); O.built = n; } else O.built = null;
    const z = typeof UI !== 'undefined' ? UI.S.zone : null; if (z && LANDS.includes(z)) F()['land:' + z] = 1;
    if (typeof DAYNIGHT !== 'undefined' && DAYNIGHT.S && !(typeof INTERIOR !== 'undefined' && INTERIOR.cur)) {
      const D = DAYNIGHT.S, h = D.hour % 24;
      if (h >= 23.9 || h < 0.6) F().tr_night = 1;
      if (D.W.kind === 'storm' && D.W.rain > 0.6) F().tr_storm = 1;
      if (D.W.rainbow > 0.5 && D.sunEl > 3) F().tr_rainbow = 1;
      if (D.W.snow > 0.5) F().tr_snow = 1;
    }
    O.chkT -= dt; if (O.chkT > 0) return; O.chkT = 1;
    for (const x of T) { if (has(x[0])) continue; let ok = false; try { ok = x[4](); } catch (e) { ok = false; } if (ok) { award(x[0]); break; } }   // one card at a time
  });

  /* the trophy room */
  let root = null;
  function open() {
    if (!root) {
      const st = document.createElement('style'); st.textContent = `
        #dlx-tr{position:fixed;inset:0;z-index:66;display:none;align-items:center;justify-content:center;background:radial-gradient(ellipse at center,rgba(6,18,50,.35) 0,rgba(6,18,50,.72) 100%)}
        #dlx-tr.on{display:flex}
        #dlx-tr .card{color:#1a1a1a;width:min(860px,94vw);max-height:88vh;display:flex;flex-direction:column;background:#fffdf5;border:4px solid #1a1a1a;border-radius:16px;box-shadow:0 8px 0 #1a1a1a,0 24px 60px rgba(0,0,0,.45);overflow:hidden}
        #dlx-tr .hd{background:#ffd21a;border-bottom:4px solid #1a1a1a;padding:14px 20px;display:flex;justify-content:space-between;align-items:baseline;gap:10px}
        #dlx-tr .hd b{font:900 italic 32px var(--chunky);color:#1a1a1a;text-shadow:2px 2px 0 #fff}
        #dlx-tr .hd span{font:800 13px var(--ui);color:#1a1a1a;letter-spacing:.06em}
        #dlx-tr .gr{overflow-y:auto;padding:16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:10px}
        #dlx-tr .t{color:#1a1a1a;display:flex;gap:10px;align-items:center;border:3px solid #1a1a1a;border-radius:10px;padding:8px;background:#fff;box-shadow:0 3px 0 #1a1a1a}
        #dlx-tr .t .i{flex:none;width:40px;height:40px;border-radius:8px;border:3px solid #1a1a1a;background:#ffd21a;display:flex;align-items:center;justify-content:center;font-size:20px}
        #dlx-tr .t.no{background:#eeeae0;box-shadow:0 3px 0 #9a968c;border-color:#9a968c}#dlx-tr .t.no .i{background:#d6d2c8;border-color:#9a968c;filter:grayscale(1);opacity:.55}
        #dlx-tr .t b{display:block;font:900 13px var(--ui)}#dlx-tr .t small{display:block;font:600 11px var(--ui);color:#555;margin-top:2px}
        #dlx-tr .ft{border-top:3px solid #1a1a1a;padding:10px 16px;display:flex;justify-content:flex-end}
        #dlx-tr .ft div{color:#1a1a1a;cursor:pointer;background:#fff;border:3px solid #1a1a1a;border-radius:9px;padding:6px 16px;font:900 14px var(--ui);box-shadow:0 3px 0 #1a1a1a}`;
      document.head.appendChild(st);
      root = document.createElement('div'); root.id = 'dlx-tr'; document.body.appendChild(root);
      root.addEventListener('pointerdown', (e) => { if (e.target === root) close(); });
    }
    const n = T.filter((x) => has(x[0])).length;
    root.innerHTML = `<div class="card"><div class="hd"><b>TROPHY ROOM</b><span>${n} / ${T.length} earned</span></div><div class="gr">${T.map((x) => `<div class="t ${has(x[0]) ? '' : 'no'}"><div class="i">${x[3]}</div><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join('')}</div><div class="ft"><div id="dlx-tr-x">Close &nbsp;<kbd>Esc</kbd></div></div></div>`;
    root.querySelector('#dlx-tr-x').addEventListener('click', close);
    root.classList.add('on'); GAME.modal.open({ id: 'trophies', close });
  }
  function close() { if (root) root.classList.remove('on'); if (GAME.modal.isOpen('trophies')) GAME.modal.close('trophies'); }
  if (!off) DLX.pauseItem({ a: 'trophies', t: 'Trophy Room', cls: '', act: () => open() });
  return { list: T, award, open, close, has };
})();
