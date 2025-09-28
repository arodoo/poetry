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
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { PublicHeroSection } from '../components/PublicHeroSection'
import { PublicFeatureList } from '../components/PublicFeatureList'
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
  const heroTitle = t(landing.heroTitleKey as I18nKey)
  const heroBody = t(landing.heroBodyKey as I18nKey)
  const loginLabel = t(landing.loginCtaKey as I18nKey)
  const registerLabel = t(landing.registerCtaKey as I18nKey)
  const features = landing.features.map((feature) => ({
    title: t(feature.titleKey as I18nKey),
    description: t(feature.descriptionKey as I18nKey),
  }))
  return (
    <div className="space-y-8">
      <PublicHeroSection
        heroTitle={heroTitle}
        heroBody={heroBody}
        loginLabel={loginLabel}
        registerLabel={registerLabel}
        loginHref={loginHref}
        registerHref={registerHref}
      />
      <PublicFeatureList
        heading={t('ui.public.home.features.heading')}
        features={features}
      />
    </div>
  )
}
