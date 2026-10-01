// Shared constants. Everything the simulation needs lives here so it can run in Node (tests) and in the browser.

export const W = 1000;          // logical canvas size (matches the Snowdin backdrop)
export const H = 667;
export const FPS = 60;

// The fight happens in "ground space": x is screen x, y is depth. Screen y = STAGE.topY + y * ASPECT.
// Hit circles are circles in ground space, so they look like ellipses on screen (3/4 top-down view).
export const ASPECT = 0.7;
export const STAGE = { x0: 130, x1: 870, topY: 335, frontY: 560 };   // must match tools/build_stage.py
export const ARENA = { x0: STAGE.x0, x1: STAGE.x1, y0: 0, y1: (STAGE.frontY - STAGE.topY) / ASPECT };
export const WALK = { mx: 20, top: 18, bot: 12 };      // how close to the slab edge a fighter can walk on their own
export const LEDGE = { x: 8, y: 8 };                   // overhang a launched fighter survives before falling

export const RULES = { stocks: 3, seconds: 120, introFrames: 110, fallFrames: 52, spawnFrames: 64 };

// The four controls: MOVE (4 direction bits count as one stick), ATTACK, SPECIAL, GUARD/DODGE.
export const IN = { L: 1, R: 2, U: 4, D: 8, ATK: 16, SPC: 32, GRD: 64 };

export const toScreenY = (y) => STAGE.topY + y * ASPECT;

export const NET = { version: 1, inputDelay: 2, maxRollback: 10 };
