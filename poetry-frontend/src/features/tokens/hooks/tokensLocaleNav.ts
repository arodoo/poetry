/*
 * File: tokensLocaleNav.ts
 * Purpose: Navigate to new locale URL after language change.
 * All Rights Reserved. Arodi Emmanuel
 */

const LOCALE_RE = /^\/([a-z]{2})(\/|$)/

type NavFn = (path: string, opts?: { replace?: boolean }) => void

export function navigateToNewLocale(
  newLang: string | undefined,
  currentPath: string,
  navigate: NavFn
): void {
  const match = LOCALE_RE.exec(currentPath)
  const urlLocale = match?.[1]
  if (!newLang || !urlLocale || newLang === urlLocale) return
  const newPath = currentPath.replace(LOCALE_RE, `/${newLang}$2`)
  navigate(newPath, { replace: true })
}
