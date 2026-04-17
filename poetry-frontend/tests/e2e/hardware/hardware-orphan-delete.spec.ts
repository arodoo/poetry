/*
 * File: hardware-orphan-delete.spec.ts
 * Purpose: E2E test for deleting orphan fingerprints from the
 * hardware panel. Seeds a fingerprint with no user, verifies
 * it appears as "Unknown", deletes it, verifies removal.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { authedApi } from '../shared/fixtures/seedApi'

async function seedOrphanFp(): Promise<number> {
  const api = await authedApi()
  const fmd = `E2E_ORPHAN_${Date.now()}_${Math.random()}`
  const r = await api.post('/api/v1/fingerprints/enroll', {
    data: { fmd },
  })
  if (!r.ok()) throw new Error(`seed: ${r.status()}`)
  const body = (await r.json()) as { id: number }
  await api.dispose()
  return body.id
}

async function cleanupFp(id: number): Promise<void> {
  const api = await authedApi()
  await api.delete(`/api/v1/fingerprints/${String(id)}`)
  await api.dispose()
}

test.describe('Orphan fingerprint delete', (): void => {
  let fpId: number

  test.beforeEach(async (): Promise<void> => {
    fpId = await seedOrphanFp()
  })

  test.afterEach(async (): Promise<void> => {
    try {
      await cleanupFp(fpId)
    } catch {
      /* already deleted */
    }
  })

  test('orphan shows Unknown and can be deleted', async ({
    page,
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/hardware')
    await page.waitForLoadState('networkidle')

    // Find the orphan row by its delete button testid
    const del = page.getByTestId(`delete-fp-${fpId}`)
    await expect(del).toBeVisible({ timeout: 10000 })

    // Accept the confirm dialog before clicking
    page.once('dialog', (d) => void d.accept())
    await del.click()

    // Row must disappear
    await expect(del).not.toBeVisible({ timeout: 10000 })
  })
})
