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
// UI components moved to SubscriptionForm
import { useCreateSubscriptionMutation } from '../hooks/useSubscriptionsMutations'
import type { CreateSubscriptionInput } from '../model/SubscriptionsSchemas'
import { buildSubscriptionCreateBreadcrumbs } from '../model/subscriptionBreadcrumbHelpers'
import SubscriptionForm from '../components/form/SubscriptionForm'

export default function SubscriptionsCreatePage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const mutation: ReturnType<typeof useCreateSubscriptionMutation> =
    useCreateSubscriptionMutation()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [currency, setCurrency] = useState<string>('USD')
  const [durationDays, setDurationDays] = useState<number>(30)
  const [status, setStatus] = useState<'active' | 'inactive'>('active')
  const breadcrumbs = buildSubscriptionCreateBreadcrumbs(locale, t)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const input: CreateSubscriptionInput = {
      name,
      description,
      price,
      currency,
      durationDays,
      status,
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
      <form onSubmit={handleSubmit} noValidate>
        <SubscriptionForm
          t={t}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          currency={currency}
          setCurrency={setCurrency}
          durationDays={durationDays}
          setDurationDays={setDurationDays}
          status={status}
          setStatus={setStatus}
          isPending={mutation.isPending}
          onCancel={() => void navigate(`/${locale}/subscriptions`)}
          submitLabel={t('ui.subscriptions.actions.submit')}
        />
      </form>
    </PageLayout>
  )
}
