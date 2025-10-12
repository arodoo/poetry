/*
 * File: MembershipsSchemas.test.ts
 * Purpose: Validate exported types and zod schemas from memberships feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest';
import type { MembershipCreateRequest } from '../../../../api/generated';
import {
  CreateMembershipSchema,
  UpdateMembershipSchema,
} from '../../../../features/memberships/model/MembershipsCommands';

describe('Memberships Schemas', () => {
  it('CreateMembershipSchema should parse a valid payload', () => {
    const payload: MembershipCreateRequest = {
      // minimal required fields observed from SDK types
      name: 'Test Plan',
      price: 0,
      currency: 'USD',
    } as unknown as MembershipCreateRequest;

    const parsed = CreateMembershipSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
  });

  it('UpdateMembershipSchema should accept partial updates', () => {
    const partial = { name: 'Updated Name' };
    const parsed = UpdateMembershipSchema.safeParse(partial);
    expect(parsed.success).toBe(true);
  });
});
