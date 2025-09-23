/*
 File: loginHandlers.types.ts
 Purpose: Type-only declarations used by login handler implementation modules.
 These types are intentionally small and split into dedicated files to meet
 repository style constraints while preserving runtime behavior.
 All Rights Reserved. Arodi Emmanuel
*/
import type { LoginForm } from '../model/PublicLoginSchemas'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AuthTokens } from '../../auth/model/AuthTokensSchemas'

export type MutationLike = UseMutationResult<AuthTokens, Error, LoginForm>

export interface SafeParseResult {
  success: boolean
  data?: LoginForm
  error?: { errors?: unknown[] }
}
