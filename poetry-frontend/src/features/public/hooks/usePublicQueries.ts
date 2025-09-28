/*
 * File: usePublicQueries.ts
 * Purpose: React Query hooks exposing public landing read models.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchPublicLandingContent } from '../api/publicApi'
import { type PublicLandingContent } from '../model/PublicSchemas'

export const publicQueryKeys: {
  readonly root: readonly ['public']
  landing(): readonly ['public', 'landing']
} = {
  root: ['public'],
  landing(): readonly ['public', 'landing'] {
    return ['public', 'landing'] as const
  },
}

export function usePublicLandingQuery(): UseQueryResult<PublicLandingContent> {
  return useQuery({
    queryKey: publicQueryKeys.landing(),
    queryFn: fetchPublicLandingContent,
    staleTime: 1000 * 60 * 5,
  })
}
