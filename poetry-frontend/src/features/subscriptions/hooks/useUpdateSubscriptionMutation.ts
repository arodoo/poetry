/*
 * File: useUpdateSubscriptionMutation.ts
 * Purpose: Mutation hook for updating subscription fields.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { updateSubscription } from '../api/subscriptionsApi'
import type { UpdateSubscriptionInput } from '../model/SubscriptionsSchemas'
import type { SubscriptionResponse } from '../../../api/generated'
import {
  type MutationVariables,
  useSubscriptionsEntityMutation,
} from './useSubscriptionsMutationHelpers'

export function useUpdateSubscriptionMutation(): UseMutationResult<
  SubscriptionResponse,
  unknown,
  MutationVariables<UpdateSubscriptionInput>
> {
  return useSubscriptionsEntityMutation(updateSubscription)
}
