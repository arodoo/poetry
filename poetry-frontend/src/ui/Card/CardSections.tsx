/*
 File: CardSections.tsx
 Purpose: Card section components (header/body/footer). These primitives
 keep layout and spacing consistent across screens and isolate visual
 styling behind small components. They accept className to extend styles.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode } from 'react'
import clsx from 'clsx'

export interface CardSectionProps {
  children?: ReactNode
  className?: string
}

export function CardHeader({
  children,
  className,
}: CardSectionProps): ReactElement {
  return (
    <div className={clsx('mb-2 font-medium text-sm', className)}>
      {children}
    </div>
  )
}

export function CardBody({
  children,
  className,
}: CardSectionProps): ReactElement {
  return <div className={clsx('text-sm', className)}>{children}</div>
}

export function CardFooter({
  children,
  className,
}: CardSectionProps): ReactElement {
  return (
    <div
      className={clsx(
        'mt-3 text-xs text-[var(--color-text-muted,#666)]',
        className
      )}
    >
      {children}
    </div>
  )
}
