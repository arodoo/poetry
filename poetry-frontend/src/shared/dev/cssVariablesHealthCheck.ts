/*
 File: cssVariablesHealthCheck.ts
 Purpose: Development-mode health check to validate CSS variables are
 properly applied. Runs after TokensProvider loads and warns if critical
 variables are missing. Prevents silent CSS variable failures.
 All Rights Reserved. Arodi Emmanuel
*/

export function checkCssVariablesHealth(): void {
  if (import.meta.env.PROD) return

  const criticalVars: readonly string[] = [
    '--color-primary',
    '--color-error',
    '--color-text',
    '--color-background',
    '--color-surface',
  ] as const

  const root: CSSStyleDeclaration = getComputedStyle(document.documentElement)
  const missingVars: string[] = []
  const emptyVars: string[] = []

  criticalVars.forEach((varName: string): void => {
    const value: string = root.getPropertyValue(varName).trim()

    if (value === '') {
      emptyVars.push(varName)
    } else if (!value) {
      missingVars.push(varName)
    }
  })

  if (missingVars.length > 0 || emptyVars.length > 0) {
    console.error(
      '%c CSS VARIABLES HEALTH CHECK FAILED',
      'color: white; background: orange; font-size: 16px; padding: 8px;',
      '\n\nCritical CSS variables are not properly set!\n' +
        'This will cause UI rendering issues.\n\n' +
        (missingVars.length > 0
          ? 'Missing variables:\n' +
            missingVars.map((v: string): string => `  - ${v}`).join('\n') +
            '\n\n'
          : '') +
        (emptyVars.length > 0
          ? 'Empty variables:\n' +
            emptyVars.map((v: string): string => `  - ${v}`).join('\n') +
            '\n\n'
          : '') +
        'Possible causes:\n' +
        '  - TokensProvider failed to load\n' +
        '  - mapBundleToCssVars returned empty object\n' +
        '  - Backend response missing data\n' +
        '  - CSS variables not applied to documentElement\n\n' +
        'Check TokensProvider logs above for errors.'
    )
  } else {
    console.log(
      '%c✅ CSS Variables Health Check Passed',
      'color: white; background: green; font-size: 14px; padding: 4px;',
      ((): string => {
        const countStr = String(criticalVars.length)
        return `\n${countStr} critical variables are set correctly`
      })()
    )
  }
}

export function setupCssVariablesMonitor(): void {
  if (import.meta.env.PROD) return

  // Run initial check after a delay to let TokensProvider load
  setTimeout((): void => {
    checkCssVariablesHealth()
  }, 2000)

  // Set up mutation observer to detect if variables get cleared
  const observer: MutationObserver = new MutationObserver((): void => {
    const primary: string = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary')
      .trim()

    if (!primary) {
      console.warn(
        '%c\u001f CSS VARIABLES LOST',
        'color: white; background: orange; font-size: 14px; padding: 4px;',
        '\n--color-primary was cleared! This should not happen.'
      )
    }
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style'],
  })
}
