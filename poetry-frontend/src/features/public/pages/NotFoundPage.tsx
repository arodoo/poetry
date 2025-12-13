/*
 * File: NotFoundPage.tsx
 * Purpose: Generic 404 page with i18n messages.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import { Button } from '../../../ui/Button/Button'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'

export default function NotFoundPage(): ReactElement {
  const t: (k: I18nKey) => string = useT()
  const navigate = useNavigate()
  const { locale } = useLocale()

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-8">
        {/* Large 404 Text */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-[var(--color-primary)] opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heading level={1} className="text-3xl md:text-4xl">
              {t('ui.route.404.title')}
            </Heading>
          </div>
        </div>

        <div className="space-y-6">
          <Text size="lg" className="text-[var(--color-text-muted)]">
            {t('ui.route.404.message')}
          </Text>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => void navigate(-1)}
              variant="secondary"
              size="md"
            >
              {t('ui.common.back')}
            </Button>
            <Button to={`/${locale}/dashboard`} variant="primary" size="md">
              {t('ui.nav.home')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
