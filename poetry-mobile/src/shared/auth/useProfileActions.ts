/*
 * File: useProfileActions.ts
 * Purpose: Hook providing profile update and tier change
 * actions. Separated from AuthProvider to keep each file
 * under 60 lines per architecture rules.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useCallback } from 'react'
import { UserProfile } from './UserProfile'
import { SubscriptionTier } from './SubscriptionTier'
import * as actions from './authActions'

type SetFn<T> = (val: T) => void

export function useProfileActions(
  user: UserProfile | null,
  setUser: SetFn<UserProfile | null>,
  setTier: SetFn<SubscriptionTier>
) {
  const updateProfile = useCallback(
    async (partial: Partial<UserProfile>) => {
      if (!user) return
      const merged = { ...user, ...partial }
      await actions.persistProfile(merged)
      setUser(merged)
    },
    [user, setUser]
  )

  const setTierCb = useCallback(
    async (t: SubscriptionTier) => {
      await actions.persistTier(t)
      setTier(t)
    },
    [setTier]
  )

  return { updateProfile, setTier: setTierCb }
}
