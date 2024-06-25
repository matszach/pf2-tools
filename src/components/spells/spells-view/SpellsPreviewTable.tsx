import './SpellsPreviewTable.scss';
import { Table } from "react-bootstrap";
import { Spell } from "../../../model/spell.model";
import { SpellQuerySortParameters } from "../../../services/query/data-query.model";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; 
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import provider from '../../../services/provider';
import SpellModal from '../spell-modal/SpellModal';
import { Fmt } from '../../../utils/format.util';
import { content } from '../../../content/content';

function SpellsPreviewTable({ spells, onSort }: { spells: Spell[], onSort: (sortParams: SpellQuerySortParameters) => void }) {

  const [spellInModal, setSpellInModal] = useState<Spell | undefined>(undefined)
  const [sortParams, setSortParams] = useState<SpellQuerySortParameters>({})
  const [searchParams, setSearchParams] = useSearchParams()
  const cn = content.spells.table

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
            [cn.name, 'name', true],
            [cn.rank, 'rank', true],
            [cn.castingTime, 'castingTime', true],
            [cn.target, 'target', false],
            [cn.defense, 'defense', true],
            [cn.range, 'range', false],
            [cn.area, 'area', false],
            [cn.duration, 'duration', false],
            [cn.traditions, 'traditions', true],
            [cn.traits, 'traits']
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
            <td className='name'>{spell.name}</td>
            <td>{spell.level}</td>
            <td>{spell.castingTime}</td>
            <td>{Fmt.string(spell.target)}</td>
            <td>{Fmt.enum(spell.defense, content.enumMap.defense)}</td>
            <td>{Fmt.string(spell.range)}</td>
            <td>{Fmt.area(spell.area)}</td>
            <td>{Fmt.duration(spell.duration)}</td>
            <td>{Fmt.array(spell.traditions)}</td>
            <td>{Fmt.array(spell.traits)}</td>
          </tr>
        ))}
      </tbody>
      <SpellModal spell={spellInModal} onHide={closeModal} />
    </Table>
  )
}

export default SpellsPreviewTable