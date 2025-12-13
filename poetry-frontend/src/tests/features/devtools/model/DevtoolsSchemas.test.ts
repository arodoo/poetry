/*
 * File: DevtoolsSchemas.test.ts
 * Purpose: Tests for devtools schemas.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { HardwareSlotSchema } from '../../../../../src/features/devtools/model/DevtoolsSchemas'

describe('DevtoolsSchemas', () => {
  it('validates hardware slot correctly', () => {
    const valid = { slotId: 1, status: 'used' }
    expect(HardwareSlotSchema.parse(valid)).toEqual(valid)
  })
})
