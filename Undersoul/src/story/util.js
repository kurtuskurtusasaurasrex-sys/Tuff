// Small cutscene helpers shared by every area.
import { game } from '../core/game.js';
import { S, flag, setFlag, onGenocide, route } from '../core/save.js';

export async function walkPath(actor, pts, speed) {
  for (const [x, z] of pts) await actor.walkTo(x, z, speed);
}

export function lie(actor, on) {
  const m = actor.model;
  if (on) { m.children[0].rotation.x = -Math.PI / 2; m.children[0].position.set(0, 0.12, 0.3); }
  else { m.children[0].rotation.x = 0; m.children[0].position.set(0, 0, 0); }
}

export async function standUp(actor) {
  const c = actor.model.children[0];
  const r0 = c.rotation.x, y0 = c.position.y, z0 = c.position.z;
  await game.tween(0.6, (k) => {
    c.rotation.x = r0 * (1 - k);
    c.position.y = y0 * (1 - k);
    c.position.z = z0 * (1 - k);
  });
}

// NPC walks away along a path and is removed from the room.
export async function leave(w, id, pts, speed) {
  const n = w.npc(id);
  if (!n) return;
  await walkPath(n, pts, speed);
  w.removeNpc(id);
}

export const once = (k) => { if (flag(k)) return false; setFlag(k); return true; };
export const geno = () => onGenocide();
export const pacifist = () => route() === 'pacifist';
export { flag, setFlag, S };
