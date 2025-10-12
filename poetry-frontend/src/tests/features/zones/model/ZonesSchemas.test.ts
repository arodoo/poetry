/*
 * File: ZonesSchemas.test.ts
 * Purpose: Validate zones zod schemas used by the feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { CreateZoneSchema } from '../../../../features/zones/model/ZonesCommands'

describe('Zones Schemas', () => {
  it('CreateZoneSchema should parse a valid payload', () => {
    // schema requires name min length and managerId number
    const payload = { name: 'Test Zone', managerId: 1 }
    const parsed = CreateZoneSchema.safeParse(payload)
    expect(parsed.success).toBe(true)
  })
})