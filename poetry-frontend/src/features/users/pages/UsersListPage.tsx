/*
 * File: UsersListPage.tsx
 * Purpose: Admin users index page with DataTable,
 * server-side sort, status/role filters.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState } from 'react'
import { UsersListTopActions } from '../components/list/UsersListTopActions'
import { Text } from '../../../ui/Text/Text'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DataTable } from '../../../ui/DataTable/DataTable'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useUsersPageQuery } from '../hooks/useUsersQueries'
import type { UserResponse } from '../../../api/generated'
import { useT } from '../../../shared/i18n/useT'
import { buildUsersListColumns } from '../model/usersListColumns'
import { buildUserListBreadcrumbs } from '../model/userBreadcrumbHelpers'
import type { SortState } from '../../../ui/DataTable/SortTypes'
import { toSortParam } from '../../../ui/DataTable/SortTypes'
import type { ActiveFilters } from '../../../ui/DataTable/FilterTypes'
import { applyFilters } from '../../../ui/DataTable/FilterTypes'
import { DataTableControls } from '../../../ui/DataTable/DataTableControls'

export default function UsersListPage(): ReactElement {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<SortState>(
    { key: 'id', direction: 'desc' }
  )
  const [activeFilters, setFilters] =
    useState<ActiveFilters>({})
  const localeResult = useLocale()
  const locale: string = localeResult.locale
  const t = useT()
  const pageQuery = useUsersPageQuery(
    page,
    size,
    search,
    toSortParam(sort)
  )
  const isInitialLoad: boolean =
    pageQuery.isLoading && !pageQuery.data
  const isError: boolean = pageQuery.isError
  const rawUsers: readonly UserResponse[] =
    Array.isArray(pageQuery.data?.content)
      ? pageQuery.data.content
      : []
  const users: readonly UserResponse[] =
    applyFilters(rawUsers, activeFilters)
  const totalElements: number = pageQuery.data?.totalElements ?? 0
  const totalPages: number = pageQuery.data?.totalPages ?? 0
  const columns: readonly DataTableColumn<UserResponse>[] =
    buildUsersListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildUserListBreadcrumbs(locale, t)
  const actions: ReactElement =
    <UsersListTopActions locale={locale} t={t} />

  const onFilterChange = (
    key: string,
    value: string
  ): void => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const tableControls = (
    <DataTableControls
      search={{
        value: search,
        onSearchChange: setSearch,
      }}
      columns={columns}
      activeFilters={activeFilters}
      onFilterChange={onFilterChange}
      sort={sort}
      onSortChange={setSort}
    />
  )

  return (
    <PageLayout
      title={t('ui.users.list.title')}
      subtitle={t('ui.users.list.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="mb-4 flex gap-4">
        {tableControls}
      </div>

      {isInitialLoad ? (
        <Text size="sm">{t('ui.users.status.loading')}</Text>
      ) : isError ? (
        <Text size="sm">{t('ui.users.status.error')}</Text>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          keyExtractor={
            (row: UserResponse): string =>
              String(row.id ?? '')
          }
          emptyMessage={t('ui.users.status.empty')}
          sort={sort}
          onSortChange={setSort}
          pagination={{
            currentPage: page,
            pageSize: size,
            totalElements,
            totalPages,
            onPageChange: setPage,
            onPageSizeChange: setSize,
          }}
        />
      )}
    </PageLayout>
  )
}
