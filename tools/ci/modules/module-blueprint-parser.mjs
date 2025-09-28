/*
 * File: module-blueprint-parser.mjs
 * Purpose: Parse JSON blueprint structure to derive feature path patterns
 * with placeholders for dynamic validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import fs from 'node:fs'

const BP = 'docs/architecture/backend-module-blueprint.json'

function loadBlueprint() {
  if (!fs.existsSync(BP)) return null
  try {
    return JSON.parse(fs.readFileSync(BP, 'utf8'))
  } catch {
    return null
  }
}

export function parseBlueprintPaths() {
  const blueprint = loadBlueprint()
  if (!blueprint?.structure) return []

  const out = []
  const entries = Object.entries(blueprint.structure)
  for (const [sectionName, section] of entries) {
    const basePath = section.path
    for (const file of section.files || []) {
      const fullPath = `${basePath}/${file.path}`
      out.push({
        pattern: fullPath,
        optional: !file.required,
        description: file.description,
        section: sectionName,
        isPattern: file.pattern || false,
      })
    }
  }
  return out
}
function pascal(n) {
  return n
    .split(/[-_]/)
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : ''))
    .join('')
}
export function expandFeature(entries, feature) {
  const P = pascal(feature)
  const PL = P.endsWith('s') ? P : P + 's'
  return entries.map((e) => ({
    optional: e.optional,
    path: e.pattern
      .replace(/<feature>/g, feature)
      .replace(/Features/g, PL)
      .replace(/Feature/g, P),
  }))
}
