import { Spell } from "../../model/spell.model";
import { DataQueryBuilder } from "./data-query-builder";


export class SpellQueryBuilder extends DataQueryBuilder<Spell> {

  public name(name: string): this {
    this.registerFilter((spell) => spell.name === name);
    return this;
  }

  public level(min: number, max: number = min): this {
    this.registerFilter((spell) => spell.level >= min && spell.level <= max);
    return this;  
  }

  // TODO add a fake "ritual" trait to ritual spells in transformer
  public traits(...traitDefs: Array<[string, boolean]>): this {
    this.registerFilter((spell) => {
      for (const [trait, wanted] of traitDefs) {
        if (spell.traits.includes(trait) !== wanted) {
          return false;
        }
      }
      return true;
    });
    return this;
  }
}