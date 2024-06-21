import { SpellCastingTimeEnum, Spell, SpellDefenseEnum } from "../../model/spell.model";
import { SpellQueryFilterParameters, SpellQuerySortParameters } from "./data-query.model";

export function spellQuery(
  { name, tradition, traits, level, castingTime, defense }: SpellQueryFilterParameters, 
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
    .filter(spell => {
      if (defense === SpellDefenseEnum.NONE) {
        return !spell.defense
      } else if (defense === SpellDefenseEnum.AC) {
        return spell.defense?.passive?.statistic === 'ac'
      } else if (defense === SpellDefenseEnum.FORT) {
        return (spell.defense?.passive?.statistic === 'fortitude-dc') || (spell.defense?.save?.statistic === 'fortitude')
      } else if (defense === SpellDefenseEnum.REF) {
        return (spell.defense?.passive?.statistic === 'reflex-dc') || (spell.defense?.save?.statistic === 'reflex')
      } else if (defense === SpellDefenseEnum.WILL) {
        return (spell.defense?.passive?.statistic === 'will-dc') || (spell.defense?.save?.statistic === 'will')
      }
      return true
    })
    .filter(spell => {
      if (castingTime === SpellCastingTimeEnum.ONE_ACTION) {
        return ['1', '1 to 3', '1 or 2'].includes(spell.castingTime)
      } else if (castingTime === SpellCastingTimeEnum.TWO_ACTIONS) {
        return ['1 or 2', '1 to 3', '2', '2 or 3', '2 to 2 rounds'].includes(spell.castingTime)
      } else if (castingTime === SpellCastingTimeEnum.THREE_ACTIONS) {
        return ['3', '1 to 3', '2 or 3', '2 to 2 rounds'].includes(spell.castingTime)
      } else if (castingTime === SpellCastingTimeEnum.FLEXIBLE) {
        return spell.castingTime.includes(' to ') || spell.castingTime.includes(' or ')
      } else if (castingTime === SpellCastingTimeEnum.REACTION) {
        return spell.castingTime === 'reaction'
      } else if (castingTime === SpellCastingTimeEnum.FREE) {
        return spell.castingTime === 'free'
      } else if (castingTime === SpellCastingTimeEnum.MINUTES) {
        return spell.castingTime.includes(' minute')
      } else if (castingTime === SpellCastingTimeEnum.HOURS) {
        return spell.castingTime.includes(' hour')
      } else if (castingTime === SpellCastingTimeEnum.DAYS) {
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