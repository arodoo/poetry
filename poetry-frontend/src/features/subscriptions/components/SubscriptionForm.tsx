/*
 * File: SubscriptionForm.tsx
 * Purpose: Presentational subscription form used by create and edit pages.
 * Keeps markup small and reusable while preserving behavior and accessibility.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import SubscriptionFormFields from './SubscriptionFormFields'
import SubscriptionFormFooter from './SubscriptionFormFooter'

interface Props {
  t: (k: string) => string
  name: string
  setName: (v: string) => void
  description: string
  setDescription: (v: string) => void
  price: number
  setPrice: (v: number) => void
  currency: string
  setCurrency: (v: string) => void
  durationDays: number
  setDurationDays: (v: number) => void
  status: 'active' | 'inactive'
  setStatus: (v: 'active' | 'inactive') => void
  isPending: boolean
  onCancel: () => void
  submitLabel: string
}

export default function SubscriptionForm({
  t,
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
  isPending,
  onCancel,
  submitLabel,
}: Props): ReactElement {
  return (
    <div>
      <SubscriptionFormFields
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
      />
      <SubscriptionFormFooter
        t={t}
        isPending={isPending}
        onCancel={onCancel}
        submitLabel={submitLabel}
      />
    </div>
  )
}
