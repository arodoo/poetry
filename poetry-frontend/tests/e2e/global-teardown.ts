/*
 * File: global-teardown.ts
 * Purpose: Playwright global teardown that purges every row the
 * suite seeded so the database stays clean between runs and the
 * admin UI never accumulates ghost test data.
 * All Rights Reserved. Arodi Emmanuel
 */
import { purgeAll } from './shared/cleanup/purgeAll'

export default async function globalTeardown(): Promise<void> {
  try {
    const report = await purgeAll()
    // eslint-disable-next-line no-console
    console.log('[e2e teardown] purged', report)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[e2e teardown] failed', err)
    throw err
  }
}
