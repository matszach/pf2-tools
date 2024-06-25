import { Accordion, Badge } from "react-bootstrap";
import { TraitsGroups, TraitsSelection, TraitsToggleStateEnum } from "../../model/spell.model";
import { useEffect, useState } from "react";
import { nextIn } from "../../utils/calculation.util";
import { Fmt } from "../../utils/format.util";

export default function AppTraitsSelector(
  { label = '', traitGroups, onChange = () => {} }:
  { label: string, traitGroups: TraitsGroups, onChange: (value: TraitsSelection) => void }
) {
  
  const [traits, setTraits] = useState<TraitsSelection>({})

  const toggleTrait = (trait: string) => {
    setTraits({
      ...traits,
      [trait]: nextIn(traits[trait], [
        TraitsToggleStateEnum.ON,
        TraitsToggleStateEnum.OFF,
        TraitsToggleStateEnum.NONE
      ])
    })
  }

  const getTraitColor = (trait: string) => {
    if (traits[trait] === TraitsToggleStateEnum.ON) {
      return 'primary';
    } else if (traits[trait] === TraitsToggleStateEnum.OFF) {
      return 'danger';
    }
    return 'secondary';
  }

  useEffect(() => {
    onChange(traits)
  }, [traits])

  return (
    <Accordion>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>{label}</Accordion.Header>
        <Accordion.Body>
          {/* option to reset, toggle match all / match any */}
          {Object.values(traitGroups).map((traitGroup, index) => (
            <div key={`trait-group-${index}`}>
              {index > 0 && <hr key={`traits-hr-${index}`} className='m-1' />}
              {traitGroup.map(trait => (
                <Badge bg={getTraitColor(trait)} key={trait} onClick={() => toggleTrait(trait)}>
                  {Fmt.capitalize(trait)}
                </Badge>
              ))}
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}