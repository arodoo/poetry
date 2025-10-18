/*
 * File: profileClient.ts
 * Purpose: SDK helpers for profile endpoints using generated SDK types.
 * All Rights Reserved. Arodi Emmanuel
 */
import { getProfile, updateProfile } from '../../../api/generated'
import type {
  ProfileResponse,
  ProfileUpdateRequest,
} from '../../../api/generated'

export type { ProfileResponse, ProfileUpdateRequest }

export async function getProfileSummaryRaw(): Promise<ProfileResponse> {
  const response = await getProfile()
  if (response.error || !response.data) {
    throw new Error('Failed to fetch profile')
  }
  return (response.data as unknown) as ProfileResponse
}

export async function putProfileSummary(
  body: ProfileUpdateRequest
): Promise<ProfileResponse> {
  const response = await updateProfile({ body })
  if (response.error || !response.data) {
    throw new Error('Failed to update profile')
  }
  return (response.data as unknown) as ProfileResponse
}
