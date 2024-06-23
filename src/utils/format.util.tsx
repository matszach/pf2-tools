export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function parseNumber(value: string): number | undefined {
  if (value === '') {
    return undefined
  }
  return parseInt(value)
}

export function tableStringValue(value: string, maxLength: number = 20): string {
  if (!value || value === '') {
    return '-'
  } else if (value.length > maxLength) {
    return `${value.slice(0, maxLength)}...`
  }
  return value
}

// TODO, content
export function durationStringValue({ value, sustained }: { value: string, sustained: boolean }, maxLength: number = 20): string {
  return tableStringValue(value + (sustained ? ', sustained' : ''), maxLength)
}

export function areaStringValue({ type, value, details }: { type: string, value: string, details: string }, maxLength: number = 20): string {
  let v = ''
  if (type) {
    v = `${value}ft ${type}`
  }
  if (details) {
    v += `${v ? ', ' : ''}${details}`
  }
  return tableStringValue(v, maxLength)
}

// TODO, content (including the '-')
export function defenseStringValue(value: string = '', defaultValue: string = '-'): string {
  return {
    'ac': 'AC',
    'reflex': 'Reflex',
    'reflex-basic': 'Reflex, basic',
    'reflex-dc': 'Reflex DC',
    'fortitude': 'Fortitude',
    'fortitude-basic': 'Fortitude, basic',
    'fortitude-dc': 'Fortitude DC',
    'will': 'Will',
    'will-basic': 'Will, basic',
    'will-dc': 'Will DC',
  }[value] ?? defaultValue
}

