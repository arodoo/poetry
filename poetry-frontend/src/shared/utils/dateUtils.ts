/* File: dateUtils.ts
   Purpose: Global date formatting utility to ensure consistent DD-MM-YYYY format.
   All Rights Reserved Arodi Emmanuel
*/

/**
 * Formats a date string, number, or Date object into DD-MM-YYYY.
 * Returns '-' if the input is invalid or null.
 */
export function formatDate(
  date: string | number | Date | null | undefined
): string {
  if (!date) return '-'

  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return '-'

    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()

    return `${day}-${month}-${year}`
  } catch {
    return '-'
  }
}

/** Formats into DD-MM-YYYY HH:mm. Returns '-' if invalid. */
export function formatDateTime(
  date: string | number | Date | null | undefined
): string {
  if (!date) return '-'
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return '-'
    const day = String(d.getDate()).padStart(2, '0')
    const mo = String(d.getMonth() + 1).padStart(2, '0')
    const yr = d.getFullYear()
    const hr = String(d.getHours()).padStart(2, '0')
    const mn = String(d.getMinutes()).padStart(2, '0')
    return `${day}-${mo}-${yr} ${hr}:${mn}`
  } catch {
    return '-'
  }
}
