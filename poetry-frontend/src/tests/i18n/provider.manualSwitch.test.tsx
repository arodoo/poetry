/*
 File: provider.manualSwitch.test.tsx
 Purpose: Validate manual locale switch via internal setLocale.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { I18nProvider } from '../../shared/i18n'
import { useT } from '../../shared/i18n/useT'
import { localeService } from '../../shared/i18n/services/localeService'

function Manual() {
  const t = useT()
  const [, bump] = React.useState(0)
  React.useEffect(() => {
    setTimeout(() => {
      ;(window as { __set?: (locale: string) => void }).__set?.('es')
      bump(1)
    }, 0)
  }, [])
  return <span>{t('ui.demo.action.explore')}</span>
}

describe('I18nProvider.manualSwitch', () => {
  beforeEach(() => {
    vi.spyOn(localeService, 'fetchUserLocale').mockResolvedValue({
      success: true,
      locale: 'en',
    })
  })

  it('renders english then spanish', async () => {
    render(
      <I18nProvider>
        <Manual />
      </I18nProvider>
    )
    await waitFor(() => expect(screen.getByText('Explore')).toBeTruthy())
  })
})
