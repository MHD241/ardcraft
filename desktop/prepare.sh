#!/bin/bash
# copies the game files into desktop/app (run before `npm run dist` or `npm start`)
set -e
cd "$(dirname "$0")"
rm -rf app && mkdir -p app
for f in index.html adhan.mp3 tile-andalus.png tile-star.jpg tile-strapwork.png; do cp ../$f app/; done
cp -r ../lib ../fonts ../icons ../audio app/
mkdir -p app/textures && cp ../textures/textures.png app/textures/
mkdir -p app/skins && cp ../skins/man-*.png app/skins/
