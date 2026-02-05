/*
 * File: hardwareApi.ts
 * Purpose: API wrapper for hardware status endpoint.
 * Uses fetchJson with automatic JWT authentication.
 * All Rights Reserved. Arodi Emmanuel
 */

import { fetchJson } from '../../../shared/http/fetchClient'
import { HardwareStatusSchema, type HardwareStatus } from '../model/hardwareStatusSchema'

export async function getHardwareStatus(): Promise<HardwareStatus> {
    const response = await fetchJson<unknown>('/api/v1/hardware/status')
    return HardwareStatusSchema.parse(response)
}
