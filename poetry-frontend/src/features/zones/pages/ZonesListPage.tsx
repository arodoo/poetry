/*
 * File: ZonesListPage.tsx
 * Purpose: Page for listing all zones, with DataTable, pagination, search, and actions for viewing, editing, and creating zones. Follows the seller codes list pattern with locale-aware routing and UI components. Built for scalability and admin usability.
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

export default function ZonesListPage(): ReactElement {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const localeResult = useLocale()
  const locale: string = localeResult.locale
  const t = useT()
  const pageQuery = useZonesPageQuery(page, size, search)
  const isLoading: boolean = pageQuery.isLoading
  const isError: boolean = pageQuery.isError
  const zones: readonly ZoneResponse[] = Array.isArray(pageQuery.data?.content)
    ? pageQuery.data.content
    : []
  const totalElements: number = pageQuery.data?.totalElements ?? 0
  const totalPages: number = pageQuery.data?.totalPages ?? 0
  const columns: readonly DataTableColumn<ZoneResponse>[] =
    buildZonesListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] = buildZoneListBreadcrumbs(
    locale,
    t
  )
  const actions: ReactElement = <ZonesListTopActions locale={locale} t={t} />
  return (
    <PageLayout
      title={t('ui.zones.list.title')}
      subtitle={t('ui.zones.list.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {isLoading ? (
        <Text size="sm">{t('ui.zones.status.loading')}</Text>
      ) : isError ? (
        <Text size="sm">{t('ui.zones.status.error')}</Text>
      ) : (
        <DataTable
          columns={columns}
          data={zones}
          keyExtractor={(row: ZoneResponse): string => String(row.id ?? '')}
          emptyMessage={t('ui.zones.status.empty')}
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
