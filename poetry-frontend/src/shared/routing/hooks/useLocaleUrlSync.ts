/*
 * File: useLocaleUrlSync.ts
 * Purpose: Syncs React Router's location with the active i18n locale.
 * Must be called from inside a Router (e.g. AppRouteTree) so useNavigate
 * is available. When the i18n locale changes (after saving a new system
 * language in the tokens admin), replaces the :locale URL segment via
 * React Router navigate so that route params, sidebar links, and all
 * Router-aware components immediately reflect the new locale.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { I18nCtx } from '../../i18n/context'

const LOCALE_RE = /^\/([a-z]{2})(\/|$)/

export function useLocaleUrlSync(): void {
  const ctx = useContext(I18nCtx)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect((): void => {
    const locale = ctx?.locale
    if (!locale) return
    const urlLocale = LOCALE_RE.exec(pathname)?.[1]
    if (!urlLocale || locale === urlLocale) return
    const newPath = pathname.replace(LOCALE_RE, `/${locale}$2`)
    navigate(newPath, { replace: true })
  }, [ctx?.locale, pathname, navigate])
}
