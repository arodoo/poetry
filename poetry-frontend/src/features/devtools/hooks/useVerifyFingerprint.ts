/*
 * File: useVerifyFingerprint.ts
 * Purpose: Hook for fingerprint verification state and actions
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import { useToast } from '../../../shared/toast/toastContext'
import { verifyFingerprintApi, type VerifyResult } from './hardware-api'

export type VerifyStatus = 'idle' | 'scanning' | 'success' | 'error'

interface VerifyState {
    status: VerifyStatus
    userId: number | null
    message: string | null
}

export function useVerifyFingerprint() {
    const toast = useToast()
    const [state, setState] = useState<VerifyState>({
        status: 'idle', userId: null, message: null
    })

    const verify = async (): Promise<void> => {
        setState({ status: 'scanning', userId: null, message: 'Place finger...' })
        try {
            const result: VerifyResult = await verifyFingerprintApi()
            if (result.success) {
                setState({ status: 'success', userId: result.userId ?? null, message: result.message ?? 'Access granted' })
                toast.push(`Access granted: User ${result.userId}`)
            } else {
                setState({ status: 'error', userId: null, message: result.error ?? 'Access denied' })
                toast.push('Access denied')
            }
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e)
            setState({ status: 'error', userId: null, message: msg })
            toast.push('Verification failed')
        }
    }

    const reset = () => setState({ status: 'idle', userId: null, message: null })

    return { ...state, verify, reset }
}
