/*
 * File: useDevtoolsQueries.ts
 * Purpose: React Query hooks for devtools.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { devtoolsApi } from '../api/devtoolsApi'

export function useDevtoolsHealth(): UseQueryResult<boolean> {
  return useQuery({
    queryKey: ['devtools', 'health'],
    queryFn: () => devtoolsApi.checkHealth(),
  })
}
