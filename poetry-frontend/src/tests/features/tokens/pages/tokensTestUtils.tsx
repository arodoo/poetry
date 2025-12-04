/*
 * File: tokensTestUtils.tsx
 * Purpose: Shared test utilities for tokens page tests.
 * All Rights Reserved. Arodi Emmanuel
 */
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import * as i18n from '../../../../shared/i18n/useT'
import {
  AdminTokensPage,
} from '../../../../features/tokens/pages/AdminTokensPage'

const mockUseT = (k: string): string => k
vi.spyOn(i18n, 'useT').mockReturnValue(mockUseT)

vi.mock('../../../../shared/toast/toastContext', () => ({
  useToast: () => ({
    push: (): void => {
      // empty mock
    },
  }),
}))

export function renderTokensPage(): void {
  cleanup()
  const client = new QueryClient()
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(
    <MemoryRouter>
      <QueryClientProvider client={client}>
        <AdminTokensPage />
      </QueryClientProvider>
    </MemoryRouter>,
    { container }
  )
}

export const mockBundle = {
  themes: [{ key: 'default' }],
  fonts: [{ key: 'inter' }],
  fontSizes: [{ key: 'default' }],
  spacings: [{ key: 'default' }],
  radius: [{ key: 'default' }],
  shadows: [{ key: 'default' }],
  current: {
    theme: 'default',
    font: 'inter',
    fontSize: 'default',
    spacing: 'default',
    radius: 'default',
    shadow: 'default',
  },
}
