import { SPELL_CASTING_TIMES, Spell } from "../../model/spell.model";
import { SpellQueryFilterParameters, SpellQuerySortParameters } from "./data-query.model";

export function spellQuery(
  { name, tradition, traits, level, castingTime }: SpellQueryFilterParameters, 
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
    }).filter(spell => {
      if (castingTime === SPELL_CASTING_TIMES.ONE_ACTION) {
        return ['1', '1 to 3', '1 or 2'].includes(spell.castingTime)
      } else if (castingTime === SPELL_CASTING_TIMES.TWO_ACTIONS) {
        return ['1 or 2', '1 to 3', '2', '2 or 3', '2 to 2 rounds'].includes(spell.castingTime)
      } else if (castingTime === SPELL_CASTING_TIMES.THREE_ACTIONS) {
        return ['3', '1 to 3', '2 or 3', '2 to 2 rounds'].includes(spell.castingTime)
      } else if (castingTime === SPELL_CASTING_TIMES.FLEXIBLE) {
        return spell.castingTime.includes(' to ') || spell.castingTime.includes(' or ')
      } else if (castingTime === SPELL_CASTING_TIMES.REACTION) {
        return spell.castingTime === 'reaction'
      } else if (castingTime === SPELL_CASTING_TIMES.FREE) {
        return spell.castingTime === 'free'
      } else if (castingTime === SPELL_CASTING_TIMES.MINUTES) {
        return spell.castingTime.includes(' minute')
      } else if (castingTime === SPELL_CASTING_TIMES.HOURS) {
        return spell.castingTime.includes(' hour')
      } else if (castingTime === SPELL_CASTING_TIMES.DAYS) {
        return spell.castingTime.includes(' day')
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
