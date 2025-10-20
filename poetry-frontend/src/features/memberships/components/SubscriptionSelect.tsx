/*
 * File: SubscriptionSelect.tsx
 * Purpose: Extracted subscription select field from MembershipFormFields.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Select } from '../../../ui/Select/Select'
import type { SubscriptionResponse } from '../../../api/generated'

interface Props {
  subscriptions: readonly SubscriptionResponse[]
  value: number
  onChange: (id: number) => void
  t: (key: string) => string
}

export default function SubscriptionSelect({
  subscriptions,
  value,
  onChange,
  t,
}: Props): ReactElement {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {t('ui.memberships.form.subscription.label')}
      </label>
      <Select
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value))
        }}
      >
        {subscriptions.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </Select>
    </div>
  )
}
