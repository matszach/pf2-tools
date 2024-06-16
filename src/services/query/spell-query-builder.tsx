import { Spell } from "../../model/spell.model";
import { DataQueryBuilder } from "./data-query-builder";


export class SpellQueryBuilder extends DataQueryBuilder<Spell> {

  public name(name: string): this {
    this.registerFilter((spell) => spell.name.toLowerCase().includes(name.toLowerCase()));
    return this;
  }

  public level(min: number, max: number = min): this {
    this.registerFilter((spell) => spell.level >= min && spell.level <= max);
    return this;  
  }

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