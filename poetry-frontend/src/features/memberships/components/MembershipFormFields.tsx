/*
 * File: MembershipFormFields.tsx
 * Purpose: Reusable membership form fields component.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Input } from '../../../ui/Input/Input'
import { Select } from '../../../ui/Select/Select'
import type { UserResponse, SubscriptionResponse } from '../../../api/generated'
import type { MembershipFormValues } from './MembershipFormValues'

interface Props {
  readonly values: MembershipFormValues
  readonly users: readonly UserResponse[]
  readonly subscriptions: readonly SubscriptionResponse[]
  readonly onUserChange: (userId: number) => void
  readonly onSubscriptionChange: (subscriptionId: number) => void
  readonly onSellerCodeChange: (code: string) => void
  readonly onStatusChange: (status: 'active' | 'inactive') => void
  readonly t: (key: string) => string
}

export function MembershipFormFields({ values, users, subscriptions, onUserChange, onSubscriptionChange, onSellerCodeChange, onStatusChange, t }: Props): ReactElement {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">{t('ui.memberships.form.user.label')}</label>
        <Select value={values.userId} onChange={(e) => { onUserChange(Number(e.target.value)); }}>
          {users.map((u) => <option key={u.id} value={u.id}>{u.username}</option>)}
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t('ui.memberships.form.subscription.label')}</label>
        <Select value={values.subscriptionId} onChange={(e) => { onSubscriptionChange(Number(e.target.value)); }}>
          {subscriptions.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t('ui.memberships.form.sellerCode.label')}</label>
        <Input value={values.sellerCode} onChange={(e) => { onSellerCodeChange(e.target.value); }} placeholder={t('ui.memberships.form.sellerCode.placeholder')} data-testid="membership-seller-code-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t('ui.memberships.form.status.label')}</label>
        <Select value={values.status} onChange={(e) => { onStatusChange(e.target.value as 'active' | 'inactive'); }}>
          <option value="active">{t('ui.memberships.status.active')}</option>
          <option value="inactive">{t('ui.memberships.status.inactive')}</option>
        </Select>
      </div>
    </>
  )
}
