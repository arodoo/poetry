/*
 * File: useDeleteSubscriptionMutation.ts
 * Purpose: Mutation hook for deleting subscriptions.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import { deleteSubscription } from '../api/subscriptionsApi'
import { subscriptionsQueryKeys } from './useSubscriptionsQueries'

export function useDeleteSubscriptionMutation(): UseMutationResult<
  void,
  unknown,
  string
> {
  const queryClient: ReturnType<typeof useQueryClient> = useQueryClient()
  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: (): void => {
      void queryClient.invalidateQueries({
        queryKey: subscriptionsQueryKeys.root,
      })
    },
  })
}
