import './SpellsPreviewTable.scss';
import { Modal, Table } from "react-bootstrap";
import { Spell } from "../../model/spell.model";
import { SpellQuerySortParameters } from "../../services/query/data-query.model";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; 
import { useEffect, useState } from "react";
import parse from 'html-react-parser'
import { useSearchParams } from 'react-router-dom';
import provider from '../../services/provider';

function SpellsPreviewTable({ spells, onSort }: { spells: Spell[], onSort: (sortParams: SpellQuerySortParameters) => void }) {

  // TODO read param from url to launch spell modal?
  const [spellInModal, setSpellInModal] = useState<Spell | undefined>(undefined)
  const [sortParams, setSortParams] = useState<SpellQuerySortParameters>({})
  const [searchParams, setSearchParams] = useSearchParams()

  const showModal = (spell: Spell) => {
    setSpellInModal(spell)
    setSearchParams({ spell: spell.key })
  }

  const closeModal = () => {
    setSpellInModal(undefined)
    setSearchParams({})
  }

  const toggleSort = (field: string) => {
    setSortParams({ 
      field, 
      direction: sortParams.field === field ? -(sortParams.direction ?? 1) : 1 
    })
  }

  useEffect(() => {
    onSort(sortParams)
  }, [sortParams])

  useEffect(() => {
    const searchKey = searchParams.get('spell')
    if (searchKey) {
      provider.spellApi.get(searchKey).then((spell) => {
        setSpellInModal(spell)
      })
    }
  })

  const renderSortArrow = (field: string) => {
    return sortParams.field === field ? (sortParams.direction === 1 ? <FaArrowDown /> : <FaArrowUp />) : null
  }

  return (
    <Table className="SpellsPreviewTable" striped bordered hover responsive>
      <thead>
        <tr>
          {[
            ['Name', 'name'],
            ['Level', 'level'],
            ['Casting Time', 'castingTime'],
            ['Traditions', 'traditions'],
            ['Traits', 'traits'],
          ].map(([header, field]) => (
            <th className={field} key={field} onClick={() => toggleSort(field)}>
              {header}{renderSortArrow(field)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody> 
        {spells.map((spell) => (
          <tr key={spell.key} onClick={() => showModal(spell)}>
            <td>{spell.name}</td>
            <td>{spell.level}</td>
            <td>{spell.castingTime}</td>
            <td>{spell.traditions.join(', ')}</td>
            <td>{spell.traits.join(', ')}</td>
          </tr>
        ))}
      </tbody>
      {/* OWN COMPONENT */}
      <Modal show={!!spellInModal} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{spellInModal?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Data trabsformer will need to edit out the vtt commands for this to fully work of course */}
          <p>{parse(spellInModal?.description ?? '')}</p>
        </Modal.Body>
      </Modal>
    </Table>
  )
}

export default SpellsPreviewTable