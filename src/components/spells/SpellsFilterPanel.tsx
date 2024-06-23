import './SpellsFilterPanel.scss';
import { useEffect, useState } from 'react';
import { SpellCastingTimeEnum, SPELL_TRAITS, SpellDefenseEnum, SpellTraditionEnum, TraitsSelection, SpellDurationEnum } from '../../model/spell.model';
import { SpellQueryFilterParameters } from '../../services/query/data-query.model';
import { Col, Row } from 'react-bootstrap';
import AppNumberControl from '../controls/AppNumberControl';
import AppTextControl from '../controls/AppTextControl';
import AppSelectFromEnum from '../controls/AppSelectFromEnum';
import AppTraitsSelector from '../controls/AppTraitSelector';

function SpellsFilterPanel({ onFilter }: { onFilter: (queryParams: SpellQueryFilterParameters) => void }) {

  const [name, setName] = useState<string>('')
  const [tradition, setTradition] = useState<SpellTraditionEnum>(SpellTraditionEnum.ALL)
  const [traits, setTraits] = useState<TraitsSelection>({})
  const [minLevel, setMinLevel] = useState<number | undefined>(1)
  const [maxLevel, setMaxLevel] = useState<number | undefined>(10)
  const [castingTime, setCastingTime] = useState<SpellCastingTimeEnum>(SpellCastingTimeEnum.ALL)
  const [range, setRange] = useState<string>('all') // TODO make this into an enum
  const [area, setArea] = useState<string>('all') // TODO make this into an enum
  const [duration, setDuration] = useState<SpellDurationEnum>(SpellDurationEnum.ALL)
  const [target, setTarget] = useState<string>('all') // TODO make this into an enum
  const [defense, setDefense] = useState<SpellDefenseEnum>(SpellDefenseEnum.ALL)

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
          <AppTextControl label='Name' value={name} onChange={setName}/>
        </Col>
        <Col sm={3} xs={6} className='mt-3'>
          <AppNumberControl min={1} max={10} label='Min. Rank' value={minLevel} onChange={setMinLevel}/>
        </Col>
        <Col sm={3} xs={6} className='mt-3'>
          <AppNumberControl min={1} max={10} label='Max. Rank' value={maxLevel} onChange={setMaxLevel}/>
        </Col>
      </Row>
      <Row>
        <Col sm={3} xs={6} className='mt-3'>
          <AppSelectFromEnum label='Tradition' valuesEnum={SpellTraditionEnum} value={tradition} onChange={setTradition}/>
        </Col>
        <Col sm={3} xs={6} className='mt-3'>
          <AppSelectFromEnum label='Casting Time' valuesEnum={SpellCastingTimeEnum} value={castingTime} onChange={setCastingTime}/>
        </Col>
        <Col sm={3} xs={6} className='mt-3'>
          <AppSelectFromEnum label='Defense' valuesEnum={SpellDefenseEnum} value={defense} onChange={setDefense}/>
        </Col>
        <Col sm={3} xs={6} className='mt-3'>
          <AppSelectFromEnum label='Duration' valuesEnum={SpellDurationEnum} value={duration} onChange={setDuration}/>
        </Col>
      </Row>
      <Row>
        <Col className='mt-3'>
          <AppTraitsSelector label='Traits' traitGroups={SPELL_TRAITS} onChange={setTraits}/>
        </Col>
      </Row>
    </div>
  );
}

export default SpellsFilterPanel
