/*
 * File: MembershipsCommands.ts
 * Purpose: Zod runtime validation for SDK request types
 * for memberships feature. Types are SDK types directly.
 * Schemas add client-side validation only.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import type {
  MembershipCreateRequest,
  MembershipUpdateRequest,
} from '../../../api/generated'

/**
 * Runtime validation for MembershipCreateRequest.
 * TYPE = MembershipCreateRequest (SDK).
 * SCHEMA = adds validation rules.
 */
export type CreateMembershipInput = MembershipCreateRequest

export const CreateMembershipSchema: z.ZodType<CreateMembershipInput> =
  z.object({
    userId: z.number().min(1, 'memberships.validation.userId'),
    subscriptionId: z
      .number()
      .min(1, 'memberships.validation.subscriptionId'),
    sellerCode: z
      .string()
      .min(1, 'memberships.validation.sellerCode'),
    zoneIds: z.array(z.number()).optional(),
    allZones: z.boolean().optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }) as z.ZodType<CreateMembershipInput>

/**
 * Runtime validation for MembershipUpdateRequest.
 */
export type UpdateMembershipInput = MembershipUpdateRequest

export const UpdateMembershipSchema: z.ZodType<UpdateMembershipInput> =
  z.object({
    userId: z.number().min(1).optional(),
    subscriptionId: z.number().min(1).optional(),
    sellerCode: z.string().min(1).optional(),
    zoneIds: z.array(z.number()).optional(),
    allZones: z.boolean().optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }) as z.ZodType<UpdateMembershipInput>
