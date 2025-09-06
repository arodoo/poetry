/*
 * File: frontend-module-blueprint-parser.mjs
 * Purpose: Parse frontend JSON blueprint to derive feature path patterns
 * with placeholders for dynamic validation (existence-only) mirroring
 * backend parser style. All Rights Reserved. Arodi Emmanuel
 */
import fs from 'node:fs'

const BP = 'docs/architecture/frontend-module-blueprint.json'

function loadBlueprint(){
  if(!fs.existsSync(BP)) return null
  try { return JSON.parse(fs.readFileSync(BP, 'utf8')) } catch { return null }
}

export function parseFrontendBlueprintPaths(){
  const blueprint = loadBlueprint()
  if(!blueprint?.structure) return []
  const out = []
  for (const [sectionName, section] of Object.entries(blueprint.structure)) {
    const basePath = section.path
    for (const file of section.files || []) {
      out.push({
        pattern: `${basePath}/${file.path}`,
        optional: !file.required,
        description: file.description,
        section: sectionName,
        isPattern: file.pattern || false
      })
    }
  }
  return out
}

function pascal(n){
  return n.split(/[-_]/)
    .map(s => s ? s[0].toUpperCase() + s.slice(1) : '')
    .join('')
}

export function expandFrontendFeature(entries, feature){
  const P = pascal(feature)
  const PL = P.endsWith('s') ? P : P + 's'
  return entries.map(e => ({
    optional: e.optional,
    path: e.pattern
      .replace(/<feature>/g, feature)
      .replace(/Features/g, PL)
      .replace(/Feature/g, P),
    isPattern: e.isPattern,
    description: e.description
  }))
}
