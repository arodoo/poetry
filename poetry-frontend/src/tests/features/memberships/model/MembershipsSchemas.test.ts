/*
 * File: MembershipsSchemas.test.ts
 * Purpose: Validate exported types and zod schemas from memberships feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import type { MembershipCreateRequest } from '../../../../api/generated'
import {
  CreateMembershipSchema,
  UpdateMembershipSchema,
} from '../../../../features/memberships/model/MembershipsCommands'

describe('Memberships Schemas', () => {
  it('CreateMembershipSchema should parse a valid payload', () => {
    // CreateMembershipSchema validates SDK MembershipCreateRequest fields.
    const payload = {
      userId: 1,
      subscriptionId: 1,
      sellerCode: 'ABC',
      zoneIds: [1, 2],
      allZones: false,
      status: 'active',
    } as unknown as MembershipCreateRequest

    const parsed = CreateMembershipSchema.safeParse(payload)
    expect(parsed.success).toBe(true)
  })

  it('UpdateMembershipSchema should accept partial updates', () => {
    const partial = { name: 'Updated Name' }
    const parsed = UpdateMembershipSchema.safeParse(partial)
    expect(parsed.success).toBe(true)
  })
})
