export interface Page {
  size: number;
  offset: number;
}

export type SortRule = (o1: any, o2: any) => number;

export type FilterRule = (o: any) => boolean;

export interface ApiQueryParameters {
  page?: Page;
  sort?: SortRule[];
  filter?: FilterRule[];
}