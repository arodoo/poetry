/*
 * File: useFingerprintMutations.ts
 * Purpose: React Query mutations for fingerprint enrollment and verification.
 * Handles enrollment and verification API calls with error handling.
 * Invalidates fingerprints cache on successful enrollment.
 * All Rights Reserved. Arodi Emmanuel
 */

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import { enrollFingerprint, verifyFingerprint } from '../api/fingerprintApi'
import { fingerprintQueryKeys } from './useFingerprintQueries'
import type {
  EnrollRequest,
  VerifyRequest,
  FingerprintResponse,
  VerifyResponse,
} from '../model/FingerprintSchemas'

export function useEnrollFingerprintMutation(): UseMutationResult<
  FingerprintResponse,
  unknown,
  EnrollRequest
> {
  const queryClient = useQueryClient()
  const token = tokenStorage.load()?.accessToken

  return useMutation({
    mutationFn: (data: EnrollRequest) => {
      if (!token) throw new Error('No authentication token')
      return enrollFingerprint(data, token)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: fingerprintQueryKeys.root,
      })
    },
  })
}

export function useVerifyFingerprintMutation(): UseMutationResult<
  VerifyResponse,
  unknown,
  VerifyRequest
> {
  const token = tokenStorage.load()?.accessToken

  return useMutation({
    mutationFn: (data: VerifyRequest) => {
      if (!token) throw new Error('No authentication token')
      return verifyFingerprint(data, token)
    },
  })
}
