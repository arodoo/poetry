/*
 * File: useMembershipDetailWithETag.ts
 * Purpose: Query hook that fetches membership detail with ETag
 * header for optimistic locking in update operations.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import {
  fetchMembershipDetailWithETag,
  type MembershipDetailWithETag,
} from '../api/membershipDetailWithETag'
import { membershipsQueryKeys } from './useMembershipsQueries'

export function useMembershipDetailWithETag(
  id: string
): UseQueryResult<MembershipDetailWithETag> {
  return useQuery({
    queryKey: [...membershipsQueryKeys.detail(id), 'with-etag'],
    queryFn: (): Promise<MembershipDetailWithETag> =>
      fetchMembershipDetailWithETag(id),
    staleTime: 0,
  })
}
