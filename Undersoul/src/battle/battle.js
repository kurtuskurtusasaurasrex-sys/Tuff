// Battle mode. The flow is written as an async loop (player turn, enemy
// turn) while update()/draw() service whatever menu or phase is active.
import { game } from '../core/game.js';
import { input } from '../core/input.js';
import { S, setFlag, flag, AREA_QUOTA, settings, onGenocide, metaFlag } from '../core/save.js';
import { makeRng, rand, pick } from '../core/util.js';
import { Board, MENU_BOX, damageFromHit } from './board.js';
import { BattleStage } from './scene3d.js';
import { PATTERNS } from './patterns.js';
import { ENEMIES } from './enemies.js';
import { Typer } from '../ui/text.js';
import { FONTS } from '../ui/fonts.js';
import { Bubble } from '../ui/dialogue.js';
import { sfx } from '../audio/sfx.js';
import { music } from '../audio/sequencer.js';
import { SOULS, ABILITIES } from '../data/souls.js';
import { ITEMS } from '../data/items.js';
import { maxHp, atk, hasSkill, addExp, addHope, unlockedAbilities, healPlayer } from '../data/stats.js';
import { useItem } from '../data/itemuse.js';
import { gameOver } from './gameover.js';

const BTN = ['FIGHT', 'ACT', 'SOUL', 'ITEM', 'MERCY'];
const BTN_X = (i) => 46 + i * 176;
const BTN_Y = 470;

export class BattleMode {
  id = 'battle';

  constructor(opts, world) {
    this.opts = opts;
    this.world = world;
    this.area = opts.area ?? world?.room?.def.area ?? 'hollows';
    this.board = new Board(this);
    this.enemies = (opts.enemies || []).map((id, i) => {
      const def = ENEMIES[id];
      if (!def) console.error('no enemy', id);
      const m = def.startMercy ?? 0;
      const hp = def.hpFn ? def.hpFn() : def.hp;
      return { id, def, idx: i, hp, maxhp: hp, mercy: m, alive: true, gone: false, state: {}, acts: {}, turns: 0, spareable: m >= (def.spareAt ?? 100) };
    });
    this.stage = new BattleStage(opts.stage ?? this.enemies[0]?.def.stage ?? this.area);
    this.stage.addEnemies(this.enemies);
    this.rng = makeRng(Math.floor(Math.random() * 1e9));
    this.resolve = 0;
    this.fx = { turns: {} };
    this.turn = 0;
    this.btn = 0;
    this.phase = 'menu';
    this.boxTyper = null;
    this.list = null;
    this.bubbles = [];
    this.dmgNums = [];
    this.fightBars = null;
    this.freeze = 0;
    this.t = 0;
    this.over = false;
    this.fightStreak = 0;
    this.noHitTurn = true;
    this.curAtk = this.enemies[0]?.def.atk ?? 4;
    this.hpAtTurnStart = S.hp;
    this.hpPrevTurn = S.hp;
  }

  run() {
    return new Promise((resolve) => {
      this.done = resolve;
      game.setMode(this);
      this.loop().catch((e) => { console.error(e); this.finish({ outcome: 'error' }); });
    });
  }

  enter() {
    game.engine.setView(this.stage.scene, this.stage.cam);
    game.engine.bloom.strength = 0.6;
    game.engine.post.uSaturation.value = 1.05;
    game.engine.renderer.toneMappingExposure = 1.05;
  }

  exit() {}

  finish(result) {
    if (this.finished) return;
    this.finished = true;
    this.stage.dispose();
    this.done(result);
  }

  // ------------------------------------------------------------ helpers
  alive() { return this.enemies.filter((e) => e.alive && !e.gone); }
  e(id) { return this.enemies.find((x) => x.id === id); }

  gainResolve(n) { this.resolve = Math.min(100, this.resolve + n); }

  heal(n, quiet) {
    const got = healPlayer(n);
    if (!quiet && got > 0) sfx.heal();
    return got;
  }

  hurt(dmgRaw, bullet) {
    const s = this.board.soul;
    let d = damageFromHit(dmgRaw);
    if (this.fx.shieldTurn) d = Math.ceil(d * 0.5);
    if (this.fx.firstAttack && hasSkill('br_face')) d = Math.ceil(d * 0.8);
    if (hasSkill('br_heroic') && S.hp < maxHp() * 0.3) d = Math.ceil(d * 0.7);
    if (this.fx.gentle) d = Math.max(1, d - 1);
    if (this.fx.turns.rallyDef) d = Math.max(1, d - 2);
    if (this.fx.invulnUntil > this.board.t) return;
    S.hp -= d;
    this.noHitTurn = false;
    sfx.hurt();
    if (settings.shake) game.engine.shake(0.08, 0.2);
    this.shakeBox = 0.25;
    const iframes = 1 + (ITEMS[S.weapon]?.iframes ?? 0);
    s.inv = iframes;
    if (S.soul === 'perseverance') this.board.grey = Math.round(d * (hasSkill('pe_margins') ? 0.6 : 0.4));
    if (S.hp <= 0) {
      const captor = this.enemies.find((e) => e.alive && e.def.captures);
      if (captor) { S.hp = 1; this.end({ outcome: 'captured' }); return; }
      if (S.soul === 'determination' && !this.board.refused) {
        this.board.refused = true;
        S.hp = 1;
        if (hasSkill('dt_stay')) S.hp = Math.max(1, Math.round(maxHp() * 0.25));
        this.refuseFlash = 1.6;
        sfx.crack();
        s.inv = 1.5;
        return;
      }
      S.hp = 0;
      this.dead = true;
    }
    void bullet;
  }

  // Text in the main box; resolves on confirm once typed.
  boxText(text, opts = {}) {
    return new Promise((resolve) => {
      const pages = Array.isArray(text) ? text : [text];
      this.phase = 'text';
      this.pages = pages;
      this.pageIdx = 0;
      this.boxTyper = new Typer(pages[0], { width: MENU_BOX.w - 60, size: 26, cps: 34, onBlip: () => sfx.voice(opts.voice || 'narrator') });
      this.textAuto = opts.auto;
      this.textResolve = resolve;
    });
  }

  chooseList(items, opts = {}) {
    return new Promise((resolve) => {
      this.phase = 'list';
      this.list = { items, idx: opts.start ?? 0, cols: opts.cols ?? 2, resolve, opts };
    });
  }

  chooseButton(flavor) {
    return new Promise((resolve) => {
      this.phase = 'menu';
      this.boxTyper = new Typer(flavor, { width: MENU_BOX.w - 60, size: 26, cps: 34, onBlip: () => sfx.voice('narrator') });
      this.btnResolve = resolve;
    });
  }

  async chooseTarget() {
    const alive = this.alive();
    if (alive.length === 1 && !this.opts.alwaysTarget) {
      // still show the name, like the original
    }
    const items = alive.map((e) => ({ label: `* ${e.def.name}`, color: e.spareable ? '#ffff00' : '#fff', hp: e }));
    const i = await this.chooseList(items, { cols: 1, showHp: true });
    return i < 0 ? null : alive[i];
  }

  fightBar(count = 1) {
    return new Promise((resolve) => {
      this.phase = 'fight';
      const speed = hasSkill('pa_measured') ? 0.75 : 1;
      this.fightBars = { bars: Array.from({ length: count }, (_, i) => ({ x: -i * 0.35, hit: null })), speed, resolve, t: 0 };
      if (this.fx.critNext) { this.fx.critNext = false; for (const b of this.fightBars.bars) b.x = 0.5; this.fightBars.auto = true; }
    });
  }

  // Speech bubbles next to enemies.
  async speak(lines) {
    this.bubbles = [];
    for (const [e, text] of lines) {
      if (!text) continue;
      const [x, y] = this.stage.screenOf(e, game.ui, 0.85);
      const voice = e.def.voice || 'monster';
      this.bubbles.push(new Bubble(text, Math.min(720, x + 60), Math.max(16, y - 40), { voice, w: 220, family: e.def.font }));
    }
    if (!this.bubbles.length) return;
    this.phase = 'bubbles';
    await new Promise((resolve) => { this.bubbleResolve = resolve; this.bubbleT = 0; });
    this.bubbles = [];
  }

  // ------------------------------------------------------------ main loop
  async loop() {
    const o = this.opts;
    game.fadeIn(0.25);
    if (o.nobody) {
      music.stop(0.3);
      await this.boxText('* But nobody came.');
      await game.fadeOut(0.4);
      return this.finish({ outcome: 'nobody' });
    }
    const mus = o.music ?? this.enemies[0].def.music ?? 'battle';
    if (mus) music.play(mus, { fade: 0.2, restart: !o.keepMusic });
    this.fx.firstAttack = true;
    if (o.script) {
      const r = await o.script(this);
      return this.finish(r || { outcome: 'script' });
    }
    if (o.intro) await o.intro(this);
    const introText = o.introText ?? this.enemies[0].def.intro ?? `* ${this.enemies[0].def.name} draws near!`;
    let flavor = introText;
    for (;;) {
      this.turn++;
      this.startTurnPassives();
      const res = await this.playerTurn(flavor);
      if (this.over) break;
      if (res === 'fled') return this.endFled();
      if (!this.alive().length) break;
      await this.enemyTurn();
      if (this.dead) return this.die();
      if (this.over || !this.alive().length) break;
      this.fx.firstAttack = false;
      flavor = this.pickFlavor();
    }
    if (this.customResult) return this.finish(this.customResult);
    await this.victory();
  }

  startTurnPassives() {
    this.hpPrevTurn = this.hpAtTurnStart;
    this.hpAtTurnStart = S.hp;
    if (S.soul === 'kindness' && this.turn > 1) this.heal(2, true);
    if (hasSkill('dt_keep') && this.turn > 1) this.heal(1 + Math.floor(maxHp() * 0.05), true);
    if (ITEMS[S.armor]?.regen && this.turn % 2 === 0) this.heal(1, true);
    for (const k of Object.keys(this.fx.turns)) { this.fx.turns[k]--; if (this.fx.turns[k] <= 0) delete this.fx.turns[k]; }
  }

  pickFlavor() {
    const alive = this.alive();
    const e = pick(alive);
    const d = e.def;
    if (d.flavorFn) { const f = d.flavorFn(this, e); if (f) return f; }
    if (e.spareable && d.spareFlavor) return d.spareFlavor;
    if (e.hp < e.maxhp * 0.3 && d.lowFlavor) return d.lowFlavor;
    return pick(d.flavor || [`* ${d.name} is here.`]);
  }

  async playerTurn(flavor) {
    for (;;) {
      const btn = await this.chooseButton(flavor);
      if (btn === 'FIGHT') {
        const t = await this.chooseTarget();
        if (!t) continue;
        await this.doFight(t);
        return 'fight';
      }
      if (btn === 'ACT') {
        const t = await this.chooseTarget();
        if (!t) continue;
        const acts = [{ name: 'Check' }, ...(t.def.acts || []).filter((a) => !a.when || a.when(this, t))];
        const i = await this.chooseList(acts.map((a) => ({ label: `* ${a.name}` })), { cols: 2 });
        if (i < 0) continue;
        await this.doAct(t, acts[i]);
        return 'act';
      }
      if (btn === 'SOUL') {
        const abil = unlockedAbilities();
        if (!abil.length) {
          await this.boxText(`* ${SOULS[S.soul].echo} whispers: "We can learn SOUL skills together. Open the SOUL page with C."`);
          continue;
        }
        const items = abil.map((a) => ({ label: `* ${ABILITIES[a].name}`, right: `${ABILITIES[a].cost}%`, disabled: this.resolve < ABILITIES[a].cost }));
        const i = await this.chooseList(items, { cols: 1, desc: (k) => ABILITIES[abil[k]].desc });
        if (i < 0) continue;
        const id = abil[i];
        if (this.resolve < ABILITIES[id].cost) { sfx.buzz(); continue; }
        let target = null;
        if (ABILITIES[id].target) { target = await this.chooseTarget(); if (!target) continue; }
        this.resolve -= ABILITIES[id].cost;
        await this.doAbility(id, target);
        return 'soul';
      }
      if (btn === 'ITEM') {
        if (!S.items.length) { sfx.buzz(); continue; }
        const i = await this.chooseList(S.items.map((id) => ({ label: `* ${ITEMS[id]?.name ?? id}` })), { cols: 2 });
        if (i < 0) continue;
        const r = useItem(i);
        if (r.battle.speed) this.fx.speed = true;
        if (r.battle.atkUp) this.fx.atkUp = (this.fx.atkUp || 0) + r.battle.atkUp;
        sfx.heal();
        await this.boxText(r.lines.join('\n'));
        return 'item';
      }
      if (btn === 'MERCY') {
        const anySpare = this.alive().some((e) => e.spareable);
        const items = [{ label: '* Spare', color: anySpare ? '#ffff00' : '#fff' }];
        const canFlee = !this.opts.noFlee && !this.enemies.some((e) => e.def.boss);
        if (canFlee) items.push({ label: '* Flee' });
        const i = await this.chooseList(items, { cols: 1 });
        if (i < 0) continue;
        if (i === 0) { await this.doSpare(); return 'spare'; }
        if (Math.random() < 0.65 || this.turn > 4) {
          sfx.flee();
          await this.boxText(pick(['* Escaped...', '* You leave in a hurry.', '* You\'re outta here.']));
          return 'fled';
        }
        await this.boxText('* You tried to flee, but couldn\'t get away.');
        return 'fleefail';
      }
    }
  }

  // ------------------------------------------------------------ actions
  async doFight(e) {
    let count = 1;
    if (ITEMS[S.weapon]?.id === 'cork_gun' || S.weapon === 'cork_gun') count = 2;
    if (this.fx.flurry) { count = 3; this.fx.flurry = false; }
    if (this.fx.noon) { count = 4; this.fx.noon = false; }
    if (this.fx.double) { count = Math.max(count, 2); this.fx.double = false; }
    const hits = await this.fightBar(count);
    let total = 0, crit = false;
    for (const acc of hits) {
      if (acc === null || acc < 0.08) continue;
      let base = atk() + (this.fx.atkUp || 0) + (this.fx.turns.rally ? 4 : 0) - (this.fx.charge ? 0 : e.def.def || 0);
      let dmg = Math.max(1, base + Math.floor(Math.random() * 3)) * (0.35 + 1.75 * acc);
      const critWin = hasSkill('br_nofear') ? 0.9 : 0.95;
      if (acc >= critWin) { dmg *= 1.35; crit = true; }
      if (S.soul === 'bravery') dmg *= 1.15;
      if (S.soul === 'justice') dmg *= 1.2;
      if (this.fx.charge) dmg *= 2;
      if (this.fx.toughlove) dmg *= 0.5;
      if (this.fx.counter) dmg *= 1.5;
      if (hasSkill('pe_persist')) dmg *= 1 + 0.1 * this.fightStreak;
      if (this.fx.twist) dmg += this.board.grey * 3;
      total += Math.round(dmg);
    }
    this.fx.charge = false; this.fx.counter = false; this.fx.twist = false;
    this.fightStreak++;
    this.gainResolve(3);
    if (total <= 0) {
      sfx.miss();
      this.dmgNums.push({ e, text: 'MISS', t: 0, color: '#c0c0c0' });
      await game.wait(0.8);
      return;
    }
    if (this.fx.toughlove) { this.fx.toughlove = false; this.addMercy(e, 20); }
    await this.dealDamage(e, total, crit);
  }

  async dealDamage(e, dmg, crit = false) {
    if (e.def.onHit) {
      const r = await e.def.onHit(this, e, dmg);
      if (r === 'dodged') {
        sfx.miss();
        this.dmgNums.push({ e, text: 'MISS', t: 0, color: '#c0c0c0' });
        await game.wait(0.9);
        return;
      }
      if (typeof r === 'number') dmg = r;
    }
    if (crit) sfx.crit(); else sfx.hitEnemy();
    this.stage.hurt(e);
    const before = e.hp;
    e.hp = Math.max(0, e.hp - dmg);
    this.dmgNums.push({ e, text: String(dmg), t: 0, color: '#ff3030', from: before / e.maxhp, to: e.hp / e.maxhp, bar: true });
    await game.wait(1.1);
    if (e.hp <= 0) await this.kill(e);
  }

  async kill(e) {
    if (e.def.onKill) {
      const r = await e.def.onKill(this, e);
      if (r === 'survive') return;
    }
    e.alive = false;
    sfx.dust();
    this.stage.dust(e);
    this.killed = (this.killed || []).concat(e);
    S.kills[this.area] = (S.kills[this.area] || 0) + 1;
    S.totalKills++;
    if (e.def.boss) S.bosses[e.id] = 'killed';
    if (AREA_QUOTA[this.area] && S.spares === 0 && !flag('genoAborted')) setFlag('genoActive');
    await game.wait(1.0);
  }

  addMercy(e, n) {
    if (!e.alive) return;
    let m = n;
    if (hasSkill('ju_truce')) m *= 1.2;
    e.mercy = Math.min(100, e.mercy + m);
    if (e.mercy >= (e.def.spareAt ?? 100)) e.spareable = true;
  }

  async doAct(e, act) {
    this.fightStreak = 0;
    this.gainResolve(5);
    if (act.name === 'Check') {
      const d = e.def;
      const txt = `* ${d.name.toUpperCase()} - ATK ${d.atk} DEF ${d.def}\n* ${typeof d.check === 'function' ? d.check(this, e) : d.check}`;
      await this.boxText(txt);
      return;
    }
    e.acts[act.name] = (e.acts[act.name] || 0) + 1;
    let res = act.run ? await act.run(this, e) : null;
    let text = res?.text ?? act.text;
    if (typeof text === 'function') text = text(this, e);
    let mercy = res?.mercy ?? act.mercy ?? 0;
    if (mercy > 0) {
      if (hasSkill('pa_wait')) mercy += 10;
      if (hasSkill('pe_notes')) mercy += 8;
    }
    if (text) await this.boxText(text);
    if (mercy) this.addMercy(e, mercy);
    if (res?.after) await res.after();
  }

  async doAbility(id, target) {
    const lv = S.lv;
    const say = (t) => this.boxText(t);
    this.fightStreak = 0;
    sfx.magic();
    switch (id) {
      case 'holdon': this.heal(8 + lv); return say('* You hold on. HP recovered.');
      case 'kindword': this.addMercy(target, 30); return say(`* You tell ${target.def.name} you believe they're better than this.`);
      case 'checkpoint': S.hp = maxHp(); this.fx.invulnStart = 2; sfx.save(); return say('* The warmth of a SAVE fills you. You feel untouchable.');
      case 'critnext': this.fx.critNext = true; return say('* You steady your aim.');
      case 'burn': return this.dealDamage(target, 20 + 3 * lv, true);
      case 'breath': this.heal(6); this.fx.regen = true; return say('* You breathe in slowly. You feel calmer.');
      case 'lull': this.fx.slow = true; this.addMercy(target, 20); return say(`* You hum softly. ${target.def.name} relaxes.`);
      case 'stopwatch': this.fx.freezeStart = 2.5; return say('* Time holds its breath.');
      case 'patient': return this.dealDamage(target, 8 + lv * 2 + this.turn * 4, false);
      case 'rally': this.fx.turns.rally = 3; this.fx.turns.rallyDef = 3; return say('* You rally yourself! ATK and DEF up.');
      case 'standup': this.addMercy(target, 35); return say(`* You stand between ${target.def.name} and their worst impulse.`);
      case 'flurry': this.fx.flurry = true; return say('* Your fists are ready.');
      case 'charge': this.fx.charge = true; return say('* You wind up for a charge!');
      case 'plea': this.addMercy(target, 30); return say(`* You tell ${target.def.name} the truth: you don't want to fight.`);
      case 'grace': this.heal(12); this.fx.slowed = false; return say('* You move with grace. HP recovered.');
      case 'double': this.fx.double = true; return say('* You spin on one foot.');
      case 'jete': return this.dealDamage(target, 25 + 3 * lv, true);
      case 'study': this.addMercy(target, 10); return say(`* ${target.def.name}: HP ${target.hp}/${target.maxhp}, MERCY ${Math.round(target.mercy)}%.\n* ${target.def.hint || target.def.check}`);
      case 'encourage': for (const e of this.alive()) this.addMercy(e, 25); return say('* You encourage everyone. Even yourself.');
      case 'revision': S.hp = Math.max(S.hp, this.hpPrevTurn); this.heal(0); return say('* You turn back a page.');
      case 'twist': this.fx.twist = true; return say('* The plot thickens.');
      case 'finalch': { this.heal(Math.round((18 + 3 * lv) / 2)); return this.dealDamage(target, 18 + 3 * lv); }
      case 'mend': this.heal(12); return say('* You mend your wounds.');
      case 'soothe': this.addMercy(target, 30); this.fx.gentle = true; return say(`* You soothe ${target.def.name}.`);
      case 'embrace':
        if (target.mercy >= 50) { target.spareable = true; target.mercy = 100; await say(`* You hug ${target.def.name}.`); return this.spareOne(target); }
        return say(`* You reach out, but ${target.def.name} isn't ready.`);
      case 'aegis': this.fx.aegisStart = 3; return say('* A ring of green light surrounds you.');
      case 'toughlove': this.fx.toughlove = true; return this.doFight(target || this.alive()[0]);
      case 'pan': this.heal(10); return this.dealDamage(target, 16 + 3 * lv);
      case 'warning': this.fx.short = true; this.addMercy(target, 15); return say(`* You fire a warning shot into the air. ${target.def.name} flinches.`);
      case 'deputize': this.addMercy(target, 35); return say(`* You pin a paper badge on ${target.def.name}.`);
      case 'noon': this.fx.noon = true; return say('* It\'s high noon.');
      case 'judge': return this.dealDamage(target, 10 + 5 * lv, true);
      default: return say('* Nothing happened.');
    }
  }

  async doSpare() {
    this.fightStreak = 0;
    const alive = this.alive();
    for (const e of alive) {
      if (e.def.onSpareAttempt) {
        const r = await e.def.onSpareAttempt(this, e);
        if (r === 'handled') return;
      }
    }
    const spareable = alive.filter((e) => e.spareable);
    if (!spareable.length) {
      await this.boxText(`* You spared ${alive.map((e) => e.def.name).join(' and ')}.\n* But they aren't ready to stop.`);
      return;
    }
    for (const e of spareable) await this.spareOne(e, true);
    await game.wait(1.0);
  }

  async spareOne(e, quiet) {
    e.alive = false;
    e.gone = true;
    e.spared = true;
    sfx.spare();
    this.stage.spare(e);
    this.spared = (this.spared || []).concat(e);
    S.spares++;
    if (onGenocide()) setFlag('genoAborted');
    if (e.def.boss) S.bosses[e.id] = 'spared';
    if (hasSkill('in_duet')) this.heal(Math.round(maxHp() * 0.25), true);
    if (hasSkill('ju_fair')) this.heal(5, true);
    if (e.def.onSpare) await e.def.onSpare(this, e);
    if (!quiet) await game.wait(1.0);
  }

  // ------------------------------------------------------------ enemy turn
  async enemyTurn() {
    const alive = this.alive();
    const lines = alive.map((e) => {
      const d = e.def;
      let line = d.say ? d.say(this, e) : pick(d.talk || ['...']);
      if (e.spareable && d.spareTalk) line = pick(d.spareTalk);
      return [e, line];
    });
    for (const e of alive) if (e.def.onTurn) await e.def.onTurn(this, e);
    if (this.over || !this.alive().length) return;
    await this.speak(lines);
    if (this.over || this.skipAttack) { this.skipAttack = false; return; }
    const specs = [];
    for (const e of this.alive()) {
      let spec = e.def.attack ? e.def.attack(this, e) : pick(e.def.attacks || ['nothing']);
      if (typeof spec === 'string') spec = { p: spec };
      if (spec) specs.push({ ...spec, e });
    }
    await this.dodge(specs);
    for (const e of this.alive()) e.turns++;
  }

  async dodge(specs) {
    const b = this.board;
    const size = specs.find((s) => s.box)?.box ?? [180, 180];
    b.resize(size[0], size[1]);
    b.setMode('free', { flash: false });
    this.phase = 'dodge-prep';
    await game.wait(0.3);
    b.placeSoul(specs.find((s) => s.soul)?.soul?.[0], specs.find((s) => s.soul)?.soul?.[1]);
    b.box = { ...b.target };
    b.soul.visible = true;
    b.soul.inv = 0;
    b.soul.focus = hasSkill('pa_longer') ? 3.5 : 2.5;
    this.noHitTurn = true;
    this.fx.aegis = this.fx.aegisStart || 0;
    this.fx.aegisStart = 0;
    this.freeze = this.fx.freezeStart || 0;
    this.fx.freezeStart = 0;
    if (this.fx.invulnStart) { this.fx.invulnUntil = b.t + this.fx.invulnStart; this.fx.invulnStart = 0; }
    const n = specs.length;
    const ctxs = specs.map((s) => {
      const e = s.e;
      this.curAtk = e.def.atk;
      const c = {
        get box() { return b.box; }, get soul() { return b.soul; },
        spawn: (bb) => b.spawn({ dmg: e.def.atk, ...bb }),
        rng: this.rng, d: (s.density ?? 1) / Math.sqrt(n) * (this.fx.slow ? 0.8 : 1),
        speed: (s.speed ?? 1) * (this.fx.slow ? 0.7 : 1),
        setMode: (m, o) => b.setMode(m, o), sfx, shake: (a) => settings.shake && game.engine.shake(a * 0.4, 0.3),
        e, battle: this,
      };
      const gen = (PATTERNS[s.p] || PATTERNS.nothing)(c, s.params || {});
      return { gen, wait: 0, done: false };
    });
    this.phase = 'dodge';
    let time = specs.reduce((m, s) => Math.max(m, s.time ?? 7), 0);
    if (this.fx.short) { time *= 0.7; this.fx.short = false; }
    const t0 = b.t;
    this.dodgeRunners = ctxs;
    await new Promise((resolve) => { this.dodgeResolve = resolve; this.dodgeEnd = t0 + time; });
    this.dodgeRunners = null;
    b.clear();
    b.soul.visible = false;
    b.setMode('free', { flash: false });
    b.resetBox();
    this.fx.slow = false;
    this.fx.gentle = false;
    this.fx.regen = false;
    this.fx.shieldTurn = false;
    this.fx.aegis = 0;
    if (this.noHitTurn && hasSkill('pa_counter')) this.fx.counter = true;
    await game.wait(0.25);
  }

  stepDodge(dt) {
    const b = this.board;
    const scaled = dt * b.timeScale * (this.freeze > 0 ? 0 : 1);
    if (this.freeze > 0) this.freeze -= dt;
    if (this.fx.aegis > 0) this.fx.aegis -= dt;
    let allDone = true;
    for (const r of this.dodgeRunners || []) {
      if (r.done) continue;
      allDone = false;
      r.wait -= scaled;
      let guard = 0;
      while (r.wait <= 0 && !r.done && guard++ < 50) {
        const step = r.gen.next();
        if (step.done) { r.done = true; break; }
        r.wait += step.value ?? 0;
      }
    }
    if (this.dead) { this.dodgeResolve?.(); this.dodgeResolve = null; return; }
    const timeUp = b.t >= this.dodgeEnd;
    if ((allDone && b.bullets.filter((x) => !x.harmless).length === 0) || timeUp) {
      if (this.dodgeResolve) { const r = this.dodgeResolve; this.dodgeResolve = null; r(); }
    }
  }

  // ------------------------------------------------------------ endings
  async victory() {
    const killed = this.killed || [];
    const spared = this.spared || [];
    let exp = 0, gold = 0, hope = 0;
    for (const e of killed) { exp += e.def.exp ?? 0; gold += e.def.gold ?? 0; }
    for (const e of spared) { gold += e.def.gold ?? 0; hope += (e.def.hope ?? 3) * (hasSkill('pe_ending') ? 2 : 1); }
    if (this.opts.noRewards) { exp = 0; gold = 0; hope = 0; }
    S.gold += gold;
    music.stop(0.3);
    const lines = [`* YOU WON!\n* You earned ${exp} EXP and ${gold} gold.`];
    const lvUp = addExp(exp);
    const hopeUp = addHope(hope);
    if (hope > 0) lines[0] += `\n* Your HOPE grew by ${hope}.`;
    if (lvUp) { sfx.levelUp(); lines.push('* Your LOVE increased.'); S.hp = Math.min(maxHp(), S.hp + lvUp * 4); }
    if (hopeUp) { sfx.hopeUp(); lines.push('* Your HOPE increased.\n* (A new SKILL POINT. Check the SOUL page with C.)'); S.hp = Math.min(maxHp(), S.hp + hopeUp * 2); }
    if (lvUp) lines[lines.length - (hopeUp ? 2 : 1)] += '\n* (A new SKILL POINT. Check the SOUL page with C.)';
    if (!this.opts.silentWin) await this.boxText(lines);
    await game.fadeOut(0.35);
    this.finish({ outcome: killed.length ? 'killed' : spared.length ? 'spared' : 'won', killed: killed.map((e) => e.id), spared: spared.map((e) => e.id), exp, gold });
  }

  async endFled() {
    await game.fadeOut(0.35);
    this.finish({ outcome: 'fled' });
  }

  async die() {
    this.phase = 'dead';
    music.stop(0);
    await gameOver(this.board.soul.x, this.board.soul.y);
    this.finish({ outcome: 'dead' });
  }

  // Force the battle to end from a script.
  end(result) {
    this.over = true;
    this.customResult = result;
    if (this.dodgeResolve) { const r = this.dodgeResolve; this.dodgeResolve = null; r(); }
  }

  // ------------------------------------------------------------ update
  update(dt) {
    this.t += dt;
    this.stage.update(dt, this.enemies);
    const dodging = this.phase === 'dodge';
    this.board.update(dt, dodging);
    if (dodging) this.stepDodge(dt);
    if (this.shakeBox) this.shakeBox = Math.max(0, this.shakeBox - dt);
    if (this.refuseFlash) this.refuseFlash = Math.max(0, this.refuseFlash - dt);
    for (const d of this.dmgNums) d.t += dt;
    this.dmgNums = this.dmgNums.filter((d) => d.t < 1.3);
    const ph = this.phase;
    if (ph === 'menu') {
      this.boxTyper?.update(dt);
      if (input.pressed('left')) { this.btn = (this.btn + 4) % 5; sfx.move(); }
      if (input.pressed('right')) { this.btn = (this.btn + 1) % 5; sfx.move(); }
      if (input.pressed('confirm')) {
        sfx.select();
        this.phase = 'wait';
        const r = this.btnResolve; this.btnResolve = null;
        r(BTN[this.btn]);
      }
    } else if (ph === 'text') {
      this.boxTyper.update(dt);
      if (!this.boxTyper.done) { if (input.pressed('cancel')) this.boxTyper.skip(); }
      else if (input.pressed('confirm') || (this.textAuto && (this.autoT = (this.autoT || 0) + dt) > this.textAuto)) {
        this.autoT = 0;
        if (this.pageIdx < this.pages.length - 1) {
          this.pageIdx++;
          this.boxTyper = new Typer(this.pages[this.pageIdx], { width: MENU_BOX.w - 60, size: 26, cps: 34, onBlip: () => sfx.voice('narrator') });
        } else {
          this.phase = 'wait';
          const r = this.textResolve; this.textResolve = null;
          r();
        }
      }
    } else if (ph === 'list') {
      const L = this.list;
      const n = L.items.length;
      if (L.cols === 2) {
        if (input.pressed('left') || input.pressed('right')) { L.idx = L.idx % 2 === 0 ? Math.min(n - 1, L.idx + 1) : L.idx - 1; sfx.move(); }
        if (input.pressed('up')) { if (L.idx >= 2) { L.idx -= 2; sfx.move(); } }
        if (input.pressed('down')) { if (L.idx + 2 < n) { L.idx += 2; sfx.move(); } }
      } else {
        if (input.pressed('up')) { L.idx = (L.idx + n - 1) % n; sfx.move(); }
        if (input.pressed('down')) { L.idx = (L.idx + 1) % n; sfx.move(); }
      }
      if (input.pressed('confirm')) {
        if (L.items[L.idx].disabled) sfx.buzz();
        else { sfx.select(); this.phase = 'wait'; L.resolve(L.idx); }
      } else if (input.pressed('cancel')) { sfx.back(); this.phase = 'wait'; L.resolve(-1); }
    } else if (ph === 'fight') {
      const F = this.fightBars;
      F.t += dt;
      let allDone = true;
      for (const bar of F.bars) {
        if (bar.hit !== null) continue;
        allDone = false;
        if (!F.auto) bar.x += dt * 0.95 * F.speed;
        if (bar.x > 1.05) { bar.hit = -1; }
      }
      const active = F.bars.find((bb) => bb.hit === null && bb.x >= 0);
      if (F.auto && F.t > 0.3) { for (const bb of F.bars) if (bb.hit === null) { bb.hit = 1; } }
      else if (active && input.pressed('confirm')) {
        const acc = 1 - Math.min(1, Math.abs(active.x - 0.5) / 0.5);
        active.hit = acc;
        active.flash = 0;
        sfx.slash();
      }
      if (allDone || F.bars.every((bb) => bb.hit !== null)) {
        if (!F.endT) F.endT = F.t;
        if (F.t - F.endT > 0.35) {
          this.phase = 'wait';
          F.resolve(F.bars.map((bb) => (bb.hit === -1 ? null : bb.hit)));
        }
      }
    } else if (ph === 'bubbles') {
      for (const bb of this.bubbles) bb.update(dt);
      this.bubbleT += dt;
      const typed = this.bubbles.every((bb) => bb.typer.done);
      if (!typed && input.pressed('cancel')) this.bubbles.forEach((bb) => bb.typer.skip());
      if ((typed && input.pressed('confirm')) || (typed && this.bubbleT > 4)) {
        this.phase = 'wait';
        const r = this.bubbleResolve; this.bubbleResolve = null;
        r();
      }
    }
  }

  // ------------------------------------------------------------ draw
  draw(ui) {
    const g = ui.ctx;
    const b = this.board;
    const dodging = this.phase === 'dodge';
    g.save();
    if (this.shakeBox) g.translate((Math.random() - 0.5) * 6 * this.shakeBox * 4, (Math.random() - 0.5) * 6 * this.shakeBox * 4);
    b.draw(ui, { dodging });
    g.restore();
    const bx = b.box;
    const tx = bx.x + 28, ty = bx.y + 22;
    if ((this.phase === 'menu' || this.phase === 'text') && this.boxTyper && b.boxSettled) this.boxTyper.draw(g, tx, ty, this.t);
    if (this.phase === 'list') this.drawList(ui);
    if (this.phase === 'fight') this.drawFight(ui);
    for (const bb of this.bubbles) bb.draw(ui);
    this.drawStats(ui);
    this.drawButtons(ui);
    // damage numbers + hp bars
    for (const d of this.dmgNums) {
      const [x, y] = this.stage.screenOf(d.e, ui, 1.0);
      const yy = y - 20 - Math.min(1, d.t * 5) * 18 + (d.t > 0.2 ? Math.min(12, (d.t - 0.2) * 40) : 0);
      if (d.bar) {
        const k = Math.min(1, d.t * 2.5);
        const frac = d.from + (d.to - d.from) * k;
        g.fillStyle = '#404040';
        g.fillRect(x - 60, y + 4, 120, 14);
        g.fillStyle = '#35e040';
        g.fillRect(x - 60, y + 4, 120 * Math.max(0, frac), 14);
      }
      ui.text(d.text, x, yy - 24, { size: 32, family: FONTS.title, align: 'center', color: d.color, shadow: '#000' });
    }
    if (this.refuseFlash > 0) {
      ui.text('But it refused.', 480, 200, { size: 26, family: FONTS.title, align: 'center', color: '#ff3030', alpha: Math.min(1, this.refuseFlash), glow: '#ff0000' });
    }
    if (dodging && this.freeze > 0) ui.text('...', bx.x + bx.w / 2, bx.y - 34, { size: 22, align: 'center', color: '#46e6ff' });
    // soul meters during dodge
    if (dodging) this.drawSoulMeter(ui);
  }

  drawSoulMeter(ui) {
    const s = this.board.soul;
    const bx = this.board.box;
    const col = SOULS[S.soul].color;
    let frac = null, label = SOULS[S.soul].action;
    if (S.soul === 'patience') frac = s.focus / (hasSkill('pa_longer') ? 3.5 : 2.5);
    else if (S.soul !== 'kindness' && S.soul !== 'justice') {
      const max = S.soul === 'determination' ? (hasSkill('dt_nerve') ? 3 : 4) : S.soul === 'bravery' ? (hasSkill('br_quick') ? 0.8 : 1.1) : S.soul === 'integrity' ? (hasSkill('in_recover') ? 1.4 : 2) : 1.2;
      frac = 1 - s.cd / max;
    }
    if (s.mode !== 'free' && s.mode !== 'gravity') return;
    const x = bx.x + bx.w + 14, y = bx.y + bx.h;
    ui.text('X', x + 6, y - 78, { size: 12, family: FONTS.small, color: col });
    if (frac !== null) {
      ui.ctx.fillStyle = '#333';
      ui.ctx.fillRect(x, y - 60, 12, 60);
      ui.ctx.fillStyle = frac >= 1 ? col : '#888';
      ui.ctx.fillRect(x, y - 60 * Math.min(1, frac), 12, 60 * Math.min(1, frac));
    }
    void label;
  }

  drawList(ui) {
    const L = this.list, bx = this.board.box;
    L.items.forEach((it, i) => {
      const col = L.cols === 2 ? i % 2 : 0, row = L.cols === 2 ? Math.floor(i / 2) : i;
      const x = bx.x + 70 + col * 400, y = bx.y + 20 + row * 34;
      if (y > bx.y + bx.h - 20) return;
      const c = it.disabled ? '#777' : it.color || '#fff';
      ui.text(it.label, x, y, { size: 26, color: c });
      if (it.right) ui.text(it.right, bx.x + bx.w - 40, y, { size: 22, color: it.disabled ? '#777' : '#ffb04a', align: 'right' });
      if (L.opts.showHp && it.hp) {
        const e = it.hp;
        ui.ctx.fillStyle = '#c00000';
        ui.ctx.fillRect(bx.x + 420, y + 6, 110, 16);
        ui.ctx.fillStyle = '#00d000';
        ui.ctx.fillRect(bx.x + 420, y + 6, 110 * (e.hp / e.maxhp), 16);
        ui.ctx.fillStyle = '#ff8a1f';
        ui.ctx.fillRect(bx.x + 560, y + 6, 110, 16);
        ui.ctx.fillStyle = '#ffe81f';
        ui.ctx.fillRect(bx.x + 560, y + 6, 110 * (e.mercy / 100), 16);
        ui.text(`${Math.round(e.mercy)}%`, bx.x + 680, y + 2, { size: 16, family: FONTS.small, color: '#ffe81f' });
      }
      if (i === L.idx) ui.heart(x - 26, y + 14, 18, SOULS[S.soul].color);
    });
    if (L.opts.showHp) {
      ui.text('HP', bx.x + 420, bx.y + bx.h - 22, { size: 12, family: FONTS.small, color: '#aaa' });
      ui.text('MERCY', bx.x + 560, bx.y + bx.h - 22, { size: 12, family: FONTS.small, color: '#aaa' });
    }
    if (L.opts.desc) ui.text(L.opts.desc(L.idx), bx.x + bx.w - 40, bx.y + bx.h - 30, { size: 16, family: FONTS.small, color: '#bbb', align: 'right' });
  }

  drawFight(ui) {
    const g = ui.ctx, bx = this.board.box;
    const cx = bx.x + bx.w / 2, cy = bx.y + bx.h / 2;
    const w = bx.w - 40, h = bx.h - 30;
    // the target
    g.save();
    g.strokeStyle = '#ffffff';
    g.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      g.globalAlpha = 0.25 + i * 0.12;
      g.beginPath();
      g.ellipse(cx, cy, (w / 2) * (1 - i * 0.2), (h / 2) * (1 - i * 0.12), 0, 0, Math.PI * 2);
      g.stroke();
    }
    g.globalAlpha = 1;
    g.fillStyle = '#35e040';
    g.fillRect(cx - 4, bx.y + 14, 8, bx.h - 28);
    g.restore();
    for (const bar of this.fightBars.bars) {
      if (bar.x < 0 && bar.hit === null) continue;
      const x = bx.x + 20 + Math.max(0, Math.min(1, bar.x)) * w;
      const flash = bar.hit !== null && bar.hit >= 0 && Math.floor(this.t * 16) % 2 === 0;
      g.fillStyle = flash ? '#000' : '#fff';
      g.fillRect(x - 5, bx.y + 8, 10, bx.h - 16);
      g.strokeStyle = flash ? '#fff' : '#000';
      g.lineWidth = 2;
      g.strokeRect(x - 5, bx.y + 8, 10, bx.h - 16);
    }
  }

  drawStats(ui) {
    const y = 428;
    const soul = SOULS[S.soul];
    ui.text(S.name, 48, y, { size: 24 });
    ui.text(`LV ${S.lv}`, 190, y + 2, { size: 22, family: FONTS.small });
    ui.text('HP', 300, y + 4, { size: 16, family: FONTS.small });
    const mh = maxHp();
    const bw = Math.min(150, 40 + mh * 1.1);
    ui.ctx.fillStyle = '#c00000';
    ui.ctx.fillRect(334, y + 2, bw, 22);
    if (this.board.grey > 0) {
      ui.ctx.fillStyle = '#b070ff';
      ui.ctx.fillRect(334, y + 2, bw * Math.min(1, (S.hp + this.board.grey) / mh), 22);
    }
    ui.ctx.fillStyle = '#ffff00';
    ui.ctx.fillRect(334, y + 2, bw * Math.max(0, S.hp / mh), 22);
    ui.text(`${S.hp} / ${mh}`, 334 + bw + 14, y, { size: 24 });
    // RESOLVE
    ui.text('RP', 660, y + 4, { size: 16, family: FONTS.small, color: soul.color });
    ui.ctx.fillStyle = '#333';
    ui.ctx.fillRect(694, y + 2, 150, 22);
    ui.ctx.fillStyle = soul.color;
    ui.ctx.fillRect(694, y + 2, 150 * (this.resolve / 100), 22);
    ui.text(`${Math.floor(this.resolve)}%`, 856, y, { size: 22, color: soul.color });
  }

  drawButtons(ui) {
    const soul = SOULS[S.soul];
    BTN.forEach((name, i) => {
      const x = BTN_X(i), y = BTN_Y;
      const sel = this.phase === 'menu' && i === this.btn;
      const col = sel ? '#ffff00' : '#ff8a1f';
      const g = ui.ctx;
      g.save();
      g.strokeStyle = col;
      g.lineWidth = 3;
      g.fillStyle = '#000';
      g.fillRect(x, y, 164, 46);
      g.strokeRect(x + 1.5, y + 1.5, 161, 43);
      g.restore();
      if (sel) ui.heart(x + 24, y + 23, 18, soul.color);
      else this.drawIcon(ui, i, x + 24, y + 23, col);
      ui.text(name, x + 98, y + 11, { size: 24, family: FONTS.small, align: 'center', color: col });
    });
  }

  drawIcon(ui, i, x, y, col) {
    const g = ui.ctx;
    g.save();
    g.fillStyle = col;
    g.strokeStyle = col;
    g.lineWidth = 3;
    if (i === 0) { g.beginPath(); g.moveTo(x - 8, y + 8); g.lineTo(x + 8, y - 8); g.stroke(); g.fillRect(x - 10, y + 2, 8, 3); }
    else if (i === 1) { g.beginPath(); g.arc(x, y, 8, 0, Math.PI * 2); g.stroke(); g.fillRect(x - 4, y - 2, 2, 2); g.fillRect(x + 2, y - 2, 2, 2); }
    else if (i === 2) ui.heart(x, y, 16, SOULS[S.soul].color, { alpha: 0.9 });
    else if (i === 3) { g.fillRect(x - 8, y - 4, 16, 12); g.fillRect(x - 4, y - 8, 8, 4); }
    else { g.beginPath(); g.moveTo(x - 7, y - 7); g.lineTo(x + 7, y + 7); g.moveTo(x + 7, y - 7); g.lineTo(x - 7, y + 7); g.stroke(); }
    g.restore();
  }
}

// ---------------------------------------------------------------------------
// The encounter transition, then the battle, then back to the world.
async function transitionIn(world) {
  let x = 480, y = 300;
  if (world?.player) [x, y] = world.player.headScreen(world.cam, game.ui, -0.75);
  const color = SOULS[S.soul].color;
  const st = { x, y, vis: true, black: 1 };
  const drawer = (ui) => {
    ui.fillScreen('#000', st.black);
    if (st.vis) ui.heart(st.x, st.y, 18, color, { glow: 8 });
  };
  game.topDrawers.add(drawer);
  for (let i = 0; i < 3; i++) {
    st.vis = true; sfx.soulBlink(); await game.wait(0.08);
    st.vis = false; await game.wait(0.08);
  }
  st.vis = true;
  sfx.soulFly();
  const tx = BTN_X(0) + 24, ty = BTN_Y + 23;
  await game.tween(0.4, (k) => { st.x = x + (tx - x) * k; st.y = y + (ty - y) * k; });
  return () => game.topDrawers.delete(drawer);
}

export async function runBattle(opts, world) {
  const prevMusic = music.currentId;
  let removeDrawer = null;
  if (!opts.noTransition) removeDrawer = await transitionIn(world);
  else music.stop(0.2);
  const b = new BattleMode(opts, world);
  game.fadeAlpha = 1;
  game.fadeColor = '#000';
  if (removeDrawer) removeDrawer();
  const result = await b.run();
  if (result.outcome === 'dead') {
    if (world) await world.respawn();
    return result;
  }
  // back to the overworld
  if (world) {
    game.setMode(world);
    if (!opts.keepWorldMusic) {
      if (opts.afterMusic !== undefined) opts.afterMusic ? music.play(opts.afterMusic) : music.stop(0.5);
      else if (prevMusic) world.playRoomMusic();
    }
    world.applyTheme();
    if (onGenocide() && S.kills[b.area] >= AREA_QUOTA[b.area]) world.applyTheme();
    game.fadeIn(0.4);
  }
  void metaFlag; void rand;
  return result;
}
