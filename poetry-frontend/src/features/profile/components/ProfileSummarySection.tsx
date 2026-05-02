/* File: ProfileSummarySection.tsx
 * Purpose: Present read-only profile summary information within a card.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import type { useT } from '../../../shared/i18n/useT'
import type { ProfileSummary } from '../model/ProfileSchemas'
import { ProfileMeta } from './ProfileMeta'
export interface ProfileSummarySectionProps {
  readonly profile: ProfileSummary
  readonly t: ReturnType<typeof useT>
}
export function ProfileSummarySection(
  props: ProfileSummarySectionProps
): ReactElement {
  return (
    <Card padding="lg" radius="lg" shadow>
      <Stack as="section" gap="md" data-testid="profile-summary">
        <Stack gap="xs">
          <Heading level={2} size="lg">
            {props.t('ui.profile.summary.title')}
          </Heading>
          <div>{props.t('ui.profile.summary.description')}</div>
        </Stack>

        <ProfileMeta profile={props.profile} t={props.t} />
      </Stack>
    </Card>
  )
}
