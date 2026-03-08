/*
 * File: SubscriptionEditForm.tsx
 * Purpose: Encapsulate subscription edit form state and submit logic so the page
 * remains concise. Behavior preserved.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import SubscriptionEditFormView from './SubscriptionEditFormView'
import { useSubscriptionDetailQuery } from '../hooks/useSubscriptionsQueries'
import { useUpdateSubscriptionMutation } from '../hooks/useSubscriptionsMutations'
import { buildOnCancel } from './subscriptionEditHelpers'
import { useSubscriptionEditState } from './useSubscriptionEditState'
import { submitSubscriptionUpdate } from './form/subscriptionSubmitHelper'
import type { UpdateSubscriptionInput } from '../model/SubscriptionsSchemas'

interface Props {
  id: string | undefined
}
export default function SubscriptionEditForm({ id }: Props): ReactElement {
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const toast = useToast()
  const query = useSubscriptionDetailQuery(id ?? '')
  const mutation = useUpdateSubscriptionMutation()

  const {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    currency,
    setCurrency,
    durationDays,
    setDurationDays,
    status,
    setStatus,
  } = useSubscriptionEditState(query.data)

  const handleSubmit = (): void => {
    if (!id) return
    const input: UpdateSubscriptionInput = {
      name,
      description,
      price,
      currency,
      durationDays,
      status,
    }
    submitSubscriptionUpdate(
      mutation,
      id,
      input,
      () => {
        toast.push(t('ui.subscriptions.toast.update.success'))
        void navigate(`/${locale}/subscriptions/${id}`)
      },
      () => toast.push(t('ui.subscriptions.toast.update.error'))
    )
  }

  const onCancel = buildOnCancel(navigate, locale, id)

  const submitLabel = t('ui.subscriptions.actions.save')

  return (
    <SubscriptionEditFormView
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
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
    />
  )
}
