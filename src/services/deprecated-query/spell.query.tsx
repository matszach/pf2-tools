import { SpellCastingTimeEnum, Spell, SpellDefenseEnum, SpellDurationEnum } from "../../model/spell.model";
import { TraitsToggleStateEnum } from "../../model/traits.model";
import { valuesExcept } from "../../utils/calculation.util";
import { SpellQueryFilterParameters, SpellQuerySortParameters } from "../../model/data-query.model";

/**
 * @deprecated
 */
export function tableSpellQuery(
  { name, tradition, traits, level, castingTime, defense, duration }: SpellQueryFilterParameters, 
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
      return !level || (spell.level >= level[0] && spell.level <= level[1])
    })
    .filter(spell => {
      if (traits) {
        for (const trait in traits) {
          if (traits[trait] === TraitsToggleStateEnum.ON && !spell.traits.includes(trait)) {
            return false
          } else if (traits[trait] === TraitsToggleStateEnum.OFF && spell.traits.includes(trait)) {
            return false
          }
        }
      }
      return true
    })
    .filter(spell => {
      if (defense === SpellDefenseEnum.ALL) {
        return true
      } else if (defense === SpellDefenseEnum.NONE) {
        return !spell.defense
      }
      return spell.defense?.includes(defense ?? '')
    })
    .filter(spell => {
      if (duration === SpellDurationEnum.ALL) {
        return true
      } else if (duration === SpellDurationEnum.INSTANT) {
        return  !spell.duration?.value
      }
      for (let v of valuesExcept(SpellDurationEnum, ['all', 'instant', 'other'])) {
        if (duration === v) {
          return spell.duration?.value === v
        }
      }
      if (duration === SpellDurationEnum.OTHER) {
        return !!spell.duration?.value && !Object.values(SpellDurationEnum).includes(spell.duration?.value)
      }
      return false
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
      const s1v = s1[field as keyof Spell] ?? ''
      const s2v = s2[field as keyof Spell] ?? ''
      if (s1v === s2v) {
        return 0
      }
      return direction * (s1v < s2v ? -1 : 1)
    })
}


export function pick<T>(count: number = 1): (items: T[]) => T[] {
  return (items: T[]) => {
    if (count > items.length) {
      return items
    }
    const pickedIndices: number[] = []
    const result: T[] = []
    while (result.length < count) {
      const index = Math.floor(Math.random() * items.length)
      if (!pickedIndices.includes(index)) {
        result.push(items[index])
        pickedIndices.push(index)
      }
    }
    return result;
  }
}

export function filter<T>(filterFn: (item: T) => boolean): (items: T[]) => T[] {
  return (items: T[]) => { 
    return items.filter(filterFn)
  }
}