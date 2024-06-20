import { SpellCastingTimeEnum } from "../../model/spell.model";

export interface SpellQueryFilterParameters {
  name?: string;
  tradition?: string;
  level?: [number, number];
  traits?: { [trait: string]: number };
  castingTime?: SpellCastingTimeEnum,
  range?: string;
  area?: string;
  duration?: string;
  target?: string;
  defense?: string;
}

export interface SpellQuerySortParameters {
  field?: string;
  direction?: number;
}