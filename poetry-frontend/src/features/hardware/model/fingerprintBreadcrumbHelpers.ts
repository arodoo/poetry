/*
 * File: fingerprintBreadcrumbHelpers.ts
 * Purpose: Breadcrumb construction for fingerprint detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'

export function buildFingerprintDetailBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    { label: t('ui.common.breadcrumb.home'), href: `/${locale}/dashboard` },
    {
      label: t('ui.hardware.breadcrumb.hardware'),
      href: `/${locale}/hardware`,
    },
    { label: t('ui.hardware.fingerprints.breadcrumb.detail') },
  ]
}
