/*
 File: provider.interpolate.test.tsx
 Purpose: Verify interpolation works after locale load.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { I18nProvider } from '../../shared/i18n'
import { useT } from '../../shared/i18n/useT'

function Probe() {
  const t = useT()
  return (
    <div data-testid="h">
      {t('ui.demo.interpolation.hello', { name: 'John' })}
    </div>
  )
}

describe('I18nProvider.interpolate', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ locale: 'en' }),
    })
  })

  it('interpolates vars', async () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>
    )
    await waitFor(() =>
      expect(screen.getByTestId('h').textContent).toContain('Hello John')
    )
  })
})
