/*
 * File: MembershipsSchemas.ts
 * Purpose: Aggregated re-exports for memberships feature schemas
 * Uses generated SDK types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */

// Re-export SDK types directly - NO custom types
export type {
  MembershipResponse,
  MembershipCreateRequest,
  MembershipUpdateRequest,
} from '../../../api/generated'

// Type aliases for clarity
export type { MembershipResponse as Membership } from '../../../api/generated'
export type { MembershipResponse as MembershipDetail } from '../../../api/generated'
export type { MembershipResponse as MembershipSummary } from '../../../api/generated'

// Collection using SDK type directly
export type MembershipsCollection =
  readonly import('../../../api/generated').MembershipResponse[]

// Zod input validation schemas
export {
  CreateMembershipSchema,
  UpdateMembershipSchema,
  type CreateMembershipInput,
  type UpdateMembershipInput,
} from './MembershipsCommands'
