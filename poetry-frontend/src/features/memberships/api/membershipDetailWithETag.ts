/*
 * File: membershipDetailWithETag.ts
 * Purpose: Fetch membership detail with ETag header for optimistic
 * locking using generated SDK (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  getMembershipById as getMembershipByIdSdk,
  type MembershipResponse,
} from '../../../api/generated'

export interface MembershipDetailWithETag {
  readonly membership: MembershipResponse
  readonly etag: string | null
}

export async function fetchMembershipDetailWithETag(
  id: string
): Promise<MembershipDetailWithETag> {
  const response = await getMembershipByIdSdk({
    path: { id: Number(id) },
  })
  if (!response.data) {
    throw new Error(`Membership ${id} not found`)
  }
  const membership: MembershipResponse = response.data as MembershipResponse
  const etag: string | null = response.response.headers.get('ETag')
  return { membership, etag }
}
