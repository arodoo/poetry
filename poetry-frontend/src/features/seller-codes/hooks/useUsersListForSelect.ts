/*
 * File: useUsersListForSelect.ts
 * Purpose: React Query hook to fetch users list for dropdown selection
 * using generated SDK with authentication configured in main.tsx.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { listUsers, type UserResponse } from '../../../api/generated'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

export function useUsersListForSelect(): UseQueryResult<
  readonly UserResponse[]
> {
  const hasToken = Boolean(tokenStorage.load()?.accessToken)

  return useQuery({
    queryKey: ['users', 'list-for-select'],
    queryFn: async (): Promise<readonly UserResponse[]> => {
      const result = await listUsers()
      if (!result.data) return []
      return Array.isArray(result.data) ? result.data : []
    },
    enabled: hasToken,
    staleTime: 1000 * 60 * 5,
  })
}
