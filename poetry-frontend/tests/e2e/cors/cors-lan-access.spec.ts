/*
 * File: cors-lan-access.spec.ts
 * Purpose: Validates CORS headers allow access from private
 * network IPs (192.168.x, 10.x). Critical for LAN deploys
 * where clients access the app from non-localhost origins.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:8080'
const API = `${BASE}/api/v1/auth/login`

const ALLOWED_ORIGINS = [
  'http://192.168.1.50:8080',
  'http://10.0.0.5:8080',
  'http://localhost:5173',
]

test.describe('CORS — LAN access', (): void => {
  for (const origin of ALLOWED_ORIGINS) {
    test(`preflight allows ${origin}`, async ({
      request,
    }): Promise<void> => {
      const r = await request.fetch(API, {
        method: 'OPTIONS',
        headers: {
          Origin: origin,
          'Access-Control-Request-Method': 'POST',
        },
      })
      const acao = r.headers()['access-control-allow-origin']
      expect(acao).toBe(origin)
    })
  }

  test('rejects unknown external origin', async ({
    request,
  }): Promise<void> => {
    const r = await request.fetch(API, {
      method: 'OPTIONS',
      headers: {
        Origin: 'http://evil.com',
        'Access-Control-Request-Method': 'POST',
      },
    })
    const acao = r.headers()['access-control-allow-origin']
    expect(acao).toBeUndefined()
  })
})
