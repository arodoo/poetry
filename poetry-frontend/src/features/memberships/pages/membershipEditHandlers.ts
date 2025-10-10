/*
 * File: membershipEditHandlers.ts
 * Purpose: Handler functions for membership edit page to keep
 * main component under line limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { NavigateFunction } from 'react-router-dom'
import {
  UpdateMembershipSchema,
  type UpdateMembershipInput,
} from '../model/MembershipsSchemas'
import type { MembershipFormValues } from '../components/MembershipFormValues'

export function createEditSubmitHandler(
  membershipId: string,
  etag: string,
  mutate: (vars: any, callbacks: any) => void,
  navigate: NavigateFunction,
  locale: string,
  push: (msg: string) => void,
  t: (key: string) => string
): (values: MembershipFormValues) => void {
  return (values: MembershipFormValues): void => {
    const validatedInput: UpdateMembershipInput =
      UpdateMembershipSchema.parse({
        userId: values.userId,
        subscriptionId: values.subscriptionId,
        sellerCode: values.sellerCode,
        status: values.status,
        allZones: values.allZones,
        zoneIds: values.zoneIds,
      })
    mutate(
      { id: membershipId, input: validatedInput, etag },
      {
        onSuccess: (): void => {
          push(t('ui.memberships.toast.updated'))
          void navigate(`/${locale}/memberships`)
        },
        onError: (): void => {
          push(t('ui.memberships.toast.error'))
        },
      }
    )
  }
}
