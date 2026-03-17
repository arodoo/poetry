/*
 * File: useAutoBackupsQuery.ts
 * Purpose: React Query hook for fetching paginated auto backups.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchJson } from '../../../shared/http/fetchClient'
import type { AutoBackupRow } from '../model/autoBackupColumns'

interface PageResult<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

export function useAutoBackupsQuery(
  page: number,
  size: number,
  search: string,
  sort: string | undefined
): UseQueryResult<PageResult<AutoBackupRow>> {
  return useQuery({
    queryKey: ['autoBackups', page, size, search, sort],
    queryFn: async (): Promise<PageResult<AutoBackupRow>> => {
      const params = new URLSearchParams({
        page: String(page),
        size: String(size),
        search,
        sort: sort ?? 'generatedAt,desc',
      })
      return fetchJson<PageResult<AutoBackupRow>>(
        `/api/v1/db-management/backup/auto/list?${params}`
      )
    },
  })
}
