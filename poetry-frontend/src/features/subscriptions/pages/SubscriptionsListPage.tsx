/*
 * File: SubscriptionsListPage.tsx
 * Purpose: Subscriptions page with DataTable,
 * server-side sort, and status filter.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState } from 'react'
import { Button } from '../../../ui/Button/Button'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DataTable } from '../../../ui/DataTable/DataTable'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useSubscriptionsPageQuery } from '../hooks/useSubscriptionsQueries'
import type { SubscriptionResponse } from '../../../api/generated'
import { useT } from '../../../shared/i18n/useT'
import { buildSubscriptionsListColumns } from '../model/subscriptionsListColumns'
import { buildSubscriptionListBreadcrumbs } from '../model/subscriptionBreadcrumbHelpers'
import type { SortState } from '../../../ui/DataTable/SortTypes'
import { toSortParam } from '../../../ui/DataTable/SortTypes'
import type { ActiveFilters } from '../../../ui/DataTable/FilterTypes'
import { applyFilters } from '../../../ui/DataTable/FilterTypes'
import { DataTableControls } from '../../../ui/DataTable/DataTableControls'

export default function SubscriptionsListPage(): ReactElement {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<SortState>(
    { key: 'createdAt', direction: 'desc' }
  )
  const [activeFilters, setFilters] =
    useState<ActiveFilters>({})
  const localeResult = useLocale()
  const locale: string = localeResult.locale
  const t = useT()
  const pageQuery =
    useSubscriptionsPageQuery(
      page, size, search, toSortParam(sort)
    )
  const isError: boolean = pageQuery.isError
  const rawSubs: readonly SubscriptionResponse[] =
    Array.isArray(pageQuery.data?.content)
      ? pageQuery.data.content
      : []
  const subscriptions: readonly SubscriptionResponse[] =
    applyFilters(rawSubs, activeFilters)
  const totalElements: number = pageQuery.data?.totalElements ?? 0
  const totalPages: number = pageQuery.data?.totalPages ?? 0
  const columns: readonly DataTableColumn<SubscriptionResponse>[] =
    buildSubscriptionsListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildSubscriptionListBreadcrumbs(locale, t)
  const actions: ReactElement = (
    <Button
      to={`/${locale}/subscriptions/new`}
      size="md"
      width="fixed-large"
    >
      {t('ui.subscriptions.actions.new')}
    </Button>
  )
  const onFilterChange = (
    key: string,
    value: string
  ): void => {
    setFilters((p) => ({ ...p, [key]: value }))
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
    />
  )

  return (
    <PageLayout
      title={t('ui.subscriptions.list.title')}
      subtitle={t('ui.subscriptions.list.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="mb-4 flex gap-4">{tableControls}</div>

      {isError ? (
        <div>{t('ui.subscriptions.status.error')}</div>
      ) : (
        <DataTable
          columns={columns}
          data={subscriptions}
          keyExtractor={
            (row: SubscriptionResponse): string =>
              String(row.id ?? '')
          }
          emptyMessage={t('ui.subscriptions.status.empty')}
          sort={sort}
          onSortChange={setSort}
          isLoading={pageQuery.isLoading}
          fetching={pageQuery.isFetching}
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
