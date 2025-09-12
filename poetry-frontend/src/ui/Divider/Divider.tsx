/*
 File: Divider.tsx
 Purpose: Horizontal rule component using token color variables.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement } from 'react'
import clsx from 'clsx'

export interface DividerProps {
  className?: string
  decorative?: boolean
}

export function Divider({
  className,
  decorative = true,
}: DividerProps): ReactElement {
  return (
    <hr
      aria-hidden={decorative}
      className={clsx(
        'border-0 h-px bg-[var(--color-border,#d4d4d4)] my-2 w-full',
        className
      )}
    />
  )
}
