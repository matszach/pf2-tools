import { Spell } from "../../model/spell.model";
import { PseudoDataApi } from "./data-api.service";

export class SpellApi extends PseudoDataApi<Spell> {

  constructor() {
    super('./data/spells.json');
  }
  
}