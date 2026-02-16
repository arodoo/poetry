/*
 * File: FingerprintColumns.tsx
 * Purpose: Column definitions for FingerprintList DataTable.
 * All Rights Reserved Arodi Emmanuel
 */
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { FingerprintResponse } from '../model/FingerprintSchemas'

export function buildFingerprintColumns(
  t: (key: string) => string
): DataTableColumn<FingerprintResponse>[] {
  return [
    {
      key: 'id',
      header: 'ID',
      accessor: (item) => String(item.id ?? '-'),
      sortValue: (item) => item.id ?? 0,
    },
    {
      key: 'userId',
      header: t('ui.fingerprints.columns.userId'),
      accessor: (item) => String(item.userId ?? '-'),
      sortValue: (item) => item.userId ?? 0,
    },
    {
      key: 'status',
      header: t('ui.fingerprints.columns.status'),
      accessor: (item) => item.status ?? '-',
      sortValue: (item) => item.status ?? '',
      filterOptions: [
        { value: 'enrolled', label: t('ui.fingerprints.status.enrolled') },
        { value: 'revoked', label: t('ui.fingerprints.status.revoked') },
      ],
    },
    {
      key: 'enrolledAt',
      header: t('ui.fingerprints.columns.enrolledAt'),
      accessor: (item) =>
        item.enrolledAt ? new Date(item.enrolledAt).toLocaleString() : '-',
      sortValue: (item) =>
        item.enrolledAt ? new Date(item.enrolledAt).getTime() : 0,
    },
  ]
}
