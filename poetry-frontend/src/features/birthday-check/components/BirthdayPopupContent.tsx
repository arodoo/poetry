/*
 * File: BirthdayPopupContent.tsx
 * Purpose: Vibrant gradient card shown inside the birthday popup modal.
 * Renders celebrant cards when there are birthdays, or an empty-state
 * message otherwise. Close button delegates to the parent's close fn.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import type { BirthdayUserDto } from '../api/birthdayCheckApi'
import { BirthdayCelebrantCard } from './BirthdayCelebrantCard'

interface Props {
  readonly celebrants: BirthdayUserDto[]
  readonly onClose: () => void
}

export function BirthdayPopupContent({
  celebrants,
  onClose,
}: Props): ReactElement {
  const t = useT()
  return (
    <div
      className={
        'bd-popup relative rounded-2xl p-6 shadow-2xl ' +
        'bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600'
      }
    >
      <h2 className="text-white font-bold text-xl mb-4 text-center">
        {t('ui.birthday.title')}
      </h2>
      {celebrants.length === 0 ? (
        <p
          data-testid="birthday-empty-state"
          className="text-white/80 text-center py-4"
        >
          {t('ui.birthday.none')}
        </p>
      ) : (
        <div className="flex flex-col gap-2 mb-4">
          {celebrants.map((c) => (
            <BirthdayCelebrantCard key={c.username} celebrant={c} />
          ))}
        </div>
      )}
      <button
        onClick={onClose}
        className={
          'mt-2 w-full rounded-lg bg-white/25 py-2 text-white ' +
          'font-medium hover:bg-white/35 transition-colors'
        }
      >
        {t('ui.birthday.close')}
      </button>
    </div>
  )
}
