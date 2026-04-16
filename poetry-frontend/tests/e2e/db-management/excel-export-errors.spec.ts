/*
 * File: excel-export-errors.spec.ts
 * Purpose: E2E tests for the Excel export button covering the five
 * most common error scenarios. Uses Playwright route interception
 * to simulate HTTP errors and network failures deterministically.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect, type Page, type Route } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

const TABLES_ROUTE = '**/api/v1/db-management/tables'
const EXCEL_ROUTE = '**/api/v1/db-management/export/excel**'
const ERROR_TOAST = 'Excel export failed'

const STUB_TABLES = JSON.stringify([
  { name: 'users', rowCount: 10 },
  { name: 'memberships', rowCount: 5 },
])

async function setupPage(page: Page): Promise<void> {
  await injectTokens(page)
  await page.route(TABLES_ROUTE, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: STUB_TABLES,
    })
  })
  await page.goto('/en/db-management')
  await expect(
    page.getByTestId('excel-export-btn')
  ).toBeVisible({ timeout: 10_000 })
  await page.getByTestId('select-all-tables').check()
}

async function interceptExcelWith(
  page: Page,
  status: number
): Promise<void> {
  await page.route(EXCEL_ROUTE, async (route: Route) => {
    await route.fulfill({ status })
  })
}

test.describe('Excel Export — error scenarios', () => {
  test('1. HTTP 500 muestra toast de error', async ({ page }) => {
    await interceptExcelWith(page, 500)
    await setupPage(page)
    await page.getByTestId('excel-export-btn').click()
    await expect(
      page.getByText(ERROR_TOAST)
    ).toBeVisible({ timeout: 5_000 })
  })

  test('2. HTTP 401 unauthorized muestra toast de error', async ({ page }) => {
    await interceptExcelWith(page, 401)
    await setupPage(page)
    await page.getByTestId('excel-export-btn').click()
    await expect(
      page.getByText(ERROR_TOAST)
    ).toBeVisible({ timeout: 5_000 })
  })

  test('3. HTTP 403 forbidden muestra toast de error', async ({ page }) => {
    await interceptExcelWith(page, 403)
    await setupPage(page)
    await page.getByTestId('excel-export-btn').click()
    await expect(
      page.getByText(ERROR_TOAST)
    ).toBeVisible({ timeout: 5_000 })
  })

  test('4. Falla de red (abort) muestra toast de error', async ({ page }) => {
    await page.route(EXCEL_ROUTE, async (route: Route) => {
      await route.abort('failed')
    })
    await setupPage(page)
    await page.getByTestId('excel-export-btn').click()
    await expect(
      page.getByText(ERROR_TOAST)
    ).toBeVisible({ timeout: 5_000 })
  })

  test('5. HTTP 503 unavailable muestra toast de error', async ({ page }) => {
    await interceptExcelWith(page, 503)
    await setupPage(page)
    await page.getByTestId('excel-export-btn').click()
    await expect(
      page.getByText(ERROR_TOAST)
    ).toBeVisible({ timeout: 5_000 })
  })
})
