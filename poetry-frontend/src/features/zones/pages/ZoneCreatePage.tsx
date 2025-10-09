/*
 * ZonesCreatePage.tsx
 * Zone creation page with FormLayout for name description and
 * manager assignment. Handles validation submission success and
 * error toasts with navigation to list after creation.
 * © 2025 Poetry Platform. All rights reserved.
 */

import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../ui/FormLayout/FormLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { useZonesFormState } from '../components/useZonesFormState'
import { useCreateZoneMutation } from '../hooks/useZonesMutations'
import type { CreateZoneInput } from '../model/ZonesSchemas'
import { buildCreateFormSections } from './zoneFormSections'
import { buildZoneCreateBreadcrumbs } from './zoneBreadcrumbHelpers'
import {
  createZoneSubmitHandler,
  createZoneCancelHandler,
} from './zoneCreateHandlers'

export default function ZoneCreatePage(): ReactElement {
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const toast = useToast()
  const mutation = useCreateZoneMutation()
  const isSubmitting: boolean = mutation.isPending
  const formState = useZonesFormState()
  const breadcrumbs = buildZoneCreateBreadcrumbs(locale, t)
  const handleSubmit = createZoneSubmitHandler(
    formState,
    (input: CreateZoneInput): void => {
      mutation.mutate(input, {
        onSuccess: (): void => {
          toast.push(t('ui.zones.toast.create.success'))
          void navigate(`/${locale}/zones`)
        },
        onError: (): void => {
          toast.push(t('ui.zones.toast.create.error'))
        },
      })
    }
  )
  const handleCancel = createZoneCancelHandler(navigate, locale)

  return (
    <PageLayout
      title={t('ui.zones.create.title')}
      subtitle={t('ui.zones.create.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <FormLayout
        sections={buildCreateFormSections(formState, t)}
        onSubmit={handleSubmit}
        submitLabel={t('ui.zones.actions.submit')}
        cancelLabel={t('ui.zones.actions.cancel')}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </PageLayout>
  )
}
