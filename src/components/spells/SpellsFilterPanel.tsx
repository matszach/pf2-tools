import './SpellsFilterPanel.scss';
import { useEffect, useState } from "react";
import { ALL_SPELL_TRADITIONS, Spell } from "../../model/spell.model";
import { SpellQueryFilterParameters } from "../../services/query/data-query.model";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { capitalize } from "../../utils/format.util";

function SpellsFilterPanel({ onFilter }: { onFilter: (queryParams: SpellQueryFilterParameters) => void }) {

  const [name, setName] = useState<string>("");
  const [tradition, setTradition] = useState<string>("all");

  useEffect(() => {
    onFilter({ name, tradition });
  }, [name, tradition])

  return (
    <div className="SpellsFilterPanel">
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              {/* TODO floating label? */}
              <Form.Label>Name</Form.Label> 
              <Form.Control type="text" onChange={e => setName(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Tradition</Form.Label>
              <Form.Select defaultValue='all' onChange={e => setTradition(e.target.value)}>
                <option key='all' value='all'>All</option>
                {ALL_SPELL_TRADITIONS.map(tradition => (
                  <option key={tradition} value={tradition}>{capitalize(tradition)}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Traits</Accordion.Header>
                <Accordion.Body>
                  TODO
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SpellsFilterPanel
