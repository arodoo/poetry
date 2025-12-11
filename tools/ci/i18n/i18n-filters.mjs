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

export function shouldFlag(str, line, type) {
  if (!/[a-zA-Z]/.test(str)) return false
  if (looksLikeKey(str)) return false
  const words = str.trim().split(/\s+/)
  if (words.length < 2) return false
  if (str.length < 15) return false
  // Skip typical logger placeholders
  if (/%s|\{\}|\{\d+\}/.test(str)) return false
  // Skip CSS classes with variables
  if (str.includes('[var(--')) return false
  // Skip SQL queries
  if (/^(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|ORDER BY|GROUP BY) /i.test(str)) return false

  // Skip CSS classes in className attributes (only for quoted strings)
  if (type === 'QUOTE' && line && (line.includes('className') || line.includes('class='))) {
    // If string contains dashes or is all lowercase, assume it's a class
    if (str.includes('-') || str === str.toLowerCase()) {
      return false
    }
  }

  return true
}
