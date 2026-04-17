/*
 * File: same-origin-api.spec.ts
 * Purpose: Proves the production bundle served from the backend does
 * not leak hardcoded absolute hosts. All /api/ calls must target the
 * same origin as the page so boops.mx or any LAN host works without
 * rebuilding. Regression guard for fetchClient + env defaults.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Same-origin API', (): void => {
  test('all /api/ calls share page origin', async ({
    page,
    baseURL,
  }): Promise<void> => {
    const pageOrigin: string = new URL(baseURL ?? '').origin
    const leaks: string[] = []
    page.on('request', (req): void => {
      const url: string = req.url()
      if (url.includes('/api/')) {
        const reqOrigin: string = new URL(url).origin
        if (reqOrigin !== pageOrigin) leaks.push(url)
      }
    })
    await injectTokens(page)
    await page.goto('/es/dashboard')
    await page.waitForLoadState('networkidle')
    expect(leaks, `cross-origin /api leaks:\n${leaks.join('\n')}`).toEqual([])
  })
})
