/*
 * File: BirthdayCheckButton.tsx
 * Purpose: Navbar button that triggers the birthday check flow. Calls
 * the useBirthdayCheck hook to fetch and display today's celebrants.
 * Renders the BirthdayPopup overlay when the result is ready and open.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { useBirthdayCheck } from '../hooks/useBirthdayCheck'
import { BirthdayPopup } from './BirthdayPopup'

export function BirthdayCheckButton(): ReactElement {
  const t = useT()
  const { isOpen, celebrants, isLoading, check, close } = useBirthdayCheck()

  return (
    <>
      <button
        data-testid="birthday-check-button"
        onClick={(): void => { void check() }}
        disabled={isLoading}
        className={
          'rounded-lg px-3 py-1.5 text-sm font-medium ' +
          'bg-[var(--color-primary)] text-[var(--color-on-primary)] ' +
          'hover:opacity-90 disabled:opacity-50 transition-opacity'
        }
      >
        {t('ui.navbar.birthdayCheck')}
      </button>
      {isOpen && (
        <BirthdayPopup celebrants={celebrants} onClose={close} />
      )}
    </>
  )
}
