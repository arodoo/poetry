/*
 * File: useMembershipFormState.ts
 * Purpose: State management hook for membership edit form.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import type { MembershipResponse } from '../../../api/generated'
import type { MembershipFormValues } from '../components/MembershipFormValues'

export interface MembershipFormState {
  readonly values: MembershipFormValues
  readonly setUserId: (id: number) => void
  readonly setSubscriptionId: (id: number) => void
  readonly setSellerCode: (code: string) => void
  readonly setStatus: (status: 'active' | 'inactive') => void
  readonly setZoneIds: (ids: readonly number[]) => void
  readonly setAllZones: (all: boolean) => void
}

export function useMembershipFormState(
  membership: MembershipResponse
): MembershipFormState {
  const [userId, setUserId] = useState(membership.userId ?? 0)
  const [subscriptionId, setSubscriptionId] = useState(
    membership.subscriptionId ?? 0
  )
  const [sellerCode, setSellerCode] = useState(membership.sellerCode ?? '')
  const [status, setStatus] = useState<'active' | 'inactive'>(
    (membership.status as 'active' | 'inactive') || 'active'
  )
  const [zoneIds, setZoneIds] = useState<readonly number[]>(
    membership.zoneIds ?? []
  )
  const [allZones, setAllZones] = useState(membership.allZones ?? false)

  return {
    values: { userId, subscriptionId, sellerCode, status, zoneIds, allZones },
    setUserId,
    setSubscriptionId,
    setSellerCode,
    setStatus,
    setZoneIds,
    setAllZones,
  }
}
