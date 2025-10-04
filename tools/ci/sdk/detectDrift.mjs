/*
 * File: detectDrift.mjs
 * Purpose: Compares OpenAPI contract paths with manual SDK
 * implementations to identify coverage gaps.
 * All Rights Reserved. Arodi Emmanuel
 */
import { readFileSync } from 'node:fs'

export function detectDrift(features, openApiPath) {
  const paths = loadOpenApiPaths(openApiPath)
  const pathsByFeature = groupPathsByFeature(paths)
  
  return {
    totalPaths: paths.length,
    featureDrift: features.map((f) => ({
      name: f.name,
      endpoints: (pathsByFeature[f.name] || []).length,
    })),
  }
}

function loadOpenApiPaths(yamlPath) {
  try {
    const content = readFileSync(yamlPath, 'utf-8')
    const pathMatches = content.matchAll(/^  (\/[^:]+):/gm)
    return Array.from(pathMatches).map((m) => m[1])
  } catch {
    return []
  }
}

function groupPathsByFeature(paths) {
  const groups = {}
  paths.forEach((p) => {
    const match = p.match(/\/v1\/([^/]+)/)
    if (match) {
      const feature = match[1]
      if (!groups[feature]) groups[feature] = []
      groups[feature].push(p)
    }
  })
  return groups
}
