/*
 * File: SubscriptionEditBreadcrumbs.tsx
 * Purpose: Small component that renders breadcrumbs for the subscription edit page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { buildSubscriptionEditBreadcrumbs } from '../model/subscriptionBreadcrumbHelpers'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useT } from '../../../shared/i18n/useT'

export default function SubscriptionEditBreadcrumbs(): ReactElement {
  const { locale } = useLocale()
  const t = useT()
  const breadcrumbs = buildSubscriptionEditBreadcrumbs(locale, t)
  return (
    <div className="mb-4">
      <Breadcrumb items={breadcrumbs} />
    </div>
  )
}
