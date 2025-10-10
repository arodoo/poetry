/*
 * File: useMembershipFormData.ts
 * Purpose: Hook to fetch users subscriptions and zones for
 * membership form selects.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useUsersListQuery } from '../../users/hooks/useUsersQueries'
import { useSubscriptionsListQuery } from '../../subscriptions/hooks/useSubscriptionsQueries'
import { useZonesListQuery } from '../../zones/hooks/useZonesQueries'
import type { UserResponse } from '../../../api/generated'
import type { SubscriptionResponse } from '../../../api/generated'
import type { ZoneResponse } from '../../../api/generated'

export interface MembershipFormData {
  readonly users: readonly UserResponse[]
  readonly subscriptions: readonly SubscriptionResponse[]
  readonly zones: readonly ZoneResponse[]
  readonly isLoading: boolean
}

export function useMembershipFormData(): MembershipFormData {
  const usersQuery = useUsersListQuery()
  const subscriptionsQuery = useSubscriptionsListQuery()
  const zonesQuery = useZonesListQuery()

  return {
    users: usersQuery.data ?? [],
    subscriptions: subscriptionsQuery.data ?? [],
    zones: zonesQuery.data ?? [],
    isLoading:
      usersQuery.isLoading ||
      subscriptionsQuery.isLoading ||
      zonesQuery.isLoading,
  }
}
