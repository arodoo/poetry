/*
 * File: useMembershipValidation.ts
 * Purpose: Hook for membership validation (Seller Code, Sub, Biometrics).
 * Follows enterprise validation flow for new memberships.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import { fetchSellerCodesPage } from '../../seller-codes/api/seller-codesApi'
import { fetchMembershipsList } from '../api/membershipsApi'
import { fetchFingerprints } from '../../fingerprint/api/fingerprintApi'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import type { MembershipResponse } from '../../../api/generated'

export interface ValidationResult {
    isValid: boolean
    errorKey?: string
}

export function useMembershipValidation() {
    const [isValidating, setIsValidating] = useState(false)

    const checkSellerCode = async (
        code: string
    ): Promise<ValidationResult> => {
        if (!code) return { isValid: false, errorKey: 'ui.memberships.validation.sellerCode' }

        setIsValidating(true)
        try {
            const page = await fetchSellerCodesPage(0, 1, code)
            const found = page.content?.find(c => c.code === code && c.status?.toUpperCase() === 'ACTIVE')

            return found
                ? { isValid: true }
                : { isValid: false, errorKey: 'ui.memberships.validation.sellerCodeInvalid' }
        } finally {
            setIsValidating(false)
        }
    }

    const checkUserEligibility = async (
        userId: number
    ): Promise<ValidationResult> => {
        setIsValidating(true)
        try {
            // 1. Check active subscription
            const memberships = await fetchMembershipsList()
            const hasActive = memberships.some(
                (m: MembershipResponse) => m.userId === userId && m.status === 'ACTIVE'
            )
            if (hasActive) {
                return {
                    isValid: false,
                    errorKey: 'ui.memberships.validation.activeSubscription',
                }
            }

            // 2. Check fingerprint
            const token = tokenStorage.load()?.accessToken
            if (!token) throw new Error('No token')
            const fingerprints = await fetchFingerprints(token)
            const hasFingerprint = fingerprints.some(
                (f) => f.userId === userId && f.status === 'ACTIVE'
            )

            if (!hasFingerprint) {
                return { isValid: false, errorKey: 'ui.memberships.validation.noFingerprint' }
            }

            return { isValid: true }
        } finally {
            setIsValidating(false)
        }
    }

    return {
        checkSellerCode,
        checkUserEligibility,
        isValidating
    }
}
