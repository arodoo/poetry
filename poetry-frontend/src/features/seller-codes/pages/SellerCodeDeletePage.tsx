/*
 * File: SellerCodeDeletePage.tsx
 * Purpose: Seller code delete confirmation page with navigation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { useDeleteSellerCodeMutation } from '../hooks/useDeleteSellerCodeMutation'
import { useSellerCodeDetailQuery } from '../hooks/useSellerCodesQueries'

export default function SellerCodeDeletePage(): ReactElement {
  const params = useParams()
  const sellerCodeId: string = params['id'] ?? ''
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const toast = useToast()
  const mutation = useDeleteSellerCodeMutation()
  const detailQuery = useSellerCodeDetailQuery(sellerCodeId)
  const isSubmitting: boolean = mutation.isPending

  function handleConfirmDelete(): void {
    mutation.mutate(
      { id: sellerCodeId, input: {} },
      {
        onSuccess: (): void => {
          toast.push(t('ui.sellerCodes.delete.success'))
          void navigate(`/${locale}/seller-codes`)
        },
        onError: (): void => {
          toast.push(t('ui.sellerCodes.delete.error'))
        },
      }
    )
  }

  function handleCancel(): void {
    void navigate(`/${locale}/seller-codes/${sellerCodeId}`)
  }

  if (detailQuery.isLoading) {
    return (
      <PageLayout
        title={t('ui.sellerCodes.delete.title')}
        subtitle={t('ui.sellerCodes.delete.subtitle')}
      >
        <Text>{t('ui.sellerCodes.status.loading')}</Text>
      </PageLayout>
    )
  }

  if (detailQuery.isError) {
    return (
      <PageLayout
        title={t('ui.sellerCodes.delete.title')}
        subtitle={t('ui.sellerCodes.delete.subtitle')}
      >
        <Stack gap="lg">
          <Text size="lg" weight="bold">
            {t('ui.sellerCodes.delete.form.title')}
          </Text>
          <Text size="sm" className="text-error-600">
            {t('ui.sellerCodes.delete.form.warning')}
          </Text>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCancel}
              data-testid="cancel-delete-seller-code-button"
            >
              {t('ui.sellerCodes.actions.cancel')}
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
              data-testid="confirm-delete-seller-code-button"
            >
              {t('ui.sellerCodes.actions.confirmDelete')}
            </Button>
          </div>
        </Stack>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={t('ui.sellerCodes.delete.title')}
      subtitle={t('ui.sellerCodes.delete.subtitle')}
    >
      <Stack gap="lg">
        <Text size="lg" weight="bold">
          {t('ui.sellerCodes.delete.form.title')}
        </Text>
        <Text size="sm" className="text-error-600">
          {t('ui.sellerCodes.delete.form.warning')}
        </Text>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCancel}
            data-testid="cancel-delete-seller-code-button"
          >
            {t('ui.sellerCodes.actions.cancel')}
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={isSubmitting}
            data-testid="confirm-delete-seller-code-button"
          >
            {t('ui.sellerCodes.actions.confirmDelete')}
          </Button>
        </div>
      </Stack>
    </PageLayout>
  )
}
