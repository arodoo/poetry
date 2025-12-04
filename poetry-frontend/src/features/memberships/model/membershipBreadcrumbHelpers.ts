/*
 * File: membershipBreadcrumbHelpers.ts
 * Purpose: Build breadcrumb navigation for membership pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'

export function buildMembershipListBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.route.dashboard.title'),
      href: `/${locale}/dashboard`,
    },
    {
      label: t('ui.route.memberships.title'),
      href: `/${locale}/memberships`,
    },
  ]
}

export function buildMembershipDetailBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.route.dashboard.title'),
      href: `/${locale}/dashboard`,
    },
    {
      label: t('ui.route.memberships.title'),
      href: `/${locale}/memberships`,
    },
    {
      label: t('ui.memberships.breadcrumb.detail'),
    },
  ]
}
