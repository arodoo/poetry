/*
 File: Checkbox.tsx
 Purpose: Styled checkbox with token-driven focus & state styling.
 All Rights Reserved. Arodi Emmanuel
*/
import { type InputHTMLAttributes, type ReactElement, forwardRef } from 'react'
import clsx from 'clsx'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

 
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, disabled, ...rest }: CheckboxProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    const base: string = [
      'h-4',
      'w-4',
      'rounded',
      'border',
      'border-[var(--color-border,#d4d4d4)]',
      'text-[var(--color-primary)]',
      'focus:outline-none',
      'focus:ring-[var(--focus-ring-color)]',
      'focus:ring-offset-1',
      'focus:ring-[length:var(--focus-ring-width)]',
    ].join(' ')
    const state: string = disabled ? 'opacity-50 cursor-not-allowed' : ''
    return (
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        className={clsx(base, state, className)}
        {...rest}
      />
    )
  }
)
Checkbox.displayName = 'Checkbox'
