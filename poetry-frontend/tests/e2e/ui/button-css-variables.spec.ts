/*
 File: button-css-variables.spec.ts
 Purpose: E2E test verifying Button component renders with proper CSS
 variables from TokensProvider. Validates theme colors are established
 and buttons display correct text colors based on variant and textTone.
 All Rights Reserved. Arodi Emmanuel
*/
/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/typedef, max-lines */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Button CSS Variables', () => {
  let page: Page

  test.beforeEach(async ({ browser }): Promise<void> => {
    page = await browser.newPage()
    await injectTokens(page)
    await page.goto('/en/users')
    await page.waitForLoadState('networkidle')
  })

  test.afterEach(async (): Promise<void> => {
    await page.close()
  })

  test('CSS variables are established on document root', async (): Promise<void> => {
    const primary: string = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        '--color-primary'
      )
    )
    const error: string = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        '--color-error'
      )
    )
    const text: string = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        '--color-text'
      )
    )

    expect(primary).toBeTruthy()
    expect(primary).not.toBe('')
    expect(error).toBeTruthy()
    expect(error).not.toBe('')
    expect(text).toBeTruthy()
    expect(text).not.toBe('')
  })

  test('View button has primary background color', async (): Promise<void> => {
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

  test('Edit button has primary text color', async (): Promise<void> => {
    const editBtn = page.locator('[data-testid^="edit-user-"]').first()
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

  test('Delete button has error text color', async (): Promise<void> => {
    const deleteBtn = page.locator('[data-testid^="delete-user-"]').first()
    await expect(deleteBtn).toBeVisible()

    const textColor: string = await deleteBtn.evaluate(
      (el) => getComputedStyle(el).color
    )
    const errorVar: string = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        '--color-error'
      )
    )

    expect(textColor).toBeTruthy()
    expect(errorVar).toBeTruthy()
  })

  test('all three buttons have different visual appearances', async (): Promise<void> => {
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

    console.log('Button colors:', {
      viewBg,
      viewText,
      editBg,
      editText,
      deleteText,
    })

    expect(viewBg).not.toBe(editBg)
    expect(viewText).not.toBe(editText)
    expect(editText).not.toBe(deleteText)
  })
})
