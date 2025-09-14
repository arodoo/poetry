/*
 File: NotFoundPage.tsx
 Purpose: Generic 404 page with i18n messages.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export default function NotFoundPage(): ReactElement {
  const t: (k: I18nKey) => string = useT()
  return (
    <section className="p-4 space-y-2">
      <h1 className="text-lg font-semibold">{t('ui.route.404.title')}</h1>
      <p>{t('ui.route.404.message')}</p>
    </section>
  )
}
