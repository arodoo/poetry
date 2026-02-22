/*
 * File: useHardwareFingerprintsListState.ts
 * Purpose: Local filtering, sorting, and pagination logic for hardware fingerprints.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useMemo } from 'react'
import { useListPageState } from '../../../shared/hooks/useListPageState'
import type { ActiveFilters } from '../../../ui/DataTable/FilterTypes'
import { applyFilters } from '../../../ui/DataTable/FilterTypes'
import type { SortState } from '../../../ui/DataTable/SortTypes'
import type { MergedFingerprint } from '../components/HardwareFingerprintTableShell'

export function useHardwareFingerprintsListState(data: MergedFingerprint[]) {
  const listState = useListPageState()
  const [sort, setSort] = useState<SortState>({
    key: 'enrolled',
    direction: 'desc',
  })
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({})

  const onFilterChange = (key: string, value: string): void => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }))
    listState.setPage(0)
  }

  const processedData = useMemo(() => {
    let result = applyFilters(
      data as unknown as Record<string, unknown>[],
      activeFilters
    ) as unknown as MergedFingerprint[]

    if (listState.search) {
      const q = listState.search.toLowerCase()
      result = result.filter(
        (fp) =>
          fp.username.toLowerCase().includes(q) || String(fp.id).includes(q)
      )
    }

    if (sort.direction) {
      const dir = sort.direction === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        let aVal = ''
        let bVal = ''
        if (sort.key === 'user') {
          aVal = a.username
          bVal = b.username
        } else if (sort.key === 'enrolled') {
          aVal = a.enrolledAt
          bVal = b.enrolledAt
        } else if (sort.key === 'status') {
          aVal = a.status
          bVal = b.status
        }
        if (aVal < bVal) return -dir
        if (aVal > bVal) return dir
        return 0
      })
    }
    return result
  }, [data, activeFilters, listState.search, sort])

  const totalElements = processedData.length
  const totalPages = Math.ceil(totalElements / listState.size)
  const paginatedData = processedData.slice(
    listState.page * listState.size,
    (listState.page + 1) * listState.size
  )

  return {
    ...listState,
    sort,
    setSort,
    activeFilters,
    onFilterChange,
    paginatedData,
    totalElements,
    totalPages,
  }
}
