export type SortRule<T> = (o1: T, o2: T) => number;

export type FilterRule<T> = (o: T) => boolean;

export interface ApiQueryParameters<T> {
  sort?: SortRule<T>[];
  filter?: FilterRule<T>[];
}

export interface SpellQueryFilterParameters {
  name?: string;
  tradition?: string;
  level?: [number, number];
  traits?: [string, boolean][];
}

export interface SpellQuerySortParameters {
  field?: string;
  direction?: number;
}