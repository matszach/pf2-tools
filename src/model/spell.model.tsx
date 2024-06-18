import { Source } from "./source.model";

export interface Spell {
  name: string;
  key: string;
  level: number;
  description: string;
  cost: string;
  area: any; // todo
  defense: any; // todo
  source: Source;
  range: string;
  target: string;
  time: string;
  components: string;
  duration: any; // todo
  castingTime: string; // todo enum
  traditions: string[];
  traits: string[];
  rarity: string;
  requirements: string;
}

// separate, then make a unit tests tak makes sure none are missing
export const ALL_SPELL_TRAITS = [
  'acid', 'air', 'attack', 'auditory', 'aura', 'bard', 'beast', 'cantrip', 
  'champion', 'chaotic', 'cleric', 'cold', 'common','composition', 'concentrate', 
  'consecration', 'contingency', 'curse', 'cursebound', 'darkness', 'death', 
  'detection', 'disease', 'dream', 'druid', 'earth', 'eidolon', 'electricity', 
  'emotion', 'evil', 'extradimensional', 'fear', 'fire', 'focus', 
  'force', 'fortune', 'fungus', 'good', 'healing', 'hex', 'holy', 'illusion', 
  'incapacitation', 'incarnate', 'incorporeal', 'inhaled', 'lawful', 'light', 
  'linguistic', 'litany', 'magus', 'manipulate', 'mental', 'metal', 'misfortune', 
  'monk', 'morph', 'move', 'nonlethal', 'olfactory', 'oracle', 'plant', 'poison', 
  'polymorph', 'possession', 'prediction', 'psychic', 'ranger', 'rare', 'revelation', 
  'ritual', 'sanctified', 'scrying', 'shadow', 'sleep', 'sonic', 'sorcerer', 
  'spellshape', 'spirit', 'stance', 'subtle', 'summon', 'summoner', 'teleportation', 
  'trial', 'true-name', 'uncommon', 'unholy', 'visual', 'vitality', 'void', 'water', 'witch', 
  'wizard', 'wood'
]

export const ALL_SPELL_TRADITIONS = [
  'arcane', 'divine', 'primal', 'occult'
]