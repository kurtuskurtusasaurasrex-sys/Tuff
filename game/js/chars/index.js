// Character registry. To add a fighter: create chars/<id>.js (see sans.js), import it here, add a sprite atlas.
import sans from './sans.js';
import papyrus from './papyrus.js';

export const CHARS = { sans, papyrus };
export const ROSTER = ['sans', 'papyrus'];          // order shown on the select screen
export const LOCKED_SLOTS = 6;                       // greyed "???" tiles that tease the bigger roster
