/* File: dateUtils.ts
   Purpose: Global date formatting utility to ensure consistent DD-MM-YYYY format.
   All Rights Reserved Arodi Emmanuel
*/

/**
 * Formats a date string, number, or Date object into DD-MM-YYYY.
 * Returns '-' if the input is invalid or null.
 */
export function formatDate(date: string | number | Date | null | undefined): string {
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
