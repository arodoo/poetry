/*
 * File: SellerCodeDetailPage.tsx
 * Purpose: Admin seller code detail page with DetailView layout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { Inline } from '../../../ui/Inline/Inline'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DetailView } from '../../../ui/DetailView/DetailView'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useSellerCodeDetailQuery } from '../hooks/useSellerCodesQueries'
import type { SellerCodeDetail } from '../model/SellerCodesSchemas'
import { useT } from '../../../shared/i18n/useT'
import { buildSellerCodeDetailSections } from './sellerCodeDetailHelpers'
import { buildSellerCodeDetailBreadcrumbs } from './sellerCodeBreadcrumbHelpers'

export default function SellerCodeDetailPage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const sellerCodeId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: { locale: string } = useLocale()
  const detailQuery: ReturnType<typeof useSellerCodeDetailQuery> =
    useSellerCodeDetailQuery(sellerCodeId)
  const { data, isLoading, isError } = detailQuery
  const sellerCode: SellerCodeDetail | undefined = data
  const sections: readonly DetailViewSection[] = sellerCode
    ? buildSellerCodeDetailSections(sellerCode, t)
    : []
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildSellerCodeDetailBreadcrumbs(locale, t)
  const actions: ReactElement = (
    <Inline gap="sm">
      <Button
        to={`/${locale}/seller-codes/edit/${sellerCodeId}`}
        size="sm"
        width="fixed-small"
        data-testid="edit-seller-code-button"
      >
        {t('ui.sellerCodes.actions.edit')}
      </Button>
      <Button
        to={`/${locale}/seller-codes/${sellerCodeId}/delete`}
        size="sm"
        width="fixed-small"
        variant="danger"
        data-testid="delete-seller-code-button"
      >
        {t('ui.sellerCodes.actions.delete')}
      </Button>
    </Inline>
  )
  return (
    <PageLayout
      title={t('ui.sellerCodes.detail.title')}
      subtitle={t('ui.sellerCodes.detail.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div data-testid="seller-code-detail-content">
        {isLoading ? (
          <Text size="sm">{t('ui.sellerCodes.status.loading')}</Text>
        ) : isError || !sellerCode ? (
          <Text size="sm">{t('ui.sellerCodes.status.error')}</Text>
        ) : (
          <DetailView sections={sections} actions={actions} />
        )}
      </div>
    </PageLayout>
  )
}
