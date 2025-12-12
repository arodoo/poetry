/*
 * File: template-backup.spec.ts
 * Purpose: E2E test for fingerprint template backup/restore.
 * Tests download and upload of templates via hardware service.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect } from '@playwright/test'

const BRIDGE_URL = 'http://localhost:3001'

test.describe.skip('Template Backup API', () => {
  test('should download template from valid slot', async ({ request }) => {
    const response = await request.get(`${BRIDGE_URL}/fingerprint/template/0`)
    const json = await response.json()

    if (json.success) {
      expect(json.template).toBeDefined()
      expect(json.size).toBe(768)
    } else {
      // Slot 0 might be empty - that's OK
      expect(json.code).toBeDefined()
    }
  })

  test('should return error for invalid slot', async ({ request }) => {
    const response = await request.get(`${BRIDGE_URL}/fingerprint/template/-1`)
    const json = await response.json()

    expect(json.success).toBe(false)
  })

  test('should upload and verify template', async ({ request }) => {
    // Download from slot 0 (assuming it has a template)
    const downloadRes = await request.get(
      `${BRIDGE_URL}/fingerprint/template/0`
    )
    const downloadJson = await downloadRes.json()

    if (!downloadJson.success) {
      test.skip()
      return
    }

    // Upload to slot 100
    const uploadRes = await request.post(`${BRIDGE_URL}/fingerprint/template`, {
      data: { slotId: 100, template: downloadJson.template },
    })
    const uploadJson = await uploadRes.json()

    expect(uploadJson.success).toBe(true)
    expect(uploadJson.slotId).toBe(100)
  })
})
