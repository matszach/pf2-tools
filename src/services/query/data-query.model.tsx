export interface SpellQueryFilterParameters {
  name?: string;
  tradition?: string;
  level?: [number, number];
  traits?: { [trait: string]: number };
  castingTime?: string;
}

export interface SpellQuerySortParameters {
  field?: string;
  direction?: number;
}