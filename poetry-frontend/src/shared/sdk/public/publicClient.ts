/*
 * File: publicClient.ts
 * Purpose: SDK helpers for public landing endpoints using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import { getLanding } from '../../../api/generated'
import type { PublicLandingResponse } from '../../../api/generated'

export type { PublicLandingResponse }
export type PublicLandingDto = PublicLandingResponse

export async function getPublicLandingRaw(): Promise<PublicLandingResponse> {
  const response = await getLanding()
  if (response.error || !response.data) {
    throw new Error('Failed to fetch public landing')
  }
  return response.data as unknown as PublicLandingResponse
}
