/*
 * File: AdminSchemas.test.ts
 * Purpose: Smoke test for Admin schemas to satisfy structure-only checks.
 * All Rights Reserved. Arodi Emmanuel TODO
 */
import { describe, it, expect } from 'vitest'
import { AdminEchoSchema } from '../../../../features/admin/model/AdminSchemas'

describe('AdminEchoSchema', () => {
  it('parses', () => {
    expect(AdminEchoSchema.parse({ message: 'ok' }).message).toBe('ok')
  })
})
