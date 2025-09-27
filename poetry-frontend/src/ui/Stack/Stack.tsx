/*
 File: Stack.tsx
 Purpose: Vertical layout stack applying token-based spacing between children.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type ReactElement,
  type ReactNode,
  type ElementType,
  type HTMLAttributes,
} from 'react'
import clsx from 'clsx'

type BaseAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'className'
>

export interface StackProps extends BaseAttributes {
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
  ...rest
}: StackProps): ReactElement {
  const Comp: ElementType = as
  return (
    <Comp className={clsx('flex flex-col', gapMap[gap], className)} {...rest}>
      {children}
    </Comp>
  )
}
