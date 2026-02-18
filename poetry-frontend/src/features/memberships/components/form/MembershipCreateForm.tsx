/*
 * File: MembershipCreateForm.tsx
 * Purpose: Enterprise membership creation form with multi-step validation.
 * Orchestrates user search, eligibility checks, and seller code validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '../../../../ui/Stack/Stack'
import { Button } from '../../../../ui/Button/Button'
import { Alert } from '../../../../ui/Alert/Alert'
import { useT } from '../../../../shared/i18n/useT'
import { useLocale } from '../../../../shared/i18n/hooks/useLocale'
import UserSearchField from './UserSearchField'
import SubscriptionSelect from '../SubscriptionSelect'
import SellerCodeInput from '../SellerCodeInput'
import { useMembershipValidation } from '../../hooks/useMembershipValidation'
import { useMembershipFormData } from '../../hooks/useMembershipFormData'
import { useCreateMembershipMutation } from '../../hooks/useMembershipsMutations'
import type { UserResponse } from '../../../../api/generated'

export default function MembershipCreateForm(): ReactElement {
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const { subscriptions } = useMembershipFormData()
  const validation = useMembershipValidation()
  const createMutation = useCreateMembershipMutation()

  const [selectedUser, setSelectedUser] = useState<UserResponse | undefined>()
  const [subscriptionId, setSubscriptionId] = useState<number>(0)
  const [sellerCode, setSellerCode] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [eligibilityPassed, setEligibilityPassed] = useState(false)

  const handleUserSelect = async (user: UserResponse) => {
    setSelectedUser(user)
    setEligibilityPassed(false)
    setError(undefined)

    try {
      const result = await validation.checkUserEligibility(user.id!)
      if (!result.isValid) {
        setError(t(result.errorKey!))
      } else {
        setEligibilityPassed(true)
      }
    } catch (err) {
      setError(t('ui.memberships.toast.error'))
      console.error('Eligibility check failed:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || !subscriptionId || !sellerCode) {
      return
    }

    setError(undefined)
    const codeResult = await validation.checkSellerCode(sellerCode)
    if (!codeResult.isValid) {
      setError(t(codeResult.errorKey!))
      return
    }

    createMutation.mutate(
      {
        userId: selectedUser.id!,
        subscriptionId,
        sellerCode,
        status: 'ACTIVE',
        allZones: false,
        zoneIds: [],
      },
      {
        onSuccess: () => {
          navigate(`/${locale}/memberships`)
        },
        onError: () => {
          setError(t('ui.memberships.toast.error'))
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} data-testid="membership-creation-form">
      <Stack gap="lg">
        {error && (
          <Alert status="error" data-testid="eligibility-error">
            {error}
          </Alert>
        )}

        <UserSearchField onSelect={handleUserSelect} selectedUser={selectedUser} />

        {validation.isValidating && (
          <div
            className="flex items-center gap-2 p-4 bg-surfaceMuted rounded border border-dashed"
            data-testid="eligibility-checking"
          >
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-textMuted">
              {t('ui.memberships.validation.checkingEligibility')}
            </p>
          </div>
        )}

        {eligibilityPassed && selectedUser && !validation.isValidating && (
          <>
            <SubscriptionSelect
              subscriptions={subscriptions}
              value={subscriptionId}
              onChange={setSubscriptionId}
              t={t}
            />
            <SellerCodeInput
              value={sellerCode}
              onChange={setSellerCode}
              placeholder={t('ui.memberships.form.sellerCode.placeholder')}
            />

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/${locale}/memberships`)}
              >
                {t('ui.memberships.actions.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                data-testid="submit-membership-button"
                disabled={
                  validation.isValidating ||
                  createMutation.isPending ||
                  !subscriptionId ||
                  !sellerCode
                }
              >
                {t('ui.memberships.actions.submit')}
              </Button>
            </div>
          </>
        )}
      </Stack>
    </form>
  )
}
