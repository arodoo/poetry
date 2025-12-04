/*
 * File: membershipDetailHelpers.tsx
 * Purpose: Helper functions for MembershipDetailPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { MembershipResponse } from '../../../api/generated'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import { buildBasicSection } from './membershipDetailSectionBasic'
import { buildZonesSection } from './membershipDetailSectionZones'
import { buildMetadataSection } from './membershipDetailSectionMeta'

export function buildMembershipDetailSections(
  membership: MembershipResponse,
  t: (key: string) => string
): readonly DetailViewSection[] {
  return [
    buildBasicSection(membership, t),
    buildZonesSection(membership, t),
    buildMetadataSection(membership, t),
  ]
}
