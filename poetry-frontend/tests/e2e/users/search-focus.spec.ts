/*
 * File: search-focus.spec.ts
 * Purpose: E2E test to verify search input maintains focus
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('DataTable Search Focus', () => {
    test('should maintain focus while typing with delays', async ({ page }) => {
        await injectTokens(page)

        await page.goto('http://localhost:5173/en/users', {
            waitUntil: 'networkidle'
        })

        await page.waitForSelector('table', {
            state: 'visible',
            timeout: 15000
        })

        const searchInput = page.locator('[data-testid="table-search-input"]')

        await searchInput.click()

        const characters = ['h', 'e', 'l', 'l', 'o']

        for (let i = 0; i < characters.length; i++) {
            await page.keyboard.type(characters[i])
            await page.waitForTimeout(1000)

            const isFocused = await searchInput.evaluate(
                (el) => el === document.activeElement
            )

            if (!isFocused) {
                console.log(`❌ Focus lost after typing character ${i + 1}: '${characters[i]}'`)
            } else {
                console.log(`✅ Focus maintained after character ${i + 1}: '${characters[i]}'`)
            }

            expect(isFocused).toBe(true)
        }

        const finalValue = await searchInput.inputValue()
        expect(finalValue).toBe('hello')
    })
})
