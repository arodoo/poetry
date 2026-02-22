/*
 * File: FingerprintColumns.tsx
 * Purpose: Column definitions for FingerprintList DataTable.
 * All Rights Reserved Arodi Emmanuel
 */
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { FingerprintResponse } from '../model/FingerprintSchemas'
import { formatDate } from '../../../shared/utils/dateUtils'

export function buildFingerprintColumns(
  t: (key: string) => string
): DataTableColumn<FingerprintResponse>[] {
  return [
    {
      key: 'id',
      header: t('ui.fingerprints.columns.id'),
      width: 'xs',
      accessor: (item: FingerprintResponse) => String(item.id ?? '-'),
      sortValue: (item: FingerprintResponse) => item.id ?? 0,
    },
    {
      key: 'userId',
      header: t('ui.fingerprints.columns.userId'),
      width: 'sm',
      accessor: (item: FingerprintResponse) => String(item.userId ?? '-'),
      sortValue: (item: FingerprintResponse) => item.userId ?? 0,
    },
    {
      key: 'status',
      header: t('ui.fingerprints.columns.status'),
      width: 'md',
      accessor: (item: FingerprintResponse) =>
        t(
          'ui.fingerprints.status.' + (item.status?.toLowerCase() ?? 'unknown')
        ),
      sortValue: (item: FingerprintResponse) => item.status ?? '',
      filterOptions: [
        { value: 'enrolled', label: t('ui.fingerprints.status.enrolled') },
        { value: 'revoked', label: t('ui.fingerprints.status.revoked') },
      ],
    },
    {
      key: 'enrolledAt',
      header: t('ui.fingerprints.columns.enrolledAt'),
      width: 'md',
      accessor: (item: FingerprintResponse) => formatDate(item.enrolledAt),
      sortValue: (item: FingerprintResponse) =>
        item.enrolledAt ? new Date(item.enrolledAt).getTime() : 0,
    },
  ]
}
