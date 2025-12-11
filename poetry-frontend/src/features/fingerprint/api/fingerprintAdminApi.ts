/*
 * File: fingerprintAdminApi.ts
 * Purpose: SDK wrapper functions for fingerprint admin endpoints.
 * Handles archived fingerprints listing and restoration calls.
 * All Rights Reserved. Arodi Emmanuel
 */

import { fetchJson } from '../../../shared/http/fetchClient'
import type { FingerprintResponse } from '../model/FingerprintSchemas'

const BASE_URL = '/api/v1/fingerprints'

export async function fetchArchivedFingerprints(
  token: string
): Promise<FingerprintResponse[]> {
  const all = await fetchJson<FingerprintResponse[]>(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return all.filter((fp: FingerprintResponse) => fp.status === 'ARCHIVED')
}

export async function restoreFingerprint(
  id: number,
  token: string
): Promise<FingerprintResponse> {
  return fetchJson<FingerprintResponse>(`${BASE_URL}/${String(id)}/restore`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
}
