import './SpellsFilterPanel.scss';
import { useEffect, useState } from 'react';
import { ALL_SPELL_TRADITIONS, ALL_SPELL_TRAITS } from '../../model/spell.model';
import { SpellQueryFilterParameters } from '../../services/query/data-query.model';
import { Accordion, Badge, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { capitalize } from '../../utils/format.util';

function SpellsFilterPanel({ onFilter }: { onFilter: (queryParams: SpellQueryFilterParameters) => void }) {

  const [name, setName] = useState<string>('')
  const [tradition, setTradition] = useState<string>('all')
  const [traits, setTraits] = useState<{ [trait: string]: number }>({})
  const [minLevel, setMinLevel] = useState<number | undefined>(1)
  const [maxLevel, setMaxLevel] = useState<number | undefined>(10)

  const toggleTrait = (trait: string) => {
    setTraits({
      ...traits,
      // toggle traits value from 1 to - 1 to 0 to 1 etc
      // TODO make these into an enum
      [trait]: traits[trait] === 1 ? -1 : traits[trait] === -1 ? 0 : 1
    })
  }

  const parseNumber = (value: string) => {
    if (value === '') {
      return undefined
    }
    return parseInt(value)
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
    onFilter({ name, tradition, traits, level: [minLevel ?? 1, maxLevel ?? 10] });
  }, [name, tradition, traits, minLevel, maxLevel])

  return (
    <div className='SpellsFilterPanel mb-3'>
      <Row>
        <Col sm={6} className='mt-3'>
          <FloatingLabel label='Name'>
            <Form.Control type='text' onChange={e => setName(e.target.value)} value={name}/>
          </FloatingLabel>
        </Col>
        <Col sm={6} className='mt-3'>
          <FloatingLabel label='Tradition'>
            <Form.Select defaultValue={tradition} onChange={e => setTradition(e.target.value)}>
              <option key='all' value='all'>All</option>
              {ALL_SPELL_TRADITIONS.map(tradition => (
                <option key={tradition} value={tradition}>{capitalize(tradition)}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col sm={3} xs={6} className='mt-3'>
          <FloatingLabel label='Min. Rank'>
            <Form.Control type='number' 
              min={1} max={10}
              onChange={e => setMinLevel(parseNumber(e.target.value))} value={minLevel}
            />
          </FloatingLabel>
        </Col>
        <Col sm={3} xs={6} className='mt-3'>
          <FloatingLabel label='Max. Rank'>
            <Form.Control 
              min={1} max={10}
              type='number' onChange={e => setMaxLevel(parseNumber(e.target.value))} value={maxLevel}
            />
          </FloatingLabel>
        </Col>
        <Col sm={6} className='mt-3'>
          TODO
        </Col>
      </Row>
      <Row>
        <Col className='mt-3'>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Traits</Accordion.Header>
              <Accordion.Body>
                {/* option to reset, toggle match all / match any */}
                {/* move rarity to traits */}
                {ALL_SPELL_TRAITS.map(trait => (
                  // primary for on, danger for off, secondary for default
                  <Badge bg={getTraitColor(trait)} key={trait} onClick={() => toggleTrait(trait)}>
                    {capitalize(trait)}
                  </Badge>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </div>
  );
}

export default SpellsFilterPanel
