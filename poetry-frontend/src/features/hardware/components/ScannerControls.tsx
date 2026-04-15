/*
 * File: ScannerControls.tsx
 * Purpose: Manual start/stop controls for the fingerprint scanner.
 * Renders disconnected message or active/idle buttons. Logic
 * lives in useScannerActions hook.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { Text } from '../../../ui/Text/Text'
import { useScannerActions } from '../hooks/useScannerActions'
import type { HardwareStatus } from '../model/hardwareStatusSchema'
import { ScannerActiveView } from './ScannerActiveView'
import { ScannerIdleView } from './ScannerIdleView'

interface Props {
  status: HardwareStatus
}

export function ScannerControls({ status }: Props): ReactElement {
  const t = useT()
  const { busy, onStart, onStop } = useScannerActions()

  if (!status.connected) {
    return (
      <Text
        size="sm"
        className="mt-4 text-center text-[var(--color-text-muted)]"
        data-testid="scanner-disconnected"
      >
        {t('ui.hardware.scanner.disconnected')}
      </Text>
    )
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      {status.scanning ? (
        <ScannerActiveView t={t} busy={busy} onStop={onStop} />
      ) : (
        <ScannerIdleView t={t} busy={busy} onStart={onStart} />
      )}
    </div>
  )
}
