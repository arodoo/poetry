/*
 * File: useZonesQueries.ts
 * Purpose: React Query hooks for zones read operations.
 * Uses ZoneResponse types (matches backend DTOs).
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import { fetchZoneById, fetchZonesList, fetchZonesPage } from '../api/zonesApi'
import type {
  ZoneResponse,
  PageResponseDtoZoneResponse,
} from '../../../api/generated'

export const zonesQueryKeys: {
  readonly root: readonly ['zones']
  list(): readonly ['zones', 'list']
  page(
    pageNum: number,
    pageSize: number,
    search?: string
  ): readonly ['zones', 'page', number, number, string | undefined]
  detail(id: string): readonly ['zones', 'detail', string]
} = {
  root: ['zones'],
  list(): readonly ['zones', 'list'] {
    return ['zones', 'list'] as const
  },
  page(
    pageNum: number,
    pageSize: number,
    search?: string
  ): readonly ['zones', 'page', number, number, string | undefined] {
    return ['zones', 'page', pageNum, pageSize, search] as const
  },
  detail(id: string): readonly ['zones', 'detail', string] {
    return ['zones', 'detail', id] as const
  },
}

export function useZonesListQuery(): UseQueryResult<readonly ZoneResponse[]> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: zonesQueryKeys.list(),
    queryFn: fetchZonesList,
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useZonesPageQuery(
  page: number,
  size: number,
  search?: string
): UseQueryResult<PageResponseDtoZoneResponse> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: zonesQueryKeys.page(page, size, search),
    queryFn: (): Promise<PageResponseDtoZoneResponse> =>
      fetchZonesPage(page, size, search),
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useZoneDetailQuery(id: string): UseQueryResult<ZoneResponse> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: zonesQueryKeys.detail(id),
    queryFn: (): Promise<ZoneResponse> => fetchZoneById(id),
    enabled: hasAccessToken && id.length > 0,
    staleTime: 1000 * 30,
  })
}
