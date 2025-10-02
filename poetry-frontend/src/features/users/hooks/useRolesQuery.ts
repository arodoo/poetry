/*
 * File: useRolesQuery.ts
 * Purpose: React Query hook to fetch available system roles.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchRoles, type Role } from '../api/rolesApi'

export function useRolesQuery(): UseQueryResult<readonly Role[]> {
  return useQuery({
    queryKey: ['roles'],
    queryFn: (): Promise<readonly Role[]> => fetchRoles(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
  })
}
