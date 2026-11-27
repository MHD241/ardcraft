# Ard · أرض

A blocky, Minecraft-style survival adventure that runs in the browser: wake somewhere random, craft a compass, cross the desert by camel, the sea by boat and the cliffs by flying carpet, earn the Ring of Trust in Madinah, then fly through the storm to Makkah and perform Umrah. Villages have a masjid, a wudu fountain and villagers who call the adhan and pray together.

The game is one file, `index.html`, with its libraries and fonts bundled in `lib/` and `fonts/` (three.js r128, PeerJS), plus images and sounds. It works offline once loaded, installs as a web app, and ships as a desktop app.

## Play it

Online: **https://mhd241.github.io/ardcraft/** (GitHub Pages, served from the `main` branch).

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Any static server works. For multiplayer, open it on two devices or browser windows; a free public matchmaking service (PeerJS) is used to connect them.

## Layout

| Path | What it is |
|---|---|
| `index.html` | The whole game: world generation, lighting, menus, quests, saving |
| `tile-*.png/jpg` | Pattern images used on the three tile blocks (zellige, star mosaic, Andalusian) |
| `skins/` | Villager skins on a 64x64 template, plus `import_skin.py` to convert a large hand-drawn sheet into one |
| `textures/` | Draw-on block and item templates, prompt sheets, `tex_tools.py` (make templates, import drawings) and `textures.png`, the hand-made textures the game loads over its own |
| `adhan.mp3` | The adhan recording the muezzin plays (about 142 seconds, 12 lines) |

## What is in the game

- **Journey mode**: a story from your first village to Madinah and then Makkah and Umrah, with stations, a camel, a boat, a flying carpet and a plane. A **Journey Map** (M) draws the real terrain and the stations you have visited.
- **Explore, Creative and Classroom worlds**: no damage; Creative has every block and instant breaking; Classroom adds teacher controls (chat, freeze, announcements, remove a player).
- **Faith systems**: adhan, wudu, five daily prayers (alone or in congregation), iman, make-up prayers, qibla-aligned mosques, the Prophet's Mosque and the Masjid al-Haram built as full complexes.
- **Minecraft-style survival**: crafting and furnaces, fences and walls, armour, buckets and water, farming (wheat, carrots, potatoes), fishing, bows and arrows, beds and spawn points, animals (sheep, cows, goats, horses to ride, rabbits, doves, cats, camels).
- **Villages**: guards and raids, a home village, daily requests from elders, festivals.
- **Learning**: first-minutes tips, a Progress Book (goals), an Arabic Words book and phrase list.
- **Multiplayer**: host-authoritative peer to peer. **Family Mode** (on by default) uses Quick Chat phrases only and stops players fighting each other.
- `privacy.html` and `terms.html` are draft policies (placeholders in [brackets] and a lawyer review needed before launch). `_headers` sets the security headers on Cloudflare. `wrangler.jsonc` and `.assetsignore` control what Cloudflare publishes.
- `parents.html` is the page for parents and teachers. `teacher-pack/` has the Teacher Guide, lesson plans, worksheets and a parent letter (Word and PDF; the generator is in `teacher-pack/source/`).

## Desktop app and web app

- **Web app**: `manifest.webmanifest`, `sw.js` and `icons/` make the game installable and playable offline. Bump `CACHE` in `sw.js` when you change a cached file, and add any new sound or texture to its `MEDIA` list.
- **Desktop app**: `desktop/` wraps the game in Electron. `desktop/prepare.sh` copies the game into `desktop/app/`. The workflow `.github/workflows/desktop.yml` builds Windows, Mac and Linux downloads; creating a GitHub release with a tag such as `v1.0.1` attaches them to the release. Mac builds get an ad-hoc signature (`desktop/adhoc-sign.js`); without an Apple developer certificate macOS may still ask the player to allow the app once.

## Rules for working on the code

1. **Never insert a new item or block in the middle of the registry.** Saves store item numbers, so everything after the insertion shifts and worlds break. Add new `def(...)` lines at the very end of the registry (just before `const VOID = 255;`). `fixShiftedIds` converts the two old mistakes (`MARBLE`, and fishing inserted early in v79) when old saves load.
2. After a change: run it in a browser, test the feature, commit, and republish. The tests live outside the repository; the useful habit is to script a headless browser and call the game through `window.__ard`.
3. Keep the claims on `parents.html` and in the teacher pack true: if you change chat, hosting or data handling, update them.
4. The art for new blocks and items (tiles 190 and up) is drawn in code and can be replaced with your own in `textures/textures.png`.

## The adhan recording

The adhan is played from `adhan.mp3` (about 142 seconds, 12 lines). If you swap in a different recording, adjust `ADHAN_TIMED` and `ADHAN_LEN` in `index.html` so the on-screen lines match. Without the file the game runs normally and the adhan is silent.

## Saves

Worlds are stored in the browser (IndexedDB, with a localStorage fallback): three slots, autosave and manual save. Nothing leaves your machine.

## Custom textures

The game draws its block textures itself, and loads `textures.png` (256x256, sixteen 16x16 tiles per row) over them tile by tile, so you can replace any texture one at a time. `textures/tex_tools.py` makes a draw-on template per block or item (`python3 tex_tools.py template "Grass Block"`) and imports a finished drawing (`python3 tex_tools.py import "Grass Block" drawing.png`). `textures/BLOCK-PROMPTS.md` has prompts for generating sheets with an image generator.

## Menus

The title screen, world list and Create New World screen sit over a sunset village that the game builds from its own blocks around the home village (never saved into your world). Create New World has Game, World and More tabs: game mode, difficulty, cheats, seed, save slot and starting supplies.

## Cheat commands

On worlds created with **Allow Cheats**, press `T`, `Enter` or `/` to open the command line (a **Cmd** button on phones): `/tp <x> <z>`, `/tp <player>`, `/tp spawn|home|madinah|makkah|miqat`, `/time set <day|noon|dusk|night|dawn|HH:MM>`, `/time add <hours>`, `/setspawn [x z]`, `/spawn`, `/where`, `/players`, `/help`. In multiplayer only the host can change the time, and cheats follow the host's world setting.

## Credits
- World coastlines and country shapes: [Natural Earth](https://www.naturalearthdata.com/) (public domain), baked into `index.html` as a small land mask plus one start point per country.

## Copyright

© 2026 [YOUR NAME]. All rights reserved (see `LICENSE`). Third-party parts: `THIRD-PARTY-NOTICES.md`. Not affiliated with Mojang or Microsoft.
