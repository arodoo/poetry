/*
 * File: switch-visual.spec.ts
 * Purpose: E2E visual test for the Switch component verifying that
 * global button styles (padding, border) do not leak into the switch
 * track and that the background color changes between active/inactive.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../../shared/providers/tokenProvider'
import {
  seedMembership,
  deleteMembership,
  type SeedMembership,
} from '../../shared/fixtures/seedApi'

test.describe('Switch visual styles', (): void => {
  let m: SeedMembership

  test.beforeAll(async (): Promise<void> => {
    m = await seedMembership()
  })

  test.afterAll(async (): Promise<void> => {
    if (m?.id) await deleteMembership(m.id).catch(() => {})
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('all-zones switch has no global button padding or border', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/memberships/${m.id}/edit`)
    const sw = page.getByRole('switch')
    await expect(sw).toBeVisible({ timeout: 10000 })

    const paddingLeft = await sw.evaluate(
      (el: Element) => getComputedStyle(el).paddingLeft
    )
    const borderWidth = await sw.evaluate(
      (el: Element) => getComputedStyle(el).borderTopWidth
    )
    expect(paddingLeft).toBe('0px')
    expect(borderWidth).toBe('0px')
  })

  test('all-zones switch background changes on toggle', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/memberships/${m.id}/edit`)
    const sw = page.getByRole('switch')
    await expect(sw).toBeVisible({ timeout: 10000 })

    const bgBefore = await sw.evaluate(
      (el: Element) => getComputedStyle(el).backgroundColor
    )
    await sw.click()
    await page.waitForTimeout(500)
    const bgAfter = await sw.evaluate(
      (el: Element) => getComputedStyle(el).backgroundColor
    )
    expect(bgAfter).not.toBe(bgBefore)
  })
})
