/*
 File: loginHandlers.impl.ts
 Purpose: Implementation of the login handlers for the public-login feature.
 This module contains the concrete implementations split out from the main
 re-export file to comply with repository max-lines and formatting rules.
 All Rights Reserved. Arodi Emmanuel
*/
import type { LoginForm } from '../model/PublicLoginSchemas'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AuthTokens } from '../../auth/model/AuthTokensSchemas'
// types are provided in separate types file when required by consumers

export type MutationLike = UseMutationResult<AuthTokens, Error, LoginForm>

export function isMutationPending(m: unknown): boolean {
  const mm: { isPending?: boolean; status?: string } = m as {
    isPending?: boolean
    status?: string
  }
  return mm.isPending ?? mm.status === 'pending'
}
export { createOnSubmit } from './loginHandlers.impl.impl'
