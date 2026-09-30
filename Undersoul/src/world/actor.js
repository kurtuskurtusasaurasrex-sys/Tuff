// Anything that walks around a room: the player and NPCs.
import * as THREE from 'three';
import { angleLerp } from '../core/util.js';

export class Actor {
  constructor(model, opts = {}) {
    this.model = model;
    this.id = opts.id || null;
    this.x = 0;
    this.z = 0;
    this.y = 0;
    this.facing = opts.facing ?? 0;
    this.radius = opts.radius ?? 0.32;
    this.speed = 0;
    this.walkSpeed = opts.walkSpeed ?? 2.6;
    this.moving = 0;
    this.target = null;
    this.emoteText = null;
    this.emoteT = 0;
    this.solid = opts.solid !== false;
    this.collider = { type: 'c', x: 0, z: 0, r: this.radius, actor: this };
    this.float = opts.float ?? 0;
    this.visible = true;
    this.t = Math.random() * 10;
  }

  setPos(x, z, facing) {
    this.x = x; this.z = z;
    if (facing !== undefined) this.facing = facing;
    this.sync();
  }

  sync() {
    this.model.position.set(this.x, this.y + this.float, this.z);
    this.model.rotation.y = this.facing;
    this.collider.x = this.x;
    this.collider.z = this.z;
  }

  // dir: 'up' | 'down' | 'left' | 'right' | angle | {x,z}
  face(dir) {
    if (typeof dir === 'number') this.facing = dir;
    else if (typeof dir === 'string') this.facing = { down: 0, up: Math.PI, left: -Math.PI / 2, right: Math.PI / 2 }[dir] ?? 0;
    else if (dir && dir.x !== undefined) this.facing = Math.atan2(dir.x - this.x, dir.z - this.z);
    this.sync();
  }

  walkTo(x, z, speed) {
    return new Promise((resolve) => {
      this.target = { x, z, speed: speed ?? this.walkSpeed, resolve };
    });
  }

  stop() {
    if (this.target) { this.target.resolve(); this.target = null; }
  }

  emote(text, time = 1.2) {
    this.emoteText = text;
    this.emoteT = time;
  }

  update(dt) {
    this.t += dt;
    let spd = 0;
    if (this.target) {
      const dx = this.target.x - this.x, dz = this.target.z - this.z;
      const d = Math.hypot(dx, dz);
      const step = this.target.speed * dt;
      if (d <= step || d < 0.01) {
        this.x = this.target.x; this.z = this.target.z;
        const r = this.target.resolve;
        this.target = null;
        r();
      } else {
        this.x += (dx / d) * step;
        this.z += (dz / d) * step;
        const want = Math.atan2(dx, dz);
        this.facing = angleLerp(this.facing, want, Math.min(1, dt * 14));
        spd = this.target.speed;
      }
    }
    this.speed = spd || this.speed;
    this.moving = spd > 0 || this.externalMoving ? 1 : 0;
    if (this.emoteT > 0) { this.emoteT -= dt; if (this.emoteT <= 0) this.emoteText = null; }
    this.sync();
    this.model.visible = this.visible;
    const a = this.model.userData.animate;
    if (a) a(dt, this.t, this.moving, spd || this.speed);
  }

  // Screen position of a point above the head, in virtual UI coords.
  headScreen(cam, ui, extra = 0.25) {
    const h = (this.model.userData.height ?? 1.5) + extra;
    const v = new THREE.Vector3(this.x, this.y + this.float + h, this.z).project(cam);
    const sx = ((v.x + 1) / 2) * window.innerWidth, sy = ((1 - v.y) / 2) * window.innerHeight;
    return ui.toVirtual(sx, sy);
  }
}
