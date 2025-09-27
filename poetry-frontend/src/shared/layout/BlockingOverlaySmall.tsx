/*
 * File: BlockingOverlaySmall.tsx
 * Purpose: Very small wrapper around BlockingOverlay to keep import sites
 * concise and to provide a predictable small footprint overlay for inline use
 * within compact UI elements like the user menu. This module intentionally
 * delegates rendering to the shared BlockingOverlay component.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { BlockingOverlay } from '../../ui/BlockingOverlay/BlockingOverlay'
export default function BlockingOverlaySmall({
  visible,
  label,
}: {
  visible: boolean
  label: string
}): ReactElement {
  return <BlockingOverlay visible={visible} label={label} />
}
