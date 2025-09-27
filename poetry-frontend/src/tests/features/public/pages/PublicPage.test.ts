/*
 * File: PublicPage.test.ts
 * Purpose: Verify public home page renders landing content.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../../../../features/public/pages/HomePage'

const landingResponse = {
  heroTitleKey: 'ui.public.home.hero.title',
  heroBodyKey: 'ui.public.home.hero.body',
  loginCtaKey: 'ui.public.home.cta.login',
  registerCtaKey: 'ui.public.home.cta.register',
  features: [
    {
      titleKey: 'ui.public.home.features.publish.title',
      descriptionKey: 'ui.public.home.features.publish.description',
    },
  ],
}

const usePublicLandingQueryMock = vi.hoisted(() => vi.fn())

vi.mock('../../../../features/public/hooks/usePublicQueries', () => ({
  usePublicLandingQuery: usePublicLandingQueryMock,
}))
vi.mock('../../../../shared/i18n/useT', () => ({
  useT: () => (key: string) => key,
}))
vi.mock('../../../../shared/i18n/hooks/useLocale', () => ({
  useLocale: () => ({
    locale: 'en',
    isLoading: false,
    error: null,
    setLocale: vi.fn(),
  }),
}))

describe('HomePage', () => {
  it('renders hero and features when data resolves', () => {
    usePublicLandingQueryMock.mockReturnValue({
      data: landingResponse,
      isLoading: false,
    })
    render(createElement(MemoryRouter, {}, createElement(HomePage)))
    expect(screen.getByTestId('public-hero')).toBeInTheDocument()
    expect(screen.getByTestId('public-features')).toBeInTheDocument()
  })
})
