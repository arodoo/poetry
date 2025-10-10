/*
 * File: membershipsQueries.ts
 * Purpose: Query operations using generated SDK for memberships
 * Returns generated MembershipResponse types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  listMemberships as listMembershipsSdk,
  listMembershipsPaged as listMembershipsPagedSdk,
  getMembershipById as getMembershipByIdSdk,
  type MembershipResponse,
  type PageResponseDtoMembershipResponse,
} from '../../../api/generated'

export async function fetchMembershipsList(): Promise<
  MembershipResponse[]
> {
  const response = await listMembershipsSdk()
  return (response.data as MembershipResponse[]) ?? []
}

export async function fetchMembershipsPage(
  page: number,
  size: number,
  search?: string
): Promise<PageResponseDtoMembershipResponse> {
  const response = await listMembershipsPagedSdk({
    query: {
      page,
      size,
      ...(search ? { search } : {}),
    },
  })
  if (!response.data) {
    throw new Error('Failed to fetch memberships page')
  }
  return response.data as PageResponseDtoMembershipResponse
}

export async function fetchMembershipById(
  id: string
): Promise<MembershipResponse> {
  const response = await getMembershipByIdSdk({
    path: { id: Number(id) },
  })
  if (!response.data) {
    throw new Error(`Membership ${id} not found`)
  }
  return response.data as MembershipResponse
}
