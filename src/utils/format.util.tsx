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

// TODO, content (including the '-')
export function defenseTableValue(value: string): string {
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
  }[value] ?? '-'
}