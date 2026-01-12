/*
 * File: useVerifyFingerprint.ts
 * Purpose: Hook for fingerprint verification state and actions.
 * Manages scanning status, success/error states, and toast notifications.
 * Provides verify function that calls hardware API and updates UI state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import { useToast } from '../../../shared/toast/toastContext'
import { useT } from '../../../shared/i18n/useT'
import { verifyFingerprintApi, type VerifyResult } from './hardware-api'

export type VerifyStatus = 'idle' | 'scanning' | 'success' | 'error'

interface VerifyState {
    status: VerifyStatus
    userId: number | null
    message: string | null
}

export function useVerifyFingerprint() {
    const toast = useToast()
    const t = useT()
    const [state, setState] = useState<VerifyState>({
        status: 'idle', userId: null, message: null
    })

    const verify = async (): Promise<void> => {
        setState({ status: 'scanning', userId: null, message: t('ui.devtools.verify.placeFinger') })
        try {
            const result: VerifyResult = await verifyFingerprintApi()
            if (result.success) {
                const msg = result.message ?? t('ui.devtools.verify.statusSuccess')
                setState({ status: 'success', userId: result.userId ?? null, message: msg })
                toast.push(`${t('ui.devtools.verify.statusSuccess')}: User ${result.userId}`)
            } else {
                const errMsg = result.error ?? t('ui.devtools.verify.statusDenied')
                setState({ status: 'error', userId: null, message: errMsg })
                toast.push(t('ui.devtools.verify.statusDenied'))
            }
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e)
            setState({ status: 'error', userId: null, message: msg })
            toast.push(t('ui.devtools.verify.failed'))
        }
    }

    const reset = () => setState({ status: 'idle', userId: null, message: null })

    return { ...state, verify, reset }
}
