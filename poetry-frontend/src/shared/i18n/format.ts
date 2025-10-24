/*
 File: format.ts
 Purpose: Small helper to interpolate variables into i18n templates.
 Keeps the logic isolated so files remain focused and within line limits.
 All Rights Reserved. Arodi Emmanuel
*/
export default function format(
  tpl: string,
  vars?: Record<string, unknown>
): string {
  if (!vars) return tpl
  return tpl.replace(/{{(.*?)}}/g, (_: string, k: string): string => {
    const key: string = k.trim()
    const value: unknown = vars[key]
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value)
    } else {
      return ''
    }
  })
}
