/*
 * File: DbManagementPage.tsx
 * Purpose: Main database management page with three tabs for Excel
 * export, SQL backup, and database restore. Admin-only page
 * providing full data portability and disaster recovery.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Tabs } from '../../../ui/Tabs/Tabs'
import { useT } from '../../../shared/i18n/useT'
import { ExcelExportSection } from '../components/ExcelExportSection'
import { BackupSection } from '../components/BackupSection'
import { RestoreSection } from '../components/RestoreSection'
import { AutoBackupSection } from '../components/AutoBackupSection'
import { DbManagementHelpModal } from '../components/DbManagementHelpModal'

export function DbManagementPage(): ReactElement {
  const t = useT()

  return (
    <div className="p-6" data-testid="db-management-page">
      <Stack gap="lg">
        <div className="flex flex-row items-center justify-between">
          <Stack gap="sm">
            <Heading level={1}>{t('ui.dbManagement.title')}</Heading>
            <Text className="text-[var(--color-textMuted)]">
              {t('ui.dbManagement.subtitle')}
            </Text>
          </Stack>
          <DbManagementHelpModal />
        </div>
        <Tabs
          idBase="db-mgmt"
          items={[
            {
              label: t('ui.dbManagement.excel.title'),
              panel: <ExcelExportSection />,
            },
            {
              label: t('ui.dbManagement.backup.title'),
              panel: <BackupSection />,
            },
            {
              label: t('ui.dbManagement.autoBackup.title'),
              panel: <AutoBackupSection />,
            },
            {
              label: t('ui.dbManagement.restore.title'),
              panel: <RestoreSection />,
            },
          ]}
        />
      </Stack>
    </div>
  )
}
