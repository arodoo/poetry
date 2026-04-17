/*
 * File: carousel-relative-urls.spec.ts
 * Purpose: Regression test ensuring the carousel frontend uses
 * relative API paths instead of hardcoded localhost URLs. Verifies
 * that config and slide requests go through the proxy path so the
 * app works in production behind nginx.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Carousel – no hardcoded localhost', () => {
  test('config request uses relative path', async ({ page }) => {
    const urls: string[] = []
    page.on('request', (req) => {
      if (req.url().includes('carousel')) {
        urls.push(req.url())
      }
    })
    await injectTokens(page)
    await page.goto('/en/dashboard')
    await page.waitForTimeout(3000)
    expect(urls.length, 'At least one carousel request').toBeGreaterThan(0)
    const origin = new URL(page.url()).origin
    const foreign = urls.filter((u) => !u.startsWith(origin))
    expect(foreign, 'All carousel requests use current origin').toHaveLength(0)
  })
})
