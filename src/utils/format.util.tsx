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

  static string(value: string, maxLength: number = 20, defaultValue: string = '-'): string {
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

  static enum(key: string | undefined, content: { [key: string]: string }, defaultValue: string = '-'): string {
    return content[key ?? ''] ?? defaultValue
  }

  static array(content: string[], defaultValue: string = '-'): string {
    return content.join(', ') ?? defaultValue
  }
}