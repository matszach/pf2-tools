export interface Page {
  size: number;
  offset: number;
}

export type SortRule<T> = (o1: T, o2: T) => number;

export type FilterRule<T> = (o: T) => boolean;

export interface ApiQueryParameters<T> {
  page?: Page;
  sort?: SortRule<T>[];
  filter?: FilterRule<T>[];
}