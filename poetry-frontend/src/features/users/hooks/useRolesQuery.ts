/*
 * File: useRolesQuery.ts
 * Purpose: React Query hook to fetch available system roles.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchRoles } from '../api/rolesApi'
import type { RoleDto } from '../../../api/generated'

export function useRolesQuery(): UseQueryResult<readonly RoleDto[]> {
  return useQuery<readonly RoleDto[]>({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 1000 * 60 * 10,
  })
}
