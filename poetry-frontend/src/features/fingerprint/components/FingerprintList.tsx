/*
 * File: FingerprintList.tsx
 * Purpose: DataTable component for displaying enrolled fingerprints. 
 * All Rights Reserved Arodi Emmanuel
 */
import { useState, type ReactElement } from 'react'
import { DataTable } from '../../../ui/DataTable/DataTable'
import { Text } from '../../../ui/Text/Text'
import { useFingerprintsListQuery } from '../hooks/useFingerprintQueries'
import { useT } from '../../../shared/i18n/useT'
import { DataTableControls } from '../../../ui/DataTable/DataTableControls'
import type { ActiveFilters } from '../../../ui/DataTable/FilterTypes'
import { applyFilters } from '../../../ui/DataTable/FilterTypes'
import { type SortState } from '../../../ui/DataTable/SortTypes'
import { buildFingerprintColumns } from './FingerprintColumns'

export function FingerprintList(): ReactElement {
  const t = useT()
  const [search, setSearch] = useState('')
  const [activeFilters, setFilters] = useState<ActiveFilters>({})
  const [sort, setSort] = useState<SortState>({
    key: 'enrolledAt',
    direction: 'desc',
  })

  const { data, isLoading, isError, isFetching } = useFingerprintsListQuery()
  const rawData = data ?? []
  
  const filtered = applyFilters(rawData, activeFilters)
  const columns = buildFingerprintColumns(t)

  const sorted = [...filtered].sort((a, b) => {
    if (!sort.key || !sort.direction) return 0
    const col = columns.find((c) => c.key === sort.key)
    const valA: string | number = col?.sortValue ? col.sortValue(a) : ''
    const valB: string | number = col?.sortValue ? col.sortValue(b) : ''
    if (valA < valB) return sort.direction === 'asc' ? -1 : 1
    if (valA > valB) return sort.direction === 'asc' ? 1 : -1
    return 0
  })

  if (isLoading) {
    return <Text size="sm">{t('ui.fingerprints.status.loading')}</Text>
  }
  if (isError) {
    return <Text size="sm">{t('ui.fingerprints.status.error')}</Text>
  }

  return (
    <div className="space-y-4">
      <DataTableControls
        search={{ value: search, onSearchChange: setSearch }}
        columns={columns}
        activeFilters={activeFilters}
        onFilterChange={(k, v) => setFilters(p => ({ ...p, [k]: v }))}
      />
      <DataTable
        columns={columns}
        data={sorted}
        keyExtractor={(item) => String(item.id ?? Math.random())}
        emptyMessage={t('ui.fingerprints.list.empty')}
        sort={sort}
        onSortChange={setSort}
        fetching={isFetching}
      />
    </div>
  )
}
