/*
 * File: UsersCreateFingerprintSection.tsx
 * Purpose: Fingerprint enrollment section for the Create User flow.
 * Passes FMD to parent form state.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { useT } from '../../../../shared/i18n/useT'
import { FingerprintEnrollmentSection } from './FingerprintEnrollmentSection'

interface UsersCreateFingerprintSectionProps {
  readonly onSuccess: (fmd: string) => void
  readonly onSkip: () => void
  readonly t: ReturnType<typeof useT>
}

export function UsersCreateFingerprintSection(
  props: UsersCreateFingerprintSectionProps
): ReactElement {
  return (
    <FingerprintEnrollmentSection
      showSkipButton={true}
      onSuccess={props.onSuccess}
      onSkip={props.onSkip}
      t={props.t}
    />
  )
}
