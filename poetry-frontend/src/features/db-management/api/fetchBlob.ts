/*
 * File: fetchBlob.ts
 * Purpose: Raw fetch utility returning a Blob for binary file
 * downloads. Injects the Bearer token from tokenStorage and
 * bypasses the JSON-only fetchClient for binary endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */

import { getEnv } from '../../../shared/config/env'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

export async function fetchBlob(
  path: string,
  options: RequestInit = {}
): Promise<Blob> {
  const base: string = getEnv()
    .VITE_API_BASE_URL.replace(/\/$/, '')
  const url = `${base}${path}`
  const tokens = tokenStorage.load()
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  }
  if (tokens?.accessToken) {
    headers['Authorization'] =
      `Bearer ${tokens.accessToken}`
  }
  const response: Response = await fetch(url, {
    ...options,
    headers,
  })
  if (!response.ok) {
    throw new Error(
      `Download failed: ${response.status}`
    )
  }
  return response.blob()
}
