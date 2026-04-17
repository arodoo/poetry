/*
 * File: ScannerActiveView.tsx
 * Purpose: UI fragment shown when the fingerprint scanner is
 * actively running. Displays listening message and stop button.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'

interface Props {
  t: (k: string) => string
  busy: boolean
  onStop: () => void
}

export function ScannerActiveView(p: Props): ReactElement {
  return (
    <>
      <Text size="sm" className="text-[var(--color-success)]">
        {p.t('ui.hardware.status.listening')}
      </Text>
      <Button
        size="sm"
        variant="danger"
        disabled={p.busy}
        onClick={p.onStop}
        data-testid="scanner-stop-btn"
      >
        {p.t('ui.hardware.scanner.stop')}
      </Button>
    </>
  )
}
