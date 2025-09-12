/*
 File: Inline.tsx
 Purpose: Horizontal layout with wrapping and token-based gap.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode } from 'react'
import clsx from 'clsx'

export interface InlineProps {
  children?: ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg'
  wrap?: boolean
  className?: string
}

const gapMap: Record<string, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

export function Inline({
  children,
  gap = 'md',
  wrap = true,
  className,
}: InlineProps): ReactElement {
  return (
    <div
      className={clsx(
        'flex flex-row',
        wrap && 'flex-wrap',
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  )
}
