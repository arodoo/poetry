/*
 File: Input.tsx
 Purpose: Text input control with token-based styling and a11y state classes.
 All Rights Reserved. Arodi Emmanuel
*/
import { type InputHTMLAttributes, type ReactElement, forwardRef } from 'react'
import clsx from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

// eslint-disable-next-line @typescript-eslint/typedef
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, invalid, disabled, ...rest }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    const focusRing: string =
      'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
      'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
    const base: string =
      'w-full rounded border bg-[var(--color-surface,#fff)] ' +
      'px-3 py-2 text-sm text-[var(--color-text,#111)] ' +
      'placeholder:text-[var(--color-text-muted,#666)] ' +
      focusRing
    const state: string = clsx(
      disabled && 'opacity-50 cursor-not-allowed',
      invalid && 'border-[var(--color-danger,#dc2626)]'
    )
    return (
      <input
        ref={ref}
        {...(invalid ? { 'aria-invalid': 'true' as const } : {})}
        disabled={disabled}
        className={clsx(base, state, className)}
        {...rest}
      />
    )
  }
)
Input.displayName = 'Input'
