/*
 File: loginSubmit.types.ts
 Purpose: Small extracted types to keep implementation files under max-lines.
 All Rights Reserved. Arodi Emmanuel
*/

import type { LoginForm } from '../model/PublicLoginSchemas'

export interface SafeParseSuccess {
  success: true
  data: LoginForm
}

export interface SafeParseError {
  success: false
  error?: { errors?: unknown[] }
}

export type SafeParseResult = SafeParseSuccess | SafeParseError

export interface FieldErrors {
  username?: string
  password?: string
}

export type SubmitFn = (e: React.FormEvent) => Promise<void>
