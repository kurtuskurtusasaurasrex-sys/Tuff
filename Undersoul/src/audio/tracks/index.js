import { THEME_TRACKS } from './theme.js';
import { AREA_TRACKS } from './areas.js';
import { CHARACTER_TRACKS } from './characters.js';
import { BATTLE_TRACKS } from './battles.js';
import { MOOD_TRACKS } from './mood.js';

export const ALL_TRACKS = {
  ...THEME_TRACKS,
  ...AREA_TRACKS,
  ...CHARACTER_TRACKS,
  ...BATTLE_TRACKS,
  ...MOOD_TRACKS,
};
