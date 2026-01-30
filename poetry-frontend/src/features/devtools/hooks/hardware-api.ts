/*
 * File: hardware-api.ts
 * Purpose: API functions for hardware service communication with sensors.
 * Provides fetch functions for slot management and fingerprint verification.
 * Handles used slots, available slots, clear all, and delete operations.
 * All Rights Reserved. Arodi Emmanuel
 */

const HARDWARE_URL = '/hardware'

export async function fetchUsedSlotsApi(): Promise<{
  count: number
  slots: number[]
}> {
  const res = await fetch(`${HARDWARE_URL}/fingerprint/used-slots`)
  const body = (await res.json()) as {
    count: number
    slots: number[]
  }
  return body
}

export async function fetchAvailableSlotsApi(): Promise<{
  slots: number[]
  capacity?: number
}> {
  const res = await fetch(`${HARDWARE_URL}/fingerprint/available-slots`)
  const body = (await res.json()) as {
    slots: number[]
    capacity?: number
  }
  return body
}

export async function clearAllApi(): Promise<void> {
  await fetch(`${HARDWARE_URL}/fingerprint/clear-all`, { method: 'POST' })
}

export async function deleteSlotApi(slotId: number): Promise<boolean> {
  const res = await fetch(
    `${HARDWARE_URL}/fingerprint/template/${String(slotId)}`,
    {
      method: 'DELETE',
    }
  )
  return res.ok
}

export interface VerifyResult {
  success: boolean
  userId?: number
  message?: string
  error?: string
}

export async function verifyFingerprintApi(): Promise<VerifyResult> {
  const res = await fetch(`${HARDWARE_URL}/access/verify-and-unlock`, {
    method: 'POST',
  })
  const body = (await res.json()) as VerifyResult
  return body
}
