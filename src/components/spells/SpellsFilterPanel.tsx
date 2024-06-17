import './SpellsFilterPanel.scss';
import { useEffect, useState } from "react";
import { ALL_SPELL_TRADITIONS, ALL_SPELL_TRAITS } from "../../model/spell.model";
import { SpellQueryFilterParameters } from "../../services/query/data-query.model";
import { Accordion, Badge, Col, Form, Row } from "react-bootstrap";
import { capitalize } from "../../utils/format.util";

function SpellsFilterPanel({ onFilter }: { onFilter: (queryParams: SpellQueryFilterParameters) => void }) {

  const [name, setName] = useState<string>("");
  const [tradition, setTradition] = useState<string>("all");
  const [traits, setTraits] = useState<{ [trait: string]: number }>({});

  const toggleTrait = (trait: string) => {
    setTraits({
      ...traits,
      // toggle traits value from 1 to - 1 to 0 to 1 etc
      // TODO make these into an enum
      [trait]: traits[trait] === 1 ? -1 : traits[trait] === -1 ? 0 : 1
    })
  }

  const getTraitColor = (trait: string) => {
    if (traits[trait] === 1) {
      return 'primary';
    } else if (traits[trait] === -1) {
      return 'danger';
    }
    return 'secondary';
  }

  useEffect(() => {
    onFilter({ name, tradition, traits });
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
          {/* make the trait picker a separate component + make the input separateable into groups (here for example class and energy) */}
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Traits</Accordion.Header>
                <Accordion.Body>
                  {/* option to reset, toggle match all / match any */}
                  {ALL_SPELL_TRAITS.map(trait => (
                    // primary for on, danger for off, secomdnary default
                    <Badge bg={getTraitColor(trait)} key={trait} onClick={() => toggleTrait(trait)}>
                      {capitalize(trait)}
                    </Badge>
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
