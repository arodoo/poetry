/*
 * File: SubscriptionEditPage.tsx
 * Purpose: Edit subscription plan details page with optimistic locking.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { Stack } from '../../../ui/Stack/Stack'
import { Card } from '../../../ui/Card/Card'
import { Input } from '../../../ui/Input/Input'
import { TextArea } from '../../../ui/TextArea/TextArea'
import { Select } from '../../../ui/Select/Select'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Inline } from '../../../ui/Inline/Inline'
import { useSubscriptionDetailQuery } from '../hooks/useSubscriptionsQueries'
import { useUpdateSubscriptionMutation } from '../hooks/useSubscriptionsMutations'
import type { UpdateSubscriptionInput } from '../model/SubscriptionsSchemas'
import { buildSubscriptionEditBreadcrumbs } from './subscriptionBreadcrumbHelpers'
import { toTemplateString } from '../../../shared/utils/templateSafe'

export default function SubscriptionEditPage(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const query: ReturnType<typeof useSubscriptionDetailQuery> =
    useSubscriptionDetailQuery(id ?? '')
  const mutation: ReturnType<typeof useUpdateSubscriptionMutation> =
    useUpdateSubscriptionMutation()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [currency, setCurrency] = useState<string>('USD')
  const [durationDays, setDurationDays] = useState<number>(30)
  const [status, setStatus] = useState<'active' | 'inactive'>('active')
  const breadcrumbs = buildSubscriptionEditBreadcrumbs(locale, t)
  useEffect((): void => {
    if (query.data) {
      setName(query.data.name ?? '')
      setDescription(query.data.description ?? '')
      setPrice(query.data.price ?? 0)
      setCurrency(query.data.currency ?? 'USD')
      setDurationDays(query.data.durationDays ?? 30)
      const s = query.data.status as 'active' | 'inactive' | undefined
      setStatus(s ?? 'active')
    }
  }, [query.data])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const input: UpdateSubscriptionInput = {
      name,
      description,
      price,
      currency,
      durationDays,
      status,
    }
    mutation.mutate(
      { id: id ?? '', input },
      {
        onSuccess: (): void => {
          toast.push(t('ui.subscriptions.toast.update.success'))
          void navigate(`/${locale}/subscriptions/${toTemplateString(id)}`)
        },
        onError: (): void => {
          toast.push(t('ui.subscriptions.toast.update.error'))
        },
      }
    )
  }
  return (
    <PageLayout
      title={t('ui.subscriptions.edit.title')}
      subtitle={t('ui.subscriptions.edit.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <Stack gap="lg">
          <Card padding="lg" shadow={true}>
            <Stack gap="md">
              <Stack gap="xs">
                <Text size="sm" className="font-medium">
                  {t('ui.subscriptions.table.name')}
                </Text>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  required
                  data-testid="subscription-name-input"
                />
              </Stack>

              <Stack gap="xs">
                <Text size="sm" className="font-medium">
                  Description
                </Text>
                <TextArea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  rows={3}
                  data-testid="subscription-description-input"
                />
              </Stack>

              <Stack gap="xs">
                <Text size="sm" className="font-medium">
                  {t('ui.subscriptions.table.price')}
                </Text>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(Number(e.target.value))
                  }}
                  min="0"
                  step="0.01"
                  required
                  data-testid="subscription-price-input"
                />
              </Stack>

              <Stack gap="xs">
                <Text size="sm" className="font-medium">
                  Currency
                </Text>
                <Select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value)
                  }}
                  data-testid="subscription-currency-select"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </Select>
              </Stack>

              <Stack gap="xs">
                <Text size="sm" className="font-medium">
                  {t('ui.subscriptions.table.duration')}
                </Text>
                <Input
                  type="number"
                  value={durationDays}
                  onChange={(e) => {
                    setDurationDays(Number(e.target.value))
                  }}
                  min="1"
                  required
                  data-testid="subscription-duration-input"
                />
              </Stack>

              <Stack gap="xs">
                <Text size="sm" className="font-medium">
                  {t('ui.subscriptions.table.status')}
                </Text>
                <Select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as 'active' | 'inactive')
                  }}
                  data-testid="subscription-status-select"
                >
                  <option value="active">
                    {t('ui.subscriptions.status.active')}
                  </option>
                  <option value="inactive">
                    {t('ui.subscriptions.status.inactive')}
                  </option>
                </Select>
              </Stack>
            </Stack>
          </Card>

          <div className="flex justify-end border-t border-[var(--color-border)] pt-4">
            <Inline gap="sm">
              <Button
                type="button"
                variant="secondary"
                onClick={() => void navigate(`/${locale}/subscriptions/${toTemplateString(id)}`)}
                disabled={mutation.isPending}
                data-testid="subscription-cancel-button"
              >
                {t('ui.subscriptions.actions.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                data-testid="subscription-submit-button"
              >
                {mutation.isPending
                  ? 'Saving...'
                  : t('ui.subscriptions.actions.save')}
              </Button>
            </Inline>
          </div>
        </Stack>
      </form>
    </PageLayout>
  )
}
