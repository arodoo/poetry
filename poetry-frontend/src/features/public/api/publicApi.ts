/*
 * File: publicApi.ts
 * Purpose: Public feature API wrappers ensuring runtime validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { getPublicLandingRaw } from '../../../shared/sdk'
import {
  PublicLandingContentSchema,
  type PublicLandingContent,
} from '../model/PublicSchemas'

export async function fetchPublicLandingContent(): Promise<PublicLandingContent> {
  const dto: unknown = await getPublicLandingRaw()
  return PublicLandingContentSchema.parse(dto)
}
