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

/**
 * Recursively find a file matching the given filename in a directory
 * @param {string} baseDir - Directory to start searching from
 * @param {string} filename - Filename to search for
 * @returns {boolean} - True if file is found
 */
function findFileRecursive(baseDir, filename) {
  if (!fs.existsSync(baseDir)) return false

  const entries = fs.readdirSync(baseDir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name)
    if (entry.isFile() && entry.name === filename) {
      return true
    }
    if (entry.isDirectory()) {
      if (findFileRecursive(fullPath, filename)) {
        return true
      }
    }
  }
  return false
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
    } else if (p.includes('**/')) {
      // Handle recursive glob patterns like "feature/usecase/**/GetAllFeaturesUseCase.java"
      const parts = p.split('**/')
      const baseDir = parts[0]
      const filename = parts[1] || ''
      exists = findFileRecursive(baseDir, filename)
    } else if (p.includes('*')) {
      const dir = path.dirname(p)
      exists = fs.existsSync(dir) && fs.readdirSync(dir).length > 0
    } else {
      exists = fs.existsSync(p)
    }

    // OpenAPI paths under docs/api/openapi/paths are auto-generated -> optional
    let optional = e.optional
    if (p.includes('docs/api/openapi/paths/')) optional = true

    // For non-CRUD features, mark ALL CRUD-related files as optional
    // This includes controllers, use cases, infrastructure, and DTOs
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
        p.includes('ControllerNegativeTest') ||
        // Also make core files optional for non-CRUD features
        // Use partial patterns to match 'CreateFeatureUseCase', 'GetAllFeaturesUseCase', etc.
        p.endsWith('UseCase.java') ||
        p.includes('Entity.java') ||
        p.includes('JpaRepository') ||
        p.includes('JpaMapper') ||
        p.includes('JpaAdapter') ||
        p.includes('Dto.java') ||
        p.includes('QueryPort.java') ||
        p.includes('CommandPort.java') ||
        // Domain model is also optional for non-CRUD features 
        p.includes('/model/') && (p.endsWith('.java'))
      if (isCrudFile) optional = true
    }

    report.expected.push({ path: p, optional, exists })
    if (!exists && !optional) {
      report.missing.push(p)
    }
  }
  return report
}

