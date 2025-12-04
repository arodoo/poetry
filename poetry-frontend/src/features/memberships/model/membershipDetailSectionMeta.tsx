/*
 * File: membershipDetailSectionMeta.tsx
 * Purpose: Metadata section builder for membership detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { MembershipResponse } from '../../../api/generated'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { DetailViewItem } from '../../../ui/DetailView/DetailView'
import { Badge } from '../../../ui/Badge/Badge'

export function buildMetadataSection(
  membership: MembershipResponse,
  t: (key: string) => string
): DetailViewSection {
  const statusKey = membership.status ?? 'inactive'
  return {
    title: t('ui.memberships.detail.section.metadata'),
    items: [
      {
        label: t('ui.memberships.table.status'),
        value: (
          <Badge tone={membership.status === 'active' ? 'success' : 'neutral'}>
            {t('ui.memberships.status.' + statusKey)}
          </Badge>
        ),
      },
    ] as readonly DetailViewItem[],
  }
}
