/*
 * File: DbManagementHelpModal.tsx
 * Purpose: Help modal that explains in simple terms how to backup
 * and restore the database for non-technical users.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement, useState } from 'react'
import { Modal } from '../../../ui/Modal/Modal'
import { Button } from '../../../ui/Button/Button'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Stack } from '../../../ui/Stack/Stack'
import { useT } from '../../../shared/i18n/useT'

export function DbManagementHelpModal(): ReactElement {
  const t = useT()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          setOpen(true)
        }}
      >
        {t('ui.dbManagement.help.title')}
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        size="lg"
        labelledBy="help-modal-title"
      >
        <Stack gap="lg">
          <Heading level={2}>{t('ui.dbManagement.help.title')}</Heading>

          <Stack gap="md">
            <Heading level={3}>{t('ui.dbManagement.help.whatIs')}</Heading>
            <Text className="text-[var(--color-textMuted)]">
              {t('ui.dbManagement.help.whatIsDesc')}
            </Text>
          </Stack>

          <Stack gap="md">
            <Heading level={3}>{t('ui.dbManagement.help.howToBackup')}</Heading>
            <Text className="text-[var(--color-textMuted)] whitespace-pre-line">
              {t('ui.dbManagement.help.howToBackupSteps')}
            </Text>
          </Stack>

          <Stack gap="md">
            <Heading level={3}>
              {t('ui.dbManagement.help.howToRestore')}
            </Heading>
            <Text className="text-[var(--color-textMuted)] whitespace-pre-line">
              {t('ui.dbManagement.help.howToRestoreSteps')}
            </Text>
          </Stack>

          <Stack gap="sm">
            <Text className="text-[var(--color-error)]" weight="bold">
              {t('ui.dbManagement.help.warning')}
            </Text>
            <Text className="text-[var(--color-textMuted)]">
              {t('ui.dbManagement.help.warningText')}
            </Text>
          </Stack>

          <Button
            variant="primary"
            onClick={() => {
              setOpen(false)
            }}
          >
            {t('ui.dbManagement.help.close')}
          </Button>
        </Stack>
      </Modal>
    </>
  )
}
