/*
 File: TokensSchemas.test.ts
 Purpose: Validate the TokenBundle Zod schema accepts well-formed
 payloads and rejects malformed ones. Tests include a positive case
 with a complete, valid token bundle and a negative case missing the
 required `current` section to ensure runtime validation is robust.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { TokenBundleSchema } from '../../../features/tokens/model/TokensSchemas'

const valid = {
  themes: [
    {
      key: 'amber',
      label: 'Amber',
      colors: { primary: '#fff' },
    },
  ],
  fonts: [{ key: 'inter', label: 'Inter', weights: [400] }],
  fontFamilies: [{ key: 'inter', label: 'Inter', family: 'Inter, sans-serif' }],
  fontWeights: ['400'],
  fontSizes: [
    {
      key: 'default',
      label: 'Default',
      sizes: { base: '1rem' },
    },
  ],
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
}

describe('TokenBundleSchema', () => {
  it('parses valid payload', () => {
    const parsed = TokenBundleSchema.parse(valid)
    expect(parsed).toBeTruthy()
  })
  it('rejects missing current', () => {
    const bad: typeof valid = {
      ...valid,
      current: undefined as unknown as never,
    }
    expect(() => TokenBundleSchema.parse(bad)).toThrow()
  })
})
