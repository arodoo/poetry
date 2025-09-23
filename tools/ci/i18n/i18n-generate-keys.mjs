/*
 File: i18n-generate-keys.mjs
 Purpose: Generate i18n key parts for frontend tests and build. Auto-generated
 by CI tooling. Keep minimal to satisfy repository max-lines rules.
 All Rights Reserved. Arodi Emmanuel
*/

import { join } from 'node:path'
import { collectKeys } from './collectKeys.mjs'
import { writeParts } from './writeParts.mjs'

/* Orchestrator: keep logic in helper modules to satisfy max-lines rules. */
try {
  const root = join(process.cwd(), 'src', 'shared', 'i18n', 'catalog')
  const genDir = join(process.cwd(), 'src', 'shared', 'i18n', 'generated')
  const sorted = collectKeys(root)
  writeParts(genDir, sorted)
} catch (err) {
  // safe no-op in environments without catalog
}
