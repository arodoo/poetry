/*
 * File: useUsersQueries.ts
 * Purpose: React Query hooks for admin users read operations.
 * Uses generated UserResponse types (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokenStorage'
import { fetchUserById, fetchUsersList } from '../api/usersApi'
import type { UserResponse } from '../../../api/generated'

export const usersQueryKeys: {
  readonly root: readonly ['users']
  list(): readonly ['users', 'list']
  detail(id: string): readonly ['users', 'detail', string]
} = {
  root: ['users'],
  list(): readonly ['users', 'list'] {
    return ['users', 'list'] as const
  },
  detail(id: string): readonly ['users', 'detail', string] {
    return ['users', 'detail', id] as const
  },
}

export function useUsersListQuery(): UseQueryResult<UserResponse[]> {
  const hasAccessToken: boolean = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: usersQueryKeys.list(),
    queryFn: fetchUsersList,
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useUserDetailQuery(id: string): UseQueryResult<UserResponse> {
  const hasAccessToken: boolean = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: usersQueryKeys.detail(id),
    queryFn: (): Promise<UserResponse> => fetchUserById(id),
    enabled: hasAccessToken && id.length > 0,
    staleTime: 1000 * 30,
  })
}
