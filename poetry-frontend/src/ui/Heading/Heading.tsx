/*
 File: Heading.tsx
 Purpose: Semantic heading element with size and weight variants. It maps
 props to token-based classes so typography remains consistent across the UI.
 The component keeps the API minimal while covering common cases.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ElementType, type ReactNode } from 'react'
import clsx from 'clsx'

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'xs' | 'sm' | 'md' | 'lg'
  weight?: 'medium' | 'bold'
  className?: string
  children?: ReactNode
}

export function Heading({
  level = 2,
  size = 'md',
  weight = 'bold',
  className,
  children,
}: HeadingProps): ReactElement {
  const TagName: string = 'h' + String(level)
  const Tag: ElementType = TagName as unknown as ElementType
  const sizeMap: Record<string, string> = {
    xs: 'text-[length:var(--font-size-xs,0.75rem)]',
    sm: 'text-[length:var(--font-size-sm,0.875rem)]',
    md: 'text-[length:var(--font-size-base,1rem)]',
    lg: 'text-[length:var(--font-size-lg,1.125rem)]',
  }
  const weightMap: Record<string, string> = {
    medium: 'font-medium',
    bold: 'font-bold',
  }
  return (
    <Tag
      className={clsx(
        'leading-snug',
        sizeMap[size],
        weightMap[weight],
        [
          'focus:outline-none',
          'focus:ring-[var(--focus-ring-color)]',
          'focus:ring-offset-1',
          'focus:ring-[length:var(--focus-ring-width)]',
        ].join(' '),
        className
      )}
    >
      {children}
    </Tag>
  )
}
