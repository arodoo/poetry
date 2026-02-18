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

// i18n-ignore
export function buildMembersColumns(
  t: (key: string) => string
): DataTableColumn<MembershipDetail>[] {
  return [
    {
      key: 'fullName',
      header: t('ui.adminStats.columns.fullName'),
      width: 'lg',
      accessor: (row: any) => row.userName ?? '-',
      sortValue: (row: any) => row.userName ?? '',
    },
    {
      key: 'planName',
      header: t('ui.adminStats.columns.plan'),
      accessor: (row: any) => row.planName || '-',
      sortValue: (row: any) => row.planName ?? '',
    },
    {
      key: 'sellerName',
      header: t('ui.adminStats.columns.seller'),
      accessor: (row: any) => row.sellerName || '-',
      sortValue: (row: any) => row.sellerName ?? '',
    },
    {
      key: 'access',
      header: t('ui.adminStats.columns.access'),
      accessor: (row: any) => 
        row.allZones 
          ? t('ui.adminStats.access.allZones') 
          : `${row.zoneCount || 0} ${t('ui.adminStats.access.zones')}`,
    },
    {
      key: 'dates',
      header: t('ui.adminStats.table.dates'),
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
      sortValue: (row: any) => row.startDate ?? '',
    },
  ]
}
