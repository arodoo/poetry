/*
 * File: useCreateSellerCodeMutation.ts
 * Purpose: Mutation hook for creating seller codes.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { createSellerCode } from '../api/sellerCodesApi'
import type {
  CreateSellerCodeInput,
  SellerCodeDetail,
} from '../model/SellerCodesSchemas'
import { useSellerCodesMutationSuccess } from './useSellerCodesMutationHelpers'

export function useCreateSellerCodeMutation(): UseMutationResult<
  SellerCodeDetail,
  unknown,
  CreateSellerCodeInput
> {
  const onSuccess: (detail: SellerCodeDetail) => void =
    useSellerCodesMutationSuccess()
  return useMutation({
    mutationFn: createSellerCode,
    onSuccess,
  })
}
