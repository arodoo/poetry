/*
 * File: MembersList.tsx
 * Purpose: Table component displaying members filtered by status.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import { useT } from '../../../../shared/i18n/useT'
import { useUserMemberships } from '../../../memberships/hooks/useUserMemberships'
import { type MembershipDetail } from '../../../../api/generated'
import { MemberStatusBadge } from './MemberStatusBadge'
import { DataTable, type DataTableColumn } from '../../../../ui/DataTable/DataTable'

interface MembersListProps {
  status: string
}

export function MembersList({ status }: MembersListProps) {
  const t = useT()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const { data, isLoading, isError } = useUserMemberships(status, page, pageSize)

  const columns: DataTableColumn<MembershipDetail>[] = [
    {
      key: 'user',
      header: t('ui.adminStats.table.member'),
      accessor: (row) => (
        <div>
          <div className="font-medium text-[var(--color-text)]">{row.userName}</div>
          <div className="text-[var(--color-textMuted)]">{row.userEmail}</div>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('ui.adminStats.table.status'),
      accessor: (row) => <MemberStatusBadge status={row.status} endDate={row.endDate} />,
    },
    {
      key: 'dates',
      header: t('ui.adminStats.table.dates'),
      accessor: (row) => (
        <div className="text-[var(--color-textMuted)]">
          <div>Start: {row.startDate ? new Date(row.startDate).toLocaleDateString() : '-'}</div>
          <div>End: {row.endDate ? new Date(row.endDate).toLocaleDateString() : '-'}</div>
        </div>
      ),
    },
    {
      key: 'plan',
      header: t('ui.adminStats.table.plan'),
      accessor: (row) => <span className="text-[var(--color-textMuted)]">{row.planName}</span>,
    },
  ]

  if (isLoading) {
    return <div className="p-4 text-center text-[var(--color-textMuted)]">{t('ui.adminStats.error.loading')}...</div>
  }

  if (isError) {
    return <div className="p-4 text-center text-[var(--color-error)]">{t('ui.adminStats.error.loading')}</div>
  }

  return (
    <DataTable
      columns={columns}
      data={data?.content || []}
      keyExtractor={(row) => String(row.id)}
      pagination={{
        currentPage: page,
        pageSize: pageSize,
        totalElements: data?.totalElements || 0,
        totalPages: data?.totalPages || 0,
        onPageChange: setPage,
        onPageSizeChange: setPageSize,
      }}
      search={{
        value: '',
        onSearchChange: () => {},
        placeholder: 'Search...',
      }}
    />
  )
}
