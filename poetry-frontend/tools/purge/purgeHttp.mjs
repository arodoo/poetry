/*
 * File: purgeHttp.mjs
 * Purpose: Auth + low-level HTTP helpers for the standalone purge
 * script. Logs in once and exposes JSON GET and ETag-aware DELETE
 * primitives reused by every purge step.
 * All Rights Reserved. Arodi Emmanuel
 */

const BASE = process.env.PURGE_BASE_URL || 'http://localhost:8080'

let token = ''

export async function login(user = 'admin', pass = 'ChangeMe123!') {
  const r = await fetch(`${BASE}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password: pass }),
  })
  if (!r.ok) throw new Error(`login failed: ${r.status}`)
  const body = await r.json()
  token = body.accessToken
}

export async function getJson(url) {
  const r = await fetch(`${BASE}${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!r.ok) return null
  return r.json()
}

export async function deleteWithEtag(url) {
  const head = await fetch(`${BASE}${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!head.ok) return false
  const etag = head.headers.get('etag') || ''
  let ifMatch = etag
  try {
    const body = await head.clone().json()
    if (body && typeof body.version === 'number') {
      ifMatch = String(body.version)
    }
  } catch {
    // body may not be json or already consumed; fall back to etag
  }
  const headers = { Authorization: `Bearer ${token}` }
  if (ifMatch) headers['If-Match'] = ifMatch
  const del = await fetch(`${BASE}${url}`, { method: 'DELETE', headers })
  return del.ok
}
