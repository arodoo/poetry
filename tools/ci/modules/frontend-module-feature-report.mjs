/*
File: frontend-module-feature-report.mjs
Purpose: Build per-feature structure compliance reports from a blueprint.
This module expands blueprint patterns and reports expected vs actual
existence-only results. Semantic checks are handled elsewhere.
All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'
import {
  parseFrontendBlueprintPaths,
  expandFrontendFeature,
  getFrontendBlueprintMeta,
} from './frontend-module-blueprint-parser.mjs'

const FEATURES_BASE = 'poetry-frontend/src/features'

export function listFrontendFeatures() {
  if (!fs.existsSync(FEATURES_BASE)) return []
  return fs
    .readdirSync(FEATURES_BASE, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
}

function hasAnyYaml(dir, feature) {
  if (!fs.existsSync(dir)) return false
  return fs
    .readdirSync(dir)
    .some((f) => f.startsWith(feature + '-') && f.endsWith('.yaml'))
}

export function buildFrontendFeatureReport(feature) {
  const blueprintPaths = parseFrontendBlueprintPaths()
  const expanded = expandFrontendFeature(blueprintPaths, feature)
  const meta = getFrontendBlueprintMeta()
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
    // Non-CRUD features: ALL required files become optional
    const optional = e.optional || isNonCrud
    report.expected.push({ path: p, optional, exists })
    if (!exists && !optional) {
      report.missing.push(p)
    }
  }
  return report
}
