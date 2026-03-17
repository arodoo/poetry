/*
 * File: AutoBackupActions.tsx
 * Purpose: Actions cell for auto backup table.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Inline } from '../../../ui/Inline/Inline'
import { Button } from '../../../ui/Button/Button'

interface AutoBackupActionsProps {
  id: number
  fileName: string
  onDownload: (id: number, name: string) => void
  onRestore: (id: number, name: string) => void
  onDelete: (id: number, name: string) => void
}

export function AutoBackupActions(props: AutoBackupActionsProps): ReactElement {
  const handleDownload = (): void => {
    props.onDownload(props.id, props.fileName)
  }
  const handleRestore = (): void => {
    props.onRestore(props.id, props.fileName)
  }
  const handleDelete = (): void => {
    props.onDelete(props.id, props.fileName)
  }
  return (
    <Inline gap="xs">
      <Button
        variant="primary"
        size="sm"
        width="fixed-small"
        onClick={handleDownload}
      >
        Descargar
      </Button>
      <Button
        variant="secondary"
        size="sm"
        width="fixed-small"
        onClick={handleRestore}
      >
        Restaurar
      </Button>
      <Button
        variant="danger"
        size="sm"
        width="fixed-small"
        onClick={handleDelete}
      >
        Eliminar
      </Button>
    </Inline>
  )
}
