/*
 * File: SubscriptionEditForm.tsx
 * Purpose: Encapsulate subscription edit form state and submit logic so the page
 * remains concise. Behavior preserved.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import SubscriptionForm from './SubscriptionForm'
import { useSubscriptionDetailQuery } from '../hooks/useSubscriptionsQueries'
import { useUpdateSubscriptionMutation } from '../hooks/useSubscriptionsMutations'
import type { UpdateSubscriptionInput } from '../model/SubscriptionsSchemas'
import { toTemplateString } from '../../../shared/utils/templateSafe'

interface Props { id: string | undefined }
export default function SubscriptionEditForm({ id }: Props): ReactElement {
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const toast = useToast()
  const query = useSubscriptionDetailQuery(id ?? '')
  const mutation = useUpdateSubscriptionMutation()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [currency, setCurrency] = useState<string>('USD')
  const [durationDays, setDurationDays] = useState<number>(30)
  const [status, setStatus] = useState<'active' | 'inactive'>('active')

  useEffect((): void => {
    if (query.data) {
      setName(query.data.name ?? '')
      setDescription(query.data.description ?? '')
      setPrice(query.data.price ?? 0)
      setCurrency(query.data.currency ?? 'USD')
      setDurationDays(query.data.durationDays ?? 30)
      const s = query.data.status as 'active' | 'inactive' | undefined
      setStatus(s ?? 'active')
    }
  }, [query.data])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const input: UpdateSubscriptionInput = {
      name,
      description,
      price,
      currency,
      durationDays,
      status,
    }
    mutation.mutate(
      { id: id ?? '', input },
      {
        onSuccess: (): void => {
          toast.push(t('ui.subscriptions.toast.update.success'))
          void navigate(`/${locale}/subscriptions/${toTemplateString(id)}`)
        },
        onError: (): void => {
          toast.push(t('ui.subscriptions.toast.update.error'))
        },
      }
    )
  }

  return (
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
        isPending={mutation.isPending} onCancel={() => void navigate(`/${locale}/subscriptions/${toTemplateString(id)}`)} submitLabel={t('ui.subscriptions.actions.save')}
      />
    </form>
  )
}
