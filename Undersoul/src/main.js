// UNDERSOUL — entry point and top-level flow.
import { Engine } from './core/engine.js';
import { UI } from './ui/ui.js';
import { game } from './core/game.js';
import { input } from './core/input.js';
import { loadFonts, FONTS } from './ui/fonts.js';
import { audio } from './audio/audio.js';
import { music, registerTracks } from './audio/sequencer.js';
import { flushPendingAmbience } from './audio/sfx.js';
import { ALL_TRACKS } from './audio/tracks/index.js';
import { registerSpeakers } from './ui/dialogue.js';
import { SPEAKERS } from './story/speakers.js';
import { settings, newGame, loadGame, S, getMeta, metaFlag } from './core/save.js';
import { TitleMode } from './modes/title.js';
import { IntroMode } from './modes/intro.js';
import { CreatorMode, SoulSelectMode } from './modes/creator.js';
import { maxHp } from './data/stats.js';
import { startWorld } from './world/world.js';
import { setupTouch } from './ui/touch.js';

class GateMode {
  id = 'gate';
  // First screen: a click/key is needed before browsers allow audio.
  constructor() { this.t = 0; this.state = 'wait'; }
  run() { return new Promise((r) => { this.resolve = r; game.setMode(this); }); }
  update(dt) {
    this.t += dt;
    if (this.state === 'wait' && (input.pressed('confirm') || input.pressed('cancel') || input.pressed('menu') || this.gestured)) {
      this.state = 'loading';
      this.lt = 0;
    } else if (this.state === 'loading') {
      this.lt += dt;
      if (this.lt > 0.05 && !this.inited) {
        this.inited = true;
        try { audio.init(); audio.resume(); } catch (e) { console.warn('audio init failed', e); }
        if (music.pending) { const [id, o] = music.pending; music.pending = null; music.play(id, o); }
        flushPendingAmbience();
        this.resolve();
      }
    }
  }
  draw(ui) {
    ui.fillScreen('#000');
    if (this.state === 'wait') {
      const a = 0.55 + 0.45 * Math.sin(this.t * 3);
      ui.heart(480, 230, 40, '#ff2020', { glow: 16 });
      ui.text('UNDERSOUL', 480, 290, { size: 30, family: FONTS.title, align: 'center' });
      ui.text('Press Z, Enter, or tap to begin', 480, 350, { size: 22, align: 'center', color: '#fff', alpha: a });
      ui.text('Best with sound on.', 480, 390, { size: 16, family: FONTS.small, align: 'center', color: '#777' });
    } else {
      ui.heart(480, 230, 40, '#ff2020', { glow: 16 });
      ui.text('...', 480, 290, { size: 24, align: 'center' });
    }
  }
}

async function flow() {
  const gate = new GateMode();
  input.onFirstGesture.push(() => { gate.gestured = true; });
  await gate.run();
  const meta = getMeta();
  if (!meta.seenIntro) {
    await new IntroMode().run();
    metaFlag('seenIntro', true);
  }
  for (;;) {
    game.fadeAlpha = 1;
    const title = new TitleMode();
    const fadeIn = game.fadeIn(1.2);
    const choice = await title.run();
    await fadeIn;
    await game.fadeOut(0.6);
    if (choice === 'continue') {
      if (loadGame()) { await startWorld(false); continue; }
    }
    // new game
    const created = await new CreatorMode().run();
    if (!created) continue;
    const soulId = await new SoulSelectMode(created.look).run();
    newGame(created.name, created.look, soulId);
    S.hp = maxHp();
    await startWorld(true);
  }
}

async function boot() {
  const app = document.getElementById('app');
  await loadFonts();
  const engine = new Engine(app);
  engine.setQuality(settings.quality);
  const ui = new UI(app);
  game.init(engine, ui);
  registerTracks(ALL_TRACKS);
  registerSpeakers(SPEAKERS);
  setupTouch();
  window.__game = game;

  let last = performance.now();
  const frame = (now) => {
    const dt = Math.min(window.__dtMax || 0.05, (now - last) / 1000);
    last = now;
    input.poll();
    try {
      game.update(dt);
      engine.post.uPixel.value = settings.pixel ? 3 * Math.min(window.devicePixelRatio || 1, 2) : 0;
      engine.render(dt, game.realTime);
      ui.begin();
      game.draw(ui);
    } catch (e) {
      console.error(e);
    }
    input.endFrame();
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  flow().catch((e) => console.error(e));
}

boot();
