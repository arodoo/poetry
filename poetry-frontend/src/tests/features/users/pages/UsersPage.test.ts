/*
 * File: UsersPage.test.ts
 * Purpose: Ensure UsersListPage wires locale-aware action links.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

vi.mock('../../../../features/users/hooks/useUsersQueries', () => ({
  useUsersListQuery: () => ({ data: [], isLoading: false, isError: false }),
  usersQueryKeys: { list: () => ['users', 'list'] },
}))

vi.mock('../../../../shared/i18n/hooks/useLocale', () => ({
  useLocale: () => ({ locale: 'en' }),
}))

vi.mock('../../../../shared/i18n/useT', () => ({
  useT: () => (key: string) => key,
}))

import UsersListPage from '../../../../features/users/pages/UsersListPage'

describe('UsersListPage', () => {
  it('links create action with locale prefix', () => {
    render(
      createElement(MemoryRouter, {
        children: createElement(UsersListPage),
      })
    )
    const link = screen.getByRole('link', { name: 'ui.users.actions.new' })
    expect(link).toHaveAttribute('href', '/en/users/new')
  })
})
