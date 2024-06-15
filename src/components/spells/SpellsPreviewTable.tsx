import { Table } from "react-bootstrap";
import { Spell } from "../../model/spell.model";
import AppPaginator from "../app-paginator/AppPaginator";
import { useEffect, useState } from "react";

function SpellsPreviewTable({ spells }: { spells: Spell[] }) {

  const [pageSize, setPageSize] = useState(15);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <>
      <AppPaginator size={pageSize} total={spells.length} onPageChange={setPageNumber} />
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
          {spells.slice(pageSize * (pageNumber - 1), pageSize * pageNumber).map((spell) => (
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
    </>
  )
}

export default SpellsPreviewTable