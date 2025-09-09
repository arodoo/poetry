/*
 File: UnauthorizedPage.tsx
 Purpose: Displayed when a user attempts to access a route requiring a role
 they do not possess. All strings from i18n; minimal layout only.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export function UnauthorizedPage(): ReactElement {
  const t: (k: I18nKey) => string = useT()
  return (
    <section className="p-4 space-y-2">
      <h1 className="text-lg font-semibold">
        {t('ui.auth.unauthorized.title')}
      </h1>
      <p>{t('ui.auth.unauthorized.message')}</p>
    </section>
  )
}
