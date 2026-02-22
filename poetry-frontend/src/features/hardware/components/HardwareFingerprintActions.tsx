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

export interface HardwareFingerprintActionsProps {
  row: MergedFingerprint
  onView: (row: MergedFingerprint) => void
  t: (k: string) => string
}

export function HardwareFingerprintActions({
  row,
  onView,
  t,
}: HardwareFingerprintActionsProps): ReactElement {
  return (
    <Inline gap="xs">
      <Button
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onView(row)
        }}
        size="sm"
        width="fixed-small"
        data-testid={`view-fp-${row.id}`}
      >
        {t('ui.hardware.fingerprints.table.view')}
      </Button>
    </Inline>
  )
}
