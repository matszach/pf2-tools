import './SpellsPreviewTable.scss';
import { Table } from "react-bootstrap";
import { Spell } from "../../model/spell.model";
import { SpellQuerySortParameters } from "../../services/query/data-query.model";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; 
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import provider from '../../services/provider';
import SpellModal from './SpellModal';
import { Fmt } from '../../utils/format.util';
import { content } from '../../content/content';

function SpellsPreviewTable({ spells, onSort }: { spells: Spell[], onSort: (sortParams: SpellQuerySortParameters) => void }) {

  const [spellInModal, setSpellInModal] = useState<Spell | undefined>(undefined)
  const [sortParams, setSortParams] = useState<SpellQuerySortParameters>({})
  const [searchParams, setSearchParams] = useSearchParams()

  const showModal = (spell: Spell) => {
    setSpellInModal(spell)
    setSearchParams({ key: spell.key })
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
    const searchKey = searchParams.get('key')
    if (searchKey) {
      provider.spellApi.get(searchKey).then((spell) => {
        setSpellInModal(spell)
      })
    }
  })

  const renderSortArrow = (field: string) => {
    return (sortParams.field === field) ? (sortParams.direction === 1 ? <FaArrowDown /> : <FaArrowUp />) : null
  }

  return (
    <Table className="SpellsPreviewTable" striped bordered hover responsive>
      <thead>
        <tr>
          {[
            ['Name', 'name', true],
            ['Level', 'level', true],
            ['Casting Time', 'castingTime', true],
            ['Target', 'target', false],
            ['Defense', 'defense', true],
            ['Range', 'range', false],
            ['Area', 'area', false],
            ['Duration', 'duration', false],
            ['Traditions', 'traditions', true],
            // ['Traits', 'traits']
          ].map(([header, field, sortable]) => (
            sortable ? (
              <th className={`${field} sortable`} key={`${field}`} onClick={() => toggleSort(field as string)}>
                {header}{renderSortArrow(field as string)}
              </th> 
            ) : (
              <th className={`${field}`} key={`${field}`}>
                {header}
              </th>
            )
          ))}
        </tr>
      </thead>
      <tbody> 
        {spells.map((spell) => (
          <tr key={spell.key} onClick={() => showModal(spell)}>
            <td>{spell.name}</td>
            <td>{spell.level}</td>
            <td>{spell.castingTime}</td>
            <td>{Fmt.limit(spell.target)}</td>
            <td>{Fmt.enum(spell.defense, content.enumMap.defense)}</td>
            <td>{Fmt.limit(spell.range)}</td>
            <td>{Fmt.area(spell.area)}</td>
            <td>{Fmt.duration(spell.duration)}</td>
            <td>{spell.traditions.join(', ')}</td>
            {/* <td>{spell.traits.join(', ')}</td> */}
          </tr>
        ))}
      </tbody>
      <SpellModal spell={spellInModal} onHide={closeModal} />
    </Table>
  )
}

export default SpellsPreviewTable