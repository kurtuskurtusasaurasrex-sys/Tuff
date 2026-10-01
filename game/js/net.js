// Peer-to-peer transport over WebRTC data channels using PeerJS (vendor/peerjs.min.js, global `Peer`).
//
// Netlify only serves static files, so there is no game server: the host registers a short room code with the free
// PeerJS broker (signalling only), up to three friends connect with that code, and from then on all game traffic flows
// directly browser-to-browser (guests talk to the host; the host relays). PeerJS ships STUN + TURN servers by default,
// so most NATs work. Override the broker for self-hosting / tests with  ?peerHost=localhost&peerPort=9000&peerSecure=0

const PREFIX = 'tuff-brawl-';
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';     // no 0/O/1/I confusion
const CONNECT_TIMEOUT = 20000;
const SILENCE_TIMEOUT = 9000;

export function randomCode(n = 5) {
  const a = new Uint32Array(n);
  crypto.getRandomValues(a);
  return Array.from(a, (v) => ALPHABET[v % ALPHABET.length]).join('');
}
export const cleanCode = (s) => (s || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/[01IO]/g, (c) => ({ 0: 'O', 1: 'I' }[c] || c)).slice(0, 5);

function peerOptions() {
  const q = new URLSearchParams(location.search);
  const o = { debug: 0 };
  if (q.get('peerHost')) {
    o.host = q.get('peerHost');
    o.port = Number(q.get('peerPort') || 9000);
    o.path = q.get('peerPath') || '/';
    o.secure = q.get('peerSecure') === '1';
  }
  return o;
}

const explain = (err) => {
  switch (err.type) {
    case 'peer-unavailable': return 'No room with that code. Ask the host for a fresh code.';
    case 'network': case 'server-error': case 'socket-error': case 'socket-closed': return 'Cannot reach the matchmaking server. Check your connection and try again.';
    case 'browser-incompatible': return 'This browser does not support WebRTC.';
    default: return 'Connection problem: ' + (err.message || err.type);
  }
};

// =================================================================================================== host
export class HostHub {
  constructor() {
    this.peer = null; this.code = '';
    this.conns = new Map();            // slot -> { conn, rtt, lastRecv }
    this.accept = null;                // (conn) => slot | -1   decides who may join, and where
    this.onstatus = null; this.onopen = null; this.onmessage = null; this.onleave = null;
    this.timer = 0;
  }
  status(s) { if (this.onstatus) this.onstatus(s); }

  open() {
    return new Promise((resolve, reject) => {
      let tries = 0;
      const attempt = () => {
        const code = randomCode(5);
        this.status('Opening room…');
        const peer = new Peer(PREFIX + code, peerOptions());
        this.peer = peer;
        peer.on('open', () => { this.code = code; this.status('Room open'); this.timer = setInterval(() => this._beat(), 1000); resolve(code); });
        peer.on('connection', (conn) => this._incoming(conn));
        peer.on('error', (err) => {
          if (err.type === 'unavailable-id' && tries++ < 6) { try { peer.destroy(); } catch (e) { /* ignore */ } return attempt(); }
          if (!this.code) reject(new Error(explain(err)));
        });
        peer.on('disconnected', () => { if (this.code && !peer.destroyed) try { peer.reconnect(); } catch (e) { /* ignore */ } });
      };
      attempt();
    });
  }

  _incoming(conn) {
    conn.on('open', () => {
      const slot = this.accept ? this.accept(conn) : -1;
      if (slot < 0) { try { conn.send({ t: 'full' }); } catch (e) { /* ignore */ } setTimeout(() => { try { conn.close(); } catch (e) { /* ignore */ } }, 300); return; }
      const rec = { conn, rtt: 0, lastRecv: performance.now(), slot };
      this.conns.set(slot, rec);
      conn.on('data', (m) => {
        rec.lastRecv = performance.now();
        if (m && m.t === 'ping') { this._to(rec, { t: 'pong', ts: m.ts }); return; }
        if (m && m.t === 'pong') { const r = performance.now() - m.ts; rec.rtt = rec.rtt ? rec.rtt * 0.7 + r * 0.3 : r; return; }
        if (this.onmessage) this.onmessage(slot, m);
      });
      conn.on('close', () => this._drop(slot, 'left'));
      conn.on('error', () => this._drop(slot, 'error'));
      if (this.onopen) this.onopen(slot);
    });
  }

  _drop(slot, why) {
    const rec = this.conns.get(slot);
    if (!rec || rec.conn._tuffDone) return;
    rec.conn._tuffDone = true;
    this.conns.delete(slot);
    if (this.onleave) this.onleave(slot, why);
  }

  _to(rec, m) { try { if (rec.conn.open) rec.conn.send(m); } catch (e) { /* closing */ } }
  send(slot, m) { const rec = this.conns.get(slot); if (rec) this._to(rec, m); }
  broadcast(m, except = -1) { for (const [slot, rec] of this.conns) if (slot !== except) this._to(rec, m); }
  rtt(slot) { const rec = this.conns.get(slot); return rec ? rec.rtt : 0; }
  maxRtt() { let m = 0; for (const rec of this.conns.values()) m = Math.max(m, rec.rtt); return m; }
  count() { return this.conns.size; }

  _beat() {
    const now = performance.now();
    for (const [slot, rec] of [...this.conns]) {
      if (now - rec.lastRecv > SILENCE_TIMEOUT) { try { rec.conn.close(); } catch (e) { /* ignore */ } this._drop(slot, 'timeout'); continue; }
      this._to(rec, { t: 'ping', ts: now });
    }
  }

  kick(slot) { const rec = this.conns.get(slot); if (rec) { try { rec.conn.close(); } catch (e) { /* ignore */ } this._drop(slot, 'kicked'); } }

  close() {
    clearInterval(this.timer);
    for (const rec of this.conns.values()) try { rec.conn.close(); } catch (e) { /* ignore */ }
    this.conns.clear();
    this.onleave = null;
    try { if (this.peer) this.peer.destroy(); } catch (e) { /* ignore */ }
    this.peer = null; this.code = '';
  }
}

// ================================================================================================== guest
export class GuestLink {
  constructor() {
    this.peer = null; this.conn = null; this.open = false; this.rtt = 0; this.lastRecv = 0; this.code = '';
    this.onstatus = null; this.onopen = null; this.onmessage = null; this.onclose = null;
    this.timers = [];
  }
  status(s) { if (this.onstatus) this.onstatus(s); }

  join(code) {
    this.code = code;
    return new Promise((resolve, reject) => {
      this.status('Contacting matchmaker…');
      const peer = new Peer(undefined, peerOptions());
      this.peer = peer;
      let settled = false;
      const fail = (e) => { if (settled) return; settled = true; reject(e); };
      peer.on('open', () => {
        this.status('Connecting to room ' + code + '…');
        const conn = peer.connect(PREFIX + code, { reliable: false, serialization: 'json' });
        this.conn = conn;
        conn.on('open', () => {
          this.open = true; this.lastRecv = performance.now();
          this.timers.push(setInterval(() => this._beat(), 1000));
          this.status('Connected');
          if (!settled) { settled = true; resolve(); }
          if (this.onopen) this.onopen();
        });
        conn.on('data', (m) => {
          this.lastRecv = performance.now();
          if (m && m.t === 'ping') { this.send({ t: 'pong', ts: m.ts }); return; }
          if (m && m.t === 'pong') { const r = performance.now() - m.ts; this.rtt = this.rtt ? this.rtt * 0.7 + r * 0.3 : r; return; }
          if (this.onmessage) this.onmessage(m);
        });
        conn.on('close', () => this._closed('The host closed the room.'));
        conn.on('error', () => this._closed('Connection lost.'));
        this.timers.push(setTimeout(() => fail(new Error('Could not reach that room. Check the code, or the host may be behind a strict firewall.')), CONNECT_TIMEOUT));
      });
      peer.on('error', (err) => { if (!settled) fail(new Error(explain(err))); else this._closed(explain(err)); });
    });
  }

  _beat() {
    if (!this.open) return;
    if (performance.now() - this.lastRecv > SILENCE_TIMEOUT) return this._closed('Connection timed out.');
    this.send({ t: 'ping', ts: performance.now() });
  }

  send(m) { try { if (this.conn && this.conn.open) this.conn.send(m); } catch (e) { /* closing */ } }

  _closed(reason) {
    const was = this.open;
    this.open = false;
    this.timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); this.timers = [];
    if (was && this.onclose) { const cb = this.onclose; this.onclose = null; cb(reason); }
  }

  close() {
    this.onclose = null;
    this._closed('');
    try { if (this.conn) this.conn.close(); } catch (e) { /* ignore */ }
    try { if (this.peer) this.peer.destroy(); } catch (e) { /* ignore */ }
    this.conn = null; this.peer = null; this.open = false;
  }
}
