/*
 * File: zoneCreateHandlers.ts
 * Purpose: Event handlers for the zone creation page, including form submission with validation and cancel navigation. Transforms form state into CreateZoneInput and triggers mutation callbacks. Designed for extensibility and integration with form logic.
 * All Rights Reserved. Arodi Emmanuel
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
