/*
 * File: dashboard-after-login.spec.ts
 * Purpose: Verify dashboard displays content after successful login.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Dashboard after login', (): void => {
  test('displays dashboard content after successful login', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/dashboard')

    await expect(
      page.locator('h1').filter({ hasText: /Display|Pantalla/i })
    ).toBeVisible({ timeout: 10000 })

    const carouselRoot = page.locator('[data-testid="carousel-root"]')

    await page.waitForTimeout(2000)

    const hasCarousel = await carouselRoot.isVisible().catch(() => false)

    console.log('Dashboard state:', {
      hasCarousel,
      url: page.url(),
    })

    expect(hasCarousel).toBe(true)
  })

  test('verifies no infinite loop errors in console', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const errors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    page.on('pageerror', (error) => {
      errors.push(error.message)
    })

    await injectTokens(page)
    await page.goto('/en/dashboard')

    await page.waitForTimeout(3000)

    const infiniteLoopErrors = errors.filter((e) =>
      e.includes('Maximum update depth exceeded')
    )

    console.log('Total errors:', errors.length)
    console.log('Infinite loop errors:', infiniteLoopErrors.length)

    if (infiniteLoopErrors.length > 0) {
      console.log('Sample infinite loop error:', infiniteLoopErrors[0])
    }

    expect(infiniteLoopErrors.length).toBe(0)
  })
})
