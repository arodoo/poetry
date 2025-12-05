/*
 * File: MembershipFormFields.tsx
 * Purpose: Reusable membership form fields component.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { UserResponse, SubscriptionResponse } from '../../../api/generated'
import type { MembershipFormValues } from './MembershipFormValues'
import UserSelect from './UserSelect'
import SubscriptionSelect from './SubscriptionSelect'
import SellerCodeInput from './SellerCodeInput'
import StatusSelect from './StatusSelect'

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

export function MembershipFormFields({
  values,
  users,
  subscriptions,
  onUserChange,
  onSubscriptionChange,
  onSellerCodeChange,
  onStatusChange,
  t,
}: Props): ReactElement {
  return (
    <>
      <UserSelect
        users={users}
        value={values.userId}
        onChange={onUserChange}
        t={t}
      />
      <SubscriptionSelect
        subscriptions={subscriptions}
        value={values.subscriptionId}
        onChange={onSubscriptionChange}
        t={t}
      />
      <SellerCodeInput
        value={values.sellerCode}
        onChange={onSellerCodeChange}
        placeholder={t('ui.memberships.form.sellerCode.placeholder')}
      />
      <StatusSelect value={values.status} onChange={onStatusChange} t={t} />
    </>
  )
}
