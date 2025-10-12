/*
 * File: useUsersQueries.ts
 * Purpose: React Query hooks for admin users read operations.
 * Uses generated UserResponse types (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokenStorage'
import { fetchUserById, fetchUsersList, fetchUsersPage } from '../api/usersApi'
import type {
  UserResponse,
  PageResponseDtoUserResponse,
} from '../../../api/generated'

export const usersQueryKeys: {
  readonly root: readonly ['users']
  list(): readonly ['users', 'list']
  page(
    pageNum: number,
    pageSize: number,
    search?: string
  ): readonly [
    'users',
    'page',
    number,
    number,
    string | undefined,
  ]
  detail(id: string): readonly ['users', 'detail', string]
} = {
  root: ['users'],
  list(): readonly ['users', 'list'] {
    return ['users', 'list'] as const
  },
  page(
    pageNum: number,
    pageSize: number,
    search?: string
  ): readonly [
    'users',
    'page',
    number,
    number,
    string | undefined,
  ] {
    return ['users', 'page', pageNum, pageSize, search] as const
  },
  detail(id: string): readonly ['users', 'detail', string] {
    return ['users', 'detail', id] as const
  },
}

export function useUsersListQuery(): UseQueryResult<UserResponse[]> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: usersQueryKeys.list(),
    queryFn: fetchUsersList,
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useUsersPageQuery(
  page: number,
  size: number,
  search?: string
): UseQueryResult<PageResponseDtoUserResponse> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: usersQueryKeys.page(page, size, search),
    queryFn: (): Promise<PageResponseDtoUserResponse> =>
      fetchUsersPage(page, size, search),
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useUserDetailQuery(id: string): UseQueryResult<UserResponse> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: usersQueryKeys.detail(id),
    queryFn: (): Promise<UserResponse> => fetchUserById(id),
    enabled: hasAccessToken && id.length > 0,
    staleTime: 1000 * 30,
  })
}
