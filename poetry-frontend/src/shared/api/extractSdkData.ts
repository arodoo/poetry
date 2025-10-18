/*
 * File: extractSdkData.ts
 * Purpose: Small utility to centralize extracting `response.data` from generated SDK responses.
 * All Rights Reserved. Arodi Emmanuel
 */

export function extractSdkData(responseUnknown: unknown): unknown {
  return ((responseUnknown as { data?: unknown }).data ?? {}) as unknown
}
