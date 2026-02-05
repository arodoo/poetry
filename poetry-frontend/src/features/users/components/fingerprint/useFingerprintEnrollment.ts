/*
 * File: useFingerprintEnrollment.ts
 * Purpose: Hook for managing fingerprint enrollment via backend HID capture.
 * Calls backend /capture endpoint and returns captured FMD.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState, useRef } from 'react'
import { tokenStorage } from '../../../../shared/security/tokens/tokenStorage'

type EnrollmentState = 'idle' | 'capturing' | 'processing' | 'success' | 'error'

const CAPTURE_TIMEOUT_MS = 30000

export function useFingerprintEnrollment(): {
  state: EnrollmentState
  fmd: string | null
  errorMessage: string
  startEnrollment: (onSuccess?: (fmd: string) => void) => Promise<void>
  cancelEnrollment: () => void
  reset: () => void
} {
  const [state, setState] = useState<EnrollmentState>('idle')
  const [fmd, setFmd] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const abortRef = useRef<AbortController | null>(null)

  async function startEnrollment(
    onSuccess?: (fmd: string) => void
  ): Promise<void> {
    abortRef.current = new AbortController()
    const { signal } = abortRef.current
    setState('capturing')
    setErrorMessage('')

    try {
      const baseUrl =
        (import.meta.env['VITE_API_URL'] as string | undefined) ??
        'http://localhost:8080'
      const tokens = tokenStorage.load()
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (tokens?.accessToken) {
        headers['Authorization'] = `Bearer ${tokens.accessToken}`
      }

      const response = await fetch(`${baseUrl}/api/v1/fingerprints/capture`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ timeoutMs: CAPTURE_TIMEOUT_MS }),
        signal,
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('ui.users.fingerprint.errors.unauthorized')
        }
        if (response.status === 503) {
          throw new Error('ui.users.fingerprint.errors.readerUnavailable')
        }
        throw new Error('ui.users.fingerprint.errors.captureFailed')
      }

      const result = (await response.json()) as {
        success: boolean
        fmd: string | null
        errorCode: string | null
      }

      if (result.success && result.fmd) {
        setFmd(result.fmd)
        setState('success')
        onSuccess?.(result.fmd)
      } else {
        throw new Error(`ui.users.fingerprint.errors.${result.errorCode}`)
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setState('error')
        setErrorMessage('ui.users.fingerprint.errors.cancelled')
      } else {
        setState('error')
        setErrorMessage(
          error instanceof Error ? error.message : 'Unknown error'
        )
      }
    } finally {
      abortRef.current = null
    }
  }

  function cancelEnrollment(): void {
    abortRef.current?.abort()
  }

  function reset(): void {
    setState('idle')
    setFmd(null)
    setErrorMessage('')
  }

  return { state, fmd, errorMessage, startEnrollment, cancelEnrollment, reset }
}
