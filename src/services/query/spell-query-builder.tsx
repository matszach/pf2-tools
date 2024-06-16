import { Spell } from "../../model/spell.model";
import { DataQueryBuilder } from "./data-query-builder";
import { SpellQueryFilterParameters, SpellQuerySortParameters } from "./data-query.model";


export class SpellQueryBuilder extends DataQueryBuilder<Spell> {

  public name(name: string): this {
    this.registerFilter((spell) => spell.name.toLowerCase().includes(name.toLowerCase()))
    return this
  }

  public level(min: number, max: number = min): this {
    this.registerFilter((spell) => spell.level >= min && spell.level <= max)
    return this
  }

  public hasTrait(traits: string): this {
    this.registerFilter((spell) => spell.traits.includes(traits))
    return this
  }

  public notHasTrait(traits: string): this {
    this.registerFilter((spell) => !spell.traits.includes(traits))
    return this
  }

  public inTraditions(...traditions: string[]): this {
    this.registerFilter((spell) => {
      return spell.traditions.some((tradition) => traditions.includes(tradition))
    })
    return this
  }

  public fromParams({ filterParams, sortParams }: { filterParams: SpellQueryFilterParameters, sortParams: SpellQuerySortParameters }): this {
    if (filterParams.name) {
      this.name(filterParams.name)
    }
    if (filterParams.tradition && filterParams.tradition !== "all") {
      this.inTraditions(filterParams.tradition)
    }
    if (filterParams.traits) {
      for (const trait in filterParams.traits) {
        if (filterParams.traits[trait] === 1) {
          this.hasTrait(trait)
        } else if (filterParams.traits[trait] === -1) {
          this.notHasTrait(trait)
        }
      }
    }
    if (sortParams.field) {
      this.sortBy(sortParams.field, sortParams.direction)
    }
    return this
  }
}