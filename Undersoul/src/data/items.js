// Items. Six of the weapons/armour are relics of the fallen children; if
// you carry the relic that belongs to your own SOUL's echo, it resonates.

export const ITEMS = {
  // ---- consumables ----
  ember_drop: { name: 'Ember Drop', kind: 'food', heal: 10, price: 5, desc: 'A warm candy that glows like a coal.' },
  leaf_tea: { name: 'Leaf Tea', kind: 'food', heal: 12, price: 8, desc: 'Brewed from red leaves. Smells like autumn.' },
  honey_pie: { name: 'Honeybark Pie', kind: 'food', heal: 999, price: 0, desc: 'Queen Willow\'s pie. The whole Hollows smelled of it.', slices: true },
  frost_cone: { name: 'Frost Cone', kind: 'food', heal: 15, price: 12, desc: 'Ice cream that is somehow colder than snow.' },
  snow_bun: { name: 'Snow Bun', kind: 'food', heal: 18, price: 15, desc: 'A sweet roll shaped like a bunny\'s ear.' },
  chestnuts: { name: 'Roast Chestnuts', kind: 'food', heal: 22, price: 18, desc: 'From Cinder\'s. Still crackling.' },
  toast: { name: 'Crispy Toast', kind: 'food', heal: 4, price: 1, desc: 'Taper insists this is "CRISPY", not "BURNT".' },
  glow_bun: { name: 'Glowshroom Bun', kind: 'food', heal: 20, price: 18, desc: 'Echofall street food. It hums a little.' },
  sea_tea: { name: 'Sea Tea', kind: 'food', heal: 10, price: 12, desc: 'Salty. Makes your SOUL lighter for a battle.', speed: true },
  silk_tart: { name: 'Silk Tart', kind: 'food', heal: 24, price: 20, desc: 'Baked by spiders. Delicate. Faintly sticky.' },
  noodles: { name: 'Cup Noodles', kind: 'food', heal: 30, price: 15, desc: 'Better if you wait three minutes. You won\'t.' },
  hot_snack: { name: 'Lava Snack', kind: 'food', heal: 26, price: 25, desc: 'Sold in Emberdeep. Too spicy to taste.' },
  hero_bar: { name: 'Hero Bar', kind: 'food', heal: 40, price: 40, desc: 'Chewy. Gives you ATK +4 for a battle.', atkUp: 4 },
  star_steak: { name: 'Star Steak', kind: 'food', heal: 60, price: 60, desc: 'LUXE merchandise. It is shaped like his face.' },
  starlight: { name: 'Starlight Candy', kind: 'food', heal: 99, price: 0, desc: 'Tastes like the night sky above a place you\'ve never been.' },
  bandage: { name: 'Bandage', kind: 'armor', def: 0, heal: 5, price: 0, desc: 'It has already been used several times.' },

  // ---- weapons ----
  twig: { name: 'Twig', kind: 'weapon', atk: 0, price: 0, desc: 'A twig you picked up where you fell. It is very brave.' },
  toy_knife: { name: 'Toy Knife', kind: 'weapon', atk: 3, price: 0, relic: 'patience', desc: 'Made of plastic. Someone patient carried it a long way.' },
  gloves: { name: 'Scuffed Gloves', kind: 'weapon', atk: 5, price: 50, relic: 'bravery', desc: 'Worn at the knuckles. Still warm, somehow.' },
  slippers: { name: 'Ballet Slippers', kind: 'weapon', atk: 7, price: 0, relic: 'integrity', desc: 'Satin, faded blue. Your steps feel lighter.' },
  notebook: { name: 'Notebook', kind: 'weapon', atk: 2, price: 0, relic: 'perseverance', desc: 'Every page is a list of things to try again. Longer invincibility.', iframes: 0.4 },
  frying_pan: { name: 'Flour Pan', kind: 'weapon', atk: 10, price: 0, relic: 'kindness', desc: 'Dented. Items heal more while you hold it.', healBonus: 4 },
  cork_gun: { name: 'Cork Revolver', kind: 'weapon', atk: 12, price: 0, relic: 'justice', desc: 'Fires corks. The FIGHT bar has an extra sweep.' },
  cinder_blade: { name: 'Cinder Blade', kind: 'weapon', atk: 99, price: 0, desc: 'Here we are.' },

  // ---- armour ----
  ribbon: { name: 'Red Ribbon', kind: 'armor', def: 3, price: 0, relic: 'determination', desc: 'Tied in a bow nobody could undo.' },
  mittens: { name: 'Wool Mittens', kind: 'armor', def: 5, price: 40, desc: 'One of them says LEFT. Both are left.' },
  scarf: { name: 'Knit Scarf', kind: 'armor', def: 7, price: 60, desc: 'Too long. You love it.' },
  apron: { name: 'Flour Apron', kind: 'armor', def: 10, price: 0, relic: 'kindness', desc: 'Heal 1 HP every other turn.', regen: true },
  hat: { name: 'Battered Hat', kind: 'armor', def: 12, price: 0, relic: 'justice', desc: 'ATK +5 while you wear it.', atk: 5 },
  locket: { name: 'Seven-Stone Locket', kind: 'armor', def: 15, price: 0, desc: 'Seven tiny stones, one missing. You can feel them beating.' },
};

export function item(id) { return ITEMS[id]; }
