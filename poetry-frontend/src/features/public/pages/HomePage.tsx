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
import { Heading } from '../../../ui/Heading/Heading'
import { Button } from '../../../ui/Button/Button'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'

export default function HomePage(): ReactElement {
  const t: (k: I18nKey) => string = useT()
  const { locale } = useLocale() as { locale: string }
  return (
    <section className="mx-auto max-w-3xl p-6 space-y-4">
      <Heading level={1} size="lg" weight="bold">
        {t('ui.route.home.title')}
      </Heading>
      <p className="text-[color:var(--color-text-muted,#525252)]">
        {t('ui.public.home.intro')}
      </p>
      <div className="flex gap-3">
        <Button to={`/${locale}/login`} variant="primary">
          {t('ui.public.home.cta.login')}
        </Button>
        <Button to={`/${locale}/register`} variant="secondary">
          {t('ui.public.home.cta.register')}
        </Button>
      </div>
    </section>
  )
}
