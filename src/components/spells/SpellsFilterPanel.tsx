import './SpellsFilterPanel.scss';
import { useEffect, useState } from "react";
import { ALL_SPELL_TRADITIONS, ALL_SPELL_TRAITS } from "../../model/spell.model";
import { SpellQueryFilterParameters } from "../../services/query/data-query.model";
import { Accordion, Badge, Col, Form, Row } from "react-bootstrap";
import { capitalize } from "../../utils/format.util";

function SpellsFilterPanel({ onFilter }: { onFilter: (queryParams: SpellQueryFilterParameters) => void }) {

  const [name, setName] = useState<string>("");
  const [tradition, setTradition] = useState<string>("all");
  const [traits, setTraits] = useState<[string, boolean][]>([]);

  const toggleTrait = (trait: string) => {
    
  }

  useEffect(() => {
    onFilter({ name, tradition });
  }, [name, tradition, traits])

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
                  {/* option to reset, toggle match all / match any */}
                  {ALL_SPELL_TRAITS.map(trait => (
                    // primary for on, danger for off, secomdnary default
                    <Badge className="m-1" bg="secondary" key={trait}>{capitalize(trait)}</Badge>
                  ))}
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
