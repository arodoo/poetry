/*
 * File: useUserMemberships.ts
 * Purpose: Hook to fetch user memberships filtered by status.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { fetchUserMemberships } from '../api/membershipsApi'
import type { PageResponseDtoMembershipDetail } from '../../../api/generated'

export function useUserMemberships(
  status: string,
  page: number,
  size: number,
  sort?: string
): UseQueryResult<PageResponseDtoMembershipDetail, unknown> {
  return useQuery({
    queryKey: ['user-memberships', status, page, size, sort],
    queryFn: () => fetchUserMemberships(status, page, size, sort),
    placeholderData: keepPreviousData,
  })
}
