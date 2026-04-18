/*
 * File: purge-test-data.mjs
 * Purpose: One-shot CLI that wipes leftover Playwright-seeded
 * rows out of the running backend so the dev database stops
 * accumulating ghost users, seller codes and subscriptions.
 * All Rights Reserved. Arodi Emmanuel
 */
import { login } from './purge/purgeHttp.mjs'
import { purgeAll } from './purge/purgeSteps.mjs'

async function main() {
  await login()
  const report = await purgeAll()
  console.log('purged', report)
}

main().catch((err) => {
  console.error('purge failed', err)
  process.exitCode = 1
})
