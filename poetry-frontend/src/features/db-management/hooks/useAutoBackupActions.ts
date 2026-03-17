/*
 * File: useAutoBackupActions.ts
 * Purpose: Hook for auto backup actions.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useT } from '../../../shared/i18n/useT'
import { useToast } from '../../../shared/toast/toastContext'
import { downloadBlob } from '../api/downloadBlob'
import { fetchJson } from '../../../shared/http/fetchClient'

export function useAutoBackupActions(): {
  del: { id: number; name: string } | null
  setDel: (v: { id: number; name: string } | null) => void
  rst: { id: number; name: string } | null
  setRst: (v: { id: number; name: string } | null) => void
  handleDownload: (id: number, fn: string) => Promise<void>
  handleDelete: () => Promise<void>
  handleRestore: () => Promise<void>
} {
  const t = useT()
  const toast = useToast()
  const qClient = useQueryClient()
  const [del, setDel] = useState<{ id: number; name: string } | null>(null)
  const [rst, setRst] = useState<{ id: number; name: string } | null>(null)

  const dl = async (id: number, fn: string): Promise<void> => {
    try {
      const r = await fetch(`/api/v1/db-management/backup/auto/${String(id)}`, {
        credentials: 'include',
      })
      if (!r.ok) throw new Error('fail')
      downloadBlob(await r.blob(), fn)
      toast.push(t('ui.autoBackup.downloadSuccess'), 'success')
    } catch {
      toast.push(t('ui.autoBackup.error'), 'error')
    }
  }
  const rm = async (): Promise<void> => {
    if (!del) return
    try {
      await fetchJson<unknown>(
        `/api/v1/db-management/backup/auto/${String(del.id)}`,
        {
          method: 'DELETE',
        }
      )
      toast.push(t('ui.autoBackup.deleteSuccess'), 'success')
      setDel(null)
      await qClient.invalidateQueries({ queryKey: ['autoBackups'] })
    } catch {
      toast.push(t('ui.autoBackup.error'), 'error')
    }
  }
  const rs = async (): Promise<void> => {
    if (!rst) return
    try {
      await fetchJson<unknown>(
        `/api/v1/db-management/backup/auto/${String(rst.id)}/restore`,
        { method: 'POST' }
      )
      toast.push(t('ui.autoBackup.restoreSuccess'), 'success')
      setRst(null)
    } catch {
      toast.push(t('ui.autoBackup.error'), 'error')
    }
  }
  return {
    del,
    setDel,
    rst,
    setRst,
    handleDownload: dl,
    handleDelete: rm,
    handleRestore: rs,
  }
}
