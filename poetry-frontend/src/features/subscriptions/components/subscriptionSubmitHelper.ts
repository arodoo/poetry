/*
 * File: subscriptionSubmitHelper.ts
 * Purpose: Small helper to perform the update mutation for subscriptions and
 * handle onSuccess/onError notifications. Keeps the form file concise.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UpdateSubscriptionInput } from '../model/SubscriptionsSchemas'

interface MutationLike {
  mutate: (...args: any[]) => void
  isPending?: boolean
}

export function submitSubscriptionUpdate(
  mutation: MutationLike,
  id: string,
  input: UpdateSubscriptionInput,
  onSuccessNotify: () => void,
  onErrorNotify: () => void
): void {
  mutation.mutate(
    { id, input },
    { onSuccess: onSuccessNotify, onError: onErrorNotify }
  )
}
