/*
 * File: fingerprintApi.ts
 * Purpose: SDK wrapper functions for fingerprint endpoints.
 * Provides authentication and error handling for enrollment and verification.
 * Injects bearer tokens and handles API responses.
 * All Rights Reserved. Arodi Emmanuel
 */

import {
  listFingerprints,
  verifyFingerprint as sdkVerifyFingerprint,
  create2,
} from '../../../api/generated'
import type {
  EnrollRequest,
  VerifyRequest,
  FingerprintResponse,
  VerifyResponse,
} from '../model/FingerprintSchemas'

export async function fetchFingerprints(
  token: string
): Promise<FingerprintResponse[]> {
  const response = await listFingerprints({
    headers: { Authorization: `Bearer ${token}` },
  })
  if (response.error) {
    throw new Error(JSON.stringify(response.error))
  }
  return response.data ?? []
}

export async function enrollFingerprint(
  data: EnrollRequest,
  token: string
): Promise<FingerprintResponse> {
  const response = await create2({
    body: data,
    headers: { Authorization: `Bearer ${token}` },
  })
  if (response.error) {
    throw new Error(JSON.stringify(response.error))
  }
  if (!response.data) {
    throw new Error('No data returned from enrollment')
  }
  return response.data
}

export async function verifyFingerprint(
  data: VerifyRequest,
  token: string
): Promise<VerifyResponse> {
  const response = await sdkVerifyFingerprint({
    body: data,
    headers: { Authorization: `Bearer ${token}` },
  })
  if (response.error) {
    throw new Error(JSON.stringify(response.error))
  }
  return response.data
}

export async function deleteFingerprint(
  id: number,
  token: string
): Promise<void> {
  const response = await fetch(`/api/v1/fingerprints/${String(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) {
    throw new Error(`Delete failed: ${String(response.status)}`)
  }
}
