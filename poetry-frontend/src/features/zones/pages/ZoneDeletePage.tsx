/*
 * File: ZoneDeletePage.tsx
 * Purpose: Zone delete confirmation page with cancel and confirm actions. Shows warning messages and handles soft delete mutation for zones. Ensures user safety and provides feedback during the deletion process.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'
import { Card } from '../../../ui/Card/Card'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Heading } from '../../../ui/Heading/Heading'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { useDeleteZoneMutation } from '../hooks/useZonesMutations'
import { useZoneDetailQuery } from '../hooks/useZonesQueries'

export default function ZoneDeletePage(): ReactElement {
  const params = useParams()
  const zoneId: string = params['id'] ?? ''
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const toast = useToast()
  const mutation = useDeleteZoneMutation()
  const { data: zoneDetail } = useZoneDetailQuery(zoneId)
  const isSubmitting: boolean = mutation.isPending

  function handleConfirmDelete(): void {
    // Accept either missing detail or missing version. Use == null to cover both
    // prefer optional chaining for clarity
    if (zoneDetail?.version == null) {
      toast.push(t('ui.zones.toast.delete.error'))
      return
    }

    mutation.mutate(
      {
        id: zoneId,
        version: zoneDetail.version,
      },
      {
        onSuccess: (): void => {
          toast.push(t('ui.zones.toast.delete.success'))
          void navigate(`/${locale}/zones`)
        },
        onError: (): void => {
          toast.push(t('ui.zones.toast.delete.error'))
        },
      }
    )
  }

  function handleCancel(): void {
    void navigate(`/${locale}/zones/${zoneId}`)
  }

  return (
    <PageLayout
      title={t('ui.zones.delete.title')}
      subtitle={t('ui.zones.delete.subtitle')}
    >
      <Card padding="lg" shadow={true}>
        <Stack gap="md">
          <Heading level={2} size="md">
            {t('ui.zones.delete.form.title')}
          </Heading>
          <Text size="sm" className="text-[var(--color-textMuted)]">
            {t('ui.zones.delete.form.subtitle')}
          </Text>
          <Text size="sm" className="text-error-600 font-medium">
            {t('ui.zones.delete.form.warning')}
          </Text>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCancel}
              data-testid="cancel-delete-zone-button"
            >
              {t('ui.zones.actions.cancel')}
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
              data-testid="confirm-delete-zone-button"
            >
              {t('ui.zones.actions.confirmDelete')}
            </Button>
          </div>
        </Stack>
      </Card>
    </PageLayout>
  )
}
