/*
 File: TextArea.tsx
 Purpose: Multi-line text input control with token-driven styling.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type TextareaHTMLAttributes,
  type ReactElement,
  forwardRef,
} from 'react'
import clsx from 'clsx'

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, invalid, disabled, ...rest }: TextAreaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ): ReactElement => {
    const ring: string =
      'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
      'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
    const base: string =
      'w-full rounded border bg-[var(--color-surface,#fff)] ' +
      'px-3 py-2 text-sm text-[var(--color-text,#111)] resize-y ' +
      'placeholder:text-[var(--color-text-muted,#666)] '
    const state: string = clsx(
      disabled && 'opacity-50 cursor-not-allowed',
      invalid && 'border-[var(--color-danger,#dc2626)]'
    )
    return (
      <textarea
        ref={ref}
        {...(invalid ? { 'aria-invalid': 'true' as const } : {})}
        disabled={disabled}
        className={clsx(base, ring, state, className)}
        {...rest}
      />
    )
  }
)
TextArea.displayName = 'TextArea'
