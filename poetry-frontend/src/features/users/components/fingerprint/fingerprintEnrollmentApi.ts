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
  console.log('[FP] Reserve slot response:', data)
  console.log('[FP] slotId value:', data.slotId, 'type:', typeof data.slotId)

  const slotId = Number(data.slotId)
  if (isNaN(slotId)) {
    throw new Error(`Invalid slotId received: ${data.slotId}`)
  }

  return slotId
}

export async function enrollWithHardware(
  slotId: number
): Promise<{ success: boolean; slotId: number; message: string }> {
  console.log('[FP] Enrolling with hardware, slotId:', slotId, 'type:', typeof slotId)

  const payload = { slotId }
  console.log('[FP] Request payload:', JSON.stringify(payload))

  const response = await fetch(`/hardware/fingerprint/enroll`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  console.log('[FP] Hardware response status:', response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('[FP] Hardware enrollment failed:', errorText)
    throw new Error('Hardware enrollment failed')
  }

  const result = (await response.json()) as {
    success: boolean
    slotId: number
    message: string
  }

  console.log('[FP] Hardware enrollment result:', result)
  return result
}
