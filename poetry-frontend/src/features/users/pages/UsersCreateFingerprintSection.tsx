/*
 * File: UsersCreateFingerprintSection.tsx
 * Purpose: Inline fingerprint enrollment section after user creation.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import type { useT } from '../../../shared/i18n/useT'
import { FingerprintEnrollmentWizard } from '../components/FingerprintWizard'

interface UsersCreateFingerprintSectionProps {
  readonly userId: number
  readonly onSuccess: () => void
  readonly onSkip: () => void
  readonly t: ReturnType<typeof useT>
}

export function UsersCreateFingerprintSection(
  props: UsersCreateFingerprintSectionProps
): ReactElement {
  return (
    <div className="mt-8 p-6 border border-[var(--color-border)] rounded-lg">
      <FingerprintEnrollmentWizard
        userId={props.userId}
        onSuccess={props.onSuccess}
        onCancel={props.onSkip}
        t={props.t}
      />
      <div className="mt-4">
        <Button onClick={props.onSkip} variant="secondary">
          {props.t('ui.users.fingerprint.wizard.skipEnrollment')}
        </Button>
      </div>
    </div>
  )
}
