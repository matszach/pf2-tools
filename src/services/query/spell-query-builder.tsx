import { Spell } from "../../model/spell.model";
import { DataQueryBuilder } from "./data-query-builder";


export class SpellQueryBuilder extends DataQueryBuilder<Spell> {

  public name(name: string): this {
    this.registerFilter((spell) => spell.name.includes(name));
    return this;
  }

  public level(min: number, max: number = min): this {
    this.registerFilter((spell) => spell.level >= min && spell.level <= max);
    return this;  
  }

  // TODO add a fake "ritual" trait to ritual spells in transformer
  public hasTraits(...traits: string[]): this {
    this.registerFilter((spell) => {
      return traits.every((trait) => spell.traits.includes(trait));
    });
    return this;
  }

  public notHasTraits(...traits: string[]): this {
    this.registerFilter((spell) => {
      return !traits.every((trait) => spell.traits.includes(trait));
    });
    return this;
  }
}