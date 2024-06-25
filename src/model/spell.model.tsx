import { Source } from "./source.model";
import { TraitsGroups } from "./traits.model";

export interface Spell {
  name: string;
  key: string;
  level: number;
  description: string;
  vttDescription: string;
  cost: string;
  area: any; // todo
  defense: string;
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

export const SPELL_TRAITS: TraitsGroups = {
  ALIGNMENT: ['chaotic', 'evil', 'good', 'lawful', 'sanctified', 'holy', 'unholy'],
  CLASS: ['bard', 'champion', 'cleric', 'druid', 'magus', 'monk', 'oracle', 'psychic', 'ranger', 'sorcerer', 'summoner', 'witch', 'wizard'],
  DELIVERY: ['aura', 'attack', 'auditory', 'concentrate', 'contingency', 'incapacitation', 'inhaled', 'linguistic', 'nonlethal', 'olfactory', 'manipulate', 'spellshape', 'stance', 'subtle', 'visual'],
  KIND: ['acid', 'air', 'cold', 'curse', 'darkness', 'death', 'detection', 'disease', 'earth', 'electricity', 'emotion', 'fear', 'fire', 'force', 'fortune', 'fungus', 'healing', 'illusion', 'light', 'mental', 'metal', 'misfortune', 'morph', 'plant', 'poison', 'polymorph', 'possession', 'prediction', 'scrying', 'shadow', 'sleep', 'sonic', 'spirit', 'summon', 'teleportation', 'vitality', 'void', 'water', 'wood', 'extradimensional', 'move'],
  OTHER: ['beast', 'consecration', 'cursebound', 'dream', 'eidolon', 'incarnate', 'incorporeal', 'litany', 'revelation', 'true-name', 'trial'],
  RARITY: ['common', 'uncommon', 'rare', 'unique'],
  TYPE: ['cantrip', 'composition', 'focus', 'hex', 'ritual']
};

export enum SpellTraditionEnum {
  ALL = 'all',
  ARCANE = 'arcane',
  DIVINE = 'divine',
  PRIMAL = 'primal',
  OCCULT = 'occult'
}

export enum SpellDefenseEnum {
  ALL = 'all',
  NONE = 'none',
  FORT = 'fortitude',
  REF = 'reflex',
  WILL = 'will',
  AC = 'AC'
}

export enum SpellCastingTimeEnum {
  ALL = 'all',
  ONE_ACTION = '1 action',
  TWO_ACTIONS = '2 actions', 
  THREE_ACTIONS = '3 actions',
  FLEXIBLE = 'flexible',
  FREE = 'free', 
  REACTION = 'reaction', 
  MINUTES = 'minutes', 
  HOURS = 'hours', 
  DAYS = 'days'
}

export enum SpellDurationEnum {
  ALL = 'all',
  INSTANT = 'instant',
  ONE_ROUND = '1 round',
  ONE_MINUTE = '1 minute',
  TEN_MINUTES = '10 minutes',
  ONE_HOUR = '1 hour',
  EIGHT_HOURS = '8 hours',
  OTHER = 'other'
}