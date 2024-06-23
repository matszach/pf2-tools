import { SpellCastingTimeEnum, SpellDefenseEnum, SpellDurationEnum, SpellTraditionEnum, TraitsSelection } from "../../model/spell.model";

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