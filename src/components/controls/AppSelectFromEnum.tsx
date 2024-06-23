import { FloatingLabel, Form } from "react-bootstrap";
import { capitalize } from "../../utils/format.util";

export default function AppSelectFromEnum<T>(
  { label, valuesEnum, content, value, onChange }:
  { label: string, valuesEnum: { [key: string]: T }, content?: any, value: T, onChange: (value: T) => void }
) {
  return (
    <FloatingLabel label={label}>
      <Form.Select defaultValue={value as string} onChange={e => onChange(e.target.value as T)}>
        {Object.values(valuesEnum).map(enumValue => { 
          const value = enumValue as string
          return (
            <option key={value} value={value}>
              {content ? content[value] : capitalize(value)}
            </option>
          )
        })}
      </Form.Select>
    </FloatingLabel>
  )
}


