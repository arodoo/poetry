/*
 * File: BlockingOverlay.tsx
 * Purpose: Full-screen focus and interaction blocker with optional
 * message and spinner.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { Portal } from '../Portal/Portal'

const overlayClassList: readonly string[] = [
  'fixed',
  'inset-0',
  'z-[999]',
  'flex',
  'flex-col',
  'items-center',
  'justify-center',
  'bg-[var(--color-surface)]/70',
  'backdrop-blur-sm',
]

const spinnerClassList: readonly string[] = [
  'h-8',
  'w-8',
  'animate-spin',
  'rounded-full',
  'border-2',
  'border-[var(--color-border)]',
  'border-t-[var(--color-text)]',
]

const overlayClasses: string = overlayClassList.join(' ')
const spinnerClasses: string = spinnerClassList.join(' ')

export interface BlockingOverlayProps {
  readonly visible: boolean
  readonly label?: string
  readonly children?: ReactNode
}

export function BlockingOverlay({
  visible,
  label = 'Loading…',
  children,
}: BlockingOverlayProps): ReactElement | null {
  if (!visible) return null
  return (
    <Portal containerId="app-blocking-overlay">
      <div
        aria-live="assertive"
        aria-busy="true"
        role="alert"
        className={overlayClasses}
        data-testid="blocking-overlay"
      >
        <div className="flex flex-col items-center gap-4">
          <div className={spinnerClasses} aria-hidden="true" />
          <p className="text-sm text-[var(--color-text)]">{label}</p>
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default BlockingOverlay
