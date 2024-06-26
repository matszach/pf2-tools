import './RandomSpellsOptions.scss'
import { useState } from "react"
import { RandomSpellsOptionsParameters, RandomSpellQueryType } from "../../../services/query/data-query.model"
import { SpellTraditionEnum } from '../../../model/spell.model';
import { Button, Col, Row } from 'react-bootstrap';
import AppSelectFromEnum from '../../controls/AppSelectFromEnum';
import AppNumberControl from '../../controls/AppNumberControl';
import AppNumberSelect from '../../controls/AppNumericSelect';

export default function RandomSpellsOptions({ onGenerate }: { onGenerate: (options: RandomSpellsOptionsParameters) => void }) {

  const [queryType, setQueryType] = useState<RandomSpellQueryType>(RandomSpellQueryType.SPELLS)
  const [spellRank, setSpellRank] = useState<number>(1)
  const [numberOfSpells, setNumberOfSpells] = useState<number | undefined>(1)
  const [tradition, setTradition] = useState<SpellTraditionEnum>(SpellTraditionEnum.ALL)
  const [characterLevel, setCharacterLevel] = useState<number>(1)
  
  const generate = () => {
    onGenerate({ queryType, spellRank, numberOfSpells, tradition, characterLevel })
  }

  return (
    <Row className="RandomSpellsOptions">
      <Col md={3} className="mt-3">
        <AppSelectFromEnum label="Query Type" value={queryType} onChange={setQueryType} valuesEnum={RandomSpellQueryType}/>
      </Col>
      <Col md={3} className="mt-3">{
        queryType === RandomSpellQueryType.SPELLS ? (
          <AppNumberControl min={1} max={100} label="Number of Spells" value={numberOfSpells} onChange={setNumberOfSpells}/>
        ) : (
          <AppNumberSelect label="Character Level" valueRange={[1, 20]} value={characterLevel} onChange={setCharacterLevel}/>
        )
      }</Col>
      <Col md={3} className="mt-3">{
        queryType === RandomSpellQueryType.SPELLS ? (
          <AppNumberSelect label="Spell Rank" valueRange={[1, 10]} value={spellRank} onChange={setSpellRank}/>
        ) : (
          <AppSelectFromEnum label="Tradition" value={tradition} onChange={setTradition} valuesEnum={SpellTraditionEnum}/>
        )
      }</Col>
      <Col md={3} className="mt-3">{
        <Button className="w-100 h-100" onClick={generate}>Generate</Button>
      }</Col>
    </Row>
  )
}