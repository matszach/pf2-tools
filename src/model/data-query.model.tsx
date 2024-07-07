import { SpellCastingTimeEnum, SpellDefenseEnum, SpellDurationEnum, SpellTraditionEnum } from "./spell.model";
import { TraitsSelection } from "./traits.model";

/**
 * @deprecated
 */
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

/**
 * @deprecated
 */
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

export abstract class QueryFn<T> {
  abstract apply(items: T[]): T[]
}

export class FilterQueryFn<T> extends QueryFn<T> {
  constructor(private readonly filterFn: (item: T) => boolean) {
    super();
  }
  apply(items: T[]): T[] {
    return items.filter(this.filterFn);
  }
}

export class SortQueryFn<T> extends QueryFn<T> {
  constructor(private readonly sortFn: (i1: T, i2: T) => number) {
    super();
  }
  apply(items: T[]): T[] {
    return items.sort(this.sortFn);
  }
}