/*
 * File: useBirthdayAutoOpen.test.ts
 * Purpose: Verifies the birthday popup auto-opens exactly once per
 * local day when an auth session exists, is skipped for anonymous
 * visitors, and does not re-fire on re-render or on reload within
 * the same calendar day.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useBirthdayAutoOpen } from '../../../../features/birthday-check/hooks/useBirthdayAutoOpen'
import { tokenStorage } from '../../../../shared/security/tokens/tokenStorage'

const KEY: string = 'birthday-check:last-date'

function todayStr(): string {
  const d = new Date()
  const y = String(d.getFullYear()).padStart(4, '0')
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

describe('useBirthdayAutoOpen', (): void => {
  beforeEach((): void => {
    window.localStorage.clear()
    vi.restoreAllMocks()
  })

  it('fires once when session exists and no prior stamp', async (): Promise<void> => {
    vi.spyOn(tokenStorage, 'load').mockReturnValue({
      accessToken: 'a',
      refreshToken: 'r',
    })
    const trigger = vi.fn().mockResolvedValue(undefined)
    renderHook((): void => useBirthdayAutoOpen(trigger))
    expect(trigger).toHaveBeenCalledTimes(1)
    expect(window.localStorage.getItem(KEY)).toBe(todayStr())
  })

  it('does not fire when stamp equals today', (): void => {
    vi.spyOn(tokenStorage, 'load').mockReturnValue({
      accessToken: 'a',
      refreshToken: 'r',
    })
    window.localStorage.setItem(KEY, todayStr())
    const trigger = vi.fn().mockResolvedValue(undefined)
    renderHook((): void => useBirthdayAutoOpen(trigger))
    expect(trigger).not.toHaveBeenCalled()
  })

  it('does not fire without session', (): void => {
    vi.spyOn(tokenStorage, 'load').mockReturnValue(null)
    const trigger = vi.fn().mockResolvedValue(undefined)
    renderHook((): void => useBirthdayAutoOpen(trigger))
    expect(trigger).not.toHaveBeenCalled()
  })
})
