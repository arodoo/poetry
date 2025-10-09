/*
 * zoneCreateHandlers.ts
 * Event handlers for zone create page including form submit
 * with validation and cancel navigation. Transforms form state
 * into CreateZoneInput and triggers mutation callback.
 * © 2025 Poetry Platform. All rights reserved.
 */

import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type * as ZF from '../components/useZonesFormState'
import type { CreateZoneInput } from '../model/ZonesSchemas'

export function createZoneSubmitHandler(
  formState: ZF.ZonesFormState,
  onSuccess: (input: CreateZoneInput) => void
): (event: FormEvent<HTMLFormElement>) => void {
  return (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const input: CreateZoneInput = {
      name: formState.name,
      managerId: Number(formState.managerId),
      ...(formState.description && {
        description: formState.description,
      }),
    }
    onSuccess(input)
  }
}

export function createZoneCancelHandler(
  navigate: NavigateFunction,
  locale: string
): () => void {
  return (): void => {
    void navigate(`/${locale}/zones`)
  }
}
