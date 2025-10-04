/*
 * File: tokensApi.test.ts
 * Purpose: Tests tokens API wrapper happy path using mocked client.
 * Tests now use generated SDK mocks from api/generated.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import * as generatedSdk from '../../../../api/generated'
import { getTokens } from '../../../../features/tokens/api/tokensApi'

vi.spyOn(generatedSdk, 'getTokens').mockResolvedValue({
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
      theme: 'default',
      font: 'inter',
      fontSize: 'default',
      spacing: 'default',
      radius: 'default',
      shadow: 'default',
    },
  },
  request: new Request('http://localhost/api/v1/tokens'),
  response: new Response('', {
    headers: { etag: 'W/"x"' },
  }),
})

describe('tokensApi', () => {
  it('parses response', async () => {
    const res = await getTokens()
    expect(res.etag).toBeTypeOf('string')
  })
})
