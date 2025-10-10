/*
 * ZoneEditPage.tsx
 * Zone edit page with FormLayout pre-populated from API data
 * using zone detail query. Handles update mutation with version
 * for optimistic locking and navigation after success.
 * © 2025 Poetry Platform. All rights reserved.
 */

import type { ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../ui/FormLayout/FormLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { useZonesFormState } from '../components/useZonesFormState'
import { useZoneDetailQuery } from '../hooks/useZonesQueries'
import { useUpdateZoneMutation } from '../hooks/useZonesMutations'
import { buildEditFormSections } from './zoneFormSections'
import { buildZoneEditBreadcrumbs } from './zoneBreadcrumbHelpers'
import { buildZoneEditSubmitHandler } from './zoneEditHandlers'

export default function ZoneEditPage(): ReactElement {
  const params = useParams()
  const zoneId: string = params['id'] ?? ''
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const toast = useToast()
  const detailQuery = useZoneDetailQuery(zoneId)
  const mutation = useUpdateZoneMutation()
  const zone = detailQuery.data
  const formState = useZonesFormState(
    zone
      ? {
          name: zone.name ?? '',
          description: zone.description ?? '',
          managerId: zone.managerId ? String(zone.managerId) : '',
          status: (zone.status as 'active' | 'inactive') ?? 'active',
        }
      : undefined
  )
  const breadcrumbs = buildZoneEditBreadcrumbs(zoneId, locale, t)
  const handleSubmit = buildZoneEditSubmitHandler(
    zone,
    formState,
    zoneId,
    mutation,
    navigate,
    locale,
    t,
    toast
  )

  if (detailQuery.isLoading) {
    return (
      <PageLayout
        title={t('ui.zones.edit.title')}
        subtitle={t('ui.zones.edit.subtitle')}
      >
        <Text>{t('ui.zones.status.loading')}</Text>
      </PageLayout>
    )
  }

  if (detailQuery.isError || !zone) {
    return (
      <PageLayout
        title={t('ui.zones.edit.title')}
        subtitle={t('ui.zones.edit.subtitle')}
      >
        <Text>{t('ui.zones.status.error')}</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={t('ui.zones.edit.title')}
      subtitle={t('ui.zones.edit.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <FormLayout
        sections={buildEditFormSections(formState, t)}
        onSubmit={handleSubmit}
        submitLabel={t('ui.zones.actions.save')}
        cancelLabel={t('ui.zones.actions.cancel')}
        onCancel={() => navigate(`/${locale}/zones`)}
        isSubmitting={mutation.isPending}
      />
    </PageLayout>
  )
}
