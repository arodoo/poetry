/*
 * File: toastContext.ts
 * Purpose: Provide the toast context and `useToast` hook separately from the
 *          provider component so the provider file only exports React
 *          components. This avoids fast-refresh complaints in development.
 * All Rights Reserved. Arodi Emmanuel
 */

import { createContext, useContext } from 'react'
import type React from 'react'

interface ToastCtxType {
  push: (m: string) => void
}

const initialToastCtx: null | ToastCtxType = null

export const ToastCtx: React.Context<ToastCtxType | null> =
  createContext<ToastCtxType | null>(initialToastCtx)

export function useToast(): ToastCtxType {
  const ctx: null | ToastCtxType = useContext(ToastCtx)
  if (!ctx) throw new Error('toast.context.missing')
  return ctx
}
