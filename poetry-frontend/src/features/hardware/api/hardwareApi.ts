/*
 * File: hardwareApi.ts
 * Purpose: API wrapper for hardware status and scanner control.
 * Uses fetchJson with automatic JWT authentication.
 * All Rights Reserved. Arodi Emmanuel
 */

import { fetchJson } from '../../../shared/http/fetchClient'
import {
  HardwareStatusSchema,
  type HardwareStatus,
} from '../model/hardwareStatusSchema'

export async function getHardwareStatus(): Promise<HardwareStatus> {
  const response = await fetchJson<unknown>('/api/v1/hardware/status')
  return HardwareStatusSchema.parse(response)
}

export async function startScanner(): Promise<{ scanning: boolean }> {
  return fetchJson<{ scanning: boolean }>('/api/v1/hardware/scanner/start', {
    method: 'POST',
  })
}

export async function stopScanner(): Promise<{ scanning: boolean }> {
  return fetchJson<{ scanning: boolean }>('/api/v1/hardware/scanner/stop', {
    method: 'POST',
  })
}
