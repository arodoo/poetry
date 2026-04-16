/*
 * File: global-setup.ts
 * Purpose: Playwright global setup resets system language to
 * English so E2E tests run in a consistent locale.
 * All Rights Reserved. Arodi Emmanuel
 */
import { request } from '@playwright/test'

const BASE = 'http://localhost:8080'
const USER = 'admin'
const PASS = 'ChangeMe123!'

async function resetLanguageToEnglish(): Promise<void> {
  const ctx = await request.newContext({ baseURL: BASE })
  const loginResp = await ctx.post('/api/v1/auth/login', {
    data: { username: USER, password: PASS },
    headers: { 'Content-Type': 'application/json' },
  })
  if (!loginResp.ok()) {
    throw new Error('Global setup login failed')
  }
  const { accessToken } = (await loginResp.json()) as {
    accessToken: string
  }
  const tokensResp = await ctx.get('/api/v1/tokens')
  if (!tokensResp.ok()) {
    throw new Error('Failed to fetch tokens')
  }
  const { current } = (await tokensResp.json()) as {
    current: Record<string, string>
  }
  await ctx.put('/api/v1/tokens/selection', {
    data: { ...current, language: 'en' },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  await ctx.dispose()
}

export default async function globalSetup(): Promise<void> {
  await resetLanguageToEnglish()
}
