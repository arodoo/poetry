/*
 * File: userBreadcrumbHelpers.ts
 * Purpose: Helper functions for building user page breadcrumbs. Centralizes
 * breadcrumb construction logic to reduce code duplication. Ensures consistent
 * navigation hierarchy across all user management pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'

export function buildUserListBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    { label: t('ui.users.breadcrumb.home'), href: `/${locale}/dashboard` },
    { label: t('ui.users.breadcrumb.users') },
  ]
}

export function buildUserCreateBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    { label: t('ui.users.breadcrumb.home'), href: `/${locale}/dashboard` },
    { label: t('ui.users.breadcrumb.users'), href: `/${locale}/users` },
    { label: t('ui.users.breadcrumb.new') },
  ]
}

export function buildUserDetailBreadcrumbs(
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    { label: t('ui.users.breadcrumb.home'), href: `/${locale}/dashboard` },
    { label: t('ui.users.breadcrumb.users'), href: `/${locale}/users` },
    { label: t('ui.users.breadcrumb.detail') },
  ]
}

export function buildUserEditBreadcrumbs(
  userId: string,
  locale: string,
  t: (key: string) => string
): readonly BreadcrumbItem[] {
  return [
    { label: t('ui.users.breadcrumb.home'), href: `/${locale}/dashboard` },
    { label: t('ui.users.breadcrumb.users'), href: `/${locale}/users` },
    {
      label: t('ui.users.breadcrumb.detail'),
      href: `/${locale}/users/${userId}`,
    },
    { label: t('ui.users.breadcrumb.edit') },
  ]
}
