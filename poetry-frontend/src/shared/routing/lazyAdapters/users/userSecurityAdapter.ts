/*
 * File: userSecurityAdapter.ts
 * Purpose: Lazy load adapter for UserSecurityPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'

export const UserSecurityPageLazy = lazy(async () => {
  const { default: UserSecurityPage } = await import(
    '../../../../features/users/pages/UserSecurityPage'
  )
  return { default: UserSecurityPage }
})
