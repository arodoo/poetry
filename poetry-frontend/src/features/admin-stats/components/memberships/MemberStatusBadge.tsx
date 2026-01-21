/*
 * File: MemberStatusBadge.tsx
 * Purpose: Visual badge for membership status.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useT } from '../../../../shared/i18n/useT'
import { Badge } from '../../../../ui/Badge/Badge'

export interface MemberStatusBadgeProps {
  status?: string | undefined
  endDate?: string | undefined
}

export function MemberStatusBadge({
  status,
}: MemberStatusBadgeProps) {
  const t = useT()

  if (!status) return null

  const statusLower = status.toLowerCase()
  let tone: 'success' | 'neutral' | 'danger' = 'neutral'
  let labelKey = ''

  switch (statusLower) {
    case 'active':
      tone = 'success'
      labelKey = 'ui.adminStats.memberships.status.active'
      break
    case 'expiring':
      tone = 'neutral' // or primary if neutral is too subtle
      labelKey = 'ui.adminStats.memberships.status.expiring'
      break
    case 'expired':
      tone = 'danger'
      labelKey = 'ui.adminStats.memberships.status.expired'
      break
    default:
      tone = 'neutral'
      labelKey = status
  }

  return <Badge tone={tone}>{labelKey ? t(labelKey) : status}</Badge>
}
