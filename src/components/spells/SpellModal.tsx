import './SpellsView.scss'
import { Modal } from "react-bootstrap"
import { Spell } from "../../model/spell.model"
import parse from 'html-react-parser'

function SpellModal ({ spell, onHide }: { spell: Spell | undefined, onHide: () => void }) {
  return (
    <Modal show={!!spell} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{spell?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Data trabsformer will need to edit out the vtt commands for this to fully work of course */}
        <p>{parse(spell?.description ?? '')}</p>
      </Modal.Body>
    </Modal>
  )
}

export default SpellModal