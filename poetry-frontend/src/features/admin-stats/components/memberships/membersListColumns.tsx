/*
 * File: membersListColumns.tsx
 * Purpose: Column definitions for the memberships DataTable used specifically in the admin stats dashboard. 
 * Centralizes rendering logic for member profiles, statuses, dates, and plans to maintain component modularity.
 * All Rights Reserved Arodi Emmanuel
 */
// i18n-ignore
import type { DataTableColumn } from '../../../../ui/DataTable/DataTable'
import type { MembershipDetail } from '../../../../api/generated'
import { formatDate } from '../../../../shared/utils/dateUtils'
import { MemberStatusBadge } from './MemberStatusBadge'

// i18n-ignore
export function buildMembersColumns(
  t: (key: string) => string
): DataTableColumn<MembershipDetail>[] {
  return [
    {
      key: 'id',
      header: t('ui.adminStats.columns.id'),
      width: 'xs',
      accessor: (row: any) => String(row.id),
      sortValue: (row: MembershipDetail) => row.id ?? 0,
    },
    {
      key: 'membershipName',
      header: t('ui.adminStats.columns.membership'),
      width: 'sm',
      accessor: (row: any) => row.membership?.name ?? '-',
      sortValue: (row: MembershipDetail) => row.userName ?? '',
    },
    {
      key: 'status',
      header: t('ui.adminStats.columns.status'),
      width: 'sm',
      accessor: (row: any) => (
        <MemberStatusBadge status={row.status} endDate={row.endDate} />
      ),
      sortValue: (row: MembershipDetail) => row.status ?? '',
    },
    {
      key: 'dates',
      header: t('ui.adminStats.columns.dates'),
      width: 'lg',
      accessor: (row: MembershipDetail) => (
        <div className="text-[var(--color-textMuted)]">
          <div>
            {t('ui.adminStats.table.start')}: {formatDate(row.startDate)}
          </div>
          <div>
            {t('ui.adminStats.table.end')}: {formatDate(row.endDate)}
          </div>
        </div>
      ),
      sortValue: (row: MembershipDetail) => row.startDate ?? '',
    },
    {
      key: 'fullName',
      header: t('ui.adminStats.columns.fullName'),
      width: 'lg',
      accessor: (row: any) => row.user?.fullName ?? '-',
      sortValue: (row: MembershipDetail) => row.planName ?? '',
    },
  ]
}
