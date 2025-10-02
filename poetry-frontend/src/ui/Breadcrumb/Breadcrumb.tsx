/*
 * File: Breadcrumb.tsx
 * Purpose: Modern, responsive breadcrumb navigation component using theme
 * tokens. Provides hierarchical page context with accessibility support.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export interface BreadcrumbItem {
  readonly label: string
  readonly href?: string
}

export interface BreadcrumbProps {
  readonly items: readonly BreadcrumbItem[]
  readonly className?: string
}

export function Breadcrumb(props: BreadcrumbProps): ReactElement {
  const { items, className } = props
  const baseClasses: string = clsx(
    'flex items-center space-x-2 text-sm',
    'text-[var(--color-muted,#6b7280)]',
    className
  )
  return (
    <nav aria-label="Breadcrumb" className={baseClasses}>
      <ol className="flex items-center space-x-2">
        {items.map((item: BreadcrumbItem, index: number): ReactElement => {
          const isLast: boolean = index === items.length - 1
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span
                  className="mx-2 text-[var(--color-muted,#9ca3af)]"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className="font-medium text-[var(--color-text,#1a1a1a)]"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-[var(--color-text,#1a1a1a)]
                    transition-colors duration-150
                    focus:outline-none focus:ring
                    focus:ring-[var(--focus-ring-color)]
                    focus:ring-offset-1
                    focus:ring-[length:var(--focus-ring-width)]
                    rounded px-1"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
