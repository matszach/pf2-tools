import { ApiQueryParameters } from "./api.model";

export class PseudoDataApi<T> {

  constructor(private readonly source: string) { }

  private data?: T[];

  public fetchData(): Promise<T[]> { 
    if (!!this.data) {
      return Promise.resolve(this.data);
    } else {
      return fetch(this.source).then(
        data => data.json().then((data) => {
          this.data = data;
          return this.data as T[];
        })
      );
    }
  }

  public query(params: ApiQueryParameters = {}): Promise<T[]> {
    return this.fetchData()
      .then((data) => {
        if (!!params.filter) {
          return data.filter(item => params.filter?.every(rule => rule(item)));
        }
        return data;
      })
      .then((data) => {
        if (!!params.sort) {
          return data.sort((a, b) => {
            for (const rule of params.sort || []) {
              const result = rule(a, b);
              if (result !== 0) {
                return result;
              }
            }
            return 0;
          })
        }
        return data;
      })
      .then((data) => {
        if (!!params.page) { // todo check if page size makes sense
          return data.slice(params.page.offset * params.page.size, params.page.offset + params.page.size);
        }
        return data;
      })
  }

}