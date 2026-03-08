/*
 * File: useApplyTokenLanguage.ts
 * Purpose: Synchronizes the language field from the token bundle with the
 * i18n locale system and the URL prefix. When the backend token selection
 * changes the language, this hook reacts and switches the active locale
 * so the UI reflects the chosen language immediately.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect, useRef } from 'react'
import { useLocale } from '../../i18n/hooks/useLocale'
import { getCurrentLocale } from '../../routing/localeUtils'

export default function useApplyTokenLanguage(
  language: string | undefined
): void {
  const { setLocale } = useLocale()
  const prevRef = useRef<string | undefined>(undefined)

  useEffect((): void => {
    if (!language) return
    const urlLocale = getCurrentLocale()
    if (prevRef.current === language) return
    prevRef.current = language
    if (language === urlLocale) return
    setLocale(language)
    const path = window.location.pathname
    const newPath = path.replace(/^\/[a-z]{2}(\/|$)/, `/${language}$1`)
    if (newPath !== path) {
      window.history.replaceState(null, '', newPath)
    }
  }, [language, setLocale])
}
