import { Spell } from "../../model/spell.model";
import { PseudoDataApi } from "./pseudo-data.api";

export class SpellApi extends PseudoDataApi<Spell> {

  constructor() {
    super('./data/spells.json');
  }
  
}