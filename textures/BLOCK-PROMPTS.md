# Ard block textures: template and prompts

This is how to get textures as close to Minecraft as possible. You make one sheet at a time (16 textures per sheet), then the import script turns it into `textures.png`, which the game loads by itself.

## The files

- `sheets/sheet-01-guide.png` … `sheet-11-guide.png`: one template per sheet. Each shows the 16 cells in reading order, with the tile number, whether it is a TILE (fills the square), CUTOUT (see-through, e.g. flowers) or ITEM (an icon), its name, and the game's current art as a small hint. Blocks are sheets 1 to 7, items are sheets 8 to 11.
- `template-atlas-grid.png`: the whole 16 by 16 atlas with tile numbers, if you would rather paint everything in one picture or by hand.
- `atlas-current.png` (and `template-atlas-current-x4.png`): what the game draws today.
- `import_sheet.py`: cuts a finished sheet into 16x16 tiles and writes `textures.png`.

## Steps

1. Open an image generator (ChatGPT images, Gemini, or similar). Attach the guide image for a sheet.
2. Paste the **master prompt**, then the **sheet prompt** for that sheet (both below).
3. Ask for a square 1:1 image. If a cell comes out wrong, say which cell number and ask it to redraw only that one.
4. Save the result, then run: `python3 import_sheet.py sheet-01 my-sheet-01.png`. Repeat for each sheet. Each run adds to `textures.png`.
5. Put `textures.png` next to `index.html` (and publish it with the page). Tiles you have not made keep the game's own art, so you can ship it one sheet at a time.
   The three tile images you already gave me (Zellige, Star Mosaic, Andalusian) are not in the sheets and stay exactly as they are.

Tip: generators draw a clean 16x16 look better if you add "make it look like it was drawn in a 16 by 16 pixel editor". If the colours look too smooth, run the import with `--mode nearest`.

## Master prompt (paste first, every time)

```
Pixel art texture sheet for a Minecraft-style voxel game. A 4 by 4 grid of equal square cells, separated by thin dark lines, exactly like the attached guide image, same cell order. Each cell is ONE 16x16-pixel Minecraft texture shown enlarged with crisp, hard-edged square pixels: no anti-aliasing, no blur, no smooth gradients, no perspective, no 3D rendering, no drop shadows. Style: the classic Minecraft Java default texture pack (2011-2013): 4 to 6 tones per material, noisy dithered shading, a slightly darker 1-pixel edge where it suits, light from the top left. Cells marked TILE are flat, front-facing, edge to edge, seamlessly tileable squares. Cells marked CUTOUT or ITEM have a flat solid magenta (#FF00FF) background with the object centred and 1 pixel of margin. Do not draw any text, numbers or labels, and keep every texture inside its own cell. The small thumbnails in the guide show only what object each cell is: do not copy their style, redraw everything in the classic Minecraft look.
```

**Negative / avoid:** realistic textures, photos, gradients, soft edges, glow, bevel or 3D lighting on the whole cell, borders around the cells beyond the thin grid, text, watermarks, any character or logo.

## Sheet prompts

### sheet-01: Blocks 1

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-01), left to right, top to bottom:
1. Grass Block (top) (TILE): short grass blocks, bright green with lighter and darker flecks, top-down grass surface.
2. Grass Block (side) (TILE): grass block side: a 3-pixel ragged green grass fringe on top of brown dirt with pebbles.
3. Grass Block / Dirt / Farmland (TILE): plain brown dirt with darker and lighter speckles.
4. Stone (TILE): grey stone, noisy two-tone with a few darker cracks.
5. Cobblestone / Cobblestone Slab / Cobblestone Stairs (TILE): cobblestone, irregular rounded grey stones with dark mortar gaps.
6. Oak Log (side) (TILE): oak log side: brown bark with vertical grooves.
7. Oak Log (TILE): oak log end: concentric growth rings, light centre, dark bark border.
8. Oak Planks / Crafting Table / Oak Slab (TILE): oak planks: four horizontal boards, small nail dots, warm tan.
9. Oak Leaves (CUTOUT): oak leaves: dense green with dark gaps (a few transparent holes allowed, keep it mostly filled).
10. Sand (TILE): sand: pale yellow speckled.
11. Water (TILE): water: deep blue with lighter wave streaks.
12. Bedrock (TILE): bedrock: near-black rough dark grey.
13. Glass (CUTOUT): glass pane: thin pale-blue frame, one white diagonal glint, centre empty.
14. Tall Grass (CUTOUT): tall grass tuft: thin green blades, transparent background.
15. Red Flower (CUTOUT): red flower: red poppy on a green stem, transparent background.
16. Yellow Flower (CUTOUT): yellow flower: yellow dandelion on a green stem, transparent background.
```

### sheet-02: Blocks 2

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-02), left to right, top to bottom:
1. Gravel (TILE): gravel: mixed grey and brown pebbles.
2. Clay (TILE): clay: smooth blue-grey.
3. Sandstone / Sandstone Slab / Sandstone Stairs (TILE): sandstone side: pale tan with a carved band.
4. Sandstone / Sandstone Slab / Sandstone Stairs (TILE): sandstone top: smooth pale tan.
5. Snow Block / Snow (TILE): snow: nearly white with faint blue-grey speckles.
6. Coal Ore (TILE): coal ore: grey stone with black blobs.
7. Iron Ore (TILE): iron ore: grey stone with beige-pink dots.
8. Gold Ore (TILE): gold ore: grey stone with yellow flecks.
9. Diamond Ore (TILE): diamond ore: grey stone with cyan gems.
10. Birch Log (side) (TILE): birch log side: white bark with black horizontal marks.
11. Birch Log (TILE): birch log end: pale rings.
12. Birch Planks / Birch Slab / Birch Stairs (TILE): birch planks: pale yellow boards.
13. Birch Leaves (CUTOUT): birch leaves: lighter yellow-green leaves.
14. Crafting Table (top) (TILE): crafting table top: wooden top with a 3x3 grid of tools.
15. Crafting Table (side) (TILE): crafting table side: tools hanging on a plank wall.
16. Furnace (side) / Lit Furnace (side) (TILE): furnace front: grey cobble with a dark opening.
```

### sheet-03: Blocks 3

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-03), left to right, top to bottom:
1. Furnace / Lit Furnace (TILE): furnace top: grey stone slab.
2. Chest (side) (TILE): chest side: wooden chest with a metal latch.
3. Chest (TILE): chest top: plain planks.
4. Stone Bricks / Stone Brick Slab / Stone Brick Stairs (TILE): stone bricks: neat grey bricks.
5. Bricks / Brick Slab / Brick Stairs (TILE): red clay bricks with light mortar.
6. Smooth Stone / Stone Slab (TILE): smooth stone: flat light grey.
7. Block of Coal (TILE): block of coal: black with shiny facets.
8. Block of Iron (TILE): block of iron: light grey metal with bevel.
9. Block of Gold (TILE): block of gold: bright yellow with bevel.
10. Block of Diamond (TILE): block of diamond: cyan with bevel.
11. Torch (CUTOUT): wall torch: wooden stick with a glowing orange flame on top, transparent background.
12. Ladder (CUTOUT): ladder: two rails and rungs, transparent background.
13. Oak Sapling (CUTOUT): oak sapling: small green sprout, transparent background.
14. Birch Sapling (CUTOUT): birch sapling: small pale sprout, transparent background.
15. Farmland (top) (TILE): farmland top: wet dark brown soil with furrows.
16. Dirt Path (top) (TILE): dirt path top: flattened light brown earth.
```

### sheet-04: Blocks 4

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-04), left to right, top to bottom:
1. Wheat Crop (growth stage 1 of 8) (CUTOUT): Wheat Crop (growth stage 1 of 8).
2. Wheat Crop (growth stage 2 of 8) (CUTOUT): Wheat Crop (growth stage 2 of 8).
3. Wheat Crop (growth stage 3 of 8) (CUTOUT): Wheat Crop (growth stage 3 of 8).
4. Wheat Crop (growth stage 4 of 8) (CUTOUT): Wheat Crop (growth stage 4 of 8).
5. Wheat Crop (growth stage 5 of 8) (CUTOUT): Wheat Crop (growth stage 5 of 8).
6. Wheat Crop (growth stage 6 of 8) (CUTOUT): Wheat Crop (growth stage 6 of 8).
7. Wheat Crop (growth stage 7 of 8) (CUTOUT): Wheat Crop (growth stage 7 of 8).
8. Wheat Crop (growth stage 8 of 8) (CUTOUT): Wheat Crop (growth stage 8 of 8).
9. Hay Bale (TILE): hay bale top: yellow straw ends.
10. Hay Bale (side) (TILE): hay bale side: straw bundles with a rope band.
11. Spruce Log (side) (TILE): spruce log side: dark bark.
12. Spruce Log (TILE): spruce log end: dark rings.
13. Spruce Planks / Spruce Slab / Spruce Stairs (TILE): spruce planks: dark brown boards.
14. Spruce Leaves (CUTOUT): spruce leaves: dark blue-green needles.
15. Spruce Sapling (CUTOUT): spruce sapling: small dark green sprout.
16. Ice (TILE): ice: translucent light blue with white scratches.
```

### sheet-05: Blocks 5

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-05), left to right, top to bottom:
1. Cactus (side) (TILE): cactus side: green with spines.
2. Cactus (TILE): cactus top: green with a spiky centre.
3. Dead Bush (CUTOUT): dead bush: dry brown twigs, transparent background.
4. Limestone / Miqat Stone (TILE): limestone: warm cream stone.
5. Limestone Bricks / Limestone Brick Slab / Limestone Brick Stairs (TILE): limestone bricks: cream bricks with thin mortar.
6. Mashrabiya (CUTOUT): mashrabiya: carved wooden lattice screen with geometric holes, transparent holes.
7. Prayer Rug (TILE): prayer rug: red rug with a gold border and a mihrab arch pattern.
8. Lantern (CUTOUT): Arabian brass lantern with a warm glowing centre, transparent background.
9. Dirt Path (side) (TILE): dirt path side.
10. Palm Log (side) (TILE): palm log side: grey-brown ringed trunk.
11. Palm Log (TILE): palm log end.
12. Palm Leaves (CUTOUT): palm leaves: long green fronds, mostly filled.
13. Palm Planks / Palm Slab / Palm Stairs (TILE): palm planks: reddish-brown boards.
14. Palm Sapling (CUTOUT): palm sapling.
15. Wool (TILE): white wool: soft off-white with tiny fibre noise.
16. Kiswa (TILE): Kiswa: black silk cloth with a subtle woven pattern.
```

### sheet-06: Blocks 6

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-06), left to right, top to bottom:
1. Kiswa Band (TILE): Kiswa band: black with a gold embroidered calligraphy-style band.
2. Black Stone (TILE): Black Stone: smooth dark stone with a silver frame look.
3. Zamzam Tap (TILE): Zamzam tap: brass tap over a stone basin, transparent background.
4. Miqat Stone (side) (TILE): Miqat stone side: pale stone with a carved arch.
5. Green Tile (TILE): green tile: rich Madinah green glazed tile with fine pattern.
6. Rawdah Carpet (TILE): Rawdah carpet: green carpet with gold ornament.
7. Golden Grille (CUTOUT): golden grille: gold lattice with dark gaps.
8. Sleeping Mat (top) (TILE): sleeping mat top: woven reed mat.
9. Sleeping Mat (TILE): sleeping mat side: woven reed edge.
10. Redstone Ore (TILE): redstone ore: grey stone with red dots.
11. Lamb and Rice Platter (CUTOUT): lamb and rice platter, seen from above, on a round brass tray.
12. Bowl of Dates (CUTOUT): bowl of dates, seen from above.
13. Basket of Bread (CUTOUT): basket of flat bread, seen from above.
14. Qahwa and Cups (CUTOUT): Arabic coffee pot (dallah) and small cups, seen from above.
15. Fruit Platter (CUTOUT): fruit platter, seen from above.
16. Bunting (CUTOUT): string of small triangular festive flags (green, red, gold), transparent background.
```

### sheet-07: Blocks 7

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-07), left to right, top to bottom:
1. Fire (CUTOUT): campfire flame, orange and yellow, transparent background.
2. leave this cell empty, flat grey.
3. leave this cell empty, flat grey.
4. leave this cell empty, flat grey.
5. leave this cell empty, flat grey.
6. leave this cell empty, flat grey.
7. leave this cell empty, flat grey.
8. leave this cell empty, flat grey.
9. leave this cell empty, flat grey.
10. leave this cell empty, flat grey.
11. leave this cell empty, flat grey.
12. leave this cell empty, flat grey.
13. leave this cell empty, flat grey.
14. leave this cell empty, flat grey.
15. leave this cell empty, flat grey.
16. leave this cell empty, flat grey.
```

### sheet-08: Items 1

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-08), left to right, top to bottom:
1. Stick (ITEM): a wooden stick.
2. Coal (ITEM): a lump of coal.
3. Charcoal (ITEM): charcoal, brown-black lump.
4. Iron Ingot (ITEM): iron ingot.
5. Gold Ingot (ITEM): gold ingot.
6. Diamond (ITEM): diamond gem.
7. Flint (ITEM): flint, dark grey arrowhead shard.
8. Clay Ball (ITEM): clay ball.
9. Brick (ITEM): red brick.
10. Apple (ITEM): red apple.
11. Golden Apple (ITEM): golden apple with a bright gold skin.
12. Wheat Seeds (ITEM): wheat seeds.
13. Wheat (ITEM): wheat bundle.
14. Bread (ITEM): loaf of bread.
15. Shears (ITEM): shears.
16. Snowball (ITEM): snowball.
All cells are ITEMS: a 16x16 inventory icon, the object drawn diagonally and big, on flat magenta, with a 1-pixel dark outline like Minecraft items.
```

### sheet-09: Items 2

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-09), left to right, top to bottom:
1. Dates (ITEM): dates, a handful of dark brown dates.
2. Wooden Pickaxe (ITEM): wooden pickaxe, diagonal, head at top-right, wooden stick handle.
3. Wooden Axe (ITEM): wooden axe, diagonal, wooden stick handle.
4. Wooden Shovel (ITEM): wooden shovel, diagonal, wooden stick handle.
5. Wooden Sword (ITEM): wooden sword, diagonal blade, wooden stick handle.
6. Wooden Hoe (ITEM): wooden hoe, diagonal, wooden stick handle.
7. Stone Pickaxe (ITEM): stone pickaxe, diagonal, head at top-right, wooden stick handle.
8. Stone Axe (ITEM): stone axe, diagonal, wooden stick handle.
9. Stone Shovel (ITEM): stone shovel, diagonal, wooden stick handle.
10. Stone Sword (ITEM): stone sword, diagonal blade, wooden stick handle.
11. Stone Hoe (ITEM): stone hoe, diagonal, wooden stick handle.
12. Iron Pickaxe (ITEM): iron pickaxe, diagonal, head at top-right, wooden stick handle.
13. Iron Axe (ITEM): iron axe, diagonal, wooden stick handle.
14. Iron Shovel (ITEM): iron shovel, diagonal, wooden stick handle.
15. Iron Sword (ITEM): iron sword, diagonal blade, wooden stick handle.
16. Iron Hoe (ITEM): iron hoe, diagonal, wooden stick handle.
All cells are ITEMS: a 16x16 inventory icon, the object drawn diagonally and big, on flat magenta, with a 1-pixel dark outline like Minecraft items.
```

### sheet-10: Items 3

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-10), left to right, top to bottom:
1. Golden Pickaxe (ITEM): golden pickaxe, diagonal, head at top-right, wooden stick handle.
2. Golden Axe (ITEM): golden axe, diagonal, wooden stick handle.
3. Golden Shovel (ITEM): golden shovel, diagonal, wooden stick handle.
4. Golden Sword (ITEM): golden sword, diagonal blade, wooden stick handle.
5. Golden Hoe (ITEM): golden hoe, diagonal, wooden stick handle.
6. Diamond Pickaxe (ITEM): diamond pickaxe, diagonal, head at top-right, wooden stick handle.
7. Diamond Axe (ITEM): diamond axe, diagonal, wooden stick handle.
8. Diamond Shovel (ITEM): diamond shovel, diagonal, wooden stick handle.
9. Diamond Sword (ITEM): diamond sword, diagonal blade, wooden stick handle.
10. Diamond Hoe (ITEM): diamond hoe, diagonal, wooden stick handle.
11. Raw Mutton (ITEM): raw mutton.
12. Cooked Mutton (ITEM): cooked mutton.
13. Raw Beef (ITEM): raw beef.
14. Steak (ITEM): cooked steak.
15. Raw Chicken (ITEM): raw chicken drumstick.
16. Cooked Chicken (ITEM): cooked chicken drumstick.
All cells are ITEMS: a 16x16 inventory icon, the object drawn diagonally and big, on flat magenta, with a 1-pixel dark outline like Minecraft items.
```

### sheet-11: Items 4

Paste after the master prompt:

```
Fill the 16 cells of the attached guide (sheet-11), left to right, top to bottom:
1. Raw Camel Meat (ITEM): raw camel meat.
2. Cooked Camel Meat (ITEM): cooked camel meat.
3. Leather (ITEM): leather.
4. Feather (ITEM): feather.
5. Ihram (ITEM): ihram: folded white cloth.
6. Compass (ITEM): compass with a gold needle.
7. Boat (ITEM): small wooden boat.
8. Flying Carpet (ITEM): flying carpet: red and gold woven carpet, slightly wavy.
9. Ring of Trust (ITEM): gold ring with a green stone.
10. Redstone Dust (ITEM): redstone dust: small red pile.
11. leave this cell empty, flat grey.
12. leave this cell empty, flat grey.
13. leave this cell empty, flat grey.
14. leave this cell empty, flat grey.
15. leave this cell empty, flat grey.
16. leave this cell empty, flat grey.
All cells are ITEMS: a 16x16 inventory icon, the object drawn diagonally and big, on flat magenta, with a 1-pixel dark outline like Minecraft items.
```

## One texture at a time

If a sheet is hard to get right, ask for a single tile: "A single 16x16 Minecraft texture of <description>, shown enlarged with hard square pixels, flat front-facing, seamless, classic Minecraft Java style, on a plain magenta background if it is see-through." Then drop it into the matching cell of `template-atlas-grid.png` and import the whole atlas with the same script idea, or tell me the tile number and I will place it.
---

## Draw-on templates (one per block or item)

`templates/blank/<Block-Name>.png` is an empty template and `templates/current/<Block-Name>.png` has the game's current art already in the squares, to paint over. Each shows the faces the game uses (TOP, SIDE, BOTTOM) as 16 x 16 grids (1 square = 1 pixel) and an outline of the block. See-through blocks and items use grey checkers for transparency.

Make or re-make one with `python3 tex_tools.py template "Grass Block"`, and put your finished drawing into the game with `python3 tex_tools.py import "Grass Block" my-drawing.png`. The importer reads the squares by position, so keep the template's size and proportions when you export.
