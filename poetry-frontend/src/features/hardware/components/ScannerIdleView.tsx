/*
 * File: ScannerIdleView.tsx
 * Purpose: UI fragment shown when the fingerprint scanner is
 * idle. Displays idle message and start button.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'

interface Props {
  t: (k: string) => string
  busy: boolean
  onStart: () => void
}

export function ScannerIdleView(p: Props): ReactElement {
  return (
    <>
      <Text size="sm" className="text-[var(--color-text-muted)]">
        {p.t('ui.hardware.scanner.idle')}
      </Text>
      <Button
        size="sm"
        disabled={p.busy}
        onClick={p.onStart}
        data-testid="scanner-start-btn"
      >
        {p.t('ui.hardware.scanner.start')}
      </Button>
    </>
  )
}
