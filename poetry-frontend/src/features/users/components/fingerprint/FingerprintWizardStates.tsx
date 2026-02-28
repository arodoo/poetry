/*
 * File: FingerprintWizardStates.tsx
 * Purpose: UI states for fingerprint enrollment wizard.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Text } from '../../../../ui/Text/Text'
import { Button } from '../../../../ui/Button/Button'
import type { useT } from '../../../../shared/i18n/useT'

interface StateProps {
  readonly t: ReturnType<typeof useT>
  readonly onStart?: () => void
  readonly onCancel?: () => void
  readonly fmd?: string | null
  readonly errorMessage?: string
}

export function IdleState(props: StateProps): ReactElement {
  return (
    <Button
      onClick={props.onStart}
      variant="primary"
      data-testid="fingerprint-start-btn"
    >
      {props.t('ui.users.fingerprint.wizard.start')}
    </Button>
  )
}

export function CapturingState(props: StateProps): ReactElement {
  return (
    <Stack gap="sm">
      <Text className="text-[var(--color-success)]">
        {props.t('ui.users.fingerprint.wizard.capturing')}
      </Text>
    </Stack>
  )
}

export function SuccessState(props: StateProps): ReactElement {
  return (
    <Stack gap="sm">
      <Text
        className="text-[var(--color-success)]"
        data-testid="fingerprint-success-msg"
      >
        ✓ {props.t('ui.users.fingerprint.wizard.success')}
      </Text>
      <Text size="sm" className="text-[var(--color-text-muted)] italic">
        {props.t('ui.fingerprints.simulator.captured')}
      </Text>
    </Stack>
  )
}

export function ErrorState(props: StateProps): ReactElement {
  return (
    <Stack gap="sm">
      <Text className="text-[var(--color-error)]">
        ❌ {props.t('ui.users.fingerprint.wizard.error')}
      </Text>
      {props.errorMessage && (
        <Text size="sm" className="text-[var(--color-text-muted)]">
          {props.t(props.errorMessage)}
        </Text>
      )}
      <Button
        onClick={props.onStart}
        variant="secondary"
        data-testid="fingerprint-retry-btn"
      >
        {props.t('ui.users.fingerprint.wizard.retry')}
      </Button>
    </Stack>
  )
}
