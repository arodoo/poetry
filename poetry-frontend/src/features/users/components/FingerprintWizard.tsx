/*
 * File: FingerprintWizard.tsx
 * Purpose: Inline wizard for guided fingerprint enrollment.
 * Auto-assigns slot, shows capture states, handles errors.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import type { useT } from '../../../shared/i18n/useT'
import { useFingerprintEnrollment } from './useFingerprintEnrollment'
import * as States from './FingerprintWizardStates'

export interface FingerprintEnrollmentWizardProps {
  readonly onSuccess?: (slotId: number) => void
  readonly onCancel?: () => void
  readonly onValidate?: (startFn: () => void) => void
  readonly t: ReturnType<typeof useT>
}

export function FingerprintEnrollmentWizard(
  props: FingerprintEnrollmentWizardProps
): ReactElement {
  const { state, slotId, errorMessage, startEnrollment, reset } =
    useFingerprintEnrollment()

  function handleStart(): void {
    if (props.onValidate) {
      props.onValidate(() => void startEnrollment(props.onSuccess))
    } else {
      void startEnrollment(props.onSuccess)
    }
  }

  function handleCancel(): void {
    reset()
    props.onCancel?.()
  }

  return (
    <Stack gap="md">
      <Stack gap="xs">
        <Text size="md" className="font-medium">
          {props.t('ui.users.fingerprint.wizard.title')}
        </Text>
        <Text size="sm" className="text-[var(--color-text-muted)]">
          {props.t('ui.users.fingerprint.wizard.description')}
        </Text>
      </Stack>

      {state === 'idle' && (
        <States.IdleState t={props.t} onStart={handleStart} />
      )}

      {state === 'capturing' && <States.CapturingState t={props.t} />}

      {state === 'processing' && (
        <Text>{props.t('ui.users.fingerprint.wizard.processing')}</Text>
      )}

      {state === 'success' && slotId !== null && (
        <States.SuccessState t={props.t} slotId={slotId} />
      )}

      {state === 'error' && (
        <States.ErrorState
          t={props.t}
          errorMessage={errorMessage}
          onStart={handleStart}
        />
      )}

      {state !== 'success' && (
        <Button onClick={handleCancel} variant="secondary">
          {props.t('ui.users.fingerprint.wizard.cancel')}
        </Button>
      )}
    </Stack>
  )
}
