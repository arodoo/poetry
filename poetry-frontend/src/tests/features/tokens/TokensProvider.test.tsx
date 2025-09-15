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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TokensProvider } from '../../../shared/tokens/TokensProvider'
import { makeTokensMock } from '../../helpers/makeTokensMock'

vi.mock('../../../features/tokens/hooks/useTokensQueries', async () =>
  makeTokensMock()
)

describe('TokensProvider', () => {
  it('applies CSS variables from token bundle', () => {
    const qc = new QueryClient()
    render(
      <QueryClientProvider client={qc}>
        <TokensProvider>
          <div>child</div>
        </TokensProvider>
      </QueryClientProvider>
    )
    const root = document.documentElement
    expect(getComputedStyle(root).getPropertyValue('--color-primary')).toBe(
      'hsl(34 65% 37%)'
    )
    expect(getComputedStyle(root).getPropertyValue('--font-family-base')).toBe(
      'Inter, sans-serif'
    )
  })
})
