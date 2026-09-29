/* ==== p79_settings.js ==== */
/* SETTINGS (Deluxe) — extra rows in the pause menu's Settings page: music / effects / ambience volume, time of day,
   day length, weather and the minimap.  Everything saves per browser (like the original's graphics settings). */
(() => {
  if (BA.flag('test') || typeof GAME === 'undefined') return;
  BA.build('deluxe settings css', 97, () => {
    const st = document.createElement('style'); st.textContent = `
      .mn-set.dlx-h{border-bottom:3px solid #1a1a1a;padding:14px 0 6px}.mn-set.dlx-h .l{font:900 italic 18px var(--chunky);color:#d8262a}
      .dlx-rng{-webkit-appearance:none;appearance:none;width:170px;height:14px;border:3px solid #1a1a1a;border-radius:8px;background:linear-gradient(90deg,#ffd21a var(--v,50%),#fff var(--v,50%));box-shadow:0 2px 0 #1a1a1a;cursor:pointer}
      .dlx-rng::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:24px;border-radius:5px;background:#d8262a;border:3px solid #1a1a1a;box-shadow:0 2px 0 #1a1a1a}
      .dlx-rng::-moz-range-thumb{width:16px;height:20px;border-radius:5px;background:#d8262a;border:3px solid #1a1a1a}`;
    document.head.appendChild(st);
  });
  const seg = (key, cur, opts) => `<div class="mn-seg">${opts.map(([v, t]) => `<div class="bbtn ${String(cur) === String(v) ? 'on' : 'white'}" data-x="${key}" data-v="${v}">${t}</div>`).join('')}</div>`;
  const row = (label, hint, ctl) => `<div class="mn-set"><div class="l">${label}<small>${hint}</small></div>${ctl}</div>`;
  const rng = (key, v) => `<input type="range" class="dlx-rng" min="0" max="100" value="${Math.round(v * 100)}" data-r="${key}" style="--v:${Math.round(v * 100)}%">`;
  DLX.setting({
    html() {
      let h = `<div class="mn-set dlx-h"><div class="l">DELUXE</div></div>`;
      if (typeof AUDIO !== 'undefined') {
        const V = AUDIO.S.vol;
        h += row('Sound', 'N toggles it any time', seg('mute', AUDIO.S.muted ? 1 : 0, [[0, 'On'], [1, 'Off']]));
        h += row('Music', 'a little band for every land', rng('music', V.music));
        h += row('Effects', 'footsteps, studs, swords, bricks', rng('sfx', V.sfx));
        h += row('Ambience', 'surf, wind, birds, crickets, rain', rng('amb', V.amb));
      }
      if (typeof DAYNIGHT !== 'undefined') {
        const D = DAYNIGHT.S;
        h += row('Time of day', 'Cycle lets the sun go round', seg('tod', D.mode, [['cycle', 'Cycle'], [8, 'Morning'], [12.5, 'Noon'], [16.5, 'Golden'], [18.7, 'Sunset'], [23, 'Night']]));
        h += row('Day length', 'one full day and night', seg('day', D.dayMin, [[12, '12 min'], [24, '24 min'], [48, '48 min']]));
        h += row('Weather', 'Auto: showers, storms, snow, rainbows', seg('wx', D.wxMode, [['auto', 'Auto'], ['clear', 'Clear'], ['rain', 'Rain'], ['storm', 'Storm'], ['snow', 'Snow']]));
      }
      if (typeof MINIMAP !== 'undefined') h += row('Minimap', 'bottom right · click it for the big map', seg('mini', MINIMAP.S.on ? 1 : 0, [[1, 'On'], [0, 'Off']]));
      return h;
    },
    bind(box, rerender) {
      box.querySelectorAll('[data-x]').forEach((b) => b.addEventListener('click', () => {
        const k = b.dataset.x, v = b.dataset.v;
        if (k === 'mute') { if (typeof AUDIO !== 'undefined') { AUDIO.resume(); AUDIO.toggleMute(v === '1'); } }
        if (k === 'tod') DAYNIGHT.set(v === 'cycle' ? 'cycle' : +v);
        if (k === 'day') DAYNIGHT.setDayLength(+v);
        if (k === 'wx') DAYNIGHT.weather(v);
        if (k === 'mini') MINIMAP.setOn(v === '1');
        rerender();
      }));
      box.querySelectorAll('[data-r]').forEach((r) => {
        r.addEventListener('input', () => { r.style.setProperty('--v', r.value + '%'); if (typeof AUDIO !== 'undefined') { AUDIO.resume(); AUDIO.setVol(r.dataset.r, r.value / 100); } });
        r.addEventListener('change', () => { if (typeof AUDIO !== 'undefined' && r.dataset.r === 'sfx') AUDIO.sfx('coin', {}); });
        r.addEventListener('keydown', (e) => e.stopPropagation());
      });
    },
  });
})();
