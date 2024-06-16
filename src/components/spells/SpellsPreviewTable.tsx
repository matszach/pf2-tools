import { Table } from "react-bootstrap";
import { Spell } from "../../model/spell.model";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../const/routes.const";

function SpellsPreviewTable({ spells }: { spells: Spell[] }) {

  const navigate = useNavigate();

  return (
    <Table striped bordered hover>
      <thead >
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Casting Time</th>
          <th>Traditions</th>
          <th>Traits</th>
        </tr>
      </thead>
      <tbody> 
        {spells.map((spell) => (
          <tr key={spell.key} onClick={() => {
            const url = AppRoutes.SPELL_KEY.replace(':key', spell.key || 'NOT_FOUND')
            navigate(url)
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