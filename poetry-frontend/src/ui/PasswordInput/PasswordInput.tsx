/*
 * File: PasswordInput.tsx
 * Purpose: Minimal, accessible password input with visibility toggle.
 * This component exposes explicit show/hide labels and keyboard interaction
 * to ensure accessibility. Visual token sizes and spacing are kept consistent
 * with the design system and the icon paths are split into a helper file.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useState, type InputHTMLAttributes } from 'react'
import { Input } from '../Input/Input'
import PasswordToggleButton from './PasswordToggleButton'
import getPadClass from './PasswordToggleUtils'
import clsx from 'clsx'

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  showLabel: string
  hideLabel: string
  fieldSize?: 'sm' | 'md' | 'lg'
}

export default function PasswordInput({
  showLabel,
  hideLabel,
  className,
  fieldSize = 'md',
  autoComplete = 'current-password',
  ...rest
}: PasswordInputProps): ReactElement {
  const [visible, setVisible] = useState<boolean>(false)
  const toggle: () => void = (): void => {
    setVisible((v: boolean): boolean => !v)
  }

  // presentational maps are provided by PasswordToggleButton

  return (
    <div className="relative">
      <Input
        {...rest}
        type={visible ? 'text' : 'password'}
        autoComplete={autoComplete}
        className={clsx(className, getPadClass(fieldSize))}
      />
      <PasswordToggleButton
        visible={visible}
        toggle={toggle}
        fieldSize={fieldSize}
        showLabel={showLabel}
        hideLabel={hideLabel}
      />
    </div>
  )
}
