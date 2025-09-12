/*
 File: Switch.tsx
 Purpose: Accessible toggle switch built from a checkbox; styled with tokens.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, useId } from 'react'
import clsx from 'clsx'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  id?: string
  className?: string
}

export function Switch({
  checked,
  onChange,
  disabled,
  label,
  id,
  className,
}: SwitchProps): ReactElement {
  const internalId: string = useId()
  const switchId: string = id ?? internalId
  const knob: string =
    'absolute left-0 top-0 h-4 w-4 rounded-full bg-white ' +
    'transition-transform shadow translate-x-0 data-[on=true]:translate-x-4'
  const track: string =
    'relative h-4 w-8 rounded-full transition-colors ' +
    'bg-[var(--color-border,#d4d4d4)] ' +
    'data-[on=true]:bg-[var(--color-primary)] '
  const ring: string =
    'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
    'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
  return (
    <label
      className={clsx('inline-flex items-center gap-2 text-xs', className)}
    >
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        data-on={checked}
        onClick={(): void => {
          if (!disabled) {
            onChange(!checked)
          }
        }}
        className={clsx(
          track,
          ring,
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className={knob} data-on={checked} />
      </button>
      {label && <span>{label}</span>}
    </label>
  )
}
