/*
 * File: TryConnectButton.tsx
 * Purpose: Manual trigger that re-probes the fingerprint reader
 * on demand. Replaces the old auto-polling loop that blocked
 * the UI when no reader was attached. Click invalidates the
 * hardware status query, emitting a single network request.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '../../../ui/Button/Button'
import { useT } from '../../../shared/i18n/useT'
import { HARDWARE_STATUS_KEY } from '../hooks/useHardwareStatusQuery'

interface Props {
  isFetching: boolean
}

export function TryConnectButton({ isFetching }: Props): ReactElement {
  const t = useT()
  const qc = useQueryClient()
  const onClick = async (): Promise<void> => {
    await qc.invalidateQueries({
      queryKey: [...HARDWARE_STATUS_KEY],
    })
  }
  return (
    <Button
      type="button"
      variant="primary"
      size="sm"
      onClick={onClick}
      disabled={isFetching}
      data-testid="hardware-try-connect"
    >
      {isFetching
        ? t('ui.hardware.status.tryConnect.loading')
        : t('ui.hardware.status.tryConnect')}
    </Button>
  )
}
