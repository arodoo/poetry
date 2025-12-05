/*
 * File: SubscriptionFormFields.tsx
 * Purpose: Presentational fields for the subscription form (name, description,
 * price, currency, duration and status). Extracted to reduce file length.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Card } from '../../../../ui/Card/Card'
import SubscriptionNameField from '../fields/SubscriptionNameField'
import SubscriptionDescriptionField from '../fields/SubscriptionDescriptionField'
import SubscriptionPriceField from '../fields/SubscriptionPriceField'
import SubscriptionCurrencyField from '../fields/SubscriptionCurrencyField'
import SubscriptionDurationField from '../fields/SubscriptionDurationField'
import SubscriptionStatusField from '../fields/SubscriptionStatusField'

interface FieldsProps {
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
}

export default function SubscriptionFormFields(
  props: FieldsProps
): ReactElement {
  const {
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
  } = props
  return (
    <Card padding="lg" shadow={true}>
      <SubscriptionNameField t={t} name={name} setName={setName} />
      <SubscriptionDescriptionField
        description={description}
        setDescription={setDescription}
      />
      <SubscriptionPriceField t={t} price={price} setPrice={setPrice} />
      <SubscriptionCurrencyField
        currency={currency}
        setCurrency={setCurrency}
      />
      <SubscriptionDurationField
        t={t}
        durationDays={durationDays}
        setDurationDays={setDurationDays}
      />
      <SubscriptionStatusField t={t} status={status} setStatus={setStatus} />
    </Card>
  )
}
