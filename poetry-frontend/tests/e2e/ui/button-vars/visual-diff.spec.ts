/*
 File: visual-diff.spec.ts
 Purpose: Ensure view/edit/delete buttons have different visual appearances.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../../shared/providers/tokenProvider'

test('three action buttons differ visually', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForLoadState('networkidle')
  const viewBtn = page.locator('[data-testid^="view-user-"]').first()
  const editBtn = page.locator('[data-testid^="edit-user-"]').first()
  const deleteBtn = page.locator('[data-testid^="delete-user-"]').first()
  const viewBg: string = await viewBtn.evaluate(
    (el) => getComputedStyle(el).backgroundColor
  )
  const editBg: string = await editBtn.evaluate(
    (el) => getComputedStyle(el).backgroundColor
  )
  const viewText: string = await viewBtn.evaluate(
    (el) => getComputedStyle(el).color
  )
  const editText: string = await editBtn.evaluate(
    (el) => getComputedStyle(el).color
  )
  const deleteText: string = await deleteBtn.evaluate(
    (el) => getComputedStyle(el).color
  )
  expect(viewBg).not.toBe(editBg)
  expect(viewText).not.toBe(editText)
  expect(editText).not.toBe(deleteText)
})
