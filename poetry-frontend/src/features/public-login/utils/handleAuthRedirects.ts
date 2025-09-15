/*
 * File: handleAuthRedirects.ts
 * Purpose: Small helper to centralize toast messages and navigation for
 *          public auth redirect query parameters. Extracted from the
 *          login page to keep the page file smaller and easier to lint.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { NavigateFunction } from 'react-router-dom'

export function handleAuthRedirects(
  qs: URLSearchParams,
  toastPush: (msg: string) => void,
  navigate: NavigateFunction,
  pathname: string
): void {
  if (qs.get('registered') === '1') {
    toastPush('Account created. Please sign in.')
    qs.delete('registered')
    void navigate(`${pathname}${qs.toString() ? `?${qs.toString()}` : ''}`, {
      replace: true,
    })
    return
  }

  if (qs.get('forgot') === 'success') {
    toastPush(
      'Password reset requested. Check your email if an account exists.'
    )
    qs.delete('forgot')
    void navigate(`${pathname}${qs.toString() ? `?${qs.toString()}` : ''}`, {
      replace: true,
    })
  }
}
