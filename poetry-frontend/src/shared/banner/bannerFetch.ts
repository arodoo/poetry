/*
 * File: bannerFetch.ts
 * Purpose: Fetches user, membership, and demographics data for a banner.
 * Extracted from BannerContext to keep provider under line limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import { fetchUserById } from '../../features/users/api/usersApi'
import { fetchMembershipsPage } from
    '../../features/memberships/api/membershipsApi'
import { getUserDemographics } from
    '../../features/userdemographics/api/userDemographicsApi'
import type { BannerData } from './BannerStore'

export async function fetchBannerData(
    userId: number
): Promise<Pick<BannerData, 'user' | 'membership' | 'phone'>> {
    const user = await fetchUserById(userId.toString())
    const memberships = await fetchMembershipsPage(0, 1, userId.toString())
    const membership = memberships.content?.[0] ?? null
    const demographics = await getUserDemographics(userId)
    const phone = demographics?.phone ?? null
    return { user, membership, phone }
}
