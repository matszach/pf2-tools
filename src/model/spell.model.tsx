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

export const SPELL_TRAITS = {
  ALIGNMENT: ['chaotic', 'evil', 'good', 'lawful', 'sanctified', 'holy', 'unholy'],
  CLASS: ['bard', 'champion', 'cleric', 'druid', 'magus', 'monk', 'oracle', 'psychic', 'ranger', 'sorcerer', 'summoner', 'witch', 'wizard'],
  DELIVERY: ['aura', 'attack', 'auditory', 'concentrate', 'contingency', 'incapacitation', 'inhaled', 'linguistic', 'nonlethal', 'olfactory', 'manipulate', 'spellshape', 'stance', 'subtle', 'visual'],
  KIND: ['acid', 'air', 'cold', 'curse', 'darkness', 'death', 'detection', 'disease', 'earth', 'electricity', 'emotion', 'fear', 'fire', 'force', 'fortune', 'fungus', 'healing', 'illusion', 'light', 'mental', 'metal', 'misfortune', 'morph', 'plant', 'poison', 'polymorph', 'possession', 'prediction', 'scrying', 'shadow', 'sleep', 'sonic', 'spirit', 'summon', 'teleportation', 'vitality', 'void', 'water', 'wood', 'extradimensional', 'move'],
  OTHER: ['beast', 'consecration', 'cursebound', 'dream', 'eidolon', 'incarnate', 'incorporeal', 'litany', 'revelation', 'true-name', 'trial'],
  RARITY: ['common', 'uncommon', 'rare', 'unique'],
  TYPE: ['cantrip', 'composition', 'focus', 'hex', 'ritual']
};

export const ALL_SPELL_TRADITIONS = [
  'arcane', 'divine', 'primal', 'occult'
]