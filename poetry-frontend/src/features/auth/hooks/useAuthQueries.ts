/*
 * File: useAuthQueries.ts
 * Purpose: React Query hooks for the auth feature. Exposes a status
 * query to keep structure compliant with the blueprint.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getAuthStatus } from '../api/authApi'
import type { AuthStatus } from '../model/AuthSchemas'

export const authQueryKeys: { status: readonly ['auth', 'status'] } = {
  status: ['auth', 'status'] as const,
}

export function useAuthStatus(): UseQueryResult<AuthStatus> {
  return useQuery({
    queryKey: authQueryKeys.status,
    queryFn: (): Promise<AuthStatus> => getAuthStatus(),
  })
}
