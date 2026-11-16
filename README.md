Livingwild Livingwild brings a living medieval-fantasy world to Minecraft: twelve interactive NPCs, five original hostile creatures, two powerful bosses, four elemental dragons (plus four hybrid variants) that you can hatch, breed and ride, custom gear, animated weapons, unique artifacts and handcrafted structures. Raise dragons, discover Petronite, challenge the bosses, take flight in the Void Armor and track down hidden structures with a custom compass. 📖 Full guides, recipes and stats on the wiki: https://cerberoxyz.github.io/livingwild Requires: Minecraft 26.3 · Fabric Loader 0.20.1+ · Fabric API · GeckoLib 5.5.7+ · Java 25

NPCs Twelve villager-like characters with unique 3D models, dialogue and individual trades: Knight, Wizard, Fairy, Traveling Merchant, Blacksmith, Archer, Farmer, Alchemist, Bard, City Guard, Player and Monk.

Individual conversations and trades (up to three ingredients each), configurable in config/mundovivo.json.
Every NPC can be hired as a combat companion (default cost: 32 emeralds), with follow and stay options.
The Fairy does not trade: the Fairy Heart is crafted at a crafting table.
Text in English and Spanish; each player sees it in their own language.
Hostile Creatures Five original GeckoLib-animated creatures with custom models, sounds and natural Overworld spawning. They attack players they detect nearby.

Dragonized Skeleton Hound: bones, dragon's breath; rare Raw Petronite and dragon head.
PlayStation Staff Ogre (taiga): iron, redstone, music disc, special staff; rare Petronite Ingot.
Humanoid Toucan (jungle): feathers, cocoa; rare Rainbow Feather.
Fish-Faced Orangutan (jungle): cod, tropical fish, kelp; rare aquatic treasure.
Burly Pig (forests and savannas): porkchops, leather, iron nuggets; rare special chestplate.
Bosses Dragoso A huge dragon-like boss with an enraged second phase. Health 3000 · Damage 42 · Armor 20 · Follow range 128 blocks

Summoning: three dragon heads on netherrack, with a Petronite block under the center one.
Ground and air chase, fireballs (one per nearby player), bite, swipe, ground slam, tail, roar, leap and charge.
With 3 or more players close, it pushes them away and retreats while firing fireballs.
Animations follow its real movement speed.
On death: 50 levels for every player within 96 blocks, and it always drops Dragon Wings.
Glacial Boss An ice-themed boss with its own arena. Health 4000 · Damage 44 · Armor 22 · Follow range 128 blocks

Summoning: Petronite block in the center, blue ice in a cross and packed ice in the corners; right-click with a Nether Star.
Also spawns naturally in the Glacial Arena (snowy biomes).
Bite, ground slam, tail whip, frost roar and ice rain on every player. Second phase below 50% health.
Boss health bar.
On death: 100 levels for every player within 100 blocks, Dragon Wings and a Block of Petronite.
Elemental Dragons Four elemental dragons plus four hybrid variants, each with unique models, textures, animations and abilities, in baby and adult forms. Fire: fire breath and explosive fireballs · Ice: freezing and slowing · Earth: poison attacks · Wind: powerful knockback.

Eggs and Hatching

Four placeable eggs (one per element) with 3D models and lighting.
They need a nearby heat source (fire, lava or campfire) and hatch in about 5 minutes, shaking just before.
Babies grow into adults when fed 5 raw fish, and keep their owner.
Breeding and Hybrid Variants Feed a Golden Apple to two nearby adult dragons: they fall in love for 30 seconds and one lays an egg (5-minute rest before breeding again). A message tells you what hatched, and the egg looks like the offspring's element even if it hides a hybrid. Parents | Result Fire + Earth | 50% Magma Ice + Wind | 50% Blizzard Fire + Wind | 50% Solar Ice + Earth | 50% Crystal Any other pair | 5% random variant A hybrid parent | 40% inherit (70% if both match) Hybrids have unique models and textures and use the powers of one element: Magma = Fire, Blizzard = Ice, Solar = Wind, Crystal = Earth.

Riding and Flight Adult dragons can be mounted. Up to two players ride together: the owner pilots, the second is a passenger. WASD: ground movement · Space: take off and ascend · Mouse: flight direction · Ctrl + W: turbo · Left click: elemental breath · Right click: elemental fireball · Shift: dismount

Turbo doubles flight speed for up to 5 s, then a 5 s cooldown.
Dismounting mid-air grants Slow Falling for 10 s; dragons land safely if the pilot leaves.
Banking up to 90° with the mouse; the rider tilts with the dragon.
Head and neck follow your view, and breath and fireballs go where the head points.
Compatible with Do a Barrel Roll.
No accidental firing when mounting, and dragons don't burn blocks.
Care, AI and Defense

Healing: right-click with raw fish (+10 health, Regeneration II) or cooked cod/salmon (+25 health, Regeneration III). Fish is not used at full health.
Defense: riderless adult dragons fight players, mobs and projectiles using their elemental breath. They never attack their owner, riders or other dragons.
Escort: an awake adult on the ground defends its owner within 30 blocks.
Baby dragons do not defend themselves.
Sleeping

Shift + right-click with an empty hand to put your dragon to sleep or wake it (mounting also wakes it). The state is saved with the world.
Full lying-down animation: legs, curved neck, wings folded like a blanket, curled tail, closed eyelids and breathing. After a fight, a dragon you ordered to sleep goes back to sleep.
Petronite A custom mineral with its own ore and progression.

Ore generates between Y -30 and -20 in stone and deepslate, and emits light level 7.
Smelt it, then craft an Ingot (1 refined ore + 1 diamond) and a Block (9 ingots).
Used for armor, weapons, tools and artifacts.
Armor Sets Set | Per piece | Full set Petronite | +2 Max Health, +1 Armor | +8 Max Health, +20% speed Void | +4 Max Health, +2 Armor | +16 Max Health, +40% speed Void Armor: made by upgrading each Petronite piece at a smithing table with a Netherite Upgrade Template plus: Echo Shard (helmet), Elytra or Dragon Wings (chestplate), Shulker Shell (leggings) or Dragon's Breath (boots). It has double the durability and toughness of Petronite. Void full-set abilities:

Double jump in midair.
Third jump: take flight; jump again for a forward boost.
Landing after a double jump: a shockwave that damages and launches enemies.
No fall damage up to 16 blocks. Both sets use animated 3D models, with EMF and animated-player-model (Punchy Moves) compatibility.
Weapons and Artifacts Item | Ability Dawnblade | Hold right-click to charge and throw a piercing blade up to 50 blocks; it returns to your hand (5 s cooldown). Stormaxe | Summons lightning on the enemy in front of you. Arcane Staff | Right-click: poison beam. Left-click: area blast that doesn't break blocks or hurt players and NPCs. Petronite Pickaxe | Right-click: Haste V-style mining for 5 s (15 s cooldown). Fairy Heart | Totem with 3 charges; saves you from death while held, and grants Regeneration I and Speed I. Dragon Wings | Levitation: double-tap jump to hover, jump rises, sneak descends, release to hold position. Uses 1 bone every 5 s in the air. +10% speed and Jump Boost I while worn. All have custom animations and sounds, hotbar cooldown indicators, and an audio cue when abilities are ready. Recipes: Dawnblade (2 ingots + blaze rod), Stormaxe, Petronite Pickaxe (3 ingots + 2 blaze rods), Arcane Staff (8 refined ores in a ring), Fairy Heart (totem + 3 diamonds + 3 gold ingots + 2 Ender pearls).

Structures Structure | Generation Medieval House | Plains, Savanna, Forests; about 1000 blocks apart (Merchant, Blacksmith, Fairy) Castle on the Moon | Extremely rare, floating around Y=160 (Wizard, Knight, Fairy) Dragon Portal | Outer End islands; four elemental variants with dragon eggs Glacial Arena | Snowy Overworld biomes; Glacial Boss encounter

Castle Compass Craft it with a Compass and a Petronite Ingot. Right-click to locate the selected structure, Sneak + Right-click to switch between the Medieval House, Castle on the Moon and Dragon Portal. Shows coordinates, distance and height difference.

3D Spawn Eggs 18 shaded 3D spawn eggs with unique textures: 12 NPCs, 5 creatures, the Dragoso and the Glacial Boss.

Compatibility and Configuration

Built on GeckoLib: animated NPCs, creatures, bosses, weapons, armor and dragons.
Optional compatibility with Entity Model Features, Punchy Moves and Do a Barrel Roll.
NPC trades and the per-chunk NPC limit are customizable through config/mundovivo.json.
Medieval fantasy, original creatures, powerful bosses, elemental dragons and animated gameplay in one expanding experience. 📖 More info: https://cerberoxyz.github.io/livingwild
