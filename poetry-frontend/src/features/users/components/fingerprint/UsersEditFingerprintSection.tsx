/*
 * File: UsersEditFingerprintSection.tsx
 * Purpose: Fingerprint re-enrollment section for the Edit User flow.
 * Replaces all active fingerprints for the user with the newly captured one.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { useT } from '../../../../shared/i18n/useT'
import { FingerprintEnrollmentSection } from './FingerprintEnrollmentSection'

interface UsersEditFingerprintSectionProps {
  readonly userId: number
  readonly onSuccess: (fmd: string) => void
  readonly onSkip: () => void
  readonly t: ReturnType<typeof useT>
}

export function UsersEditFingerprintSection(
  props: UsersEditFingerprintSectionProps
): ReactElement {
  return (
    <FingerprintEnrollmentSection
      mode="replace"
      userId={props.userId}
      onSuccess={props.onSuccess}
      onSkip={props.onSkip}
      t={props.t}
    />
  )
}
