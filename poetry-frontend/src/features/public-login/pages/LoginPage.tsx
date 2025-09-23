/*
 * File: LoginPage.tsx
 * Purpose: Public login page component. Keeps the page small and focused on
 * presentation and delegates logic to the hook.
 * All Rights Reserved. Arodi Emmanuel
 */

import React from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { useLoginPage } from '../hooks/useLoginPage'
import LoginFormView from '../components/LoginFormView'
import { handleAuthRedirects } from '../utils/handleAuthRedirects'

export default function LoginPage(): React.ReactElement {
  const s: ReturnType<typeof useLoginPage> = useLoginPage()
  // s is typed via hook return type.
  // Create a typed alias to satisfy the typedef rule enforced by ESLint.
  const state: ReturnType<typeof useLoginPage> = s
  // Keep page focused: small presentational wrapper
  const qs: URLSearchParams = state.qs
  const push: (msg: string) => void = (m: string): void => {
    state.toast.push(m)
  }
  const nav: NavigateFunction = state.navigate
  const pathname: string = state.location.pathname
  handleAuthRedirects(qs, push, nav, pathname)
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          {s.t('ui.public.home.intro')}
        </h1>
        <LoginFormView
          t={s.t}
          form={s.form as { username: string; password: string }}
          setForm={s.setForm}
          onSubmit={(e: React.FormEvent): void => {
            state.onSubmit(e)
          }}
          isLoading={state.isLoading}
          error={state.error}
          fieldErrors={state.fieldErrors}
        />
      </div>
    </main>
  )
}
