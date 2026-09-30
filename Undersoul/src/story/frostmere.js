// FROSTMERE — the snow forest, and Snowcap town.
import * as THREE from 'three';
import { game } from '../core/game.js';
import { S, flag, setFlag, onGenocide, areaCleared } from '../core/save.js';
import { maxHp } from '../data/stats.js';
import { walkPath, leave, once } from './util.js';
import { sfx } from '../audio/sfx.js';
import { music } from '../audio/sequencer.js';
import { runBattle } from '../battle/battle.js';
import { openShop } from '../ui/shop.js';
import { toon, lit, glow, outlineAll } from '../gfx/materials.js';

const F = { theme: 'frostmere', area: 'frostmere', ambience: 'wind', step: 'snow' };
const ENC = { pool: [['frostbeak', 3], ['chilly', 3]], pairs: 0.2 };
const empty = () => onGenocide() && areaCleared('frostmere');
const geno = () => onGenocide();
const W = (w, pages, o) => w.say('wick', pages, o);
const T = (w, pages, o) => w.say('taper', pages, o);

// --- small builders ---------------------------------------------------------
function gate() {
  const g = new THREE.Group();
  const wood = toon('#6a4428');
  for (const x of [-2.2, 2.2]) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.2, 0.25), wood);
    p.position.set(x, 1.1, 0);
    g.add(p);
  }
  for (let i = -1; i <= 1; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.8, 0.12), wood);
    bar.position.set(i * 1.4, 0.9, 0);
    g.add(bar);
  }
  const top = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.2, 0.25), wood);
  top.position.y = 2.1;
  g.add(top);
  outlineAll(g, 0.02);
  return g;
}

function hollowDoor() {
  const g = new THREE.Group();
  const rock = lit('#5a4a6a', { flat: true });
  const wall = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 1), rock);
  wall.position.set(0, 2, 0);
  g.add(wall);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.6), new THREE.MeshBasicMaterial({ color: '#120a16' }));
  door.position.set(0, 1.3, -0.51);
  door.rotation.y = Math.PI;
  g.add(door);
  return g;
}

function iceSheet(w, d) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshStandardMaterial({ color: '#bfe8ff', roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.85, emissive: '#2a6aa8', emissiveIntensity: 0.25 }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.015;
  m.receiveShadow = true;
  const g = new THREE.Group();
  g.add(m);
  return g;
}

function cart() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.8, 0.8), toon('#e8e8f8'));
  box.position.y = 0.7;
  g.add(box);
  const um = new THREE.Mesh(new THREE.ConeGeometry(1, 0.5, 8), toon('#6ab8ff'));
  um.position.y = 2.1;
  g.add(um);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 5), toon('#888'));
  pole.position.y = 1.4;
  g.add(pole);
  for (const x of [-0.5, 0.5]) {
    const wh = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 6, 12), toon('#333'));
    wh.position.set(x, 0.22, 0.42);
    g.add(wh);
  }
  outlineAll(g, 0.02);
  return g;
}

// X/O tile puzzle state lives in flags; tiles are props 't0'...'t8'.
const TILE_POS = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) TILE_POS.push([(c - 1) * 1.3, -4.3 + r * 1.3]);

function tileState() { return S.flags.xo || [0, 0, 0, 0, 0, 0, 0, 0, 0]; }
function drawTiles(w) {
  const st = tileState();
  st.forEach((v, i) => w.room.props.get('t' + i)?.obj.userData.draw(v ? '#4a9a5a' : '#8a5aaa', v ? 'O' : 'X'));
}

// ---------------------------------------------------------------------------
export const FROSTMERE = {
  f1: {
    ...F, id: 'f1', name: 'Frostmere - Frost Road',
    music: () => (flag('wickMet') ? 'frostmere' : null),
    floor: [[-3, -2, 3, 4], [-2, -34, 2, -2]],
    props: [
      { t: 'custom', x: 0, z: 5.2, build: hollowDoor, solid: null },
      { t: 'custom', x: 0, z: -28, build: gate, solid: null, text: '(A gate. The bars are far too wide to stop anyone.)' },
      { t: 'lamp', id: 'lamp', x: 1.4, z: -25.5, color: '#ffe0a0', h: 2.4, solid: 0.25 },
    ],
    spawns: { default: [0, 2.6, 'up'], south: [0, 2.6, 'up'], north: [0, -32.5, 'down'] },
    exits: [
      { rect: [-1, 3.5, 1, 4], to: 'h16', spawn: 'default' },
      { rect: [-2, -34, 2, -33.2], to: 'f2', spawn: 'south' },
    ],
    async enter(w) { if (once('frostArrive')) await w.echo('frost'); },
    triggers: [
      { rect: [-2, -10, 2, -8], once: 'twig', async run() { sfx.crack(); await game.wait(0.8); } },
      { rect: [-2, -18, 2, -16], once: 'follow', async run() { for (let i = 0; i < 4; i++) { sfx.step('snow'); await game.wait(0.35); } } },
      {
        rect: [-2, -25, 2, -23], once: 'wickMet',
        async run(w) {
          const p = w.player;
          const wk = w.addNpc({ id: 'wick', model: 'wick', x: 0, z: -17, face: 'up' });
          for (let i = 0; i < 6; i++) { sfx.step('snow'); await game.wait(0.3); }
          await wk.walkTo(0, -21.8, 1.4);
          if (geno()) {
            await W(w, ['...', 'heh.', 'busy day, huh, kid?', 'turn around.']);
            p.face(wk);
            await W(w, ['yeah. that\'s what i thought.', 'go on. my brother\'s up ahead. he\'s dying to meet you.', '...poor choice of words.']);
            await leave(w, 'wick', [[0, -15]], 1.4);
            music.play('frostmere');
            return;
          }
          await W(w, ['human.', 'don\'t you know how to greet a new pal?', 'turn around and shake my hand.']);
          p.face(wk);
          await game.wait(0.3);
          sfx.fire();
          wk.model.userData.flame.scale.setScalar(2.2);
          await game.wait(0.4);
          wk.model.userData.flame.scale.setScalar(1);
          await W(w, ['heh heh. the ol\' candle-in-the-hand trick.', 'it\'s ALWAYS funny.', 'anyway, you\'re a human, right? that\'s hilarious.', 'i\'m wick. wick the candle.']);
          await w.echo('wick');
          await W(w, ['i\'m supposed to be on watch for humans right now.', 'but, y\'know... i don\'t really care about capturing anybody.', 'now my brother, taper... he\'s a human-hunting FANATIC.', '...hey, actually, i think that\'s him over there.', 'quick. hide behind that conveniently-shaped lamp.']);
          await walkPath(p, [[1.4, -24.6]], 2.6);
          p.face('up');
          const tp = w.addNpc({ id: 'taper', model: 'taper', x: -0.6, z: -31, face: 'down' });
          music.play('taper', { fade: 0.3 });
          await tp.walkTo(-0.6, -25.5, 3);
          wk.face(tp);
          await T(w, ['SUP, BROTHER.', 'YOU KNOW WHAT "SUP", BROTHER! IT\'S BEEN EIGHT DAYS AND YOU STILL HAVEN\'T RECALIBRATED YOUR PUZZLES!', 'YOU JUST HANG AROUND OUTSIDE YOUR STATION!', 'WHAT ARE YOU EVEN DOING?!']);
          await W(w, ['staring at this lamp. it\'s a really cool lamp.', 'do you wanna look?']);
          await T(w, ['NO! I DON\'T HAVE TIME FOR THAT!', 'WHAT IF A HUMAN COMES THROUGH HERE?! I WANT TO BE READY!', 'I WILL BE THE ONE! I MUST BE THE ONE! I WILL CAPTURE A HUMAN!', 'THEN I, THE GREAT TAPER, WILL GET ALL THE THINGS I UTTERLY DESERVE!', 'RESPECT... RECOGNITION... I WILL FINALLY BE ABLE TO JOIN THE ROYAL GUARD!']);
          await W(w, ['hmm... maybe this lamp will help you.']);
          await T(w, ['WICK! YOU ARE NO HELP! YOU LAZY WAXY LUMP!', 'I WILL ATTEND TO MY PUZZLES! AS FOR YOUR WORK... PUT A LITTLE MORE "BACKBONE" INTO IT!', 'NYEH HEH HEH HEH HEH!']);
          await tp.walkTo(-0.6, -31.5, 3.5);
          w.removeNpc('taper');
          music.stop(0.6);
          await W(w, ['ok, you can come out now.', 'you oughta get going. he might come back.', '...actually, hey. would you do me a favor?', 'my brother\'s been kinda down lately. he\'s never seen a human.', 'seeing you might make his whole week.', 'don\'t worry. he isn\'t dangerous. even if he tries to be.']);
          await leave(w, 'wick', [[0, -32.8]], 1.3);
          music.play('frostmere', { fade: 1 });
        },
      },
    ],
  },

  f2: {
    ...F, id: 'f2', name: 'Frostmere - Sentry Post',
    floor: [[-6, -8, 6, 6], [-2, 6, 2, 9], [-2, -12, 2, -8]],
    props: [
      { t: 'station', x: -3.5, z: -5, sign: '#4a8ac8', solid: [2.2, 1], text: () => ['(A sentry station. The sign says "WICK\'S STATION".)', '(Below it, in smaller writing: "and also taper\'s station.")', '(Below that, even smaller: "wick please do your job")'] },
      { t: 'tree', x: 4.5, z: -6, h: 3 }, { t: 'tree', x: 5, z: 3, h: 2.8 },
      { t: 'custom', x: 3, z: 1, build: () => snowPoff(), solid: null, text: '(A lump of snow. It is mostly snow.)' },
    ],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -10.5, 'down'] },
    exits: [
      { rect: [-2, 8.2, 2, 9], to: 'f1', spawn: 'north' },
      { rect: [-2, -12, 2, -11.2], to: 'f3', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.5, when: () => flag('brothersMet') },
    triggers: [{
      rect: [-6, -2, 6, 2], once: 'brothersMet', when: () => !geno(),
      async run(w) {
        const wk = w.addNpc({ id: 'wick', model: 'wick', x: -1.2, z: -6.5, face: 'down' });
        const tp = w.addNpc({ id: 'taper', model: 'taper', x: 1.2, z: -6.5, face: 'left' });
        music.play('taper');
        await T(w, ['SO, AS I WAS SAYING ABOUT UNDYING... WAIT.', 'WICK!! OH MY GOSH!! IS THAT... A HUMAN?!']);
        wk.face('down');
        await W(w, ['uhhh... actually, i think that\'s a snow lump.']);
        await T(w, ['OH.']);
        tp.face('down');
        await game.wait(0.6);
        await T(w, ['...WAIT. THE SNOW LUMP IS WAVING AT US.']);
        await W(w, ['...hey.']);
        await T(w, ['HUMAN!!! I, THE GREAT TAPER, WILL STOP YOU!', 'YOU WILL FACE MY PUZZLES! YOU WILL BE AMAZED! AND THEN... I WILL CAPTURE YOU!', 'THEN YOU\'LL BE DELIVERED TO THE CAPITAL! THEN... THEN... I\'M NOT SURE WHAT HAPPENS THEN!', 'NYEH HEH HEH HEH HEH!']);
        await leave(w, 'taper', [[1.2, -11.5]], 3.5);
        await W(w, ['well, that went well.', 'don\'t sweat it, kid. i\'ll keep an eye out for you.']);
        await leave(w, 'wick', [[-1.2, -11.5]], 1.5);
        music.play('frostmere');
      },
    }],
  },

  f3: {
    ...F, id: 'f3', name: 'Frostmere - X and O',
    floor: [[-6, -10, 6, 6], [-2, 6, 2, 9], [-2, -14, 2, -10]],
    props: [
      ...TILE_POS.map(([x, z], i) => ({ t: 'tile', id: 't' + i, x, z, w: 1.2, color: '#8a5aaa', mark: 'X', solid: null })),
      { t: 'spikes', id: 'spikes', x: 0, z: -10.6, w: 4, d: 1.2, solid: [4, 1.2] },
      { t: 'sign', x: -3, z: 0.5, text: ['"STEP ON EVERY X TO MAKE IT AN O."', '"STEPPING ON AN O MAKES IT AN X AGAIN."', '"GOOD LUCK! - T"'] },
      { t: 'tree', x: -5, z: -8, h: 3 }, { t: 'tree', x: 5, z: 4, h: 3.2 },
    ],
    npcs: [{ id: 'taper', model: 'taper', x: 3.2, z: -8.4, face: 'down', when: () => !flag('xoDone') && !geno(), talk: async (w) => T(w, ['NYEH HEH HEH! YOU\'LL NEVER SOLVE IT!', 'UNLESS YOU STEP ON THE TILES. THEN YOU PROBABLY WILL.']) }],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -12.5, 'down'] },
    exits: [
      { rect: [-2, 8.2, 2, 9], to: 'f2', spawn: 'north' },
      { rect: [-2, -14, 2, -13.2], to: 'f4', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.5 },
    async enter(w) {
      drawTiles(w);
      if (flag('xoDone')) { const s = w.room.props.get('spikes'); s.obj.userData.set(false); w.room.setSolid('spikes', false); }
      w.lastTile = -1;
    },
    update(w) {
      if (flag('xoDone') || w.locked) return;
      const p = w.player;
      let on = -1;
      TILE_POS.forEach(([x, z], i) => { if (Math.abs(p.x - x) < 0.6 && Math.abs(p.z - z) < 0.6) on = i; });
      if (on !== w.lastTile) {
        w.lastTile = on;
        if (on >= 0) {
          const st = [...tileState()];
          st[on] = st[on] ? 0 : 1;
          S.flags.xo = st;
          sfx.switch();
          drawTiles(w);
          if (st.every((v) => v)) {
            setFlag('xoDone');
            sfx.correct();
            const s = w.room.props.get('spikes');
            s.obj.userData.set(false);
            w.room.setSolid('spikes', false);
            if (!geno()) w.run(async () => { await T(w, ['WHAT?! YOU SOLVED IT?!', 'WELL... THE NEXT ONE WILL BE MUCH HARDER! PROBABLY! NYEH!']); await leave(w, 'taper', [[3.2, -13.5]], 3.5); });
          }
        }
      }
    },
    triggers: [{
      rect: [-2, -13, 2, -11.5], once: 'pupFight', when: () => flag('xoDone'),
      async run(w) {
        const pup = w.addNpc({ id: 'pup', model: 'pupguard', x: 0, z: -13.6, face: 'down' });
        await game.wait(0.3);
        const r = await w.encounter(['pupguard']);
        if (r.outcome !== 'dead') w.removeNpc('pup');
        void pup;
      },
    }],
  },

  f4: {
    ...F, id: 'f4', name: 'Frostmere - Glass Pond',
    floor: [[-7, -12, 7, 6], [-2, 6, 2, 9], [-2, -16, 2, -12]],
    ice: [[-6.5, -10, 6.5, -2]],
    props: [
      { t: 'custom', x: 0, z: -6, build: () => iceSheet(13, 8), solid: null },
      { t: 'rock', x: 3, z: -7, s: 1, color: '#8aa0c8', solid: 0.45 },
      { t: 'rock', x: -4, z: -4.5, s: 1, color: '#8aa0c8', solid: 0.45 },
      { t: 'rock', x: 5.2, z: -3.5, s: 0.9, color: '#8aa0c8', solid: 0.45 },
      { t: 'lever', id: 'lever', x: 5.5, z: -11.2, run: iceLever },
      { t: 'spikes', id: 'spikes', x: 0, z: -12.6, w: 4, d: 1.2, solid: [4, 1.2] },
      { t: 'save', x: -5, z: 3, line: () => (empty() ? '(The snow is silent.)' : '(The ice sparkles. It fills you with DETERMINATION.)') },
      { t: 'custom', x: 4.4, z: 2.6, build: cart, solid: [1.5, 1] },
    ],
    npcs: [{
      id: 'conevendor', model: 'villager:bunny:#e8f0ff:#6ab8ff', x: 3.2, z: 2.6, face: 'down', when: () => !empty(), lookAtPlayer: true,
      talk: async (w) => {
        await w.say({ name: 'CONE BUNNY', voice: 'high', color: '#bfe8ff' }, ['Frost Cones! Colder than the snow! Warmer than your heart!', '...that came out wrong. Want one?']);
        await openShop(w, { name: 'FROST CONES', keeper: 'mitts', items: [['frost_cone', 12]], sell: false });
      },
    }],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -14.5, 'down'] },
    exits: [
      { rect: [-2, 8.2, 2, 9], to: 'f3', spawn: 'north' },
      { rect: [-2, -16, 2, -15.2], to: 'f5', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.5 },
    async enter(w) {
      if (flag('iceDone')) { w.room.props.get('lever').obj.userData.set(true); const s = w.room.props.get('spikes'); s.obj.userData.set(false); w.room.setSolid('spikes', false); }
    },
  },

  f5: {
    ...F, id: 'f5', name: 'Frostmere - Watchpost',
    floor: [[-8, -6, 8, 6], [-2, 6, 2, 9], [-2, -10, 2, -6]],
    props: [
      { t: 'station', x: 4.5, z: -3.5, sign: '#8a8a9a', solid: [2.2, 1], text: '(A sentry station. There\'s a pair of dark goggles and a pipe on the counter.)' },
      { t: 'tree', x: -6, z: -4, h: 3.4 }, { t: 'tree', x: -6.5, z: 3, h: 3 },
    ],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -8.5, 'down'] },
    exits: [
      { rect: [-2, 8.2, 2, 9], to: 'f4', spawn: 'north' },
      { rect: [-2, -10, 2, -9.2], to: 'f6', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.5 },
    triggers: [{
      rect: [-8, -2, 8, 1], once: 'blinkyFight',
      async run(w) {
        const d = w.addNpc({ id: 'blinky', model: 'blinky', x: 4.5, z: -2, face: 'left' });
        await w.say({ name: 'BLINKY', voice: 'low', color: '#d8c0a0' }, ['Something moved?', 'Something... definitely moved.']);
        const r = await w.encounter(['blinky']);
        if (r.outcome !== 'dead') w.removeNpc('blinky');
        void d;
      },
    }],
  },

  f6: {
    ...F, id: 'f6', name: 'Frostmere - Long Bridge', edge: 'platform',
    floor: [[-3, -4, 3, 6], [-1.5, -26, 1.5, -4], [-3, -30, 3, -26]],
    floorMat: () => lit('#a87a4a', { map: null }),
    props: [
      { t: 'tree', x: -2.5, z: 4.5, h: 3 }, { t: 'tree', x: 2.5, z: -29, h: 3 },
    ],
    spawns: { default: [0, 5, 'up'], south: [0, 5, 'up'], north: [0, -28.5, 'down'] },
    exits: [
      { rect: [-3, 5.5, 3, 6], to: 'f5', spawn: 'north' },
      { rect: [-3, -30, 3, -29.4], to: 'f7', spawn: 'west' },
    ],
    triggers: [
      {
        rect: [-3, -3, 3, 0], once: 'snootFight',
        async run(w) {
          w.addNpc({ id: 'snoots', model: 'snoot', x: 0, z: -3.2, face: 'down' });
          await w.say({ name: 'SIR SNOOT', voice: 'low', color: '#e8e0d0' }, ['What\'s that smell?', 'Where\'s that smell?']);
          await w.say({ name: 'MADAM SNOOT', voice: 'monster', color: '#c8b8a8' }, ['If you\'re a smell... identify yourself!']);
          const r = await w.encounter(['snoot']);
          if (r.outcome !== 'dead') w.removeNpc('snoots');
        },
      },
      {
        rect: [-1.5, -14, 1.5, -11], once: 'gauntlet', when: () => !geno(),
        async run(w) {
          const tp = w.addNpc({ id: 'taper', model: 'taper', x: 0, z: -27.5, face: 'down' });
          const wk = w.addNpc({ id: 'wick', model: 'wick', x: 1.8, z: -27, face: 'down' });
          music.play('taper');
          await T(w, ['HUMAN! THIS IS YOUR FINAL AND MOST DANGEROUS CHALLENGE!', 'BEHOLD! THE GRAND GAUNTLET OF WAXY DOOM!']);
          const fx = [];
          for (let i = 0; i < 6; i++) {
            const c = w.room.addProp({ t: 'candle', id: 'gc' + i, x: i % 2 ? 1.2 : -1.2, z: -16 - i * 1.6, h: 0.9, solid: null });
            fx.push(c);
            sfx.fire();
            await game.wait(0.15);
          }
          await T(w, ['FIRE! SPEARS! A SWINGING WAX PENDULUM! A DOG ON A ROPE!', 'WHEN I SAY THE WORD, IT WILL ACTIVATE!', 'IT WILL ACTIVATE!!!', '...']);
          await W(w, ['well? what\'re you waiting for?']);
          await T(w, ['...THIS CHALLENGE... IS TOO EASY! TOO EASY TO DEFEAT YOU WITH!', 'WE CAN\'T USE IT! AWAY IT GOES!']);
          for (let i = 0; i < 6; i++) w.room.removeProp('gc' + i);
          sfx.whoosh();
          await T(w, ['PHEW... THAT WAS A CLOSE ONE! I MEAN... NYEH HEH HEH!']);
          await leave(w, 'taper', [[0, -29.8]], 3.5);
          await W(w, ['i don\'t know what my brother\'s going to do.', 'if i were you... i\'d know what i was going to do.']);
          await leave(w, 'wick', [[1.8, -29.8]], 1.5);
          music.play('frostmere');
          void tp; void wk;
        },
      },
    ],
  },

  f7: {
    id: 'f7', name: 'Snowcap', theme: 'snowcap', area: 'frostmere', ambience: 'wind', step: 'snow',
    music: () => (empty() ? null : 'snowcap'),
    floor: [[-16, -8, 16, 8], ...[-11, -5, 1, 7, 13].map((x) => [x - 0.8, -9, x + 0.8, -8])],
    cam: { h: 6.8, d: 8.4, clampZ: [-5, 5] },
    props: [
      { t: 'house', x: -11, z: -10.6, w: 4.2, h: 3, d: 3, wall: '#9a6a4a', roof: '#4a6ab8', snowRoof: true, solid: null },
      { t: 'house', x: -5, z: -10.6, w: 4.2, h: 3, d: 3, wall: '#a87a5a', roof: '#6a4ab8', snowRoof: true, solid: null },
      { t: 'house', x: 1, z: -10.6, w: 4.2, h: 3.2, d: 3, wall: '#7a4a3a', roof: '#b84a4a', snowRoof: true, solid: null, window: '#ffb060' },
      { t: 'house', x: 7, z: -10.6, w: 4.2, h: 3, d: 3, wall: '#8a8aa8', roof: '#4a8a6a', snowRoof: true, solid: null },
      { t: 'house', x: 13, z: -10.6, w: 4.4, h: 3.6, d: 3, wall: '#c8a878', roof: '#d85a3a', snowRoof: true, solid: null },
      { t: 'gifttree', x: -1.5, z: 1.5 },
      { t: 'save', x: -13.5, z: 3, line: () => (empty() ? '(The town is empty.)' : '(The cozy lights of Snowcap fill you with DETERMINATION.)') },
      { t: 'sign', x: -8, z: -7, text: () => (empty() ? '(The shop sign has been flipped: "CLOSED".)' : '"MITTS\' EMPORIUM"') },
      { t: 'sign', x: -2, z: -7, text: '"SNOWCAP INN. Rooms: full of sleeping monsters."' },
      { t: 'sign', x: 4, z: -7, text: '"CINDER\'S"' },
      { t: 'sign', x: 10, z: -7, text: '"LIBRARY"' },
      { t: 'custom', x: 11.3, z: -7.6, build: () => mailbox('#ff6a3a'), solid: 0.2, text: '(Taper\'s mailbox. It\'s empty. It is kept very, very clean.)' },
      { t: 'custom', x: 14.7, z: -7.6, build: () => mailbox('#4a8ac8'), solid: 0.2, text: '(Wick\'s mailbox. It\'s stuffed full of unopened mail and one sock.)' },
      { t: 'lamp', x: -8, z: 4, color: '#ffc070' }, { t: 'lamp', x: 8, z: 4, color: '#ffc070' },
    ],
    npcs: [
      { id: 'tuft', model: 'tuft', x: 5, z: 1.5, face: 'down', lookAtPlayer: true, when: () => !empty(), talk: tuftTalk },
      { id: 'vbear', model: 'villager:bear:#8a6a4a:#c84a4a', x: -7, z: 0, face: 'right', lookAtPlayer: true, when: () => !empty(), talk: async (w) => w.say({ name: 'MOOSEBEAR', voice: 'low', color: '#c8a078' }, ['Every year we put a tree in the middle of town.', 'Everyone leaves a gift under it for someone they\'ve never met.', 'Nobody knows who started it. Probably somebody lonely.']) },
      { id: 'vcat', model: 'villager:cat:#e8c8a0:#6a4ab8', x: 9, z: 3, face: 'left', lookAtPlayer: true, when: () => !empty(), talk: async (w) => w.say({ name: 'KIT', voice: 'high', color: '#e8c8a0' }, ['The candle brothers moved here a few years ago.', 'The tall one waves at everybody. Every time.', 'The short one says hi back for him.']) },
      { id: 'vbird', model: 'villager:bird:#8ab8ff:#e8e8f8', x: 12, z: -2, face: 'down', lookAtPlayer: true, when: () => !empty(), talk: async (w) => w.say({ name: 'PIPPIN', voice: 'high', color: '#8ab8ff' }, ['A HUMAN?! Here? In Snowcap?!', '...Could you sign my wing?']) },
    ],
    spawns: { default: [-14.5, 0, 'right'], west: [-14.5, 0, 'right'], east: [14.5, 0, 'left'], shop: [-11, -7.4, 'down'], tavern: [1, -7.4, 'down'], home: [13, -7.4, 'down'] },
    exits: [
      { rect: [-16, -3, -15.4, 3], to: 'f6', spawn: 'north' },
      { rect: [15.4, -3, 16, 3], to: 'f8', spawn: 'south' },
      { rect: [-11.8, -9, -10.2, -8.6], to: 'f7s', spawn: 'door' },
      { rect: [0.2, -9, 1.8, -8.6], to: 'f7t', spawn: 'door' },
      { rect: [12.2, -9, 13.8, -8.6], to: 'f7h', spawn: 'door', when: () => flag('taperSpared') || flag('captured'), blocked: (w) => w.narrate('(It\'s locked. A sign says "HOME OF TAPER (AND WICK)".)') },
    ],
    triggers: [
      { rect: [-6, -9, -4, -8], async run(w) { await w.narrate(empty() ? '(The inn is empty.)' : '(The inn is full of sleeping monsters. Someone is snoring in a very specific key.)'); w.player.setPos(w.player.x, -7.2); } },
      { rect: [6, -9, 8, -8], async run(w) { await w.narrate(['(The library. Everything here is about snow, or about the surface.)', '(One book is called "Stars: A Rumor".)']); w.player.setPos(w.player.x, -7.2); } },
    ],
    async enter(w) {
      if (empty() && once('snowcapEmpty')) await w.narrate('(Everyone has left.)');
    },
  },

  f7s: {
    id: 'f7s', name: 'Mitts\' Emporium', theme: 'home', area: 'frostmere', ambience: null, step: 'wood', music: () => (empty() ? null : 'shop'),
    floor: [[-4, -3, 4, 3], [-0.8, 3, 0.8, 4]],
    cam: { h: 4.8, d: 6 },
    particles: null,
    props: [
      { t: 'counter', x: 0, z: -1.8, w: 4, color: '#7a5a3a', solid: [4.2, 1] },
      { t: 'bookshelf', x: -3, z: -2.8, color: '#6a4428', solid: null },
      { t: 'crate', x: 3.2, z: 1.8, s: 0.7 },
      { t: 'crate', x: -3.2, z: 2, s: 0.6, color: '#c84a4a' },
    ],
    lights: [{ x: 0, z: 0, y: 2.6, color: '#ffd8a0', i: 3, d: 8 }],
    npcs: [{
      id: 'mitts', model: 'villager:bunny:#f0e8f0:#c86a8a', x: 0, z: -2.6, face: 'down', reach: 2.6, when: () => !empty(),
      talk: async (w) => {
        await w.say('mitts', flag('mittsMet') ? ['Welcome back, hon!'] : ['Hello, traveler! Welcome to Snowcap!', 'Is this your first time here? You look a little cold.']);
        setFlag('mittsMet');
        await openShop(w, {
          name: 'MITTS\' EMPORIUM', keeper: 'mitts', greet: '* Hello, traveler!\n* Warm things, sweet things, everything nice.',
          items: [['snow_bun', 15], ['frost_cone', 12], ['mittens', 40], ['gloves', 50], ['scarf', 60]],
          talk: async (ww) => ww.say('mitts', ['Those gloves came from a human, you know. Long ago.', 'They left them here and said they\'d come back for them.', 'They never did. I kept them clean just in case.']),
        });
      },
    }],
    spawns: { default: [0, 2.5, 'up'], door: [0, 2.5, 'up'] },
    exits: [{ rect: [-0.8, 3.6, 0.8, 4], to: 'f7', spawn: 'shop' }],
    async enter(w) { if (empty() && once('shopEmpty')) { await w.narrate('(No one is here. There\'s a note: "Took the gold. Took the gloves. Please don\'t follow me." )'); } },
  },

  f7t: {
    id: 'f7t', name: 'Cinder\'s', theme: 'home', area: 'frostmere', ambience: null, step: 'wood', music: () => (empty() ? null : 'wick'),
    floor: [[-6, -4, 6, 4], [-0.8, 4, 0.8, 5]],
    cam: { h: 5.4, d: 6.8 },
    particles: null,
    props: [
      { t: 'counter', x: 0, z: -2.8, w: 6, color: '#5a3a2a', solid: [6.2, 1] },
      { t: 'table', x: -4, z: 1, w: 1.2, d: 1.2, color: '#6a4428' },
      { t: 'table', x: 4, z: 1.5, w: 1.2, d: 1.2, color: '#6a4428' },
      { t: 'custom', x: 0, z: -3.9, build: () => shelfBottles(), solid: null },
    ],
    lights: [{ x: 0, z: -1, y: 2.4, color: '#ffa860', i: 5, d: 9 }],
    npcs: [
      { id: 'cinder', model: 'villager:fire', x: 0, z: -3.6, face: 'down', reach: 2.8, when: () => !empty(), talk: cinderTalk },
      { id: 'wick', model: 'wick', x: -1.6, z: -1.5, face: 'down', when: () => !empty() && flag('wickMet') && !flag('wickDinner') && !geno(), talk: wickDinner },
      { id: 'pat1', model: 'villager:bunny:#e8e0f0:#6a8ac8', x: -4, z: 2, face: 'up', when: () => !empty(), talk: async (w) => w.say({ name: 'LOP', voice: 'monster', color: '#ddd' }, ['Wick comes here for breakfast, lunch and dinner.', 'He also comes here between those.']) },
      { id: 'pat2', model: 'villager:bear:#6a4a3a:#4a6a3a', x: 4, z: 2.6, face: 'up', when: () => !empty(), talk: async (w) => w.say({ name: 'GRUMBLE', voice: 'low', color: '#ddd' }, ['Cinder\'s chestnuts are the best thing in Frostmere.', 'Second best thing is how warm it is in here.']) },
    ],
    spawns: { default: [0, 3.5, 'up'], door: [0, 3.5, 'up'] },
    exits: [{ rect: [-0.8, 4.6, 0.8, 5], to: 'f7', spawn: 'tavern' }],
  },

  f7h: {
    id: 'f7h', name: 'The Candle House', theme: 'home', area: 'frostmere', ambience: null, step: 'wood',
    music: () => (flag('taperKilled') ? null : 'taper'),
    floor: [[-5, -4, 5, 4], [-0.8, 4, 0.8, 5]],
    cam: { h: 5, d: 6.5 },
    particles: null,
    props: [
      { t: 'armchair', x: -3, z: -2.6, color: '#4a8a3a' },
      { t: 'tv', x: 0, z: -3.4, solid: [1.3, 0.6], text: ['(A TV. It\'s showing a cooking show hosted by a very shiny robot.)'] },
      { t: 'custom', x: 3.2, z: -3.3, build: () => rocketBed(), solid: [2.2, 1.2], text: () => ['(Taper\'s bed. It\'s shaped like a rocket.)', '(A sign on it says "NO WICKS".)'] },
      { t: 'rug', x: 0, z: 0, w: 3, d: 2, color: '#d84a3a', solid: null },
      { t: 'custom', x: -4.3, z: 1, build: () => shelfBottles(), solid: [0.6, 1.2], text: '(A shelf of action figures. They are all of the same monster, in different poses.)' },
    ],
    lights: [{ x: 0, z: 0, y: 2.6, color: '#ffd0a0', i: 3, d: 8 }],
    npcs: [{ id: 'taper', model: 'taper', x: 1, z: -1, face: 'down', when: () => flag('taperSpared') && !flag('taperFriend'), talk: taperHangout }],
    spawns: { default: [0, 3.5, 'up'], door: [0, 3.5, 'up'] },
    exits: [{ rect: [-0.8, 4.6, 0.8, 5], to: 'f7', spawn: 'home' }],
  },

  f8: {
    ...F, id: 'f8', name: 'Frostmere - Fog', fogDensity: 0.09, music: null,
    floor: [[-2.5, -30, 2.5, 4]],
    props: [{ t: 'tree', x: -3.5, z: -6, h: 3.4 }, { t: 'tree', x: 3.6, z: -14, h: 3 }],
    spawns: { default: [0, 3, 'up'], south: [0, 3, 'up'], north: [0, -28.5, 'down'] },
    exits: [
      { rect: [-2.5, 3.5, 2.5, 4], to: 'f7', spawn: 'east' },
      { rect: [-2.5, -30, 2.5, -29.4], to: 'f9', spawn: 'south', when: () => flag('taperDone') },
    ],
    triggers: [{
      rect: [-2.5, -16, 2.5, -13], when: () => !flag('taperDone'),
      async run(w) {
        const tp = w.addNpc({ id: 'taper', model: 'taper', x: 0, z: -21, face: 'down' });
        if (geno()) {
          await T(w, ['HUMAN.', 'I, THE GREAT TAPER, HAVE SOMETHING TO SAY.', 'YOU\'VE BEEN HURTING PEOPLE. A LOT OF PEOPLE.', 'BUT I DON\'T THINK YOU\'RE A BAD PERSON. I THINK YOU\'RE JUST... LOST.', 'SO I\'LL MAKE YOU AN OFFER. STOP HERE, AND I\'LL BE YOUR FRIEND.', 'I\'LL EVEN TEACH YOU HOW TO COOK! I BELIEVE IN YOU!']);
        } else {
          await T(w, ['HUMAN.', 'ALLOW ME TO TELL YOU ABOUT SOME COMPLEX FEELINGS.', 'THE FEELINGS OF FINALLY MEETING ANOTHER PERSON WHO APPRECIATES PUZZLES...', 'THE FEELINGS OF WANTING SOMEBODY TO THINK YOU\'RE COOL...', 'THESE FEELINGS... THEY MUST BE WHAT YOU\'RE FEELING RIGHT NOW!', 'BUT... I MUST CAPTURE YOU. IT\'S MY DESTINY! PREPARE!']);
        }
        tp.face('down');
        const r = await runBattle({ enemies: ['taper'], stage: 'frostmere' }, w);
        if (r.outcome === 'dead') return;
        if (r.outcome === 'captured') {
          await T(w, ['NYEH HEH HEH!! I CAPTURED YOU!!', 'I WILL PUT YOU IN MY HOUSE UNTIL THE ROYAL GUARD COMES!', '(IT\'S VERY COZY. THERE ARE SNACKS.)']);
          setFlag('captured');
          await w.goto('f7h', 'default');
          await w.narrate(['(You\'ve been captured. The house is warm.)', '(There\'s a plate of Crispy Toast and a note: "PLEASE DON\'T ESCAPE. - T")']);
          w.give('toast');
          return;
        }
        setFlag('taperDone');
        if (flag('taperKilled')) {
          w.removeNpc('taper');
          await w.narrate('(A warm puddle of wax on the snow.)');
          if (geno()) await w.echo('geno2');
          if (geno()) { setFlag('echoGone'); await w.echo('geno_gone'); }
          return;
        }
        await T(w, ['NYEH HEH HEH! I, THE GREAT TAPER, HAVE GAINED A FRIEND!', 'I\'LL BE AT MY HOUSE! COME HANG OUT! IT WILL BE VERY COOL!', 'THE PATH AHEAD LEADS TO THE CAPTAIN OF THE ROYAL GUARD. SHE\'S MY BEST FRIEND. AND MY BOSS.', 'MAYBE IF I ASK NICELY, SHE WON\'T TRY TO KILL YOU!']);
        await w.echo('taper_spared');
        await leave(w, 'taper', [[0, 3.6]], 3.5);
      },
    }],
  },

  f9: {
    ...F, id: 'f9', name: 'Frostmere - Edge of the Snow',
    floor: [[-3, -12, 3, 4], [-1, -16, 1, -12]],
    props: [
      { t: 'station', x: 2, z: -5, sign: '#4a8ac8', solid: [2.2, 1] },
      { t: 'tree', x: -2.6, z: 3, h: 3 },
      { t: 'save', x: -2, z: -2, line: () => (empty() ? '(Determination.)' : '(The sound of water in the distance fills you with DETERMINATION.)') },
    ],
    npcs: [{
      id: 'wick', model: 'wick', x: 2, z: -3.8, face: 'down', when: () => !empty(),
      talk: async (w) => {
        if (flag('taperKilled')) return W(w, ['...', 'you know what you did.']);
        await W(w, ['hey. heard you and my brother hit it off.', 'thanks for that. he\'s been wanting a friend like you for a long time.', 'the water\'s up ahead. echofall. it\'s pretty down there. real quiet.', 'watch out for the captain, though. she doesn\'t do "quiet".']);
      },
    }],
    spawns: { default: [0, 3, 'up'], south: [0, 3, 'up'], north: [0, -14.5, 'down'] },
    exits: [
      { rect: [-3, 3.5, 3, 4], to: 'f8', spawn: 'north' },
      { rect: [-1, -16, 1, -15.2], to: 'e1', spawn: 'south' },
    ],
  },
};

// ---------------------------------------------------------------------------
function snowPoff() {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 8), lit('#f4f8ff'));
  m.scale.y = 0.6;
  m.position.y = 0.2;
  g.add(m);
  return g;
}

function mailbox(color) {
  const g = new THREE.Group();
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1, 0.1), toon('#5a3a26'));
  post.position.y = 0.5;
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.55), toon(color));
  box.position.y = 1.1;
  g.add(post, box);
  outlineAll(g, 0.015);
  return g;
}

function shelfBottles() {
  const g = new THREE.Group();
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(3, 1.8, 0.3), toon('#4a2e1a'));
  shelf.position.y = 1.2;
  g.add(shelf);
  const cols = ['#6aff8a', '#ff8a4a', '#8ab8ff', '#ffe84a'];
  for (let i = 0; i < 8; i++) {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.3, 8), glow(cols[i % 4], 0.9));
    b.position.set(-1.2 + i * 0.34, 1.5 + (i % 2) * 0.5, 0.18);
    g.add(b);
  }
  return g;
}

function rocketBed() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 1.4, 6, 12), toon('#e84a3a'));
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.5;
  g.add(body);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.6, 12), toon('#f4f4f8'));
  nose.rotation.z = -Math.PI / 2;
  nose.position.set(1.3, 0.5, 0);
  g.add(nose);
  for (const s of [-1, 1]) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.4), toon('#4a8ac8'));
    fin.position.set(-0.9, 0.5, s * 0.55);
    g.add(fin);
  }
  outlineAll(g, 0.02);
  return g;
}

async function iceLever(w) {
  if (flag('iceDone')) return w.narrate('(The lever won\'t budge now.)');
  sfx.switch();
  setFlag('iceDone');
  w.room.props.get('lever').obj.userData.set(true);
  const s = w.room.props.get('spikes');
  s.obj.userData.set(false);
  w.room.setSolid('spikes', false);
  sfx.spikes();
  await w.narrate('(Clunk. Somewhere, spikes slide into the snow.)');
}

async function tuftTalk(w) {
  const n = S.flags.tuftTalk || 0;
  S.flags.tuftTalk = n + 1;
  const lines = [
    ['Yo! Are you a human? That\'s SO COOL!', 'Are you here to see Captain Maris too?! She\'s the COOLEST!', 'She beat up every guard in the Royal Guard. At the same time. With her eyes closed!'],
    ['I don\'t have wings that work yet. Mom says they\'ll grow in.', 'I practice flapping every day though. Watch!', '(Tuft flaps furiously. Nothing happens.)', 'See?! Almost!'],
  ];
  await w.say('tuft', lines[Math.min(n, 1)]);
}

async function cinderTalk(w) {
  await w.say('cinder', ['...', '(Cinder nods at you. The fire in their head crackles warmly.)']);
  await openShop(w, { name: 'CINDER\'S', keeper: 'cinder', greet: '* (Cinder slides a menu across the counter.)', items: [['chestnuts', 18], ['snow_bun', 16], ['leaf_tea', 8]], sell: false });
}

async function wickDinner(w) {
  setFlag('wickDinner');
  music.play('wick');
  await W(w, ['hey. pull up a stool.', 'cinder does the best roast chestnuts in the underground. want some?']);
  sfx.item();
  w.give('chestnuts');
  await w.narrate('(Wick slides you a bag of roast chestnuts.)');
  await W(w, ['so. what do you think of my brother?']);
  const c = await w.ask('wick', ['...'], ['He\'s cool', 'He\'s a lot']);
  if (c === 0) await W(w, ['yeah. he is. he\'s the coolest guy i know.']);
  else await W(w, ['heh. yeah. he\'s a lot. the good kind of a lot.']);
  await W(w, ['hey, lemme tell you a story.', 'there\'s a big purple door at the end of the hollows. nobody goes through it.', 'but sometimes i go stand on this side of it and tell jokes. knock knock jokes, mostly.', 'and one day, somebody on the other side knocked back.', 'she had the best laugh. we did it every day for years.']);
  if (flag('willowSpared')) {
    await W(w, ['one day she said: "if a human ever comes through this door... watch out for them. please."', 'i don\'t like making promises. but she\'s a good audience.', 'so. here i am. watching out for you.', '...don\'t let it go to your head, kid.']);
  } else if (flag('willowKilled')) {
    await W(w, ['she stopped knocking back a while ago.', '...', 'enjoy the chestnuts, kid.']);
  } else {
    await W(w, ['she asked me to look out for any human that came through. so i\'m looking.']);
  }
  const wk = w.npc('wick');
  if (wk) await leave(w, 'wick', [[0, 4.6]], 1.5);
  music.play('wick');
}

async function taperHangout(w) {
  music.play('hangout', { fade: 0.5 });
  await T(w, ['HUMAN! YOU CAME!', 'I, THE GREAT TAPER, HAVE PREPARED FOR THIS HANGOUT BY READING A BOOK ABOUT HANGOUTS.', 'STEP ONE: SAY SOMETHING NICE.', '...YOUR SHIRT IS VERY NICE. IT HAS STRIPES. I LOVE STRIPES.']);
  const c1 = await w.ask('taper', ['STEP TWO: ASK A QUESTION. WHAT IS YOUR FAVORITE FOOD?'], ['Pie', 'Toast']);
  if (c1 === 1) await T(w, ['TOAST?! MY SIGNATURE DISH?! YOU HAVE EXCELLENT TASTE!']);
  else await T(w, ['PIE! WELL, I CAN\'T MAKE PIE. BUT I CAN MAKE TOAST THAT IS SHAPED LIKE PIE!']);
  await T(w, ['STEP THREE: SHOW THEM YOUR ROOM.', 'THIS IS MY ROOM. THE BED IS A ROCKET. OBVIOUSLY.', 'ONE DAY I WILL FLY IT TO THE SURFACE AND SEE THE SUN.']);
  const c2 = await w.ask('taper', ['STEP FOUR: SHARE A SECRET. DO YOU HAVE ONE?'], ['There\'s someone in my SOUL', 'I can\'t cook']);
  if (c2 === 0) await T(w, ['...SOMEONE IN YOUR SOUL?', 'WOWIE. THAT MEANS YOU\'RE NEVER ALONE! THAT\'S THE BEST SECRET I\'VE EVER HEARD!', 'HELLO, SOMEONE IN THE HUMAN\'S SOUL! I AM TAPER! NICE TO MEET YOU!']);
  else await T(w, ['...THAT\'S OKAY! NEITHER CAN I! BUT I DO IT ANYWAY!']);
  await T(w, ['FINAL STEP: BECOME FRIENDS.', 'WELL. I THINK WE DID IT. WE ARE NOW OFFICIALLY FRIENDS!', 'HERE! MY PHONE NUMBER! CALL ME ANY TIME YOU NEED A FRIEND. OR A PUZZLE.']);
  sfx.item();
  setFlag('taperFriend');
  setFlag('taperNumber');
  await w.narrate('(Taper\'s number was added to your whisperleaf.)');
  await T(w, ['NYEH HEH HEH! NOW GO! I HAVE TO CLEAN UP. HANGOUTS ARE MESSY.']);
  music.play('taper');
}

export { maxHp };
