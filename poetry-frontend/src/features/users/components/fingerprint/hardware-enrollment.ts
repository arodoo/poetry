/*
 * File: hardware-enrollment.ts
 * Purpose: Hardware service enrollment API calls for R503 sensor.
 * All Rights Reserved. Arodi Emmanuel
 */

export async function enrollWithHardware(
    slotId: number
): Promise<{ success: boolean; slotId: number; message: string }> {
    console.log('[FP] Enrolling, slotId:', slotId, 'type:', typeof slotId)

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
