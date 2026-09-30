// The overworld: rooms, the player, NPCs, camera, interaction, triggers,
// exits, random encounters. The WorldMode instance doubles as the API that
// room scripts and cutscenes use (w.say, w.npc('willow').walkTo, ...).
import * as THREE from 'three';
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { S, saveGame, loadGame, onGenocide, areaCleared, setFlag, flag, settings, AREA_QUOTA } from '../core/save.js';
import { damp, angleLerp, rand } from '../core/util.js';
import { Room } from './room.js';
import { Actor } from './actor.js';
import { THEMES } from './themes.js';
import { buildModel, playerModel } from '../gfx/models.js';
import { Burst } from '../gfx/particles.js';
import { say, narrate, ask } from '../ui/dialogue.js';
import { FONTS } from '../ui/fonts.js';
import { music } from '../audio/sequencer.js';
import { sfx, ambience } from '../audio/sfx.js';
import { ROOMS } from '../story/rooms.js';
import { maxHp } from '../data/stats.js';
import { ITEMS } from '../data/items.js';
import { openPause } from '../ui/pause.js';
import { openSaveMenu } from '../ui/savemenu.js';
import { echoLine } from '../story/echoes.js';
import { runBattle } from '../battle/battle.js';
import { AREAS } from '../story/areas.js';

const TAU = Math.PI * 2;

export let world = null;

export class WorldMode {
  id = 'world';

  constructor() {
    this.scene = new THREE.Scene();
    this.cam = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 200);
    this.cam.userData.baseFov = 40;
    this.player = new Actor(playerModel(), { id: 'player', radius: 0.28 });
    this.npcs = new Map();
    this.locks = 0;
    this.camMode = 'follow';
    this.camPos = new THREE.Vector3();
    this.camLook = new THREE.Vector3();
    this.shot = null;
    this.stepDist = 0;
    this.encDist = 0;
    this.encAt = rand(10, 18);
    this.footDist = 0;
    this.banner = null;
    this.t = 0;
    this.prompt = null;
    this.bursts = [];
    this.running = false;
    world = this;
    window.__world = this;
  }

  // ---------------------------------------------------------------- lifecycle
  enter() {
    game.engine.setView(this.scene, this.cam);
    this.applyTheme();
  }

  applyTheme() {
    if (!this.room) return;
    const th = this.room.theme;
    const post = game.engine.post;
    post.uSaturation.value = onGenocide() && areaCleared(this.room.def.area) ? 0.55 : 1.05;
    post.uTint.value.set(1, 1, 1);
    post.uVignette.value = this.room.def.vignette ?? 0.45;
    game.engine.bloom.strength = this.room.def.bloom ?? 0.55;
    game.engine.renderer.toneMappingExposure = th.exposure ?? 1;
  }

  // ---------------------------------------------------------------- rooms
  async loadRoom(id, spawn = 'default', opts = {}) {
    const def = ROOMS[id];
    if (!def) { console.error('no room', id); return; }
    const prevArea = this.room?.def.area;
    if (this.room) {
      this.scene.remove(this.room.group);
      this.room.dispose();
      for (const n of this.npcs.values()) this.scene.remove(n.model);
      this.npcs.clear();
    }
    this.scene.remove(this.player.model);
    const th = THEMES[def.theme] || THEMES.hollows;
    this.scene.background = new THREE.Color(def.bg ?? th.bg);
    this.scene.fog = new THREE.FogExp2(def.fog ?? th.fog, def.fogDensity ?? th.fogDensity);
    this.room = new Room(def, this);
    this.scene.add(this.room.group);
    this.scene.add(this.player.model);
    S.room = id;
    S.spawn = spawn;
    // NPCs
    for (const n of def.npcs || []) {
      if (n.when && !n.when()) continue;
      this.spawnNpc(n);
    }
    // spawn point
    const sp = (def.spawns || {})[spawn] || (def.spawns || {}).default || [0, 0, 0];
    const facing = typeof sp[2] === 'string' ? { down: 0, up: Math.PI, left: -Math.PI / 2, right: Math.PI / 2 }[sp[2]] : sp[2] ?? 0;
    this.player.setPos(sp[0], sp[1], facing);
    this.player.visible = true;
    this.snapCamera();
    this.applyTheme();
    // area bookkeeping
    if (prevArea && prevArea !== def.area) this.leftArea(prevArea);
    if (def.area && !flag('visited_' + def.area)) {
      setFlag('visited_' + def.area);
      const a = AREAS[def.area];
      if (a) this.banner = { title: a.title, sub: a.sub, t: 0 };
    }
    this.playRoomMusic();
    ambience(def.ambience ?? null);
    this.encDist = 0;
    this.encAt = rand(10, 18);
    if (def.enter && !opts.noEnter) await def.enter(this, spawn);
  }

  playRoomMusic() {
    const def = this.room.def;
    let id = typeof def.music === 'function' ? def.music() : def.music;
    if (onGenocide() && areaCleared(def.area) && !def.keepMusic) {
      music.play('genocide', { fade: 1.2 });
      return;
    }
    if (id === null) { music.stop(1); return; }
    if (id) music.play(id, { fade: 1 });
  }

  leftArea(area) {
    // Leaving an area without finishing it ends a genocide run.
    if (onGenocide() && AREA_QUOTA[area] && !areaCleared(area)) setFlag('genoAborted');
  }

  spawnNpc(n) {
    const model = buildModel(n.model || n.id, { arg: n.arg });
    const a = new Actor(model, { id: n.id, radius: n.radius ?? 0.4, solid: n.solid !== false, float: n.float ?? 0, walkSpeed: n.speed });
    a.def = n;
    a.setPos(n.x, n.z, typeof n.face === 'string' ? { down: 0, up: Math.PI, left: -Math.PI / 2, right: Math.PI / 2 }[n.face] : n.face ?? 0);
    if (n.scale) model.scale.setScalar(n.scale);
    if (n.expr) model.userData.setExpr?.(n.expr);
    this.scene.add(model);
    this.npcs.set(n.id, a);
    return a;
  }

  // Add an NPC mid-scene (cutscenes).
  addNpc(n) { return this.spawnNpc(n); }
  removeNpc(id) {
    const a = this.npcs.get(id);
    if (!a) return;
    this.scene.remove(a.model);
    this.npcs.delete(id);
  }
  npc(id) { return id === 'player' ? this.player : this.npcs.get(id); }

  async goto(id, spawn, opts = {}) {
    const wasLocked = this.locks;
    this.locks++;
    sfx.door();
    await game.fadeOut(opts.fade ?? 0.3);
    await this.loadRoom(id, spawn, { noEnter: true });
    await game.fadeIn(opts.fade ?? 0.3);
    this.locks--;
    const def = this.room.def;
    if (def.enter) await this.run(() => def.enter(this, spawn));
    void wasLocked;
  }

  // Run a script with controls locked.
  async run(fn) {
    this.locks++;
    try { await fn(this); }
    catch (e) { console.error(e); }
    finally { this.locks = Math.max(0, this.locks - 1); }
  }
  get locked() { return this.locks > 0; }

  // ---------------------------------------------------------------- script API
  say(spk, pages, opts) { return say(spk, pages, opts); }
  narrate(pages, opts) { return narrate(pages, opts); }
  ask(spk, q, choices, opts) { return ask(spk, q, choices, opts); }
  wait(s) { return game.wait(s); }
  flag(k) { return flag(k); }
  setFlag(k, v = true) { setFlag(k, v); }
  music(id, opts) { if (id) music.play(id, opts); else music.stop(opts?.fade ?? 1); }
  sfx(name, ...args) { sfx[name]?.(...args); }
  shake(a = 0.3, t = 0.4) { if (settings.shake) game.engine.shake(a, t); }
  async echo(key) {
    const line = echoLine(key);
    if (line) await say(line.spk, line.pages, { cps: 0.9 });
  }
  give(itemId) {
    if (S.items.length >= 8) return false;
    S.items.push(itemId);
    return true;
  }
  async pickup(itemId, text) {
    const it = ITEMS[itemId];
    if (this.give(itemId)) {
      sfx.item();
      await narrate(text || `(You got the ${it.name}.)`);
      return true;
    }
    await narrate('(You\'re carrying too much.)');
    return false;
  }
  letterbox(on) { game.letterboxTarget = on ? 1 : 0; }
  burst(x, y, z, opts) {
    const b = new Burst(new THREE.Vector3(x, y, z), opts);
    this.scene.add(b.points);
    this.bursts.push(b);
  }

  // Camera: follow the player (default), or hold a fixed shot.
  camShot(pos, look, time = 1) {
    const from = { p: this.camPos.clone(), l: this.camLook.clone() };
    this.camMode = 'shot';
    const to = { p: new THREE.Vector3(...pos), l: new THREE.Vector3(...look) };
    if (time <= 0) { this.camPos.copy(to.p); this.camLook.copy(to.l); return Promise.resolve(); }
    return game.tween(time, (k) => {
      this.camPos.lerpVectors(from.p, to.p, k);
      this.camLook.lerpVectors(from.l, to.l, k);
    }, (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2));
  }
  camFollow() { this.camMode = 'follow'; this.camTarget = null; }
  camFocus(actor, opts = {}) { this.camMode = 'focus'; this.camTarget = actor; this.camFocusOpts = opts; }

  camOffsets() {
    const c = this.room?.def.cam || {};
    return { h: c.h ?? 6.2, d: c.d ?? 7.6, look: c.look ?? 0.9 };
  }

  desiredCam() {
    const { h, d, look } = this.camOffsets();
    const c = this.room?.def.cam || {};
    let tx = this.player.x, tz = this.player.z;
    if (this.camMode === 'focus' && this.camTarget) {
      tx = (this.player.x + this.camTarget.x) / 2;
      tz = (this.player.z + this.camTarget.z) / 2;
    }
    if (c.clampX) tx = Math.max(c.clampX[0], Math.min(c.clampX[1], tx));
    if (c.clampZ) tz = Math.max(c.clampZ[0], Math.min(c.clampZ[1], tz));
    if (c.fixed) return { p: new THREE.Vector3(...c.fixed[0]), l: new THREE.Vector3(...c.fixed[1]) };
    const zoom = this.camMode === 'focus' ? (this.camFocusOpts?.zoom ?? 0.75) : 1;
    return {
      p: new THREE.Vector3(tx, h * zoom + (this.camMode === 'focus' ? 0.4 : 0), tz + d * zoom),
      l: new THREE.Vector3(tx, look + (this.camMode === 'focus' ? 0.3 : 0), tz),
    };
  }

  snapCamera() {
    const d = this.desiredCam();
    this.camPos.copy(d.p);
    this.camLook.copy(d.l);
    this.camMode = 'follow';
    this.updateCamera(0);
  }

  updateCamera(dt) {
    if (this.camMode !== 'shot') {
      const d = this.desiredCam();
      const k = dt === 0 ? 1 : 1 - Math.exp(-dt * 5);
      this.camPos.lerp(d.p, k);
      this.camLook.lerp(d.l, k);
    }
    this.cam.position.copy(this.camPos);
    this.cam.lookAt(this.camLook);
  }

  // ---------------------------------------------------------------- update
  update(dt, busy) {
    this.t += dt;
    S.playTime += dt;
    if (!this.room) return;
    this.room.update(dt, this.t);
    const def = this.room.def;
    const free = !this.locked && !busy;

    if (free) this.movePlayer(dt);
    else this.player.externalMoving = false;
    this.player.update(dt);
    for (const n of this.npcs.values()) {
      if (n.def?.wander && !this.locked && !n.target && Math.random() < dt * 0.3) {
        const w = n.def.wander;
        n.walkTo(w[0] + Math.random() * (w[2] - w[0]), w[1] + Math.random() * (w[3] - w[1]), 1.2);
      }
      if (n.def?.lookAtPlayer && !n.target) {
        const want = Math.atan2(this.player.x - n.x, this.player.z - n.z);
        if (Math.hypot(this.player.x - n.x, this.player.z - n.z) < 4) n.facing = angleLerp(n.facing, want, Math.min(1, dt * 4));
      }
      n.update(dt);
    }
    this.bursts = this.bursts.filter((b) => { b.update(dt); return !b.done; });
    if (def.update) def.update(this, dt);
    this.updateCamera(dt);

    this.prompt = free ? this.findInteract() : null;
    if (free) {
      if (input.pressed('confirm') && this.prompt) this.interact(this.prompt);
      else if (input.pressed('menu')) { sfx.select(); openPause(this); }
      else if (input.pressed('pause')) { sfx.select(); openPause(this, true); }
      else {
        this.checkTriggers();
        this.checkExits();
      }
    }
    if (this.banner) this.banner.t += dt;
  }

  onIce(x, z) {
    return (this.room.def.ice || []).some(([x0, z0, x1, z1]) => x >= x0 && x <= x1 && z >= z0 && z <= z1);
  }

  movePlayer(dt) {
    const ax = input.axis();
    let mx = ax.x, mz = ax.y;
    const len = Math.hypot(mx, mz);
    const p = this.player;
    const colliders = [...this.npcs.values()].filter((n) => n.solid && n.visible).map((n) => n.collider);
    const blocked = (x, z) => {
      if (this.room.blocked(x, z, p.radius)) return true;
      for (const c of colliders) if ((x - c.x) ** 2 + (z - c.z) ** 2 < (c.r + p.radius) ** 2) return true;
      return false;
    };
    // sliding on ice: no steering until you hit something or leave the ice
    if (this.slide) {
      const [sx, sz] = this.slide;
      const nx = p.x + sx * 6 * dt, nz = p.z + sz * 6 * dt;
      if (blocked(nx, nz) || !this.onIce(p.x, p.z)) { this.slide = null; sfx.land(); }
      else { p.x = nx; p.z = nz; p.externalMoving = false; p.facing = Math.atan2(sx, sz); this.encounterStep(6 * dt); return; }
    }
    if (len < 0.01) { p.externalMoving = false; p.speed = 0; return; }
    mx /= len; mz /= len;
    const run = input.held('cancel');
    const spd = (run ? 4.3 : 2.8) * (this.room.def.slow ?? 1);
    const dx = mx * spd * dt, dz = mz * spd * dt;
    if (this.room.def.ice && this.onIce(p.x + dx, p.z + dz)) {
      const cx = Math.abs(ax.x) >= Math.abs(ax.y) ? Math.sign(ax.x) : 0;
      const cz = cx ? 0 : Math.sign(ax.y);
      this.slide = [cx, cz];
      sfx.dash();
    }
    let nx = p.x, nz = p.z;
    if (!blocked(p.x + dx, p.z + dz)) { nx += dx; nz += dz; }
    else {
      if (!blocked(p.x + dx, p.z)) nx += dx;
      if (!blocked(nx, p.z + dz)) nz += dz;
    }
    const moved = Math.hypot(nx - p.x, nz - p.z);
    p.x = nx; p.z = nz;
    p.facing = angleLerp(p.facing, Math.atan2(mx, mz), Math.min(1, dt * 16));
    p.externalMoving = moved > 0.0005;
    p.speed = spd;
    if (moved > 0) {
      this.footDist += moved;
      if (this.footDist > (run ? 0.75 : 0.6)) { this.footDist = 0; sfx.step(this.room.def.step ?? this.room.theme.step); }
      this.encounterStep(moved);
    }
  }

  // ---------------------------------------------------------------- interaction
  findInteract() {
    const p = this.player;
    const fx = Math.sin(p.facing), fz = Math.cos(p.facing);
    let best = null, bestScore = Infinity;
    const consider = (x, z, reach, obj) => {
      const dx = x - p.x, dz = z - p.z;
      const d = Math.hypot(dx, dz);
      if (d > reach) return;
      const dot = d > 0.01 ? (dx * fx + dz * fz) / d : 1;
      if (dot < 0.2 && d > 0.7) return;
      const score = d - dot * 0.5;
      if (score < bestScore) { bestScore = score; best = obj; }
    };
    for (const n of this.npcs.values()) if (n.def?.talk && n.visible) consider(n.x, n.z, (n.def.reach ?? 1.4) + n.radius * 0.5, { npc: n });
    for (const it of this.room.interactables) if (!it.when || it.when()) consider(it.x, it.z, it.r, { it });
    return best;
  }

  async interact(target) {
    await this.run(async () => {
      if (target.npc) {
        const n = target.npc;
        if (n.def.faceOnTalk !== false) n.face(this.player);
        this.player.face(n);
        await n.def.talk(this, n);
      } else if (target.it) {
        const it = target.it;
        if (it.save) await this.savePoint(it);
        else if (it.run) await it.run(this, it);
        else if (it.text) {
          const txt = typeof it.text === 'function' ? it.text(this) : it.text;
          await narrate(txt);
        }
      }
    });
  }

  async savePoint(it) {
    S.hp = Math.max(S.hp, maxHp());
    sfx.save();
    const def = this.room.def;
    let line = typeof it.def.line === 'function' ? it.def.line() : it.def.line;
    if (onGenocide() && def.area && AREA_QUOTA[def.area]) {
      const left = Math.max(0, AREA_QUOTA[def.area] - (S.kills[def.area] || 0));
      line = left > 0 ? `(${left} left.)` : '(Determination.)';
    }
    await narrate(line || '(The warmth of the star fills you with DETERMINATION.)');
    await openSaveMenu(def.name || def.id, () => saveGame(def.name || def.id));
  }

  checkTriggers() {
    const p = this.player;
    for (const tr of this.room.def.triggers || []) {
      const [x0, z0, x1, z1] = tr.rect;
      if (p.x < x0 || p.x > x1 || p.z < z0 || p.z > z1) continue;
      if (tr.once && flag(tr.once)) continue;
      if (tr.when && !tr.when(this)) continue;
      if (tr.once) setFlag(tr.once);
      this.run(() => tr.run(this));
      return;
    }
  }

  checkExits() {
    const p = this.player;
    for (const ex of this.room.def.exits || []) {
      const [x0, z0, x1, z1] = ex.rect;
      if (p.x < x0 || p.x > x1 || p.z < z0 || p.z > z1) continue;
      if (ex.when && !ex.when(this)) {
        if (ex.blocked && !this._blockedMsg) {
          this._blockedMsg = true;
          this.run(async () => { await ex.blocked(this); this._blockedMsg = false; });
        }
        continue;
      }
      this.run(() => this.goto(ex.to, ex.spawn));
      return;
    }
  }

  // ---------------------------------------------------------------- encounters
  encounterStep(d) {
    const enc = this.room.def.encounters;
    if (!enc || (enc.when && !enc.when())) return;
    this.encDist += d * (enc.rate ?? 1) * (onGenocide() ? 1.6 : 1);
    if (this.encDist < this.encAt) return;
    this.encDist = 0;
    this.encAt = rand(11, 20);
    const area = this.room.def.area;
    if (onGenocide() && areaCleared(area)) {
      if (flag('nobody_' + area)) return;
      setFlag('nobody_' + area);
      this.run(async () => {
        this.player.emote('!', 0.6);
        sfx.encounter();
        await game.wait(0.5);
        await runBattle({ nobody: true }, this);
      });
      return;
    }
    const pool = enc.pool;
    const pickOne = () => {
      const total = pool.reduce((a, e) => a + (Array.isArray(e) ? e[1] : 1), 0);
      let r = Math.random() * total;
      for (const e of pool) { const [id, w] = Array.isArray(e) ? e : [e, 1]; r -= w; if (r <= 0) return id; }
      return Array.isArray(pool[0]) ? pool[0][0] : pool[0];
    };
    let ids = [pickOne()];
    if (enc.pairs && Math.random() < enc.pairs) ids.push(pickOne());
    this.run(() => this.encounter(ids));
  }

  async encounter(ids, opts = {}) {
    this.player.emote('!', 0.7);
    sfx.encounter();
    await game.wait(0.55);
    return runBattle({ enemies: ids, ...opts }, this);
  }

  battle(ids, opts = {}) { return runBattle({ enemies: Array.isArray(ids) ? ids : [ids], ...opts }, this); }

  // After a GAME OVER: back to the last SAVE (or the start of this room).
  async respawn() {
    const had = loadGame();
    if (!had) S.hp = maxHp();
    game.setMode(this);
    game.fadeAlpha = 1;
    await this.loadRoom(S.room, had ? S.spawn : S.spawn || 'default', { noEnter: true });
    if (had && S.pos) this.player.setPos(S.pos[0], S.pos[1], S.pos[2]);
    this.snapCamera();
    game.fadeIn(0.8);
  }

  // ---------------------------------------------------------------- draw
  draw(ui) {
    // emotes
    const actors = [this.player, ...this.npcs.values()];
    for (const a of actors) {
      if (!a.emoteText || !a.visible) continue;
      const [x, y] = a.headScreen(this.cam, ui, 0.35);
      const bob = Math.sin(this.t * 10) * 2;
      ui.ctx.save();
      ui.ctx.fillStyle = '#fff';
      ui.ctx.strokeStyle = '#000';
      ui.ctx.lineWidth = 3;
      const w = Math.max(30, ui.measure(a.emoteText, 24) + 16);
      ui.ctx.beginPath();
      if (ui.ctx.roundRect) ui.ctx.roundRect(x - w / 2, y - 36 + bob, w, 32, 8); else ui.ctx.rect(x - w / 2, y - 36 + bob, w, 32);
      ui.ctx.fill();
      ui.ctx.stroke();
      ui.ctx.restore();
      ui.text(a.emoteText, x, y - 33 + bob, { size: 24, align: 'center', color: a.emoteText === '!' ? '#e02020' : '#000' });
    }
    // interaction prompt
    if (this.prompt && !this.locked && !game.busy) {
      let x, y;
      if (this.prompt.npc) [x, y] = this.prompt.npc.headScreen(this.cam, ui, 0.2);
      else {
        const it = this.prompt.it;
        const v = new THREE.Vector3(it.x, it.def?.promptY ?? 1.3, it.z).project(this.cam);
        [x, y] = ui.toVirtual(((v.x + 1) / 2) * window.innerWidth, ((1 - v.y) / 2) * window.innerHeight);
      }
      const a = 0.65 + Math.sin(this.t * 5) * 0.25;
      ui.ctx.save();
      ui.ctx.globalAlpha = a;
      ui.box(x - 13, y - 30, 26, 26, { border: 2, fill: 'rgba(0,0,0,0.7)' });
      ui.text('Z', x, y - 27, { size: 18, family: FONTS.small, align: 'center' });
      ui.ctx.restore();
    }
    // area banner
    if (this.banner) {
      const t = this.banner.t;
      const a = t < 0.8 ? t / 0.8 : t < 3.4 ? 1 : Math.max(0, 1 - (t - 3.4) / 0.8);
      if (a <= 0 && t > 4) this.banner = null;
      else {
        ui.ctx.save();
        ui.ctx.globalAlpha = a;
        ui.text(this.banner.title, 480, 86, { size: 30, family: FONTS.title, align: 'center', color: '#fff', glow: '#000', glowSize: 12 });
        if (this.banner.sub) ui.text(this.banner.sub, 480, 130, { size: 18, family: FONTS.small, align: 'center', color: '#ddd' });
        ui.ctx.restore();
      }
    }
  }
}

// Start (or resume) the overworld. Resolves only when returning to title.
export async function startWorld(fresh) {
  const w = new WorldMode();
  game.setMode(w);
  game.fadeAlpha = 1;
  w.returnToTitle = null;
  const done = new Promise((resolve) => { w.returnToTitle = resolve; });
  await w.loadRoom(S.room, fresh ? 'default' : S.spawn, { noEnter: true });
  if (!fresh && S.pos) w.player.setPos(S.pos[0], S.pos[1], S.pos[2]);
  w.snapCamera();
  game.fadeIn(fresh ? 1.5 : 0.8);
  const def = w.room.def;
  if (def.enter) w.run(() => def.enter(w, fresh ? 'fresh' : 'load'));
  return done;
}
