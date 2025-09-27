/*
 * File: ProfilePage.test.ts
 * Purpose: Ensure profile page renders summary details when query resolves.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProfilePage from '../../../../features/profile/pages/ProfilePage'
import { primeProfileHooks, withProfileProviders } from '../testUtils'

const mocks = vi.hoisted(() => ({
  useProfileSummaryQuery: vi.fn(),
  useProfileSummaryMutation: vi.fn(),
}))

vi.mock('../../../../features/profile/hooks/useProfileQueries', () => ({
  useProfileSummaryQuery: mocks.useProfileSummaryQuery,
  useProfileSummaryMutation: mocks.useProfileSummaryMutation,
}))

describe('ProfilePage', () => {
  it('renders profile summary metrics', () => {
    primeProfileHooks(mocks)
    render(withProfileProviders(createElement(ProfilePage)))
    expect(screen.getByTestId('profile-summary')).toBeInTheDocument()
    expect(screen.getByTestId('profile-username-input')).toHaveValue('aurora')
  })
})
