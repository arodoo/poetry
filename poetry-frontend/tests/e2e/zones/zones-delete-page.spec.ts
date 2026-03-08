/*
 * File: zones-delete-page.spec.ts
 * Purpose: E2E test for zone delete confirmation page UI elements.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { seedZone, deleteZone, type SeedZone } from '../shared/fixtures/seedApi'

test.describe('Zones Delete Confirmation Page', (): void => {
  let zone: SeedZone

  test.beforeAll(async (): Promise<void> => {
    zone = await seedZone({ name: 'e2e-delete-page' })
  })

  test.afterAll(async (): Promise<void> => {
    if (zone?.id) await deleteZone(zone.id).catch(() => {})
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('displays heading and action buttons', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/zones/${zone.id}/delete`)

    const heading = page.getByRole('heading', { name: /delete/i, level: 1 })
    await expect(heading).toBeVisible({ timeout: 10000 })

    const confirmButton = page.getByTestId('confirm-delete-zone-button')
    await expect(confirmButton).toBeVisible()

    const cancelButton = page.getByTestId('cancel-delete-zone-button')
    await expect(cancelButton).toBeVisible()
  })
})
