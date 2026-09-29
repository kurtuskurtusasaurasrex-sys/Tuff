# The Brick Ages · Deluxe Edition

**Play it:** open `The-Brick-Ages-Deluxe.html` in a desktop browser. It's one self-contained file and works offline.

This is an upgrade of *The Brick Ages*, the fan-made tribute to the classic brick themes (1978 – 2001). Everything
from the original is still here: nine lands, quests, dialogue, driving, the Builder, combat, the Deep Delve, walk-in
sets and Brickspeed Racers. The Deluxe Edition adds the following.

## What's new

| | Feature | How to find it |
|---|---|---|
| 🎵 | **Music and sound.** A little generative band for every land, synthesised live (no audio files): glockenspiel pop in Town, a recorder-and-harp dance at the Castle, a flute jig in the greenwood, organ and choir for the Fright Knights, industrial synth for the Rock Raiders, arpeggios in Space, a western twang with galloping woodblocks, marimba and log drums for the Islanders, a squeezebox shanty for the Pirates, dripping dark in the Deep Delve, and a battle layer when monsters attack. Music is muffled indoors. Ambience covers surf, wind, birdsong, gulls, crickets, owls and rain. There are sound effects for footsteps on each surface, jumps, stud pickups, quests, weapons, bricks bursting, the Builder's click-on and pop-off, doors, engines, hooves, the 9V horn and clickety-clack, thunder, fireworks and UI clicks. | Starts on your first click or key press. **N** mutes. Volumes are in Settings. |
| ☀️ | **Day and night.** The sun rises in the east and sets in the west; the original golden-hour look (16:30) is reproduced exactly. Dusk turns orange, then blue. At night a moon with a halo rises, stars twinkle, street lamps cast warm pools of light, torches flicker, house windows light up, cars get headlight beams, fireflies drift over the meadows, and you might spot a shooting star. | A full day lasts 24 minutes (nights pass twice as fast). A clock sits above the minimap. |
| 🌧️ | **Weather.** Rain showers, thunderstorms with lightning and thunder, snow, and a rainbow when a daytime shower clears. | Automatic, or pick one in Settings. |
| 🚀 | **Classic Space jetpack.** Twin tanks, trans-yellow fins, real flames and smoke, and a fuel gauge. | On the glowing stand by the fountain in Town. Jump, then **hold Space** to fly. **J** takes it on or off. |
| 🐶 | **Bricksy the dog.** She follows you on foot, trots, gallops to catch up, sits and wags, and finds her way back after trains, cars and interiors. She also sniffs out stud coins you missed, and nearby red bricks. | Her red doghouse is in the park. Press **E** to adopt her, and **E** again to pat her. |
| 🎆 | **Fireworks.** A show over the harbour every night between 21:00 and 23:30: peonies, rings, gold willows, crossettes and a 2×4 brick drawn in sparks. A volley also goes up when you finish a quest. | The crate on the quay launches a salvo for 10 studs. |
| 🏆 | **33 trophies**, from your first 100 studs of walking to the Rock Monster King. | Pop-up cards as you earn them. See them all in **Pause → Trophy Room**. |
| 🧭 | **Minimap.** It turns with your camera and shows the quest star, vehicles, the train and Bricksy. | Bottom right. Click it for the big map. |
| 🧩 | **Reworked minifigs.** Rounder heads, hair, hats, arms and hands. The thighs now roll round a real hip joint, so leg corners no longer poke through the hips mid-stride, and the hips have pin caps. | Everywhere. |
| ⚙️ | **New settings:** sound on or off, music, effects and ambience volume, time of day (Cycle, Morning, Noon, Golden, Sunset, Night), day length (12, 24 or 48 minutes), weather, and minimap. | **Pause → Settings**. |

## How it's built

The original game ships as a single generated HTML file (three.js plus about 60 game parts). The Deluxe build leaves
that file untouched and layers the upgrade on top:

```
original/The-Brick-Ages.html   the original game, byte for byte
src/p7x_*.js                   new parts, spliced in just before the test suite
patches.py                     small exact edits to existing parts (each must match exactly once)
build.py                       python3 build.py  ->  The-Brick-Ages-Deluxe.html
checksyntax.py                 python3 checksyntax.py The-Brick-Ages-Deluxe.html  (node --check on the game script)
```

The new parts plug into the game's own hooks: `BA.build`, `BA.onUpdate`, `GAME.on`, `GAME.interact` and
`GAME.modal`. They are:

- `p70_audio.js`: WebAudio instruments, a generative composer and ambience, and SFX wired to game events.
- `p71_daynight.js`: sun and moon paths, lighting keyframes, the sky's image light, night lights and weather.
- `p72_dlxkit.js`: shared helpers (model primitives, pop-up cards, an open-spot finder, menu hooks).
- `p73_jetpack.js`, `p74_fireworks.js`, `p75_pet.js`, `p76_trophies.js`, `p77_minimap.js`: the new features.
- `p78_whatsnew.js`: the title-screen card.
- `p79_settings.js`: the Settings rows.

The game's built-in test suite still passes (`?test`, 38/38). The harness flags (`?shot`, `?test`) keep the original
look unless you ask for something else, e.g. `?shot&tod=23&wx=rain`.
