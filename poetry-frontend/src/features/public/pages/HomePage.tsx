/*
 * File: HomePage.tsx
 * Purpose: Public home page that introduces the app and provides clear
 * calls to action for authentication. All visible strings are externalized
 * through the i18n layer to ensure full localization support. Styling is
 * limited to token-driven Tailwind utilities so design remains consistent
 * and centrally configurable across the UI system. All Rights Reserved.
 * Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import { Stack } from '../../../ui/Stack/Stack'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
// Render minimal public page: only login button per request
import { usePublicLandingQuery } from '../hooks/usePublicQueries'

export default function HomePage(): ReactElement {
  const t: (k: I18nKey) => string = useT()
  const { locale } = useLocale() as { locale: string }
  const landingQuery = usePublicLandingQuery()
  if (landingQuery.isLoading) {
    return (
      <Stack as="section" gap="sm" className="mx-auto max-w-3xl p-6">
        <Text size="sm">{t('ui.public.home.loading')}</Text>
      </Stack>
    )
  }
  const landing = landingQuery.data
  if (!landing) {
    return (
      <Stack as="section" gap="sm" className="mx-auto max-w-3xl p-6">
        <Text size="sm">{t('ui.public.home.error')}</Text>
      </Stack>
    )
  }
  const loginHref = `/${locale}/login`
  const registerHref = `/${locale}/register`
  const loginLabel = t(landing.loginCtaKey as I18nKey)
  return (
    <Stack as="section" gap="md" className="mx-auto max-w-3xl p-6">
      <div data-testid="public-login-only">
        <Button to={loginHref} variant="primary">
          {loginLabel}
        </Button>
      </div>
    </Stack>
  )
}
