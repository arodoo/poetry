/*
 * File: SubscriptionEditFormView.tsx
 * Purpose: Presentational view for the subscription edit form. Separated from
 * the container to keep the container file under the max-lines limit while
 * preserving identical runtime behavior.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import SubscriptionForm from './form/SubscriptionForm'
// No direct model imports here; this is a small presentational view

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
  // Accept the narrower setter signature used by the form state
  setStatus: (v: 'active' | 'inactive') => void
  isPending: boolean
  onCancel: () => void
  submitLabel: string
}

export default function SubscriptionEditFormView(props: Props): ReactElement {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      noValidate
    >
      <SubscriptionForm
        t={props.t}
        name={props.name}
        setName={props.setName}
        description={props.description}
        setDescription={props.setDescription}
        price={props.price}
        setPrice={props.setPrice}
        currency={props.currency}
        setCurrency={props.setCurrency}
        durationDays={props.durationDays}
        setDurationDays={props.setDurationDays}
        status={props.status}
        setStatus={props.setStatus}
        isPending={props.isPending}
        onCancel={props.onCancel}
        submitLabel={props.submitLabel}
      />
    </form>
  )
}
