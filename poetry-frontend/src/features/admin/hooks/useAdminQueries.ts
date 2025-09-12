/*
 * File: useAdminQueries.ts
 * Purpose: React Query hooks for the admin feature. Exposes a typed
 * echo query to keep structure consistent while endpoints are added.
 * All Rights Reserved. Arodi Emmanuel TODO
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { adminEcho } from '../api/adminApi'
import type { AdminEcho } from '../model/AdminSchemas'

export const adminQueryKeys: {
  echo: (message: string) => readonly ['admin', 'echo', string]
} = {
  echo: (m: string): readonly ['admin', 'echo', string] =>
    ['admin', 'echo', m] as const,
}

export function useAdminEcho(message: string): UseQueryResult<AdminEcho> {
  return useQuery({
    queryKey: adminQueryKeys.echo(message),
    queryFn: (): Promise<AdminEcho> => adminEcho(message),
  })
}
