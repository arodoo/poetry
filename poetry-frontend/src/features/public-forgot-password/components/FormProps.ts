/*
 * File: FormProps.ts
 * Purpose: Type definitions for forgot password form.
 * All Rights Reserved. Arodi Emmanuel
 */
export interface PublicForgotPasswordFormProps {
  readonly emailValue: string
  readonly onEmailChange: (value: string) => void
  readonly onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  readonly isSubmitting: boolean
  readonly title: string
  readonly description: string
  readonly emailLabel: string
  readonly submitLabel: string
  readonly pendingLabel: string
  readonly successMessage?: string | undefined
  readonly errorMessage?: string | undefined
}
