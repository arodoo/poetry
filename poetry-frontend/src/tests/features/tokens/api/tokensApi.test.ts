/*
 * File: tokensApi.test.ts
 * Purpose: Tests tokens API wrapper happy path using mocked client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import * as sdk from '../../../../shared/sdk'
import { getTokens } from '../../../../features/tokens/api/tokensApi'

vi.spyOn(sdk, 'getTokensRaw').mockResolvedValue({
  data: {
    themes: [{ key: 'amber', label: 'Amber', colors: { primary: '#fff' } }],
    fonts: [{ key: 'inter', label: 'Inter', weights: [400] }],
    fontFamilies: [
      { key: 'inter', label: 'Inter', family: 'Inter, sans-serif' },
    ],
    fontWeights: ['400'],
    fontSizes: [{ key: 'default', label: 'Default', sizes: { base: '1rem' } }],
    spacings: [{ key: 'default', label: 'Default', values: { md: '1rem' } }],
    radius: [{ key: 'default', label: 'Default', values: { md: '4px' } }],
    shadows: [
      { key: 'default', label: 'Default', values: { md: '0 0 2px #000' } },
    ],
    current: {
      theme: 'default',
      font: 'inter',
      fontSize: 'default',
      spacing: 'default',
      radius: 'default',
      shadow: 'default',
    },
  },
  etag: 'W/"x"',
})

describe('tokensApi', () => {
  it('parses response', async () => {
    const res = await getTokens()
    expect(res.etag).toBeTypeOf('string')
  })
})
