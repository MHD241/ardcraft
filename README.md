# Ard · أرض

A blocky, Minecraft-style survival adventure that runs in the browser: wake somewhere random, craft a compass, cross the desert by camel, the sea by boat and the cliffs by flying carpet, earn the Ring of Trust in Madinah, then fly through the storm to Makkah and perform Umrah. Villages have a masjid, a wudu fountain and villagers who call the adhan and pray together.

Everything is one file, `index.html` (three.js r128 loaded from cdnjs), plus a few images.

## Play it

Online: **https://mhd241.github.io/ardcraft/** (GitHub Pages, served from the `main` branch).

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Any static server works. The game needs to be served over http (not opened as a file) so it can load its images and sound.

## Layout

| Path | What it is |
|---|---|
| `index.html` | The whole game: world generation, lighting, menus, quests, saving |
| `tile-*.png/jpg` | Pattern images used on the three tile blocks (zellige, star mosaic, Andalusian) |
| `skins/` | Villager skins on a 64x64 template, plus `import_skin.py` to convert a large hand-drawn sheet into one |
| `textures/` | Draw-on block and item templates, prompt sheets, `tex_tools.py` (make templates, import drawings) and `textures.png`, the hand-made textures the game loads over its own |
| `adhan.mp3` | The adhan recording the muezzin plays (about 142 seconds, 12 lines) |

## The adhan recording

The adhan is played from `adhan.mp3` (about 142 seconds, 12 lines). If you swap in a different recording, adjust `ADHAN_TIMED` and `ADHAN_LEN` in `index.html` so the on-screen lines match. Without the file the game runs normally and the adhan is silent.

## Saves

Worlds are stored in the browser (IndexedDB, with a localStorage fallback): three slots, autosave and manual save. Nothing leaves your machine.

## Custom textures

The game draws its block textures itself, and loads `textures.png` (256x256, sixteen 16x16 tiles per row) over them tile by tile, so you can replace any texture one at a time. `textures/tex_tools.py` makes a draw-on template per block or item (`python3 tex_tools.py template "Grass Block"`) and imports a finished drawing (`python3 tex_tools.py import "Grass Block" drawing.png`). `textures/BLOCK-PROMPTS.md` has prompts for generating sheets with an image generator.

## Menus

The title screen, world list and Create New World screen sit over a sunset village that the game builds from its own blocks around the home village (never saved into your world). Create New World has Game, World and More tabs: game mode, difficulty, cheats, seed, save slot and starting supplies.
