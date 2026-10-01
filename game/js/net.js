// Peer-to-peer transport over WebRTC data channels using PeerJS (vendor/peerjs.min.js, global `Peer`).
//
// Netlify only serves static files, so there is no game server: the host registers a short room code with the free
// PeerJS broker (signalling only), the guest connects with that code, and from then on all game traffic flows
// directly browser-to-browser. PeerJS ships STUN + TURN servers by default, so most NATs work.
//
// Override the broker for self-hosting / tests with  ?peerHost=localhost&peerPort=9000&peerSecure=0

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

export class Link {
  constructor() {
    this.peer = null; this.conn = null;
    this.role = null;            // 'host' | 'guest'
    this.code = '';
    this.open = false;
    this.rtt = 0;
    this.lastRecv = 0;
    this.onopen = null; this.onmessage = null; this.onclose = null; this.onstatus = null;
    this._timers = [];
  }

  status(s) { if (this.onstatus) this.onstatus(s); }

  // ---- host: reserve a room code and wait for a guest --------------------------------------
  host() {
    this.role = 'host';
    return new Promise((resolve, reject) => {
      let tries = 0;
      const attempt = () => {
        const code = randomCode(5);
        this.status('Opening room…');
        const peer = new Peer(PREFIX + code, peerOptions());
        this.peer = peer;
        peer.on('open', () => { this.code = code; this.status('Waiting for opponent…'); resolve(code); });
        peer.on('connection', (conn) => {
          if (this.conn) { try { conn.close(); } catch (e) { /* room full */ } return; }
          this._attach(conn);
        });
        peer.on('error', (err) => {
          if (err.type === 'unavailable-id' && tries++ < 6) { try { peer.destroy(); } catch (e) { /* ignore */ } return attempt(); }
          if (!this.code) reject(new Error(this._explain(err)));
          else this._closed(this._explain(err));
        });
        peer.on('disconnected', () => { if (!this.open && this.code) try { peer.reconnect(); } catch (e) { /* ignore */ } });
      };
      attempt();
    });
  }

  // ---- guest: connect using a code -----------------------------------------------------------
  join(code) {
    this.role = 'guest'; this.code = code;
    return new Promise((resolve, reject) => {
      this.status('Contacting matchmaker…');
      const peer = new Peer(undefined, peerOptions());
      this.peer = peer;
      let settled = false;
      const fail = (e) => { if (settled) return; settled = true; reject(e); };
      peer.on('open', () => {
        this.status('Connecting to room ' + code + '…');
        const conn = peer.connect(PREFIX + code, { reliable: false, serialization: 'json' });
        this._attach(conn, () => { if (!settled) { settled = true; resolve(); } });
        this._timers.push(setTimeout(() => fail(new Error('Could not reach that room. Check the code, or the host may be behind a strict firewall.')), CONNECT_TIMEOUT));
      });
      peer.on('error', (err) => { if (!settled) fail(new Error(this._explain(err))); else this._closed(this._explain(err)); });
    });
  }

  _explain(err) {
    switch (err.type) {
      case 'peer-unavailable': return 'No room with that code. Ask the host for a fresh code.';
      case 'network': case 'server-error': case 'socket-error': case 'socket-closed': return 'Cannot reach the matchmaking server. Check your connection and try again.';
      case 'browser-incompatible': return 'This browser does not support WebRTC.';
      default: return 'Connection problem: ' + (err.message || err.type);
    }
  }

  _attach(conn, onopen) {
    this.conn = conn;
    conn.on('open', () => {
      this.open = true; this.lastRecv = performance.now();
      this.status('Connected');
      this._timers.push(setInterval(() => this._beat(), 1000));
      if (onopen) onopen();
      if (this.onopen) this.onopen();
    });
    conn.on('data', (m) => {
      this.lastRecv = performance.now();
      if (m && m.t === 'ping') { this._send({ t: 'pong', ts: m.ts }); return; }
      if (m && m.t === 'pong') { const r = performance.now() - m.ts; this.rtt = this.rtt ? this.rtt * 0.7 + r * 0.3 : r; return; }
      if (this.onmessage) this.onmessage(m);
    });
    conn.on('close', () => this._closed('Opponent left the match.'));
    conn.on('error', () => this._closed('Connection lost.'));
  }

  _beat() {
    if (!this.open) return;
    if (performance.now() - this.lastRecv > SILENCE_TIMEOUT) return this._closed('Connection timed out.');
    this._send({ t: 'ping', ts: performance.now() });
  }

  _send(m) { try { if (this.conn && this.conn.open) this.conn.send(m); } catch (e) { /* closing */ } }
  send(m) { this._send(m); }

  _closed(reason) {
    const was = this.open || this.code;
    this.open = false;
    this._timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); this._timers = [];
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
