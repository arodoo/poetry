/*
 * File: zoneEditHandlers.ts
 * Purpose: Event handler for zone edit page submit. Transforms form state into UpdateZoneInput with version from the existing zone entity and triggers mutation with navigation and toast callbacks. Supports optimistic locking and user feedback.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { UseMutationResult } from '@tanstack/react-query'
import type { ZonesFormState } from '../components/useZonesFormState'
import type { UpdateZoneInput, ZoneDetail } from '../model/ZonesSchemas'
import type { MutationVariables } from '../hooks/useZonesMutationHelpers'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export function buildZoneEditSubmitHandler(
  zone: ZoneDetail | undefined,
  formState: ZonesFormState,
  zoneId: string,
  mutation: UseMutationResult<
    ZoneDetail,
    unknown,
    MutationVariables<UpdateZoneInput>
  >,
  navigate: NavigateFunction,
  locale: string,
  t: (key: I18nKey) => string,
  toast: { push: (message: string) => void }
): (e: FormEvent<HTMLFormElement>) => void {
  return (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (zone?.version === undefined) {
      return
    }

    const input: UpdateZoneInput = {
      name: formState.name,
      description: formState.description,
      managerId: Number(formState.managerId),
      status: formState.status,
      version: zone.version,
    }

    mutation.mutate(
      { id: zoneId, input },
      {
        onSuccess: (): void => {
          toast.push(t('ui.zones.toast.update.success'))
          void navigate(`/${locale}/zones`)
        },
        onError: (error: unknown): void => {
          console.error('Zone update error:', error)
          toast.push(t('ui.zones.toast.update.error'))
        },
      }
    )
  }
}
