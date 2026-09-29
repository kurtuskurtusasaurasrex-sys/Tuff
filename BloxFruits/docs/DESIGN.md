# Blox Fruits Recreation: Design Doc

Status: draft v2 (2026-09-29)
Deliverable: a playable Roblox place file (`.rbxl`) that recreates the core loop of Blox Fruits.

## 0. Sources and confidence

The main community wiki (blox-fruits.fandom.com) and most guide sites were not reachable from the
build environment, so this doc was assembled from search-engine summaries of those pages plus
general knowledge of the game. Numbers marked **(ref)** came from a reference summary; numbers
marked **(tune)** are our own starting values and should be balanced in playtests. Anything not
marked is structural and safe to rely on.

References consulted (via search results): Blox Fruits Wiki pages for Stats, Levels, Quests,
Fighting Styles, Bosses, Swords, Guns, Boats, Health, Energy; Dexerto, Sportskeeda, TechWiser,
Beebom, RobloxDen, RBLXGUIDE and DungeonPath island/boss guides.

**Decisions (2026-09-29):** the place stays **private**, it is built **directly in Roblox Studio**,
and **mobile is in scope** for the MVP.

**IP note.** Blox Fruits belongs to Gamer Robot. Because this is a private project we keep the
original names for fruits, islands, and NPCs. We still build our own models, sounds, and art and
never import ripped assets.

---

## 1. The core loop

1. Spawn on a starter island, pick **Pirate** or **Marine**.
2. Take a quest from the island's Quest Giver ("defeat 5 Bandits").
3. Kill enemies with your weapons, gain **EXP** and **Beli** (money).
4. Level up, gain **3 stat points** per level, spend them on five stats.
5. Buy better weapons/abilities, eat a **Blox Fruit**, raise **mastery** to unlock moves.
6. Move to the next island once your level fits; beat the island boss.
7. At the sea's level cap, do the gate quest and travel to the next Sea.

Everything in the MVP should serve this loop. Trading, raids, races, PvP bounty, and events come
after the loop feels good.

## 2. Progression and stats

| Item | Value |
|---|---|
| Stat points per level | 3 (ref) |
| Level cap | 2800 in the live game (ref); MVP cap: 700 (end of First Sea) |
| EXP to next level | `2 × level^2.3 + 84` (ref) |
| Stats | Melee, Defense, Sword, Gun, Blox Fruit |
| Stat cap per stat | equal to level cap (ref) |
| Stat reset | paid/refunded via NPC or item (tune: free in MVP for testing) |

What each stat does:

- **Melee**: fighting-style damage and max **Energy**.
- **Defense**: max **Health**.
- **Sword**: sword damage.
- **Gun**: gun damage.
- **Blox Fruit**: fruit move damage.

Starting formulas (tune): `MaxHealth = 100 + 20 × level + 25 × DefensePoints`,
`MaxEnergy = 100 + 20 × level + 25 × MeleePoints`,
`Damage = base × (1 + statPoints / 100) × masteryBonus`.

HUD: green health bar with `current / max`, blue energy bar below it (ref). Energy drains on
moves and dashes and regenerates out of combat.

## 3. Combat model

Four weapon categories, each an equipped Tool in hotbar slots 1–4:

| Slot | Category | Stat | Notes |
|---|---|---|---|
| 1 | Fighting style | Melee | Always owned (starts as "Combat") |
| 2 | Blox Fruit | Blox Fruit | Only one fruit eaten at a time |
| 3 | Sword | Sword | Bought or boss-dropped |
| 4 | Gun | Gun | Ranged |

- **M1** (click): basic combo on the equipped tool.
- **Z / X / C / V / F**: skill moves on the equipped tool. Each move unlocks at a mastery
  threshold and has its own cooldown and energy cost.
- **Mastery**: per weapon, 1 → 600, gained by landing hits and kills with it. Mastery persists on
  a fruit even if you swap and later re-eat it (ref).
- **Movement abilities** (First Sea, bought from teachers):
  - Geppo (sky jump): extra mid-air jumps.
  - Buso Haki (Enhancement): toggle, damage + lets you hit elemental users. 25,000 Beli at
    the Frozen Village cave (ref).
  - Soru (flash step): short teleport-dash.
  - Ken Haki (Observation): dodge a few hits automatically. Needs Lv 300 and the Saber Expert
    defeated, then 750,000 Beli from an NPC in Upper Skylands (ref).
- **Elemental (Logia) rule**: elemental fruit users take no damage from normal hits unless the
  attacker has Buso on. This is a signature mechanic and worth implementing early.

Server authority: the client sends "I pressed Z at this aim point"; the server checks cooldown,
energy, and range, spawns the hitbox, and applies damage. Never trust client damage numbers.

## 4. Blox Fruits

- 44 fruits in the live game: 24 Natural, 11 Elemental, 9 Beast (ref).
- Rarity tiers: Common, Uncommon, Rare, Legendary, Mythical. Rarity sets Dealer price and
  spawn chance (ref).
- **Obtaining**: the Blox Fruit Dealer (stock rerolls every 4 hours, same across servers)
  (ref); random spawns under trees; the gacha NPC (Cousin).
- **Eating** replaces your current fruit. Storing fruits in inventory comes later.
- **Awakening** (raids) upgrades moves. Out of scope for the MVP.

Cheapest Common fruits for reference (Beli, ref): Rocket 5k, Spin 180k, Blade 30k, Spring 60k,
Bomb 80k, Smoke 100k, Spike ~50k.

### MVP fruit roster (6)

Picked to cover every archetype so the fruit framework is proven out:

| Fruit | Type | Why it's in the MVP |
|---|---|---|
| Bomb | Natural | Simple projectile and AoE |
| Spring | Natural | Movement-heavy kit |
| Smoke | Elemental | Tests the Logia/Buso rule |
| Flame | Elemental | Classic grinding fruit, projectiles and AoE |
| Ice | Elemental | Crowd control (freeze/stun) |
| Buddha | Beast | Transformation (size and hitbox change) |

Each fruit is one data module (moves, damage, cooldowns, VFX ids) plus a small script for any
unusual move. The framework should make adding fruit #7 a data-only job where possible.

## 5. Fighting styles

First Sea styles (MVP): **Combat** (default), **Dark Step**, **Electric**, **Water Kung Fu**.
Later ones are upgrades gated by mastery on earlier ones (ref):

- Second Sea: Death Step, Sharkman Karate, Electric Claw, Dragon Talon, **Superhuman** (needs
  300 mastery on Dark Step, Electric, Water Kung Fu, and Dragon Breath).
- Third Sea: **Godhuman** (needs 400 mastery on every other style), Sanguine Art.

This gating is just a requirements table and costs almost nothing to build once the style
framework exists.

## 6. Swords and guns

First Sea swords (MVP):

| Sword | Source |
|---|---|
| Katana | Starter Sword Dealer, 1,000 Beli (ref) |
| Cutlass | Starter Sword Dealer, 1,000 Beli (ref) |
| Dual Katana | Pirate Village sword dealer, 12,000 Beli (ref) |
| Saber | Drop from the Saber Expert (Lv 200, Jungle), puzzle-gated (ref) |
| Pole (1st Form) | Drop from Thunder God |

First Sea guns (MVP): Slingshot 5,000 Beli, Flintlock 10,500 Beli, from the Middle Town weapon
dealer (ref); Musket; Refined Slingshot.

## 7. Seas and islands

Sea gates (ref): Second Sea needs Lv 700 plus the Military Detective quest at the Prison. Third
Sea needs Lv 1500 plus defeating Don Swan and rip_indra, then talking to Mr. Captain in Green
Zone.

### First Sea (MVP world, Lv 1–700)

Levels are the usual quest bands; verify against the wiki before final balancing.

| # | Island | Levels | Enemies | Boss |
|---|---|---|---|---|
| 1 | Pirate Starter / Marine Starter | 1–10 | Bandit / Trainee | none |
| 2 | Jungle | 10–30 | Monkey, Gorilla | Gorilla King (Lv 25) |
| 3 | Pirate Village | 30–60 | Pirate, Brute | Bobby (Lv 50–55) |
| 4 | Desert | 60–90 | Desert Bandit, Desert Officer | none |
| – | Middle Town | hub | Fruit dealer, gun dealer | none |
| 5 | Frozen Village | 90–120 | Snow Bandit, Snowman | Yeti (Lv 110) |
| 6 | Marine Fortress | 120–150 | Chief Petty Officer | Vice Admiral (Lv 130) |
| 7 | Skylands (lower) | 150–190 | Sky Bandit, Dark Master | none |
| 8 | Prison | 190–250 | Prisoner, Dangerous Prisoner | Warden, Chief Warden, Swan |
| 9 | Colosseum | 225–300 | Toga Warrior, Gladiator | none |
| 10 | Magma Village | 300–375 | Military Soldier, Military Spy | Magma Admiral |
| 11 | Underwater City | 375–450 | Fishman Warrior, Fishman Commando | Fishman Lord |
| 12 | Upper Skylands | 450–625 | God's Guard, Shanda, Royal Squad, Royal Soldier | Thunder God (Lv 575) |
| 13 | Fountain City | 625–700 | Galley Pirate, Galley Captain | Cyborg (Lv 675, ~43.7k HP) |

Also First Sea: Ice Admiral (Lv 700) and the Greybeard raid boss (Lv 750). Both are post-MVP.

### Second Sea (Lv 700–1500), later

Kingdom of Rose, Green Zone, Graveyard, Snow Mountain, Hot and Cold, Cursed Ship, Ice Castle,
Forgotten Island. Bosses include Diamond, Jeremy, Fajita, Don Swan, Smoke Admiral, Cursed
Captain, Awakened Ice Admiral, Tide Keeper, and the Darkbeard raid.

### Third Sea (Lv 1500+), later

Port Town (1500–1575), Hydra Island, Great Tree, Floating Turtle, Haunted Castle, Sea of Treats,
Tiki Outpost, Castle on the Sea, plus event islands (Mirage, Kitsune, Prehistoric, Frozen
Dimension) (ref).

## 8. NPCs

| NPC type | Behavior | MVP |
|---|---|---|
| Quest Giver | 1–3 quests per island, level-gated; one active quest at a time, taking a new one replaces the old (ref) | Yes |
| Enemy mobs | Patrol zone, aggro radius, leash, respawn timer | Yes |
| Bosses | Unique moveset, long respawn, drops (sword, Beli, fragments) | Yes, 4 of them |
| Sword / gun dealer | Shop UI | Yes |
| Blox Fruit Dealer | Rotating stock, shop UI | Yes |
| Ability teachers | Sell Geppo, Buso, Soru, Ken | Yes |
| Fighting style teachers | Sell styles, check requirements | Yes |
| Boat Dealer | Spawns boats; Dinghy free (ref) | Yes (one boat) |
| Stat reset, title, race, raid NPCs | | Later |

Enemy AI can be one shared state machine (Idle → Chase → Attack → Return) with data per enemy
type. Bosses extend it with a move list.

## 9. UI

- **HUD**: health and energy bars, level and EXP bar, Beli counter, current quest tracker,
  hotbar (1–4) with Z/X/C/V/F move icons, cooldown overlays, and locked-move indicators.
- **Stats menu** (left-side button (ref)): five stats with +1/+10/+100 buttons and a
  points-remaining counter.
- **Shop dialog**: shared component for every dealer.
- **Quest dialog**: NPC portrait, the quest options with level requirement, accept button.
- **Damage numbers** and a hit marker.
- **Team select** on first join (Pirate/Marine).
- **Map / island name banner** when entering an island.
- **Mobile (in scope)**: on-screen buttons for M1, Z/X/C/V/F, dash, jump/Geppo, and
  hotbar 1–4, using `ContextActionService` so the same actions also bind to keyboard and gamepad.
  Every screen uses scale-based sizing and `UIAspectRatioConstraint` and is tested in Studio's
  phone emulator (for example iPhone SE and a 16:9 Android). Menus must be usable with one thumb
  and must not cover the move buttons.

## 10. Technical plan

- **Workflow: Studio only.** The place is built and scripted directly in Roblox Studio. The
  source of truth is the saved place file in the repo at `BloxFruits/BloxFruits.rbxl`. Commit it
  after each working session with a message saying what changed. Studio Team Create is optional
  if more than one person edits at once.
- **Explorer layout**
  - `ReplicatedStorage/Shared/Data/`: fruit, sword, gun, style, enemy, island, and quest
    ModuleScripts.
  - `ReplicatedStorage/Shared/Net/`: RemoteEvents and RemoteFunctions.
  - `ServerScriptService/Services/`: PlayerData, Stats, Combat, Quest, Shop, Enemy, Boss,
    FruitDealer.
  - `StarterPlayer/StarterPlayerScripts/Controllers/`: Input (keyboard, touch, gamepad), HUD,
    Menus, VFX, Camera.
  - `Workspace/Islands/<IslandName>/`: map geometry, spawn zones, NPC anchors.
- **Persistence**: a DataStore profile per player (level, EXP, Beli, stat points, owned items,
  mastery per weapon, current fruit, quest). Session-locked, autosaved, saved on leave.
- **Combat**: server hitboxes (spatial queries with `GetPartBoundsInBox`/raycasts),
  client-side VFX only.
- **Performance**: stream islands with `StreamingEnabled`; cap live enemies per island.

## 11. Build order

### Phase 1: Vertical slice (one island, fully playable)
1. Place file skeleton: Explorer folders above, lighting, spawn, one starter island.
2. Player data and DataStore profile.
3. Level, EXP, Beli, stats, and the stats menu.
4. Combat framework: M1 plus Z/X moves, cooldowns, energy, server hitboxes, damage numbers.
5. The Combat fighting style and Katana.
6. Enemy AI with Bandits on the starter island.
7. Quest Giver and quest tracker.
8. HUD with the mobile touch controls.

**Done when:** a new player on PC or phone can spawn, take a quest, kill Bandits, level up,
spend stats, and the progress survives rejoining.

### Phase 2: First real content
9. Blox Fruit framework and dealer with Bomb and Flame.
10. Mastery and move unlocks.
11. Jungle and Pirate Village with the Gorilla King and Bobby bosses and drops.
12. Sword/gun dealers (Cutlass, Dual Katana, Slingshot, Flintlock).
13. Geppo and Buso, including the Logia rule, and the remaining MVP fruits.

### Phase 3: Full First Sea
14. Remaining First Sea islands, enemies, and bosses (table in section 7).
15. Fighting style teachers (Dark Step, Electric, Water Kung Fu), Soru, Ken.
16. Boats and sailing between islands.
17. Saber Expert puzzle, Thunder God, Cyborg.
18. Balancing pass on the 1–700 curve.

### Phase 4 and later (in rough priority order)
Second Sea and the sea gate, fruit inventory and trading, raids and awakening, races, PvP and
bounty, Third Sea, events.

## 12. Decisions log

| Date | Question | Decision |
|---|---|---|
| 2026-09-29 | Public or private? | Private, so original names are kept |
| 2026-09-29 | Rojo or Studio? | Studio only; the `.rbxl` in the repo is the source of truth |
| 2026-09-29 | Mobile in MVP? | Yes |
