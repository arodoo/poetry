/*
 * File: rollback-fingerprint.ts
 * Purpose: Rollback fingerprint enrollment if user creation fails or is cancelled.
 * All Rights Reserved. Arodi Emmanuel
 */

const HARDWARE_URL = '/hardware'

export async function rollbackFingerprint(slotId: number): Promise<void> {
    try {
        await fetch(`${HARDWARE_URL}/fingerprint/template/${slotId}`, {
            method: 'DELETE'
        })
    } catch (error) {
        console.error('Failed to rollback fingerprint:', error)
    }
}
