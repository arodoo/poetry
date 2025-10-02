/*
 * File: ProfileMeta.tsx
 * Purpose: Render profile meta information (email and locale) as a definition
 * list used by the ProfileSummarySection. This keeps the summary component
 * smaller and focused on composition. All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { ProfileSummary } from '../model/ProfileSchemas'

export function ProfileMeta({
  profile,
  t,
}: {
  profile: ProfileSummary
  t: (key: string) => string
}): ReactElement {
  return (
    <dl className="grid grid-cols-2 gap-4" data-testid="profile-meta">
      <div>
        <dt className="text-xs text-[var(--color-textMuted)]">
          {t('ui.profile.summary.email')}
        </dt>
        <dd className="text-sm font-medium">{profile.email}</dd>
      </div>
      <div>
        <dt className="text-xs text-[var(--color-textMuted)]">
          {t('ui.profile.summary.locale')}
        </dt>
        <dd className="text-sm font-medium">{profile.locale}</dd>
      </div>
    </dl>
  )
}
