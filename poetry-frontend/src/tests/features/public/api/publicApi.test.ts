/*
 * File: publicApi.test.ts
 * Purpose: Ensure public API wrappers validate landing payloads.
 * All Rights Reserved. Arodi Emmanuel
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as sdk from '../../../../shared/sdk'
import { fetchPublicLandingContent } from '../../../../features/public'

const landingDto = {
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

describe('publicApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses landing content from sdk', async () => {
    vi.spyOn(sdk, 'getPublicLandingRaw').mockResolvedValue(landingDto)
    const landing = await fetchPublicLandingContent()
    expect(landing.features).toHaveLength(1)
  })

  it('throws when sdk returns no features', async () => {
    vi.spyOn(sdk, 'getPublicLandingRaw').mockResolvedValue({
      ...landingDto,
      features: [],
    })
    await expect(fetchPublicLandingContent()).rejects.toThrow()
  })
})
