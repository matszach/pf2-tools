import { useState } from 'react'
import RandomSpellsOptions from './RandomSpellsOptions'
import './RandomSpellsView.scss'
import { Spell } from '../../../model/spell.model'
import SpellModal from '../spell-modal/SpellModal'
import provider from '../../../services/provider'
import { RandomSpellQueryType, RandomSpellsOptionsParameters } from '../../../model/data-query.model'

export default function RandomSpellsView() {

  const [spellInModal, setSpellInModal] = useState<Spell | undefined>(undefined)

  const [randomSpells, setRandomSpells] = useState<Spell[] | undefined>(undefined)
  const [randomSpellBook, setRandomSpellBook] = useState<Spell[][] | undefined>(undefined)
  const [randomSpellRepertoire, setRandomSpellRepertoire] = useState<[Spell, boolean][][] | undefined>(undefined)
  
  const generate = (opts: RandomSpellsOptionsParameters) => {
    setRandomSpells(undefined)
    setRandomSpellBook(undefined)
    setRandomSpellRepertoire(undefined)
    if (opts.queryType === RandomSpellQueryType.SPELLS) {
      provider.randomSpellService.getRandomSpells(opts).then(setRandomSpells)
    } else if (opts.queryType === RandomSpellQueryType.SPELL_BOOK) {
      // provider.randomSpellService.getRandomSpellsByBook(opts).then(setRandomSpellBook)
    } else if (opts.queryType === RandomSpellQueryType.SPELL_REPERTOIRE) {
      // provider.randomSpellService.getRandomSpellsByRepertoire(opts).then(setRandomSpellRepertoire)
    }
  }

  return (
    <div className='RandomSpellsView'>
      <RandomSpellsOptions onGenerate={generate}></RandomSpellsOptions>
      {randomSpells ? randomSpells.map((spell, i) => <div key={i} onClick={() => setSpellInModal(spell)}>{spell.name}</div>) : <></>}
      <SpellModal spell={spellInModal} onHide={() => setSpellInModal(undefined)} />
    </div>
  )
}