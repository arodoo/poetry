/*
 * File: SubscriptionEditPage.tsx
 * Purpose: Edit subscription plan details page with optimistic locking.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { useSubscriptionDetailQuery } from '../hooks/useSubscriptionsQueries'
import { useUpdateSubscriptionMutation } from '../hooks/useSubscriptionsMutations'
import type { UpdateSubscriptionInput } from '../model/SubscriptionsSchemas'
import { buildSubscriptionEditBreadcrumbs } from './subscriptionBreadcrumbHelpers'

export default function SubscriptionEditPage(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const query: ReturnType<typeof useSubscriptionDetailQuery> =
    useSubscriptionDetailQuery(id ?? '')
  const mutation: ReturnType<typeof useUpdateSubscriptionMutation> =
    useUpdateSubscriptionMutation()
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const breadcrumbs = buildSubscriptionEditBreadcrumbs(locale, t, id ?? '')
  useEffect((): void => {
    if (query.data) {
      setName(query.data.name ?? '')
      setPrice(query.data.price ?? 0)
    }
  }, [query.data])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const input: UpdateSubscriptionInput = { name, price }
    mutation.mutate(
      { id: id ?? '', input },
      {
        onSuccess: (): void => {
          toast.push(t('ui.subscriptions.toast.update.success'))
          void navigate(`/${locale}/subscriptions/${id}`)
        },
        onError: (): void => {
          toast.push(t('ui.subscriptions.toast.update.error'))
        },
      }
    )
  }
  return (
    <PageLayout
      title={t('ui.subscriptions.edit.title')}
      subtitle={t('ui.subscriptions.edit.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      </form>
    </PageLayout>
  )
}
