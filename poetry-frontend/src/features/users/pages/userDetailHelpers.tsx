/*
 * File: userDetailHelpers.tsx
 * Purpose: Helper functions for UserDetailPage to reduce file length.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { UserDetail } from '../model/UsersSchemas'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { DetailViewItem } from '../../../ui/DetailView/DetailView'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'

export function getLocaleName(
  localeCode: string,
  t: (key: string) => string
): string {
  const parts: string[] = localeCode.split('-')
  const baseLocale: string = parts[0] ?? localeCode
  const localeKey = `ui.users.form.locale.${baseLocale}`
  try {
    return t(localeKey)
  } catch {
    return localeCode
  }
}

export function buildUserDetailSections(
  user: UserDetail,
  t: (key: string) => string
): readonly DetailViewSection[] {
  return [
    {
      title: t('ui.users.detail.section.identity'),
      items: [
        {
          label: t('ui.users.form.username.label'),
          value: user.username ?? '',
        },
        { label: t('ui.users.form.email.label'), value: user.email ?? '' },
        {
          label: t('ui.users.form.locale.label'),
          value: getLocaleName(user.locale ?? 'en', t),
        },
        {
          label: t('ui.users.form.roles.label'),
          value: (
            <Inline gap="xs">
              {(user.roles ?? []).map(
                (role: string): ReactElement => (
                  <Badge key={role} tone="primary" size="sm">
                    {role}
                  </Badge>
                )
              )}
            </Inline>
          ),
          fullWidth: true,
        },
      ] as readonly DetailViewItem[],
    },
    {
      title: t('ui.users.detail.section.metadata'),
      items: [
        {
          label: t('ui.users.detail.field.status'),
          value: (
              <Badge tone={user.status === 'active' ? 'success' : 'neutral'}>
              {t('ui.users.status.' + (user.status ?? 'inactive'))}
            </Badge>
          ),
        },
      ] as readonly DetailViewItem[],
    },
  ]
}
