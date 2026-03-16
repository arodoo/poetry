/*
 * File: useTablesQuery.ts
 * Purpose: React Query hook for fetching the list of database
 * tables with row counts. Used by the Excel export section
 * to display available tables for selection.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery } from '@tanstack/react-query'
import { fetchTableList } from '../api/dbManagementApi'
import type { TableInfo } from '../model/dbManagementTypes'

export function useTablesQuery() {
  return useQuery<TableInfo[]>({
    queryKey: ['db-management', 'tables'],
    queryFn: fetchTableList,
    staleTime: 30_000,
  })
}
