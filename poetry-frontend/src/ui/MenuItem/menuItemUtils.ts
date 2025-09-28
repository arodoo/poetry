/*
 * File: menuItemUtils.ts
 * Purpose: Small utilities used by MenuItem to keep the presentational file
 * concise and under the repository's line limits. Implements a click guard
 * that prevents actions when the item is disabled.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { MouseEvent } from 'react'

export function handleMenuItemClick(
  e: MouseEvent,
  disabled?: boolean,
  cb?: (e: MouseEvent) => void
): void {
  if (disabled) {
    e.preventDefault()
    return
  }
  cb?.(e)
}

export default handleMenuItemClick
