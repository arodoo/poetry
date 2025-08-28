/*
 * File: i18n-filters.mjs
 * Purpose: String filtering logic for i18n scanner. Determines which
 * strings are likely user-facing and require externalization to message
 * bundles. Separated for reusability and testability.
 * All Rights Reserved. Arodi Emmanuel
 */

export function looksLikeKey(str) {
  return /^[a-z0-9_.-]+$/.test(str)
}

export function isSuppress(line) {
  return /i18n-ignore/.test(line)
}

export function shouldFlag(str) {
  if (!/[a-zA-Z]/.test(str)) return false
  if (looksLikeKey(str)) return false
  const words = str.trim().split(/\s+/)
  if (words.length < 2) return false
  if (str.length < 15) return false
  // Skip typical logger placeholders
  if (/%s|\{\}|\{\d+\}/.test(str)) return false
  return true
}
