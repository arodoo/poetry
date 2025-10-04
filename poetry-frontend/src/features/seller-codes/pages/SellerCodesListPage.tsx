/*
 * File: SellerCodesListPage.tsx
 * Purpose: Admin seller codes index page with modern DataTable layout.
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
import { useSellerCodesListQuery } from '../hooks/useSellerCodesQueries'
import type { SellerCodeSummary } from '../model/SellerCodesSchemas'
import { useT } from '../../../shared/i18n/useT'
import { buildSellerCodesListColumns } from './sellerCodesListColumns'
import { buildSellerCodeListBreadcrumbs } from './sellerCodeBreadcrumbHelpers'

export default function SellerCodesListPage(): ReactElement {
  const localeResult: ReturnType<typeof useLocale> = useLocale()
  const locale: string = localeResult.locale
  const t: ReturnType<typeof useT> = useT()
  const listQuery: ReturnType<typeof useSellerCodesListQuery> =
    useSellerCodesListQuery()
  const isLoading: boolean = listQuery.isLoading
  const isError: boolean = listQuery.isError
  const sellerCodes: readonly SellerCodeSummary[] = Array.isArray(
    listQuery.data
  )
    ? (listQuery.data as readonly SellerCodeSummary[])
    : []
  const columns: readonly DataTableColumn<SellerCodeSummary>[] =
    buildSellerCodesListColumns(locale, t)
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildSellerCodeListBreadcrumbs(locale, t)
  const actions: ReactElement = (
    <Button
      to={`/${locale}/seller-codes/new`}
      size="md"
      width="fixed-large"
      data-testid="create-seller-code-button"
    >
      {t('ui.sellerCodes.actions.new')}
    </Button>
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
      {isLoading ? (
        <Text size="sm">{t('ui.sellerCodes.status.loading')}</Text>
      ) : isError ? (
        <Text size="sm">{t('ui.sellerCodes.status.error')}</Text>
      ) : (
        <DataTable
          columns={columns}
          data={sellerCodes}
          keyExtractor={(row: SellerCodeSummary): string => String(row.id)}
          emptyMessage={t('ui.sellerCodes.status.empty')}
        />
      )}
    </PageLayout>
  )
}
