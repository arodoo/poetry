/*
 * File: favicon-letter.spec.ts
 * Purpose: Asserts the served favicon SVG contains the Boops
 * brand letter "B" rather than the legacy "P" glyph. Prevents
 * regression of the brand identity on client installs.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'

test('poetry.svg shows Boops letter B', async ({ request }) => {
  const resp = await request.get('/poetry.svg')
  expect(resp.status()).toBe(200)
  const body = await resp.text()
  expect(body).toMatch(/>B<\/text>/)
  expect(body).not.toMatch(/>P<\/text>/)
  // Guard against font-substitution bug (3-dots glyph in alpine
  // ImageMagick). Must declare a font the bundler stage installs.
  expect(body).toMatch(/DejaVu Serif/)
})
