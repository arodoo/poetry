/*
 * File: UsersListPage.tsx
 * Purpose: Admin users index page with modern DataTable layout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DataTable } from '../../../ui/DataTable/DataTable'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useUsersListQuery } from '../hooks/useUsersQueries'
import type { UserSummary } from '../model/UsersSchemas'
import { useT } from '../../../shared/i18n/useT'
import { buildUsersListColumns } from './usersListColumns'
import { buildUserListBreadcrumbs } from './userBreadcrumbHelpers'

export default function UsersListPage(): ReactElement {
  const localeResult: ReturnType<typeof useLocale> = useLocale()
  const locale: string = localeResult.locale
  const t: ReturnType<typeof useT> = useT()
  const listQuery: ReturnType<typeof useUsersListQuery> = useUsersListQuery()
  const isLoading: boolean = listQuery.isLoading
  const isError: boolean = listQuery.isError
  const users: readonly UserSummary[] = Array.isArray(listQuery.data)
    ? (listQuery.data as readonly UserSummary[])
    : []
  const columns: readonly DataTableColumn<UserSummary>[] =
    buildUsersListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] = buildUserListBreadcrumbs(
    locale,
    t
  )
  const actions: ReactElement = (
    <Button to={`/${locale}/users/new`} size="md" width="fixed-large">
      {t('ui.users.actions.new')}
    </Button>
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
      {isLoading ? (
        <Text size="sm">{t('ui.users.status.loading')}</Text>
      ) : isError ? (
        <Text size="sm">{t('ui.users.status.error')}</Text>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          keyExtractor={(row: UserSummary): string => row.id}
          emptyMessage={t('ui.users.status.empty')}
        />
      )}
    </PageLayout>
  )
}
