/*
 File: DrawerPanel.tsx
 Purpose: Presentational panel for Drawer with side and width presets.
 It isolates styles from the container and forwards a ref for focus.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode, type RefObject } from 'react'
import clsx from 'clsx'
import { widthMap } from './widthMap'

export interface DrawerPanelProps {
  refProp: RefObject<HTMLDivElement | null>
  labelledBy?: string | undefined
  width?: 'sm' | 'md' | 'lg'
  side?: 'left' | 'right'
  children?: ReactNode
}

export function DrawerPanel({
  refProp,
  labelledBy,
  width = 'md',
  side = 'right',
  children,
}: DrawerPanelProps): ReactElement {
  const ring: string =
    'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
    'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
  return (
    <div
      ref={refProp}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className={clsx(
        [
          'absolute top-0 h-full',
          'bg-[var(--color-surface,#fff)]',
          'border',
          'border-[var(--color-border,#e5e5e5)]',
          'shadow-lg',
          'transition-transform',
        ].join(' '),
        ring,
        widthMap[width],
        side === 'right' ? 'translate-x-0 right-0' : 'translate-x-0 left-0'
      )}
    >
      {children}
    </div>
  )
}
