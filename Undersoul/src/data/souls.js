// The seven SOULs. Each one changes how you fight: a unique action on the
// X key while dodging, a passive, stat leanings, and a 12-node skill tree
// (three branches: HEART for mercy, SOUL for the mechanic, BLADE for force).
// Skill points come from both LOVE (LV) and HOPE, so any route can grow.

export const SOULS = {
  determination: {
    id: 'determination', trait: 'DETERMINATION', color: '#ff2a2a', echo: 'Rue',
    echoTitle: 'the stubborn one', item: 'a red ribbon',
    blurb: 'A heart that refuses to break. Fall, stand, try again.',
    action: 'STEEL', actionDesc: 'Press X to harden your SOUL: a moment of invulnerability.',
    passive: 'REFUSE', passiveDesc: 'Once per battle, a fatal hit leaves you at 1 HP instead.',
    stats: { hp: 0, atk: 0, def: 0 },
    tree: {
      heart: [
        { id: 'dt_holdon', name: 'Hold On', cost: 1, type: 'ability', ability: 'holdon', desc: 'SOUL skill (30%): heal 8 + your LV.' },
        { id: 'dt_stay', name: 'Stay Determined', cost: 1, type: 'passive', desc: 'REFUSE also restores 25% of your HP.' },
        { id: 'dt_word', name: 'Kind Word', cost: 2, type: 'ability', ability: 'kindword', desc: 'SOUL skill (25%): speak with conviction. +30 MERCY.' },
        { id: 'dt_keep', name: 'Keep Going', cost: 2, type: 'passive', desc: 'Heal 1 + 5% max HP at the start of each of your turns.' },
      ],
      soul: [
        { id: 'dt_nerve', name: 'Steel Nerve', cost: 1, type: 'mod', desc: 'STEEL recharges in 3s instead of 4s.' },
        { id: 'dt_temper', name: 'Tempered', cost: 1, type: 'mod', desc: 'STEEL lasts 0.8s.' },
        { id: 'dt_ember', name: 'Ember Heart', cost: 2, type: 'passive', desc: 'Grazing bullets builds RESOLVE 50% faster.' },
        { id: 'dt_checkpoint', name: 'Checkpoint', cost: 2, type: 'ability', ability: 'checkpoint', desc: 'SOUL skill (100%): full heal, and the next attack cannot hurt you for 2s.' },
      ],
      blade: [
        { id: 'dt_steady', name: 'Steady Hands', cost: 1, type: 'passive', stats: { atk: 2 }, desc: 'ATK +2.' },
        { id: 'dt_resolute', name: 'Resolute Strike', cost: 1, type: 'ability', ability: 'critnext', desc: 'SOUL skill (35%): your next FIGHT is a perfect hit x1.5.' },
        { id: 'dt_unyield', name: 'Unyielding', cost: 2, type: 'passive', stats: { def: 2, hp: 8 }, desc: 'DEF +2, max HP +8.' },
        { id: 'dt_burn', name: 'Burning Will', cost: 2, type: 'ability', ability: 'burn', desc: 'SOUL skill (60%): 20 + 3xLV damage, ignoring DEF.' },
      ],
    },
  },

  patience: {
    id: 'patience', trait: 'PATIENCE', color: '#42e8ff', echo: 'Ivo',
    echoTitle: 'the quiet one', item: 'a toy knife',
    blurb: 'Stillness is a kind of strength. Wait for the opening.',
    action: 'STILL', actionDesc: 'Hold X to slow time around you. The focus meter refills when released.',
    passive: 'CALM', passiveDesc: 'Standing still slowly restores HP while dodging.',
    stats: { hp: 4, atk: -1, def: 0 },
    tree: {
      heart: [
        { id: 'pa_breath', name: 'Deep Breath', cost: 1, type: 'ability', ability: 'breath', desc: 'SOUL skill (25%): heal 6, then regenerate during the next attack.' },
        { id: 'pa_wait', name: 'Waiting Game', cost: 1, type: 'passive', desc: 'Every ACT gives +10 extra MERCY.' },
        { id: 'pa_lull', name: 'Lull', cost: 2, type: 'ability', ability: 'lull', desc: 'SOUL skill (30%): the next attack is 30% slower. +20 MERCY.' },
        { id: 'pa_serene', name: 'Serenity', cost: 2, type: 'passive', desc: 'CALM regeneration is twice as fast.' },
      ],
      soul: [
        { id: 'pa_longer', name: 'Longer Breath', cost: 1, type: 'mod', desc: 'STILL focus lasts 3.5s instead of 2.5s.' },
        { id: 'pa_deeper', name: 'Deeper Stillness', cost: 1, type: 'mod', desc: 'STILL slows bullets to 30% instead of 45%.' },
        { id: 'pa_unhurried', name: 'Unhurried', cost: 2, type: 'passive', desc: 'Cyan bullets heal 1 HP when they pass through you while still.' },
        { id: 'pa_stopwatch', name: 'Stopwatch', cost: 2, type: 'ability', ability: 'stopwatch', desc: 'SOUL skill (70%): the next attack is frozen for its first 2.5s.' },
      ],
      blade: [
        { id: 'pa_measured', name: 'Measured Cut', cost: 1, type: 'passive', desc: 'The FIGHT cursor moves 25% slower.' },
        { id: 'pa_counter', name: 'Counter', cost: 1, type: 'passive', desc: 'After a turn without damage, your next FIGHT deals +50%.' },
        { id: 'pa_patient', name: 'Patient Strike', cost: 2, type: 'ability', ability: 'patient', desc: 'SOUL skill (40%): damage grows with every turn of the battle.' },
        { id: 'pa_hourglass', name: 'Hourglass', cost: 2, type: 'passive', stats: { hp: 10, def: 2 }, desc: 'Max HP +10, DEF +2.' },
      ],
    },
  },

  bravery: {
    id: 'bravery', trait: 'BRAVERY', color: '#ff9a1f', echo: 'Tamsin',
    echoTitle: 'the loud one', item: 'a pair of scuffed gloves',
    blurb: 'Charge in. Being afraid and going anyway is the whole point.',
    action: 'DASH', actionDesc: 'Press X to dash in the direction you move, briefly untouchable.',
    passive: 'VALOR', passiveDesc: 'You move 20% faster and FIGHT deals 15% more.',
    stats: { hp: -2, atk: 2, def: 0 },
    tree: {
      heart: [
        { id: 'br_rally', name: 'Rally', cost: 1, type: 'ability', ability: 'rally', desc: 'SOUL skill (25%): ATK +4 and DEF +2 for 3 turns.' },
        { id: 'br_face', name: 'Brave Face', cost: 1, type: 'passive', desc: 'The first attack of each battle deals 20% less.' },
        { id: 'br_stand', name: 'Stand Up For', cost: 2, type: 'ability', ability: 'standup', desc: 'SOUL skill (30%): defend them from themselves. +35 MERCY.' },
        { id: 'br_heroic', name: 'Heroic', cost: 2, type: 'passive', desc: 'Below 30% HP, all damage taken is reduced by 30%.' },
      ],
      soul: [
        { id: 'br_quick', name: 'Quick Feet', cost: 1, type: 'mod', desc: 'DASH recharges in 0.8s.' },
        { id: 'br_after', name: 'Afterimage', cost: 1, type: 'mod', desc: 'DASH invulnerability lasts longer.' },
        { id: 'br_momentum', name: 'Momentum', cost: 2, type: 'passive', desc: 'Move another 10% faster.' },
        { id: 'br_blaze', name: 'Blaze Trail', cost: 2, type: 'mod', desc: 'Dashing through small bullets burns them away.' },
      ],
      blade: [
        { id: 'br_knuckle', name: 'Tough Knuckles', cost: 1, type: 'passive', stats: { atk: 3 }, desc: 'ATK +3.' },
        { id: 'br_flurry', name: 'Flurry', cost: 1, type: 'ability', ability: 'flurry', desc: 'SOUL skill (40%): your next FIGHT strikes three times.' },
        { id: 'br_nofear', name: 'No Fear', cost: 2, type: 'passive', desc: 'The critical window on the FIGHT bar is wider.' },
        { id: 'br_charge', name: 'Charge', cost: 2, type: 'ability', ability: 'charge', desc: 'SOUL skill (60%): next FIGHT deals double and ignores DEF.' },
      ],
    },
  },

  integrity: {
    id: 'integrity', trait: 'INTEGRITY', color: '#2f6dff', echo: 'Odette',
    echoTitle: 'the graceful one', item: 'a pair of worn ballet slippers',
    blurb: 'Stand straight. Tell the truth. Move like you mean it.',
    action: 'BLINK', actionDesc: 'Press X to step through space a short distance.',
    passive: 'POISE', passiveDesc: 'DEF +3. In gravity fields you can double jump.',
    stats: { hp: 0, atk: 0, def: 3 },
    tree: {
      heart: [
        { id: 'in_plea', name: 'Honest Plea', cost: 1, type: 'ability', ability: 'plea', desc: 'SOUL skill (25%): tell them the truth. +30 MERCY.' },
        { id: 'in_poise', name: 'Composure', cost: 1, type: 'passive', stats: { def: 2 }, desc: 'DEF +2.' },
        { id: 'in_grace', name: 'Grace', cost: 2, type: 'ability', ability: 'grace', desc: 'SOUL skill (35%): heal 12 and shake off slowdowns.' },
        { id: 'in_duet', name: 'Pas de Deux', cost: 2, type: 'passive', desc: 'Sparing a monster heals 25% of your HP.' },
      ],
      soul: [
        { id: 'in_stride', name: 'Long Stride', cost: 1, type: 'mod', desc: 'BLINK reaches further.' },
        { id: 'in_recover', name: 'Quick Recovery', cost: 1, type: 'mod', desc: 'BLINK recharges in 1.4s.' },
        { id: 'in_pirouette', name: 'Pirouette', cost: 2, type: 'mod', desc: 'You are untouchable for a moment after a BLINK.' },
        { id: 'in_feather', name: 'Featherweight', cost: 2, type: 'passive', desc: 'Jump higher in gravity fields, and jump three times.' },
      ],
      blade: [
        { id: 'in_form', name: 'Clean Form', cost: 1, type: 'passive', stats: { atk: 2 }, desc: 'ATK +2.' },
        { id: 'in_fouette', name: 'Fouetté', cost: 1, type: 'ability', ability: 'double', desc: 'SOUL skill (35%): your next FIGHT strikes twice.' },
        { id: 'in_posture', name: 'Iron Posture', cost: 2, type: 'passive', stats: { def: 3, hp: 6 }, desc: 'DEF +3, max HP +6.' },
        { id: 'in_jete', name: 'Grand Jeté', cost: 2, type: 'ability', ability: 'jete', desc: 'SOUL skill (60%): a leaping strike for 25 + 3xLV damage.' },
      ],
    },
  },

  perseverance: {
    id: 'perseverance', trait: 'PERSEVERANCE', color: '#c95cff', echo: 'Fenn',
    echoTitle: 'the careful one', item: 'a dog-eared notebook',
    blurb: 'You can always turn back a page and try the sentence again.',
    action: 'ANCHOR', actionDesc: 'Press X to drop an anchor. Press again to snap back to it.',
    passive: 'MARGINS', passiveDesc: '40% of damage taken can be won back by grazing bullets.',
    stats: { hp: 2, atk: 0, def: 1 },
    tree: {
      heart: [
        { id: 'pe_study', name: 'Study', cost: 1, type: 'ability', ability: 'study', desc: 'SOUL skill (15%): learn their HP, MERCY and a hint. +10 MERCY.' },
        { id: 'pe_notes', name: 'Take Notes', cost: 1, type: 'passive', desc: 'Every ACT gives +8 extra MERCY.' },
        { id: 'pe_encourage', name: 'Encourage', cost: 2, type: 'ability', ability: 'encourage', desc: 'SOUL skill (30%): +25 MERCY to every monster.' },
        { id: 'pe_ending', name: 'Happy Ending', cost: 2, type: 'passive', desc: 'Sparing gives double HOPE.' },
      ],
      soul: [
        { id: 'pe_bookmark', name: 'Bookmark', cost: 1, type: 'mod', desc: 'Snapping back to your anchor heals 2 HP.' },
        { id: 'pe_margins', name: 'Wide Margins', cost: 1, type: 'mod', desc: '60% of damage becomes recoverable.' },
        { id: 'pe_revision', name: 'Revision', cost: 2, type: 'ability', ability: 'revision', desc: 'SOUL skill (50%): restore your HP to what it was last turn.' },
        { id: 'pe_epilogue', name: 'Epilogue', cost: 2, type: 'mod', desc: 'Snapping back makes you briefly untouchable.' },
      ],
      blade: [
        { id: 'pe_pen', name: 'Sharp Pen', cost: 1, type: 'passive', stats: { atk: 2 }, desc: 'ATK +2.' },
        { id: 'pe_twist', name: 'Plot Twist', cost: 1, type: 'ability', ability: 'twist', desc: 'SOUL skill (35%): next FIGHT adds 3x your recoverable HP as damage.' },
        { id: 'pe_persist', name: 'Persistence', cost: 2, type: 'passive', desc: 'Each FIGHT in a row deals 10% more.' },
        { id: 'pe_final', name: 'Final Chapter', cost: 2, type: 'ability', ability: 'finalch', desc: 'SOUL skill (60%): 18 + 3xLV damage, and heal half of it.' },
      ],
    },
  },

  kindness: {
    id: 'kindness', trait: 'KINDNESS', color: '#35ff58', echo: 'Juniper',
    echoTitle: 'the gentle one', item: 'a flour-dusted apron',
    blurb: 'Protect who you can. Feed everyone else.',
    action: 'SHIELD', actionDesc: 'Hold X to raise a shield toward the direction you face.',
    passive: 'NURTURE', passiveDesc: 'Healing items restore 50% more. Heal 2 HP each turn.',
    stats: { hp: 6, atk: -2, def: 0 },
    tree: {
      heart: [
        { id: 'ki_mend', name: 'Mend', cost: 1, type: 'ability', ability: 'mend', desc: 'SOUL skill (20%): heal 12.' },
        { id: 'ki_meal', name: 'Warm Meal', cost: 1, type: 'passive', desc: 'Items heal another 25% more.' },
        { id: 'ki_soothe', name: 'Soothe', cost: 2, type: 'ability', ability: 'soothe', desc: 'SOUL skill (30%): +30 MERCY and their next attack is gentler.' },
        { id: 'ki_embrace', name: 'Embrace', cost: 2, type: 'ability', ability: 'embrace', desc: 'SOUL skill (70%): if their MERCY is 50% or more, spare them now.' },
      ],
      soul: [
        { id: 'ki_wide', name: 'Wide Guard', cost: 1, type: 'mod', desc: 'The shield covers a wider arc.' },
        { id: 'ki_steady', name: 'Steady Guard', cost: 1, type: 'mod', desc: 'No slowdown while shielding.' },
        { id: 'ki_reflect', name: 'Reflect', cost: 2, type: 'passive', desc: 'Every third blocked bullet heals 1 HP.' },
        { id: 'ki_aegis', name: 'Aegis', cost: 2, type: 'ability', ability: 'aegis', desc: 'SOUL skill (60%): a full ring of shield for the first 3s of the next attack.' },
      ],
      blade: [
        { id: 'ki_firm', name: 'Firm Hand', cost: 1, type: 'passive', stats: { atk: 2 }, desc: 'ATK +2.' },
        { id: 'ki_tough', name: 'Tough Love', cost: 1, type: 'ability', ability: 'toughlove', desc: 'SOUL skill (30%): a half-strength FIGHT that also gives +20 MERCY.' },
        { id: 'ki_bigheart', name: 'Big Heart', cost: 2, type: 'passive', stats: { hp: 12 }, desc: 'Max HP +12.' },
        { id: 'ki_pan', name: 'Frying Pan', cost: 2, type: 'ability', ability: 'pan', desc: 'SOUL skill (55%): 16 + 3xLV damage, and heal 10.' },
      ],
    },
  },

  justice: {
    id: 'justice', trait: 'JUSTICE', color: '#ffe81f', echo: 'Colt',
    echoTitle: 'the fair one', item: 'a battered cowboy hat',
    blurb: 'Draw only when you have to. Aim true when you do.',
    action: 'SHOOT', actionDesc: 'Press X to fire upward. Shots break most small bullets.',
    passive: 'RESOLVE', passiveDesc: 'FIGHT deals 20% more. Breaking bullets builds RESOLVE.',
    stats: { hp: 0, atk: 3, def: -1 },
    tree: {
      heart: [
        { id: 'ju_warn', name: 'Fair Warning', cost: 1, type: 'ability', ability: 'warning', desc: 'SOUL skill (20%): their next attack is 30% shorter. +15 MERCY.' },
        { id: 'ju_fair', name: 'Fair Play', cost: 1, type: 'passive', desc: 'Sparing a monster restores 5 HP.' },
        { id: 'ju_deputy', name: 'Deputize', cost: 2, type: 'ability', ability: 'deputize', desc: 'SOUL skill (30%): offer them a badge. +35 MERCY.' },
        { id: 'ju_truce', name: 'Truce', cost: 2, type: 'passive', stats: { def: 2 }, desc: 'DEF +2, and MERCY gains are 20% larger.' },
      ],
      soul: [
        { id: 'ju_draw', name: 'Quick Draw', cost: 1, type: 'mod', desc: 'Fire faster.' },
        { id: 'ju_iron', name: 'Big Iron', cost: 1, type: 'mod', desc: 'Shots are larger and pierce.' },
        { id: 'ju_spread', name: 'Spread Shot', cost: 2, type: 'mod', desc: 'Fire three shots at once.' },
        { id: 'ju_sharp', name: 'Sharpshooter', cost: 2, type: 'passive', desc: 'Every fifth bullet you break heals 1 HP.' },
      ],
      blade: [
        { id: 'ju_aim', name: 'Aim', cost: 1, type: 'ability', ability: 'critnext', desc: 'SOUL skill (25%): your next FIGHT is a perfect hit.' },
        { id: 'ju_six', name: 'Six Shooter', cost: 1, type: 'passive', stats: { atk: 3 }, desc: 'ATK +3.' },
        { id: 'ju_noon', name: 'High Noon', cost: 2, type: 'ability', ability: 'noon', desc: 'SOUL skill (50%): your next FIGHT strikes four times.' },
        { id: 'ju_judge', name: 'Judgement', cost: 2, type: 'ability', ability: 'judge', desc: 'SOUL skill (70%): 10 + 5xLV damage.' },
      ],
    },
  },
};

export const SOUL_ORDER = ['determination', 'patience', 'bravery', 'integrity', 'perseverance', 'kindness', 'justice'];

// Ability definitions used by the SOUL command in battle.
export const ABILITIES = {
  holdon: { name: 'Hold On', cost: 30, desc: 'Heal 8 + LV.' },
  kindword: { name: 'Kind Word', cost: 25, desc: '+30 MERCY.', target: true },
  checkpoint: { name: 'Checkpoint', cost: 100, desc: 'Full heal; next attack cannot hurt for 2s.' },
  critnext: { name: 'Aim', cost: 30, desc: 'Next FIGHT is perfect.' },
  burn: { name: 'Burning Will', cost: 60, desc: '20 + 3xLV damage.', target: true },
  breath: { name: 'Deep Breath', cost: 25, desc: 'Heal 6 and regenerate.' },
  lull: { name: 'Lull', cost: 30, desc: 'Slower attack. +20 MERCY.', target: true },
  stopwatch: { name: 'Stopwatch', cost: 70, desc: 'Freeze the next attack for 2.5s.' },
  patient: { name: 'Patient Strike', cost: 40, desc: 'Damage grows each turn.', target: true },
  rally: { name: 'Rally', cost: 25, desc: 'ATK +4, DEF +2 for 3 turns.' },
  standup: { name: 'Stand Up For', cost: 30, desc: '+35 MERCY.', target: true },
  flurry: { name: 'Flurry', cost: 40, desc: 'Next FIGHT strikes 3x.' },
  charge: { name: 'Charge', cost: 60, desc: 'Next FIGHT x2, ignores DEF.' },
  plea: { name: 'Honest Plea', cost: 25, desc: '+30 MERCY.', target: true },
  grace: { name: 'Grace', cost: 35, desc: 'Heal 12.' },
  double: { name: 'Fouetté', cost: 35, desc: 'Next FIGHT strikes twice.' },
  jete: { name: 'Grand Jeté', cost: 60, desc: '25 + 3xLV damage.', target: true },
  study: { name: 'Study', cost: 15, desc: 'Reveal stats. +10 MERCY.', target: true },
  encourage: { name: 'Encourage', cost: 30, desc: '+25 MERCY to all.' },
  revision: { name: 'Revision', cost: 50, desc: 'Restore last turn\'s HP.' },
  twist: { name: 'Plot Twist', cost: 35, desc: 'Next FIGHT + 3x grey HP.' },
  finalch: { name: 'Final Chapter', cost: 60, desc: '18 + 3xLV dmg, heal half.', target: true },
  mend: { name: 'Mend', cost: 20, desc: 'Heal 12.' },
  soothe: { name: 'Soothe', cost: 30, desc: '+30 MERCY, gentler attack.', target: true },
  embrace: { name: 'Embrace', cost: 70, desc: 'Spare if MERCY >= 50%.', target: true },
  aegis: { name: 'Aegis', cost: 60, desc: 'Full shield for 3s.' },
  toughlove: { name: 'Tough Love', cost: 30, desc: 'Soft FIGHT, +20 MERCY.' },
  pan: { name: 'Frying Pan', cost: 55, desc: '16 + 3xLV dmg, heal 10.', target: true },
  warning: { name: 'Fair Warning', cost: 20, desc: 'Shorter attack. +15 MERCY.', target: true },
  deputize: { name: 'Deputize', cost: 30, desc: '+35 MERCY.', target: true },
  noon: { name: 'High Noon', cost: 50, desc: 'Next FIGHT strikes 4x.' },
  judge: { name: 'Judgement', cost: 70, desc: '10 + 5xLV damage.', target: true },
};

// Resolve cost overrides for the few abilities whose tree text differs.
ABILITIES.critnext.cost = 30;
