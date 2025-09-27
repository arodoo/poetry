/*
 * File: profileTestFixtures.ts
 * Purpose: Provide fixtures and mock priming for profile feature tests.
 * All Rights Reserved. Arodi Emmanuel
 */
import { vi } from 'vitest'
import type {
  ProfileHookMocks,
  ProfileSummaryFixture,
  ProfileSummaryMutationMockResult,
  ProfileSummaryQueryMockResult,
} from './profileTestTypes'

export const profileSummaryFixture: ProfileSummaryFixture = {
  username: 'aurora',
  email: 'aurora@example.com',
  locale: 'en-US',
  version: 'v1',
}

export function primeProfileHooks(
  mocks: ProfileHookMocks,
  profile: ProfileSummaryFixture = profileSummaryFixture
): void {
  mocks.useProfileSummaryQuery.mockReset()
  mocks.useProfileSummaryMutation.mockReset()
  mocks.useProfileSummaryQuery.mockImplementation(
    (): ProfileSummaryQueryMockResult => ({
      data: profile,
      isLoading: false,
      isError: false,
    })
  )
  mocks.useProfileSummaryMutation.mockImplementation(
    (): ProfileSummaryMutationMockResult => ({
      mutate: vi.fn(),
      isPending: false,
    })
  )
}
