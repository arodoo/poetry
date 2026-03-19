/*
 * File: useLocaleUrlSync.ts
 * Purpose: Adds locale prefix to URLs that lack one (e.g., /dashboard → /en/dashboard).
 *
 * IMPORTANT: This hook NEVER rewrites existing locale prefixes.
 * If a user navigates to /es/profile, they stay on /es/profile.
 * The system locale only affects URLs without a locale prefix.
 *
 * This prevents infinite loops where:
 * /es/profile → /en/profile (sync) → /en/login (guard) → /es/login (sync) → /es/profile (loop!)
 *
 * Must be called from inside a Router (e.g. AppRouteTree) so useNavigate
 * is available. All Rights Reserved. Arodi Emmanuel
 */
import { useContext, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { I18nCtx } from '../../i18n/context'

const LOCALE_RE = /^\/([a-z]{2})(\/|$)/
const VALID_LOCALE_RE = /^[a-z]{2}$/

export function useLocaleUrlSync(): void {
  const ctx = useContext(I18nCtx)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isFirstRender = useRef(true)
  const previousPathname = useRef(pathname)

  useEffect((): void => {
    const systemLocale = ctx?.locale

    if (!systemLocale || !VALID_LOCALE_RE.test(systemLocale)) {
      return
    }

    const urlLocale = LOCALE_RE.exec(pathname)?.[1]

    if (urlLocale) {
      previousPathname.current = pathname
      isFirstRender.current = false
      return
    }

    if (!urlLocale && systemLocale) {
      const newPath = `/${systemLocale}${pathname}`

      if (isFirstRender.current || pathname !== previousPathname.current) {
        navigate(newPath, { replace: true })
        previousPathname.current = newPath
      }

      isFirstRender.current = false
    }
  }, [ctx?.locale, pathname, navigate])
}
