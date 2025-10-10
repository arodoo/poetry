/*
 * File: subscriptionsMutations.ts
 * Purpose: Mutation operations using generated SDK for subscriptions.
 * Returns generated SubscriptionResponse types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  createSubscription as createSubscriptionSdk,
  updateSubscription as updateSubscriptionSdk,
  deleteSubscription as deleteSubscriptionSdk,
  type SubscriptionResponse,
} from '../../../api/generated'
import {
  CreateSubscriptionSchema,
  UpdateSubscriptionSchema,
  type CreateSubscriptionInput,
  type UpdateSubscriptionInput,
} from '../model/SubscriptionsSchemas'

export async function createSubscription(
  input: CreateSubscriptionInput
): Promise<SubscriptionResponse> {
  const validatedInput: CreateSubscriptionInput =
    CreateSubscriptionSchema.parse(input)
  if (!validatedInput.status) {
    validatedInput.status = 'active'
  }
  if (!validatedInput.currency) {
    validatedInput.currency = 'USD'
  }
  const response = await createSubscriptionSdk({ body: validatedInput })
  if (!response.data) {
    throw new Error('Failed to create subscription')
  }
  return response.data as SubscriptionResponse
}

export async function updateSubscription(
  id: string,
  input: UpdateSubscriptionInput,
  etag?: string
): Promise<SubscriptionResponse> {
  const payload: UpdateSubscriptionInput =
    UpdateSubscriptionSchema.parse(input)
  const response = await updateSubscriptionSdk({
    path: { id: Number(id) },
    body: payload,
    headers: { 'If-Match': etag || '""' },
  })
  if (!response.data) {
    throw new Error(`Failed to update subscription ${id}`)
  }
  return response.data as SubscriptionResponse
}

export async function deleteSubscription(id: string): Promise<void> {
  await deleteSubscriptionSdk({ path: { id: Number(id) } })
}
