# SigmaCinematic

A Paper plugin for Minecraft **26.2** made for cinematics, YouTube videos and roleplay.
It lets admins take on a fake identity, fake any game message, send fancy text, jump
between dimensions, and play music from a YouTube link. Players don't need any mods.

Every command needs the permission `sigmacinematic.admin`. Server operators have it automatically.

## Install

1. Get the jar in one of these ways:
   - **From GitHub:** go to the repo's **Actions** tab, open the latest *Build SigmaCinematic* run,
     and download the **SigmaCinematic** artifact.
   - **Build it yourself:** run `./gradlew build` in this folder. The jar ends up in `build/libs/`.
2. Put `SigmaCinematic-1.0.0.jar` in your server's `plugins/` folder and restart.
3. If you want music, see [Music setup](#music-setup) below.

## Fake identity (name + skin)

| Command | What it does |
|---|---|
| `/scnick <name> [player]` | Changes your name **everywhere**: tab list, the name above your head, chat, and join, leave, death, kill and advancement messages. It stays after you relog. |
| `/scnick reset [player]` | Goes back to your real name. |
| `/scnick style <format>` | Adds a colored name or fake rank in chat and tab, for example `/scnick style <red>[Owner] <name>`. |
| `/scskin <link> [slim]` | Changes your skin to the skin at a link. Works with NameMC, MineSkin, textures.minecraft.net or any direct `.png` link. |
| `/scskin <playername>` | Copies another player's skin. |
| `/scskin reset` | Gives you your real skin back. |
| `/scwho [name]` | Shows who is really behind each fake name, with their real name, UUID and skin source. |

The plugin keeps track of your real name and skin (refreshed every time you log in) and
your fake ones in `plugins/SigmaCinematic/disguises.yml`, so it can always undo a disguise.
When a disguised player joins, the fake name is already applied, so even the
"joined the game" message shows the fake name.

> Skin **links** are turned into real Minecraft skins through the free MineSkin service. Put a
> free API key from https://account.mineskin.org/keys in `config.yml` under `skins.mineskin-api-key`.
> Copying a player's skin by name works without a key.

## Fake messages (`/scfake`)

These look exactly like real game messages because they use the game's own text. The name can be
anyone, online or made up. Put names with spaces in `"quotes"`.

```
/scfake join Notch
/scfake leave Notch
/scfake death Steve lava                  (also: fall, fell, void, drowned, explosion, lightning, ... or any custom text)
/scfake kill Herobrine Steve              -> Steve was slain by Herobrine
/scfake kill Herobrine Steve <aqua>Excalibur
/scfake shot Skeleton Steve Bow           -> Steve was shot by Skeleton using [Bow]
/scfake advancement Steve challenge Return to Sender | Destroy a Ghast with a fireball
/scfake toast @a goal elytra <gold>Flying High | Took off for the first time
/scfake chat Notch hello everyone         -> <Notch> hello everyone
/scfake say Server Restarting soon        -> [Server] Restarting soon
/scfake whisper Herobrine Steve I'm behind you
/scfake command Steve Set own game mode to Creative Mode
/scfake gamemode Steve creative           -> [Steve: Set own game mode to Creative Mode]
/scfake op Steve / deop Steve / kick Steve [reason]
/scfake custom <rainbow>anything you want
```

## Easy tellraw, titles and action bar

You write text with simple tags instead of JSON. You can also use `&c`-style color codes.

```
/sctell @a <gold>Welcome, <player>!             (<player> becomes each reader's name)
/sctell @a <hover:show_text:'Secret!'><red>Hover me
/sctell Steve <click:run_command:'/spawn'><green>[Click to go to spawn]
/sctell json <gradient:red:gold>Hello           -> gives you the real /tellraw command to copy for command blocks
/sctitle @a <red><bold>Chapter 1 | <gray>The Beginning
/sctitle @a clear
/scactionbar @a <yellow>Objective: find the diamond
```

Tag reference: https://docs.advntr.dev/minimessage/format.html

## Dimensions

```
/scdim list
/scdim nether                (also: overworld, end, a world name, or any datapack dimension like mypack:moon)
/scdim end @a                (sends everyone)
```

This always takes you to that dimension's spawn and puts you somewhere safe: on solid ground,
out of lava and not inside walls. In the End you land on the vanilla obsidian platform.

## Music from YouTube

```
/scmusic play https://www.youtube.com/watch?v=dQw4w9WgXcQ         (everyone)
/scmusic play https://youtu.be/dQw4w9WgXcQ Steve,Alex             (only some players)
/scmusic loop <link>                                               (repeat until stopped)
/scmusic stop [players]
/scmusic list                                                      (click a song to replay it instantly)
/scmusic play #2
/scmusic delete #2
/scmusic status
```

How it works: **yt-dlp** downloads the audio, **ffmpeg** converts it into the format Minecraft
plays, and the plugin wraps each song in a tiny resource pack. Each player's game downloads that
pack, and then the song plays like a normal sound. Songs are cached, so playing one again is
instant. It also works with SoundCloud, Bandcamp, direct `.mp3` links and most other sites.

### Music setup

1. **Nothing to install.** yt-dlp, ffmpeg and deno (which yt-dlp needs for YouTube) are
   downloaded automatically into `plugins/SigmaCinematic/bin/` the first time the server starts.
   They take about 200 MB. Watch the console for `Music: ffmpeg is ready.` and the other tools.
2. **Let players download the songs.** With the default `music.pack-host: auto`, the plugin serves
   songs from its own web server on **port 8163**. If players can't reach that port, it
   automatically switches to uploading songs to a free file host. It tries litterbox.catbox.moe,
   then uguu.se, then tmpfiles.org, and uploads are redone automatically when they expire. You can
   force either option with `pack-host: self` or `pack-host: upload`.
3. Players must have *Server Resource Packs* set to **Enabled** or **Prompt**
   (Multiplayer → select server → Edit). The plugin tells you if someone has them disabled.

The music plays on the **Jukebox/Note Blocks** volume slider by default. You can change this with
`music.sound-category`.

### If YouTube says "Sign in to confirm you're not a bot"

YouTube sometimes blocks servers run by hosting companies. To fix it:

1. In your browser, open a private/incognito window and log in to YouTube. A spare Google account
   is safest.
2. Use a cookies exporter extension, such as "Get cookies.txt LOCALLY", to export your
   `youtube.com` cookies to a file named `cookies.txt`, then close the private window.
3. Upload `cookies.txt` to `plugins/SigmaCinematic/` and set `music.cookies-file: cookies.txt`.
4. Run `/sigmacinematic reload`.

Anyone with that file can use the account, so keep it private. SoundCloud and direct `.mp3` links
aren't affected by this block.

## Setting it up on Seedloaf

1. Make sure your server is running **Paper 26.2**.
2. In the **File Manager**, upload `SigmaCinematic-1.0.0.jar` into the `plugins` folder, then
   start the server once. This creates `plugins/SigmaCinematic/config.yml`.
3. **Skins:** open `plugins/SigmaCinematic/config.yml` and paste your MineSkin key:
   ```yaml
   skins:
     mineskin-api-key: "msk_..."
   ```
4. **Music:** nothing to set up. The first time you play a song, the plugin tries its own music
   port. Seedloaf doesn't open that port, so the plugin notices, switches to uploading songs to a
   free file host, and remembers that for next time. To skip that first try, set
   `music.pack-host: upload` in `config.yml`.
5. Seedloaf stops the server when nobody is online. The plugin's downloaded tools, songs and
   disguises are saved in `plugins/SigmaCinematic/`, so they stay across restarts.

## Filming tools

| Command | What it does |
|---|---|
| `/scfreeze <players> [on\|off]` | Freezes actors in place. They can still look around. |
| `/scvanish [player]` | Makes you invisible to everyone, for a camera operator. Also sends a fake leave message. |
| `/scblackout <players> <seconds> [title \| subtitle]` | Fades the screen to black, e.g. `/scblackout @a 5 <gray><italic>Three hours later...` |
| `/sccountdown <seconds> [players] [text]` | Shows "3… 2… 1… Action!" on screen with sounds. |
| `/scsudo <player> <message or /command>` | Makes someone say something or run a command. |
| `/sigmacinematic` | Shows clickable help. Use `/sigmacinematic reload` to reload the config. |
