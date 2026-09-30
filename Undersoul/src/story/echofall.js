// ECHOFALL — where the water remembers.
import * as THREE from 'three';
import { game } from '../core/game.js';
import { S, flag, setFlag, onGenocide, areaCleared } from '../core/save.js';
import { walkPath, leave, once } from './util.js';
import { sfx } from '../audio/sfx.js';
import { music } from '../audio/sequencer.js';
import { runBattle } from '../battle/battle.js';
import { openShop } from '../ui/shop.js';
import { toon, lit, glow, outlineAll } from '../gfx/materials.js';

const E = { theme: 'echofall', area: 'echofall', ambience: 'water', step: 'water' };
const ENC = { pool: [['flexel', 2], ['scrubble', 2], ['gloop', 3], ['melodie', 2]], pairs: 0.2 };
const empty = () => onGenocide() && areaCleared('echofall');
const geno = () => onGenocide();
const M = (w, p, o) => w.say('maris', p, o);

// Echo flowers remember the last thing said near them.
const flowerLine = (lines) => async (w) => {
  sfx.echoFlower();
  await w.say({ name: 'ECHO FLOWER', voice: 'echo', color: '#5ad0ff' }, lines);
};

function statue() {
  const g = new THREE.Group();
  const m = lit('#6a7a9a', { roughness: 0.9 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.2), m);
  base.position.y = 0.3;
  g.add(base);
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 0.8, 6, 12), m);
  body.position.y = 1.3;
  g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), m);
  head.position.y = 2.1;
  g.add(head);
  for (const s of [-1, 1]) {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.35, 6), m);
    horn.position.set(s * 0.16, 2.4, 0);
    horn.rotation.z = -s * 0.4;
    g.add(horn);
  }
  const umb = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.35, 10), toon('#e84a6a'));
  umb.position.y = 2.75;
  umb.visible = false;
  g.add(umb);
  g.userData.umbrella = umb;
  return g;
}

function bridgeSeed() {
  const g = new THREE.Group();
  const bud = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), lit('#5ad8a0', { emissive: '#2aa870', emissiveIntensity: 0.6 }));
  bud.position.y = 0.28;
  bud.scale.y = 0.8;
  g.add(bud);
  outlineAll(g, 0.015);
  return g;
}

function lilypad() {
  const g = new THREE.Group();
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.06, 16), lit('#3aa86a'));
  pad.position.y = -0.05;
  g.add(pad);
  const bloom = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), glow('#9affd0', 1.2));
  bloom.position.set(0.2, 0.05, 0.1);
  g.add(bloom);
  return g;
}

function tallGrass(w = 4, d = 2) {
  const g = new THREE.Group();
  const geo = new THREE.ConeGeometry(0.06, 1.3, 4);
  const n = Math.floor(w * d * 12);
  const im = new THREE.InstancedMesh(geo, toon('#2a6a8a'), n);
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    m.makeRotationZ((Math.random() - 0.5) * 0.3);
    m.setPosition((Math.random() - 0.5) * w, 0.6, (Math.random() - 0.5) * d);
    im.setMatrixAt(i, m);
  }
  g.add(im);
  return g;
}

function house(color) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2, 2.6, 12), lit(color, { roughness: 0.8 }));
  body.position.y = 1.3;
  g.add(body);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(2.2, 1.6, 12), lit('#2a3a6a'));
  roof.position.y = 3.4;
  g.add(roof);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.6), new THREE.MeshBasicMaterial({ color: '#0a0a18' }));
  door.position.set(0, 0.8, 1.92);
  g.add(door);
  const win = new THREE.Mesh(new THREE.CircleGeometry(0.3, 12), glow('#8ad8ff', 1.2));
  win.position.set(1, 1.8, 1.72);
  win.rotation.y = 0.5;
  g.add(win);
  return g;
}

export const ECHOFALL = {
  e1: {
    ...E, id: 'e1', name: 'Echofall - Glowing Marsh', music: () => (empty() ? null : 'echofall'),
    floor: [[-3, -4, 3, 6], [-2, -22, 2, -4], [-6, -26, 6, -22], [-1, -30, 1, -26]],
    props: [
      { t: 'mushroom', x: -2.5, z: 3, s: 0.7 }, { t: 'mushroom', x: 2.4, z: -8, s: 0.5, color: '#9a7aff' },
      { t: 'echoflower', x: 1.5, z: 1.5, run: flowerLine(['...is anybody out there?']) },
      { t: 'echoflower', x: -1.4, z: -14, run: flowerLine(['The captain said to keep an eye out for a human wearing stripes.']) },
      { t: 'save', x: 4.5, z: -24, line: () => (empty() ? '(Only the water speaks now.)' : '(The sound of rushing water fills you with DETERMINATION.)') },
      { t: 'waterfall', x: -5, z: -26.2, w: 2, h: 6 },
      { t: 'crystal', x: 5.3, z: -25.5, s: 1 },
    ],
    spawns: { default: [0, 5, 'up'], south: [0, 5, 'up'], north: [0, -28.5, 'down'] },
    exits: [
      { rect: [-3, 5.5, 3, 6], to: 'f9', spawn: 'north' },
      { rect: [-1, -30, 1, -29.2], to: 'e2', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.6 },
    async enter(w) {
      if (!once('echofallArrive')) return;
      if (geno()) return;
      sfx.phone();
      await game.wait(0.8);
      await w.narrate('(Your whisperleaf is ringing.)');
      if (flag('taperFriend')) {
        await w.say('taper', ['HELLO! THIS IS TAPER!', 'I TOLD THE CAPTAIN ALL ABOUT YOU! SHE SEEMED... VERY INTERESTED.', 'SHE GRABBED HER SPEAR AND LEFT IN A HURRY. PROBABLY TO THROW YOU A PARTY!']);
      } else {
        await w.narrate(['(No one speaks. Just water sounds.)', '(Then a click.)']);
      }
    },
    triggers: [{
      rect: [-2, -18, 2, -16], once: 'marisSpot', when: () => !empty(),
      async run(w) {
        const m = w.addNpc({ id: 'maris', model: 'maris', x: 4, z: -24.5, face: 'left' });
        music.play('maris', { fade: 0.3 });
        await w.camShot([2, 5, -14], [3, 1.4, -24], 1.2);
        await game.wait(0.8);
        m.face('down');
        await game.wait(0.6);
        const spear = m.model.userData.spear;
        spear.visible = true;
        sfx.spearAppear();
        await game.wait(0.8);
        await m.walkTo(6.5, -24.5, 2.5);
        w.removeNpc('maris');
        w.camFollow();
        await w.echo('maris');
        music.play('echofall', { fade: 1.5 });
      },
    }],
  },

  e2: {
    ...E, id: 'e2', name: 'Echofall - Bloom Bridge',
    edge: 'platform',
    floor: [[-6, -2, 6, 6], [-1, 6, 1, 9], [-6, -16, 6, -10], [-1, -20, 1, -16]],
    props: [
      { t: 'custom', id: 'seed', x: -4, z: 2, build: bridgeSeed, solid: 0.3, run: takeSeed, promptY: 0.8 },
      { t: 'sign', x: 3.5, z: 0, text: ['"BLOOMSEEDS: set one down by the water and it will grow."', '"Please don\'t eat them. We have had incidents."'] },
      { t: 'echoflower', x: 4, z: -13, run: flowerLine(['I wish the ceiling were the sky.']) },
      { t: 'mushroom', x: -4.5, z: -14, s: 0.6 },
    ],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -18.5, 'down'] },
    exits: [
      { rect: [-1, 8.2, 1, 9], to: 'e1', spawn: 'north' },
      { rect: [-1, -20, 1, -19.2], to: 'e3', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.5 },
    async enter(w) {
      if (flag('bridgeGrown')) growBridge(w, true);
    },
    triggers: [{
      rect: [-2, -2, 2, -1], when: () => !flag('bridgeGrown'),
      async run(w) {
        if (!flag('hasSeed')) { await w.narrate('(The water is too wide to cross.)'); w.player.setPos(w.player.x, -0.6); return; }
        await w.narrate('(You set the bloomseed down at the water\'s edge.)');
        sfx.magic();
        setFlag('bridgeGrown');
        await growBridge(w, false);
      },
    }],
  },

  e3: {
    ...E, id: 'e3', name: 'Echofall - Wishing Room', music: () => (empty() ? null : 'wishing'), stars: true, particles: null,
    floor: [[-2, -4, 2, 6], [-8, -18, 8, -4], [-1, -22, 1, -18]],
    fogDensity: 0.02,
    props: [
      { t: 'crystal', x: -7, z: -17, s: 1.4 }, { t: 'crystal', x: 7, z: -16, s: 1.2, color: '#9a7aff' },
      { t: 'sign', x: 0, z: -6, text: ['(An old plaque.)', '"Long ago, monsters would come here to wish on the crystals above."', '"They say they looked a little like stars."'] },
      { t: 'custom', x: 4.5, z: -9, build: () => tallGrass(3, 2), solid: null },
    ],
    spawns: { default: [0, 5, 'up'], south: [0, 5, 'up'], north: [0, -20.5, 'down'] },
    exits: [
      { rect: [-2, 5.5, 2, 6], to: 'e2', spawn: 'north' },
      { rect: [-1, -22, 1, -21.2], to: 'e4', spawn: 'south' },
    ],
    triggers: [{
      rect: [-8, -12, 8, -9], once: 'wished',
      async run(w) {
        await w.camShot([0, 2, -8], [0, 11, -16], 2);
        await game.wait(1);
        await w.echo('wishing');
        w.camFollow();
      },
    }],
  },

  e4: {
    ...E, id: 'e4', name: 'Echofall - Tall Grass',
    floor: [[-2, -34, 2, 4], [-1, 4, 1, 7]],
    props: [
      { t: 'custom', x: 0, z: -8, build: () => tallGrass(4, 3), solid: null },
      { t: 'custom', x: 0, z: -22, build: () => tallGrass(4, 3), solid: null },
      { t: 'mushroom', x: -1.5, z: -15, s: 0.5 },
    ],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -32.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'e3', spawn: 'north' },
      { rect: [-2, -34, 2, -33.4], to: 'e5', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.5, when: () => flag('grassChase') },
    triggers: [{
      rect: [-2, -10, 2, -7], once: 'grassChase', when: () => !empty(),
      async run(w) {
        music.play('maris', { fade: 0.3 });
        const m = w.addNpc({ id: 'maris', model: 'maris', x: 0, z: -3.5, face: 'up' });
        w.player.face('down');
        await w.narrate('(You hide in the tall grass.)');
        await m.walkTo(0, -6, 1.4);
        await game.wait(1);
        sfx.spearAppear();
        await w.narrate('(Something reaches into the grass...)');
        await game.wait(0.8);
        await w.narrate('(...and pulls out Tuft.)');
        const t = w.addNpc({ id: 'tuft', model: 'tuft', x: -0.6, z: -7, face: 'down' });
        if (!geno()) {
          await w.say('tuft', ['CAPTAIN MARIS!! Was that you?! You\'re SO COOL!', 'Did you see the human?! Can I help?! I\'m really good at helping!']);
          await game.wait(0.5);
          await leave(w, 'maris', [[0, 4]], 2);
          await w.say('tuft', ['Yo... she touched my head.', 'I\'m never washing it again.']);
          await leave(w, 'tuft', [[0, -33]], 3);
        } else {
          w.removeNpc('tuft');
          await leave(w, 'maris', [[0, 4]], 2);
        }
        music.play('echofall', { fade: 1.5 });
      },
    }],
  },

  e5: {
    ...E, id: 'e5', name: 'Echofall - Quiet Village',
    floor: [[-10, -10, 10, 6], [-1, 6, 1, 9], [-1, -14, 1, -10]],
    cam: { clampZ: [-6, 3] },
    props: [
      { t: 'custom', x: -6, z: -12.4, build: () => house('#4a6aa8'), solid: null },
      { t: 'custom', x: 6, z: -12.4, build: () => house('#6a4aa8'), solid: null },
      { t: 'save', x: 0, z: 2, line: () => (empty() ? '(Determination.)' : '(A quiet village hums with the water. It fills you with DETERMINATION.)') },
      { t: 'custom', id: 'statue', x: -7, z: -2, build: statue, solid: [1.3, 1.3], run: statueUmbrella, promptY: 1.4 },
      { t: 'echoflower', x: 7, z: 2, run: flowerLine(['Do you think the King will ever let us see the sky?']) },
      { t: 'mushroom', x: 8, z: -6, s: 0.8 },
      { t: 'counter', x: 3.5, z: -6, w: 3, color: '#3a5a8a', solid: [3.2, 1] },
    ],
    npcs: [
      {
        id: 'shopfish', model: 'villager:fire', x: 3.5, z: -7, face: 'down', reach: 2.4, when: () => !empty(),
        talk: async (w) => {
          await w.say({ name: 'EMBERLY', voice: 'monster', color: '#ff9a4a' }, ['A human! Down here? Well, gold is gold.', 'Buy something warm. Echofall gets damp.']);
          await openShop(w, { name: 'EMBERLY\'S', keeper: 'monster', items: [['glow_bun', 18], ['sea_tea', 12], ['noodles', 15], ['slippers', 70]] });
        },
      },
      { id: 'hushnpc', model: 'hush', x: 6, z: -8, face: 'down', when: () => flag('hushDone') && !flag('hushHurt') && !empty(), talk: async (w) => w.say('hush', ['oh... hi...', 'this is my house. and my cousin\'s house.', 'i make music sometimes... sad music, mostly... but i think... i\'d like to make a happier song someday...', 'maybe... about you...']) },
    ],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -12.5, 'down'] },
    exits: [
      { rect: [-1, 8.2, 1, 9], to: 'e4', spawn: 'north' },
      { rect: [-1, -14, 1, -13.2], to: 'e6', spawn: 'south' },
    ],
    async enter(w) { if (flag('statueUmbrella')) w.room.props.get('statue').obj.userData.umbrella.visible = true; },
  },

  e6: {
    ...E, id: 'e6', name: 'Echofall - Lantern Path', particles: 'fireflies',
    floor: [[-2, -30, 2, 4], [-1, 4, 1, 7]],
    props: [
      ...Array.from({ length: 5 }, (_, i) => ({ t: 'lamp', x: i % 2 ? 1.7 : -1.7, z: -3 - i * 6, color: '#6ad8ff', h: 1.8, solid: 0.2 })),
      { t: 'echoflower', x: -1.2, z: -20, run: flowerLine(['Behind you.']) },
    ],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -28.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'e5', spawn: 'north' },
      { rect: [-2, -30, 2, -29.4], to: 'e7', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.7 },
    triggers: [{
      rect: [-2, -18, 2, -15], once: 'spearRain', when: () => !empty(),
      async run(w) {
        music.play('maris');
        const m = w.addNpc({ id: 'maris', model: 'maris', x: 0, z: -28, face: 'down' });
        await M(w, geno() ? ['...'] : ['SEVEN.', 'Seven human SOULs, and King Oakheart will become a god.', 'Six. We have six.', 'You understand? Through the history of monsters, you\'re the last thing standing in our way.']);
        await M(w, ['Give me your SOUL, or I\'ll take it!']);
        // escape run: spears rain behind you
        m.face('down');
        w.player.face('down');
        await w.narrate('(Run.)');
        await leave(w, 'maris', [[0, -29.6]], 3);
        music.play('echofall', { fade: 2 });
      },
    }],
  },

  e7: {
    ...E, id: 'e7', name: 'Echofall - The Arena',
    floor: [[-7, -10, 7, 6], [-1, 6, 1, 9], [-1, -14, 1, -10]],
    music: null,
    props: [
      { t: 'crystal', x: -6, z: -9, s: 1.5 }, { t: 'crystal', x: 6, z: -9, s: 1.5, color: '#9a7aff' },
      { t: 'waterfall', x: 0, z: -11, w: 3, h: 7 },
    ],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -12.5, 'down'] },
    exits: [
      { rect: [-1, 8.2, 1, 9], to: 'e6', spawn: 'north' },
      { rect: [-1, -14, 1, -13.2], to: 'e8', spawn: 'south', when: () => flag('marisDone') },
    ],
    triggers: [{
      rect: [-7, -2, 7, 1], when: () => !flag('marisDone'),
      async run(w) {
        const m = w.addNpc({ id: 'maris', model: 'maris', x: 0, z: -6.5, face: 'down' });
        music.play('maris');
        if (geno()) {
          await M(w, ['...', 'You\'re going to pay for what you did to Taper.', 'For everyone.']);
        } else {
          await M(w, ['Seven human SOULs. We have six.', 'I\'ve been looking for you all day, human.', 'Every monster down here is counting on me. Every child who has never seen the sun.', 'So I\'m done talking. En garde!']);
        }
        const r = await runBattle({ enemies: ['maris'], stage: 'echofall' }, w);
        if (r.outcome === 'dead') return;
        setFlag('marisDone');
        if (flag('marisKilled')) {
          w.removeNpc('maris');
          await w.narrate('(The water is very still.)');
          if (geno() && !flag('echoGone')) { setFlag('echoGone'); await w.echo('geno_gone'); }
          return;
        }
        await M(w, ['...', 'Go. Before I change my mind.', 'But this isn\'t over. You hear me? NOT OVER.']);
        await leave(w, 'maris', [[0, -13.5]], 2.2);
      },
    }],
  },

  e8: {
    ...E, id: 'e8', name: 'Echofall - Captain\'s House',
    floor: [[-6, -4, 6, 5], [-1, 5, 1, 8], [-1, -8, 1, -4]],
    props: [
      { t: 'custom', x: -4.5, z: -6, build: () => house('#2a7a8a'), solid: null, text: () => (flag('marisSpared') && !flag('marisFriend') ? '(The captain\'s house. The lights are on.)' : '(The captain\'s house. It\'s locked.)') },
      { t: 'save', x: 4, z: 2, line: '(The rushing water fills you with DETERMINATION.)' },
    ],
    npcs: [{ id: 'maris', model: 'maris', x: -2, z: -2.6, face: 'down', when: () => flag('marisSpared') && !flag('marisFriend') && flag('taperFriend'), talk: marisHangout }],
    spawns: { default: [0, 6.5, 'up'], south: [0, 6.5, 'up'], north: [0, -6.5, 'down'] },
    exits: [
      { rect: [-1, 7.2, 1, 8], to: 'e7', spawn: 'north' },
      { rect: [-1, -8, 1, -7.2], to: 'm1', spawn: 'south' },
    ],
  },
};

// ---------------------------------------------------------------------------
async function takeSeed(w) {
  if (flag('hasSeed')) return;
  sfx.item();
  setFlag('hasSeed');
  w.room.removeProp('seed');
  await w.narrate('(You picked up a bloomseed. It\'s warm, like it\'s thinking.)');
}

async function growBridge(w, instant) {
  const pads = [];
  for (let z = -1.5; z >= -9.5; z -= 1) pads.push(z);
  for (const z of pads) {
    w.room.addProp({ t: 'custom', x: 0, z, build: lilypad, solid: null });
    if (!instant) { sfx.pop(); await game.wait(0.12); }
  }
  w.room.rects = [...w.room.rects, [-0.8, -10, 0.8, -2]];
}

async function statueUmbrella(w) {
  if (flag('statueUmbrella')) {
    return w.narrate(['(The statue plays a quiet tune under its umbrella.)']);
  }
  await w.narrate(['(An old statue. Water drips on its head.)', '(Someone has left an umbrella nearby.)']);
  const c = await w.ask('narrator', ['* (Give the statue the umbrella?)'], ['Yes', 'No']);
  if (c !== 0) return;
  setFlag('statueUmbrella');
  w.room.props.get('statue').obj.userData.umbrella.visible = true;
  music.push(0.5);
  music.play('fallen', { fade: 0.5 });
  await w.narrate(['(A music box inside the statue begins to play.)', '(It\'s a tune you almost remember.)']);
  await game.wait(2.5);
  if (!flag('lotlNumber')) {
    w.give('starlight');
    sfx.item();
    await w.narrate('(Something falls out of the statue. You got the Starlight Candy.)');
  }
  music.play('echofall', { fade: 2 });
}

async function marisHangout(w) {
  music.play('hangout');
  await M(w, ['Oh. It\'s you.', 'Taper told me to be your friend. Taper tells me a LOT of things.', '...Fine. Come here. We\'re cooking.']);
  await M(w, ['Rule one: you chop the veggies. Pretend they\'re your enemies.', 'Rule two: you pound the noodles. HARDER.', 'Rule three: we turn the heat up... way... up...']);
  sfx.fire();
  game.flash(0.6);
  sfx.explosion();
  await game.wait(0.8);
  await M(w, ['...', 'Heh.', 'HAHAHAHA!', 'You know what? That\'s the most fun I\'ve had in years.', 'Fine! We\'re friends! Happy?! Don\'t tell anyone I said that!']);
  setFlag('marisFriend');
  await M(w, ['Oh, and if you go up to Emberdeep... tell Dr. Lotl I said hi. She\'s... she\'s cute. I mean COOL. She\'s cool.']);
  music.play('echofall');
}

export { S };
