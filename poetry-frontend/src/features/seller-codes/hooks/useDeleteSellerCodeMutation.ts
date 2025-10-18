/*
 * File: useDeleteSellerCodeMutation.ts
 * Purpose: Mutation hook for deleting seller codes (soft delete).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import { deleteSellerCode } from '../api/seller-codesApi'
import { sellerCodesQueryKeys } from './useSellerCodesQueries'

export function useDeleteSellerCodeMutation(): UseMutationResult<
  unknown,
  unknown,
  { id: string; version: number; etag?: string }
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, version, etag }) => {
      const etagHeader = etag ?? ('"' + String(version) + '"')
      return deleteSellerCode(id, {}, etagHeader)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: sellerCodesQueryKeys.root,
      })
    },
  })
}
