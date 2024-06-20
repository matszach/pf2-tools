export function startAlertFilter(): void {
  const warnFn = console.warn
  const errorFn = console.error
  console.warn = payload => {
    if (!isIgnored(payload)) {
      warnFn(payload)
    }
  }
  console.error = payload => {
    if (!isIgnored(payload)) {
      errorFn(payload)
    }
  }
}

function isIgnored(text: string): boolean {
  if (text.includes('validateDOMNesting')) {
    return true
  }
  return false
}