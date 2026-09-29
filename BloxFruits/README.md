# Blox Fruits recreation

A private Roblox recreation of Blox Fruits. The design doc is [docs/DESIGN.md](docs/DESIGN.md).

## Open it

Open `BloxFruits.rbxl` in Roblox Studio and press **Play**. That file is the master copy of the
game: edit it in Studio, save, and commit it with a message saying what changed.

To test on a phone layout, use Studio's device emulator (Test tab > Device), for example
iPhone SE and a 16:9 Android phone.

### Saving progress

Progress saves with DataStores, which only work once the place is published:

1. File > Publish to Roblox (keep the experience private).
2. Game Settings > Security > turn on **Enable Studio Access to API Services**.

Until then the game still runs, keeps progress for the session only, and shows a small orange
warning at the bottom of the screen.

## What's in Phase 1 (the starter island slice)

- **Pirate Starter Island** with a spawn, huts, a dock, a sword stall and a bandit camp.
  The sea is Terrain water generated when the server starts (see `Workspace.SeaPreview`).
- **Team select** (Pirates or Marines) on first join.
- **Quest Giver**: "Defeat 5 Bandits" for 350 EXP and $350. One quest at a time.
- **Bandits** (Lv. 5) that wander their camp, chase, attack, give up and heal when dragged too
  far, and respawn.
- **Levels and stats**: EXP curve `2 × level^2.3 + 84`, 3 points per level, a Stats menu with
  +1/+10/+100 and a free reset. Defense raises Health, Melee raises Energy.
- **Combat**, server-authoritative: M1 combo, Z and X moves, Energy costs, cooldowns, dash (Q),
  damage numbers. Weapons: **Combat** (always owned) and the **Katana** ($1,000 at the Sword Dealer).
- **HUD**: Health, Energy, level and EXP bars, Beli, quest tracker, island banner.
- **Mobile**: Attack, Dash and move buttons next to the jump button; keyboard and gamepad use
  the same actions through ContextActionService.

## Where things live in Studio

| Explorer path | What it is |
|---|---|
| `ReplicatedStorage.Shared.Data` | Weapons, enemies, quests and shops as data modules |
| `ReplicatedStorage.Shared.Formulas` | Level, Health, Energy and damage formulas |
| `ReplicatedStorage.Shared.Net` | RemoteEvents |
| `ServerScriptService.Services` | PlayerData, Progression, Loadout, Combat, Enemy, Quest, Shop, World |
| `StarterPlayer.StarterPlayerScripts.Controllers` | HUD, Menus, Input, VFX |
| `Workspace.Islands.PirateStarter.NPCs` | Anchor pads; an NPC appears on each at runtime (attributes `Role`, `GiverId`/`ShopId`) |
| `Workspace.Islands.PirateStarter.EnemyZones` | Spawn zones (attributes `EnemyType`, `Count`) |

Move the anchor pads and zones in Studio to rearrange the island; no code changes needed.

## tools/placegen

The first version of `BloxFruits.rbxl` was generated from the Luau files in
`tools/placegen/place/` by a small Rust tool (`cargo run --release -- place ../../BloxFruits.rbxl`
from that folder). It compiles every script with the Luau compiler before writing the file.
It is only a seed: once the place has been saved from Studio, **don't regenerate it**, or Studio
edits will be lost. The `.rbxl` is the source of truth.
