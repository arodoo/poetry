/*
 File: provider.fallback.test.tsx
 Purpose: Verify fallback to default locale when fetch fails.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { I18nProvider } from '../../shared/i18n'
import { useT } from '../../shared/i18n/useT'
import { localeService } from '../../shared/i18n/services/localeService'

function Probe() {
  const t = useT()
  return <span>{t('ui.demo.welcome.title')}</span>
}

describe('I18nProvider.fallback', () => {
  beforeEach(() => {
    vi.spyOn(localeService, 'fetchUserLocale').mockResolvedValue({
      success: false,
      error: 'Network error',
    })
  })

  it('uses default es locale', async () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>
    )
    await waitFor(() => expect(screen.getByText('Bienvenido')).toBeTruthy())
  })
})
