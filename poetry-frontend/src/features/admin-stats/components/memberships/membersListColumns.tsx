/*
 * File: membersListColumns.tsx
 * Purpose: Column definitions for the memberships DataTable used specifically in the admin stats dashboard. 
 * Centralizes rendering logic for member profiles, statuses, dates, and plans to maintain component modularity.
 * All Rights Reserved Arodi Emmanuel
 */
// i18n-ignore
import type { DataTableColumn } from '../../../../ui/DataTable/DataTable'
import type { MembershipDetail } from '../../../../api/generated'
import { MemberStatusBadge } from './MemberStatusBadge'

// i18n-ignore
export function buildMembersColumns(
  t: (key: string) => string
): DataTableColumn<MembershipDetail>[] {
  return [
    {
      key: 'user',
      header: t('ui.adminStats.table.member'),
      accessor: (row) => (
        <div>
          <div className="font-medium text-[var(--color-text)]">
            {row.userName}
          </div>
          <div className="text-[var(--color-textMuted)]">{row.userEmail}</div>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('ui.adminStats.table.status'),
      accessor: (row) => (
        <MemberStatusBadge status={row.status} endDate={row.endDate} />
      ),
    },
    {
      key: 'dates',
      header: t('ui.adminStats.table.dates'),
      accessor: (row) => (
        <div className="text-[var(--color-textMuted)]">
          <div>
            {t('ui.adminStats.table.start')}:{' '}
            {row.startDate ? new Date(row.startDate).toLocaleDateString() : '-'}
          </div>
          <div>
            {t('ui.adminStats.table.end')}:{' '}
            {row.endDate ? new Date(row.endDate).toLocaleDateString() : '-'}
          </div>
        </div>
      ),
    },
    {
      key: 'plan',
      header: t('ui.adminStats.table.plan'),
      accessor: (row) => (
        <span className="text-[var(--color-textMuted)]">{row.planName}</span>
      ),
    },
  ]
}
