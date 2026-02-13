/*
 * File: FingerprintList.tsx
 * Purpose: DataTable component for displaying and managing enrolled fingerprints. 
 * Provides a comprehensive view of user IDs, enrollment status, and precise 
 * timestamps for hardware-linked credentials in the system.
 * All Rights Reserved Arodi Emmanuel
 */

import { useState, type ReactElement } from 'react'
import { DataTable } from '../../../ui/DataTable/DataTable'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { Text } from '../../../ui/Text/Text'
import { useFingerprintsListQuery } from '../hooks/useFingerprintQueries'
import type { FingerprintResponse } from '../model/FingerprintSchemas'
import { useT } from '../../../shared/i18n/useT'
import { DataTableControls } from '../../../ui/DataTable/DataTableControls'
import type { ActiveFilters } from '../../../ui/DataTable/FilterTypes'
import { applyFilters } from '../../../ui/DataTable/FilterTypes'

import { type SortState } from '../../../ui/DataTable/SortTypes'

export function FingerprintList(): ReactElement {
  const t = useT()
  const [search, setSearch] = useState('')
  const [activeFilters, setFilters] = useState<ActiveFilters>({})
  const [sort, setSort] = useState<SortState>({
    key: 'enrolledAt',
    direction: 'desc',
  })

  const { data, isLoading, isError } = useFingerprintsListQuery()
  const rawFingerprints = data ?? []
  
  const filteredFingerprints = applyFilters(rawFingerprints, activeFilters)

  const fingerprints = [...filteredFingerprints].sort((a, b) => {
    if (!sort.key || !sort.direction) return 0
    const col = columns.find((c) => c.key === sort.key)
    const valA = col?.sortValue ? col.sortValue(a) : ''
    const valB = col?.sortValue ? col.sortValue(b) : ''

    if (valA < valB) return sort.direction === 'asc' ? -1 : 1
    if (valA > valB) return sort.direction === 'asc' ? 1 : -1
    return 0
  })

  const columns: DataTableColumn<FingerprintResponse>[] = [
    {
      key: 'id',
      header: 'ID',
      accessor: (item: FingerprintResponse) => String(item.id ?? '-'),
      sortValue: (item: FingerprintResponse) => item.id ?? 0,
    },
    {
      key: 'userId',
      header: t('ui.fingerprints.columns.userId'),
      accessor: (item: FingerprintResponse) => String(item.userId ?? '-'),
      sortValue: (item: FingerprintResponse) => item.userId ?? 0,
    },
    {
      key: 'status',
      header: t('ui.fingerprints.columns.status'),
      accessor: (item: FingerprintResponse) => item.status ?? '-',
      sortValue: (item: FingerprintResponse) => item.status ?? '',
      filterOptions: [
        { value: 'enrolled', label: t('ui.fingerprints.status.enrolled') },
        { value: 'revoked', label: t('ui.fingerprints.status.revoked') },
      ],
    },
    {
      key: 'enrolledAt',
      header: t('ui.fingerprints.columns.enrolledAt'),
      accessor: (item: FingerprintResponse) =>
        item.enrolledAt ? new Date(item.enrolledAt).toLocaleString() : '-',
      sortValue: (item: FingerprintResponse) =>
        item.enrolledAt ? new Date(item.enrolledAt).getTime() : 0,
    },
  ]

  if (isLoading) {
    return <Text size="sm">{t('ui.fingerprints.status.loading')}</Text>
  }

  if (isError) {
    return <Text size="sm">{t('ui.fingerprints.status.error')}</Text>
  }

  const onFilterChange = (key: string, value: string): void => {
    setFilters((p) => ({ ...p, [key]: value }))
  }

  return (
    <>
      <div className="mb-4">
        <DataTableControls
          search={{
            value: search,
            onSearchChange: setSearch,
          }}
          columns={columns}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          sort={sort}
          onSortChange={setSort}
        />
      </div>
      <DataTable
        columns={columns}
        data={fingerprints}
        keyExtractor={(item) => String(item.id ?? Math.random())}
        emptyMessage={t('ui.fingerprints.list.empty')}
        sort={sort}
        onSortChange={setSort}
      />
    </>
  )
}
