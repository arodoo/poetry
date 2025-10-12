/*
 * File: useZonesFormState.ts
 * Purpose: Custom React hook for managing the state of zone forms, including name, description, managerId, and status fields. Provides setter functions for controlled inputs in both create and edit forms, ensuring consistent state management. Designed for extensibility and integration with form validation and submission logic.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState, useEffect } from 'react'

export interface ZonesFormValues {
  readonly name: string
  readonly description: string
  readonly managerId: string
  readonly status: 'active' | 'inactive'
}

export interface ZonesFormState extends ZonesFormValues {
  readonly setName: (value: string) => void
  readonly setDescription: (value: string) => void
  readonly setManagerId: (value: string) => void
  readonly setStatus: (value: 'active' | 'inactive') => void
}

export function useZonesFormState(
  initialValues?: Partial<ZonesFormValues>
): ZonesFormState {
  const [name, setName] = useState<string>(initialValues?.name ?? '')
  const [description, setDescription] = useState<string>(
    initialValues?.description ?? ''
  )
  const [managerId, setManagerId] = useState<string>(
    initialValues?.managerId ?? ''
  )
  const [status, setStatus] = useState<'active' | 'inactive'>(
    initialValues?.status ?? 'active'
  )

  useEffect(() => {
    if (initialValues?.name !== undefined) {
      setName(initialValues.name)
    }
    if (initialValues?.description !== undefined) {
      setDescription(initialValues.description)
    }
    if (initialValues?.managerId !== undefined) {
      setManagerId(initialValues.managerId)
    }
    if (initialValues?.status !== undefined) {
      setStatus(initialValues.status)
    }
  }, [
    initialValues?.name,
    initialValues?.description,
    initialValues?.managerId,
    initialValues?.status,
  ])

  return {
    name,
    description,
    managerId,
    status,
    setName,
    setDescription,
    setManagerId,
    setStatus,
  }
}
