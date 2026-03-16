/*
 * File: uploadMultipart.ts
 * Purpose: Raw fetch utility for multipart file uploads. Injects
 * the Bearer token and lets the browser set the Content-Type
 * boundary automatically for FormData submissions.
 * All Rights Reserved. Arodi Emmanuel
 */

import { getEnv } from '../../../shared/config/env'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

export async function uploadMultipart<T>(
  path: string,
  file: File
): Promise<T> {
  const base: string = getEnv()
    .VITE_API_BASE_URL.replace(/\/$/, '')
  const url = `${base}${path}`
  const tokens = tokenStorage.load()
  const headers: Record<string, string> = {}
  if (tokens?.accessToken) {
    headers['Authorization'] =
      `Bearer ${tokens.accessToken}`
  }
  const formData = new FormData()
  formData.append('file', file)
  const response: Response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  })
  if (!response.ok) {
    throw new Error(
      `Upload failed: ${response.status}`
    )
  }
  return response.json() as Promise<T>
}
