/*
 * File: useSellerCodesQueries.ts
 * Purpose: React Query hooks for seller codes read operations.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import {
  fetchSellerCodeById,
  fetchSellerCodesList,
  fetchSellerCodesPage,
} from '../api/seller-codesApi'
import type {
  SellerCodeDetail,
  SellerCodesCollection,
} from '../model/SellerCodesSchemas'
import type { PageResponseDtoSellerCodeResponse } from '../../../api/generated'

interface SellerCodesQueryKeys {
  readonly root: readonly ['sellerCodes']
  list(): readonly ['sellerCodes', 'list']
  page(
    page: number,
    size: number,
    search?: string
  ): readonly ['sellerCodes', 'page', number, number, string | undefined]
  detail(id: string): readonly ['sellerCodes', 'detail', string]
}

export const sellerCodesQueryKeys: SellerCodesQueryKeys = {
  root: ['sellerCodes'] as const,
  list(): readonly ['sellerCodes', 'list'] {
    return ['sellerCodes', 'list'] as const
  },
  page(
    page: number,
    size: number,
    search?: string
  ): readonly ['sellerCodes', 'page', number, number, string | undefined] {
    return ['sellerCodes', 'page', page, size, search] as const
  },
  detail(id: string): readonly ['sellerCodes', 'detail', string] {
    return ['sellerCodes', 'detail', id] as const
  },
} as const

type SColl = SellerCodesCollection
type SDetail = SellerCodeDetail

export function useSellerCodesListQuery(): UseQueryResult<SColl> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: sellerCodesQueryKeys.list(),
    queryFn: fetchSellerCodesList,
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useSellerCodeDetailQuery(id: string): UseQueryResult<SDetail> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: sellerCodesQueryKeys.detail(id),
    queryFn: (): Promise<SellerCodeDetail> => fetchSellerCodeById(id),
    enabled: hasAccessToken && id.length > 0,
    staleTime: 1000 * 30,
  })
}

type PageResp = PageResponseDtoSellerCodeResponse

export function useSellerCodesPageQuery(
  page: number,
  size: number,
  search?: string
): UseQueryResult<PageResp> {
  const hasAccessToken = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: sellerCodesQueryKeys.page(page, size, search),
    queryFn: (): Promise<PageResp> => fetchSellerCodesPage(page, size, search),
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}
