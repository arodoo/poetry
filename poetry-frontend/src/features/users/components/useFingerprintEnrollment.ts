/*
 * File: useFingerprintEnrollment.ts
 * Purpose: Hook for managing fingerprint enrollment state and API calls.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState } from 'react'

type EnrollmentState = 'idle' | 'capturing' | 'processing' | 'success' | 'error'

interface EnrollmentResult {
  slotId: number
  status: string
}

export function useFingerprintEnrollment(userId: number): {
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
      const url = '/api/v1/users/' + userId.toString() + '/fingerprints/enroll'
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error('HTTP ' + String(response.status))
      }

      const data = (await response.json()) as EnrollmentResult
      setSlotId(data.slotId)
      setState('success')
      onSuccess?.(data.slotId)
    } catch (error) {
      setState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  function reset(): void {
    setState('idle')
    setErrorMessage('')
  }

  return { state, slotId, errorMessage, startEnrollment, reset }
}
