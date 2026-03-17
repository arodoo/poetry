/*
 * File: AutoBackupSection.tsx
 * Purpose: Displays the automatically generated backup from app startup.
 * Shows backup info and allows downloading the pre-generated SQL file.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement, useState, useEffect } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import { useToast } from '../../../shared/toast/toastContext'
import { fetchJson } from '../../../shared/http/fetchClient'
import { downloadBlob } from '../api/downloadBlob'

interface BackupInfo {
  fileName: string
  generatedAt: string
  sizeBytes: number
}

export function AutoBackupSection(): ReactElement {
  const t = useT()
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState<BackupInfo | null>(null)

  useEffect(() => {
    const loadInfo = async (): Promise<void> => {
      try {
        const data = await fetchJson<BackupInfo>(
          '/api/v1/db-management/backup/auto/info'
        )
        setInfo(data)
      } catch {
        toast.push(t('ui.dbManagement.autoBackup.error'), 'error')
      } finally {
        setLoading(false)
      }
    }
    loadInfo()
  }, [t, toast])

  const handleDownload = async (): Promise<void> => {
    setLoading(true)
    try {
      const response = await fetch('/api/v1/db-management/backup/auto', {
        credentials: 'include',
      })
      if (!response.ok) throw new Error('Failed to fetch')
      const blob = await response.blob()
      downloadBlob(blob, info?.fileName ?? 'auto-backup.sql')
      toast.push(t('ui.dbManagement.autoBackup.downloadSuccess'), 'success')
    } catch {
      toast.push(t('ui.dbManagement.autoBackup.error'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatDate = (iso: string): string => {
    return new Date(iso).toLocaleString()
  }

  return (
    <Card padding="md" data-testid="auto-backup-section">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <Text className="text-[var(--color-textMuted)] whitespace-normal">
          {t('ui.dbManagement.autoBackup.description')}
        </Text>

        {loading && <Text>{t('ui.dbManagement.loading')}</Text>}

        {info && !loading && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" onClick={handleDownload}>
              {t('ui.dbManagement.autoBackup.download')}
            </Button>
          </div>
        )}
      </div>

      {info && !loading && (
        <div className="mt-4 p-4 bg-[var(--color-bgSubtle)] rounded-lg">
          <Text className="font-medium break-all">{info.fileName}</Text>
          <Text className="text-sm text-[var(--color-textMuted)]">
            {t('ui.dbManagement.autoBackup.generated')}:{' '}
            {formatDate(info.generatedAt)}
          </Text>
          <Text className="text-sm text-[var(--color-textMuted)]">
            {t('ui.dbManagement.autoBackup.size')}: {formatSize(info.sizeBytes)}
          </Text>
        </div>
      )}
    </Card>
  )
}
