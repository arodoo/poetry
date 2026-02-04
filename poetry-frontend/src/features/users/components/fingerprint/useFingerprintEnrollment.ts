/*
 * File: useFingerprintEnrollment.ts
 * Purpose: Hook for managing fingerprint enrollment via hardware service.
 * Gets slot assignment from backend, enrolls via hardware, returns slotId.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState } from 'react'
// No reservation needed for HID model

// Global counter to track active enrollment listeners across the app
let activeListeners = 0
const MAX_LISTENERS = 2
const ENROLLMENT_TIMEOUT_MS = 30000

type EnrollmentState = 'idle' | 'capturing' | 'processing' | 'success' | 'error'

export function useFingerprintEnrollment(): {
  state: EnrollmentState
  fmd: string | null
  errorMessage: string
  startEnrollment: (onSuccess?: (fmd: string) => void) => Promise<void>
  reset: () => void
} {
  const [state, setState] = useState<EnrollmentState>('idle')
  const [fmd, setFmd] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function startEnrollment(
    onSuccess?: (fmd: string) => void
  ): Promise<void> {
    if (activeListeners >= MAX_LISTENERS) {
      setState('error')
      setErrorMessage('ui.users.fingerprint.errors.tooManyListeners')
      return
    }

    activeListeners++
    setState('capturing')
    setErrorMessage('')

    try {
      // Simulation: Wait for capture or timeout
      const capturePromise = new Promise<string>((resolve) => {
        // In a real scenario, this would be an event listener from the SDK
        // Here we simulate a "human" taking some time to put the finger
        setTimeout(() => {
          resolve('MOCK_FMD_DATA_' + Date.now().toString())
        }, 5000) // Simulate 5s for the user to actually "put" the finger
      })

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('ui.users.fingerprint.errors.timeout'))
        }, ENROLLMENT_TIMEOUT_MS)
      })

      const capturedFmd = await Promise.race([capturePromise, timeoutPromise])

      setFmd(capturedFmd)
      setState('success')
      onSuccess?.(capturedFmd)
    } catch (error) {
      setState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      activeListeners = Math.max(0, activeListeners - 1)
    }
  }

  function reset(): void {
    setState('idle')
    setFmd(null)
    setErrorMessage('')
  }

  return { state, fmd, errorMessage, startEnrollment, reset }
}
