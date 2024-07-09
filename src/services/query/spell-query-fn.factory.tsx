import { Spell } from "../../model/spell.model";
import { QueryFnFactory } from "./query-fn.factory";
import { FilterQueryFn } from "./query.model";

export class SpellQueryFnFactory extends QueryFnFactory<Spell> {
  
  static byName(name: string): FilterQueryFn<Spell> {
    return new FilterQueryFn<Spell>(spell => spell.name.toLowerCase().includes(name.toLowerCase()));
  }

}