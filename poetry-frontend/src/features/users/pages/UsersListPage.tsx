/*
 * File: UsersListPage.tsx
 * Purpose: Admin users index page with modern DataTable layout and
 * server-side pagination for performance with large datasets.
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
import { buildUsersListColumns } from './usersListColumns'
import { buildUserListBreadcrumbs } from './userBreadcrumbHelpers'

export default function UsersListPage(): ReactElement {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const localeResult: ReturnType<typeof useLocale> = useLocale()
  const locale: string = localeResult.locale
  const t: ReturnType<typeof useT> = useT()
  const pageQuery: ReturnType<typeof useUsersPageQuery> = useUsersPageQuery(
    page,
    size,
    search
  )
  const isLoading: boolean = pageQuery.isLoading
  const isError: boolean = pageQuery.isError
  const users: readonly UserResponse[] = Array.isArray(pageQuery.data?.content)
    ? pageQuery.data.content
    : []
  const totalElements: number = pageQuery.data?.totalElements ?? 0
  const totalPages: number = pageQuery.data?.totalPages ?? 0
  const columns: readonly DataTableColumn<UserResponse>[] =
    buildUsersListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] = buildUserListBreadcrumbs(
    locale,
    t
  )
  const actions: ReactElement = <UsersListTopActions locale={locale} t={t} />
  return (
    <PageLayout
      title={t('ui.users.list.title')}
      subtitle={t('ui.users.list.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {isLoading ? (
        <Text size="sm">{t('ui.users.status.loading')}</Text>
      ) : isError ? (
        <Text size="sm">{t('ui.users.status.error')}</Text>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          keyExtractor={(row: UserResponse): string => String(row.id ?? '')}
          emptyMessage={t('ui.users.status.empty')}
          search={{
            value: search,
            onSearchChange: setSearch,
          }}
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
