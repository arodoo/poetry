/*
 * File: SellerCodesListPage.tsx
 * Purpose: Seller codes page with DataTable,
 * server-side sort, and status filter.
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
import { buildSellerCodesListColumns } from '../model/sellerCodesListColumns'
import { buildSellerCodeListBreadcrumbs } from '../model/sellerCodeBreadcrumbHelpers'
import type { SortState } from '../../../ui/DataTable/SortTypes'
import { toSortParam } from '../../../ui/DataTable/SortTypes'
import type { ActiveFilters } from '../../../ui/DataTable/FilterTypes'
import { applyFilters } from '../../../ui/DataTable/FilterTypes'
import { DataTableControls } from '../../../ui/DataTable/DataTableControls'

export default function SellerCodesListPage(): ReactElement {
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
    useSellerCodesPageQuery(
      page, size, search, toSortParam(sort)
    )
  const isError: boolean = pageQuery.isError
  const rawCodes: readonly SellerCodeResponse[] =
    Array.isArray(pageQuery.data?.content)
      ? pageQuery.data.content
      : []
  const sellerCodes: readonly SellerCodeResponse[] =
    applyFilters(rawCodes, activeFilters)
  const totalElements: number = pageQuery.data?.totalElements ?? 0
  const totalPages: number = pageQuery.data?.totalPages ?? 0
  const columns: readonly DataTableColumn<SellerCodeResponse>[] =
    buildSellerCodesListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildSellerCodeListBreadcrumbs(locale, t)
  const actions: ReactElement =
    <SellerCodesListActions />
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
      title={t('ui.sellerCodes.list.title')}
      subtitle={t('ui.sellerCodes.list.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="mb-4 flex gap-4">{tableControls}</div>

      {isError ? (
        <Text size="sm">{t('ui.sellerCodes.status.error')}</Text>
      ) : (
        <DataTable
          columns={columns}
          data={sellerCodes}
          keyExtractor={
            (row: SellerCodeResponse): string =>
              String(row.id ?? '')
          }
          emptyMessage={t('ui.sellerCodes.status.empty')}
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
