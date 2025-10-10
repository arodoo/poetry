/*
 * File: useCreateSubscriptionMutation.ts
 * Purpose: Mutation hook for creating subscriptions.
 * Uses generated SubscriptionResponse type (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { createSubscription } from '../api/subscriptionsApi'
import type { CreateSubscriptionInput } from '../model/SubscriptionsSchemas'
import type { SubscriptionResponse } from '../../../api/generated'
import { useSubscriptionsMutationSuccess } from './useSubscriptionsMutationHelpers'

export function useCreateSubscriptionMutation(): UseMutationResult<
  SubscriptionResponse,
  unknown,
  CreateSubscriptionInput
> {
  const onSuccess: (detail: SubscriptionResponse) => void =
    useSubscriptionsMutationSuccess()
  return useMutation({
    mutationFn: createSubscription,
    onSuccess,
  })
}
