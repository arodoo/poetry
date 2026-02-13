/*
 * File: MembersList.tsx
 * Purpose: Specialized membership list component for the admin dashboard. 
 * Facilitates monitoring of member statuses (active, expiring, expired) with 
 * integrated search and server-side pagination for large volumes of data.
 * All Rights Reserved Arodi Emmanuel
 */
import { useState, type ReactElement } from 'react'
import { useT } from '../../../../shared/i18n/useT'
import { useUserMemberships } from '../../../memberships/hooks/useUserMemberships'
import { DataTable } from '../../../../ui/DataTable/DataTable'
import { buildMembersColumns } from './membersListColumns'
import { DataTableControls } from '../../../../ui/DataTable/DataTableControls'

export function MembersList({ status }: { status: string }): ReactElement {
  const t = useT()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [search, setSearch] = useState('')
  const { data, isLoading, isError } = useUserMemberships(
    status,
    page,
    pageSize
  )

  const columns = buildMembersColumns(t)

  if (isLoading)
    return (
      <div className="p-4 text-center text-[var(--color-textMuted)]">
        {t('ui.adminStats.error.loading')}...
      </div>
    )
  if (isError)
    return (
      <div className="p-4 text-center text-[var(--color-error)]">
        {t('ui.adminStats.error.loading')}
      </div>
    )

  return (
    <div className="space-y-4">
      <DataTableControls
        search={{
          value: search,
          onSearchChange: setSearch,
          placeholder: t('ui.common.search'),
        }}
        columns={columns}
      />
      <DataTable
        columns={columns}
        data={data?.content ?? []}
        keyExtractor={(row) => String(row.id)}
        pagination={{
          currentPage: page,
          pageSize,
          totalElements: data?.totalElements ?? 0,
          totalPages: data?.totalPages ?? 0,
          onPageChange: setPage,
          onPageSizeChange: setPageSize,
        }}
      />
    </div>
  )
}
