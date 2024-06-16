import { Spell } from "../../model/spell.model";
import { DataQueryBuilder } from "./data-query-builder";
import { SpellQueryFilterParameters, SpellQuerySortParameters } from "./data-query.model";


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

  public inTraditions(...traditions: string[]): this {
    this.registerFilter((spell) => {
      return spell.traditions.some((tradition) => traditions.includes(tradition));
    });
    return this;
  }

  public fromParams({ filterParams, sortParams }: { filterParams: SpellQueryFilterParameters, sortParams: SpellQuerySortParameters }): this {
    console.log({ filterParams })
    if (filterParams.name) {
      this.name(filterParams.name);
    }
    if (filterParams.tradition && filterParams.tradition !== "all") {
      this.inTraditions(filterParams.tradition);
    }
    return this;
  }
}