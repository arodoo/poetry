/*
 File: provider.fetchLocale.test.tsx
 Purpose: Verify backend locale fetch applies English catalog.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { I18nProvider } from '../../../shared/i18n'
import { useT } from '../../../shared/i18n/useT'
import { localeService } from '../../../shared/i18n/services/localeService'

function Probe(p: { seen: string[] }) {
  const t = useT()
  p.seen.push(t('ui.demo.action.explore'))
  return null
}

describe('I18nProvider.fetchLocale', () => {
  beforeEach(() => {
    vi.spyOn(localeService, 'fetchUserLocale').mockResolvedValue({
      success: true,
      locale: 'en',
    })
  })

  it('loads locale and translates', async () => {
    const seen: string[] = []
    render(
      <I18nProvider>
        <Probe seen={seen} />
      </I18nProvider>
    )
    await waitFor(() => expect(seen.at(-1)).toBe('Explore'))
  })
})
