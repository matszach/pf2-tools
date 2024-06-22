import { SpellCastingTimeEnum, SpellDefenseEnum } from "../../model/spell.model";

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
  defense?: SpellDefenseEnum;
}

export interface SpellQuerySortParameters {
  field?: string;
  direction?: number;
}