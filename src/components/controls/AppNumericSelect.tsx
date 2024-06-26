import { FloatingLabel, Form } from "react-bootstrap";
import { numbers } from "../../utils/calculation.util";

export default function AppNumberSelect(
  { label, valueRange: [min, max], value, onChange }:
  { label: string, valueRange: [number, number], value: number, onChange: (value: number) => void }
) {
  return (
    <FloatingLabel label={label}>
      <Form.Select defaultValue={value} onChange={e => onChange(parseInt(e.target.value))}>
        {numbers(min, max).map(v => <option key={v} value={v}>{v}</option>)}
      </Form.Select>
    </FloatingLabel>
  )
}
