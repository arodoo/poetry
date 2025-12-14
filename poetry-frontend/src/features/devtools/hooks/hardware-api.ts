/*
 * File: hardware-api.ts
 * Purpose: API functions for hardware service communication
 * All Rights Reserved. Arodi Emmanuel
 */

const HARDWARE_URL = '/hardware'

export async function fetchUsedSlotsApi(): Promise<{
    count: number
    slots: number[]
}> {
    const res = await fetch(`${HARDWARE_URL}/fingerprint/used-slots`)
    return res.json()
}

export async function fetchAvailableSlotsApi(): Promise<{
    slots: number[]
    capacity?: number
}> {
    const res = await fetch(`${HARDWARE_URL}/fingerprint/available-slots`)
    return res.json()
}

export async function clearAllApi(): Promise<void> {
    await fetch(`${HARDWARE_URL}/fingerprint/clear-all`, { method: 'POST' })
}

export async function deleteSlotApi(slotId: number): Promise<boolean> {
    const res = await fetch(`${HARDWARE_URL}/fingerprint/template/${slotId}`, {
        method: 'DELETE'
    })
    return res.ok
}

export interface VerifyResult {
    success: boolean
    userId?: number
    message?: string
    error?: string
}

export async function verifyFingerprintApi(): Promise<VerifyResult> {
    const res = await fetch(`${HARDWARE_URL}/access/verify-and-unlock`, { method: 'POST' })
    return res.json()
}

