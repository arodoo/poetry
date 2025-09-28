/*
 * File: PublicRegisterForm.config.ts
 * Purpose: Shared constants for the public register form component.
 * All Rights Reserved. Arodi Emmanuel
 */
export type PublicRegisterFieldName = 'username' | 'email' | 'password'

export interface PublicRegisterFieldConfig {
  readonly name: PublicRegisterFieldName
  readonly labelKey: string
  readonly inputType?: string
}

export const publicRegisterFieldConfigs: readonly PublicRegisterFieldConfig[] =
  [
    { name: 'username', labelKey: 'ui.public.register.username' },
    { name: 'email', labelKey: 'ui.public.register.email' },
    {
      name: 'password',
      labelKey: 'ui.public.register.password',
      inputType: 'password',
    },
  ]

export interface PublicRegisterFormState {
  readonly username: string
  readonly email: string
  readonly password: string
}

export function createInitialPublicRegisterState(): PublicRegisterFormState {
  return { username: '', email: '', password: '' }
}
