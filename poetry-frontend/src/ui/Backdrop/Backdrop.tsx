/*
 File: Backdrop.tsx
 Purpose: Semi-transparent background overlay for modals/drawers.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type HTMLAttributes } from 'react'
import clsx from 'clsx'

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  opacity?: 'light' | 'medium' | 'dark'
}

const opacityMap: Record<string, string> = {
  light: 'bg-black/25',
  medium: 'bg-black/40',
  dark: 'bg-black/60',
}

export function Backdrop({
  opacity = 'medium',
  className,
  ...rest
}: BackdropProps): ReactElement {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'fixed inset-0 z-40 transition-opacity',
        opacityMap[opacity],
        className
      )}
      {...rest}
    />
  )
}
