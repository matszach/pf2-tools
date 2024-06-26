import RandomSpellsOptions from './RandomSpellsOptions'
import './RandomSpellsView.scss'

export default function RandomSpellsView() {
  return (
    <div className='RandomSpellsView'>
      <RandomSpellsOptions onGenerate={p => console.log(p)}></RandomSpellsOptions>
    </div>
  )
}