// One entry point for every model in the game.
import { CHARACTER_BUILDERS, villager } from './characters.js';
import { MONSTER_BUILDERS } from './monsters.js';
import { buildHuman, animateHuman, setFace } from './human.js';
import { S } from '../core/save.js';
import { SOULS } from '../data/souls.js';

export function playerModel(look = S.look) {
  const m = buildHuman(look, { soulColor: SOULS[S.soul]?.color });
  m.userData.height = 1.45;
  m.userData.isHuman = true;
  m.userData.animate = (dt, t, moving, speed) => animateHuman(m, dt, moving ? (speed || 3) : 0);
  m.userData.setExpr = (e) => setFace(m, e);
  return m;
}

// kind: 'player' | character id | monster id | 'villager:bunny:#fur:#clothes'
export function buildModel(kind, opts = {}) {
  if (kind === 'player') return playerModel(opts.look);
  if (kind.startsWith('villager')) {
    const [, sp, fur, clothes] = kind.split(':');
    return villager(sp || 'bunny', fur || '#f0e8f0', clothes || '#6a8ac8');
  }
  if (CHARACTER_BUILDERS[kind]) return CHARACTER_BUILDERS[kind](opts.arg);
  if (MONSTER_BUILDERS[kind]) return MONSTER_BUILDERS[kind](opts.arg);
  console.warn('unknown model', kind);
  return MONSTER_BUILDERS.gloop();
}

export const ALL_MODEL_IDS = [...Object.keys(CHARACTER_BUILDERS).filter((k) => k !== 'villager' && k !== 'echoGhost'), 'villager:bunny', 'villager:bear:#8a6a4a:#c84a4a', 'villager:fire', ...Object.keys(MONSTER_BUILDERS)];
