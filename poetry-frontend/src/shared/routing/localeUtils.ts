/*
 File: localeUtils.ts
 Purpose: Utilities to extract the current locale from URL paths and
 build locale-aware redirect paths for authentication flows.
 All Rights Reserved. Arodi Emmanuel
*/
import { getEnv } from '../config/env'

export function getCurrentLocale(): string {
  const pathname: string = window.location.pathname
  const regex: RegExp = /^\/([a-z]{2})(\/|$)/
  const match: RegExpExecArray | null = regex.exec(pathname)
  if (match?.[1]) return match[1]
  return getEnv().VITE_DEFAULT_LOCALE
}

export function buildLocalePath(path: string): string {
  const locale: string = getCurrentLocale()
  const cleanPath: string = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${cleanPath}`
}
