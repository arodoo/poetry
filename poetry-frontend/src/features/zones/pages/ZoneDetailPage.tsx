
/*
 * File: ZoneDetailPage.tsx
 * Purpose: Displays detailed information about a zone, with edit and delete actions. Uses a DetailView layout and breadcrumb navigation for user orientation. Designed for extensibility and integration with admin features.
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
import { useZoneDetailQuery } from '../hooks/useZonesQueries'
import type { ZoneDetail } from '../model/ZonesSchemas'
import { useT } from '../../../shared/i18n/useT'
import { buildZoneDetailSections } from './zoneDetailHelpers'
import { buildZoneDetailBreadcrumbs } from './zoneBreadcrumbHelpers'

export default function ZoneDetailPage(): ReactElement {
  const params = useParams()
  const zoneId: string = params['id'] ?? ''
  const t = useT()
  const { locale } = useLocale()
  const detailQuery = useZoneDetailQuery(zoneId)
  const { data, isLoading, isError } = detailQuery
  const zone: ZoneDetail | undefined = data
  const sections: readonly DetailViewSection[] = zone
    ? buildZoneDetailSections(zone, t)
    : []
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildZoneDetailBreadcrumbs(locale, t)
  const actions: ReactElement = (
    <Inline gap="sm">
      <Button
        to={`/${locale}/zones/edit/${zoneId}`}
        size="sm"
        width="fixed-small"
        data-testid="edit-zone-button"
      >
        {t('ui.zones.actions.edit')}
      </Button>
      <Button
        to={`/${locale}/zones/${zoneId}/delete`}
        size="sm"
        width="fixed-small"
        variant="danger"
        data-testid="delete-zone-button"
      >
        {t('ui.zones.actions.delete')}
      </Button>
    </Inline>
  )
  return (
    <PageLayout
      title={t('ui.zones.detail.title')}
      subtitle={t('ui.zones.detail.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div data-testid="zone-detail-content">
        {isLoading ? (
          <Text size="sm">{t('ui.zones.status.loading')}</Text>
        ) : isError || !zone ? (
          <Text size="sm">{t('ui.zones.status.error')}</Text>
        ) : (
          <DetailView sections={sections} actions={actions} />
        )}
      </div>
    </PageLayout>
  )
}
