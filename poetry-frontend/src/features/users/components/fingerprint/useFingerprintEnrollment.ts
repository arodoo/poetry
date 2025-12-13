/*
 * File: useFingerprintEnrollment.ts
 * Purpose: Hook for managing fingerprint enrollment via hardware service.
 * Gets slot assignment from backend, enrolls via hardware, returns slotId.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState } from 'react'
import {
  reserveSlotFromBackend,
  enrollWithHardware,
} from './fingerprintEnrollmentApi'
import { rollbackFingerprint } from './rollback-fingerprint'

type EnrollmentState = 'idle' | 'capturing' | 'processing' | 'success' | 'error'

export function useFingerprintEnrollment(): {
  state: EnrollmentState
  slotId: number | null
  errorMessage: string
  startEnrollment: (onSuccess?: (slot: number) => void) => Promise<void>
  reset: () => void
} {
  const [state, setState] = useState<EnrollmentState>('idle')
  const [slotId, setSlotId] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function startEnrollment(
    onSuccess?: (slot: number) => void
  ): Promise<void> {
    setState('capturing')
    setErrorMessage('')

    try {
      const assignedSlot = await reserveSlotFromBackend()
      setState('processing')

      const enrollData = await enrollWithHardware(assignedSlot)

      if (!enrollData.success) {
        throw new Error(enrollData.message || 'Enrollment failed')
      }

      setSlotId(enrollData.slotId)
      setState('success')
      onSuccess?.(enrollData.slotId)
    } catch (error) {
      setState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  function reset(): void {
    if (slotId !== null) {
      void rollbackFingerprint(slotId)
    }
    setState('idle')
    setSlotId(null)
    setErrorMessage('')
  }

  return { state, slotId, errorMessage, startEnrollment, reset }
}
