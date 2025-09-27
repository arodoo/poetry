/*
 * File: PasswordInput.clean.tsx
 * Purpose: Reference password input kept minimal for debugging and tests
 * while mirroring production behaviour.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useState, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { Input } from '../Input/Input'
import PasswordToggleButton from './PasswordToggleButton'

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  showLabel: string
  hideLabel: string
  fieldSize?: 'sm' | 'md' | 'lg'
}

const inputPadding: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'pr-9',
  md: 'pr-12',
  lg: 'pr-14',
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
  const toggleVisibility: () => void = (): void => {
    setVisible((current: boolean): boolean => !current)
  }

  return (
    <div className="relative">
      <Input
        {...rest}
        type={visible ? 'text' : 'password'}
        autoComplete={autoComplete}
        className={clsx(className, inputPadding[fieldSize])}
      />
      <PasswordToggleButton
        visible={visible}
        toggle={toggleVisibility}
        fieldSize={fieldSize}
        showLabel={showLabel}
        hideLabel={hideLabel}
      />
    </div>
  )
}
