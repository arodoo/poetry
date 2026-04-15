/*
 * File: useDeleteFingerprint.ts
 * Purpose: Hook encapsulating fingerprint deletion logic with
 * confirmation dialog, loading state, and query invalidation.
 * Keeps HardwareFingerprintActions thin.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { deleteFingerprint } from '../../fingerprint/api/fingerprintApi'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

interface DeleteFp {
  busy: boolean
  handleDelete: (id: number, confirmMsg: string) => void
}

export function useDeleteFingerprint(): DeleteFp {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)

  const handleDelete = useCallback(
    (id: number, confirmMsg: string) => {
      if (!window.confirm(confirmMsg)) return
      setBusy(true)
      const token = tokenStorage.load()?.accessToken ?? ''
      void deleteFingerprint(id, token)
        .then(() => qc.invalidateQueries({ queryKey: ['fingerprints'] }))
        .finally(() => setBusy(false))
    },
    [qc],
  )

  return { busy, handleDelete }
}
