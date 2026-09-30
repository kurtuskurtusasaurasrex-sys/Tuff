// Run state (S), save slots, persistent meta memory, and settings.

const SAVE_KEY = 'undersoul.save.v1';
const META_KEY = 'undersoul.meta.v1';
const SETTINGS_KEY = 'undersoul.settings.v1';

function lsGet(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch { return false; }
}
function lsDel(key) {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

export const DEFAULT_LOOK = {
  skin: 2,
  hair: 0,
  hairColor: 1,
  eyes: 0,
  shirt: 0,
  stripe: 0,
  pants: 0,
  shoes: 0,
  accessory: 0,
};

export const AREA_QUOTA = { hollows: 8, frostmere: 9, echofall: 9, emberdeep: 9 };

export function freshState() {
  return {
    name: 'KID',
    look: { ...DEFAULT_LOOK },
    soul: 'determination',
    lv: 1,
    exp: 0,
    hope: 1,
    hopeExp: 0,
    hp: 20,
    gold: 0,
    items: [],
    box: [],
    weapon: 'twig',
    armor: 'bandage',
    skills: [],
    bonusSP: 0,
    room: 'h1',
    spawn: 'default',
    pos: null,
    flags: {},
    kills: { hollows: 0, frostmere: 0, echofall: 0, emberdeep: 0, capital: 0 },
    spares: 0,
    totalKills: 0,
    bosses: {},
    playTime: 0,
    saveRoomName: '',
  };
}

export let S = freshState();

export function setState(s) { S = s; }

export function newGame(name, look, soul) {
  S = freshState();
  S.name = name;
  S.look = { ...look };
  S.soul = soul;
  return S;
}

export function hasSave() { return !!lsGet(SAVE_KEY); }

export function saveGame(roomName) {
  S.saveRoomName = roomName || S.saveRoomName;
  const ok = lsSet(SAVE_KEY, S);
  const meta = getMeta();
  meta.saves = (meta.saves || 0) + 1;
  setMeta(meta);
  return ok;
}

export function loadGame() {
  const s = lsGet(SAVE_KEY);
  if (!s) return false;
  S = Object.assign(freshState(), s);
  S.kills = Object.assign(freshState().kills, s.kills || {});
  return true;
}

export function peekSave() { return lsGet(SAVE_KEY); }
export function deleteSave() { lsDel(SAVE_KEY); }

// Meta memory survives resets. Some characters notice.
export function getMeta() { return lsGet(META_KEY) || {}; }
export function setMeta(m) { lsSet(META_KEY, m); }
export function metaFlag(k, v) {
  const m = getMeta();
  if (v === undefined) return m[k];
  m[k] = v;
  setMeta(m);
  return v;
}

export const settings = Object.assign(
  { master: 0.8, music: 0.75, sfx: 0.85, quality: 2, pixel: false, shake: true, textSpeed: 1 },
  lsGet(SETTINGS_KEY) || {}
);
export function saveSettings() { lsSet(SETTINGS_KEY, settings); }

// ---- flags / route helpers ----
export const flag = (k) => S.flags[k];
export const setFlag = (k, v = true) => { S.flags[k] = v; };

export function areaCleared(area) {
  return (S.kills[area] || 0) >= (AREA_QUOTA[area] || Infinity);
}

// "genocide" only while every area visited so far has been emptied and no
// monster was spared.
export function onGenocide() {
  if (S.flags.genoAborted) return false;
  return !!S.flags.genoActive;
}

export function route() {
  if (onGenocide()) return 'genocide';
  if (S.totalKills === 0) return 'pacifist';
  return 'neutral';
}
