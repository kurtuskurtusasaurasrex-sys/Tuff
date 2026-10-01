// Stage definitions. The walkable slab has the same geometry on every stage (config.js STAGE); a stage changes the
// backdrop, the physics (ice) and an optional hazard. Backdrops are baked by tools/build_stage.py.

export const STAGES = {
  snowdin: { id: 'snowdin', name: 'SNOWDIN TOWN', bg: 'assets/stage/snowdin.webp', music: 'snowdin', ice: 0, hazard: '', blurb: 'A quiet night in town. No tricks.' },
  ice:     { id: 'ice',     name: 'FROZEN LAKE',  bg: 'assets/stage/ice.webp',     music: 'snowdin', ice: 1, hazard: '', blurb: 'Slippery! Everything slides.' },
  hall:    { id: 'hall',    name: 'JUDGMENT HALL', bg: 'assets/stage/hall.webp',   music: 'snowdin', ice: 0, hazard: 'bones', blurb: 'Bones rain down from the ceiling.' },
};
export const STAGE_ORDER = ['snowdin', 'ice', 'hall'];
