/*
 * File: useScannerActions.ts
 * Purpose: Hook encapsulating start/stop scanner API calls with
 * loading state and query invalidation. Keeps ScannerControls
 * component thin and testable.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { startScanner, stopScanner } from '../api/hardwareApi'

interface ScannerActions {
  busy: boolean
  onStart: () => void
  onStop: () => void
}

export function useScannerActions(): ScannerActions {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)

  const onStart = useCallback(() => {
    setBusy(true)
    void startScanner()
      .then(() => qc.invalidateQueries({ queryKey: ['hardware'] }))
      .finally(() => setBusy(false))
  }, [qc])

  const onStop = useCallback(() => {
    setBusy(true)
    void stopScanner()
      .then(() => qc.invalidateQueries({ queryKey: ['hardware'] }))
      .finally(() => setBusy(false))
  }, [qc])

  return { busy, onStart, onStop }
}
