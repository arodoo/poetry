/*
 * File: membershipDetailSectionBasic.tsx
 * Purpose: Basic section builder for membership detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { MembershipResponse } from '../../../api/generated'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { DetailViewItem } from '../../../ui/DetailView/DetailView'

export function buildBasicSection(
  membership: MembershipResponse,
  t: (key: string) => string
): DetailViewSection {
  return {
    title: t('ui.memberships.detail.section.basic'),
    items: [
      {
        label: t('ui.memberships.table.id'),
        value: String(membership.id ?? ''),
      },
      {
        label: t('ui.memberships.table.userId'),
        value: String(membership.userId ?? ''),
      },
      {
        label: t('ui.memberships.table.subscriptionId'),
        value: String(membership.subscriptionId ?? ''),
      },
      {
        label: t('ui.memberships.table.sellerCode'),
        value: membership.sellerCode ?? '',
      },
    ] as readonly DetailViewItem[],
  }
}
