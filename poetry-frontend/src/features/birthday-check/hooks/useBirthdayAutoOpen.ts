/*
 * File: useBirthdayAutoOpen.ts
 * Purpose: Auto-trigger the birthday popup at most once per local day
 * when a user session is present. Stores the last-fired date in
 * localStorage so reloads within the same day do not re-open it.
 * Honors the user's timezone via Date.toISOString().slice(0,10) over
 * the local clock to match backend zoned "today".
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect, useRef } from 'react'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

const STORAGE_KEY: string = 'birthday-check:last-date'

function todayLocal(): string {
  const d: Date = new Date()
  const y: string = String(d.getFullYear()).padStart(4, '0')
  const m: string = String(d.getMonth() + 1).padStart(2, '0')
  const day: string = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function useBirthdayAutoOpen(trigger: () => Promise<void>): void {
  const fired = useRef<boolean>(false)
  useEffect((): void => {
    if (fired.current) return
    const session = tokenStorage.load()
    if (!session?.accessToken) return
    const today: string = todayLocal()
    if (window.localStorage.getItem(STORAGE_KEY) === today) return
    fired.current = true
    window.localStorage.setItem(STORAGE_KEY, today)
    void trigger()
  }, [trigger])
}
