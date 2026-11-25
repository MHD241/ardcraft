# Fix notes (do not fix until the owner says "fix the problems")

## Fixed (2026-11-25)
- Airport, harbour and bus station now stand in **random places** (different in every world, 450 to 1,300 blocks from where you wake; the harbour on any coast within reach). A faint **trail** leads to each from where you wake, and the **elder of a village** has a button "Ask the way to Arabia" that says the direction and a rough distance in words. The compass still points at the nearest one. Open questions were answered with defaults (compass points at the nearest hub; the hubs need exploring).
- **Clerks stand on the floor**, not the roof (airport, Jeddah Hajj Terminal, harbour, station).
- The hand overlay is hidden during airliner, ship and coach rides.

## From the owner (2026-11-25, second batch) - not fixed yet
3. **The coach (bus) goes underwater and through hills.** It follows the ground height point by point, so it drives along the seabed where the route crosses water (straits, bays, the Suez canal) and climbs straight through hills. Fix: build a **proper road**: a level, empty strip (no trees, no rocks, no water: bridges or causeways over water, cuttings or ramps through hills) that the coach follows, so it never goes underwater or through terrain. The road must be **empty**: nothing standing on it.
4. **The player should be inside the coach, not outside.** Today the camera sits behind and above the coach. Make it a first-person view from a seat inside, looking out of the windows. Check the same for the ship and the airliner (ride from a seat or the bridge/cockpit).

5. **No scorpions or any danger in Makkah (the owner asked "please please please").** Today hostile creatures (scorpions by day in desert, jackals and bandits at night) can spawn anywhere except near villages, the old road stations and the Madinah airfield (see hostileSpawn). Makkah's ground counts as desert, so scorpions can appear there, and in Madinah. Fix: make a **safe sanctuary** around Makkah (the Haram, the plaza, the Safa and Marwa gallery, the miqat, the road to it and Makkah Station: roughly 1,000 blocks around the Kaaba): no hostile spawns, clear any that wander in, nothing that hurts the player (also no player-versus-player hits there). Same for Madinah (the Prophet's Mosque and its city), because both are holy cities; confirm with the owner. Applies to the old straight-road worlds as well as the Red Sea map.

6. **The airliner needs a proper interior.** Today it is a solid white box seen from behind. Build a real cabin: rows of seats, an aisle, windows you can look out of, a cockpit door and a cockpit, overhead lights, a prayer area or a quiet corner, and seat belts. The player sits inside (a first-person seat view, see item 4) and sees the world through the windows. Do the same level of care for the ship (cabin, deck, bridge) and the coach (seats, aisle, driver's cab). Keep it light enough for tablets.

7. **More adventure (the owner: "we need more adventure than this").** Today a trip is: buy a ticket, press a button, arrive. Wanted, all four: (a) **things happen on the trip** (storms at sea, a breakdown, a stranded traveller, delays); (b) **stops and places to explore** along every route (ports, towns, ruins, oases, markets, with people, quests and treasure); (c) **quests and helping people** (deliver a message, find a lost item, trade goods, earn the gold and trust the tickets cost); (d) **skills to play** (steer the ship, navigate by the stars, fly the plane yourself, fix the coach, fish on the way). Danger level chosen: **as exciting as the old game** (animals and hostile creatures on the road, hunger, heat, thirst), but **never in the holy cities** (see item 5). This is big: needs a written plan and approval before building (the owner asked for plans before large features).

## Still open

## From the owner
1. **Travel hubs are in a fixed place.** The airport (and the harbour and station) are always the same distance and direction from where you wake (airport: 280 blocks east). They should be at a **random place**, found by exploring, not told. Add hints: the village elder or a traveller gives a rough direction, signposts on the paths, planes in the sky. Open questions: should the compass point at the hub straight away? One easy hub near the start, or explore to find one?
2. **The airline clerk stands on the roof of the terminal.** The player died twice trying to reach them. Cause: NPCs are placed at the highest solid block (settleY), which inside a building is the roof. Same problem for the clerk in Jeddah's Hajj Terminal. Fix: put NPCs on the floor level inside the building (use the known floor height), or a clear spot in front of the door.

## Noticed by Claude
- The hand overlay is still drawn during airliner, ship and coach rides.
- Australia, Brazil, Paraguay and the USA have no harbour or road within reach (only flights). Consider a "travel to the coast" step.
- No real-device (tablet, phone) test of the much bigger world. Performance not measured.
- Israel is left out of the country list on purpose, Taiwan and Kosovo are in: confirm with the owner.
- Saving is blocked during a flight, ship or coach ride (saves on arrival).
- Airliner, ship and coach rides are local to each player in multiplayer.
- Privacy policy, terms and religious content still need review; contact email, name and country placeholders are not filled in.
