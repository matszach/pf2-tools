import spells from '../../public/data/spells.json'
import { SPELL_TRAITS, Spell } from './spell.model'


describe('Spell Model', () => {

  const recognizedTraits = Object.values(SPELL_TRAITS).flat()
  const uniqueTraits: string[] = (spells as Spell[]).reduce((acc, spell) => {
    return Array.from(new Set([...acc, ...spell.traits]))
  }, [] as string[])

  test('no trait is repeated', () => { 
    for (const trait of recognizedTraits) {
      if (recognizedTraits.filter(t => t === trait).length !== 1) {
        throw new Error(`Trait ${trait} is repeated`)
      }
    }
    expect(1).toBe(1)
  });
  
  test('no traits are missing', () => { 
    for (const trait of uniqueTraits) { 
      expect(recognizedTraits).toContain(trait)
    }
  })

})