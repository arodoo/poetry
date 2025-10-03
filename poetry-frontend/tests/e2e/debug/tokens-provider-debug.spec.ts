/*
 File: tokens-provider-debug.spec.ts
 Purpose: Debug test to verify TokensProvider fetches and applies CSS vars.
 All Rights Reserved. Arodi Emmanuel
*/
/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/typedef, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-confusing-void-expression, max-lines */
import { test, expect, type Page } from '@playwright/test'

test.describe('TokensProvider Debug', () => {
  test('tokens API returns data when accessed directly', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const response = await page.request.get(
      'http://localhost:5173/api/v1/tokens'
    )
    expect(response.ok()).toBeTruthy()
    const data: unknown = await response.json()
    const asAny = data as any
    expect(asAny.themes).toBeDefined()
    expect(asAny.themes.length).toBeGreaterThan(0)
    expect(asAny.themes[0].colors).toBeDefined()
    expect(asAny.themes[0].colors.primary).toBeTruthy()
  })

  test('page loads and CSS variables are set after delay', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const errors: string[] = []
    const warnings: string[] = []

    page.on('console', (msg): void => {
      if (msg.type() === 'error') errors.push(msg.text())
      if (msg.type() === 'warning') warnings.push(msg.text())
    })

    page.on('pageerror', (error): void => {
      const err: any = error as any
      errors.push(
        `Uncaught error: ${String(err.message)}\n${String(err.stack)}`
      )
    })

    await page.goto('http://localhost:5173/en/users', {
      waitUntil: 'networkidle',
    })

    // Wait for React Query and TokensProvider to complete
    await page.waitForTimeout(3000)

    console.log('=== ERRORS ===')
    errors.forEach((e: string): void => console.log(e))
    console.log('=== WARNINGS ===')
    warnings.forEach((w: string): void => console.log(w))

    const primaryColor = await page.evaluate((): string =>
      getComputedStyle(document.documentElement).getPropertyValue(
        '--color-primary'
      )
    )

    console.log('Primary color value:', JSON.stringify(primaryColor))

    const allVars = await page.evaluate((): Record<string, string> => {
      const style = getComputedStyle(document.documentElement)
      const vars: Record<string, string> = {}
      for (let i = 0; i < style.length; i++) {
        const prop = style.item(i)
        if (typeof prop === 'string' && prop.startsWith('--color-')) {
          vars[prop] = style.getPropertyValue(prop)
        }
      }
      return vars
    })

    console.log('All color CSS vars:', allVars)

    if (Object.keys(allVars).length === 0) {
      console.log(
        'NO CSS VARIABLES FOUND - TokensProvider likely failed to apply them'
      )
    }

    expect(primaryColor).toBeTruthy()
    expect(primaryColor).not.toBe('')
  })

  test('TokensProvider fetch status in browser console', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const consoleLogs: string[] = []
    const errors: string[] = []
    const failedRequests: { url: string; status: number }[] = []
    const allRequests: { url: string; status: number }[] = []

    page.on('console', (msg): void => {
      const text: string = msg.text()
      consoleLogs.push(text)
      if (msg.type() === 'error') {
        errors.push(text)
      }
    })

    page.on('pageerror', (error): void => {
      errors.push(`Page error: ${error.message}`)
    })

    page.on('response', (response): void => {
      const url: string = response.url()
      const status: number = response.status()
      if (url.includes('/api/v1/')) {
        allRequests.push({ url, status })
      }
      if (status === 403) {
        failedRequests.push({ url, status })
      }
    })

    await page.goto('http://localhost:5173/en/users', {
      waitUntil: 'networkidle',
    })

    // Wait longer for React Query and TokensProvider to complete
    await page.waitForTimeout(5000)

    await page.evaluate((): void => {
      console.log('Document ready')
      const primary = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--color-primary')
      console.log('--color-primary:', primary)

      // Try to access React Query devtools or cache to see if tokens were fetched
      const state = (window as any).__REACT_QUERY_STATE__
      if (state) {
        console.log('React Query State:', JSON.stringify(state))
      }
    })

    await page.waitForTimeout(2000)

    console.log('All /api/v1/ requests:', allRequests)
    console.log('Failed HTTP 403 requests:', failedRequests)
    console.log('Console logs:', consoleLogs)
    console.log('Errors:', errors)

    expect(errors.length).toBe(0)
  })
})
