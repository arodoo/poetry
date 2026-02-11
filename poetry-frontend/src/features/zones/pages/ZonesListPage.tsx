/*
 * File: ZonesListPage.tsx
 * Purpose: Zones index page with DataTable,
 * server-side sort, and status filter.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState, type ReactElement } from 'react'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useT } from '../../../shared/i18n/useT'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DataTable } from '../../../ui/DataTable/DataTable'
import { ZonesListTopActions } from '../components/ZonesListTopActions'
import { Text } from '../../../ui/Text/Text'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { useZonesPageQuery } from '../hooks/useZonesQueries'
import { buildZonesListColumns } from '../model/zonesListColumns'
import { buildZoneListBreadcrumbs } from '../model/zoneBreadcrumbHelpers'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { ZoneResponse } from '../model/ZonesSchemas'
import type { SortState } from '../../../ui/DataTable/SortTypes'
import { toSortParam } from '../../../ui/DataTable/SortTypes'
import type { FilterDef, ActiveFilters } from '../../../ui/DataTable/FilterTypes'
import { applyFilters } from '../../../ui/DataTable/FilterTypes'
import { buildZoneFilters } from '../model/zonesFilterDefs'

export default function ZonesListPage(): ReactElement {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<SortState>(
    { key: '', direction: null }
  )
  const [activeFilters, setFilters] =
    useState<ActiveFilters>({})
  const localeResult = useLocale()
  const locale: string = localeResult.locale
  const t = useT()
  const pageQuery = useZonesPageQuery(
    page, size, search, toSortParam(sort)
  )
  const isInitialLoad: boolean =
    pageQuery.isLoading && !pageQuery.data
  const isError: boolean = pageQuery.isError
  const rawZones: readonly ZoneResponse[] =
    Array.isArray(pageQuery.data?.content)
      ? pageQuery.data.content
      : []
  const zones: readonly ZoneResponse[] =
    applyFilters(rawZones, activeFilters)
  const totalElements: number = pageQuery.data?.totalElements ?? 0
  const totalPages: number = pageQuery.data?.totalPages ?? 0
  const columns: readonly DataTableColumn<ZoneResponse>[] =
    buildZonesListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] = buildZoneListBreadcrumbs(
    locale,
    t
  )
  const actions: ReactElement =
    <ZonesListTopActions locale={locale} t={t} />
  const filters: readonly FilterDef[] =
    buildZoneFilters(t)
  const onFilterChange = (
    key: string,
    value: string
  ): void => {
    setFilters((p) => ({ ...p, [key]: value }))
  }
  return (
    <PageLayout
      title={t('ui.zones.list.title')}
      subtitle={t('ui.zones.list.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {isInitialLoad ? (
        <Text size="sm">{t('ui.zones.status.loading')}</Text>
      ) : isError ? (
        <Text size="sm">{t('ui.zones.status.error')}</Text>
      ) : (
        <DataTable
          columns={columns}
          data={zones}
          keyExtractor={
            (row: ZoneResponse): string =>
              String(row.id ?? '')
          }
          emptyMessage={t('ui.zones.status.empty')}
          search={{
            value: search,
            onSearchChange: setSearch,
          }}
          sort={sort}
          onSortChange={setSort}
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
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
