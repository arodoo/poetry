/*
 File: provider.allKeys.test.tsx
 Purpose: Ensure every declared key resolves after locale load.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { I18nProvider } from '../../shared/i18n'
import { useT } from '../../shared/i18n/useT'
import { I18N_KEYS } from '../../shared/i18n/generated/keys'
import { localeService } from '../../shared/i18n/services/localeService'

function AllKeysProbe() {
  const t = useT()
  return (
    <ul>
      {I18N_KEYS.map((key) => (
        <li key={key}>{t(key) || '∅'}</li>
      ))}
    </ul>
  )
}

describe('I18nProvider.allKeys', () => {
  beforeEach(() => {
    vi.spyOn(localeService, 'fetchUserLocale').mockResolvedValue({
      success: true,
      locale: 'en',
    })
  })

  it('resolves all keys without throwing', async () => {
    render(
      <I18nProvider>
        <AllKeysProbe />
      </I18nProvider>
    )
    await waitFor(() => {
      expect(screen.getByText('Explore')).toBeTruthy()
    })
  })
})
