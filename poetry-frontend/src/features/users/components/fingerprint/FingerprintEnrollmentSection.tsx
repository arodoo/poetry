/*
 * File: FingerprintEnrollmentSection.tsx
 * Purpose: Shared base enrollment section for both Add and Edit user flows.
 * When mode is 'replace', deletes previous fingerprints and saves the new one.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../../ui/Button/Button'
import type { useT } from '../../../../shared/i18n/useT'
import { FingerprintEnrollmentWizard } from './FingerprintWizard'
import { replaceUserFingerprint } from '../../../../api/generated/sdk.gen'

export interface FingerprintEnrollmentSectionProps {
  readonly mode: 'create' | 'replace'
  readonly userId?: number
  readonly onSuccess: (fmd: string) => void
  readonly onSkip: () => void
  readonly t: ReturnType<typeof useT>
}

export function FingerprintEnrollmentSection(
  props: FingerprintEnrollmentSectionProps
): ReactElement {
  async function handleSuccess(fmd: string): Promise<void> {
    if (props.mode === 'replace' && props.userId !== undefined) {
      await replaceUserFingerprint({
        path: { userId: props.userId },
        body: { fmd },
      })
    }
    props.onSuccess(fmd)
  }

  return (
    <div
      className="mt-8 p-6 border border-[var(--color-border)] rounded-lg"
      data-testid="fingerprint-enrollment-section"
    >
      <FingerprintEnrollmentWizard
        onSuccess={(fmd) => void handleSuccess(fmd)}
        onCancel={props.onSkip}
        t={props.t}
      />
      <div className="mt-4">
        <Button
          onClick={props.onSkip}
          variant="secondary"
          data-testid="fingerprint-skip-btn"
        >
          {props.t('ui.users.fingerprint.wizard.skipEnrollment')}
        </Button>
      </div>
    </div>
  )
}
