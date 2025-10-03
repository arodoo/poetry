/*
 * File: useMe.ts
 * Purpose: React Query hook for the 'me' endpoint with stable key.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getMe } from '../api/authApi'
import type { Me } from '../model/AuthTokensSchemas'
import { tokenStorage } from '../../../shared/security/tokenStorage'

export const meQueryKey: readonly ['auth', 'me'] = ['auth', 'me'] as const

export interface UseMeQueryOptions {
  enabled?: boolean
}

export function useMeQuery(options?: UseMeQueryOptions): UseQueryResult<Me> {
  const shouldFetch: boolean = options?.enabled ?? true
  const hasTokens: boolean = shouldFetch && !!tokenStorage.load()?.accessToken
  return useQuery<Me>({
    queryKey: meQueryKey,
    enabled: hasTokens, // don't run until we have tokens
    queryFn: getMe,
    // Treat user object as stable for 2 minutes unless invalidated explicitly
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry(failureCount: number, error: unknown): boolean {
      // Do not retry client auth errors to prevent console spam
      if (error instanceof Error) {
        if (
          error.message.includes('HTTP 401') ||
          error.message.includes('HTTP 403')
        )
          return false
      }
      return failureCount < 2 // modest retry for transient faults
    },
    refetchOnWindowFocus: false,
  })
}
