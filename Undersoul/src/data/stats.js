// Derived player stats, levelling (LOVE and HOPE), skill points.
import { S } from '../core/save.js';
import { SOULS } from './souls.js';
import { ITEMS } from './items.js';

export const EXP_TABLE = [0, 10, 30, 70, 120, 200, 300, 500, 800, 1200, 1700, 2500, 3500, 5000, 7000, 10000, 15000, 25000, 50000, 99999];
export const HOPE_TABLE = [0, 6, 16, 30, 50, 75, 105, 140, 180, 230, 290, 360, 440, 530, 630];

export function soul() { return SOULS[S.soul] || SOULS.determination; }

export function allNodes(soulId = S.soul) {
  const t = SOULS[soulId].tree;
  return [...t.heart, ...t.soul, ...t.blade];
}

export const hasSkill = (id) => S.skills.includes(id);

function skillStats() {
  const out = { hp: 0, atk: 0, def: 0 };
  for (const n of allNodes()) {
    if (n.stats && hasSkill(n.id)) for (const k in n.stats) out[k] += n.stats[k];
  }
  return out;
}

export function resonance(itemId) {
  const it = ITEMS[itemId];
  return !!(it && it.relic && it.relic === S.soul);
}

export function maxHp() {
  return 16 + 4 * S.lv + (S.hope - 1) * 2 + soul().stats.hp + skillStats().hp;
}
export function baseAtk() { return 10 + 2 * (S.lv - 1) + soul().stats.atk + skillStats().atk; }
export function weaponAtk() {
  const w = ITEMS[S.weapon];
  const a = ITEMS[S.armor];
  return (w ? w.atk || 0 : 0) + (a && a.atk ? a.atk : 0) + (resonance(S.weapon) ? 2 : 0);
}
export function atk() { return baseAtk() + weaponAtk(); }
export function baseDef() { return 10 + Math.floor((S.lv - 1) / 4) + soul().stats.def + skillStats().def; }
export function armorDef() {
  const a = ITEMS[S.armor];
  return (a ? a.def || 0 : 0) + (resonance(S.armor) ? 2 : 0);
}
export function def() { return baseDef() + armorDef(); }

export function skillPoints() {
  let spent = 0;
  for (const n of allNodes()) if (hasSkill(n.id)) spent += n.cost;
  return (S.lv - 1) + (S.hope - 1) + S.bonusSP - spent;
}

// returns number of levels gained
export function addExp(n) {
  S.exp += n;
  let gained = 0;
  while (S.lv < 20 && S.exp >= EXP_TABLE[S.lv]) { S.lv++; gained++; }
  return gained;
}

export function addHope(n) {
  S.hopeExp += n;
  let gained = 0;
  while (S.hope < HOPE_TABLE.length && S.hopeExp >= HOPE_TABLE[S.hope]) { S.hope++; gained++; }
  return gained;
}

export function nextExp() { return S.lv >= 20 ? 0 : EXP_TABLE[S.lv] - S.exp; }
export function nextHope() { return S.hope >= HOPE_TABLE.length ? 0 : HOPE_TABLE[S.hope] - S.hopeExp; }

export function healPlayer(n) {
  const before = S.hp;
  S.hp = Math.min(maxHp(), S.hp + n);
  return S.hp - before;
}

export function canUnlock(node) {
  if (hasSkill(node.id)) return false;
  const t = soul().tree;
  for (const br of ['heart', 'soul', 'blade']) {
    const idx = t[br].findIndex((n) => n.id === node.id);
    if (idx > 0 && !hasSkill(t[br][idx - 1].id)) return false;
  }
  return skillPoints() >= node.cost;
}

export function unlockedAbilities() {
  return allNodes().filter((n) => n.type === 'ability' && hasSkill(n.id)).map((n) => n.ability);
}
