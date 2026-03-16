/*
 * File: ExcelExportSection.tsx
 * Purpose: Excel export section with table selection checkboxes
 * and export button. Uses the tables query hook and Excel export
 * mutation to download selected tables as xlsx file.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement, useState, useCallback } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import { useToast } from '../../../shared/toast/toastContext'
import { useTablesQuery } from '../hooks/useTablesQuery'
import { useExcelExport } from '../hooks/useExcelExport'
import { TableCheckboxList } from './TableCheckboxList'
import type { TableInfo } from '../model/dbManagementTypes'

export function ExcelExportSection(): ReactElement {
  const t = useT()
  const toast = useToast()
  const { data: tables, isLoading } = useTablesQuery()
  const exportMut = useExcelExport()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = useCallback((name: string) => {
    setSelected((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((n: string) => n !== name)
        : [...prev, name]
    )
  }, [])

  const toggleAll = useCallback(() => {
    if (!tables) return
    setSelected((prev: string[]) =>
      prev.length === tables.length
        ? []
        : tables.map((ti: TableInfo) => ti.name)
    )
  }, [tables])

  const handleExport = (): void => {
    exportMut.mutate(selected, {
      onSuccess: () => {
        toast.push(
          t('ui.dbManagement.excel.success'),
          'success'
        )
      },
      onError: () => {
        toast.push(
          t('ui.dbManagement.excel.error'),
          'error'
        )
      },
    })
  }

  if (isLoading) {
    return <Text>{t('ui.dbManagement.loading')}</Text>
  }

  return (
    <Card padding="md" data-testid="excel-export-section">
      {tables && (
        <TableCheckboxList
          tables={tables}
          selected={selected}
          onToggle={toggle}
          onToggleAll={toggleAll}
        />
      )}
      <div className="mt-4">
        <Button
          variant="primary"
          disabled={selected.length === 0 || exportMut.isPending}
          onClick={handleExport}
          data-testid="excel-export-btn"
        >
          {exportMut.isPending
            ? t('ui.dbManagement.excel.exporting')
            : t('ui.dbManagement.excel.export')}
        </Button>
      </div>
    </Card>
  )
}
