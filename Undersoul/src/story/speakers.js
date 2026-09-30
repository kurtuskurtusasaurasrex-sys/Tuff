// Who talks, in what voice and font.
import { FONTS } from '../ui/fonts.js';
import { S } from '../core/save.js';
import { SOULS } from '../data/souls.js';

export const SPEAKERS = {
  narrator: { voice: 'narrator' },
  sprig: { name: 'SPRIG', voice: 'sprig', color: '#ffe14a' },
  sprig_evil: { name: 'SPRIG', voice: 'sprig_evil', color: '#ffe14a', cps: 26 },
  willow: { name: 'WILLOW', voice: 'willow', color: '#f2a66a', cps: 28 },
  wick: { name: 'wick', voice: 'wick', color: '#8fd3ff', font: FONTS.wick, blipEvery: 3, cps: 28 },
  taper: { name: 'TAPER', voice: 'taper', color: '#ff7a3a', font: FONTS.taper, cps: 34 },
  maris: { name: 'MARIS', voice: 'maris', color: '#4ad0c0', cps: 34 },
  lotl: { name: 'DR. LOTL', voice: 'lotl', color: '#ff9ad0', cps: 36 },
  luxe: { name: 'LUXE', voice: 'luxe', color: '#ff5ad0', cps: 34 },
  king: { name: 'OAKHEART', voice: 'king', color: '#e8c060', cps: 26 },
  rowan: { name: 'ROWAN', voice: 'rowan', color: '#9ae07a', cps: 30 },
  hush: { name: 'hush', voice: 'hush', color: '#b8c0ff', cps: 18, blipEvery: 3 },
  tuft: { name: 'TUFT', voice: 'tuft', color: '#ffb04a', cps: 36 },
  silk: { name: 'MADAME SILK', voice: 'silk', color: '#c070ff' },
  mitts: { name: 'MITTS', voice: 'high', color: '#f0d0e0' },
  cinder: { name: 'CINDER', voice: 'low', color: '#ff9a4a' },
  monster: { name: 'MONSTER', voice: 'monster', color: '#ddd' },
  wren: { name: '???', voice: 'wren', color: '#ff3030', cps: 24 },
  echo: {
    get name() { return (SOULS[S.soul]?.echo || 'ECHO').toUpperCase(); },
    get color() { return SOULS[S.soul]?.color || '#fff'; },
    voice: 'echo', cps: 26,
  },
};

export function npcSpeaker(name, voice = 'monster', color = '#ddd') {
  return { name, voice, color };
}
