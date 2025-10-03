/*
 * File: useSellerCodesFormState.ts
 * Purpose: Custom hook for managing seller codes form state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'

export interface SellerCodesFormValues {
  readonly code: string
  readonly orgId: string
  readonly status: 'active' | 'inactive' | 'expired'
}

export interface SellerCodesFormState {
  readonly code: string
  readonly orgId: string
  readonly status: 'active' | 'inactive' | 'expired'
  readonly setCode: (value: string) => void
  readonly setOrgId: (value: string) => void
  readonly setStatus: (value: 'active' | 'inactive' | 'expired') => void
}

export function useSellerCodesFormState(
  initialValues?: Partial<SellerCodesFormValues>
): SellerCodesFormState {
  const [code, setCode] = useState<string>(initialValues?.code ?? '')
  const [orgId, setOrgId] = useState<string>(initialValues?.orgId ?? '')
  const [status, setStatus] = useState<'active' | 'inactive' | 'expired'>(
    initialValues?.status ?? 'active'
  )
  return {
    code,
    orgId,
    status,
    setCode,
    setOrgId,
    setStatus,
  }
}
