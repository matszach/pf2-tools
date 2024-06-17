import { Spell } from "../../model/spell.model";
import { SpellQueryFilterParameters, SpellQuerySortParameters } from "./data-query.model";

export function spellQuery(
  { name, tradition, traits, level }: SpellQueryFilterParameters, 
  { field, direction = 1 }: SpellQuerySortParameters
): (spells: Spell[]) => Spell[] {
  return (spells: Spell[]) => spells
    .filter(spell => {
      return !name || spell.name.toLowerCase().includes(name.toLowerCase())
    })
    .filter(spell => {
      return !tradition || tradition === 'all' || spell.traditions.includes(tradition)
    })
    .filter(spell => {
      return !level || spell.level >= level[0] && spell.level <= level[1]
    })
    .filter(spell => {
      if (traits) {
        for (const trait in traits) {
          if (traits[trait] === 1 && !spell.traits.includes(trait)) {
            return false
          } else if (traits[trait] === -1 && spell.traits.includes(trait)) {
            return false
          }
        }
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
