# TUFF - Snow Brawl

A free browser brawler that mixes **Super Smash Bros.** (damage %, ring-outs, stocks, a Smash Ball) with
**Street Fighter** (frame data, combos, guard/parry, supers). It plays on a top-down 3/4 arena, so you walk in
**every direction** - including up and down the slab - and everything is controlled with **4 inputs**.

* Up to **4 players**: local keyboard/gamepads, CPUs, or friends **online** (rollback netcode, room codes)
* **Tournament** mode (4 or 8 fighters, CPU matches can be skipped)
* Starter roster: **Sans** and **Papyrus**. More fighters slot in with one file each (see "Adding a fighter")
* 3 stages: Snowdin Town, Frozen Lake (slippery), Judgment Hall (bone-rain hazard)
* Touch controls (floating stick + 3 buttons), gamepad, rebindable keys, installable as a home-screen app

It is a plain static site - **no build step, no server code**.

---

## Deploy on Netlify

The site is the `game/` folder.

**Option A - drag and drop (fastest).** Go to <https://app.netlify.com/drop> and drop the `game` folder
(or the `tuff-netlify.zip` that was handed over alongside this repo). You get a URL immediately.

**Option B - from this repository.** In Netlify choose *Add new site -> Import an existing project*, pick the repo,
and leave the build command empty. `netlify.toml` already sets `publish = "game"` and the cache headers
(HTML/JS/CSS always revalidate, big assets cache for a day).

Online play needs HTTPS (Netlify gives you that) because WebRTC and the clipboard API only work on secure pages.

## How to play

| Input | Keyboard (P1) | What it does |
|---|---|---|
| MOVE | WASD / arrows | walk in all directions |
| ATTACK | F or J / Z / Space | tap = 3-hit combo (each hit must connect to chain). **Direction + Attack** = heavy strike |
| SPECIAL | G or K / X | ranged move. **Direction + Special** = movement special. **Meter full** = SUPER |
| GUARD | H or L / C / Shift | hold to block. Tap just before a hit = **perfect guard**. **Direction + Guard** = dodge roll |

Player 2 on the same keyboard uses the arrow keys + `,` `.` `/` (all rebindable on the CONTROLS screen).
Gamepads work in any slot: stick/D-pad, A/X attack, B/Y special, bumpers/triggers guard.

* **Damage %** raises knockback - there are no walls, only the edge of the slab. Fly off and you lose a stock.
* **Meter** fills when you hit and get hit. At **50%** press Guard while stunned to **BREAK** out. At **100%** you can SUPER.
* The floating **Smash Ball** appears now and then. Hit it three times to fill your meter instantly.
* Last fighter standing wins; if time runs out, the lowest damage wins.

### Modes

* **VERSUS** - lobby with four slots. Press **2 / 3 / 4** (or click a slot) to cycle it between OFF, CPU and a second
  local human; pick fighters with WASD/arrows and lock in with J / Space / Enter (K undoes). Stage, stocks, time and
  CPU level are buttons at the top.
* **TOURNAMENT** - single-elimination bracket for 4 or 8. You play your own matches, CPU-vs-CPU matches can be skipped.
* **HOST ONLINE / JOIN ONLINE** - the host sees a 5-letter room code and a copyable link (`?join=CODE`).
  Up to 3 guests join, pick fighters, the host sets stage/stocks/time and presses FIGHT.

## Online play, honestly

* Signalling goes through the free public **PeerJS** broker (`0.peerjs.com`), then the game is **peer-to-peer WebRTC**.
  The broker is a free community service: if it is down or busy, hosting/joining fails with a message.
  You can run your own with `npx peerjs --port 9000` and point the game at it with
  `?peerHost=your.host&peerPort=9000&peerSecure=1` (see `js/net.js`).
* STUN/TURN: PeerJS ships Google STUN and a free TURN relay. Most home networks connect directly; strict
  corporate/mobile carrier networks fall back to the TURN relay, which is free but rate-limited.
* Netcode: deterministic 60 Hz simulation + **rollback** (GGPO-style). The host picks 1-4 frames of input delay from the
  measured ping, remote inputs are predicted, and a state-hash check every second detects desyncs.
  The host relays between guests (star topology). If a guest drops, a **CPU takes over** their fighter at an agreed frame
  so the match keeps going. A peer that goes silent for 3 s is cut loose automatically.
* The host's tab should stay open in the foreground when possible; a tiny background worker keeps the simulation ticking
  if it is hidden.

## Develop & test

```bash
python3 -m http.server 8000 --directory game      # then open http://localhost:8000

node tests/sim.test.mjs         # deterministic sim: fighting rules, 4 players, stages, CPU takeover
node tests/rollback.test.mjs    # netcode under 25% loss, jitter, drops, 2-4 players, desync detection
node tests/balance.mjs          # Sans vs Papyrus win rate vs the CPU (sanity check, ~50:50 is the goal)

# browser tests (Playwright + a local PeerJS broker, real WebRTC between Chromium pages)
cd tests/e2e && npm i && PLAYWRIGHT_CHROMIUM=/path/to/chromium node online.mjs   # also: smoke.mjs flows.mjs stages.mjs
```

Query parameters for testing: `?seconds=20` shortens matches, `?join=CODE` pre-fills a room code.

### Project layout

```
game/                 the deployable site
  index.html          screens (DOM overlay on a 1000x667 canvas)
  js/sim.js           deterministic game rules (no DOM, no Math.random, only + - * / sqrt)
  js/ai.js            CPU brain - lives inside sim state, so CPUs can never desync
  js/rollback.js      N-player rollback session, input delay, hash checks, CPU takeover
  js/net.js           PeerJS host hub / guest link, heartbeat
  js/game.js          match controller, render loop
  js/render.js, fx.js, audio.js, ui.js, input.js, main.js
  js/chars/           one file per fighter (move data + poses)
  js/stages.js        stage definitions
  assets/             sprite atlases, stage backdrops, music, font, icons
tools/                Python scripts that cut the sprite sheets, bake stages/icons and bit-crush audio
tests/                Node tests + Playwright e2e
```

### Adding a fighter

1. Cut a sprite sheet into an atlas (`tools/build_sprites.py` shows how; each frame gets a feet anchor).
2. Copy `game/js/chars/papyrus.js` to `game/js/chars/<id>.js` and edit the stats, moves (hit boxes, frames, damage,
   knockback), pose names, quote and super.
3. Register it in `game/js/chars/index.js` (`CHARS` and `ROSTER`).
4. `node tests/sim.test.mjs` and `node tests/balance.mjs`. Everything else (select screen, AI, tournament, netplay) picks it up.

Adding a stage: add an entry to `game/js/stages.js` and bake a backdrop with `tools/build_stage.py`.

## Credits and legal

* **Sans** sprite sheet: edited by **Kepabra**, original by **Underfail**. *"If used, give credits."*
* **Papyrus** sprite sheet: **Sami32e**. *"Give credit, do not claim as your own."*
* **Undertale** and its characters, Snowdin Town and Judgment Hall art style are (c) Toby Fox. This is a
  non-commercial fan project with no affiliation or endorsement.
* Music: *Super Smash Bros. Melee - Character Select* (Nintendo, **bit-crushed** by `tools/bitcrush.py`) and
  *Ruder Monsters* (DELTATRAVELER OST, used unmodified on the Snowdin stage).
* Font: Press Start 2P (SIL OFL, see `game/assets/fonts/PressStart2P-OFL.txt`). Netcode transport: PeerJS (MIT).
  Sound effects are synthesised in the browser; the front end, sim, netcode and AI are original code.

**Heads-up before publishing:** the sprites, stage art and the two songs are other people's property. A fan project
shared for free usually gets tolerated, but you do not own these assets: don't sell it, keep the credits, and be ready to
take it down if a rights holder asks. If you want a fully clean release, swap in original art and music (everything
is loaded from `game/assets/`, and the music paths are in `js/main.js` / `js/audio.js`).
