/*
 * File: FingerprintAdminPage.tsx
 * Purpose: Admin dashboard for R503 fingerprint system management.
 * Shows slot usage, active count, and archived templates with restore.
 * All Rights Reserved. Arodi Emmanuel
 */

import { SlotUsageCard } from '../components/SlotUsageCard'
import { ArchivedFingerprintsList } from '../components/ArchivedFingerprintsList'
import { useFingerprintsListQuery } from '../hooks/useFingerprintQueries'
import './FingerprintAdminPage.css'

export function FingerprintAdminPage() {
  const { data: fingerprints } = useFingerprintsListQuery()
  const activeCount = fingerprints?.filter((f) => f.status === 'ACTIVE').length

  return (
    <div className="fingerprint-admin-page">
      <header className="admin-header">
        <h1>Fingerprint Administration</h1>
        <span className="active-badge">
          {activeCount ?? 0} active fingerprints
        </span>
      </header>

      <section className="admin-stats">
        <SlotUsageCard />
      </section>

      <section className="admin-archived">
        <ArchivedFingerprintsList />
      </section>
    </div>
  )
}

export default FingerprintAdminPage
