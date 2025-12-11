/*
 * File: useFingerprintAdminQueries.ts
 * Purpose: React Query hooks for fingerprint admin operations.
 * Provides queries for archived fingerprints and slot usage stats.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import { fetchArchivedFingerprints } from '../api/fingerprintAdminApi'
import { fetchFingerprints } from '../api/fingerprintApi'
import type { FingerprintResponse } from '../model/FingerprintSchemas'

export const fingerprintAdminQueryKeys = {
  archived: ['fingerprints', 'archived'] as const,
  slotUsage: ['fingerprints', 'slot-usage'] as const,
} as const

export function useArchivedFingerprintsQuery(): UseQueryResult<
  FingerprintResponse[]
> {
  const token = tokenStorage.load()?.accessToken
  return useQuery({
    queryKey: fingerprintAdminQueryKeys.archived,
    queryFn: (): Promise<FingerprintResponse[]> => {
      if (!token) throw new Error('No authentication token')
      return fetchArchivedFingerprints(token)
    },
    enabled: Boolean(token),
    staleTime: 1000 * 30,
  })
}

export interface SlotUsageStats {
  usedSlots: number
  totalSlots: number
  percentage: number
}

export function useSlotUsageQuery(): UseQueryResult<SlotUsageStats> {
  const token = tokenStorage.load()?.accessToken
  return useQuery({
    queryKey: fingerprintAdminQueryKeys.slotUsage,
    queryFn: async (): Promise<SlotUsageStats> => {
      if (!token) throw new Error('No authentication token')
      const all = await fetchFingerprints(token)
      const active = all.filter(
        (fp: FingerprintResponse): boolean => fp.status === 'ACTIVE'
      )
      const totalSlots = 1500
      return {
        usedSlots: active.length,
        totalSlots,
        percentage: Math.round((active.length / totalSlots) * 100),
      }
    },
    enabled: Boolean(token),
    staleTime: 1000 * 30,
  })
}
