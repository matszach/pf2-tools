/**
 * @deprecated
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @deprecated
 */
export function parseNumber(value: string): number | undefined {
  if (value === '') {
    return undefined
  }
  return parseInt(value)
}

/**
 * @deprecated
 */
export function tableStringValue(value: string, maxLength: number = 20): string {
  if (!value || value === '') {
    return '-'
  } else if (value.length > maxLength) {
    return `${value.slice(0, maxLength)}...`
  }
  return value
}

/**
 * @deprecated
 */
export function durationStringValue({ value, sustained }: { value: string, sustained: boolean }, maxLength: number = 20): string {
  return tableStringValue(value + (sustained ? ', sustained' : ''), maxLength)
}

/**
 * @deprecated
 */
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

/**
 * @deprecated
 */
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

// content (including the '-', '...', 'ft')
export class Fmt {
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static int(value: string): number | undefined {
    if (value === '') {
      return undefined
    }
    return parseInt(value)
  }

  static limit(value: string, maxLength: number = 20, defaultValue: string = '-'): string {
    if (!value || value === '') {
      return defaultValue
    } else if (value.length > maxLength) {
      return `${value.slice(0, maxLength)}...`
    }
    return value
  }

  static duration(input: { value?: string, sustained?: boolean }, defaultValue: string = '-'): string {
    if (!input || input.value === '') {
      return defaultValue
    }
    return `${input.value}${input.sustained ? ', sustained' : ''}`
  }

  static area(input: { type?: string, value?: string, details?: string }, defaultValue: string = '-'): string {
    if (!input) {
      return defaultValue
    }
    let v = ''
    if (input?.type) {
      v = `${input?.value}ft ${input?.type}`
    }
    if (input?.details) {
      v += `${v ? ', ' : ''}${input?.details}`
    }
    return v
  }

  static enum(key: string, content: { [key: string]: string }, defaultValue: string = '-'): string {
    return content[key] ?? defaultValue
  }
}