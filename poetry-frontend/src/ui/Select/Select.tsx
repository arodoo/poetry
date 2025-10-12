/*
 File: Select.tsx
 Purpose: Styled native select element with token-driven presentation.
 All Rights Reserved. Arodi Emmanuel
*/
import { type SelectHTMLAttributes, type ReactElement, forwardRef } from 'react'
import clsx from 'clsx'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, invalid, disabled, children, ...rest }: SelectProps,
    ref: React.ForwardedRef<HTMLSelectElement>
  ): ReactElement => {
    const ring: string =
      'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
      'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
    const base: string =
      'w-full rounded border bg-[var(--color-surface,#fff)] ' +
      'px-3 py-2 text-sm text-[var(--color-text,#111)] '
    const state: string = clsx(
      disabled && 'opacity-50 cursor-not-allowed',
      invalid && 'border-[var(--color-danger,#dc2626)]'
    )
    return (
      <select
        ref={ref}
        data-invalid={invalid ? 'true' : undefined}
        disabled={disabled}
        className={clsx(base, ring, state, className)}
        {...rest}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = 'Select'
