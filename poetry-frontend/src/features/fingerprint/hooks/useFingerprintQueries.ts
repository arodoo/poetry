/*
 * File: useFingerprintQueries.ts
 * Purpose: React Query hooks for fingerprint data fetching.
 * Provides cached query for listing all enrolled fingerprints.
 * Implements proper error handling and loading states.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import { fetchFingerprints } from '../api/fingerprintApi'
import type { FingerprintResponse } from '../model/FingerprintSchemas'

export const fingerprintQueryKeys = {
  root: ['fingerprints'] as const,
  list(): readonly ['fingerprints', 'list'] {
    return ['fingerprints', 'list'] as const
  },
} as const

export function useFingerprintsListQuery(): UseQueryResult<
  FingerprintResponse[]
> {
  const token = tokenStorage.load()?.accessToken
  return useQuery({
    queryKey: fingerprintQueryKeys.list(),
    queryFn: () => {
      if (!token) throw new Error('No authentication token')
      return fetchFingerprints(token)
    },
    enabled: Boolean(token),
    staleTime: 1000 * 30,
  })
}
