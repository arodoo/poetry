/*
 * File: HardwareControls.tsx
 * Purpose: Control buttons for hardware debug page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { useT } from '../../../shared/i18n/useT'

interface HardwareControlsProps {
  loading: boolean
  onScan: () => void
  onScanAvailable: () => void
  onClear: () => void
}

export function HardwareControls({
  loading,
  onScan,
  onScanAvailable,
  onClear,
}: HardwareControlsProps): ReactElement {
  const t = useT()

  return (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={onScan} disabled={loading}>
        {t('ui.devtools.hardware.scanSlots')}
      </Button>
      <Button onClick={onScanAvailable} variant="secondary" disabled={loading}>
        Available Slots
      </Button>
      <Button onClick={onClear} variant="danger" disabled={loading}>
        {t('ui.devtools.hardware.clearAll')}
      </Button>
    </div>
  )
}
