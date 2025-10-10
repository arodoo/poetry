/*
 * File: SubscriptionDeletePage.tsx
 * Purpose: Confirmation page for deleting subscriptions.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Button } from '../../../ui/Button/Button'
import { Inline } from '../../../ui/Inline/Inline'
import { useSubscriptionDetailQuery } from '../hooks/useSubscriptionsQueries'
import { useDeleteSubscriptionMutation } from '../hooks/useSubscriptionsMutations'

export default function SubscriptionDeletePage(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const query: ReturnType<typeof useSubscriptionDetailQuery> =
    useSubscriptionDetailQuery(id ?? '')
  const mutation: ReturnType<typeof useDeleteSubscriptionMutation> =
    useDeleteSubscriptionMutation()
  const subscription = query.data
  const handleDelete = (): void => {
    if (!id) return
    mutation.mutate(id, {
      onSuccess: (): void => {
        toast.push(t('ui.subscriptions.toast.delete.success'))
        void navigate(`/${locale}/subscriptions`)
      },
      onError: (): void => {
        toast.push(t('ui.subscriptions.toast.delete.error'))
      },
    })
  }
  const handleCancel = (): void => {
    void navigate(`/${locale}/subscriptions/${id}`)
  }
  return (
    <PageLayout
      title={t('ui.subscriptions.delete.title')}
      subtitle={t('ui.subscriptions.delete.subtitle')}
    >
      <div className="space-y-4">
        <p>
          {t('ui.subscriptions.delete.confirm')} <strong>{subscription?.name}</strong>?
        </p>
        <Inline gap="sm">
          <Button 
            onClick={handleCancel} 
            size="sm"
            variant="secondary"
            data-testid="cancel-delete-subscription-button"
          >
            {t('ui.subscriptions.actions.cancel')}
          </Button>
          <Button 
            onClick={handleDelete} 
            size="sm"
            variant="danger"
            data-testid="confirm-delete-subscription-button"
          >
            {t('ui.subscriptions.actions.confirmDelete')}
          </Button>
        </Inline>
      </div>
    </PageLayout>
  )
}
