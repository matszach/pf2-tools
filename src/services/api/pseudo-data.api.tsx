export class PseudoDataApi<T> {

  constructor(private readonly source: string) { }

  private data?: T[];

  public fetchData(): Promise<T[]> { 
    if (!!this.data) {
      return Promise.resolve(this.data);
    } else {
      return fetch(process.env.PUBLIC_URL + this.source).then(
        data => data.json().then((data) => {
          this.data = data;
          return this.data as T[];
        })
      );
    }
  }

}