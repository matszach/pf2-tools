import { Spell } from "../../model/spell.model";
import { PseudoDataApi } from "./pseudo-data.api";

export class SpellApi extends PseudoDataApi<Spell> {

  constructor() {
    super('/data/spells.json');
  }

  public get(key: string): Promise<Spell | undefined> {
    return this.fetchData().then(data => data.find(spell => spell.key === key));
  }
  
}