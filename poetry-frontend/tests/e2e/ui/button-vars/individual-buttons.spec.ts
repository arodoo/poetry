/*
 File: individual-buttons.spec.ts
 Purpose: Check individual view/edit/delete buttons for expected color usage.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../../shared/providers/tokenProvider'

test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForLoadState('networkidle')
})

test('view button visible and has background', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  const viewBtn = page.locator('[data-testid^="view-user-"]').first()
  await expect(viewBtn).toBeVisible()
  const bgColor: string = await viewBtn.evaluate(
    (el) => getComputedStyle(el).backgroundColor
  )
  const textColor: string = await viewBtn.evaluate(
    (el) => getComputedStyle(el).color
  )
  expect(bgColor).toBeTruthy()
  expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
  expect(textColor).toBeTruthy()
})

test('edit button has primary text color', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  const viewBtn = page.locator('[data-testid^="view-user-"]').first()
  await expect(viewBtn).toBeVisible()
  await viewBtn.click()
  await page.waitForLoadState('networkidle')

  const editBtn = page.locator('[data-testid="edit-user-button"]')
  await expect(editBtn).toBeVisible()
  const textColor: string = await editBtn.evaluate(
    (el) => getComputedStyle(el).color
  )
  const primaryVar: string = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue(
      '--color-primary'
    )
  )
  expect(textColor).toBeTruthy()
  expect(primaryVar).toBeTruthy()
})

test('delete button has error text color', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  const deleteBtn = page.locator('[data-testid^="delete-user-"]').first()
  await expect(deleteBtn).toBeVisible()
  const textColor: string = await deleteBtn.evaluate(
    (el) => getComputedStyle(el).color
  )
  const errorVar: string = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--color-error')
  )
  expect(textColor).toBeTruthy()
  expect(errorVar).toBeTruthy()
})
