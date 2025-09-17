/*
 File: TokensProvider.test.tsx
 Purpose: Verifies TokensProvider applies CSS vars.
 Ensures token bundle data is correctly transformed into CSS custom properties.
 Tests integration with React Query for data fetching.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './mockTokens'

import { TokensProvider } from '../../../shared/tokens/TokensProvider'

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
