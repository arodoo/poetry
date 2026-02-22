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
import type { HardwareFingerprintsListState } from '../model/hardwareFingerprintTypes'

export function useHardwareFingerprintsListState(
  data: MergedFingerprint[]
): HardwareFingerprintsListState {
  const listState = useListPageState()
  const [sort, setSort] = useState<SortState>({ key: 'enrolled', direction: 'desc' })
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({})

  const onFilterChange = (key: string, value: string): void => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }))
    listState.setPage(0)
  }

  const processedData = useMemo((): MergedFingerprint[] => {
    let res = applyFilters(data as unknown as Record<string, unknown>[], activeFilters) as unknown as MergedFingerprint[]
    if (listState.search) {
      const q = listState.search.toLowerCase()
      res = res.filter(v => v.username.toLowerCase().includes(q) || String(v.id).includes(q))
    }
    if (sort.direction) {
      const dir = sort.direction === 'asc' ? 1 : -1
      res = [...res].sort((a, b) => {
        const k = sort.key as keyof MergedFingerprint
        const aVal = String(a[k]), bVal = String(b[k])
        return aVal < bVal ? -dir : aVal > bVal ? dir : 0
      })
    }
    return res
  }, [data, activeFilters, listState.search, sort])

  const totalElements = processedData.length
  const totalPages = Math.ceil(totalElements / listState.size)
  const paginatedData = processedData.slice(
    listState.page * listState.size,
    (listState.page + 1) * listState.size
  )

  return { ...listState, sort, setSort, activeFilters, onFilterChange, paginatedData, totalElements, totalPages }
}

