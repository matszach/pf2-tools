import { ApiQueryParameters, FilterRule, SortRule } from "./data-query.model";

export class DataQueryBuilder<T> {

  constructor(
    private apiQuery: ApiQueryParameters<T> = {}
  ) { }

  // ============================ sort ============================
  protected registerSort(sort: SortRule<T>): this {
    if (!this.apiQuery.sort) {
      this.apiQuery.sort = [];
    }
    this.apiQuery.sort.push(sort);
    return this;
  }

  public sortBy(field: string, direction: number = 1): this {
    this.registerSort((a, b) => {
      if (a[field as keyof T] === b[field as keyof T]) {
        return 0
      }
      return direction * (a[field as keyof T] < b[field as keyof T] ? -1 : 1)}
    );
    return this;
  }

  // ============================ filter ============================
  protected registerFilter(filter: FilterRule<T>): this {
    if (!this.apiQuery.filter) {
      this.apiQuery.filter = [];
    }
    this.apiQuery.filter.push(filter);
    return this;
  }

  // ============================ build ============================
  public build(): ApiQueryParameters<T> {
    return this.apiQuery;
  }

}