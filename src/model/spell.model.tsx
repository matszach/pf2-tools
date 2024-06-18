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

export const SPELL_TRADITIONS = [
  'arcane', 'divine', 'primal', 'occult'
]

// export const POSSIBLE_SPELL_CASTING_TIMES = [
//   '2', '1 to 3', '1', 'reaction', '10 minutes', '3', 
//   '1 minute', '2 hours', '1 day', '1 hour', '4 hours', 
//   '30 minutes', '2 or 3', 'free', '7 days', '6 days', 
//   '3 days', '9 days', '2 days', '2 to 2 rounds', 
//   '1 week', '1 or 2', '8 hours', '5 minutes', 'Free'
// ]

// TODO - maps props so that data is not mixed up with content
export enum SPELL_CASTING_TIMES {
  ONE_ACTION = '1 action',
  TWO_ACTIONS = '2 actions', 
  THREE_ACTIONS = '3 actions', 
  FREE = 'rree action', 
  REACTION = 'reaction', 
  MINUTES = 'minutes', 
  HOURS = 'hours', 
  DAYS = 'days'
}