/*
 * File: membershipsMutations.ts
 * Purpose: Mutation operations using generated SDK for memberships
 * Returns generated MembershipResponse types (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  createMembership as createMembershipSdk,
  updateMembership as updateMembershipSdk,
  deleteMembership as deleteMembershipSdk,
  type MembershipResponse,
} from '../../../api/generated'
import {
  CreateMembershipSchema,
  UpdateMembershipSchema,
  type CreateMembershipInput,
  type UpdateMembershipInput,
} from '../model/MembershipsSchemas'

export async function createMembership(
  input: CreateMembershipInput
): Promise<MembershipResponse> {
  const validatedInput: CreateMembershipInput =
    CreateMembershipSchema.parse(input)
  const response = await createMembershipSdk({ body: validatedInput })
  if (!response.data) {
    throw new Error('Failed to create membership')
  }
  return response.data
}

export async function updateMembership(
  id: string,
  input: UpdateMembershipInput,
  etag?: string
): Promise<MembershipResponse> {
  const payload: UpdateMembershipInput = UpdateMembershipSchema.parse(input)
  const response = await updateMembershipSdk({
    path: { id: Number(id) },
    body: payload,
    headers: { 'If-Match': etag ?? '""' },
  })
  if (!response.data) {
    throw new Error(`Failed to update membership ${id}`)
  }
  return response.data
}

export async function deleteMembership(
  id: string,
  etag?: string
): Promise<void> {
  await deleteMembershipSdk({
    path: { id: Number(id) },
    headers: { 'If-Match': etag ?? '""' },
  })
}
