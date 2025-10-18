/*
 * File: subscriptionBreadcrumbHelpers.ts
 * Purpose: Helper functions to build subscription breadcrumb navigation.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'

export function buildSubscriptionListBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    { label: t('ui.navigation.home'), href: `/${locale}` },
    { label: t('ui.subscriptions.breadcrumb.list') },
  ]
}

export function buildSubscriptionDetailBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    { label: t('ui.navigation.home'), href: `/${locale}` },
    {
      label: t('ui.subscriptions.breadcrumb.list'),
      href: `/${locale}/subscriptions`,
    },
    {
      label: t('ui.subscriptions.breadcrumb.detail'),
    },
  ]
}

export function buildSubscriptionCreateBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    { label: t('ui.navigation.home'), href: `/${locale}` },
    {
      label: t('ui.subscriptions.breadcrumb.list'),
      href: `/${locale}/subscriptions`,
    },
    {
      label: t('ui.subscriptions.breadcrumb.create'),
    },
  ]
}

export function buildSubscriptionEditBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    { label: t('ui.navigation.home'), href: `/${locale}` },
    {
      label: t('ui.subscriptions.breadcrumb.list'),
      href: `/${locale}/subscriptions`,
    },
    {
      label: t('ui.subscriptions.breadcrumb.edit'),
    },
  ]
}
