/*
 * File: useSellerCodesQueries.ts
 * Purpose: React Query hooks for seller codes read operations.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokenStorage'
import {
  fetchSellerCodeById,
  fetchSellerCodesList,
} from '../api/seller-codesApi'
import type {
  SellerCodeDetail,
  SellerCodesCollection,
} from '../model/SellerCodesSchemas'

interface SellerCodesQueryKeys {
  readonly root: readonly ['sellerCodes']
  list(): readonly ['sellerCodes', 'list']
  detail(id: string): readonly ['sellerCodes', 'detail', string]
}

export const sellerCodesQueryKeys: SellerCodesQueryKeys = {
  root: ['sellerCodes'] as const,
  list(): readonly ['sellerCodes', 'list'] {
    return ['sellerCodes', 'list'] as const
  },
  detail(id: string): readonly ['sellerCodes', 'detail', string] {
    return ['sellerCodes', 'detail', id] as const
  },
} as const

type SColl = SellerCodesCollection
type SDetail = SellerCodeDetail

export function useSellerCodesListQuery(): UseQueryResult<SColl> {
  const hasAccessToken: boolean = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: sellerCodesQueryKeys.list(),
    queryFn: fetchSellerCodesList,
    enabled: hasAccessToken,
    staleTime: 1000 * 30,
  })
}

export function useSellerCodeDetailQuery(id: string): UseQueryResult<SDetail> {
  const hasAccessToken: boolean = Boolean(tokenStorage.load()?.accessToken)
  return useQuery({
    queryKey: sellerCodesQueryKeys.detail(id),
    queryFn: (): Promise<SellerCodeDetail> => fetchSellerCodeById(id),
    enabled: hasAccessToken && id.length > 0,
    staleTime: 1000 * 30,
  })
}
