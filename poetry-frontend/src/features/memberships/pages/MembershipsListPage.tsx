/*
 * File: MembershipsListPage.tsx
 * Purpose: Admin memberships index page with modern DataTable layout
 * and server-side pagination for performance with large datasets.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DataTable } from '../../../ui/DataTable/DataTable'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useMembershipsPageQuery } from '../hooks/useMembershipsQueries'
import type { MembershipResponse } from '../../../api/generated'
import { useT } from '../../../shared/i18n/useT'
import { buildMembershipsListColumns } from './membershipsListColumns'
import { buildMembershipListBreadcrumbs } from './membershipBreadcrumbHelpers'

export default function MembershipsListPage(): ReactElement {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const localeResult: ReturnType<typeof useLocale> = useLocale()
  const locale: string = localeResult.locale
  const t: ReturnType<typeof useT> = useT()
  const pageQuery: ReturnType<typeof useMembershipsPageQuery> =
    useMembershipsPageQuery(page, size, search)
  const isLoading: boolean = pageQuery.isLoading
  const isError: boolean = pageQuery.isError
  const memberships: readonly MembershipResponse[] = Array.isArray(
    pageQuery.data?.content
  )
    ? pageQuery.data.content
    : []
  const totalElements: number = pageQuery.data?.totalElements ?? 0
  const totalPages: number = pageQuery.data?.totalPages ?? 0
  const columns: readonly DataTableColumn<MembershipResponse>[] =
    buildMembershipsListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildMembershipListBreadcrumbs(locale, t)
  const actions: ReactElement = (
    <Button
      to={`/${locale}/memberships/new`}
      size="md"
      width="fixed-large"
    >
      {t('ui.memberships.actions.new')}
    </Button>
  )
  return (
    <PageLayout
      title={t('ui.memberships.list.title')}
      subtitle={t('ui.memberships.list.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {isLoading ? (
        <Text size="sm">{t('ui.memberships.status.loading')}</Text>
      ) : isError ? (
        <Text size="sm">{t('ui.memberships.status.error')}</Text>
      ) : (
        <DataTable
          columns={columns}
          data={memberships}
          keyExtractor={(row: MembershipResponse): string =>
            String(row.id ?? '')
          }
          emptyMessage={t('ui.memberships.status.empty')}
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
