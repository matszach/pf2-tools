import './SpellsView.scss'
import { Badge, Col, Modal, Row } from "react-bootstrap"
import { Spell } from "../../model/spell.model"
import parse from 'html-react-parser'
import { capitalize } from '../../utils/format.util'

function SpellModal ({ spell, onHide }: { spell: Spell | undefined, onHide: () => void }) {

  return (
    <Modal show={!!spell} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>{spell?.name}</span>
          <span className='m-3'>{spell?.level}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Data trabsformer will need   to edit out the vtt commands for this to fully work of course */}
        <p>{spell?.traits.map(trait => (
          <Badge className='m-1' bg='secondary' key={trait}>{capitalize(trait)}</Badge>
        ))}</p>
        <hr/>
        <p>{parse(spell?.description ?? '')}</p>
      </Modal.Body>
    </Modal>
  )
}

export default SpellModal