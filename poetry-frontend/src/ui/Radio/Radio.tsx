/*
 File: Radio.tsx
 Purpose: Styled radio input with token focus ring.
 All Rights Reserved. Arodi Emmanuel
*/
import { type InputHTMLAttributes, type ReactElement, forwardRef } from 'react'
import clsx from 'clsx'

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

 
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, disabled, ...rest }: RadioProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    const ring: string =
      'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
      'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
    const base: string =
      'h-4 w-4 rounded-full border ' +
      'border-[var(--color-border,#d4d4d4)] text-[var(--color-primary)] '
    const state: string = disabled ? 'opacity-50 cursor-not-allowed' : ''
    return (
      <input
        ref={ref}
        type="radio"
        disabled={disabled}
        className={clsx(base, ring, state, className)}
        {...rest}
      />
    )
  }
)
Radio.displayName = 'Radio'
