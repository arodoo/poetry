/*
 * 03-delete-zone.spec.ts
 * E2E test for zone deletion verifying soft delete via API
 * and confirming zone removal from list view.
 * © 2025 Poetry Platform. All rights reserved.
 */

import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { createTestZone, deleteZoneViaApi } from './helpers'
import type { ZoneData } from './helpers'

test.describe('Zone Deletion', (): void => {
  let testZone: ZoneData

  test.beforeAll(async ({ browser }): Promise<void> => {
    const page: Page = await browser.newPage()
    await injectTokens(page)
    testZone = await createTestZone(page)
    await page.close()
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('should delete zone via API', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await deleteZoneViaApi(page, testZone.id)

    await page.goto('/en/zones')
    await page.waitForLoadState('networkidle')

    await expect(page.locator(`text=${testZone.name}`)).not.toBeVisible({
      timeout: 10000,
    })
  })
})
