/*
 * File: index.ts
 * Purpose: Public exports for the memberships feature. This file centralizes all exports related to memberships, including routes, types, and hooks, to ensure a clean and maintainable module interface. It helps other modules consume memberships functionality without deep imports. Keeping exports organized here supports long-term scalability and code clarity.
 * All Rights Reserved. Arodi Emmanuel
 */

// Routes
export { MembershipsRoutes } from './routing/membershipsRoutes'

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
