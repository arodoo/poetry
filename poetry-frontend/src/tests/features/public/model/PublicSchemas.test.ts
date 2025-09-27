/*
 * File: PublicSchemas.test.ts
 * Purpose: Validate public landing schema invariants.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import { PublicLandingContentSchema } from '../../../../features/public'

const validLanding = {
  heroTitleKey: 'ui.public.home.hero.title',
  heroBodyKey: 'ui.public.home.hero.body',
  loginCtaKey: 'ui.public.home.cta.login',
  registerCtaKey: 'ui.public.home.cta.register',
  features: [
    {
      titleKey: 'ui.public.home.features.publish.title',
      descriptionKey: 'ui.public.home.features.publish.description',
    },
  ],
}

describe('PublicSchemas', () => {
  it('accepts landing content with features', () => {
    expect(PublicLandingContentSchema.safeParse(validLanding).success).toBe(
      true
    )
  })

  it('rejects landing content without features', () => {
    const result = PublicLandingContentSchema.safeParse({
      ...validLanding,
      features: [],
    })
    expect(result.success).toBe(false)
  })
})
