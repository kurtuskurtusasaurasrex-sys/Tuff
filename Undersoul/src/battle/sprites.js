// Pre-rendered bullet sprites (with glow) for the battle board.
const cache = new Map();

function make(key, w, h, draw, glow = 8, color = '#fff') {
  const k = key + color + w + h + glow;
  if (cache.has(k)) return cache.get(k);
  const pad = glow + 2;
  const c = document.createElement('canvas');
  c.width = Math.ceil(w + pad * 2);
  c.height = Math.ceil(h + pad * 2);
  const g = c.getContext('2d');
  g.translate(pad + w / 2, pad + h / 2);
  if (glow) { g.shadowColor = color; g.shadowBlur = glow; }
  g.fillStyle = color;
  g.strokeStyle = color;
  draw(g, w, h);
  if (glow) { g.shadowBlur = 0; draw(g, w, h); }
  const s = { canvas: c, w, h, pad };
  cache.set(k, s);
  return s;
}

const TAU = Math.PI * 2;

export const SHAPES = {
  orb: (g, w) => { g.beginPath(); g.arc(0, 0, w / 2, 0, TAU); g.fill(); },
  ring: (g, w) => { g.lineWidth = w * 0.18; g.beginPath(); g.arc(0, 0, w / 2 - w * 0.1, 0, TAU); g.stroke(); },
  pellet: (g, w) => {
    // Sprig's "friendship petals": a little white seed
    g.beginPath(); g.ellipse(0, 0, w / 2, w / 3.2, 0, 0, TAU); g.fill();
  },
  star: (g, w) => {
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? w * 0.22 : w / 2;
      const a = (i / 10) * TAU - Math.PI / 2;
      g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    g.closePath(); g.fill();
  },
  wax: (g, w, h) => {
    // candle-wax pillar with rounded ends (Wick & Taper's "bones")
    const r = w / 2;
    g.beginPath();
    g.arc(0, -h / 2 + r, r * 1.35, 0, TAU);
    g.arc(0, h / 2 - r, r * 1.35, 0, TAU);
    g.fill();
    g.fillRect(-r * 0.7, -h / 2 + r, r * 1.4, h - r * 2);
  },
  spear: (g, w, h) => {
    g.fillRect(-w * 0.12, -h / 2 + h * 0.3, w * 0.24, h * 0.7);
    g.beginPath(); g.moveTo(0, -h / 2); g.lineTo(w / 2, -h / 2 + h * 0.32); g.lineTo(-w / 2, -h / 2 + h * 0.32); g.closePath(); g.fill();
  },
  arrow: (g, w, h) => {
    g.beginPath(); g.moveTo(0, -h / 2); g.lineTo(w / 2, 0); g.lineTo(w * 0.18, 0); g.lineTo(w * 0.18, h / 2); g.lineTo(-w * 0.18, h / 2); g.lineTo(-w * 0.18, 0); g.lineTo(-w / 2, 0); g.closePath(); g.fill();
  },
  fire: (g, w, h) => {
    g.beginPath(); g.moveTo(0, -h / 2);
    g.bezierCurveTo(w / 2, -h / 6, w / 2, h / 2, 0, h / 2);
    g.bezierCurveTo(-w / 2, h / 2, -w / 2, -h / 6, 0, -h / 2); g.fill();
  },
  drop: (g, w, h) => {
    g.beginPath(); g.moveTo(0, -h / 2);
    g.quadraticCurveTo(w / 2, h / 6, 0, h / 2); g.quadraticCurveTo(-w / 2, h / 6, 0, -h / 2); g.fill();
  },
  leaf: (g, w, h) => {
    g.beginPath(); g.ellipse(0, 0, w / 2, h / 2, 0, 0, TAU); g.fill();
    g.globalCompositeOperation = 'destination-out';
    g.fillRect(-0.8, -h / 2, 1.6, h);
    g.globalCompositeOperation = 'source-over';
  },
  fly: (g, w) => {
    g.beginPath(); g.arc(0, 2, w * 0.28, 0, TAU); g.fill();
    g.globalAlpha = 0.6;
    g.beginPath(); g.ellipse(-w * 0.3, -w * 0.15, w * 0.25, w * 0.15, -0.5, 0, TAU); g.ellipse(w * 0.3, -w * 0.15, w * 0.25, w * 0.15, 0.5, 0, TAU); g.fill();
    g.globalAlpha = 1;
  },
  snow: (g, w) => {
    g.lineWidth = w * 0.12; g.lineCap = 'round';
    for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI; g.beginPath(); g.moveTo(Math.cos(a) * w / 2, Math.sin(a) * w / 2); g.lineTo(-Math.cos(a) * w / 2, -Math.sin(a) * w / 2); g.stroke(); }
    g.beginPath(); g.arc(0, 0, w * 0.12, 0, TAU); g.fill();
  },
  note: (g, w, h) => {
    g.beginPath(); g.ellipse(-w * 0.1, h * 0.28, w * 0.32, w * 0.24, -0.4, 0, TAU); g.fill();
    g.fillRect(w * 0.14, -h / 2, w * 0.1, h * 0.8);
    g.beginPath(); g.moveTo(w * 0.24, -h / 2); g.quadraticCurveTo(w * 0.5, -h * 0.35, w * 0.4, -h * 0.1); g.lineTo(w * 0.24, -h * 0.25); g.fill();
  },
  bubble: (g, w) => { g.lineWidth = 2; g.beginPath(); g.arc(0, 0, w / 2 - 1, 0, TAU); g.stroke(); g.globalAlpha = 0.25; g.fill(); g.globalAlpha = 1; g.beginPath(); g.arc(-w * 0.15, -w * 0.15, w * 0.1, 0, TAU); g.fill(); },
  block: (g, w, h) => { g.fillRect(-w / 2, -h / 2, w, h); },
  diamond: (g, w, h) => { g.beginPath(); g.moveTo(0, -h / 2); g.lineTo(w / 2, 0); g.lineTo(0, h / 2); g.lineTo(-w / 2, 0); g.closePath(); g.fill(); },
  heart: (g, w) => {
    const s = w / 2;
    g.beginPath(); g.moveTo(0, s * 0.9);
    g.bezierCurveTo(-s * 1.2, 0, -s * 0.8, -s, 0, -s * 0.35);
    g.bezierCurveTo(s * 0.8, -s, s * 1.2, 0, 0, s * 0.9); g.fill();
  },
  bolt: (g, w, h) => {
    g.beginPath(); g.moveTo(w * 0.1, -h / 2); g.lineTo(-w * 0.35, h * 0.05); g.lineTo(0, h * 0.05); g.lineTo(-w * 0.1, h / 2); g.lineTo(w * 0.35, -h * 0.05); g.lineTo(0, -h * 0.05); g.closePath(); g.fill();
  },
  cross: (g, w) => { g.fillRect(-w / 2, -w * 0.12, w, w * 0.24); g.fillRect(-w * 0.12, -w / 2, w * 0.24, w); },
  eye: (g, w) => {
    g.beginPath(); g.ellipse(0, 0, w / 2, w / 3.4, 0, 0, TAU); g.fill();
    g.globalCompositeOperation = 'destination-out';
    g.beginPath(); g.arc(0, 0, w * 0.13, 0, TAU); g.fill();
    g.globalCompositeOperation = 'source-over';
  },
  plane: (g, w, h) => { g.fillRect(-w * 0.12, -h / 2, w * 0.24, h); g.fillRect(-w / 2, -h * 0.1, w, h * 0.2); g.fillRect(-w * 0.25, h * 0.32, w * 0.5, h * 0.12); },
  spider: (g, w) => {
    g.beginPath(); g.arc(0, 0, w * 0.22, 0, TAU); g.fill();
    g.lineWidth = w * 0.07;
    for (let i = 0; i < 4; i++) for (const s of [-1, 1]) {
      g.beginPath(); g.moveTo(s * w * 0.15, (i - 1.5) * w * 0.1); g.lineTo(s * w * 0.45, (i - 1.5) * w * 0.2 - w * 0.08); g.lineTo(s * w * 0.5, (i - 1.5) * w * 0.25 + w * 0.05); g.stroke();
    }
  },
  croissant: (g, w, h) => { g.beginPath(); g.arc(0, h * 0.2, w / 2, Math.PI, 0); g.arc(0, h * 0.2, w * 0.2, 0, Math.PI, true); g.fill(); },
  crystal: (g, w, h) => { g.beginPath(); g.moveTo(0, -h / 2); g.lineTo(w / 2, -h * 0.1); g.lineTo(w * 0.25, h / 2); g.lineTo(-w * 0.25, h / 2); g.lineTo(-w / 2, -h * 0.1); g.closePath(); g.fill(); },
};

export function sprite(shape, w, h, color, glow = 8) {
  return make(shape, w, h ?? w, SHAPES[shape] || SHAPES.orb, glow, color);
}

export const KIND_COLORS = { white: '#ffffff', cyan: '#46e6ff', orange: '#ff9a1f', green: '#35ff58' };
