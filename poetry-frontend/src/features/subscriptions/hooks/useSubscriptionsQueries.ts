/*
 * File: useSubscriptionsQueries.ts
 * Purpose: React Query hooks for subscription read operations.
 * Uses generated SubscriptionResponse types (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import {
  fetchSubscriptionById,
  fetchSubscriptionsList,
  fetchSubscriptionsPage,
} from '../api/subscriptionsApi'
import type {
  SubscriptionResponse,
  PageResponseDtoSubscriptionResponse,
} from '../../../api/generated'

export const subscriptionsQueryKeys: {
  readonly root: readonly ['subscriptions']
  list(): readonly ['subscriptions', 'list']
  page(
    pageNum: number,
    pageSize: number,
    search?: string
  ): readonly ['subscriptions', 'page', number, number, string | undefined]
  detail(id: string): readonly ['subscriptions', 'detail', string]
} = {
  root: ['subscriptions'],
  list(): readonly ['subscriptions', 'list'] {
    return ['subscriptions', 'list'] as const
  },
  page(
    pageNum: number,
    pageSize: number,
    search?: string
  ): readonly ['subscriptions', 'page', number, number, string | undefined] {
    return ['subscriptions', 'page', pageNum, pageSize, search] as const
  },
  detail(id: string): readonly ['subscriptions', 'detail', string] {
    return ['subscriptions', 'detail', id] as const
  },
}

export function useSubscriptionsListQuery(): UseQueryResult<
  SubscriptionResponse[]
> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: subscriptionsQueryKeys.list(),
    queryFn: fetchSubscriptionsList,
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useSubscriptionsPageQuery(
  page: number,
  size: number,
  search?: string
): UseQueryResult<PageResponseDtoSubscriptionResponse> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: subscriptionsQueryKeys.page(page, size, search),
    queryFn: (): Promise<PageResponseDtoSubscriptionResponse> =>
      fetchSubscriptionsPage(page, size, search),
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useSubscriptionDetailQuery(
  id: string
): UseQueryResult<SubscriptionResponse> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: subscriptionsQueryKeys.detail(id),
    queryFn: (): Promise<SubscriptionResponse> => fetchSubscriptionById(id),
    enabled: hasAccessToken && Boolean(id),
    staleTime: 1000 * 30,
  })
}
