/*
 * File: SellerCodeDeletePage.tsx
 * Purpose: Seller code delete confirmation page with navigation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
// ...existing code...
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { useDeleteSellerCodeMutation } from '../hooks/useDeleteSellerCodeMutation'
import { useSellerCodeDetailQuery } from '../hooks/useSellerCodesQueries'
import SellerCodeDeleteConfirm from '../components/SellerCodeDeleteConfirm'

export default function SellerCodeDeletePage(): ReactElement {
  const params = useParams()
  const sellerCodeId: string = params['id'] ?? ''
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const toast = useToast()
  const mutation = useDeleteSellerCodeMutation()
  const detailQuery = useSellerCodeDetailQuery(sellerCodeId)
  const sellerCodeDetail = detailQuery.data
  const isSubmitting: boolean = mutation.isPending

  function handleConfirmDelete(): void {
    if (sellerCodeDetail?.version == null) {
      toast.push(t('ui.sellerCodes.delete.error'))
      return
    }

    mutation.mutate(
      { id: sellerCodeId, version: sellerCodeDetail.version },
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
        <SellerCodeDeleteConfirm onCancel={handleCancel} onConfirm={handleConfirmDelete} isSubmitting={isSubmitting} t={t} />
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={t('ui.sellerCodes.delete.title')}
      subtitle={t('ui.sellerCodes.delete.subtitle')}
    >
      <SellerCodeDeleteConfirm onCancel={handleCancel} onConfirm={handleConfirmDelete} isSubmitting={isSubmitting} t={t} />
    </PageLayout>
  )
}
