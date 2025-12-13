/*
 * File: slot-reservation.ts
 * Purpose: Backend slot reservation for fingerprint enrollment.
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

    const response = await fetch(
        `${baseUrl}/api/v1/fingerprints/reserve-slot`,
        { method: 'POST', headers, credentials: 'include' }
    )

    if (!response.ok) {
        throw new Error('Failed to reserve slot')
    }

    const data = (await response.json()) as { slotId: number }
    console.log('[FP] Reserve slot response:', data)
    console.log('[FP] slotId:', data.slotId, 'type:', typeof data.slotId)

    const slotId = Number(data.slotId)
    if (isNaN(slotId)) {
        throw new Error(`Invalid slotId: ${data.slotId}`)
    }

    return slotId
}
