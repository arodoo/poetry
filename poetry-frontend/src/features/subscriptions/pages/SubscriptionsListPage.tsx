/*
 * File: SubscriptionsListPage.tsx
 * Purpose: Subscription plans index page with DataTable layout and
 * server-side pagination for performance with large datasets.
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
import { buildSubscriptionsListColumns } from './subscriptionsListColumns'
import { buildSubscriptionListBreadcrumbs } from './subscriptionBreadcrumbHelpers'

export default function SubscriptionsListPage(): ReactElement {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const localeResult: ReturnType<typeof useLocale> = useLocale()
  const locale: string = localeResult.locale
  const t: ReturnType<typeof useT> = useT()
  const pageQuery: ReturnType<typeof useSubscriptionsPageQuery> =
    useSubscriptionsPageQuery(page, size, search)
  const isLoading: boolean = pageQuery.isLoading
  const isError: boolean = pageQuery.isError
  const subscriptions: readonly SubscriptionResponse[] = Array.isArray(
    pageQuery.data?.content
  )
    ? pageQuery.data.content
    : []
  const totalElements: number = pageQuery.data?.totalElements ?? 0
  const totalPages: number = pageQuery.data?.totalPages ?? 0
  const columns: readonly DataTableColumn<SubscriptionResponse>[] =
    buildSubscriptionsListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildSubscriptionListBreadcrumbs(locale, t)
  const actions: ReactElement = (
    <Button to={`/${locale}/subscriptions/new`} size="md" width="fixed-large">
      {t('ui.subscriptions.actions.new')}
    </Button>
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
      {isLoading ? (
        <div>{t('ui.subscriptions.status.loading')}</div>
      ) : isError ? (
        <div>{t('ui.subscriptions.status.error')}</div>
      ) : (
        <DataTable
          columns={columns}
          data={subscriptions}
          keyExtractor={(row: SubscriptionResponse): string =>
            String(row.id ?? '')
          }
          emptyMessage={t('ui.subscriptions.status.empty')}
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
