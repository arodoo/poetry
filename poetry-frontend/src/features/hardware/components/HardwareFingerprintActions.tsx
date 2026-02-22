/*
 * File: HardwareFingerprintActions.tsx
 * Purpose: Action buttons for the hardware fingerprint table.
 * Extracted into its own component to follow single-responsibility
 * and match the pattern used in the users list.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Inline } from '../../../ui/Inline/Inline'
import { Button } from '../../../ui/Button/Button'
import type { MergedFingerprint } from './HardwareFingerprintTableShell'

import { useLocale } from '../../../shared/i18n/hooks/useLocale'

export interface HardwareFingerprintActionsProps {
  row: MergedFingerprint
  t: (k: string) => string
}

export function HardwareFingerprintActions({
  row,
  t,
}: HardwareFingerprintActionsProps): ReactElement {
  const { locale } = useLocale()
  return (
    <Inline gap="xs">
      <Button
        to={`/${locale}/hardware/fingerprints/${String(row.id)}`}
        size="sm"
        width="fixed-small"
        data-testid={`view-fp-${String(row.id)}`}
      >
        {t('ui.hardware.fingerprints.table.view')}
      </Button>
    </Inline>
  )
}
