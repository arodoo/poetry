/*
 * File: favicon-icon.spec.ts
 * Purpose: E2E test verifying the custom SVG favicon is served
 * correctly by the Java backend. Checks both the link element
 * in the HTML and the actual SVG resource availability.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'

test.describe('App favicon', (): void => {
  test('index page has poetry.svg favicon link', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/')
    const link = page.locator('link[rel="icon"]')
    await expect(link).toHaveAttribute('href', '/poetry.svg')
    await expect(link).toHaveAttribute('type', 'image/svg+xml')
  })

  test('poetry.svg is served with correct type', async ({
    request,
  }): Promise<void> => {
    const resp = await request.get('/poetry.svg')
    expect(resp.status()).toBe(200)
    const body = await resp.text()
    expect(body).toContain('<svg')
  })

  test('page title is Poetry', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/')
    await expect(page).toHaveTitle('Poetry')
  })
})
