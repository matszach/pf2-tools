export class Page {
  constructor(
    public readonly size: number,
    public readonly pageNumber: number,
  ) { }
  of(array: any[]): any[] {
    const base = this.pageNumber - 1;
    return array.slice(base * this.size, (base + 1) * this.size);
  }
}