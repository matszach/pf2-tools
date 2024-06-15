import { Table } from "react-bootstrap";
import { Spell } from "../../model/spell.model";

function SpellsPreviewTable({ spells }: { spells: Spell[] }) {
  return (
    <Table striped bordered hover>
      <thead>
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
          <tr key={spell.key}>
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