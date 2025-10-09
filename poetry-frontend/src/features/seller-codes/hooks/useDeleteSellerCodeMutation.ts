/*
 * File: useDeleteSellerCodeMutation.ts
 * Purpose: Mutation hook for deleting seller codes (soft delete).
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { deleteSellerCode } from '../api/seller-codesApi'
import type { SellerCodeDetail } from '../model/SellerCodesSchemas'
import {
  type MutationVariables,
  useSellerCodesEntityMutation,
} from './useSellerCodesMutationHelpers'

export function useDeleteSellerCodeMutation(): UseMutationResult<
  SellerCodeDetail,
  unknown,
  MutationVariables<unknown>
> {
  return useSellerCodesEntityMutation(deleteSellerCode)
}
