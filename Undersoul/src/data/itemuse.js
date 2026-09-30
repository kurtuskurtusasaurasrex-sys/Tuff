// Using an item from the inventory (shared by the menu and battles).
import { S } from '../core/save.js';
import { ITEMS } from './items.js';
import { maxHp, healPlayer, hasSkill, resonance } from './stats.js';

export function healAmount(it) {
  let amt = it.heal;
  if (amt >= 999) return 999;
  let mult = 1;
  if (S.soul === 'kindness') mult += 0.5;
  if (hasSkill('ki_meal')) mult += 0.25;
  const w = ITEMS[S.weapon];
  if (w && w.healBonus) amt += w.healBonus;
  return Math.round(amt * mult);
}

// Returns { lines: [...], battle: {speed, atkUp} }
export function useItem(index) {
  const id = S.items[index];
  const it = ITEMS[id];
  if (!it) return { lines: [] };
  const lines = [];
  const battle = {};
  if (it.kind === 'weapon' || it.kind === 'armor') {
    const slot = it.kind === 'weapon' ? 'weapon' : 'armor';
    const old = S[slot];
    S[slot] = id;
    S.items[index] = old;
    lines.push(`* You equipped the ${it.name}.`);
    if (resonance(id)) lines.push('* It feels warm in your hands. Something inside you recognizes it.');
    return { lines, battle };
  }
  S.items.splice(index, 1);
  if (it.slices) {
    lines.push(`* You ate the ${it.name}.`);
  } else lines.push(`* You ate the ${it.name}.`);
  const amt = healAmount(it);
  const got = healPlayer(amt);
  if (S.hp >= maxHp()) lines.push('* Your HP was maxed out.');
  else lines.push(`* You recovered ${got} HP!`);
  if (it.speed) { battle.speed = true; lines.push('* Your SOUL feels lighter.'); }
  if (it.atkUp) { battle.atkUp = it.atkUp; lines.push(`* ATK increased by ${it.atkUp}!`); }
  return { lines, battle };
}

export function itemInfo(id) {
  const it = ITEMS[id];
  if (!it) return '';
  let head = `* "${it.name}"`;
  if (it.kind === 'food') head += ` - Heals ${it.heal >= 999 ? 'ALL' : it.heal} HP`;
  if (it.kind === 'weapon') head += ` - Weapon AT ${it.atk}`;
  if (it.kind === 'armor') head += ` - Armor DF ${it.def}`;
  return `${head}\n* ${it.desc}`;
}
