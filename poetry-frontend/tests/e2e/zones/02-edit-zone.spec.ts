/*
 * 02-edit-zone.spec.ts
 * E2E test for zone editing flow verifying update form
 * data persistence and successful save with redirect.
 * © 2025 Poetry Platform. All rights reserved.
 */

import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { createTestZone, deleteZoneViaApi } from './helpers'
import type { ZoneData } from './helpers'

test.describe('Zone Editing', (): void => {
  let testZone: ZoneData

  test.beforeAll(async ({ browser }): Promise<void> => {
    const page: Page = await browser.newPage()
    await injectTokens(page)
    testZone = await createTestZone(page)
    await page.close()
  })

  test.afterAll(async ({ browser }): Promise<void> => {
    const page: Page = await browser.newPage()
    await injectTokens(page)
    await deleteZoneViaApi(page, testZone.id)
    await page.close()
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('should edit zone description', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/zones/edit/${testZone.id}`)
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { name: /Edit zone/i })
    ).toBeVisible({ timeout: 15000 })

    const descInput: Locator = page.getByTestId('zone-description-input')
    await descInput.fill('Updated zone description')

    const saveButton: Locator = page.getByRole('button', {
      name: /Save changes/i,
    })
    await saveButton.click()

    await page.waitForURL(/\/en\/zones$/, { timeout: 10000 })

    await expect(page.getByText(/updated successfully/i)).toBeVisible({
      timeout: 5000,
    })

    await expect(
      page.getByText('Updated zone description')
    ).toBeVisible()
  })
})
