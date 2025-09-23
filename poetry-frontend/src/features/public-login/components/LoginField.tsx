/*
 * File: LoginField.tsx
 * Purpose: Extracted small input field component for login form to keep
 * LoginFormView small. All Rights Reserved. Arodi Emmanuel
 */

import React from 'react'
import { Input } from '../../../ui/Input/Input'

export interface LoginFieldProps {
  name: 'username' | 'password'
  label: string
  value: string
  onChange: (val: string) => void
  disabled?: boolean
  error?: string | undefined
  type?: string
}

export function LoginField({
  name,
  label,
  value,
  onChange,
  disabled = false,
  error,
  type = 'text',
}: LoginFieldProps): React.ReactElement {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          onChange(e.target.value)
        }}
        disabled={disabled}
        className={error ? 'border-red-500' : ''}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
