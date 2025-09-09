/*
 File: tokensApi.test.ts
 Purpose: Test the tokens API wrapper which calls the SDK and runs
 Zod validation. The test mocks the SDK response and asserts the
 returned bundle has the expected structure and ETag passthrough,
 ensuring the feature-level API correctly validates and surfaces
 data for consumers.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi } from 'vitest'
import * as sdk from '../../../shared/sdk'
import { getTokens } from '../../../features/tokens/api/tokensApi'

vi.spyOn(sdk, 'getTokensRaw').mockResolvedValue({
  data: {
    themes: [{ key: 'amber', label: 'Amber', colors: { primary: '#fff' } }],
    fonts: [{ key: 'inter', label: 'Inter', weights: [400] }],
    fontWeights: ['400'],
    fontSizes: [{ key: 'default', label: 'Default', sizes: { base: '1rem' } }],
    spacings: [{ key: 'default', label: 'Default', values: { md: '1rem' } }],
    radius: [{ key: 'default', label: 'Default', values: { md: '4px' } }],
    shadows: [
      { key: 'default', label: 'Default', values: { md: '0 0 2px #000' } },
    ],
    current: {
      theme: 'amber',
      font: 'inter',
      fontSize: 'default',
      spacing: 'default',
      radius: 'default',
      shadow: 'default',
    },
  },
  etag: 'W/"1"',
})

describe('tokensApi.getTokens', () => {
  it('returns validated bundle', async () => {
    const { bundle, etag } = await getTokens()
    expect(bundle.current.theme).toBe('amber')
    expect(etag).toBe('W/"1"')
  })
})
