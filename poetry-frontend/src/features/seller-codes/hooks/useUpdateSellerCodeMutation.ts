/*
 * File: useUpdateSellerCodeMutation.ts
 * Purpose: Mutation hook for updating seller codes.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type UseMutationResult } from '@tanstack/react-query'
import { updateSellerCode } from '../api/seller-codesApi'
import type {
  UpdateSellerCodeInput,
  SellerCodeDetail,
} from '../model/SellerCodesSchemas'
import {
  useSellerCodesEntityMutation,
  type MutationVariables,
} from './useSellerCodesMutationHelpers'

export function useUpdateSellerCodeMutation(): UseMutationResult<
  SellerCodeDetail,
  unknown,
  MutationVariables<UpdateSellerCodeInput>
> {
  return useSellerCodesEntityMutation(updateSellerCode)
}
