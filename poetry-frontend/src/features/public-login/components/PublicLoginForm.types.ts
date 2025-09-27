/*
 * File: PublicLoginForm.types.ts
 * Purpose: Types for PublicLoginForm component. Keeps the component file
 * under 80 lines.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormEvent } from 'react'

export interface PublicLoginFormProps {
  readonly username: string
  readonly password: string
  readonly onUsernameChange: (value: string) => void
  readonly onPasswordChange: (value: string) => void
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void
  readonly isSubmitting: boolean
  readonly title: string
  readonly description: string
  readonly usernameLabel: string
  readonly passwordLabel: string
  readonly submitLabel: string
  readonly pendingLabel: string
  readonly errorMessage?: string | undefined
}
