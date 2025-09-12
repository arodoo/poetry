/*
 File: Tag.tsx
 Purpose: Removable tag component built on Badge styles with optional close
 button emitting onRemove. Focus ring tokens applied.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode } from 'react'
import clsx from 'clsx'
import { Badge } from '../Badge/Badge'

export interface TagProps {
  children?: ReactNode
  onRemove?: () => void
  className?: string
  tone?: 'primary' | 'neutral' | 'danger' | 'success'
}

export function Tag({
  children,
  onRemove,
  className,
  tone = 'primary',
}: TagProps): ReactElement {
  return (
    <span className={clsx('inline-flex items-center gap-1', className)}>
      <Badge tone={tone}>{children}</Badge>
      {onRemove && (
        <button
          type="button"
          aria-label="remove"
          className={'rounded p-0.5 text-[10px] leading-none '}
          data-ring
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  )
}
