import { FloatingLabel, Form } from "react-bootstrap";

export default function AppTextControl(
  { label = '',  value = '', onChange = () => {} }:
  { label: string, value: string, onChange: (value: string) => void }
) {
  return (
    <FloatingLabel label={label}>
      <Form.Control type='text' onChange={e => onChange(e.target.value)} value={value}/>
    </FloatingLabel>
  )
}