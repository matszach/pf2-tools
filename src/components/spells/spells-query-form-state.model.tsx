export interface SpellsQueryFormState {
  name?: string;
  minLevel?: number;
  maxLevel?: number;
  traits?: [string, boolean][],
  traditions?: string[],
}