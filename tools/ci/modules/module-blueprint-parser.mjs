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

export function getBlueprintMeta() {
  const blueprint = loadBlueprint()
  return blueprint?.meta || {}
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

function singularize(word) {
  // Simple English pluralization reversal for common patterns
  // Handles: events→event, zones→zone, users→user, etc.
  if (word.endsWith('ies')) return word.slice(0, -3) + 'y'
  if (word.endsWith('ses') || word.endsWith('xes') || word.endsWith('ches') || word.endsWith('shes')) {
    return word.slice(0, -2)
  }
  if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1)
  return word
}

export function expandFeature(entries, feature) {
  // Generate singular Pascal class name from feature folder name
  // e.g., "events" folder → "Event" class, "zones" → "Zone"
  const featureSingular = singularize(feature)
  const P = pascal(featureSingular)
  return entries.map((e) => ({
    optional: e.optional,
    path: e.pattern
      .replace(/<feature>/g, feature)
      .replace(/Features/g, P + 's')  // for plural collections like GetAllEvents
      .replace(/Feature/g, P),
  }))
}
