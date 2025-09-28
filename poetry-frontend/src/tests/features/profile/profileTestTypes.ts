/*
 * File: profileTestTypes.ts
 * Purpose: Shared type definitions for profile testing utilities.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { Mock } from 'vitest'

export type ProfileSummaryFixture = Readonly<{
  username: string
  email: string
  locale: string
  version: string
}>

export interface ProfileHookMocks {
  readonly useProfileSummaryQuery: Mock
  readonly useProfileSummaryMutation: Mock
}

export interface ProfileSummaryQueryMockResult {
  readonly data: ProfileSummaryFixture
  readonly isLoading: boolean
  readonly isError: boolean
}

export interface ProfileSummaryMutationMockResult {
  readonly mutate: Mock
  readonly isPending: boolean
}
