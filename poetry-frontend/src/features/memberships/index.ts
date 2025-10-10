/*
 * File: index.ts
 * Purpose: Public exports for memberships feature
 * All Rights Reserved. Arodi Emmanuel
 */

// Routes
export { membershipsRoutes } from './routing/membershipsRoutes'

// Types
export type {
  Membership,
  MembershipResponse,
  MembershipCreateRequest,
  MembershipUpdateRequest,
  CreateMembershipInput,
  UpdateMembershipInput,
} from './model/MembershipsSchemas'

// Hooks
export {
  useMembershipsListQuery,
  useMembershipsPageQuery,
  useMembershipDetailQuery,
  membershipsQueryKeys,
} from './hooks/useMembershipsQueries'

export {
  useCreateMembershipMutation,
  useUpdateMembershipMutation,
  useDeleteMembershipMutation,
} from './hooks/useMembershipsMutations'

// API (if needed externally)
export {
  fetchMembershipsList,
  fetchMembershipsPage,
  fetchMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
} from './api/membershipsApi'
