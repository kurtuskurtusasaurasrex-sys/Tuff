// On-screen controls for touch devices. Buttons feed the same action map
// as the keyboard, so every screen works with them.
import { input } from '../core/input.js';

export function setupTouch() {
  const root = document.getElementById('touch');
  if (!root) return;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch) return;
  root.classList.add('on');
  for (const el of root.querySelectorAll('.tbtn')) {
    const action = el.dataset.a;
    const id = action + Math.random();
    const down = (e) => { e.preventDefault(); el.classList.add('on'); input.touchPress(action, id); };
    const up = (e) => { e.preventDefault(); el.classList.remove('on'); input.touchRelease(action, id); };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', up);
  }
}
