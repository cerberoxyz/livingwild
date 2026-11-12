Mundo Vivo
Mundo Vivo brings a living medieval-fantasy world to Minecraft: twelve interactive NPCs, five original creatures, two powerful bosses, four elemental dragons you can hatch, breed and ride, custom equipment, animated weapons, unique artifacts, and handcrafted structures. Raise dragons, discover Petronite, challenge bosses, and track down hidden structures with a custom compass.

📖 Full guides, recipes and stats on the wiki: https://cerberoxyz.github.io/mundovivo

Requires: Minecraft 26.3 · Fabric Loader 0.20.1+ · Fabric API · GeckoLib 5.5.7+ · Java 25

NPCs
Twelve villager-like characters with unique 3D models, dialogue screens, and individual trades.

NPC	Description
Knight	Medieval warrior and protector.
Wizard	Master of magic and ancient knowledge.
Fairy	Magical character with custom wings.
Traveling Merchant	Wandering trader with valuable goods.
Blacksmith	Sells and trades equipment.
Archer	Ranged combat specialist.
Farmer	Trades agricultural products.
Alchemist	Deals with magical and brewing ingredients.
Bard	Musician and storyteller.
City Guard	Protector of settlements.
Player	Human character with unique trades.
Monk	Peaceful character with special exchanges.
Individual conversations and trades (up to three ingredients each), configurable in config/mundovivo.json.
NPCs can be hired through the interaction system.
Creatures
Five original GeckoLib-animated creatures with custom models, sounds, natural Overworld spawning, and loot tables.

Creature	Drops
Dragonized Skeleton Hound	Bones, Dragon Breath; rare Petronite and Dragon Head.
PlayStation Staff Ogre	Iron, Redstone, Music Disc, special Staff; rare Petronite Ingot.
Humanoid Toucan	Feathers, Cocoa; chance of Rainbow Feather.
Fish-Faced Orangutan	Cod, Tropical Fish, Kelp; rare aquatic treasure.
Burly Pig	Pork Chops, Leather, Iron Nuggets; rare special Golden Apple Chestplate.
Bosses
Dragoso
A massive dragon-like boss with an enraged second phase.

Health	Damage	Armor	Follow Range
3000	42	20	128 blocks
Aerial pursuit, fireballs and beam attacks.
Ground slams, swipes, tail, bite, charge and leap attacks.
Animations respond to actual movement speed.
Glacial Boss
An ice-themed boss with its own combat system and custom arena.

Health	Damage	Armor	Follow Range
4000	44	22	128 blocks
Spawning animation, roar, bite, ground slam and tail whip attacks.
Ice Rain summons damaging ice strikes around targets.
Boss health bar.
Elemental Dragons
Four elemental dragons plus four hybrid variants, each with unique models, textures, animations and abilities, in baby and adult forms.

Dragon	Abilities
Fire	Fire breath and explosive fireballs.
Ice	Freezing and slowing.
Earth	Poison attacks.
Wind	Powerful knockback.
Eggs and Hatching
Four placeable eggs (one per element) with 3D models and lighting.
They need a nearby heat source and hatch in about 5 minutes, shaking just before.
Babies grow into adults when fed raw fish, and keep their owner.
Breeding and Hybrid Variants
Feed a Golden Apple to two nearby adult dragons: they fall in love for 30 seconds and one lays an egg (5-minute rest before breeding again). A message tells you what hatched, and the egg looks like the offspring's element even if it hides a hybrid.

Parents	Result
Fire + Earth	50% Magma
Ice + Wind	50% Blizzard
Fire + Wind	50% Solar
Ice + Earth	50% Crystal
Any other pair	5% random variant
A hybrid parent	40% inherit (70% if both match)
Hybrids have unique models and textures and use the powers of one element: Magma = Fire, Blizzard = Ice, Solar = Wind, Crystal = Earth.

Riding and Flight
Adult dragons can be mounted. Up to two players ride together: the owner pilots, the second is a passenger.

Control	Action
WASD	Ground movement
Space	Take off and ascend
Mouse	Flight direction
Ctrl + W	Turbo
Left click	Elemental breath
Right click	Elemental fireball
Shift	Dismount
Turbo doubles flight speed for up to 5 s, then a 5 s cooldown.
Dismounting mid-air grants Slow Falling for 10 s; dragons land safely if the pilot leaves.
Banking up to 90° with the mouse; rider tilts with the dragon.
Head and neck follow your view, and breath and fireballs go where the head points.
Compatible with Do a Barrel Roll.
Care, AI and Defense
Heal: right-click with raw fish (+10 health, Regeneration II) or cooked cod/salmon (+25 health, Regeneration III). Fish isn't used at full health.
Defense: adult dragons without a rider fight back against players, mobs and projectiles using their elemental breath. They never attack their owner, riders or other dragons.
Escort: an awake adult on the ground defends its owner within 30 blocks.
Baby dragons don't fight back.
Sleeping
Shift + Right Click with an empty hand to sleep or wake your dragon (mounting also wakes it). The state is saved with the world.
Full lying-down animation: legs, curved neck, wings folded like a blanket, curled tail, closing eyelids and breathing. After a fight, a dragon you ordered to sleep goes back to sleep.
Petronite
A custom mineral with its own ore and progression.

Ore generates between Y -30 and -20 in stone and deepslate.
Smelt it, then craft an Ingot (1 refined ore + 1 diamond) and a Block (9 ingots).
Used for armor, weapons, tools and artifacts.
Armor Sets
Set	Per piece	Full set
Petronite	+2 Max Health, +1 Armor	+8 Max Health, +20% speed
Void	+4 Max Health, +2 Armor	+16 Max Health, +40% speed
Both sets use animated 3D models, with EMF and animated-player-model compatibility.

Weapons and Artifacts
Item	Ability
Dawnblade	Charge and throw a piercing blade up to 50 blocks; it returns to your hand.
Stormaxe	Summons lightning on the enemy in front of you.
Arcane Staff	Right-click: poison beam. Left-click: area blast.
Petronite Pickaxe	Right-click: Haste V-style mining for 5 s (15 s cooldown).
Fairy Heart	Totem with 5 charges; saves you from death while held, and grants Regeneration I and Speed I.
Dragon Wings	Elytra-style flight: double-jump to glide, right-click with a Bone for a boost. +10% speed and Jump Boost I while worn.
All have custom animations and sounds, hotbar cooldown indicators, and an audio cue when abilities are ready.

Structures
Structure	Size	Generation
Medieval House	47 × 33 × 40	Plains, Savanna, Forests (Merchant, Blacksmith, Fairy)
Castle on the Moon	46 × 86 × 61	Extremely rare, floating around Y=160 (Wizard, Knight, Fairy)
Dragon Portal	Custom	Outer End islands; four elemental variants with dragon eggs
Glacial Arena	Custom	Overworld; Glacial Boss encounter
Castle Compass
Craft it with a Compass and a Petronite Ingot. Right-click to locate the selected structure, Sneak + Right-click to switch between the Medieval House, Castle on the Moon and Dragon Portal. Shows coordinates, distance and height difference.

3D Spawn Eggs
18 shaded 3D spawn eggs with unique textures: 12 NPCs, 5 creatures, the Dragoso and the Glacial Boss.

Compatibility and Configuration
Built on GeckoLib: animated NPCs, creatures, bosses, weapons, armor and dragons.
Optional compatibility with Entity Model Features, Punchy Moves and Do a Barrel Roll.
NPC trades are customizable through config/mundovivo.json.
Medieval fantasy, original creatures, powerful bosses, elemental dragons and animated gameplay in one expanding experience.

📖 More info: https://cerberoxyz.github.io/mundovivo
