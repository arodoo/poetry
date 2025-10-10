/*
 * File: useMembershipsQueries.ts
 * Purpose: React Query hooks for memberships read operations
 * Uses generated MembershipResponse types (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokenStorage'
import {
  fetchMembershipById,
  fetchMembershipsList,
  fetchMembershipsPage,
} from '../api/membershipsApi'
import type {
  MembershipResponse,
  PageResponseDtoMembershipResponse,
} from '../../../api/generated'

export const membershipsQueryKeys: {
  readonly root: readonly ['memberships']
  list(): readonly ['memberships', 'list']
  page(
    pageNum: number,
    pageSize: number,
    search?: string
  ): readonly [
    'memberships',
    'page',
    number,
    number,
    string | undefined,
  ]
  detail(id: string): readonly ['memberships', 'detail', string]
} = {
  root: ['memberships'],
  list(): readonly ['memberships', 'list'] {
    return ['memberships', 'list'] as const
  },
  page(
    pageNum: number,
    pageSize: number,
    search?: string
  ): readonly [
    'memberships',
    'page',
    number,
    number,
    string | undefined,
  ] {
    return ['memberships', 'page', pageNum, pageSize, search] as const
  },
  detail(id: string): readonly ['memberships', 'detail', string] {
    return ['memberships', 'detail', id] as const
  },
}

export function useMembershipsListQuery(): UseQueryResult<
  MembershipResponse[]
> {
  const hasAccessToken: boolean = Boolean(
    tokenStorage.load()?.accessToken
  )
  return useQuery({
    queryKey: membershipsQueryKeys.list(),
    queryFn: fetchMembershipsList,
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useMembershipsPageQuery(
  page: number,
  pageSize: number,
  search?: string
): UseQueryResult<PageResponseDtoMembershipResponse> {
  const hasAccessToken: boolean = Boolean(
    tokenStorage.load()?.accessToken
  )
  return useQuery({
    queryKey: membershipsQueryKeys.page(page, pageSize, search),
    queryFn: () => fetchMembershipsPage(page, pageSize, search),
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useMembershipDetailQuery(
  id: string
): UseQueryResult<MembershipResponse> {
  const hasAccessToken: boolean = Boolean(
    tokenStorage.load()?.accessToken
  )
  return useQuery({
    queryKey: membershipsQueryKeys.detail(id),
    queryFn: () => fetchMembershipById(id),
    enabled: hasAccessToken && Boolean(id),
    staleTime: 1000 * 30,
  })
}
