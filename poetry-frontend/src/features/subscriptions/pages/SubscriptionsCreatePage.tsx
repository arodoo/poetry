/*
 * File: SubscriptionsCreatePage.tsx
 * Purpose: Create new subscription plan page with form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { useCreateSubscriptionMutation } from '../hooks/useSubscriptionsMutations'
import type { CreateSubscriptionInput } from '../model/SubscriptionsSchemas'
import { buildSubscriptionCreateBreadcrumbs } from './subscriptionBreadcrumbHelpers'

export default function SubscriptionsCreatePage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const mutation: ReturnType<typeof useCreateSubscriptionMutation> =
    useCreateSubscriptionMutation()
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [currency, setCurrency] = useState<string>('USD')
  const [durationDays, setDurationDays] = useState<number>(30)
  const breadcrumbs = buildSubscriptionCreateBreadcrumbs(locale, t)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const input: CreateSubscriptionInput = {
      name,
      price,
      currency,
      durationDays,
      status: 'active',
    }
    mutation.mutate(input, {
      onSuccess: (): void => {
        toast.push(t('ui.subscriptions.toast.create.success'))
        void navigate(`/${locale}/subscriptions`)
      },
      onError: (): void => {
        toast.push(t('ui.subscriptions.toast.create.error'))
      },
    })
  }
  return (
    <PageLayout
      title={t('ui.subscriptions.create.title')}
      subtitle={t('ui.subscriptions.create.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      </form>
    </PageLayout>
  )
}
