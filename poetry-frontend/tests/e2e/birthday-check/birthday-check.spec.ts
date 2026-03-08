/*
 * File: birthday-check.spec.ts
 * Purpose: E2E tests for the birthday-check feature. Validates navbar
 * button visibility, popup open/close, celebrant display and the
 * empty-state message. beforeAll sets admin birthday; afterAll clears it
 * to leave the database in its original state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, request as pw } from '@playwright/test'
import { getAuthTokens, injectTokens } from '../shared/providers/tokenProvider'

const API = 'http://localhost:8080'
const TODAY = new Date().toISOString().slice(0, 10)
let adminId = 1

async function putDemographics(birthDate: string | null): Promise<void> {
  const t = await getAuthTokens()
  const ctx = await pw.newContext({ baseURL: API })
  await ctx.put(`/api/v1/users/${String(adminId)}/demographics`, {
    data: { birthDate },
    headers: { Authorization: `Bearer ${t.accessToken}` },
  })
  await ctx.dispose()
}

test.describe('Birthday Check', (): void => {
  test.beforeAll(async (): Promise<void> => {
    const t = await getAuthTokens()
    const ctx = await pw.newContext({ baseURL: API })
    const resp = await ctx.get('/api/v1/users', {
      params: { search: 'admin', size: 5 },
      headers: { Authorization: `Bearer ${t.accessToken}` },
    })
    const body = (await resp.json()) as
      | { content: { id: number; username: string }[] }
      | { id: number; username: string }[]
    const list = Array.isArray(body) ? body : body.content
    const found = list.find((u) => u.username === 'admin')
    if (found != null) adminId = found.id
    await ctx.dispose()
    await putDemographics(TODAY)
  })

  test.afterAll(async (): Promise<void> => {
    await putDemographics(null)
  })

  test('button visible in navbar', async ({ page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/es/dashboard')
    await expect(page.getByTestId('birthday-check-button')).toBeVisible({
      timeout: 15000,
    })
  })

  test('click opens popup', async ({ page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/es/dashboard')
    await page.getByTestId('birthday-check-button').click()
    await expect(page.getByTestId('birthday-popup')).toBeVisible({
      timeout: 10000,
    })
  })

  test('popup shows @admin', async ({ page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/es/dashboard')
    await page.getByTestId('birthday-check-button').click()
    const card = page.getByTestId('birthday-celebrant-card').first()
    await expect(card).toBeVisible({ timeout: 10000 })
    await expect(card).toContainText('@admin')
  })

  test('close button hides popup', async ({ page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/es/dashboard')
    await page.getByTestId('birthday-check-button').click()
    await page.getByTestId('birthday-popup').waitFor()
    await page.getByRole('button', { name: /Cerrar|Close/i }).click()
    await expect(page.getByTestId('birthday-popup')).not.toBeVisible()
  })

  test('empty state when no birthday', async ({ page }): Promise<void> => {
    await putDemographics(null)
    try {
      await injectTokens(page)
      await page.goto('/es/dashboard')
      await page.getByTestId('birthday-check-button').click()
      await page.getByTestId('birthday-popup').waitFor({ timeout: 10000 })
      await expect(page.getByTestId('birthday-empty-state')).toBeVisible()
    } finally {
      await putDemographics(TODAY)
    }
  })
})
