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
    themes: [],
    fonts: [],
    fontFamilies: [],
    fontWeights: [],
    fontSizes: [],
    spacings: [],
    radius: [],
    shadows: [],
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
