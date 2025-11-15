/*
 * File: FingerprintList.tsx
 * Purpose: DataTable display of enrolled fingerprints.
 * Shows slot ID, user ID, status, and enrollment timestamps.
 * Handles loading and error states with user-friendly messages.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { DataTable } from '../../../ui/DataTable/DataTable'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { Text } from '../../../ui/Text/Text'
import { useFingerprintsListQuery } from '../hooks/useFingerprintQueries'
import type { FingerprintResponse } from '../model/FingerprintSchemas'
import { useT } from '../../../shared/i18n/useT'

export function FingerprintList(): ReactElement {
  const t = useT()
  const { data, isLoading, isError } = useFingerprintsListQuery()
  const fingerprints = data ?? []

  const columns: DataTableColumn<FingerprintResponse>[] = [
    {
      key: 'r503SlotId',
      header: t('ui.fingerprints.columns.slotId'),
      accessor: (item: FingerprintResponse) => String(item.r503SlotId ?? '-'),
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

  return (
    <DataTable
      columns={columns}
      data={fingerprints}
      keyExtractor={(item) => String(item.id ?? Math.random())}
      search={{
        value: '',
        onSearchChange: () => {
          // Search functionality to be implemented
        },
      }}
      emptyMessage={t('ui.fingerprints.list.empty')}
    />
  )
}
