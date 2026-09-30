// THE HOLLOWS — where the fallen are found.
import { game } from '../core/game.js';
import { S, flag, setFlag, onGenocide, areaCleared } from '../core/save.js';
import { maxHp } from '../data/stats.js';
import { walkPath, lie, standUp, leave, once } from './util.js';
import { sfx } from '../audio/sfx.js';
import { music } from '../audio/sequencer.js';
import { say } from '../ui/dialogue.js';
import { runBattle } from '../battle/battle.js';
import { echoLine } from './echoes.js';
import { SOULS } from '../data/souls.js';
import { openShop } from '../ui/shop.js';

const H = { theme: 'hollows', area: 'hollows', ambience: 'cave' };
const ENC = { pool: [['croakle', 3], ['flutterby', 3], ['ogleye', 2], ['rootle', 2], ['scuttle', 2]], pairs: 0.25 };
const encOn = () => flag('willowLeft') && !flag('willowFought');

async function willowSays(w, pages, opts) { return w.say('willow', pages, opts); }

export const HOLLOWS = {
  h1: {
    ...H, id: 'h1', name: 'Hollows - Fall Site', music: null,
    floor: [[-5, -6, 5, 4], [-1, -11, 1, -6]],
    cam: { h: 6, d: 7.4 },
    props: [
      { t: 'flowers', x: 0, z: -0.5, r: 1.7, n: 110 },
      { t: 'shaft', x: 0, z: -0.5, h: 16, r: 1.6, o: 0.12 },
      { t: 'pillar', x: -4, z: -5, h: 3.6, color: '#7a55a0' },
      { t: 'pillar', x: 4, z: -5, h: 3.6, color: '#7a55a0' },
      { t: 'leaves', x: -3.6, z: 2.6, s: 0.9, solid: null },
      { t: 'rock', x: 3.7, z: 2.8, s: 0.9, color: '#4a3a5a' },
    ],
    lights: [{ x: 0, z: 0, y: 5, color: '#fff0c8', i: 12, d: 12 }],
    particles: 'dust',
    spawns: { default: [0, -0.3, 'down'], south: [0, -9.5, 'down'] },
    exits: [{ rect: [-1, -11, 1, -10.2], to: 'h2', spawn: 'south' }],
    async enter(w, spawn) {
      if (flag('woke')) return;
      setFlag('woke');
      const p = w.player;
      lie(p, true);
      w.letterbox(true);
      await w.camShot([0, 9, 1.5], [0, 0, -0.4], 0);
      await game.wait(1.6);
      await w.camShot([0, 3.2, 4.2], [0, 0.4, -0.4], 3);
      await game.wait(0.6);
      await w.echo('wake');
      await standUp(p);
      p.face('down');
      await game.wait(0.3);
      w.letterbox(false);
      w.camFollow();
      await w.narrate(['(You are in a bed of golden flowers.)', '(Far above, a thin light spills through the hole you fell from.)']);
    },
  },

  h2: {
    ...H, id: 'h2', name: 'Hollows - Glade', music: null,
    floor: [[-4, -7, 4, 5], [-1, 5, 1, 9], [-1, -11, 1, -7]],
    props: [
      { t: 'shaft', x: 0, z: -1, h: 14, r: 1.2, o: 0.1 },
      { t: 'rock', x: -3.3, z: -6, s: 1, color: '#4a3a5a' },
      { t: 'rock', x: 3.4, z: 3.8, s: 0.8, color: '#4a3a5a' },
    ],
    npcs: [{ id: 'sprig', model: 'sprig', x: 0, z: -1.5, face: 'down', when: () => !flag('metSprig'), solid: true, radius: 0.3 }],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -9.5, 'down'] },
    exits: [
      { rect: [-1, 8.2, 1, 9], to: 'h1', spawn: 'south' },
      { rect: [-1, -11, 1, -10.2], to: 'h3', spawn: 'south', when: () => flag('metSprig') },
    ],
    triggers: [{
      rect: [-4, -1, 4, 3.5], once: 'metSprig',
      async run(w) {
        const s = w.npc('sprig');
        w.player.face(s);
        music.play('sprig');
        w.camFocus(s, { zoom: 0.7 });
        await w.say('sprig', ['Oh! Oh, hi! You\'re awake!', 'Nobody\'s fallen down here in forever!', 'I\'m SPRIG. Sprig the buttercup!', 'Golly, you look lost. Want me to show you how things work down here?']);
        await w.say('sprig', ['Okay! Ready? Here we go!']);
        const r = await runBattle({ enemies: ['sprig'], noTransition: false, stage: 'hollows', script: sprigIntro, afterMusic: null }, w);
        if (r.outcome === 'dead') return;
        // Willow arrives
        w.removeNpc('sprig');
        const wl = w.addNpc({ id: 'willow', model: 'willow', x: 0, z: -9, face: 'down' });
        await game.wait(0.6);
        await wl.walkTo(0, -2.6, 1.8);
        music.play('home', { fade: 2 });
        await willowSays(w, ['What a cruel little weed, tormenting a lost child...', 'Do not be afraid, little one.', 'I am WILLOW, caretaker of the Hollows.', 'I pass through here every day to see if anyone has fallen.', 'You are the first to fall in a very long time.']);
        await w.echo('willow');
        await willowSays(w, ['Come. I will guide you through the Hollows.']);
        await leave(w, 'willow', [[0, -10.5]], 2);
        w.camFollow();
      },
    }],
  },

  h3: {
    ...H, id: 'h3', name: 'Hollows - Entrance',
    music: () => (flag('willowFought') ? null : 'hollows'),
    floor: [[-6, -8, 6, 6], [-1, 6, 1, 9], [-1, -12, 1, -8]],
    props: [
      { t: 'save', x: -3.5, z: -3, line: () => (flag('willowFought') ? '(The Hollows are quiet now. It fills you with DETERMINATION.)' : '(The shadow of the ruins looms above. It fills you with DETERMINATION.)') },
      { t: 'leaves', x: 3, z: -2, s: 1.2, solid: null },
      { t: 'pillar', x: -5, z: -7, h: 3.6 }, { t: 'pillar', x: 5, z: -7, h: 3.6 },
      { t: 'pillar', x: -5, z: 4.5, h: 3.6 }, { t: 'pillar', x: 5, z: 4.5, h: 3.6 },
      { t: 'door', x: 0, z: -8.2, w: 1.8, h: 2.8, color: '#5a3a7a', solid: null },
    ],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], north: [0, -10.5, 'down'] },
    exits: [
      { rect: [-1, 8.2, 1, 9], to: 'h2', spawn: 'north' },
      { rect: [-1, -12, 1, -11.2], to: 'h4', spawn: 'south' },
    ],
    async enter(w) {
      if (!once('h3intro')) return;
      const wl = w.addNpc({ id: 'willow', model: 'willow', x: 0, z: -5.5, face: 'down' });
      await willowSays(w, ['Welcome to the Hollows, little one.', 'Monsters live all through these halls. Most of them are gentle, if you are gentle with them.', 'You will see stars like that one. Touching them saves your progress, and warms the heart.']);
      await leave(w, 'willow', [[0, -11.5]], 2);
      void wl;
    },
  },

  h4: {
    ...H, id: 'h4', name: 'Hollows - Ribbon Hall',
    floor: [[-7, -6, 7, 4], [-1, 4, 1, 7], [-1, -10, 1, -6]],
    props: [
      { t: 'wallswitch', id: 'sw1', x: -5, z: -5.8, color: '#ffd84a', run: (w) => pull(w, 'sw1', true), promptY: 1.6, reach: 1.4 },
      { t: 'wallswitch', id: 'sw2', x: -1.8, z: -5.8, color: '#8a6aa8', run: (w) => pull(w, 'sw2', false), promptY: 1.6, reach: 1.4 },
      { t: 'wallswitch', id: 'sw3', x: 5, z: -5.8, color: '#ffd84a', run: (w) => pull(w, 'sw3', true), promptY: 1.6, reach: 1.4 },
      { t: 'custom', x: -5, z: -5.6, build: () => ribbon(), solid: null },
      { t: 'custom', x: 5, z: -5.6, build: () => ribbon(), solid: null },
      { t: 'spikes', id: 'spikes', x: 0, z: -6.9, w: 2, d: 1.4, solid: [2, 1.4] },
      { t: 'sign', x: 3, z: 2.5, text: ['(A sign.)', '"Only the ribboned may pass."'] },
      { t: 'leaves', x: -5, z: 2.5, s: 0.9, solid: null },
    ],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -8.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'h3', spawn: 'north' },
      { rect: [-1, -10, 1, -9.2], to: 'h5', spawn: 'south' },
    ],
    async enter(w) {
      applySwitches(w);
      if (!once('h4intro')) return;
      await willowSays(w, ['The Hollows are full of puzzles. Old monster architecture.', 'I have tied ribbons on the switches you need to pull. Try it.'], { pos: 'top' });
    },
  },

  h5: {
    ...H, id: 'h5', name: 'Hollows - Practice Room',
    floor: [[-5, -6, 5, 4], [-1, 4, 1, 7], [-1, -10, 1, -6]],
    npcs: [
      { id: 'straw', model: 'straw', x: 0, z: -2.5, face: 'down', radius: 0.4, talk: async (w) => scarecrow(w), when: () => !flag('strawDone') },
      { id: 'willow', model: 'willow', x: -2.6, z: -4, face: 'down', when: () => !flag('strawDone') },
    ],
    props: [{ t: 'pillar', x: -4, z: -5, h: 3.6 }, { t: 'pillar', x: 4, z: -5, h: 3.6 }],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -8.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'h4', spawn: 'north' },
      { rect: [-1, -10, 1, -9.2], to: 'h6', spawn: 'south', when: () => flag('strawDone'), blocked: (w) => w.say('willow', ['Please practice with the scarecrow first, little one.']) },
    ],
    async enter(w) {
      if (!once('h5intro')) return;
      await willowSays(w, ['As a human in the Underground, monsters may attack you.', 'You must be prepared. When a monster fights you, you do not have to fight back.', 'Talk to them. Stall. I will be there to help.', 'Practice on the scarecrow. Go on.']);
    },
  },

  h6: {
    ...H, id: 'h6', name: 'Hollows - Thorn Walk',
    floor: [[-4, -14, 4, 4], [-1, 4, 1, 7], [-1, -18, 1, -14]],
    props: [
      ...[-12, -10, -8, -6, -4].flatMap((z, i) => [
        { t: 'spikes', x: i % 2 ? 1.5 : -1.5, z, w: 5, d: 1.8, solid: null },
      ]),
    ],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -16.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'h5', spawn: 'north' },
      { rect: [-1, -18, 1, -17.2], to: 'h7', spawn: 'south' },
    ],
    triggers: [{
      rect: [-4, -2.5, 4, 2], once: 'h6walk',
      async run(w) {
        const wl = w.addNpc({ id: 'willow', model: 'willow', x: 0, z: -1.2, face: 'down' });
        await willowSays(w, ['This room is full of thorns that do not always lower.', 'It is a little dangerous for you. Here. Take my hand.']);
        w.player.walkSpeed = 2;
        const path = [[-3, -3], [-3, -5], [3, -5], [3, -7], [-3, -7], [-3, -9], [3, -9], [3, -11], [0, -13]];
        const pp = path.map(([x, z]) => [x, z + 0.9]);
        await Promise.all([walkPath(wl, path, 2), walkPath(w.player, pp, 2)]);
        await willowSays(w, ['There. Was that so bad?']);
        await leave(w, 'willow', [[0, -17.5]], 2);
      },
    }],
  },

  h7: {
    ...H, id: 'h7', name: 'Hollows - Long Hall',
    floor: [[-2, -32, 2, 4], [-1, 4, 1, 7], [-1, -36, 1, -32]],
    props: [
      ...Array.from({ length: 6 }, (_, i) => ({ t: 'pillar', x: i % 2 ? 1.6 : -1.6, z: -4 - i * 5, h: 3.6, r: 0.3 })),
      { t: 'pillar', id: 'hide', x: 1.4, z: -30, h: 3.6, r: 0.45 },
    ],
    npcs: [{ id: 'willow', model: 'willow', x: 0, z: 1.5, face: 'up', when: () => !flag('h7done') }],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -34.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'h6', spawn: 'north' },
      { rect: [-1, -36, 1, -35.2], to: 'h8', spawn: 'south', when: () => flag('h7done') },
    ],
    encounters: { ...ENC, when: encOn },
    async enter(w) {
      if (!once('h7intro')) return;
      const wl = w.npc('willow');
      await willowSays(w, ['Little one, I must ask you something difficult.', 'I would like you to walk to the end of this hall. By yourself.', 'Forgive me for this.']);
      await wl.walkTo(0, -26, 3.2);
      wl.visible = false;
      w.removeNpc('willow');
    },
    triggers: [{
      rect: [-2, -29, 2, -27], once: 'h7done',
      async run(w) {
        const wl = w.addNpc({ id: 'willow', model: 'willow', x: 2.4, z: -30.5, face: 'left' });
        await wl.walkTo(0.9, -29.6, 2);
        wl.face(w.player);
        await willowSays(w, ['Oh! Do not be alarmed, my child.', 'I only wished to see if you could stand on your own.', 'You did very well.', 'I have some errands to run. Please wait here.', 'Oh! Take this. It is a whisperleaf. Speak into it and I will hear you.']);
        sfx.item();
        await w.narrate('(You got a whisperleaf. It is a cell phone, shaped like a leaf. Press C to call.)');
        setFlag('hasPhone');
        await willowSays(w, ['Be good, alright?']);
        await leave(w, 'willow', [[0, -35.5]], 3);
        setFlag('willowLeft');
      },
    }],
  },

  h8: {
    ...H, id: 'h8', name: 'Hollows - Candy Room',
    floor: [[-6, -6, 6, 4], [-1, 4, 1, 7], [-1, -10, 1, -6]],
    props: [
      { t: 'custom', id: 'bowl', x: 0, z: -3.5, build: () => pedestal('#ff7a2a'), solid: 0.45, promptY: 1.3, run: candyBowl },
      { t: 'sign', x: -2, z: -4.5, text: '"Take one, please."' },
      { t: 'leaves', x: 4.2, z: 2, s: 1, solid: null },
      { t: 'leaves', x: -4.4, z: 1.4, s: 0.8, solid: null },
    ],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -8.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'h7', spawn: 'north' },
      { rect: [-1, -10, 1, -9.2], to: 'h9', spawn: 'south' },
    ],
    encounters: { ...ENC, when: encOn },
    async enter(w) {
      if (!flag('call1') && flag('hasPhone')) {
        setFlag('call1');
        sfx.phone();
        await game.wait(0.8);
        await w.narrate('(Your whisperleaf is ringing.)');
        await willowSays(w, ['Hello? This is Willow.', 'I forgot to ask. Do you prefer cinnamon or honeybark?', '...You don\'t need to answer. I will make the right one. Probably.']);
      }
    },
  },

  h9: {
    ...H, id: 'h9', name: 'Hollows - Stubborn Rock',
    floor: [[-7, -6, 7, 4], [-1, 4, 1, 7], [-1, -10, 1, -6]],
    props: [
      { t: 'rock', id: 'rock', x: -3, z: -2.2, s: 1.2, color: '#6a5a7a', solid: 0.55, run: stubbornRock, promptY: 1.1 },
      { t: 'tile', id: 'plate', x: 3, z: -2.2, w: 1.1, color: '#8a5aaa', solid: null },
      { t: 'spikes', id: 'spikes', x: 0, z: -6.9, w: 2, d: 1.4, solid: [2, 1.4] },
      { t: 'leaves', x: -5.5, z: 2.6, s: 1, solid: null },
    ],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -8.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'h8', spawn: 'north' },
      { rect: [-1, -10, 1, -9.2], to: 'h10', spawn: 'south' },
    ],
    encounters: { ...ENC, when: encOn },
    async enter(w) {
      if (flag('rockMoved')) {
        const r = w.room.props.get('rock');
        r.obj.position.set(3, 0, -2.2);
        r.collider.x = 3;
        openSpikes(w);
      }
    },
  },

  h10: {
    ...H, id: 'h10', name: 'Hollows - Quiet Hall',
    floor: [[-3, -14, 3, 4], [-1, 4, 1, 7], [-1, -18, 1, -14]],
    props: [{ t: 'leaves', x: 0, z: -7, s: 1.4, solid: null }],
    npcs: [{
      id: 'hush', model: 'hush', x: 0, z: -7, face: 'down', radius: 0.8, when: () => !flag('hushDone'),
      talk: async (w) => {
        await w.say('hush', ['z z z z z', 'z z z...', '(Hush is pretending to be asleep by saying "z" out loud.)']);
        const r = await w.encounter(['hush']);
        if (r.outcome === 'dead') return;
        setFlag('hushDone');
        if (r.outcome === 'spared') {
          await w.say('hush', ['oh...', 'you\'re still here...', 'i usually come to the hollows to be alone... but i\'m glad i met you...', 'i\'ll get out of your way now...']);
        } else if (r.outcome === 'hush_left' || r.outcome === 'killed') {
          await w.narrate('(Hush is gone. Just a few tears on the leaves.)');
        }
        const h = w.npc('hush');
        if (h) { h.visible = false; w.removeNpc('hush'); }
      },
    }],
    spawns: { default: [0, 5.5, 'up'], south: [0, 5.5, 'up'], north: [0, -16.5, 'down'] },
    exits: [
      { rect: [-1, 6.2, 1, 7], to: 'h9', spawn: 'north' },
      { rect: [-1, -18, 1, -17.2], to: 'h11', spawn: 'south', when: () => flag('hushDone'), blocked: (w) => w.narrate('(Hush is in the way. Maybe talk to them?)') },
    ],
    encounters: { ...ENC, when: encOn },
  },

  h11: {
    ...H, id: 'h11', name: 'Hollows - Alcove',
    floor: [[-8, -8, 8, 5], [-1, 5, 1, 8], [-1, -12, 1, -8]],
    props: [
      { t: 'save', x: 5, z: 2, line: '(Seeing the little monster town fills you with DETERMINATION.)' },
      { t: 'counter', x: -5, z: -6.2, w: 3, color: '#6a4a8a', solid: [3.2, 1] },
      { t: 'custom', x: -5, z: -6.1, build: () => pastries(), solid: null },
      { t: 'sign', x: -2.8, z: -5.5, text: ['"SILK\'S BAKE SALE"', '"By spiders, for spiders. Humans welcome. Humans tip."'] },
      { t: 'custom', x: -5, z: -5.2, build: () => new THREE_Group(), solid: null, run: silkStand, promptY: 1.2, reach: 1.4 },
      { t: 'leaves', x: 6, z: -6, s: 1, solid: null },
      { t: 'pillar', x: -7, z: 4, h: 3.6 }, { t: 'pillar', x: 7, z: -7, h: 3.6 },
    ],
    npcs: [
      { id: 'tipfrog', model: 'croakle', x: 3, z: -3, face: 'down', lookAtPlayer: true, talk: async (w) => w.say({ name: 'CROAKLE', voice: 'monster', color: '#8aff7a' }, ['Ribbit, ribbit.', '(Translation: If a monster\'s name turns yellow, you can SPARE it.)', '(Also: while you dodge, press X to use the power of your SOUL.)', '(Ribbit.)']), when: () => !onGenocide() },
      { id: 'mothling', model: 'flutterby', x: -1, z: 1, face: 'down', lookAtPlayer: true, talk: async (w) => w.say({ name: 'FLUTTERBY', voice: 'high', color: '#bfe0ff' }, ['S-sorry! I\'m not in your way, am I?', 'The lady in the purple robe lives just north of here.', 'She makes pie for everyone. Even me.']), when: () => !onGenocide() },
      { id: 'beetle', model: 'scuttle', x: 6, z: -1, face: 'left', lookAtPlayer: true, talk: async (w) => w.say({ name: 'SCUTTLE', voice: 'low', color: '#ff8a8a' }, ['Every star you touch writes your story down somewhere.', 'Nobody knows where. Nobody asks.']), when: () => !onGenocide() },
    ],
    spawns: { default: [0, 6.5, 'up'], south: [0, 6.5, 'up'], north: [0, -10.5, 'down'] },
    exits: [
      { rect: [-1, 7.2, 1, 8], to: 'h10', spawn: 'north' },
      { rect: [-1, -12, 1, -11.2], to: 'h12', spawn: 'south' },
    ],
    encounters: { ...ENC, rate: 0.6, when: encOn },
  },

  h12: {
    ...H, id: 'h12', name: 'Hollows - Willow\'s Tree',
    music: () => (flag('willowFought') ? null : 'hollows'),
    floor: [[-8, -9, 8, 6], [-1, 6, 1, 9]],
    props: [
      { t: 'custom', x: 0, z: -11.5, build: () => bigTree(), solid: null },
      { t: 'custom', x: -3.5, z: -3, build: () => sapling(), solid: 0.35, text: () => (flag('willowFought') ? '(A small red tree. It has dropped all its leaves.)' : '(A young tree with bright red leaves. Someone waters it every morning.)') },
      { t: 'save', x: 4, z: -3, line: () => (flag('willowFought') ? '(The house is quiet.)' : '(The smell of baking. It fills you with DETERMINATION.)') },
      { t: 'leaves', x: -6, z: 3, s: 1.2, solid: null }, { t: 'leaves', x: 6, z: 3.5, s: 1, solid: null },
    ],
    lights: [{ x: 0, z: -7, y: 2.2, color: '#ffc080', i: 6, d: 9 }],
    spawns: { default: [0, 7.5, 'up'], south: [0, 7.5, 'up'], door: [0, -7.2, 'down'] },
    exits: [
      { rect: [-1, 8.2, 1, 9], to: 'h11', spawn: 'north' },
      { rect: [-0.8, -9, 0.8, -8.4], to: 'h13', spawn: 'front' },
    ],
    async enter(w) {
      if (!once('h12meet')) return;
      const wl = w.addNpc({ id: 'willow', model: 'willow', x: 0, z: -7, face: 'down' });
      await wl.walkTo(0, -1.4, 3);
      await willowSays(w, ['Oh! There you are!', 'How did you get all the way here by yourself? Were you hurt?', 'Let me see... not a scratch. Good.', 'Come, little one. I have a surprise waiting for you.']);
      await leave(w, 'willow', [[0, -8.6]], 2.5);
    },
  },

  h13: {
    id: 'h13', name: 'Willow\'s Home', theme: 'home', area: 'hollows', ambience: null,
    music: () => (flag('willowFought') ? null : 'home'),
    floor: [[-6, -5, 4, 4], [4, -2, 13, 1], [9, -7, 11, -2], [-1, 4, 1, 6]],
    cam: { h: 5.8, d: 7 },
    props: [
      { t: 'fireplace', x: -3, z: -4.55, solid: [2.2, 0.8] },
      { t: 'armchair', x: -3, z: -2.2, ry: 0, color: '#8a3a4a' },
      { t: 'bookshelf', x: 1.8, z: -4.7, text: ['(A bookshelf full of books about snails, pies, and bad jokes.)', '(One book is titled "Seventy-Two Uses For Cinnamon.")'] },
      { t: 'table', x: 1, z: 0.8, w: 1.8, d: 1.1, color: '#7a4a2a' },
      { t: 'chair', x: 1, z: 2, ry: Math.PI, color: '#7a4a2a' },
      { t: 'rug', x: -2.2, z: -1.4, w: 3.2, d: 2.2, color: '#6a3a8a', solid: null },
      { t: 'custom', x: 12.5, z: -0.5, build: () => doorPanel('#6a4a2a'), solid: null },
      { t: 'custom', x: 10, z: -6.7, build: () => stairs(), solid: null },
    ],
    lights: [{ x: -3, z: -3, y: 1, color: '#ff9a4a', i: 4, d: 8 }, { x: 8, z: -0.5, y: 2.6, color: '#ffd8a0', i: 3, d: 8 }],
    npcs: [{
      id: 'willow', model: 'willow', x: -3, z: -1.6, face: 'down', solid: true,
      when: () => flag('slept') && !flag('willowBasement'),
      talk: willowChat,
    }],
    particles: null,
    spawns: { default: [0, 4.8, 'up'], front: [0, 4.8, 'up'], room: [11.6, -0.5, 'left'], stairs: [10, -5.5, 'down'] },
    exits: [
      { rect: [-1, 5.4, 1, 6], to: 'h12', spawn: 'door' },
      { rect: [12.4, -2, 13, 1], to: 'h14', spawn: 'door' },
      { rect: [9, -7, 11, -6.3], to: 'h15', spawn: 'south', when: () => flag('willowBasement') || flag('willowFought'), blocked: (w) => w.narrate('(The stairs lead down into the dark. Not yet.)') },
    ],
    async enter(w, spawn) {
      if (!once('homeIntro')) return;
      const wl = w.addNpc({ id: 'willow', model: 'willow', x: 0, z: 1.6, face: 'down' });
      await willowSays(w, ['Welcome home, little one!', 'Can you smell that? I baked a honeybark pie. I thought we should celebrate.', 'And... I have a surprise. A room of your very own!', 'Come, come.']);
      await walkPath(wl, [[4.5, -0.5], [11, -0.5]], 2.4);
      await willowSays(w, ['This is your room. I hope you like it.', 'Rest for a while. I will be in the living room.']);
      w.removeNpc('willow');
    },
  },

  h14: {
    id: 'h14', name: 'Your Room', theme: 'home', area: 'hollows', ambience: null,
    music: () => (flag('willowFought') ? null : 'home'),
    floor: [[-3, -3, 3, 3]],
    cam: { h: 5, d: 6 },
    props: [
      { t: 'bed', x: -1.6, z: -1.6, color: '#c86a8a', run: sleep, promptY: 0.9 },
      { t: 'crate', x: 2.2, z: -2.3, s: 0.7, color: '#c84a4a', text: () => boxText() },
      { t: 'custom', x: 2.3, z: 1.8, build: () => drawer(), solid: [0.9, 0.6], text: () => drawerText() },
      { t: 'rug', x: 0.5, z: 0.5, w: 2, d: 1.6, color: '#3a6a8a', solid: null },
      { t: 'lamp', x: 2.4, z: -0.4, h: 1.2, color: '#ffc080' },
    ],
    lights: [{ x: 0, z: 0, y: 2.4, color: '#ffd8a0', i: 3, d: 7 }],
    particles: null,
    spawns: { default: [0, 2.2, 'up'], door: [2.3, 0.2, 'left'] },
    exits: [{ rect: [2.7, -0.4, 3, 1], to: 'h13', spawn: 'room' }],
    async enter(w) {
      if (flag('pieReady') && !flag('pieTaken')) addPie(w);
    },
  },

  h15: {
    id: 'h15', name: 'Hollows - Beneath the House', theme: 'hollows', area: 'hollows', ambience: 'cave', music: null,
    floor: [[-2, -42, 2, 3], [-1, -46, 1, -42]],
    props: Array.from({ length: 8 }, (_, i) => ({ t: 'pillar', x: i % 2 ? 1.6 : -1.6, z: -4 - i * 5, h: 3.6, r: 0.28 })),
    fogDensity: 0.07,
    npcs: [{ id: 'willow', model: 'willow', x: 0, z: -4, face: 'up', when: () => !flag('willowFought') }],
    spawns: { default: [0, 1.5, 'up'], south: [0, 1.5, 'up'], north: [0, -44.5, 'down'] },
    exits: [
      { rect: [-2, 2.4, 2, 3], to: 'h13', spawn: 'stairs' },
      { rect: [-1, -46, 1, -45.2], to: 'h16', spawn: 'south', when: () => flag('willowFought') },
    ],
    async enter(w) {
      if (flag('willowFought')) return;
      const wl = w.npc('willow');
      if (!flag('basementTalk1')) {
        setFlag('basementTalk1');
        await willowSays(w, ['You want to know how to leave the Hollows.', 'Beneath this house is the way out. The door to the rest of the Underground.', 'I am going to close it forever.', 'Go upstairs. Please.']);
      }
      wl.walkTo(0, -20, 1.6);
    },
    triggers: [
      {
        rect: [-2, -18, 2, -16], once: 'basementTalk2',
        async run(w) {
          const wl = w.npc('willow');
          wl.stop();
          wl.face(w.player);
          await willowSays(w, ['Every human who falls down here meets the same end.', 'I have seen it happen. Again and again.', 'They come. They leave. They die.', 'King Oakheart will take your SOUL. I will not let that happen to you.']);
          wl.face('up');
          wl.walkTo(0, -38, 1.6);
        },
      },
      {
        rect: [-2, -36, 2, -34], once: 'willowFought',
        async run(w) {
          const wl = w.npc('willow');
          wl.stop();
          await wl.walkTo(0, -38.5, 2);
          wl.face(w.player);
          await willowSays(w, ['You want to leave so badly?', 'Hmph. You are just like the others.', 'There is only one solution to this.', 'Prove to me you are strong enough to survive.']);
          const r = await runBattle({ enemies: ['willow'], stage: 'hollows' }, w);
          if (r.outcome === 'dead') { S.flags.willowFought = false; return; }
          if (r.outcome === 'spared' || flag('willowSpared')) {
            setFlag('willowSpared');
            await willowSays(w, ['...I understand now.', 'The Hollows are too small for you. They were too small for them, too.', 'Beyond this door is Frostmere, and beyond that... the King.', 'Please, whatever happens... do not let them change who you are.', 'Goodbye, my child.']);
            await w.echo('willow_spared');
            await leave(w, 'willow', [[0, 0]], 2);
          } else {
            setFlag('willowGone');
            w.removeNpc('willow');
            await w.echo('willow_killed');
            if (onGenocide()) await w.echo('geno1');
          }
        },
      },
    ],
  },

  h16: {
    id: 'h16', name: 'Hollows - The Last Door', theme: 'hollows', area: 'hollows', ambience: 'cave', music: null,
    floor: [[-2, -16, 2, 3], [-1, -20, 1, -16]],
    props: [{ t: 'door', x: 0, z: -16.2, w: 1.8, h: 3, color: '#4a3a5a', solid: null }],
    npcs: [{ id: 'sprig', model: 'sprig', x: 0, z: -9, face: 'down', when: () => !flag('sprigGate') }],
    spawns: { default: [0, 1.5, 'up'], south: [0, 1.5, 'up'] },
    exits: [
      { rect: [-2, 2.4, 2, 3], to: 'h15', spawn: 'north' },
      { rect: [-1, -20, 1, -19.2], to: 'f1', spawn: 'south' },
    ],
    triggers: [{
      rect: [-2, -6, 2, -4], once: 'sprigGate',
      async run(w) {
        const s = w.npc('sprig');
        music.play('sprig_evil', { fade: 1 });
        s.model.userData.setExpr('neutral');
        if (flag('willowSpared')) {
          await w.say('sprig', ['Clever. Very clever.', 'You got through the Hollows without hurting anybody.', 'But I know that trick. It\'s the whispering, isn\'t it?']);
          s.model.userData.setExpr('evil');
          await w.say('sprig_evil', [`${SOULS[S.soul].trait}, huh? I remember that one.`, 'It didn\'t save them last time. It won\'t save you.', 'See you around, buddy.']);
        } else if (onGenocide()) {
          s.model.userData.setExpr('evil');
          await w.say('sprig_evil', ['Hee hee hee.', 'Now THAT\'S more like it.', 'You and me, we could have a lot of fun together.']);
        } else {
          s.model.userData.setExpr('evil');
          await w.say('sprig_evil', ['So you killed her.', 'Your little whisper didn\'t like that, did it? I can tell.', 'Don\'t worry. It gets easier.']);
        }
        sfx.whoosh();
        w.removeNpc('sprig');
        music.stop(1);
      },
    }],
  },
};

// ---------------------------------------------------------------------------
// helpers used above
import * as THREE from 'three';
import { toon, glow, lit, outlineAll } from '../gfx/materials.js';
const THREE_Group = THREE.Group;

function ribbon() {
  const g = new THREE.Group();
  const m = toon('#ff3a4a');
  const a = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.04), m);
  a.position.set(0, 1.55, 0.12);
  a.rotation.z = 0.5;
  const b = a.clone();
  b.rotation.z = -0.5;
  g.add(a, b);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.03), m);
  tail.position.set(0.05, 1.38, 0.12);
  g.add(tail);
  return g;
}

function pedestal(candy) {
  const g = new THREE.Group();
  const stone = lit('#9a7ab8');
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.35, 0.9, 12), stone);
  col.position.y = 0.45;
  g.add(col);
  const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), toon('#e8e0f0'));
  bowl.position.y = 1.05;
  bowl.rotation.x = Math.PI;
  g.add(bowl);
  for (let i = 0; i < 6; i++) {
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), glow(candy, 1.4));
    c.position.set(Math.cos(i) * 0.15, 1.05, Math.sin(i) * 0.15);
    g.add(c);
  }
  outlineAll(g, 0.015);
  return g;
}

function pastries() {
  const g = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const p = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.05, 6, 12), toon(i % 2 ? '#c86aff' : '#ffb05a'));
    p.rotation.x = Math.PI / 2;
    p.position.set(-0.9 + i * 0.6, 1.12, 0);
    g.add(p);
  }
  return g;
}

function bigTree() {
  const g = new THREE.Group();
  const bark = lit('#4a3226', { roughness: 1 });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3.2, 7, 12), bark);
  trunk.position.y = 3.5;
  g.add(trunk);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), new THREE.MeshBasicMaterial({ color: '#1a0e08' }));
  door.position.set(0, 1.1, 2.62);
  g.add(door);
  const win = new THREE.Mesh(new THREE.CircleGeometry(0.4, 16), glow('#ffc070', 1.4));
  win.position.set(1.2, 3, 2.5);
  win.rotation.y = 0.3;
  g.add(win);
  const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(4, 1), lit('#8a2a2a', { flat: true }));
  crown.position.y = 8.5;
  g.add(crown);
  const l = new THREE.PointLight('#ffb070', 4, 8, 2);
  l.position.set(0, 1.5, 3.5);
  g.add(l);
  return g;
}

function sapling() {
  const g = new THREE.Group();
  const t = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 1.4, 6), toon('#5a3a26'));
  t.position.y = 0.7;
  g.add(t);
  if (!flag('willowFought')) {
    const c = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), toon('#e0402a'));
    c.position.y = 1.6;
    g.add(c);
  }
  outlineAll(g, 0.02);
  return g;
}

function doorPanel(color) {
  const g = new THREE.Group();
  const d = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2, 1.1), toon(color));
  d.position.y = 1;
  g.add(d);
  return g;
}

function stairs() {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 0.3), toon('#5a3a26'));
    s.position.set(0, -0.1 - i * 0.12, -i * 0.3);
    g.add(s);
  }
  const dark = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.5), new THREE.MeshBasicMaterial({ color: '#000' }));
  dark.rotation.x = -Math.PI / 2;
  dark.position.set(0, -0.7, -1.2);
  g.add(dark);
  return g;
}

function drawer() {
  const g = new THREE.Group();
  const d = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1, 0.5), toon('#8a5a3a'));
  d.position.y = 0.5;
  g.add(d);
  outlineAll(g, 0.015);
  return g;
}

function pieSlice() {
  const g = new THREE.Group();
  const p = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.12, 12, 1, false, 0, 1), toon('#d89a4a'));
  p.position.y = 0.06;
  g.add(p);
  return g;
}

// ---------------------------------------------------------------------------
async function pull(w, id, good) {
  if (flag('h4solved')) return w.narrate('(The switch is stuck in place now.)');
  const p = w.room.props.get(id);
  if (flag('pulled_' + id)) return w.narrate('(You already pulled this one.)');
  sfx.switch();
  p.obj.userData.set?.(true);
  if (!good) {
    await w.narrate(['(Click.)', '(A single red leaf floats down from the ceiling and lands on your head.)']);
    p.obj.userData.set?.(false);
    return;
  }
  setFlag('pulled_' + id);
  if (flag('pulled_sw1') && flag('pulled_sw3')) {
    setFlag('h4solved');
    sfx.spikes();
    openSpikes(w);
    await w.narrate('(Somewhere, the thorns sink into the floor.)');
    await w.say('willow', ['Splendid! I am very proud of you, little one.']);
  } else await w.narrate('(Click.)');
}

function applySwitches(w) {
  for (const id of ['sw1', 'sw3']) if (flag('pulled_' + id)) w.room.props.get(id)?.obj.userData.set?.(true);
  if (flag('h4solved')) openSpikes(w);
}

function openSpikes(w) {
  const s = w.room.props.get('spikes');
  if (!s) return;
  s.obj.userData.set(false);
  w.room.setSolid('spikes', false);
}

async function scarecrow(w) {
  const r = await w.encounter(['straw'], { noFlee: false });
  if (r.outcome === 'dead') return;
  setFlag('strawDone');
  if (r.outcome === 'spared') await w.say('willow', ['Very good! You are very good.']);
  else if (r.outcome === 'killed') await w.say('willow', ['...Ah.', 'Well. It was only straw. But next time, try talking first.']);
  else await w.say('willow', ['You ran from a scarecrow?', '...That is also a fine choice. Running is fine.']);
  const s = w.npc('straw');
  if (r.outcome === 'killed' && s) w.removeNpc('straw');
  await w.say('willow', ['Now, come. There is more to see.']);
  await leave(w, 'willow', [[-2.6, -8], [0, -9.5]], 2);
}

async function candyBowl(w) {
  const n = S.flags.candy || 0;
  if (n >= 4) return w.narrate('(The bowl is empty. There are ember-colored crumbs everywhere.)');
  const choice = await w.ask('narrator', ['* (It\'s a bowl of glowing candy.)', '* (Take one?)'], ['Take', 'Leave']);
  if (choice !== 0) return;
  if (n === 3) {
    S.flags.candy = 4;
    sfx.crack();
    return w.narrate(['(You reach for a fourth candy.)', '(The bowl tips over. The candies roll away into the leaves.)', '(You feel like the bowl is disappointed in you.)']);
  }
  if (await w.pickup('ember_drop')) S.flags.candy = n + 1;
}

async function stubbornRock(w) {
  if (flag('rockMoved')) return w.narrate('(The rock is enjoying its new spot.)');
  const c = await w.ask('narrator', ['* (It\'s a rock. It seems to be sulking.)'], ['Push', 'Ask nicely']);
  if (c === 0) {
    sfx.push();
    return w.say({ name: 'ROCK', voice: 'low', color: '#aaa' }, ['Hey! Rude.', 'I was here first.']);
  }
  await w.say({ name: 'ROCK', voice: 'low', color: '#aaa' }, ['...Oh. You asked.', 'Nobody ever asks.', 'Fine. Where do you want me?']);
  sfx.push();
  const r = w.room.props.get('rock');
  const from = r.obj.position.x;
  await game.tween(1.2, (k) => { r.obj.position.x = from + (3 - from) * k; });
  r.collider.x = 3;
  setFlag('rockMoved');
  sfx.spikes();
  openSpikes(w);
  await w.narrate('(The rock settles on the plate. The thorns lower.)');
}

async function silkStand(w) {
  if (onGenocide() && areaCleared('hollows')) return w.narrate('(There\'s a note: "Closed. Spiders don\'t serve your kind.")');
  await w.say('silk', ['Welcome, dearie! Pastries made by spiders, for spiders, by spiders.', 'All proceeds go to spiders. Would you like a Silk Tart?']);
  await openShop(w, { name: 'SILK\'S BAKE SALE', keeper: 'silk', items: [['silk_tart', 18]], sell: false });
}

async function sleep(w) {
  if (!flag('homeIntro')) return w.narrate('(A comfortable-looking bed.)');
  if (flag('slept')) {
    const c = await w.ask('narrator', ['* (Take a nap?)'], ['Yes', 'No']);
    if (c !== 0) return;
    await game.fadeOut(0.8);
    S.hp = maxHp();
    sfx.save();
    await game.wait(1);
    await game.fadeIn(0.8);
    return w.narrate('(You feel rested.)');
  }
  const c = await w.ask('narrator', ['* (The bed looks very soft.)', '* (Lie down?)'], ['Yes', 'No']);
  if (c !== 0) return;
  music.stop(1);
  await game.fadeOut(1.2);
  S.hp = maxHp();
  setFlag('slept');
  await game.wait(1.2);
  await say('echo', echoLine('willow') ? ['...This used to be my bed, you know.', 'Well. One of ours.'] : ['...']);
  await game.wait(0.6);
  setFlag('pieReady');
  addPie(w);
  music.play('home', { fade: 2 });
  await game.fadeIn(1.2);
}

function addPie(w) {
  if (w.room.props.get('pie')) return;
  w.room.addProp({
    t: 'custom', id: 'pie', x: 0.5, z: 1.2, build: pieSlice, solid: null, reach: 1.2, promptY: 0.6,
    run: async (ww) => {
      if (await ww.pickup('honey_pie', '(A slice of honeybark pie was left for you. You got the Honeybark Pie.)')) {
        setFlag('pieTaken');
        ww.room.removeProp('pie');
      }
    },
  });
}

function boxText() {
  return ['(A box of old toys.)', '(A pair of dancing slippers. A deck of cards. A toy knife made of plastic.)', '(They all look well-loved.)'];
}

function drawerText() {
  const e = SOULS[S.soul].echo;
  return ['(A drawer full of children\'s clothes, in many sizes.)', `(Something in your chest feels very quiet. ${e} doesn't say anything.)`];
}

async function willowChat(w) {
  const c = await w.ask('willow', ['Oh, you are awake! Did you sleep well?', 'Is there something you want to talk about?'], ['What are you reading?', 'How do I leave?']);
  if (c === 0) {
    return w.say('willow', ['"Seventy-Two Uses For Cinnamon." It is a thrilling read.', 'Number thirty-one: calming a nervous child.', 'I have tried it. It works.']);
  }
  const n = S.flags.askLeave || 0;
  S.flags.askLeave = n + 1;
  if (n === 0) return w.say('willow', ['...', 'Would you like to hear about snails instead?']);
  await w.say('willow', ['...', 'Wait here. There is something I have to do.']);
  setFlag('willowBasement');
  const wl = w.npc('willow');
  await walkPath(wl, [[4.5, -0.5], [10, -0.5], [10, -6.8]], 2.6);
  w.removeNpc('willow');
}

async function sprigIntro(b) {
  const e = b.enemies[0];
  const sprig = e.model.userData;
  sprig.setExpr('neutral');
  await b.speak([[e, 'See that heart? That\'s your SOUL! The very middle of you!']]);
  await b.speak([[e, 'It starts out weak, but you can make it stronger with LOVE.']]);
  await b.speak([[e, 'Down here, LOVE comes in little white seeds. I\'ll share some! Catch as many as you can!']]);
  const line = echoLine('sprig');
  if (line) await say(line.spk, line.pages);
  const before = S.hp;
  await b.dodge([{ p: 'sprig_pellets', e, box: [230, 170], time: 5 }]);
  if (S.hp < before) {
    S.hp = 1;
    sprig.setExpr('evil');
    music.stop(0);
    await b.speak([[e, 'Hee hee hee. You really fell for that.']]);
    await b.speak([[e, 'Nobody down here SHARES anything, dummy. It\'s grab, or get grabbed.']]);
  } else {
    await b.speak([[e, 'Hey, buddy. You missed them. All of them.']]);
    sprig.setExpr('evil');
    music.stop(0);
    await b.speak([[e, '...Oh. You KNOW. Somebody\'s whispering to you.']]);
    await b.speak([[e, 'Doesn\'t matter who. They already lost once.']]);
  }
  await b.speak([[e, 'DIE.']]);
  b.fx.invulnStart = 20;
  const run = b.dodge([{ p: 'sprig_ring', e, box: [230, 170], time: 3.4 }]);
  await run;
  // a leaf of fire hits Sprig
  sfx.fire();
  game.flash(0.8);
  sfx.hitEnemy(1.3);
  const m = e.model;
  await game.tween(0.5, (k) => { m.position.x = k * 7; m.rotation.z = -k * 6; m.position.y = Math.sin(k * Math.PI) * 1.5; });
  m.visible = false;
  await game.wait(0.6);
  await game.fadeOut(0.5);
  return { outcome: 'saved' };
}
