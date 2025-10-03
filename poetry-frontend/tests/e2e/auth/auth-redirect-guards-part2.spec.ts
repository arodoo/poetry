/*
 * File: auth-redirect-guards-part2.spec.ts
 * Purpose: Continuation of E2E tests split from auth-redirect-guards.spec.ts
 * to satisfy max-lines lint rule while keeping test logic identical.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'

test('no token does not show error screen on protected routes', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  const consoleErrors: string[] = []
  page.on('console', (msg): void => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })

  const responsePromise: Promise<unknown> = page.waitForURL(/\/en\/login$/, {
    timeout: 2000,
  })
  await page.goto('/en/dashboard', { waitUntil: 'domcontentloaded' })
  await responsePromise

  const errorOverlay: number = await page
    .locator('text=/Something went wrong|React Error/i')
    .count()
  expect(errorOverlay).toBe(0)

  const unhandledErrors: string[] = consoleErrors.filter(
    (msg: string): boolean =>
      msg.includes('Uncaught') || msg.includes('Unhandled')
  )
  expect(unhandledErrors.length).toBe(0)
})

test('redirect preserves locale when accessing protected route', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  const responsePromise: Promise<unknown> = page.waitForURL(/\/es\/login$/, {
    timeout: 2000,
  })
  await page.goto('/es/profile', { waitUntil: 'domcontentloaded' })
  await responsePromise
  expect(page.url()).toContain('/es/login')
  expect(page.url()).not.toContain('/en/login')
})
