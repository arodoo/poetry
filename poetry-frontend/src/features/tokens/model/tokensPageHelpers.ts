/*
 File: tokensPageHelpers.ts
 Purpose: Helper functions for tokens pages including breadcrumb
 builders and data formatters. Keeps page components clean and
 focused on rendering. All Rights Reserved. Arodi Emmanuel
*/
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'

export function buildTokensBreadcrumbs(
  locale: string,
  t: (k: I18nKey) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.tokens.breadcrumbs.admin'),
      href: `/${locale}/admin`,
    },
    {
      label: t('ui.tokens.breadcrumbs.tokens'),
    },
  ]
}

export function formatTokenLabel(value: string): string {
  return value
    .split('-')
    .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
