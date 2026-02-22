/*
 * File: useFingerprintsQuery.ts
 * Purpose: Fetch all fingerprints for the hardware table.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchFingerprints } from '../../fingerprint/api/fingerprintApi'
import type { FingerprintResponse } from '../../fingerprint/model/FingerprintSchemas'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

export function useFingerprintsQuery(): UseQueryResult<
  readonly FingerprintResponse[]
> {
  const token = tokenStorage.load()?.accessToken
  const hasToken = Boolean(token)

  return useQuery({
    queryKey: ['fingerprints', 'list-all'],
    queryFn: async (): Promise<readonly FingerprintResponse[]> => {
      if (!token) throw new Error('No token')
      const data = await fetchFingerprints(token)
      return data
    },
    enabled: hasToken,
    staleTime: 1000 * 60, // 1 min (don't need frequent refresh here unless action taken)
  })
}
