/*
 File: TokensProvider.test.tsx
 Purpose: Minimal smoke test to verify TokensProvider applies CSS variables
 derived from the token bundle to the document root. The test stubs the
 tokens query to provide a deterministic bundle and asserts the CSS
 variable value is reflected, ensuring runtime token mapping works.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { TokensProvider } from '../../../shared/tokens/TokensProvider'

vi.mock('../../../features/tokens/hooks/useTokensQueries', async () => {
  return {
    useTokensQuery: () => ({
      data: {
        bundle: {
          themes: [
            {
              key: 'amber',
              label: 'Amber',
              colors: { primary: 'hsl(34 65% 37%)' },
            },
          ],
          fonts: [],
          fontWeights: ['400', '500', '700'],
          fontSizes: [
            { key: 'default', label: 'Default', sizes: { base: '1rem' } },
          ],
          spacings: [
            { key: 'default', label: 'Default', values: { md: '1rem' } },
          ],
          radius: [
            { key: 'default', label: 'Default', values: { md: '0.375rem' } },
          ],
          shadows: [
            {
              key: 'default',
              label: 'Default',
              values: { md: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
            },
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
        etag: 'W/"123"',
      },
      isLoading: false,
      error: null,
    }),
  }
})

describe('TokensProvider', () => {
  it('applies CSS variables from token bundle', () => {
    render(
      <TokensProvider>
        <div>child</div>
      </TokensProvider>
    )
    const root = document.documentElement
    expect(getComputedStyle(root).getPropertyValue('--color-primary')).toBe(
      'hsl(34 65% 37%)'
    )
  })
})
