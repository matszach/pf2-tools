import './SpellsFilterPanel.scss';
import { useEffect, useState } from 'react';
import { SpellCastingTimeEnum, SPELL_TRADITIONS, SPELL_TRAITS, SpellDefenseEnum } from '../../model/spell.model';
import { SpellQueryFilterParameters } from '../../services/query/data-query.model';
import { Accordion, Badge, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { capitalize, parseNumber } from '../../utils/format.util';

function SpellsFilterPanel({ onFilter }: { onFilter: (queryParams: SpellQueryFilterParameters) => void }) {

  const [name, setName] = useState<string>('')
  const [tradition, setTradition] = useState<string>('all') // TODO make this into an enum
  const [traits, setTraits] = useState<{ [trait: string]: number }>({})
  const [minLevel, setMinLevel] = useState<number | undefined>(1)
  const [maxLevel, setMaxLevel] = useState<number | undefined>(10)
  const [castingTime, setCastingTime] = useState<SpellCastingTimeEnum>(SpellCastingTimeEnum.ALL)
  const [range, setRange] = useState<string>('all') // TODO make this into an enum
  const [area, setArea] = useState<string>('all') // TODO make this into an enum
  const [duration, setDuration] = useState<string>('all') // TODO make this into an enum
  const [target, setTarget] = useState<string>('all') // TODO make this into an enum
  const [defense, setDefense] = useState<SpellDefenseEnum>(SpellDefenseEnum.ALL)

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
    onFilter({ 
      name, tradition, traits, level: [minLevel ?? 1, maxLevel ?? 10], 
      castingTime, area, duration, target, defense, range
     });
  }, [name, tradition, traits, minLevel, maxLevel, castingTime, area, duration, target, defense, range])

  return (
    <div className='SpellsFilterPanel mb-3'>
      <Row>
        <Col sm={6} className='mt-3'>
          <FloatingLabel label='Name'>
            <Form.Control type='text' onChange={e => setName(e.target.value)} value={name}/>
          </FloatingLabel>
        </Col>
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
      </Row>
      <Row>
        <Col sm={3} xs={6} className='mt-3'>
          <FloatingLabel label='Tradition'>
            <Form.Select defaultValue={tradition} onChange={e => setTradition(e.target.value)}>
              <option key='all' value='all'>All</option>
              {SPELL_TRADITIONS.map(t => (
                <option key={t} value={t}>{capitalize(t)}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col sm={3} xs={6} className='mt-3'>
          <FloatingLabel label='Casting Time'>
            <Form.Select defaultValue={castingTime} onChange={e => setCastingTime(e.target.value as SpellCastingTimeEnum)}>
              {Object.values(SpellCastingTimeEnum).map(ct => (
                <option key={ct} value={ct}>{capitalize(ct)}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col sm={3} xs={6} className='mt-3'>
          <FloatingLabel label='Defense'>
            <Form.Select defaultValue={defense} onChange={e => setDefense(e.target.value as SpellDefenseEnum)}>
              {Object.values(SpellDefenseEnum).map(d => (
                <option key={d} value={d}>{capitalize(d)}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col sm={3} xs={6} className='mt-3'>duration</Col>
      </Row>
      <Row>
        <Col className='mt-3'>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header key={'traits-header'}>Traits</Accordion.Header>
              <Accordion.Body>
                {/* option to reset, toggle match all / match any */}
                {Object.values(SPELL_TRAITS).map((traitGroup, index) => (
                  <div key={`trait-group-${index}`}>
                    {index > 0 && <hr key={`traits-hr-${index}`} className='m-1' />}
                    {traitGroup.map(trait => (
                      // primary for on, danger for off, secondary for default
                      <Badge bg={getTraitColor(trait)} key={`trait-${trait}`} onClick={() => toggleTrait(trait)}>
                        {capitalize(trait)}
                      </Badge>
                    ))}
                  </div>
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
