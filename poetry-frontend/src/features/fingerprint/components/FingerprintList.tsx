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

export function FingerprintList(): ReactElement {
  const t = useT()
  const [search, setSearch] = useState('')
  const [activeFilters, setFilters] = useState<ActiveFilters>({})

  const { data, isLoading, isError } = useFingerprintsListQuery()
  const rawFingerprints = data ?? []
  const fingerprints = applyFilters(rawFingerprints, activeFilters)

  const columns: DataTableColumn<FingerprintResponse>[] = [
    {
      key: 'id',
      header: 'ID',
      accessor: (item: FingerprintResponse) => String(item.id ?? '-'),
    },
    {
      key: 'userId',
      header: t('ui.fingerprints.columns.userId'),
      accessor: (item: FingerprintResponse) => String(item.userId ?? '-'),
    },
    {
      key: 'status',
      header: t('ui.fingerprints.columns.status'),
      accessor: (item: FingerprintResponse) => item.status ?? '-',
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
        />
      </div>
      <DataTable
        columns={columns}
        data={fingerprints}
        keyExtractor={(item) => String(item.id ?? Math.random())}
        emptyMessage={t('ui.fingerprints.list.empty')}
      />
    </>
  )
}
