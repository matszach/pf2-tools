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