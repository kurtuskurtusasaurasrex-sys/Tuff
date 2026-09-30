// Boss fights. Each has its own rules for mercy, and its own story.
import { S, setFlag, flag } from '../core/save.js';
import { say } from '../ui/dialogue.js';
import { echoLine } from '../story/echoes.js';
import { SOULS } from '../data/souls.js';
import { sfx } from '../audio/sfx.js';
import { music } from '../audio/sequencer.js';
import { game } from '../core/game.js';
import { maxHp } from '../data/stats.js';

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const echoName = () => SOULS[S.soul].echo;

export const BOSSES = {
  // Sprig, the first time. The battle is a trap; Willow arrives.
  sprig: {
    name: 'Sprig', model: 'sprig', hp: 999, atk: 2, def: 99, exp: 0, gold: 0, boss: true, music: 'sprig', voice: 'sprig',
    talk: ['...'], attacks: ['nothing'],
  },

  // --------------------------------------------------------------- Willow
  willow: {
    name: 'Willow', model: 'willow', hp: 440, atk: 6, def: 1, exp: 150, gold: 0, hope: 20, boss: true, music: 'queen_battle', voice: 'willow',
    intro: '* Willow blocks the way!',
    check: 'Caretaker of the Hollows. Knows what is best for you.',
    flavor: ['* Willow looks through you.', '* Willow is acting as if nothing is happening.', '* Willow\'s hands are shaking.', '* Willow is holding her breath.'],
    lowFlavor: '* Willow is barely standing.',
    acts: [
      { name: 'Talk', run: (b, e) => { e.state.mercyTurns = (e.state.mercyTurns || 0) + 1; return { text: pick(['* You ask Willow to let you through.\n* She looks away.', '* You tell Willow you\'ll be okay.\n* Her fire flickers.', '* You couldn\'t think of what to say.']) }; } },
      { name: 'Plead', run: (b, e) => { e.state.mercyTurns = (e.state.mercyTurns || 0) + 1; return { text: '* You tell Willow you have to go home.\n* "Home is here now," she says. She doesn\'t sound sure.' }; } },
    ],
    async onSpareAttempt(b, e) {
      e.state.mercyTurns = (e.state.mercyTurns || 0) + 1;
      const n = e.state.mercyTurns;
      if (n >= 6) {
        await b.speak([[e, '...That light.']]);
        await b.speak([[e, 'That SOUL. I know that SOUL.']]);
        await b.speak([[e, `${echoName()}...? Is that you?`]]);
        const line = echoLine('willow');
        if (line) await say(line.spk, [`Hi, Willow.`, 'I\'m sorry I never came back.']);
        await b.speak([[e, 'I held your hand at this very door. I let you go, and you did not come back.']]);
        await b.speak([[e, 'And now you come back to me... inside a child who will not even raise a hand to me.']]);
        await b.speak([[e, 'Go, then. Both of you. Please... be careful.']]);
        e.spareable = true;
        await b.spareOne(e);
        setFlag('willowSpared');
        b.end({ outcome: 'spared' });
        return 'handled';
      }
      await b.boxText(`* You spared Willow.\n* ${['...', 'Willow does not move.', 'Willow\'s fire wavers.', 'Willow looks at you for a long time.', 'Willow looks at your chest. At the light in it.'][Math.min(4, n - 1)]}`);
      return 'handled';
    },
    say(b, e) {
      const n = e.state.mercyTurns || 0;
      if (e.hp < e.maxhp * 0.4) return pick(['...', 'Stop it...', 'Why won\'t you just...']);
      return ['...', '...', 'What are you doing?', 'Attack or run away!', 'Why are you looking at me like that?', 'Please... do not make this harder.'][Math.min(5, n)];
    },
    attack(b, e) {
      const low = S.hp < maxHp() * 0.3 || e.hp < e.maxhp * 0.4;
      const list = [{ p: 'willow_rain', params: { gentle: low } }, { p: 'willow_hands', params: { avoid: low } }, { p: 'willow_spiral', params: { avoid: low } }];
      return { ...list[e.turns % 3], box: [220, 170] };
    },
    async onKill(b, e) {
      music.stop(0);
      await b.speak([[e, 'Ah...']]);
      await b.speak([[e, 'You are... stronger than I thought...']]);
      await b.speak([[e, 'Listen, child. When you leave the Hollows... be good. Won\'t you?']]);
      setFlag('willowKilled');
    },
  },

  // --------------------------------------------------------------- Frostmere
  taper: {
    name: 'Taper', model: 'taper', hp: 680, hpFn: () => (flag('genoActive') && !flag('genoAborted') ? 1 : 680), captures: true, atk: 5, def: 12, exp: 0, gold: 0, hope: 25, boss: true, music: 'taper_battle', voice: 'taper', font: 'TaperFont', stage: 'frostmere',
    intro: '* Taper blocks the way! Heroically!',
    check: 'He wants to join the Royal Guard. He practices his poses every morning.',
    flavor: ['* Taper is striking a pose.', '* Taper is thinking about what to wear for his victory party.', '* Taper\'s flame is burning very bright.', '* Taper is humming his own theme.'],
    spareFlavor: '* Taper is exhausted from being so great.',
    acts: [
      { name: 'Flirt', run: (b, e) => { e.state.flirt = true; e.state.mercyTurns = (e.state.mercyTurns || 0) + 1; return { text: '* You tell Taper his flame looks nice today.\n* Taper\'s flame turns pink. "N-NYEH?!"' }; } },
      { name: 'Insult', run: (b, e) => { e.state.mercyTurns = (e.state.mercyTurns || 0) + 1; return { text: '* You tell Taper his puzzles were too easy.\n* "WHAT?! THEN THIS WILL BE HARDER!"' }; } },
      { name: 'Cheer', run: (b, e) => { e.state.mercyTurns = (e.state.mercyTurns || 0) + 1; return { text: '* You cheer for Taper.\n* He is so moved he almost forgets to attack.' }; } },
    ],
    say(b, e) {
      const n = e.turns;
      return ['NYEH HEH HEH! PREPARE FOR MY SPECIAL ATTACK!', 'I, THE GREAT TAPER, WILL CAPTURE YOU!', 'THEN I\'LL BE IN THE ROYAL GUARD! EVERYONE WILL LIKE ME!', 'WAIT. I THINK EVERYONE ALREADY LIKES ME?', 'YOU\'RE PRETTY GOOD AT DODGING, HUMAN!', 'OKAY, THIS IS IT! MY COOL DUDE SPECIAL!', 'HUFF... HUFF... WELL. IT SEEMS YOU CAN\'T DEFEAT ME!'][Math.min(6, n)];
    },
    attack(b, e) {
      const n = e.turns;
      if (n === 5) return { p: 'taper_cool', box: [260, 140], time: 6 };
      return [{ p: 'taper_jumps', box: [260, 140] }, { p: 'taper_wave', box: [260, 140] }, { p: 'taper_jumps', params: { count: 8, speed: 180 }, box: [260, 140] }][n % 3];
    },
    async onTurn(b, e) {
      if (e.turns >= 6 && !e.spareable) {
        e.spareable = true;
        e.mercy = 100;
      }
    },
    async onSpareAttempt(b, e) {
      if (!e.spareable) return undefined;
      await b.speak([[e, 'NYEH... YOU WON\'T FIGHT BACK? YOU JUST WANT TO... BE FRIENDS?']]);
      await b.speak([[e, 'WELL! I, THE GREAT TAPER, ACCEPT YOUR FRIENDSHIP!']]);
      await b.spareOne(e);
      setFlag('taperSpared');
      b.end({ outcome: 'spared' });
      return 'handled';
    },
    async onKill(b, e) {
      music.stop(0);
      await b.speak([[e, 'WELL... THAT\'S NOT WHAT I EXPECTED...']]);
      await b.speak([[e, 'BUT... I STILL BELIEVE IN YOU! YOU CAN DO BETTER! I KNOW IT!']]);
      setFlag('taperKilled');
    },
  },

  // --------------------------------------------------------------- Echofall
  maris: {
    name: 'Maris', model: 'maris', hp: 1200, atk: 7, def: 10, exp: 500, gold: 0, hope: 30, boss: true, music: 'maris_battle', voice: 'maris', stage: 'echofall',
    intro: '* Captain Maris attacks!',
    check: 'Captain of the Royal Guard. She will not stop until she has your SOUL.',
    hint: 'She won\'t stop. But she will tire. Survive.',
    flavor: ['* Maris points her spear at you.', '* Maris is grinning with every tooth.', '* The water around you is shaking.', '* Maris cracks her knuckles.'],
    spareFlavor: '* Maris is too exhausted to keep fighting. Now\'s your chance.',
    acts: [
      { name: 'Plead', run: (b, e) => { e.state.plead = (e.state.plead || 0) + 1; return { text: '* You tell Maris you didn\'t come here to hurt anyone.\n* "EVERY human says that!"' }; } },
      { name: 'Challenge', run: (b, e) => { e.state.hard = true; return { text: '* You tell Maris to give it everything she\'s got.\n* She laughs. "NOW we\'re talking!"' }; } },
    ],
    say(b, e) {
      return ['You\'re going to feel every one of these!', 'Seven SOULs and we go free. Yours is the seventh!', 'Why won\'t you just STAY DOWN?!', 'Humans took everything from us!', 'Is that all you\'ve got?!', 'You... just keep... standing up...', 'Fine. FINE! I\'m not done yet!', 'Huff... huff...'][Math.min(7, e.turns)];
    },
    attack(b, e) {
      const n = e.turns;
      const list = [
        { p: 'spear_guard', params: { count: 12 }, box: [160, 160] },
        { p: 'spear_rain', box: [220, 170] },
        { p: 'spear_guard', params: { count: 16, speed: 200, reverse: n > 3 }, box: [160, 160] },
        { p: 'spear_rows', box: [240, 160] },
      ];
      return { ...list[n % 4], density: e.state.hard ? 1.3 : 1 };
    },
    async onTurn(b, e) {
      if (e.turns >= 7 && !e.spareable) { e.spareable = true; e.mercy = 100; }
    },
    async onSpareAttempt(b, e) {
      if (!e.spareable) return undefined;
      await b.speak([[e, 'Why... do you keep... sparing me...']]);
      await b.speak([[e, '...Get out of here. Before I change my mind.']]);
      await b.spareOne(e);
      setFlag('marisSpared');
      b.end({ outcome: 'spared' });
      return 'handled';
    },
    async onKill(b, e) {
      if (!e.state.undying && flag('genoActive') && !flag('genoAborted')) {
        e.state.undying = true;
        e.hp = e.maxhp * 1.2;
        e.maxhp = e.hp;
        music.stop(0);
        await b.speak([[e, 'No...']]);
        await b.speak([[e, 'Not yet. Not while everyone is counting on me.']]);
        await b.speak([[e, 'I won\'t die. I REFUSE to die!']]);
        e.def = { ...e.def, name: 'Maris the Unbroken', atk: 10, flavor: ['* Maris is holding herself together by will alone.'] };
        music.play('last_flame');
        return 'survive';
      }
      music.stop(0);
      await b.speak([[e, 'Heh... so that\'s how it is...']]);
      await b.speak([[e, 'Everyone... I\'m sorry...']]);
      setFlag('marisKilled');
    },
  },

  // --------------------------------------------------------------- Emberdeep
  silk: {
    name: 'Madame Silk', model: 'silk', hp: 800, atk: 7, def: 6, exp: 300, gold: 100, hope: 25, boss: true, music: 'silk', voice: 'silk', stage: 'emberdeep',
    intro: '* Madame Silk has you in her web!',
    check: 'Runs a bake sale for spiders. Heard humans don\'t tip.',
    hint: 'Buy something. Or survive until she\'s satisfied.',
    flavor: ['* Madame Silk pours a cup of tea.', '* The smell of pastry fills the air.', '* Madame Silk is counting her coins.'],
    spareFlavor: '* Madame Silk is satisfied.',
    acts: [
      { name: 'Pay', run: (b, e) => { if (S.gold >= 30) { S.gold -= 30; e.state.paid = true; return { mercy: 100, text: '* You pay 30G for a tart.\n* "Oh, a CUSTOMER! Why didn\'t you say so, dearie?"' }; } return { text: '* You don\'t have enough gold.\n* Madame Silk tuts.' }; } },
      { name: 'Compliment', mercy: 25, text: '* You compliment the pastries.\n* "Flattery won\'t pay the rent, dearie. But go on."' },
    ],
    say: (b, e) => pick(['Humans stepped on my cousins, you know.', 'A little something for the spiders!', 'Ahuhuhu~', 'Don\'t struggle, dearie.']),
    attack: (b, e) => ({ p: 'silk_lanes', params: { count: 12 + e.turns * 2 }, box: [260, 150] }),
    async onTurn(b, e) { if (e.turns >= 6 && !e.spareable) { e.spareable = true; e.mercy = 100; } },
    async onKill() { setFlag('silkKilled'); },
    async onSpare() { setFlag('silkSpared'); },
  },

  luxe: {
    name: 'LUXE NOVA', model: 'luxe_nova', hp: 1000, atk: 8, def: 8, exp: 700, gold: 200, hope: 30, boss: true, music: 'luxe_battle', voice: 'luxe', stage: 'emberdeep',
    intro: '* LUXE NOVA takes the stage!',
    check: 'The Underground\'s biggest star. Every star wants more stars watching.',
    hint: 'Give the audience a show. Watch the ratings.',
    flavor: ['* LUXE strikes a pose. The ratings climb.', '* The spotlights are blinding.', '* Somewhere, a thousand monsters are watching.'],
    spareFlavor: '* The ratings are through the roof.',
    acts: [
      { name: 'Pose', run: (b, e) => ({ mercy: 20, text: '* You strike a dramatic pose.\n* The ratings go up!' }) },
      { name: 'Boast', run: (b, e) => ({ mercy: 25, text: '* You tell the audience you\'re the real star.\n* LUXE is furious. The audience LOVES it.' }) },
      { name: 'Heal', run: (b, e) => ({ mercy: 15, text: '* You catch your breath on camera.\n* Somehow, this is great television.' }) },
    ],
    say: (b, e) => ['OOOH, darling! Let\'s give them a SHOW!', 'The ratings, darling! Look at them!', 'Smile for the camera!', 'You\'re stealing my spotlight!', 'Is it hot in here or is it just ME?', 'Darling... the audience adores you.'][Math.min(5, e.turns)],
    attack: (b, e) => [{ p: 'luxe_targets', box: [240, 170] }, { p: 'luxe_legs', box: [220, 160] }, { p: 'luxe_disco', box: [220, 160] }][e.turns % 3],
    async onTurn(b, e) {
      e.mercy = Math.min(100, e.mercy + 8);
      if (e.mercy >= 100) e.spareable = true;
    },
    async onSpareAttempt(b, e) {
      if (!e.spareable) return undefined;
      await b.speak([[e, 'Darling... the phones are ringing. They want us BOTH.']]);
      await b.speak([[e, 'I\'ve never had a co-star before. It\'s... rather nice.']]);
      await b.spareOne(e);
      setFlag('luxeSpared');
      b.end({ outcome: 'spared' });
      return 'handled';
    },
    async onKill() { setFlag('luxeKilled'); },
  },
};

export { sfx, game };
