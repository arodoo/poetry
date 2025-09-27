/*
 * File: profileApi.ts
 * Purpose: Profile API wrappers providing runtime validation and mapping.
 * All Rights Reserved. Arodi Emmanuel
 */
import { getProfileSummaryRaw, putProfileSummary } from '../../../shared/sdk'
import {
  ProfileSummarySchema,
  ProfileSummaryUpdateSchema,
  type ProfileSummary,
  type ProfileSummaryUpdateInput,
} from '../model/ProfileSchemas'

export async function fetchProfileSummary(): Promise<ProfileSummary> {
  const dto: unknown = await getProfileSummaryRaw()
  return ProfileSummarySchema.parse(dto)
}

export async function updateProfileSummary(
  input: ProfileSummaryUpdateInput
): Promise<ProfileSummary> {
  const payload: ProfileSummaryUpdateInput =
    ProfileSummaryUpdateSchema.parse(input)
  const dto: unknown = await putProfileSummary(payload)
  return ProfileSummarySchema.parse(dto)
}
