/*
 * File: subscriptionsQueries.ts
 * Purpose: Query operations using generated SDK for subscriptions feature.
 * Returns generated SubscriptionResponse types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  listSubscriptions as listSubscriptionsSdk,
  listSubscriptionsPaged as listSubscriptionsPagedSdk,
  getSubscriptionById as getSubscriptionByIdSdk,
  type SubscriptionResponse,
  type PageResponseDtoSubscriptionResponse,
} from '../../../api/generated'

export async function fetchSubscriptionsList(): Promise<
  SubscriptionResponse[]
> {
  const response = await listSubscriptionsSdk()
  if (!response.data) return []
  return response.data as unknown as SubscriptionResponse[]
}

export async function fetchSubscriptionsPage(
  page: number,
  size: number,
  search?: string
): Promise<PageResponseDtoSubscriptionResponse> {
  const response = await listSubscriptionsPagedSdk({
    query: {
      page,
      size,
      ...(search ? { search } : {}),
    },
  })
  if (!response.data) {
    throw new Error('Failed to fetch subscriptions page')
  }
  return response.data
}

export async function fetchSubscriptionById(
  id: string
): Promise<SubscriptionResponse> {
  const response = await getSubscriptionByIdSdk({
    path: { id: Number(id) },
  })
  if (!response.data) {
    throw new Error(`Subscription ${id} not found`)
  }
  return response.data
}
