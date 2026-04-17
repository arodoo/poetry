/*
 * File: cors-boops-mx.spec.ts
 * Purpose: Validates CORS accepts http://boops.mx origins so
 * LAN clients using a hosts-file entry can reach the backend
 * with no internet connectivity required.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'

const API = 'http://localhost:8080/api/v1/auth/login'

const ALLOWED = [
  'http://boops.mx',
  'http://boops.mx:8080',
  'http://boops.mx:5173',
]

test.describe('CORS — boops.mx LAN domain', (): void => {
  for (const origin of ALLOWED) {
    test(`preflight allows ${origin}`, async ({ request }): Promise<void> => {
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
})
