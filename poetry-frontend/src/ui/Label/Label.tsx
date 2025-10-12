/*
 File: Label.tsx
 Purpose: Form label primitive with required indicator and token-based styling.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type LabelHTMLAttributes } from 'react'
import clsx from 'clsx'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  requiredMark?: boolean
}

export function Label({
  children,
  requiredMark,
  className,
  ...rest
}: LabelProps): ReactElement {
  const txt = 'text-[var(--color-text,#111)]'
  return (
    <label
      className={clsx(
        'text-xs font-medium inline-flex items-center gap-1',
        txt,
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      {requiredMark && (
        <span aria-hidden="true" className="text-[var(--color-danger,#dc2626)]">
          *
        </span>
      )}
    </label>
  )
}
