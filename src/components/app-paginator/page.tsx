export class Page {
  constructor(
    public readonly size: number,
    public readonly selected: number,
  ) { }
  of(array: any[]): any[] {
    const base = this.selected - 1;
    return array.slice(base * this.size, (base + 1) * this.size);
  }
}