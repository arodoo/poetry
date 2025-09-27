/*
 * File: PasswordToggleButton.tsx
 * Purpose: Presentational toggle button and sizing maps for password
 * input while keeping the main component compact.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Icon } from '../Icon/Icon'
import EyeOpen from './EyeOpen'
import EyeClosed from './EyeClosed'
import { buildToggleClasses } from './passwordToggleClasses'

// Keep helpers local to avoid fast-refresh issues.

export interface ToggleProps {
  visible: boolean
  toggle: () => void
  fieldSize: 'sm' | 'md' | 'lg'
  showLabel: string
  hideLabel: string
  className?: string
}

export function PasswordToggleButton({
  visible,
  toggle,
  fieldSize,
  showLabel,
  hideLabel,
  className = '',
}: ToggleProps): ReactElement {
  const minWidth: number =
    fieldSize === 'lg' ? 48 : fieldSize === 'md' ? 40 : 36
  const composedClasses: string = buildToggleClasses(fieldSize, className)

  const handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle()
    }
  }
  return (
    <button
      type="button"
      aria-label={visible ? hideLabel : showLabel}
      aria-pressed={visible}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={composedClasses}
      style={{ minWidth }}
    >
      <Icon
        viewBox="0 0 24 24"
        size={fieldSize}
        aria-hidden
        className="transition-colors group-hover:fill-[var(--color-text,#111)]"
      >
        {visible ? EyeOpen : EyeClosed}
      </Icon>
    </button>
  )
}

export default PasswordToggleButton
