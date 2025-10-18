/*
 * File: module-feature-report.mjs
 * Purpose: Build per-feature structure compliance report (existence only)
 * using blueprint expansion. Semantic checks handled by other CI scripts.
 * All Rights Reserved. Arodi Emmanuel
 */
import fs from 'node:fs'
import path from 'node:path'
import {
  parseBlueprintPaths,
  expandFeature,
  getBlueprintMeta,
} from './module-blueprint-parser.mjs'

const JAVA_BASE = 'poetry-backend/src/main/java/com/poetry/poetry_backend'
const DOMAIN_DIR = `${JAVA_BASE}/domain`

export function listFeatures() {
  if (!fs.existsSync(DOMAIN_DIR)) return []
  const ignore = new Set(['shared', 'common'])
  return fs
    .readdirSync(DOMAIN_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !ignore.has(name)) // ignored features
}

function hasAnyYaml(dir, feature) {
  if (!fs.existsSync(dir)) return false
  const files = fs.readdirSync(dir)
  return files.some((f) => f.startsWith(feature + '-') && f.endsWith('.yaml'))
}

export function buildFeatureReport(feature) {
  const blueprintPaths = parseBlueprintPaths()
  const expanded = expandFeature(blueprintPaths, feature)
  const meta = getBlueprintMeta()
  const nonCrudFeatures = new Set(meta.nonCrudFeatures || [])
  const isNonCrud = nonCrudFeatures.has(feature)

  const report = { feature, expected: [], missing: [] }
  for (const e of expanded) {
    const p = e.path
    let exists
    if (e.isPattern && p.includes('-*.')) {
      const dir = path.dirname(p)
      exists = hasAnyYaml(dir, feature)
    } else if (p.includes('*')) {
      const dir = path.dirname(p)
      exists = fs.existsSync(dir) && fs.readdirSync(dir).length > 0
    } else {
      exists = fs.existsSync(p)
    }

    // OpenAPI paths under docs/api/openapi/paths are auto-generated -> optional
    let optional = e.optional
    if (p.includes('docs/api/openapi/paths/')) optional = true

    // For non-CRUD features, mark CRUD controllers/tests as optional
    if (isNonCrud) {
      const isCrudFile = p.includes('CreateController') ||
                         p.includes('GetController') ||
                         p.includes('ListController') ||
                         p.includes('PagedListController') ||
                         p.includes('UpdateController') ||
                         p.includes('DeleteController') ||
                         p.includes('UseCaseTest') ||
                         p.includes('UseCaseNegativeTest') ||
                         p.includes('ControllerTest') ||
                         p.includes('ControllerNegativeTest')
      if (isCrudFile) optional = true
    }

    report.expected.push({ path: p, optional, exists })
    if (!exists && !optional) {
      report.missing.push(p)
    }
  }
  return report
}
