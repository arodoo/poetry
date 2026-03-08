/*
 * File: BirthdayPopup.tsx
 * Purpose: Modal shell for the birthday celebration overlay. Renders a
 * semi-transparent backdrop, the confetti layer behind the content, and
 * the BirthdayPopupContent card on top. Clicking the backdrop closes it.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { BirthdayUserDto } from '../api/birthdayCheckApi'
import { BirthdayConfetti } from './BirthdayConfetti'
import { BirthdayPopupContent } from './BirthdayPopupContent'

interface Props {
  readonly celebrants: BirthdayUserDto[]
  readonly onClose: () => void
}

export function BirthdayPopup({ celebrants, onClose }: Props): ReactElement {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="birthday-popup"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <BirthdayConfetti />
      <div className="relative z-10 w-full max-w-sm mx-4">
        <BirthdayPopupContent celebrants={celebrants} onClose={onClose} />
      </div>
    </div>
  )
}
