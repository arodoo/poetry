/*
 * File: sellerCodeBreadcrumbHelpers.ts
 * Purpose: Breadcrumb builders for seller code pages (list,
 * detail, create, edit).
 * All Rights Reserved. Arodi Emmanuel
 */
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'

export function buildSellerCodeListBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.sellerCodes.breadcrumb.home'),
      href: `/${locale}/dashboard`,
    },
    { label: t('ui.sellerCodes.breadcrumb.sellerCodes') },
  ]
}

export function buildSellerCodeCreateBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.sellerCodes.breadcrumb.home'),
      href: `/${locale}/dashboard`,
    },
    {
      label: t('ui.sellerCodes.breadcrumb.sellerCodes'),
      href: `/${locale}/seller-codes`,
    },
    { label: t('ui.sellerCodes.breadcrumb.new') },
  ]
}

export function buildSellerCodeDetailBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.sellerCodes.breadcrumb.home'),
      href: `/${locale}/dashboard`,
    },
    {
      label: t('ui.sellerCodes.breadcrumb.sellerCodes'),
      href: `/${locale}/seller-codes`,
    },
    { label: t('ui.sellerCodes.breadcrumb.detail') },
  ]
}

export function buildSellerCodeEditBreadcrumbs(
  sellerCodeId: string,
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    {
      label: t('ui.sellerCodes.breadcrumb.home'),
      href: `/${locale}/dashboard`,
    },
    {
      label: t('ui.sellerCodes.breadcrumb.sellerCodes'),
      href: `/${locale}/seller-codes`,
    },
    {
      label: t('ui.sellerCodes.breadcrumb.detail'),
      href: `/${locale}/seller-codes/${sellerCodeId}`,
    },
    { label: t('ui.sellerCodes.breadcrumb.edit') },
  ]
}
