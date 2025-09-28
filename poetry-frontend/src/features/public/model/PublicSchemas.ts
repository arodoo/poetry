/*
 * File: PublicSchemas.ts
 * Purpose: Domain schemas describing public landing content contracts.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const PublicLandingFeatureSchema: z.ZodObject<{
  titleKey: z.ZodString
  descriptionKey: z.ZodString
}> = z.object({
  titleKey: z.string().min(1),
  descriptionKey: z.string().min(1),
})

export const PublicLandingContentSchema: z.ZodObject<{
  heroTitleKey: z.ZodString
  heroBodyKey: z.ZodString
  loginCtaKey: z.ZodString
  registerCtaKey: z.ZodString
  features: z.ZodArray<
    z.ZodObject<{ titleKey: z.ZodString; descriptionKey: z.ZodString }>
  >
}> = z.object({
  heroTitleKey: z.string().min(1),
  heroBodyKey: z.string().min(1),
  loginCtaKey: z.string().min(1),
  registerCtaKey: z.string().min(1),
  features: z.array(PublicLandingFeatureSchema).min(1),
})

export type PublicLandingFeature = z.infer<typeof PublicLandingFeatureSchema>
export type PublicLandingContent = z.infer<typeof PublicLandingContentSchema>
