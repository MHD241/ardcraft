Animal voices
=============
The game plays these recordings when they exist and falls back to synthesized voices when they do not.

Existing: chicken.mp3, bull.mp3, cow.mp3, sheep.mp3

Add (any short mp3): goat.mp3, horse.mp3, rabbit.mp3, dove.mp3, cat.mp3

Each file is cut into a clip by the "segs" list for that animal in index.html (ANIMAL_CLIPS), as [start second, length in seconds].
The defaults assume the sound starts at 0 s. If a file has several calls, tell me the start times and I will cut them.

Offline play: after adding recordings here, also add their paths to the MEDIA list in sw.js and raise the CACHE number (ard-blocks-v2 -> v3) so installed copies pick them up. The desktop app copies this folder when it is built.
