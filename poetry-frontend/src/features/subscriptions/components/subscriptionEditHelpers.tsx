/*
 * File: subscriptionEditHelpers.tsx
 * Purpose: Small helper to produce the onCancel callback used by
 * SubscriptionEditForm. Keeps the main form file under the max-lines limit
 * without changing behavior.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { NavigateFunction } from 'react-router-dom'

export function buildOnCancel(
  navigate: NavigateFunction,
  locale: string,
  id: string | undefined
) {
  return function onCancel(): void {
    void navigate(`/${locale}/subscriptions/${id ?? ''}`)
  }
}
