// Monsters met in random encounters. Bosses live in bosses.js.
// Each ACT can be spared through; FIGHT is always an option.
import { BOSSES } from './bosses.js';

const acts = (list) => list;

const MONSTERS = {
  // ---------------------------------------------------------------- Hollows
  croakle: {
    name: 'Croakle', model: 'croakle', hp: 24, atk: 3, def: 0, exp: 3, gold: 2, hope: 3,
    intro: '* Croakle hops into your way!',
    check: 'It wants to be friends, but it only knows two words and neither of them is "friend".',
    flavor: ['* Croakle croaks at nothing in particular.', '* Croakle hops in place, just to show that it can.', '* The smell of pond water.'],
    spareFlavor: '* Croakle seems ready to hop along.',
    talk: ['Ribbit?', 'Croak.', 'Rrribbit!', '(nervous croak)'],
    spareTalk: ['Ribbit!! (happy)'],
    acts: acts([
      { name: 'Compliment', mercy: 100, text: '* You tell Croakle it has a lovely croak.\n* Croakle doesn\'t understand you, but it\'s blushing anyway.' },
      { name: 'Ribbit', mercy: 50, text: '* You ribbit at Croakle.\n* Croakle looks thrilled that someone finally speaks its language.' },
      { name: 'Threaten', mercy: 100, text: '* You make a scary face.\n* Croakle gets the message and would like to leave now.' },
    ]),
    attacks: ['fly_swarm', 'frog_hop'],
  },

  flutterby: {
    name: 'Flutterby', model: 'flutterby', hp: 12, atk: 3, def: 0, exp: 2, gold: 2, hope: 3, startMercy: 30,
    intro: '* Flutterby flutters up apologetically.',
    check: 'Too shy to attack and too shy to leave. It fights in apology.',
    flavor: ['* Flutterby is fluttering apologetically.', '* Flutterby hides behind its own wings.', '* A dusting of moth powder drifts down.'],
    spareFlavor: '* Flutterby looks like it would like to go home.',
    talk: ['Sorry...', 'I d-don\'t want to...', '(flutter)', 'Is it over yet?'],
    acts: acts([
      { name: 'Console', mercy: 100, text: '* You tell Flutterby it\'s okay to be scared.\n* Flutterby sniffles gratefully.' },
      { name: 'Shoo', mercy: 50, text: '* You wave your arms.\n* Flutterby flutters a little further away.' },
    ]),
    attacks: ['tears', 'hush_sigh'],
  },

  ogleye: {
    name: 'Ogleye', model: 'ogleye', hp: 40, atk: 4, def: 1, exp: 5, gold: 3, hope: 4,
    intro: '* Ogleye is staring at you.',
    check: 'Stares at everyone. Nobody ever stares back, so it assumes it is winning.',
    hint: 'Stare back, or compliment the eye.',
    flavor: ['* Ogleye blinks slowly. Deliberately.', '* Ogleye is looking right at you.', '* Smells like eye drops.'],
    spareFlavor: '* Ogleye is looking at its feet.',
    talk: ['...', 'I see you.', 'Stare.', 'Don\'t blink.'],
    acts: acts([
      { name: 'Stare back', run: (b, e) => ({ mercy: 35, text: e.acts['Stare back'] >= 3 ? '* You stare at Ogleye.\n* Ogleye stares harder. You stare harder.[P]\n* Ogleye blinks first. It looks... respectful.' : '* You stare at Ogleye. It stares back. Neither of you moves.' }) },
      { name: 'Compliment', mercy: 100, text: '* You tell Ogleye it has a beautiful eye.\n* Ogleye is so flattered it can\'t look at you anymore.' },
    ]),
    attacks: ['stare', { p: 'homing', params: { count: 4 } }],
  },

  rootle: {
    name: 'Rootle', model: 'rootle', hp: 36, atk: 4, def: 1, exp: 5, gold: 4, hope: 4,
    intro: '* Rootle pops out of the soil, disappointed in you already.',
    check: 'A root vegetable with strong opinions about your diet. Green bullets are good for you.',
    flavor: ['* Rootle is judging your eating habits.', '* Rootle mutters about fiber.', '* Smells like soup.'],
    spareFlavor: '* Rootle seems satisfied with your nutrition.',
    talk: ['Eat your greens!', 'Fiber! FIBER!', 'Vitamins are NOT optional.', 'Grumble.'],
    acts: acts([
      { name: 'Snack', mercy: 50, text: '* You take a bite of a nearby leaf.\n* Rootle nods, impressed.' },
      { name: 'Promise', mercy: 60, text: '* You promise to eat better.\n* Rootle doesn\'t believe you... but wants to.' },
    ]),
    attacks: ['veggie'],
  },

  scuttle: {
    name: 'Scuttle', model: 'scuttle', hp: 30, atk: 4, def: 2, exp: 4, gold: 5, hope: 3,
    intro: '* Scuttle scuttles in! There might be more of them.',
    check: 'Acts tough in a crowd. Alone, it\'s just a bug with good posture.',
    flavor: ['* Scuttle is doing its best intimidating posture.', '* Scuttle checks behind itself for backup.', '* Tiny footsteps. So many tiny footsteps.'],
    spareFlavor: '* Scuttle has lost the will to scuttle.',
    talk: ['We are MANY.', 'Scuttle scuttle.', '...where is everyone?'],
    acts: acts([
      { name: 'Isolate', run: (b) => (b.alive().length === 1 ? { mercy: 100, text: '* You point out that Scuttle is all alone.\n* Its shell trembles. It\'s just a small bug after all.' } : { mercy: 20, text: '* You try to single out Scuttle, but its friend is right there.' }) },
      { name: 'Praise shell', mercy: 45, text: '* You praise Scuttle\'s shell. It is very shiny.\n* Scuttle polishes it proudly.' },
    ]),
    attacks: ['scuttle_run'],
  },

  straw: {
    name: 'Scarecrow', model: 'straw', hp: 15, atk: 0, def: 0, exp: 0, gold: 0, hope: 1,
    intro: '* You encountered the Scarecrow.',
    check: 'A practice scarecrow. Stuffed with straw and good intentions.',
    flavor: ['* The scarecrow stands there.', '* The scarecrow is a scarecrow.'],
    spareFlavor: '* The scarecrow seems content.',
    talk: [''],
    music: null,
    acts: acts([
      { name: 'Talk', mercy: 100, text: '* You talk to the scarecrow.\n* It doesn\'t seem much for conversation.\n* Somewhere behind you, Willow seems pleased.' },
    ]),
    attacks: ['nothing'],
  },

  hush: {
    name: 'Hush', model: 'hush', hp: 80, atk: 3, def: 0, exp: 0, gold: 0, hope: 8, music: 'hush', voice: 'hush',
    intro: '* Here comes Hush.',
    check: 'A moth-ghost who comes to the Hollows to be alone. Very, very shy.',
    flavor: ['* Hush is floating quietly.', '* Hush looks like they want to be somewhere else.', '* Hush\'s wings droop.'],
    spareFlavor: '* Hush seems to feel a little better.',
    say: (b, e) => (e.mercy >= 60 ? ['heh...', 'that was nice...'] : ['...', 'sorry...', 'i\'m not good at this...', 'oh no...'])[e.turns % 2],
    acts: [
      { name: 'Cheer', run: (b, e) => ({ mercy: 34, text: ['* You tell Hush they have lovely wings.\n* Hush\'s wings twitch.', '* You tell Hush a joke.\n* "heh..." Hush almost smiles.', '* You tell Hush you\'re glad you met them.\n* Hush turns a little pink.'][Math.min(2, (e.acts.Cheer || 1) - 1)] }) },
      { name: 'Sit together', mercy: 25, text: '* You sit on the leaves next to Hush.\n* Neither of you says anything. It\'s nice.' },
    ],
    attacks: ['hush_sigh', 'tears'],
    async onKill(b, e) {
      await b.speak([[e, 'oh... i\'m a ghost... that doesn\'t really work on me...']]);
      await b.speak([[e, 'i\'ll just... go...']]);
      e.alive = false; e.gone = true;
      b.stage.spare(e);
      b.end({ outcome: 'hush_left' });
      return 'survive';
    },
  },

  // ---------------------------------------------------------------- Frostmere
  frostbeak: {
    name: 'Frostbeak', model: 'frostbeak', hp: 55, atk: 5, def: 2, exp: 12, gold: 10, hope: 5,
    intro: '* Frostbeak waddles up to perform.',
    check: 'Tells ice puns. The puns are thin ice. Please laugh.',
    flavor: ['* Frostbeak is waiting for a laugh.', '* Frostbeak adjusts its scarf for comedic effect.', '* Smells like a mint.'],
    spareFlavor: '* Frostbeak is basking in applause that isn\'t there.',
    say: (b, e) => ['Why did the snowman retire? A total meltdown!', 'Ice to meet you!', 'I\'m a bit of a frosty character.', 'Snow way you\'re not laughing.'][e.turns % 4],
    acts: acts([
      { name: 'Laugh', mercy: 100, text: '* You laugh at Frostbeak\'s joke.\n* Frostbeak is overjoyed. Someone finally gets it.' },
      { name: 'Heckle', mercy: 50, text: '* You tell Frostbeak its jokes are cold.\n* ...Frostbeak takes that as a pun and is delighted.' },
    ]),
    attacks: ['snow_puns', 'ice_bounce'],
  },

  chilly: {
    name: 'Chilly', model: 'chilly', hp: 50, atk: 5, def: 2, exp: 11, gold: 12, hope: 5,
    intro: '* Chilly tips its hat at you.',
    check: 'Believes the hat makes the cube. It might be right.',
    flavor: ['* Chilly straightens its hat.', '* Chilly is showing off its hat.', '* Chilly is sweating slightly. It is ice.'],
    spareFlavor: '* Chilly is having the best day of its life.',
    talk: ['Nice hat, right?', 'The hat. Look at it.', 'Brr-illiant.'],
    acts: acts([
      { name: 'Admire hat', mercy: 100, text: '* You admire Chilly\'s hat.\n* Chilly glows with pride. It is, briefly, the coolest ice cube alive.' },
      { name: 'Ignore hat', mercy: 30, text: '* You don\'t mention the hat.\n* Chilly is devastated and melts a little.' },
    ]),
    attacks: ['ice_bounce', 'snow_puns'],
  },

  pupguard: {
    name: 'Sentry Pup', model: 'pupguard', hp: 60, atk: 6, def: 3, exp: 15, gold: 20, hope: 6, music: 'dogguard',
    intro: '* Sentry Pup blocks the way!',
    check: 'A Royal Guard trainee. Its neck grows when it is petted. There is no known upper limit.',
    flavor: ['* Sentry Pup wags. Professionally.', '* Sentry Pup is on duty.', '* Sentry Pup is thinking about being petted.'],
    spareFlavor: '* Sentry Pup has forgotten what it was guarding.',
    talk: ['Bark!', 'Halt!', '(wag wag)', '(pant pant)'],
    acts: acts([
      {
        name: 'Pet', run: (b, e) => {
          const n = e.acts.Pet;
          e.model.userData.stretch = Math.min(3, n * 0.8);
          const lines = ['* You pet Sentry Pup.\n* Its neck stretches a little!', '* You pet Sentry Pup again.\n* Its neck keeps growing!', '* You can barely reach it now.\n* The neck goes up and up and up.', '* Sentry Pup\'s head is in the clouds.\n* It is very happy up there.'];
          return { mercy: 34, text: lines[Math.min(3, n - 1)] };
        },
      },
      { name: 'Fetch', mercy: 40, text: '* You throw a snowball.\n* Sentry Pup brings back a different snowball. Good dog.' },
    ]),
    attacks: ['sword_swipe'],
  },

  snoot: {
    name: 'The Snoots', model: 'snoot', hp: 90, atk: 6, def: 4, exp: 25, gold: 30, hope: 8, music: 'dogguard',
    intro: '* Sir and Madam Snoot approach, sniffing the air.',
    check: 'A married pair of guards. They find things by smell, which you currently do not have.',
    hint: 'Roll in the snow, then pet each of them.',
    flavor: ['* The Snoots are sniffing in unison.', '* Madam Snoot whispers something to Sir Snoot.', '* The axes are very shiny.'],
    spareFlavor: '* The Snoots are too happy to fight.',
    say: (b, e) => (e.state.smelly ? ['What IS that smell?', 'It smells like... a puppy?'] : ['We smell a human.', 'Sniff sniff.'])[e.turns % 2],
    acts: acts([
      { name: 'Roll around', run: (b, e) => { e.state.smelly = true; return { mercy: 20, text: '* You roll around in the snow.\n* Now you smell like a dog. The Snoots are confused.' }; } },
      { name: 'Pet Sir', run: (b, e) => (e.state.smelly ? { mercy: 40, text: '* You pet Sir Snoot.\n* He is shocked. Dogs can pet dogs?' } : { mercy: 0, text: '* You reach out. Sir Snoot swats your hand away with his axe handle.' }) },
      { name: 'Pet Madam', run: (b, e) => (e.state.smelly ? { mercy: 40, text: '* You pet Madam Snoot.\n* Her tail sweeps the snow clean.' } : { mercy: 0, text: '* Madam Snoot growls. She doesn\'t know you.' }) },
    ]),
    attacks: ['axe_sweep'],
  },

  blinky: {
    name: 'Blinky', model: 'blinky', hp: 70, atk: 6, def: 3, exp: 18, gold: 25, hope: 6, music: 'dogguard',
    intro: '* Blinky squints in your general direction.',
    check: 'Can only see things that move. Hold still and you practically don\'t exist. Cyan attacks are harmless if you\'re still.',
    flavor: ['* Blinky puffs on an unlit pipe.', '* Blinky is scanning for movement.', '* Blinky\'s shades are very dark.'],
    spareFlavor: '* Blinky is wagging so hard it can\'t see anything.',
    talk: ['Something moved...', 'I saw that.', 'Did I?'],
    acts: acts([
      { name: 'Stand still', run: (b, e) => { e.state.still = true; return { mercy: 40, text: '* You stand perfectly still.\n* Blinky can\'t find you. It\'s baffled.' }; } },
      { name: 'Wave', run: (b, e) => (e.state.still ? { mercy: 60, text: '* You wave at Blinky.\n* It sees you! It\'s so relieved you exist that it wags.' } : { mercy: 20, text: '* You wave. Blinky sees you and raises its guard.' }) },
    ]),
    attacks: ['blinky_still'],
  },

  // ---------------------------------------------------------------- Echofall
  flexel: {
    name: 'Flexel', model: 'flexel', hp: 90, atk: 6, def: 4, exp: 22, gold: 20, hope: 7,
    intro: '* Flexel swims up, flexing.',
    check: 'Flexes when nervous. Is always nervous.',
    flavor: ['* Flexel is flexing at you.', '* Flexel\'s fins are glistening.', '* Smells like salt and protein powder.'],
    spareFlavor: '* Flexel is too pumped to keep fighting.',
    talk: ['Check these fins.', 'Do you even swim?', 'FLEX!', 'Hydrate!'],
    acts: acts([
      { name: 'Flex', mercy: 50, text: '* You flex.\n* Flexel is impressed... and a little threatened. It flexes harder.' },
      { name: 'Compliment', mercy: 50, text: '* You compliment Flexel\'s fins.\n* Flexel blushes a deep coral.' },
    ]),
    attacks: ['dumbbells'],
  },

  scrubble: {
    name: 'Scrubble', model: 'scrubble', hp: 80, atk: 6, def: 3, exp: 20, gold: 18, hope: 7,
    intro: '* Scrubble sloshes toward you with purpose.',
    check: 'Wants to clean you. Wants to clean everything. Especially you.',
    flavor: ['* Scrubble is scrubbing the air.', '* Bubbles everywhere.', '* Smells like lavender.'],
    spareFlavor: '* Scrubble is admiring how clean everything is.',
    talk: ['You\'re FILTHY.', 'Bath time!', 'Scrub-a-dub.'],
    acts: acts([
      { name: 'Accept bath', mercy: 100, text: '* You let Scrubble give you a quick scrub.\n* You feel like a new person. Scrubble is ecstatic.' },
      { name: 'Refuse', mercy: 20, text: '* You refuse the bath.\n* Scrubble looks at you with great pity.' },
    ]),
    attacks: ['bubbles_up'],
  },

  gloop: {
    name: 'Gloop', model: 'gloop', hp: 70, atk: 6, def: 3, exp: 18, gold: 15, hope: 6,
    intro: '* Gloop jiggles into view.',
    check: 'Mostly water. Partly feelings.',
    flavor: ['* Gloop wobbles contentedly.', '* Gloop is making a squelching noise.', '* Gloop is reflecting the light nicely.'],
    spareFlavor: '* Gloop is wiggling happily.',
    talk: ['Blorp.', 'Squish.', 'Wobble wobble.'],
    acts: acts([
      { name: 'Wiggle', mercy: 100, text: '* You wiggle.\n* Gloop wiggles back. A connection has been made.' },
      { name: 'Poke', mercy: 30, text: '* You poke Gloop. It jiggles for a very long time.' },
    ]),
    attacks: ['gloop_drops'],
  },

  melodie: {
    name: 'Melodie', model: 'melodie', hp: 85, atk: 6, def: 3, exp: 24, gold: 22, hope: 8,
    intro: '* Melodie peeks out from her shell.',
    check: 'Sings to herself when she thinks no one is listening. You are listening.',
    flavor: ['* Melodie hums a few notes, then stops.', '* Melodie is hiding in her shell.', '* The water sounds like a song.'],
    spareFlavor: '* Melodie is singing freely.',
    say: (b, e) => (e.state.hummed ? ['La la la...', '(humming along)'] : ['...', '(shy humming)', 'Don\'t listen...'])[e.turns % 2],
    acts: acts([
      { name: 'Hum', run: (b, e) => { e.state.hummed = true; return { mercy: 40, text: '* You hum a little tune.\n* Melodie joins in, very softly.' }; } },
      { name: 'Listen', mercy: 35, text: '* You listen closely.\n* Melodie notices, turns pink, and keeps singing anyway.' },
      { name: 'Boo', mercy: 0, text: '* You boo.\n* Melodie retreats into her shell.' },
    ]),
    attack: (b, e) => ({ p: 'notes', params: { gentle: !!e.state.hummed } }),
  },

  // ---------------------------------------------------------------- Emberdeep
  kiln: {
    name: 'Kiln', model: 'kiln', hp: 110, atk: 7, def: 5, exp: 30, gold: 28, hope: 8,
    intro: '* Kiln rumbles helpfully.',
    check: 'Wants to help. Its help is lava. It\'s the thought that counts.',
    flavor: ['* Kiln is trying its best.', '* Kiln puffs out a hopeful cloud of smoke.', '* It\'s getting warm in here.'],
    spareFlavor: '* Kiln is glowing with pride.',
    talk: ['Can I help?', 'I\'m helping!', 'Rumble rumble!'],
    acts: acts([
      { name: 'Encourage', mercy: 100, text: '* You tell Kiln it\'s doing great.\n* Kiln erupts with joy. Warmly.' },
      { name: 'Ask for help', mercy: 50, text: '* You ask Kiln for help.\n* Kiln helps by warming your hands. That was actually nice.' },
    ]),
    attacks: ['lava_spit'],
  },

  jetta: {
    name: 'Jetta', model: 'jetta', hp: 120, atk: 8, def: 5, exp: 34, gold: 30, hope: 8,
    intro: '* Jetta flies in. Not because of you or anything.',
    check: 'It is NOT flying next to you on purpose. It just happens to be going the same way.',
    flavor: ['* Jetta is pretending not to look at you.', '* Jetta is doing loops. Casually.', '* Smells like jet fuel and perfume.'],
    spareFlavor: '* Jetta is blushing. Planes can blush, apparently.',
    talk: ['It\'s not like I WANT to fight you!', 'D-don\'t get the wrong idea!', 'Hmph!', 'B-baka human!'],
    acts: acts([
      { name: 'Approach', mercy: 34, text: '* You get closer.\n* Jetta swerves away, then swerves back.' },
      { name: 'Ignore', mercy: 33, text: '* You ignore Jetta.\n* Jetta is VERY obviously pretending not to mind.' },
      { name: 'Compliment', mercy: 50, text: '* You tell Jetta its wings are nice.\n* Jetta nearly crashes.' },
    ]),
    attacks: ['planes'],
  },

  kettle: {
    name: 'Kettle', model: 'kettle', hp: 115, atk: 8, def: 5, exp: 32, gold: 34, hope: 8,
    intro: '* Kettle drops in with a beat.',
    check: 'Spits hot bars. Mostly steam.',
    flavor: ['* Kettle is whistling a beat.', '* Kettle adjusts its shades.', '* Smells like chamomile.'],
    spareFlavor: '* Kettle has reached peak steep.',
    talk: ['Yo, I\'m boiling at the mic!', 'Steep beats!', 'Whistle while I work!', 'Tea-riffic.'],
    acts: acts([
      { name: 'Beatbox', mercy: 50, text: '* You beatbox.\n* Kettle whistles along. A duet.' },
      { name: 'Applaud', mercy: 50, text: '* You applaud.\n* Kettle takes a bow. Steam everywhere.' },
    ]),
    attacks: ['steam_jets', 'lava_spit'],
  },

  guards: {
    name: 'Bolt & Nut', model: 'guards', hp: 160, atk: 9, def: 6, exp: 60, gold: 60, hope: 12, music: 'dogguard',
    intro: '* Royal Guards Bolt and Nut attack!',
    check: 'Partners in the Royal Guard. Neither has told the other how they feel, and it\'s bothering everyone.',
    hint: 'Help them say it.',
    flavor: ['* Bolt and Nut stand shoulder to shoulder.', '* Nut glances at Bolt. Bolt glances away.', '* Their armor clanks in rhythm.'],
    spareFlavor: '* Bolt and Nut are holding hands. The armor clanks.',
    say: (b, e) => ['Halt, human!', 'For the King!', 'Bolt, are you okay?', 'I\'m fine, Nut. Totally fine.'][e.turns % 4],
    acts: acts([
      { name: 'Clean armor', mercy: 30, text: '* You polish Bolt\'s armor.\n* Nut says it looks nice. Bolt\'s visor steams up.' },
      { name: 'Whisper', mercy: 35, text: '* You whisper to Nut that Bolt thinks the world of them.\n* Nut\'s ears stand straight up.' },
      { name: 'Nudge', mercy: 35, text: '* You nudge Bolt toward Nut.\n* They stumble into a very armored hug.' },
    ]),
    attacks: ['guard_combo', 'sword_swipe'],
  },

  // ---------------------------------------------------------------- Deep lab
  mergeling: {
    name: 'Mergeling', model: 'mergeling', hp: 150, atk: 7, def: 5, exp: 0, gold: 0, hope: 10, stage: 'deeplab', music: 'deep_lab',
    intro: '* Something made of many somethings comes closer.',
    check: 'Several monsters who fell asleep and woke up as one. They remember being loved.',
    hint: 'Remind them of home.',
    flavor: ['* It is breathing in several rhythms.', '* It hums a lullaby, badly, together.', '* It smells like a hospital, and like cake.'],
    spareFlavor: '* It seems to remember something warm.',
    talk: ['...home...', 'is it... time... to wake up...', 'we... remember...', 'mom...?'],
    onHit: () => 'dodged',
    acts: acts([
      { name: 'Remember', mercy: 40, text: '* You tell it about the surface, and the sun.\n* Several of its eyes close, dreaming.' },
      { name: 'Hold', mercy: 40, text: '* You hold its many hands.\n* It is cold. Then it is warm.' },
      { name: 'Hum', mercy: 40, text: '* You hum the lullaby from the Queen\'s house.\n* It knows the words. All of it knows the words.' },
    ]),
    attacks: ['melt', 'static_blocks'],
  },
};

export const ENEMIES = { ...MONSTERS, ...BOSSES };
