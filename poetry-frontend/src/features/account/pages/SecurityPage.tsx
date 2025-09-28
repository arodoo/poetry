/*
 * File: SecurityPage.tsx
 * Purpose: Account security page that composes locale information and the
 * password update flow using dedicated hooks and UI primitives.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type FormEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { AccountLocaleCard } from '../components/AccountLocaleCard'
import { AccountPasswordForm } from '../components/AccountPasswordForm'
import { useAccountSecurityPage } from '../hooks/useAccountSecurityPage'

export default function SecurityPage(): ReactElement {
  const state: ReturnType<typeof useAccountSecurityPage> =
    useAccountSecurityPage()

  return (
    <main className="min-h-screen bg-[var(--color-page,#f9fafb)] py-8">
      <div className="max-w-3xl mx-auto w-full px-4">
        <Stack gap="lg">
          <Stack gap="sm" as="section">
            <Heading level={1} size="lg">
              {state.t('ui.account.security.page.title')}
            </Heading>
            <Text className="text-[color:var(--color-muted,#6b7280)]">
              {state.t('ui.account.security.page.description')}
            </Text>
          </Stack>

          <AccountLocaleCard
            locale={state.localeQuery.data?.locale ?? null}
            isLoading={state.localeQuery.isLoading}
            t={state.t}
          />

          <AccountPasswordForm
            values={state.values}
            onChange={state.onFieldChange}
            onSubmit={(event: FormEvent<HTMLFormElement>): void => {
              void state.onSubmit(event)
            }}
            isSubmitting={state.isSubmitting}
            t={state.t}
            status={state.status}
            fieldErrors={state.fieldErrors}
            policyText={state.policyText}
          />
        </Stack>
      </div>
    </main>
  )
}
