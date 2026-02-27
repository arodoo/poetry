/*
 * File: BirthdayCelebrantCard.tsx
 * Purpose: Displays the full name and username of a single birthday
 * celebrant. Marked with data-testid for reliable E2E targeting.
 * Kept intentionally simple to respect the single-responsibility rule.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { BirthdayUserDto } from '../api/birthdayCheckApi'

interface Props {
  readonly celebrant: BirthdayUserDto
}

export function BirthdayCelebrantCard({ celebrant }: Props): ReactElement {
  return (
    <div
      data-testid="birthday-celebrant-card"
      className="rounded-lg bg-white/20 px-4 py-3 text-white"
    >
      <p className="font-semibold text-lg leading-tight">
        {celebrant.fullName}
      </p>
      <p className="text-sm opacity-80">@{celebrant.username}</p>
    </div>
  )
}
