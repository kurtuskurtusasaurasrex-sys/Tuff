// Every room in the game.
import { HOLLOWS } from './hollows.js';
import { FROSTMERE } from './frostmere.js';
import { ECHOFALL } from './echofall.js';
import { EMBERDEEP } from './emberdeep.js';

export const ROOMS = {
  ...HOLLOWS,
  ...FROSTMERE,
  ...ECHOFALL,
  ...EMBERDEEP,
};
