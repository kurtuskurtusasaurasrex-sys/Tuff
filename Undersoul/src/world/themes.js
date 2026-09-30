// Visual themes for each area: materials, wall styles, lighting, weather.
import * as THREE from 'three';
import { lit, toon, glow } from '../gfx/materials.js';
import { tex } from '../gfx/textures.js';
import { pineTree, rock, crystal, glowMushroom, leafPile } from '../gfx/props.js';

const rand = (a, b) => a + Math.random() * (b - a);

export const THEMES = {
  hollows: {
    bg: '#0b0612', fog: '#0b0612', fogDensity: 0.035,
    hemi: ['#b89ad8', '#2a1838', 0.75], sun: ['#ffe2c0', 1.6, [4, 14, 8]],
    floor: () => lit('#8a62a8', { map: tex.tiles('#7d579c', '#4a2d62') }), floorTile: 3,
    wall: () => lit('#7a55a0', { map: tex.bricks('#6e4a92', '#3b2150') }), wallH: 3.6, wallTile: 3,
    wallTop: '#4a2f62', step: 'stone', particles: 'dust', exposure: 1.05,
    decorate(room, g, edges) {
      // vines on north walls, leaf drifts along edges
      const vine = toon('#3f7a3a');
      for (const e of edges) {
        if (e.side !== 'n' || Math.random() < 0.4) continue;
        const len = e.len;
        for (let i = 0; i < len; i += 2.5) {
          if (Math.random() < 0.5) continue;
          const v = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, rand(1, 2.6), 4), vine);
          v.position.set(e.x + (e.dx ? i : 0) + rand(0, 1), 3.4 - v.geometry.parameters.height / 2, e.z + (e.dz ? i : 0) + 0.28);
          g.add(v);
        }
      }
    },
  },
  home: {
    bg: '#120a06', fog: '#120a06', fogDensity: 0.02,
    hemi: ['#ffd8a8', '#3a2418', 0.9], sun: ['#ffd8a0', 1.3, [2, 10, 6]],
    floor: () => lit('#a8744a', { map: tex.planks('#9a6a40') }), floorTile: 3,
    wall: () => lit('#e8d0a8', { map: tex.noise('#e0c8a0', 0.04) }), wallH: 3.2, wallTile: 4,
    wallTop: '#6a4a30', step: 'wood', particles: 'dust', exposure: 1.1,
  },
  frostmere: {
    bg: '#1a2238', fog: '#aab8d8', fogDensity: 0.03, outdoor: true,
    hemi: ['#dfe8ff', '#6a7898', 1.0], sun: ['#f0f4ff', 1.8, [-6, 14, 8]],
    floor: () => lit('#eef3ff', { map: tex.snow(), roughness: 0.9 }), floorTile: 6,
    wall: null, wallH: 0.9, wallTop: '#f5f8ff', step: 'snow', particles: 'snow', exposure: 1.0,
    edgeStyle: 'trees',
  },
  snowcap: {
    bg: '#141a2c', fog: '#39456a', fogDensity: 0.03, outdoor: true,
    hemi: ['#b8c8ff', '#4a4a6a', 0.8], sun: ['#c8d4ff', 1.2, [-6, 14, 8]],
    floor: () => lit('#eef3ff', { map: tex.snow(), roughness: 0.9 }), floorTile: 6,
    wall: null, wallH: 0.9, wallTop: '#f5f8ff', step: 'snow', particles: 'snow', exposure: 1.0,
    edgeStyle: 'trees',
  },
  echofall: {
    bg: '#030814', fog: '#040b1c', fogDensity: 0.045,
    hemi: ['#4a8aff', '#051024', 0.55], sun: ['#8ab8ff', 0.7, [3, 14, 6]],
    floor: () => lit('#2a3a6a', { map: tex.rock('#26345e') }), floorTile: 4,
    wall: () => lit('#1a2446', { map: tex.rock('#1c284c') }), wallH: 4.5, wallTile: 4,
    wallTop: '#0e1630', step: 'water', particles: 'spores', exposure: 1.2, water: '#1a4a9a',
    decorate(room, g, edges) {
      for (const e of edges) {
        if (Math.random() < 0.5) continue;
        const c = crystal(rand(0.6, 1.2), Math.random() < 0.7 ? '#5ad8ff' : '#9a7aff');
        const t = rand(0.2, 0.8);
        c.position.set(e.x + e.dx * e.len * t + (e.side === 'e' ? 0.3 : e.side === 'w' ? -0.3 : 0), 0, e.z + e.dz * e.len * t + (e.side === 'n' ? -0.1 : 0));
        g.add(c);
      }
    },
    ceilingStars: true,
  },
  emberdeep: {
    bg: '#1a0604', fog: '#2a0a04', fogDensity: 0.03,
    hemi: ['#ffb07a', '#3a0a04', 0.8], sun: ['#ffd0a0', 1.6, [5, 14, 6]],
    floor: () => lit('#5a3a34', { map: tex.metal('#5a3a34'), metalness: 0.3, roughness: 0.6 }), floorTile: 4,
    wall: () => lit('#4a2420', { map: tex.rock('#4a2420') }), wallH: 3.2, wallTile: 4,
    wallTop: '#2a100c', step: 'metal', particles: 'embers', exposure: 1.05, lava: true,
  },
  lab: {
    bg: '#0a0a12', fog: '#0a0a12', fogDensity: 0.02,
    hemi: ['#e0f0ff', '#303040', 1.0], sun: ['#ffffff', 1.3, [2, 12, 5]],
    floor: () => lit('#c8ccd8', { map: tex.tiles('#c0c4d0', '#8a8e9a') }), floorTile: 2,
    wall: () => lit('#9aa0b0', { map: tex.metal('#9aa0b0') }), wallH: 3.4, wallTile: 3,
    wallTop: '#5a5e6a', step: 'metal', particles: null, exposure: 1.0,
  },
  deeplab: {
    bg: '#030305', fog: '#030305', fogDensity: 0.08,
    hemi: ['#6a8a7a', '#050505', 0.5], sun: ['#9ab0a0', 0.4, [2, 12, 5]],
    floor: () => lit('#4a4e50', { map: tex.tiles('#44484a', '#2a2c2e') }), floorTile: 2,
    wall: () => lit('#3a3e40', { map: tex.metal('#3a3e40') }), wallH: 3.4, wallTile: 3,
    wallTop: '#1a1c1e', step: 'metal', particles: 'ash', exposure: 0.9,
  },
  capital: {
    bg: '#0c0c10', fog: '#1a1a22', fogDensity: 0.035,
    hemi: ['#c8c8d8', '#2a2a30', 0.8], sun: ['#e0e0f0', 1.2, [4, 14, 8]],
    floor: () => lit('#8a8a94', { map: tex.tiles('#84848e', '#5a5a64') }), floorTile: 3,
    wall: () => lit('#6a6a74', { map: tex.bricks('#64646e', '#3a3a44') }), wallH: 4, wallTile: 3,
    wallTop: '#3a3a44', step: 'stone', particles: 'ash', exposure: 1.0,
  },
  hall: {
    bg: '#1a1004', fog: '#3a2408', fogDensity: 0.012,
    hemi: ['#ffe0a0', '#4a3010', 1.1], sun: ['#ffd070', 2.4, [-10, 12, 2]],
    floor: () => lit('#e8d0a0', { map: tex.tiles('#e0c890', '#b89860'), roughness: 0.4, metalness: 0.1 }), floorTile: 2,
    wall: () => lit('#d8b880', { map: tex.bricks('#d0b078', '#9a7a48') }), wallH: 6, wallTile: 3,
    wallTop: '#8a6a38', step: 'stone', particles: 'gold', exposure: 1.1,
  },
  throne: {
    bg: '#0a0806', fog: '#2a2014', fogDensity: 0.02,
    hemi: ['#fff0c8', '#3a3020', 1.0], sun: ['#fff4d0', 1.8, [3, 14, 6]],
    floor: () => lit('#5a8a4a', { map: tex.grass('#4a7a3a') }), floorTile: 3,
    wall: () => lit('#6a6a74', { map: tex.bricks('#64646e', '#3a3a44') }), wallH: 4.5, wallTile: 3,
    wallTop: '#3a3a44', step: 'grass', particles: 'gold', exposure: 1.05,
  },
  barrier: {
    bg: '#000000', fog: '#000000', fogDensity: 0.03,
    hemi: ['#ffffff', '#101010', 0.6], sun: ['#ffffff', 1.0, [0, 14, 6]],
    floor: () => lit('#3a3a44', { map: tex.tiles('#34343c', '#1a1a20') }), floorTile: 3,
    wall: null, wallH: 0, wallTop: '#000', step: 'stone', particles: 'dust', exposure: 1.0,
  },
  void: {
    bg: '#000000', fog: '#000000', fogDensity: 0.06,
    hemi: ['#ffffff', '#000000', 0.4], sun: ['#ffffff', 0.6, [0, 14, 6]],
    floor: () => lit('#141414'), floorTile: 3, wall: null, wallH: 0, wallTop: '#000', step: 'stone', particles: null, exposure: 1.0,
  },
};

// Tree line along outdoor room edges.
export function treeEdges(g, edges, snow = true) {
  for (const e of edges) {
    if (e.side === 's') continue;
    const n = Math.max(1, Math.floor(e.len / 1.3));
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const x = e.x + e.dx * e.len * t, z = e.z + e.dz * e.len * t;
      for (let row = 0; row < 2; row++) {
        const off = 0.9 + row * 1.5 + Math.random() * 0.4;
        const tree = pineTree(rand(2.6, 4.2), snow);
        const ox = e.side === 'e' ? off : e.side === 'w' ? -off : rand(-0.4, 0.4);
        const oz = e.side === 'n' ? -off : rand(-0.4, 0.4);
        tree.position.set(x + ox, 0, z + oz);
        tree.rotation.y = Math.random() * 6;
        g.add(tree);
      }
    }
  }
}

export function scatterRocks(g, edges, color) {
  for (const e of edges) {
    if (Math.random() < 0.6) continue;
    const r = rock(rand(0.5, 1.2), color);
    const t = Math.random();
    r.position.set(e.x + e.dx * e.len * t, 0, e.z + e.dz * e.len * t);
    g.add(r);
  }
}

export { glowMushroom, leafPile, glow };
