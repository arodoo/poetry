/*
 File: Card.tsx
 Purpose: Token-based container card with header/body/footer slots and variants.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode, type ElementType } from 'react'
import clsx from 'clsx'

export interface CardProps {
  children?: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: boolean
  interactive?: boolean
  onClick?: () => void
  radius?: 'sm' | 'md' | 'lg'
}

const padMap: Record<string, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
}
const radiusMap: Record<string, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
}

export function Card({
  children,
  className,
  padding = 'md',
  shadow = true,
  interactive = false,
  onClick,
  radius = 'md',
}: CardProps): ReactElement {
  const base: string = [
    'bg-[var(--color-surface,#fff)]',
    'border',
    'border-[var(--color-border,#e5e5e5)]',
  ].join(' ')
  const sh: string = shadow ? 'shadow-sm' : ''
  const focus: string = interactive
    ? [
        'focus:outline-none',
        'focus:ring-[var(--focus-ring-color)]',
        'focus:ring-offset-1',
        'focus:ring-[length:var(--focus-ring-width)]',
        'cursor-pointer',
      ].join(' ')
    : ''
  const Comp: ElementType = interactive ? 'button' : 'div'
  return (
    <Comp
      type={interactive ? 'button' : undefined}
      onClick={onClick}
      className={clsx(
        base,
        padMap[padding],
        radiusMap[radius],
        sh,
        focus,
        className
      )}
    >
      {children}
    </Comp>
  )
}
