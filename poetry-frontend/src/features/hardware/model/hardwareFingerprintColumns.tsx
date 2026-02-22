/*
 * File: hardwareFingerprintColumns.tsx
 * Purpose: Separation of column definition for hardware fingerprint table.
 * Adheres to 120L file rules.
 * All Rights Reserved. Arodi Emmanuel
 */

import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import { Button } from '../../../ui/Button/Button'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { formatDate } from '../../../shared/utils/dateUtils'
import type { MergedFingerprint } from '../components/HardwareFingerprintTableShell'

export function buildHardwareFingerprintColumns(
  t: (key: string) => string,
  onView: (row: MergedFingerprint) => void
): readonly DataTableColumn<MergedFingerprint>[] {
  return [
    {
      key: 'user',
      header: t('ui.hardware.fingerprints.table.user'),
      width: 'lg',
      accessor: (row) => row.username,
      sortValue: (row) => row.username,
    },
    {
      key: 'status',
      header: t('ui.hardware.fingerprints.table.status'),
      width: 'sm',
      filterLabel: t('ui.table.filter.status'),
      accessor: (row) => {
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
      accessor: (row) => formatDate(row.enrolledAt),
      sortValue: (row) => row.enrolledAt,
    },
    {
      key: 'actions',
      header: t('ui.hardware.fingerprints.table.actions'),
      width: 'sm',
      accessor: (row) => (
        <Inline gap="xs">
          <Button
            size="sm"
            width="fixed-small"
            onClick={() => { onView(row); }}
            data-testid={`view-fp-${row.id}`}
          >
            {t('ui.hardware.fingerprints.table.view')}
          </Button>
        </Inline>
      ),
    },
  ]
}
