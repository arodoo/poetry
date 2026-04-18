/*
 * File: cleanupApi.ts
 * Purpose: Thin authenticated HTTP helpers used by the e2e
 * teardown to enumerate and delete leftover test rows.
 * All Rights Reserved. Arodi Emmanuel
 */
import { request as pw } from '@playwright/test'
import type { APIRequestContext, APIResponse } from '@playwright/test'
import { getAuthTokens } from '../providers/tokenProvider'

export async function adminCtx(): Promise<APIRequestContext> {
  const t = await getAuthTokens()
  return pw.newContext({
    baseURL: 'http://localhost:8080',
    extraHTTPHeaders: {
      Authorization: `Bearer ${t.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
}

export async function deleteWithEtag(
  ctx: APIRequestContext,
  url: string
): Promise<boolean> {
  const head: APIResponse = await ctx.get(url)
  if (!head.ok()) return false
  const etag = head.headers()['etag'] ?? ''
  let ifMatch = etag
  try {
    const body = (await head.json()) as { version?: number }
    if (typeof body.version === 'number') ifMatch = String(body.version)
  } catch {
    // body might not be json; use etag as-is
  }
  const del = await ctx.delete(url, {
    headers: ifMatch ? { 'If-Match': ifMatch } : {},
  })
  return del.ok()
}
