/*
 File: Stack.tsx
 Purpose: Vertical layout stack applying token-based spacing between children.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode, type ElementType } from 'react'
import clsx from 'clsx'

export interface StackProps {
  children?: ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg'
  as?: 'div' | 'section' | 'ul' | 'nav'
  className?: string
}

const gapMap: Record<string, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

export function Stack({
  children,
  gap = 'md',
  as = 'div',
  className,
}: StackProps): ReactElement {
  const Comp: ElementType = as
  return (
    <Comp className={clsx('flex flex-col', gapMap[gap], className)}>
      {children}
    </Comp>
  )
}
