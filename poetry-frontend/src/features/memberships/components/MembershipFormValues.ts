/*
 * File: MembershipFormValues.ts
 * Purpose: Form values interface for membership create and edit.
 * All Rights Reserved. Arodi Emmanuel
 */

export interface MembershipFormValues {
  readonly userId: number
  readonly subscriptionId: number
  readonly sellerCode: string
  readonly zoneIds: readonly number[]
  readonly allZones: boolean
  readonly status: 'active' | 'inactive'
}
