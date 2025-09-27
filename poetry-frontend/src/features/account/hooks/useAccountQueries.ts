/*
 * File: useAccountQueries.ts
 * Purpose: React Query hooks for account read operations (locale, profile
 * snippets). Centralizes query keys so screens stay consistent.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchAccountLocale } from '../api/accountApi'
import { type AccountLocale } from '../model/AccountSchemas'

export const accountQueryKeys: {
  readonly root: readonly ['account']
  locale(): readonly ['account', 'locale']
} = {
  root: ['account'],
  locale(): readonly ['account', 'locale'] {
    return ['account', 'locale'] as const
  },
}

export function useAccountLocaleQuery(): UseQueryResult<AccountLocale> {
  return useQuery({
    queryKey: accountQueryKeys.locale(),
    queryFn: fetchAccountLocale,
    staleTime: 1000 * 60 * 5,
  })
}
