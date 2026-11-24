# Fix notes (do not fix until the owner says "fix the problems")

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
