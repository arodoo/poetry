/*
 File: loadFontOffline.test.ts
 Purpose: Validate offline font loader requests preload link and sets
 cache marker + document class on load.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { loadFontOffline } from '../../../shared/fonts/loadFontOffline'
import type { TokenBundle } from '../../../features/tokens/model/TokensSchemas'

describe('loadFontOffline', () => {
  it('creates preload link and marks cached after load', () => {
    const bundle: TokenBundle = {
      themes: [],
      fonts: [
        {
          key: 'inter',
          label: 'Inter',
          weights: [400],
          hash: 'sha256-test',
          woff2Url: 'https://example.com/inter.woff2',
        },
      ],
      fontFamilies: [
        { key: 'inter', label: 'Inter', family: 'Inter, sans-serif' },
      ],
      fontWeights: ['400'],
      fontSizes: [
        { key: 'default', label: 'Default', sizes: { base: '1rem' } },
      ],
      spacings: [{ key: 'd', label: 'd', values: { md: '1rem' } }],
      radius: [{ key: 'd', label: 'd', values: { md: '4px' } }],
      shadows: [{ key: 'd', label: 'd', values: { md: '0 0 2px #000' } }],
      current: {
        theme: 'none',
        font: 'inter',
        fontSize: 'default',
        spacing: 'd',
        radius: 'd',
        shadow: 'd',
      },
    }
    const res = loadFontOffline(bundle)
    expect(res.requested).toBe(true)
    const link = document.head.querySelector(
      'link[data-font-key="inter"]'
    ) as HTMLLinkElement | null
    expect(link !== null).toBe(true)
    link?.dispatchEvent(new Event('load'))
    expect(
      document.documentElement.classList.contains('font-loaded-inter')
    ).toBe(true)
  })
})
