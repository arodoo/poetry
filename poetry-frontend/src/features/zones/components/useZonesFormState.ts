/*
 * useZonesFormState.ts
 * Custom hook for managing zones form state with local state
 * for name description and managerId fields. Provides setter
 * functions for controlled inputs in create and edit forms.
 * © 2025 Poetry Platform. All rights reserved.
 */

import { useState, useEffect } from 'react'

export interface ZonesFormValues {
  readonly name: string
  readonly description: string
  readonly managerId: string
}

export interface ZonesFormState extends ZonesFormValues {
  readonly setName: (value: string) => void
  readonly setDescription: (value: string) => void
  readonly setManagerId: (value: string) => void
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
  }, [initialValues?.name, initialValues?.description, initialValues?.managerId])

  return {
    name,
    description,
    managerId,
    setName,
    setDescription,
    setManagerId,
  }
}
