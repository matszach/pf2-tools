import { useEffect, useState } from "react";
import { Spell } from "../../model/spell.model";
import { ApiQueryParameters } from "../../services/query/data-query.model";
import { SpellQueryBuilder } from "../../services/query/spell-query-builder";
import { Col, Form, Row } from "react-bootstrap";
import { SpellsQueryFormState } from "./spells-query-form-state.model";

function SpellsQueryPanel({ onQuery }: { onQuery: (query: ApiQueryParameters<Spell>) => void }) {


  const [formState, setFormState] = useState<SpellsQueryFormState>({});

  const onFormChange = ({ value, id }: { value: any, id: string }) => {
    setFormState({ ...formState, [id as keyof SpellsQueryFormState]: value })
  }

  const buildQuery = () => {
    const builder = new SpellQueryBuilder();
    if (!!formState.name?.trim()) {
      builder.name(formState.name?.trim());
    }
    return builder.build()
  }

  useEffect(() => {
    console.log(formState)
    onQuery(buildQuery())
  }, [formState])


  return (
    <div className="SpellsQueryPanel">
      <Form onChange={e => onFormChange(e.target as HTMLInputElement)}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name"/>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* <input type="text" onChange={(e) => setName(e.target.value)}></input> */}
    </div>
  );
}

export default SpellsQueryPanel