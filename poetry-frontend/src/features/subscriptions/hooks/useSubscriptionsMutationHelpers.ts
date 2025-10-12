/*
 * File: useSubscriptionsMutationHelpers.ts
 * Purpose: Shared utilities for subscriptions mutation hooks.
 * Uses generated SubscriptionResponse type (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import type { SubscriptionResponse } from '../../../api/generated'
import { subscriptionsQueryKeys } from './useSubscriptionsQueries'

export interface MutationVariables<TInput> {
  readonly id: string
  readonly input: TInput
  readonly etag?: string
}

export function useSubscriptionsMutationSuccess(): (
  detail: SubscriptionResponse
) => void {
  const queryClient: ReturnType<typeof useQueryClient> = useQueryClient()
  return (detail: SubscriptionResponse): void => {
    const casted: { id?: string | number } = detail as {
      id?: string | number
    }
    const id = String(casted.id)
    void queryClient.invalidateQueries({
      queryKey: subscriptionsQueryKeys.root,
    })
    void queryClient.invalidateQueries({
      queryKey: subscriptionsQueryKeys.detail(id),
    })
  }
}

export function useSubscriptionsEntityMutation<TInput>(
  mutation: (
    id: string,
    input: TInput,
    etag?: string
  ) => Promise<SubscriptionResponse>
): UseMutationResult<SubscriptionResponse, unknown, MutationVariables<TInput>> {
  const onSuccess: (detail: SubscriptionResponse) => void =
    useSubscriptionsMutationSuccess()
  return useMutation({
    mutationFn: (
      variables: MutationVariables<TInput>
    ): Promise<SubscriptionResponse> =>
      mutation(variables.id, variables.input, variables.etag),
    onSuccess,
  })
}
