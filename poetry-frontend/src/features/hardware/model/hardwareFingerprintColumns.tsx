/*
 * File: hardwareFingerprintColumns.tsx
 * Purpose: Separation of column definition for hardware fingerprint table.
 * Adheres to 120L file rules.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Badge } from '../../../ui/Badge/Badge'
import { HardwareFingerprintActions } from '../components/HardwareFingerprintActions'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { formatDate } from '../../../shared/utils/dateUtils'
import type { MergedFingerprint } from '../components/HardwareFingerprintTableShell'

export function buildHardwareFingerprintColumns(
  t: (k: string) => string
): DataTableColumn<MergedFingerprint>[] {
  return [
    {
      key: 'user',
      header: t('ui.hardware.fingerprints.table.user'),
      width: 'lg',
      accessor: (row: MergedFingerprint): string => row.username,
      sortValue: (row: MergedFingerprint): string => row.username,
    },
    {
      key: 'status',
      header: t('ui.hardware.fingerprints.table.status'),
      width: 'sm',
      filterLabel: t('ui.table.filter.status'),
      accessor: (row: MergedFingerprint): ReactElement => {
        const statusStr = row.status.toLowerCase()
        return (
          <Badge
            tone={statusStr === 'active' ? 'success' : 'neutral'}
            size="sm"
          >
            {row.status}
          </Badge>
        )
      },
      filterOptions: [
        { value: 'active', label: t('ui.users.status.active') || 'Active' },
        {
          value: 'archived',
          label: t('ui.users.status.archived') || 'Archived',
        },
      ],
    },
    {
      key: 'enrolled',
      header: t('ui.hardware.fingerprints.table.enrolled'),
      width: 'md',
      accessor: (row: MergedFingerprint): string => formatDate(row.enrolledAt),
      sortValue: (row: MergedFingerprint): string => row.enrolledAt,
    },
    {
      key: 'actions',
      header: t('ui.hardware.fingerprints.table.actions'),
      width: 'sm',
      accessor: (row: MergedFingerprint): ReactElement => (
        <HardwareFingerprintActions row={row} t={t} />
      ),
    },
  ]
}
