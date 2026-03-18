/*
 * File: UserSecurityPage.tsx
 * Purpose: Admin user security management page for password changes.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, type ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersFormShell } from '../components/form/UsersFormShell'
import { useUpdateUserSecurityMutation } from '../hooks/mutations/useUsersMutations'

export default function UserSecurityPage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const userId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: { locale: string } = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const { push }: { push: (msg: string) => void } = useToast()
  const mutation = useUpdateUserSecurityMutation()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setError('')

    if (password.length < 10) {
      setError(t('ui.users.validation.password.min_length'))
      return
    }

    if (password !== confirmPassword) {
      setError(t('ui.users.validation.password.mismatch'))
      return
    }

    mutation.mutate(
      { id: userId, input: { password } },
      {
        onSuccess: () => {
          push(t('ui.users.security.toast.success'))
          navigate(`/${locale}/users/${userId}`)
        },
        onError: () => {
          push(t('ui.users.security.toast.error'))
        },
      }
    )
  }

  const isSubmitting = mutation.isPending

  return (
    <UsersPageLayout
      titleKey="ui.users.security.title"
      subtitleKey="ui.users.security.subtitle"
    >
      <UsersFormShell
        title={t('ui.users.security.form.title')}
        description={t('ui.users.security.form.description', { id: userId })}
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <Stack gap="xs">
              <Text size="sm" className="font-medium">
                {t('ui.users.form.password.new')}
              </Text>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('ui.users.form.password.placeholder')}
                required
                disabled={isSubmitting}
              />
              <Text size="sm" className="text-[var(--color-textMuted)]">
                {t('ui.users.form.password.hint')}
              </Text>
            </Stack>

            <Stack gap="xs">
              <Text size="sm" className="font-medium">
                {t('ui.users.form.password.confirm')}
              </Text>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('ui.users.form.password.confirm_placeholder')}
                required
                disabled={isSubmitting}
              />
            </Stack>

            {error && (
              <Text size="sm" className="text-[var(--color-error)]">
                {error}
              </Text>
            )}

            <Stack gap="sm">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t('ui.users.actions.saving')
                  : t('ui.users.actions.save')}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/${locale}/users/${userId}`)}
                disabled={isSubmitting}
              >
                {t('ui.users.actions.cancel')}
              </Button>
            </Stack>
          </Stack>
        </form>
      </UsersFormShell>
    </UsersPageLayout>
  )
}
