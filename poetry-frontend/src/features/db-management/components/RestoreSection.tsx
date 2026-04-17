/*
 * File: RestoreSection.tsx
 * Purpose: Database restore section with file upload input and
 * confirmation modal. Uploads a SQL backup file and triggers
 * the restore operation after explicit user confirmation.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement, useState, useRef } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import { useToast } from '../../../shared/toast/toastContext'
import { useRestoreMutation } from '../hooks/useRestoreMutation'
import { RestoreConfirmDialog } from './RestoreConfirmDialog'

export function RestoreSection(): ReactElement {
  const t = useT()
  const toast = useToast()
  const restore = useRestoreMutation()
  const [file, setFile] = useState<File | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleRestore = (): void => {
    if (!file) return
    setShowConfirm(false)
    restore.mutate(file, {
      onSuccess: () => {
        setFile(null)
        if (inputRef.current) inputRef.current.value = ''
        toast.push(t('ui.dbManagement.restore.success'), 'success')
      },
      onError: () => {
        toast.push(t('ui.dbManagement.restore.error'), 'error')
      },
    })
  }

  return (
    <Card padding="md" data-testid="restore-section">
      <Text className="mb-4 text-[var(--color-textMuted)]">
        {t('ui.dbManagement.restore.description')}
      </Text>
      <input
        ref={inputRef}
        type="file"
        accept=".sql"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null)
        }}
        data-testid="restore-file-input"
        className={
          'text-sm text-[var(--color-text)] cursor-pointer ' +
          'file:mr-3 file:px-3 file:py-1.5 file:rounded ' +
          'file:border-0 file:cursor-pointer file:text-sm ' +
          'file:bg-[var(--color-primary)] file:text-onPrimary'
        }
      />
      <div className="mt-4">
        <Button
          variant="danger"
          disabled={!file || restore.isPending}
          onClick={() => {
            setShowConfirm(true)
          }}
          data-testid="restore-btn"
        >
          {restore.isPending
            ? t('ui.dbManagement.restore.restoring')
            : t('ui.dbManagement.restore.upload')}
        </Button>
      </div>
      <RestoreConfirmDialog
        open={showConfirm}
        onConfirm={handleRestore}
        onCancel={() => {
          setShowConfirm(false)
        }}
      />
    </Card>
  )
}
