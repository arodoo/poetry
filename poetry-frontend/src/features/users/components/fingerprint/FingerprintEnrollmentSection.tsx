/*
 * File: FingerprintEnrollmentSection.tsx
 * Purpose: Shared base enrollment section for both Add and Edit user flows.
 * Purely presentational; passes captured FMD up via onSuccess.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../../ui/Button/Button'
import type { useT } from '../../../../shared/i18n/useT'
import { FingerprintEnrollmentWizard } from './FingerprintWizard'

export interface FingerprintEnrollmentSectionProps {
  readonly showSkipButton?: boolean
  readonly onSuccess: (fmd: string) => void
  readonly onSkip?: () => void
  readonly t: ReturnType<typeof useT>
}

export function FingerprintEnrollmentSection(
  props: FingerprintEnrollmentSectionProps
): ReactElement {
  return (
    <div
      className="mt-8 p-6 border border-[var(--color-border)] rounded-lg"
      data-testid="fingerprint-enrollment-section"
    >
      <FingerprintEnrollmentWizard
        onSuccess={props.onSuccess}
        onCancel={props.onSkip ? props.onSkip : undefined}
        t={props.t}
      />
      {props.showSkipButton && props.onSkip && (
        <div className="mt-4">
          <Button
            onClick={props.onSkip}
            variant="secondary"
            data-testid="fingerprint-skip-btn"
          >
            {props.t('ui.users.fingerprint.wizard.skipEnrollment')}
          </Button>
        </div>
      )}
    </div>
  )
}
