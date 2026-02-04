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
  listUserMemberships as listUserMembershipsSdk,
  type MembershipResponse,
  type PageResponseDtoMembershipResponse,
  type PageResponseDtoMembershipDetail,
  type ListUserMembershipsData,
} from '../../../api/generated'

export async function fetchUserMemberships(
  status: string,
  page: number,
  size: number
): Promise<PageResponseDtoMembershipDetail> {
  // Use flat params for Spring Boot backend compatibility
  const query: ListUserMembershipsData['query'] = {
    status,
    page,
    size,
  }
  const response = await listUserMembershipsSdk({ query })
  if (!response.data) {
    throw new Error('Failed to fetch user memberships')
  }
  return response.data
}

export async function fetchMembershipsList(): Promise<MembershipResponse[]> {
  const response = await listMembershipsSdk()
  if (!response.data) return []
  return response.data
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
  return response.data
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
  return response.data
}
