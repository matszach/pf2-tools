export class DataQueryService<T> {

  constructor(private readonly data: Array<T>) { }

  private rules: Array<(item: T) => boolean> = [];

  public setRule(ruleFn: (item: T) => boolean):  DataQueryService<T> {
    this.rules.push(ruleFn);
    return this;
  }

  public get(): Array<T> {
    const result = this.data.filter(item => this.rules.every(rule => rule(item)));
    this.rules = [];
    return result;
  }

}