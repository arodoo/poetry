/*
 * File: MembersList.tsx
 * Purpose: Specialized membership list with smooth transitions.
 * All Rights Reserved Arodi Emmanuel
 */
import { useState, type ReactElement } from 'react'
import { useT } from '../../../../shared/i18n/useT'
import { useUserMemberships } from '../../../memberships/hooks/useUserMemberships'
import { DataTable } from '../../../../ui/DataTable/DataTable'
import { buildMembersColumns } from './membersListColumns'
import { DataTableControls } from '../../../../ui/DataTable/DataTableControls'
import { type SortState, toSortParam } from '../../../../ui/DataTable/SortTypes'

export function MembersList({ status }: { status: string }): ReactElement {
  const t = useT()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortState>({ key: 'id', direction: 'desc' })

  const { data, isLoading, isError, isFetching } = useUserMemberships(
    status,
    page,
    pageSize,
    toSortParam(sort)
  )

  const columns = buildMembersColumns(t)

  if (isError) {
    return (
      <div className="p-4 text-center">{t('ui.adminStats.error.loading')}</div>
    )
  }

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
        keyExtractor={(row: any) => String(row.id)}
        emptyMessage={t('ui.adminStats.table.empty')}
        sort={sort}
        onSortChange={setSort}
        isLoading={isLoading}
        fetching={isFetching}
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
