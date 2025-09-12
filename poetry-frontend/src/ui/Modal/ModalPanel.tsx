/*
 File: ModalPanel.tsx
 Purpose: Presentational panel for Modal content with size presets and
 focus ring tokens. It isolates styling and aria wiring from the Modal
 container. The panel forwards a ref via a named prop for focus helpers.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode, type RefObject } from 'react'
import clsx from 'clsx'

export interface ModalPanelProps {
  refProp: RefObject<HTMLDivElement | null>
  labelledBy?: string | undefined
  describedBy?: string | undefined
  size?: 'sm' | 'md' | 'lg'
  children?: ReactNode
}

export function ModalPanel({
  refProp,
  labelledBy,
  describedBy,
  size = 'md',
  children,
}: ModalPanelProps): ReactElement {
  const ring: string =
    'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
    'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
  const sizeMap: Record<string, string> = {
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-lg w-full',
  }
  return (
    <div
      ref={refProp}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={clsx(
        'mt-20 rounded border shadow-lg',
        'bg-[var(--color-surface,#fff)]',
        'border-[var(--color-border,#e5e5e5)]',
        ring,
        sizeMap[size]
      )}
    >
      {children}
    </div>
  )
}
