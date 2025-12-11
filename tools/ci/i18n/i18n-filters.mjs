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
  // Skip color values
  if (str.includes('hsl(') || str.includes('rgb(') || str.includes('rgba(') || str.includes('#')) return false
  // Skip SQL queries
  // Skip SQL queries
  if (/^(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|ORDER BY|GROUP BY|AND|OR|JOIN|LEFT JOIN|RIGHT JOIN|HAVING|LIMIT|OFFSET|SET|VALUES) /i.test(str)) return false

  // Skip CSS classes in className attributes (only for quoted strings)
  if (type === 'QUOTE' && line && (line.includes('className') || line.includes('class='))) {
    // If string contains dashes or is all lowercase, assume it's a class
    if (str.includes('-') || str === str.toLowerCase()) {
      return false
    }
  }

  // Skip log messages (if line context is available)
  if (line && (line.includes('log.') || line.includes('logger.') || line.includes('System.out.') || line.includes('System.err.'))) {
    return false
  }

  // Skip Swagger/OpenAPI annotations
  if (line && (line.includes('@Schema') || line.includes('@Operation') || line.includes('@ApiResponse') || line.includes('@Parameter') || line.includes('@Tag'))) {
    return false
  }

  // Skip @PreAuthorize and hasAnyAuthority (Spring Security)
  if (line && (line.includes('@PreAuthorize') || line.includes('hasAnyAuthority') || line.includes('hasAuthority'))) {
    return false
  }

  // Skip SVG path data (d attribute values)
  if (/^[MmLlHhVvCcSsQqTtAaZz0-9\s.,+-]+$/.test(str)) {
    return false
  }

  // Skip @Scheduled cron expressions
  if (line && line.includes('@Scheduled')) {
    return false
  }

  // Skip Swagger summary and description attributes
  if (line && (line.includes('summary =') || line.includes('description ='))) {
    return false
  }

  // Skip console CSS styling
  if (str.includes('color:') && str.includes('background:')) {
    return false
  }

  // Skip font family strings
  if (str.includes('sans-serif') || str.includes('monospace')) {
    return false
  }

  // Skip technical strings like [object Object]
  if (str.includes('[object Object]')) {
    return false
  }

  // Skip console logs in frontend
  if (line && (line.includes('console.log') || line.includes('console.error') || line.includes('console.warn') || line.includes('console.info'))) {
    return false
  }

  // Skip debug prefixes like [E2E], [tokensApi], etc.
  if (/^\[[A-Za-z0-9_-]+\]/.test(str)) {
    return false
  }

  // Skip strings with emojis (typically debug output)
  if (/[\u{1F300}-\u{1F9FF}]|✅|❌|⚠️|ℹ️/u.test(str)) {
    return false
  }

  // Skip throw new Error in TS/JS API files (developer-facing errors)
  if (line && line.includes('throw new Error')) {
    return false
  }

  return true
}
