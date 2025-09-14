/*
 File: localeService.test.ts
 Purpose: Verifies the locale service uses the versioned API path. It also
 checks required request headers for JSON compatibility. These tests prevent
 regressions on i18n bootstrap behavior.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { localeService } from './localeService'

describe('localeService.fetchUserLocale', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('calls /api/v1/me/locale with headers', async () => {
    const json = vi.fn().mockResolvedValue({ locale: 'en' })
    const fetchMock = vi
      .spyOn(global, 'fetch' as never)
      .mockResolvedValue({ ok: true, status: 200, json } as never)

    const res = await localeService.fetchUserLocale('u1')

    expect(fetchMock).toHaveBeenCalledWith('/api/v1/me/locale', {
      headers: { 'X-User-Id': 'u1', Accept: 'application/json' },
    })
    expect(res.success).toBe(true)
    expect(res.locale).toBe('en')
  })
})
