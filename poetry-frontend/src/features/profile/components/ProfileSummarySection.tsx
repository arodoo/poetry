/*
 * File: ProfileSummarySection.tsx
 * Purpose: Present and edit profile summary information within a card.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect, useState, type FormEvent, type ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Input } from '../../../ui/Input/Input'
import { Button } from '../../../ui/Button/Button'
import type { useT } from '../../../shared/i18n/useT'
import {
  type ProfileSummary,
  type ProfileSummaryUpdateInput,
} from '../model/ProfileSchemas'

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

  return (
    <Card padding="lg" radius="lg" shadow>
      <Stack as="section" gap="md" data-testid="profile-summary">
        <Stack gap="xs">
          <Heading level={2} size="lg">
            {props.t('ui.profile.summary.title')}
          </Heading>
          <Text size="sm">{props.t('ui.profile.summary.description')}</Text>
        </Stack>
        <dl className="grid grid-cols-2 gap-4" data-testid="profile-meta">
          <div>
            <dt className="text-xs text-slate-500">
              {props.t('ui.profile.summary.email')}
            </dt>
            <dd className="text-sm font-medium">{props.profile.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">
              {props.t('ui.profile.summary.locale')}
            </dt>
            <dd className="text-sm font-medium">{props.profile.locale}</dd>
          </div>
        </dl>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1" htmlFor="profile-username">
            <span className="text-sm font-medium">
              {props.t('ui.profile.summary.username.label')}
            </span>
            <Input
              id="profile-username"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                setUsername(event.target.value)
              }}
              data-testid="profile-username-input"
            />
          </label>
          <Button type="submit" disabled={props.isSubmitting} className="w-fit">
            {props.isSubmitting
              ? props.t('ui.profile.summary.username.loading')
              : props.t('ui.profile.summary.username.save')}
          </Button>
        </form>
      </Stack>
    </Card>
  )
}
