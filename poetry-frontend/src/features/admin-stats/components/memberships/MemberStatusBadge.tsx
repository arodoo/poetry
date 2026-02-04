/*
 * File: MemberStatusBadge.tsx
 * Purpose: Visual badge for membership status.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useT } from '../../../../shared/i18n/useT'
import { Badge } from '../../../../ui/Badge/Badge'
import type { ReactElement } from 'react'

export interface MemberStatusBadgeProps {
  status?: string | undefined
  endDate?: string | undefined
}

export function MemberStatusBadge({
  status,
}: MemberStatusBadgeProps): ReactElement | null {
  const t = useT()

  if (!status) return null

  const statusLower = status.toLowerCase()
  let tone: 'success' | 'neutral' | 'danger' | 'warning' = 'neutral'
  let labelKey = ''

  switch (statusLower) {
    case 'active':
      tone = 'success'
      labelKey = 'ui.adminStats.status.active'
      break
    case 'expiring':
      tone = 'warning' // or primary if neutral is too subtle
      labelKey = 'ui.adminStats.status.expiring'
      break
    case 'expired':
      tone = 'danger'
      labelKey = 'ui.adminStats.status.expired'
      break
    default:
      tone = 'neutral'
      labelKey = status
  }

  return <Badge tone={tone}>{labelKey ? t(labelKey) : status}</Badge>
}
