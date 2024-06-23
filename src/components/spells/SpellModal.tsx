import './SpellsView.scss'
import { Badge, Button, Col, Modal, Row } from "react-bootstrap"
import { Spell } from "../../model/spell.model"
import parse from 'html-react-parser'
import { capitalize, defenseStringValue } from '../../utils/format.util'
import { useState } from 'react'
import { isLocal } from '../../utils/env.utils'

function SpellModal ({ spell, onHide }: { spell: Spell | undefined, onHide: () => void }) {
  const [useVTT, setUseVTT] = useState(false)

  const descRow = (label: string, value?: string) => (
    value ? (
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
          <Badge className='m-1' bg='secondary' key={trait}>{capitalize(trait)}</Badge>
        ))}</div>
        <hr/>
        {descRow('Traditions', spell?.traditions?.join(', '))}
        {/* TODO a function to retrn images for these */}
        {descRow('Casting time', spell?.castingTime)} 
        {descRow('Range', spell?.range)}
        {descRow('Area', 'TODO')}
        {descRow('Target', spell?.target)}
        {descRow('Defense', defenseStringValue(spell?.defense, ''))}
        {descRow('Cost', spell?.cost)}
        {descRow('Requirements', spell?.requirements)}
        <hr/>
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