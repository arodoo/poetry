/*
 * File: fingerprintEnrollmentApi.ts
 * Purpose: API calls for fingerprint enrollment workflow. Reserves slot from
 * backend and enrolls via hardware service with R503 sensor protocol.
 * All Rights Reserved. Arodi Emmanuel
 */

import { tokenStorage } from '../../../../shared/security/tokens/tokenStorage'

export async function reserveSlotFromBackend(): Promise<number> {
  const baseUrl =
    (import.meta.env['VITE_API_URL'] as string | undefined) ??
    'http://localhost:8080'

  const token = tokenStorage.load()?.accessToken
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${baseUrl}/api/v1/fingerprints/reserve-slot`, {
    method: 'POST',
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to reserve slot')
  }

  const data = (await response.json()) as { slotId: number }
  return data.slotId
}

export async function enrollWithHardware(
  slotId: number
): Promise<{ success: boolean; slotId: number; message: string }> {
  const hardwareUrl = 'http://localhost:3002'
  const response = await fetch(`${hardwareUrl}/api/fingerprint/enroll`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slotId }),
  })

  if (!response.ok) {
    throw new Error('Hardware enrollment failed')
  }

  return (await response.json()) as {
    success: boolean
    slotId: number
    message: string
  }
}
