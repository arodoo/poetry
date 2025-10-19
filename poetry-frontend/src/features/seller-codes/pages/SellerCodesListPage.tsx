/*
 * File: SellerCodesListPage.tsx
 * Purpose: Admin seller codes index page with modern DataTable layout
 * and server-side pagination for performance with large datasets.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState } from 'react'
// ...existing imports...
import SellerCodesListActions from '../components/SellerCodesListActions'
import { Text } from '../../../ui/Text/Text'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DataTable } from '../../../ui/DataTable/DataTable'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useSellerCodesPageQuery } from '../hooks/useSellerCodesQueries'
import type { SellerCodeResponse } from '../../../api/generated'
import { useT } from '../../../shared/i18n/useT'
import { buildSellerCodesListColumns } from './sellerCodesListColumns'
import { buildSellerCodeListBreadcrumbs } from './sellerCodeBreadcrumbHelpers'

export default function SellerCodesListPage(): ReactElement {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const localeResult: ReturnType<typeof useLocale> = useLocale()
  const locale: string = localeResult.locale
  const t: ReturnType<typeof useT> = useT()
  const pageQuery: ReturnType<typeof useSellerCodesPageQuery> =
    useSellerCodesPageQuery(page, size, search)
  const isLoading: boolean = pageQuery.isLoading
  const isError: boolean = pageQuery.isError
  const sellerCodes: readonly SellerCodeResponse[] = Array.isArray(
    pageQuery.data?.content
  )
    ? pageQuery.data.content
    : []
  const totalElements: number = pageQuery.data?.totalElements ?? 0
  const totalPages: number = pageQuery.data?.totalPages ?? 0
  const columns: readonly DataTableColumn<SellerCodeResponse>[] =
    buildSellerCodesListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildSellerCodeListBreadcrumbs(locale, t)
  const actions: ReactElement = <SellerCodesListActions />
  return (
    <PageLayout
      title={t('ui.sellerCodes.list.title')}
      subtitle={t('ui.sellerCodes.list.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {isLoading ? (
        <Text size="sm">{t('ui.sellerCodes.status.loading')}</Text>
      ) : isError ? (
        <Text size="sm">{t('ui.sellerCodes.status.error')}</Text>
      ) : (
        <DataTable
          columns={columns}
          data={sellerCodes}
          keyExtractor={(row: SellerCodeResponse): string =>
            String(row.id ?? '')
          }
          emptyMessage={t('ui.sellerCodes.status.empty')}
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
