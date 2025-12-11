/*
 * File: useFingerprintAdminMutations.ts
 * Purpose: React Query mutations for fingerprint admin operations.
 * Provides restore mutation that invalidates related queries on success.
 * All Rights Reserved. Arodi Emmanuel
 */

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import { restoreFingerprint } from '../api/fingerprintAdminApi'
import { fingerprintAdminQueryKeys } from './useFingerprintAdminQueries'
import { fingerprintQueryKeys } from './useFingerprintQueries'
import type { FingerprintResponse } from '../model/FingerprintSchemas'

export function useRestoreFingerprintMutation(): UseMutationResult<
  FingerprintResponse,
  Error,
  number
> {
  const queryClient = useQueryClient()

  return useMutation<FingerprintResponse, Error, number>({
    mutationFn: async (id: number): Promise<FingerprintResponse> => {
      const token = tokenStorage.load()?.accessToken
      if (!token) throw new Error('No authentication token')
      return restoreFingerprint(id, token)
    },
    onSuccess: (): void => {
      void queryClient.invalidateQueries({
        queryKey: fingerprintAdminQueryKeys.archived,
      })
      void queryClient.invalidateQueries({
        queryKey: fingerprintAdminQueryKeys.slotUsage,
      })
      void queryClient.invalidateQueries({
        queryKey: fingerprintQueryKeys.root,
      })
    },
  })
}
