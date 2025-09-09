/*
 File: useTokensQueries.ts
 Purpose: React Query hooks for reading tokens bundle and exposing helpers
 to select current theme and scales. Keeps query keys centralized.
 All Rights Reserved. Arodi Emmanuel
*/
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getTokens } from '../api/tokensApi'
import { type TokenBundle } from '../model/TokensSchemas'

export const tokensQueryKeys: { all: readonly ['tokens'] } = {
  all: ['tokens'],
}

export function useTokensQuery(): UseQueryResult<{
  bundle: TokenBundle
  etag: string | null
}> {
  return useQuery({
    queryKey: tokensQueryKeys.all,
    queryFn: getTokens,
    staleTime: 1000 * 60 * 60, // 1h; server controls with ETag/304
  })
}
