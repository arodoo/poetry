/*
 * File: useUserDetailWithETag.ts
 * Purpose: Query hook that fetches user detail along with ETag header for
 * optimistic locking in update operations.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import {
  fetchUserDetailWithETag,
  type UserDetailWithETag,
} from '../api/usersDetailWithETag'
import { usersQueryKeys } from './useUsersQueries'

export function useUserDetailWithETag(
  id: string
): UseQueryResult<UserDetailWithETag> {
  return useQuery({
    queryKey: [...usersQueryKeys.detail(id), 'with-etag'],
    queryFn: (): Promise<UserDetailWithETag> => fetchUserDetailWithETag(id),
    staleTime: 0,
  })
}
