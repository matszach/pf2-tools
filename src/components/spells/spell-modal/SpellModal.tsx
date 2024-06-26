import './SpellModal.scss'
import { Badge, Button, Modal } from "react-bootstrap"
import { Spell } from "../../../model/spell.model"
import parse from 'html-react-parser'
import { useState } from 'react'
import { isLocal } from '../../../utils/env.utils'
import { Fmt } from '../../../utils/format.util'
import { content } from '../../../content/content'

function SpellModal ({ spell, onHide }: { spell: Spell | undefined, onHide: () => void }) {
  const [useVTT, setUseVTT] = useState(false)
  const cn = content.spells.modal

  const row = (label: string, value?: string) => (
    (!!value && value !== '-') ? (
      <div><strong>{label}: </strong>{value}</div>
    ) : <></>
  )
  
  return (
    <Modal className='SpellModal' size='xl' show={!!spell} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>{spell?.name}</span>
          <span className='m-3'>{spell?.level}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Data trabsformer will need   to edit out the vtt commands for this to fully work of course */}
        <div>{spell?.traits.map(trait => (
          <Badge className='m-1' bg='secondary' key={trait}>{Fmt.capitalize(trait)}</Badge>
        ))}</div>
        <hr/>
        {row(cn.traditions, Fmt.array(spell?.traditions, ''))}
        {/* TODO a function to retrn images for these */}
        {row(cn.castingTime, spell?.castingTime)} 
        {row(cn.range, spell?.range)}
        {row(cn.area, Fmt.area(spell?.area, ''))}
        {row(cn.target, spell?.target)}
        {row(cn.defense, Fmt.enum(spell?.defense, content.enumMap.defense, ''))}
        {row(cn.duration, Fmt.duration(spell?.duration, ''))}
        {row(cn.cost, spell?.cost)}
        {row(cn.requirements, spell?.requirements)}
        <hr/>
        {/* tables need styling somehow, eg Abyssal Wrath */}
        <p>{parse((useVTT ? spell?.vttDescription : spell?.description) ?? '')}</p>
      </Modal.Body>
      {/* local debug vtt description display */}
      {isLocal() ? (
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUseVTT(!useVTT)}>{useVTT ? 'Use Parsed' : 'Use VTT'}</Button>
        </Modal.Footer>
      ) : <></>}
    </Modal>
  )
}

export default SpellModal