import { SpellCastingTimeEnum, SpellDefenseEnum, SpellDurationEnum, SpellTraditionEnum } from "./spell.model";
import { TraitsSelection } from "./traits.model";

export interface SpellQueryFilterParameters {
  name?: string;
  tradition?: SpellTraditionEnum;
  level?: [number, number];
  traits?: TraitsSelection;
  castingTime?: SpellCastingTimeEnum,
  range?: string;
  area?: string;
  duration?: SpellDurationEnum;
  target?: string;
  defense?: SpellDefenseEnum;
}

export interface SpellQuerySortParameters {
  field?: string;
  direction?: number;
}

export interface RandomSpellsOptionsParameters {
  queryType?: RandomSpellQueryType,
  tradition?: SpellTraditionEnum;
  characterLevel?: number;
  spellRank?: number;
  numberOfSpells?: number;
}

export enum RandomSpellQueryType {
  SPELLS = 'spells',
  SPELL_BOOK = 'spellBook',
  SPELL_REPERTOIRE = 'spellRepertoire'
}