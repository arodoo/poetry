/*
 * File: useFingerprintAdminMutations.ts
 * Purpose: React Query mutations for fingerprint admin operations.
 * Provides restore mutation that invalidates related queries on success.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import { restoreFingerprint } from '../api/fingerprintAdminApi'
import { fingerprintAdminQueryKeys } from './useFingerprintAdminQueries'
import { fingerprintQueryKeys } from './useFingerprintQueries'
import type { FingerprintResponse } from '../model/FingerprintSchemas'

export function useRestoreFingerprintMutation() {
    const queryClient = useQueryClient()

    return useMutation<FingerprintResponse, Error, number>({
        mutationFn: async (id: number) => {
            const token = tokenStorage.load()?.accessToken
            if (!token) throw new Error('No authentication token')
            return restoreFingerprint(id, token)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: fingerprintAdminQueryKeys.archived,
            })
            queryClient.invalidateQueries({
                queryKey: fingerprintAdminQueryKeys.slotUsage,
            })
            queryClient.invalidateQueries({
                queryKey: fingerprintQueryKeys.root,
            })
        },
    })
}
