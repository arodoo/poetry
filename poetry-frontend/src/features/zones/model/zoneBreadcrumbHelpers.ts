/*
 * File: zoneBreadcrumbHelpers.ts
 * Purpose: Build breadcrumb navigation for zones feature pages.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export function buildZoneListBreadcrumbs(
  locale: string,
  t: (key: I18nKey) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.zones.breadcrumb.home'),
      href: `/${locale}/dashboard`,
    },
    { label: t('ui.zones.breadcrumb.zones') },
  ]
}

export function buildZoneCreateBreadcrumbs(
  locale: string,
  t: (key: I18nKey) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.zones.breadcrumb.home'),
      href: `/${locale}/dashboard`,
    },
    {
      label: t('ui.zones.breadcrumb.zones'),
      href: `/${locale}/zones`,
    },
    { label: t('ui.zones.breadcrumb.new') },
  ]
}

export function buildZoneEditBreadcrumbs(
  zoneId: string,
  locale: string,
  t: (key: I18nKey) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.zones.breadcrumb.home'),
      href: `/${locale}/dashboard`,
    },
    {
      label: t('ui.zones.breadcrumb.zones'),
      href: `/${locale}/zones`,
    },
    {
      label: t('ui.zones.breadcrumb.detail'),
      href: `/${locale}/zones/${zoneId}`,
    },
    { label: t('ui.zones.breadcrumb.edit') },
  ]
}

export function buildZoneDetailBreadcrumbs(
  locale: string,
  t: (key: I18nKey) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.zones.breadcrumb.home'),
      href: `/${locale}/dashboard`,
    },
    {
      label: t('ui.zones.breadcrumb.zones'),
      href: `/${locale}/zones`,
    },
    { label: t('ui.zones.breadcrumb.detail') },
  ]
}
