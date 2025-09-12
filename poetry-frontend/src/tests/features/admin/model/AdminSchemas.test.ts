/*
 * File: AdminSchemas.test.ts
 * Purpose: Schema tests (happy + negative) for admin feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { AdminEchoSchema } from '../../../../features/admin/model/AdminSchemas'

describe('AdminEchoSchema', () => {
  it('parses', () => {
    expect(AdminEchoSchema.parse({ message: 'ok' }).message).toBe('ok')
  })
  it('rejects empty message', () => {
    expect(() => AdminEchoSchema.parse({ message: '' })).toThrow()
  })
})
