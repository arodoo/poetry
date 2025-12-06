/*
 File: provider.missingKey.test.tsx
 Purpose: Verify missing key throws strict error.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { I18nProvider } from '../../../shared/i18n'
import { useT } from '../../../shared/i18n/useT'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

function Bad() {
  const t = useT()
  t('ui.route.home.title')
  t('ui.missing.key' as unknown as I18nKey)
  return null
}

describe('I18nProvider.missingKey', () => {
  it('throws on missing key', () => {
    expect(() =>
      render(
        <I18nProvider>
          <Bad />
        </I18nProvider>
      )
    ).toThrow(/i18n.missing:ui.missing.key/)
  })
})
