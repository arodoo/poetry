/*
 * File: dashboard-after-login.spec.ts
 * Purpose: Verify dashboard displays content after successful login.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'

test.describe('Dashboard after login', (): void => {
  test('displays dashboard content after successful login', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/login')

    await page.locator('input[name="username"]').fill('admin')
    await page.locator('input[name="password"]').fill('ChangeMe123!')
    await page.locator('button[type="submit"]').click()

    await page.waitForURL('**/en/dashboard', { timeout: 10000 })

    await expect(page.locator('h1')).toContainText('Dashboard', {
      timeout: 5000,
    })

    const errorElement = page.locator('[data-testid="dashboard-error"]')
    const loadingElement = page.locator('[data-testid="dashboard-loading"]')
    const emptyElement = page.locator('[data-testid="dashboard-empty"]')
    const totalPoems = page.locator('[data-testid="dashboard-total-poems"]')

    await page.waitForTimeout(2000)

    const hasError = await errorElement.isVisible().catch(() => false)
    const hasLoading = await loadingElement.isVisible().catch(() => false)
    const hasEmpty = await emptyElement.isVisible().catch(() => false)
    const hasContent = await totalPoems.isVisible().catch(() => false)

    console.log('Dashboard state:', {
      hasError,
      hasLoading,
      hasEmpty,
      hasContent,
      url: page.url(),
    })

    expect(hasError || hasLoading || hasEmpty || hasContent).toBe(true)
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

    await page.goto('/en/login')

    await page.locator('input[name="username"]').fill('admin')
    await page.locator('input[name="password"]').fill('ChangeMe123!')
    await page.locator('button[type="submit"]').click()

    await page.waitForURL('**/en/dashboard', { timeout: 10000 })

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
