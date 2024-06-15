import { Spell } from "../../model/spell.model";
import { DataQueryService } from "./data-query.service";
import spells from "../../data/spells.json";

export class SpellQueryService extends DataQueryService<Spell> {

  constructor() {
    super(spells as Array<Spell>);
  }
  
}