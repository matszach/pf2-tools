import './SpellsPreviewTable.scss';
import { Table } from "react-bootstrap";
import { Spell } from "../../model/spell.model";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../const/routes.const";
import { SpellQuerySortParameters } from "../../services/query/data-query.model";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; 
import { useEffect, useState } from "react";

function SpellsPreviewTable({ spells, onSort }: { spells: Spell[], onSort: (sortParams: SpellQuerySortParameters) => void }) {

  const navigate = useNavigate();
  const [sortParams, setSortParams] = useState<SpellQuerySortParameters>({})

  const toggleSort = (field: string) => {
    setSortParams({ 
      field, 
      direction: sortParams.field === field ? -(sortParams.direction ?? 1) : 1 
    })
  }

  useEffect(() => {
    onSort(sortParams)
  }, [sortParams])

  return (
    <Table className="SpellsPreviewTable" striped bordered hover>
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
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody> 
        {spells.map((spell) => (
          <tr key={spell.key} onClick={() => {
            const url = AppRoutes.SPELL_KEY.replace(':key', spell.key || 'NOT_FOUND')
            navigate(url) // TODO make it open a new window OR remember the query settings
          }}>
            <td>{spell.name}</td>
            <td>{spell.level}</td>
            <td>{spell.castingTime}</td>
            <td>{spell.traditions.join(', ')}</td>
            <td>{spell.traits.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default SpellsPreviewTable