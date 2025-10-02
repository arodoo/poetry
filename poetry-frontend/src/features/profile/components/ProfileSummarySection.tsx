/* File: ProfileSummarySection.tsx
 * Purpose: Present and edit profile summary information within a card.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect, useState, type FormEvent, type ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import type { useT } from '../../../shared/i18n/useT'
import type { ProfileSummary } from '../model/ProfileSchemas'
import type { ProfileSummaryUpdateInput } from '../model/ProfileSchemas'
import { ProfileMeta } from './ProfileMeta'
import { ProfileUsernameForm } from './ProfileUsernameForm'
export interface ProfileSummarySectionProps {
  readonly profile: ProfileSummary
  readonly onSubmit: (input: ProfileSummaryUpdateInput) => void
  readonly isSubmitting: boolean
  readonly t: ReturnType<typeof useT>
}
export function ProfileSummarySection(
  props: ProfileSummarySectionProps
): ReactElement {
  const [username, setUsername] = useState(props.profile.username)
  useEffect((): void => {
    setUsername(props.profile.username)
    return undefined
  }, [props.profile.username])

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    props.onSubmit({ username, version: props.profile.version })
  }

  function onSubmitWrapper(e: unknown): void {
    handleSubmit(e as FormEvent<HTMLFormElement>)
  }

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

        <ProfileUsernameForm
          username={username}
          setUsername={setUsername}
          isSubmitting={props.isSubmitting}
          onSubmit={onSubmitWrapper}
          t={props.t}
        />
      </Stack>
    </Card>
  )
}
