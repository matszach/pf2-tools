export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function parseNumber(value: string): number | undefined {
  if (value === '') {
    return undefined
  }
  return parseInt(value)
}