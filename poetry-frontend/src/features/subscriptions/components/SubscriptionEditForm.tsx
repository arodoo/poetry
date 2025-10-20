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
import SubscriptionEditFormView from './SubscriptionEditFormView'
import { useSubscriptionDetailQuery } from '../hooks/useSubscriptionsQueries'
import { useUpdateSubscriptionMutation } from '../hooks/useSubscriptionsMutations'
// Container for subscription edit form state and wiring. No direct model imports
import { buildOnCancel } from './subscriptionEditHelpers'
import { useSubscriptionEditState } from './useSubscriptionEditState'
// submit behavior lives in helpers; view renders the form

interface Props {
  id: string | undefined
}
export default function SubscriptionEditForm({ id }: Props): ReactElement {
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  // toast handled by submit helper when invoked by parent
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
  // The submit handler behavior is executed via submitSubscriptionUpdate
  // caller in the parent container; keep the logic in helpers to stay concise.

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
      submitLabel={submitLabel}
    />
  )
}
