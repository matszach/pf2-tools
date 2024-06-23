import { FloatingLabel, Form } from "react-bootstrap";
import { parseNumber } from "../../utils/format.util";

export default function AppNumberControl(
  { min, max, label = '', value = 0, onChange = () => {} }: 
  { min?: number, max?: number, label: string, value?: number, onChange?: (value: number | undefined) => void }
) {
  return (
    <FloatingLabel label={label}>
      <Form.Control type='number' 
        min={min} max={max}
        onChange={e => onChange(parseNumber(e.target.value))} value={value}
      />
    </FloatingLabel>
  )
}