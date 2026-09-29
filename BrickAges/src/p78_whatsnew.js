/* ==== p78_whatsnew.js ==== */
/* WHAT'S NEW — a card on the title screen listing what the Deluxe Edition adds, so nobody misses the jetpack. */
(() => {
  if (BA.flag('test')) return;
  BA.build('deluxe title card', 99, () => {
    const T = document.getElementById('mn-title'); if (!T) return;
    const st = document.createElement('style'); st.textContent = `
      #dlx-new{position:absolute;right:max(4vw,24px);top:50%;transform:translateY(-50%) rotate(1.5deg);width:min(340px,30vw);pointer-events:auto;background:#fffdf5;color:#1a1a1a;border:4px solid #1a1a1a;border-radius:14px;box-shadow:0 7px 0 #1a1a1a,0 20px 50px rgba(0,0,0,.45);overflow:hidden}
      #dlx-new .hd{background:#d8262a;border-bottom:4px solid #1a1a1a;padding:10px 14px 8px}
      #dlx-new .hd small{display:block;font:800 10px var(--ui);letter-spacing:.24em;color:#ffd21a}
      #dlx-new .hd b{display:block;font:900 italic 24px/1 var(--chunky);color:#fff;text-shadow:2px 2px 0 #1a1a1a;letter-spacing:.02em}
      #dlx-new ul{list-style:none;margin:0;padding:10px 14px 12px;display:flex;flex-direction:column;gap:7px}
      #dlx-new li{display:flex;gap:10px;align-items:center;font:600 12.5px/1.25 var(--ui)}
      #dlx-new li i{flex:none;width:28px;height:28px;border-radius:7px;border:2.5px solid #1a1a1a;background:#ffd21a;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:15px}
      #dlx-new li b{font-weight:900}
      #dlx-new kbd{display:inline-block;font:900 10px var(--ui);background:#ffd21a;border:2px solid #1a1a1a;border-radius:4px;padding:0 4px;margin:0 1px}
      @media (max-width:1100px),(max-height:560px){#dlx-new{display:none}}`;
    document.head.appendChild(st);
    const el = document.createElement('div'); el.id = 'dlx-new';
    const items = [
      ['&#127925;', '<b>Music &amp; sound</b> for every land — a band that plays along · <kbd>N</kbd> mutes'],
      ['&#9728;', '<b>Day &amp; night</b> — sunsets, moonlit nights, lit windows, rain, storms, snow &amp; rainbows'],
      ['&#128640;', '<b>Jetpack</b> on the stand by the fountain — jump, then hold <kbd>Space</kbd>'],
      ['&#128054;', '<b>Bricksy the dog</b> — adopt her in the park; she sniffs out studs'],
      ['&#127878;', '<b>Fireworks</b> over the harbour every night (and when you finish a quest)'],
      ['&#127942;', '<b>33 trophies</b> — see them in the pause menu\'s Trophy Room'],
      ['&#129517;', '<b>Minimap</b> in the corner — click it for the big map'],
      ['&#129513;', '<b>Reworked minifigs</b> — rounder heads, hair &amp; hands, real hip joints'],
    ];
    el.innerHTML = `<div class="hd"><small>NEW IN THE</small><b>DELUXE EDITION</b></div><ul>${items.map(([i, t]) => `<li><i>${i}</i><span>${t}</span></li>`).join('')}</ul>`;
    T.appendChild(el);
  });
})();
