import { Spell } from "../../model/spell.model";
import { SpellQueryFilterParameters, SpellQuerySortParameters } from "./data-query.model";

export function spellQuery(
  { name, tradition, traits, level }: SpellQueryFilterParameters, 
  { field, direction = 1 }: SpellQuerySortParameters
): (spells: Spell[]) => Spell[] {
  return (spells: Spell[]) => spells
    .filter(spell => {
      // name
      if (name && !spell.name.toLowerCase().includes(name.toLowerCase())) {
        return false
      }
      // tradition
      if (tradition && tradition !== 'all' && !spell.traditions.includes(tradition)) {
        return false
      }
      // traits
      if (traits) {
        for (const trait in traits) {
          if (traits[trait] === 1 && !spell.traits.includes(trait)) {
            return false
          } else if (traits[trait] === -1 && spell.traits.includes(trait)) {
            return false
          }
        }
      }
      // level
      if (level && (spell.level < level[0] || spell.level > level[1])) {
        return false
      }
      return true
    })
    .sort((s1: Spell, s2: Spell) => {
      const s1v = s1[field as keyof Spell];
      const s2v = s2[field as keyof Spell];
      if (s1v === s2v) {
        return 0
      }
      return direction * (s1v < s2v ? -1 : 1)
    })
}
