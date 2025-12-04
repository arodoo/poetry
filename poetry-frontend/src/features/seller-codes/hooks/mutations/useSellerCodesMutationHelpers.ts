/*
 * File: useSellerCodesMutationHelpers.ts
 * Purpose: Shared utilities for seller codes mutation hooks.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import type { SellerCodeDetail } from '../../model/SellerCodesSchemas'
import { sellerCodesQueryKeys } from '../useSellerCodesQueries'

export interface MutationVariables<TInput> {
  readonly id: string
  readonly input: TInput
  readonly etag?: string
}

export function useSellerCodesMutationSuccess(): (
  detail: SellerCodeDetail
) => void {
  const queryClient: ReturnType<typeof useQueryClient> = useQueryClient()
  return (detail: SellerCodeDetail): void => {
    const casted: { id: string | number } = detail as {
      id: string | number
    }
    const id = String(casted.id)
    void queryClient.invalidateQueries({
      queryKey: sellerCodesQueryKeys.list(),
    })
    void queryClient.invalidateQueries({
      queryKey: sellerCodesQueryKeys.detail(id),
    })
  }
}

export function useSellerCodesEntityMutation<TInput>(
  mutation: (
    id: string,
    input: TInput,
    etag?: string
  ) => Promise<SellerCodeDetail>
): UseMutationResult<SellerCodeDetail, unknown, MutationVariables<TInput>> {
  const onSuccess: (detail: SellerCodeDetail) => void =
    useSellerCodesMutationSuccess()
  return useMutation({
    mutationFn: (
      variables: MutationVariables<TInput>
    ): Promise<SellerCodeDetail> =>
      mutation(variables.id, variables.input, variables.etag),
    onSuccess,
  })
}
