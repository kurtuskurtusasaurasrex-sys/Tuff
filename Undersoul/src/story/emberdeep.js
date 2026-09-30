// EMBERDEEP — the furnace of the Underground.
import * as THREE from 'three';
import { game } from '../core/game.js';
import { S, flag, setFlag, onGenocide, areaCleared } from '../core/save.js';
import { maxHp } from '../data/stats.js';
import { walkPath, leave, once } from './util.js';
import { sfx } from '../audio/sfx.js';
import { music } from '../audio/sequencer.js';
import { runBattle } from '../battle/battle.js';
import { openShop } from '../ui/shop.js';
import { SOULS, SOUL_ORDER } from '../data/souls.js';
import { toon, lit, glow, outlineAll } from '../gfx/materials.js';

const M = { theme: 'emberdeep', area: 'emberdeep', ambience: 'lava', step: 'metal' };
const ENC = { pool: [['kiln', 3], ['jetta', 2], ['kettle', 2]], pairs: 0.15 };
const empty = () => onGenocide() && areaCleared('emberdeep');
const geno = () => onGenocide();
const L = (w, p, o) => w.say('lotl', p, o);
const X = (w, p, o) => w.say('luxe', p, o);
const W = (w, p, o) => w.say('wick', p, o);

function labBuilding() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(8, 4.5, 4), lit('#d8dce8', { metalness: 0.3, roughness: 0.4 }));
  body.position.y = 2.25;
  g.add(body);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.6), glow('#8ad8ff', 0.6));
  door.position.set(0, 1.3, 2.01);
  g.add(door);
  const sign = new THREE.Mesh(new THREE.BoxGeometry(3, 0.6, 0.1), glow('#ff9ad0', 1.4));
  sign.position.set(0, 3.8, 2.05);
  g.add(sign);
  return g;
}

function desk() {
  const g = new THREE.Group();
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1), toon('#8a8e9a'));
  top.position.y = 0.8;
  g.add(top);
  for (const x of [-1.1, 1.1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 0.9), toon('#6a6e7a'));
    leg.position.set(x, 0.4, 0);
    g.add(leg);
  }
  const mon = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.08), glow('#6ad8ff', 1.1));
  mon.position.set(0, 1.35, -0.3);
  g.add(mon);
  outlineAll(g, 0.015);
  return g;
}

function stageLights() {
  const g = new THREE.Group();
  const cols = ['#ff5ad0', '#5ad8ff', '#ffe84a', '#8aff6a'];
  const lights = [];
  cols.forEach((c, i) => {
    const l = new THREE.SpotLight(c, 30, 20, 0.35, 0.5, 1.5);
    l.position.set(-6 + i * 4, 7, 2);
    l.target.position.set(-2 + i, 0, -3);
    g.add(l, l.target);
    lights.push(l);
  });
  g.userData.update = (dt, t) => lights.forEach((l, i) => { l.target.position.x = Math.sin(t * 1.2 + i) * 5; });
  return g;
}

function web(size = 3) {
  const g = new THREE.Group();
  const m = new THREE.LineBasicMaterial({ color: '#d8c8ff', transparent: true, opacity: 0.6 });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * size, Math.sin(a) * size, 0)]);
    g.add(new THREE.Line(geo, m));
  }
  for (let r = 0.5; r < size; r += 0.6) {
    const pts = [];
    for (let i = 0; i <= 8; i++) { const a = (i / 8) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0)); }
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), m));
  }
  g.position.y = 2;
  return g;
}

// Vents: step on one and you're flung across the lava.
const VENTS = {
  m3: [[0, -3, 0, -9], [0, -11, 0, -17], [3, -19, 3, -25]],
};

async function launch(w, [x0, z0, x1, z1]) {
  const p = w.player;
  sfx.whoosh();
  await game.tween(0.7, (k) => {
    p.x = x0 + (x1 - x0) * k;
    p.z = z0 + (z1 - z0) * k;
    p.y = Math.sin(k * Math.PI) * 2.2;
    p.sync();
  });
  p.y = 0;
  p.sync();
  sfx.land();
}

export const EMBERDEEP = {
  m1: {
    ...M, id: 'm1', name: 'Emberdeep - Gate', music: () => (empty() ? null : 'emberdeep'),
    floor: [[-3, -4, 3, 6], [-2, -16, 2, -4], [-8, -22, 8, -16], [-1, -26, 1, -22]],
    props: [
      { t: 'custom', x: 0, z: -24.5, build: labBuilding, solid: null },
      { t: 'pipe', x: -5, z: -17, len: 5, r: 0.3 },
      { t: 'save', x: 6, z: -18, line: () => (empty() ? '(Determination.)' : '(The heat of Emberdeep fills you with DETERMINATION.)') },
    ],
    spawns: { default: [0, 5, 'up'], south: [0, 5, 'up'], north: [0, -20.5, 'down'], lab: [0, -21, 'down'] },
    exits: [
      { rect: [-3, 5.5, 3, 6], to: 'e8', spawn: 'north' },
      { rect: [-1, -22.4, 1, -22], to: 'm2', spawn: 'door' },
    ],
    encounters: { ...ENC, rate: 0.5 },
  },

  m2: {
    id: 'm2', name: 'Dr. Lotl\'s Lab', theme: 'lab', area: 'emberdeep', ambience: 'hum', step: 'metal',
    music: () => (empty() ? null : 'lab'),
    floor: [[-8, -6, 8, 5], [-1, 5, 1, 7], [6, -10, 8, -6]],
    particles: null,
    props: [
      { t: 'custom', x: -3, z: -5, build: desk, solid: [2.5, 1.1], text: () => ['(Dr. Lotl\'s desk. The monitor shows camera feeds...)', '(...all of them pointed at places you\'ve been.)'] },
      { t: 'tv', x: 2, z: -5.4, solid: [1.3, 0.6], text: '(A TV playing a show called "LUXE: LIVE!". The laugh track is very enthusiastic.)' },
      { t: 'bookshelf', x: -6.5, z: -5.6, color: '#8a8e9a', text: ['(Science books. Also a lot of comics about space princesses.)'] },
      { t: 'crate', x: 5.5, z: 3, s: 0.8, color: '#8a8e9a' },
      { t: 'custom', x: 7, z: -9.5, build: () => elevator(), solid: null },
    ],
    lights: [{ x: 0, z: 0, y: 3, color: '#e0f0ff', i: 4, d: 12 }],
    npcs: [{ id: 'lotl', model: 'lotl', x: -3, z: -3.6, face: 'down', when: () => flag('lotlMet') && !empty(), talk: lotlTalk }],
    spawns: { default: [0, 6, 'up'], door: [0, 6, 'up'], lift: [7, -7.4, 'down'] },
    exits: [
      { rect: [-1, 6.4, 1, 7], to: 'm1', spawn: 'lab' },
      { rect: [-8, -6, -7.4, 5], to: 'm3', spawn: 'west', when: () => flag('quizDone') || geno() },
      { rect: [6, -10, 8, -9.4], to: 'd1', spawn: 'lift', when: () => flag('deepKey'), blocked: (w) => w.narrate('(An elevator. The panel says "AUTHORIZED STAFF ONLY".)') },
    ],
    async enter(w) {
      if (!once('lotlMet')) return;
      if (geno()) {
        await w.narrate(['(The lab is empty. The monitors are on.)', '(One of them shows you. Right now. From behind.)']);
        return;
      }
      const lo = w.addNpc({ id: 'lotl2', model: 'lotl', x: -3, z: -3.6, face: 'up' });
      await game.wait(0.5);
      lo.face('down');
      lo.model.userData.setExpr('nervous');
      await L(w, ['o-oh! oh no, you\'re here already! i didn\'t, um, clean!', 'h-hi! i\'m dr. lotl! the royal scientist!', 'i\'ve been, uh... watching you. on the cameras. for, um, research. not in a weird way.', 'you were really cool against maris! i mean. not that i was rooting against her. she\'s great. she\'s so great.']);
      await w.echo('lab');
      w.removeNpc('lotl2');
      w.addNpc({ id: 'lotl', model: 'lotl', x: -3, z: -3.6, face: 'down', talk: lotlTalk });
      // LUXE crashes in
      sfx.explosion();
      w.shake(0.4, 0.6);
      game.flash(0.8);
      music.play('luxe', { fade: 0.2 });
      const lx = w.addNpc({ id: 'luxe', model: 'luxe', x: 4, z: -1, face: 'left' });
      await X(w, ['OHHHH YES!', 'WELCOME, BEAUTIES AND GENTLEBEASTS, TO...', 'THE QUIZ SHOW!!!', 'Our lucky contestant: a HUMAN! How delightfully DRAMATIC!', 'Answer correctly and you may proceed! Answer wrong and... well. You\'ll see!']);
      await quiz(w);
      await X(w, ['OOOH, a flawless performance, darling! The ratings are THROUGH THE ROOF!', 'But the show must go on! Toodles!']);
      await leave(w, 'luxe', [[9, -1]], 5);
      music.play('lab');
      await L(w, ['s-sorry about him. he\'s... a robot i built. he was supposed to be for protecting people.', 'he decided to be a celebrity instead.', 'um! here! my phone number! if you need help, i can guide you through emberdeep. with the cameras.']);
      setFlag('lotlNumber');
      setFlag('quizDone');
      sfx.item();
      await w.narrate('(Dr. Lotl\'s number was added to your whisperleaf.)');
      if (flag('marisFriend')) await L(w, ['a-also... maris said hi? she said HI? to ME? oh gosh.']);
    },
  },

  m3: {
    ...M, id: 'm3', name: 'Emberdeep - Steam Vents', edge: 'platform',
    floor: [[-3, -3, 3, 4], [-2, -11, 2, -9], [-2, -19, 2, -17], [0, -30, 6, -25], [-8, 0, -3, 2]],
    props: [
      { t: 'vent', x: 0, z: -2.4, solid: null },
      { t: 'vent', x: 0, z: -10.4, solid: null },
      { t: 'vent', x: 0.8, z: -18.4, ry: -0.5, solid: null },
      { t: 'sign', x: -2, z: 2.5, text: '"STEAM VENTS. Step on one and it will throw you where the arrow points. Try not to scream."' },
      { t: 'pipe', x: 3, z: -28, len: 4 },
    ],
    spawns: { default: [-6, 1, 'right'], west: [-6, 1, 'right'], north: [3, -27, 'down'] },
    exits: [
      { rect: [-8, 0, -7.4, 2], to: 'm2', spawn: 'default' },
      { rect: [0, -30, 6, -29.4], to: 'm4', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.5 },
    update(w) {
      if (w.locked) return;
      const p = w.player;
      const vents = [[0, -2.4, 0], [0, -10.4, 1], [0.8, -18.4, 2]];
      for (const [x, z, i] of vents) {
        if (Math.hypot(p.x - x, p.z - z) < 0.45) {
          const [x0, z0, x1, z1] = VENTS.m3[i];
          w.run(() => launch(w, [x, z, i === 2 ? 3 : x1, z1]));
          void x0; void z0;
          return;
        }
      }
    },
  },

  m4: {
    ...M, id: 'm4', name: 'Emberdeep - Laser Walk',
    floor: [[-2.5, -30, 2.5, 4], [-1, 4, 1, 7]],
    props: [
      { t: 'laser', id: 'l1', x: 0, z: -6, len: 5, color: '#ff9a1f', solid: null },
      { t: 'laser', id: 'l2', x: 0, z: -13, len: 5, color: '#46e6ff', solid: null },
      { t: 'laser', id: 'l3', x: 0, z: -20, len: 5, color: '#ff9a1f', solid: null },
      { t: 'sign', x: -1.8, z: 2, text: ['"SECURITY LASERS. They blink off every few seconds."', '"If you get zapped, that is between you and the laser."'] },
    ],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -28.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'm3', spawn: 'north' },
      { rect: [-2.5, -30, 2.5, -29.4], to: 'm5', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.4 },
    update(w, dt) {
      const t = w.t;
      const lasers = [['l1', -6, 0], ['l2', -13, 1.1], ['l3', -20, 2.2]];
      for (const [id, z, off] of lasers) {
        const on = ((t + off) % 3.2) < 2.1;
        const pr = w.room.props.get(id);
        if (!pr) continue;
        pr.obj.userData.beams.forEach((b) => { b.visible = on; });
        if (on && !w.locked && Math.abs(w.player.z - z) < 0.35 && !w.zapT) {
          w.zapT = 1;
          w.run(async () => {
            sfx.hurt();
            w.shake(0.2, 0.3);
            S.hp = Math.max(1, S.hp - 3);
            w.player.setPos(w.player.x, z + 1.3);
            await w.narrate('(Zap! You lost 3 HP.)');
          });
        }
      }
      if (w.zapT) w.zapT = Math.max(0, w.zapT - dt);
    },
  },

  m5: {
    ...M, id: 'm5', name: 'Emberdeep - Spider Parlor', theme: 'lab', music: () => (flag('silkDone') || empty() ? null : 'silk'),
    floor: [[-6, -12, 6, 4], [-1, 4, 1, 7], [-1, -16, 1, -12]],
    fogDensity: 0.05,
    props: [
      { t: 'custom', x: -5, z: -12, build: () => web(3), solid: null },
      { t: 'custom', x: 5, z: -12, build: () => web(2.5), solid: null },
      { t: 'table', x: 0, z: -8, w: 1.6, d: 1, color: '#5a2a7a' },
      { t: 'candle', x: 0, z: -8, y: 0.83, h: 0.3, solid: null },
    ],
    lights: [{ x: 0, z: -6, y: 3, color: '#c070ff', i: 5, d: 10 }],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -14.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'm4', spawn: 'north' },
      { rect: [-1, -16, 1, -15.2], to: 'm6', spawn: 'south', when: () => flag('silkDone') },
    ],
    triggers: [{
      rect: [-6, -5, 6, -3], when: () => !flag('silkDone'),
      async run(w) {
        w.addNpc({ id: 'silk', model: 'silk', x: 0, z: -9.4, face: 'down' });
        if (flag('silkCustomer') && !geno()) {
          await w.say('silk', ['Ahuhuhu~ Well, if it isn\'t my little customer from the Hollows!', 'Someone paid me a great deal of gold to catch you, dearie.', 'But a paying customer is a friend of the spiders. Run along now.']);
          setFlag('silkDone');
          setFlag('silkSpared');
          w.removeNpc('silk');
          return;
        }
        await w.say('silk', ['Ahuhuhu~ Welcome to my parlor, dearie.', 'I heard a human would be passing through. Someone offered me a GREAT deal of gold for your SOUL.', 'And spiders do love a good deal~']);
        const r = await runBattle({ enemies: ['silk'], stage: 'emberdeep' }, w);
        if (r.outcome === 'dead') return;
        setFlag('silkDone');
        if (r.outcome === 'spared' || r.outcome === 'won') {
          await w.say('silk', ['Oh my! It seems I was wrong about you, dearie.', 'The one who paid me said humans were cruel and heartless.', '...A little flower told me that. How odd.']);
        }
        w.removeNpc('silk');
      },
    }],
  },

  m6: {
    id: 'm6', name: 'Emberdeep - The Resort', theme: 'lab', area: 'emberdeep', ambience: 'hum', step: 'stone',
    music: () => (empty() ? null : 'shop'),
    floor: [[-10, -8, 10, 6], [-1, 6, 1, 9], [-1, -12, 1, -8], [8, -6, 12, -2]],
    cam: { clampZ: [-5, 3] },
    floorMat: () => lit('#e8c0a0', { roughness: 0.4 }),
    particles: null,
    props: [
      { t: 'statue', x: 0, z: -2, color: '#e8c060', text: '(A golden statue of LUXE, striking a pose. The plaque says "DON\'T TOUCH". You didn\'t.)' },
      { t: 'counter', x: -6, z: -6.5, w: 3.4, color: '#8a3a4a', solid: [3.6, 1] },
      { t: 'save', x: 7, z: 3, line: () => (empty() ? '(Determination.)' : '(The hum of the resort fills you with DETERMINATION.)') },
      { t: 'armchair', x: 6, z: -6, color: '#8a3a4a' },
      { t: 'armchair', x: -7.5, z: 2.5, color: '#8a3a4a', ry: Math.PI / 2 },
      { t: 'lamp', x: 9, z: -7, color: '#ffd8a0' }, { t: 'lamp', x: -9, z: 5, color: '#ffd8a0' },
    ],
    lights: [{ x: 0, z: 0, y: 3, color: '#ffe0c0', i: 5, d: 14 }],
    npcs: [
      {
        id: 'clerk', model: 'villager:cat:#e0a0ff:#2a2a33', x: -6, z: -7.3, face: 'down', reach: 2.4, when: () => !empty(),
        talk: async (w) => {
          await w.say({ name: 'CLERK', voice: 'high', color: '#e0a0ff' }, ['Welcome to the Emberdeep Resort! Proudly owned by LUXE!', 'The rooms are 2000G a night. The shop is... cheaper.']);
          await openShop(w, { name: 'RESORT SHOP', keeper: 'monster', items: [['hot_snack', 25], ['hero_bar', 40], ['star_steak', 60], ['frying_pan', 120], ['apron', 110]] });
        },
      },
      { id: 'wick', model: 'wick', x: 3, z: 1, face: 'left', when: () => !empty() && !flag('resortDinner') && !flag('taperKilled'), talk: resortDinner },
      { id: 'guest1', model: 'villager:bear:#8a6a4a:#4a4a8a', x: -4, z: 3, face: 'right', lookAtPlayer: true, when: () => !empty(), talk: async (w) => w.say({ name: 'GUEST', voice: 'low', color: '#ddd' }, ['They say LUXE was built to protect us.', 'Instead he protects us from boredom. I\'ll allow it.']) },
      { id: 'guards', model: 'guards', x: 0, z: -9.6, face: 'down', when: () => !flag('guardsDone'), talk: guardsFight },
    ],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -10.5, 'down'] },
    exits: [
      { rect: [-1, 8.2, 1, 9], to: 'm5', spawn: 'north' },
      { rect: [-1, -12, 1, -11.2], to: 'm7', spawn: 'south', when: () => flag('guardsDone'), blocked: (w) => w.narrate('(Two guards block the way to the Core.)') },
    ],
  },

  m7: {
    ...M, id: 'm7', name: 'The Core', theme: 'lab', ambience: 'hum', music: () => (empty() ? null : 'core'),
    floor: [[-2, -26, 2, 4], [-1, 4, 1, 7]],
    bg: '#040410', fog: '#08081a', fogDensity: 0.04,
    floorMat: () => lit('#20203a', { metalness: 0.6, roughness: 0.3, emissive: '#1a1a4a', emissiveIntensity: 0.4 }),
    particles: 'spores',
    props: Array.from({ length: 6 }, (_, i) => ({ t: 'lamp', x: i % 2 ? 1.8 : -1.8, z: -2 - i * 4, color: i % 2 ? '#ff5ad0' : '#5ad8ff', h: 1.6, solid: 0.2 })),
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -24.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'm6', spawn: 'north' },
      { rect: [-2, -26, 2, -25.4], to: 'm8', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.6 },
  },

  m8: {
    id: 'm8', name: 'LUXE\'s Stage', theme: 'lab', area: 'emberdeep', ambience: null, step: 'wood', music: null,
    floor: [[-8, -8, 8, 5], [-1, 5, 1, 8], [-1, -12, 1, -8]],
    bg: '#08000a', fog: '#120418', fogDensity: 0.03,
    floorMat: () => lit('#2a1a2a', { roughness: 0.3, metalness: 0.4 }),
    props: [{ t: 'custom', x: 0, z: 0, build: stageLights, solid: null }],
    particles: 'gold',
    spawns: { default: [0, 6.5, 'up'], south: [0, 6.5, 'up'], north: [0, -10.5, 'down'] },
    exits: [
      { rect: [-1, 7.2, 1, 8], to: 'm7', spawn: 'north' },
      { rect: [-1, -12, 1, -11.2], to: 'c1', spawn: 'south', when: () => flag('luxeDone') },
    ],
    triggers: [{
      rect: [-8, -2, 8, 1], when: () => !flag('luxeDone'),
      async run(w) {
        music.play('luxe');
        const lx = w.addNpc({ id: 'luxe', model: 'luxe_nova', x: 0, z: -5, face: 'down' });
        if (geno()) {
          await X(w, ['Darling. I\'ve seen the footage.', 'The whole Underground has. Every monster who ran from you is watching this broadcast right now.', 'So let\'s give them something to believe in. One last show!']);
        } else {
          await X(w, ['OH YES! Welcome, darling, to the GRAND FINALE!', 'Dr. Lotl built me to protect monsters from humans.', 'But you know what the Underground needs even more? A STAR!', 'Every monster in the Underground is watching. Let\'s give them the show of their LIVES!']);
        }
        void lx;
        const r = await runBattle({ enemies: ['luxe'], stage: 'emberdeep' }, w);
        if (r.outcome === 'dead') return;
        setFlag('luxeDone');
        if (flag('luxeKilled')) {
          w.removeNpc('luxe');
          await w.narrate('(The spotlights go dark, one by one.)');
          return;
        }
        await X(w, ['Darling... do you know what the audience just said?', 'They said they\'d miss me if I left for the surface.', 'All this time, I thought I needed to be the biggest star in the world.', 'Turns out I just needed someone watching who cared.', 'Go on. The capital is just ahead. Break a leg, darling.']);
        await leave(w, 'luxe', [[9, -5]], 4);
        if (!geno() && flag('taperFriend') && flag('marisFriend') && S.totalKills === 0) {
          sfx.phone();
          await game.wait(0.8);
          await L(w, ['h-hi! it\'s dr. lotl!', 'i, um. i have something i need to show you. back at the lab.', 'it\'s important. please come before you go to the capital.']);
          setFlag('lotlCalled');
        }
      },
    }],
  },
};

// ---------------------------------------------------------------------------
function elevator() {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3, 0.3), lit('#8a8e9a', { metalness: 0.6 }));
  frame.position.y = 1.5;
  g.add(frame);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.4), lit('#5a5e6a', { metalness: 0.7, roughness: 0.3 }));
  door.position.set(0, 1.2, 0.16);
  g.add(door);
  const light = new THREE.Mesh(new THREE.CircleGeometry(0.1, 10), glow('#ff4a4a', 2));
  light.position.set(0.9, 2.6, 0.16);
  g.add(light);
  return g;
}

async function quiz(w) {
  const mine = SOULS[S.soul].trait;
  const others = SOUL_ORDER.filter((s) => s !== S.soul).slice(0, 3).map((s) => SOULS[s].trait);
  const qs = [
    { q: 'QUESTION ONE! What is the name of the caretaker of the Hollows?', a: ['Willow', 'Hazel', 'Rowan', 'Ashwyn'], right: 0 },
    { q: 'QUESTION TWO! How many human SOULs does the King need to break the Barrier?', a: ['Six', 'Eight', 'Seven', 'One'], right: 2 },
    { q: 'QUESTION THREE! What is Wick made of?', a: ['Bone', 'Wax', 'Hope', 'Cheese'], right: 1 },
    { q: 'FINAL QUESTION! Which SOUL is beating inside YOU right now?', a: [others[0], mine, others[1], others[2]], right: 1 },
  ];
  const lo = w.npc('lotl');
  for (const q of qs) {
    lo?.emote(['1', '2', '3', '4'][q.right], 1.5);
    const c = await w.ask('luxe', [q.q], q.a);
    if (c === q.right) {
      sfx.correct();
      await X(w, [['CORRECT!', 'RIGHT AGAIN, darling!', 'YES! The crowd goes WILD!'][Math.floor(Math.random() * 3)]]);
    } else {
      sfx.wrong();
      sfx.hurt();
      S.hp = Math.max(1, S.hp - 2);
      await X(w, ['WRONG! Oooh, that\'s a zap!', '...But I\'ll allow it. For the drama.']);
    }
  }
}

async function lotlTalk(w) {
  if (flag('lotlCalled') && !flag('lotlFriend')) return lotlHangout(w);
  if (flag('lotlFriend')) return L(w, ['th-the elevator\'s open for you. the deep lab.', 'i\'m sorry for what\'s down there. i\'m so sorry.']);
  return L(w, ['oh! um, the lasers ahead blink off every few seconds! just wait for them!', 'and the vents... just, uh, trust the vents.']);
}

async function lotlHangout(w) {
  music.play('hangout');
  const lo = w.npc('lotl');
  lo?.model.userData.setExpr('nervous');
  await L(w, ['y-you came! okay. okay. breathe, lotl.', 'i\'ve never really had a friend over before. maris said i should just be honest.', 'so. honesty. here goes.']);
  await L(w, ['a long time ago, the king asked me to find a way to break the barrier. with or without human SOULs.', 'i found a strange power in human SOULs. i called it DETERMINATION.', 'i tried putting it into things. into... a flower. a golden flower from the king\'s garden.', 'it woke up.', 'and then i tried it on monsters who had fallen down. who were about to turn to dust.', 'they didn\'t turn to dust. but they didn\'t stay themselves, either.']);
  await L(w, ['they\'re still down there. in the deep lab. i\'ve been too scared to tell anyone.', 'but you... you never hurt anybody. not once. i think you can help them.', 'here. the key to the deep lab. please.']);
  sfx.item();
  setFlag('lotlFriend');
  setFlag('deepKey');
  await w.narrate('(You got the Deep Lab key.)');
  music.play('lab');
}

async function resortDinner(w) {
  setFlag('resortDinner');
  music.play('wick');
  await W(w, ['hey. you look like you could use a break.', 'let\'s grab dinner. my treat. i know a place with great food and terrible music.']);
  await game.fadeOut(0.6);
  await game.wait(0.6);
  await game.fadeIn(0.6);
  await W(w, ['so. you\'ve come a long way, kid.', 'let me ask you a weird question.', 'you ever get the feeling you\'ve been somewhere before? like you\'ve seen all of this, just a little different?']);
  const c = await w.ask('wick', ['...'], ['Yes', 'No']);
  if (c === 0) await W(w, ['yeah. me too. all the time.']);
  else await W(w, ['huh. lucky.']);
  await W(w, [`that light in your chest. ${SOULS[S.soul].trait.toLowerCase()}.`, 'i\'ve seen that color before. on a kid who came through here a long, long time ago.', 'they never made it to the end.', 'i don\'t know how you\'re carrying them. but they\'re in there. i can tell. they\'re watching.']);
  if (S.totalKills > 0) {
    await W(w, ['and they\'re seeing everything you do, kid. everything.', 'think about that next time you swing that thing.']);
  } else {
    await W(w, ['and i bet they\'re real proud of you right now.', 'you haven\'t hurt anybody. not one monster. that\'s... rare.']);
  }
  await W(w, ['anyway. the capital\'s past the core. the king\'s waiting.', 'whatever happens up there... i\'ll see you in the hall.']);
  const wk = w.npc('wick');
  if (wk) { wk.visible = false; w.removeNpc('wick'); }
  music.play('shop');
}

async function guardsFight(w) {
  await w.say({ name: 'BOLT', voice: 'low', color: '#aaa' }, ['Halt! You\'re the human!']);
  await w.say({ name: 'NUT', voice: 'monster', color: '#ddd' }, ['By order of the Royal Guard... we have to stop you.']);
  const r = await w.encounter(['guards']);
  if (r.outcome === 'dead') return;
  setFlag('guardsDone');
  w.removeNpc('guards');
}

export { maxHp, web };
