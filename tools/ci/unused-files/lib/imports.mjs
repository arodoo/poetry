/*
 File: imports.mjs
 Purpose: Import statement parser and identifier extractor for JavaScript and
 TypeScript files. Uses regex-based analysis to detect ES6 imports, dynamic
 imports, require statements, and export re-exports to build the reference
 graph for unused file detection.
 All Rights Reserved. Arodi Emmanuel
*/
export function findImports(content) {
  const imports = new Set()
  const importRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'\"]+)['"]/g
  const dynamicImportRegex = /import\s*\(\s*['"]([^'\"]+)['"]\s*\)/g
  const requireRegex = /require\s*\(\s*['"]([^'\"]+)['"]\s*\)/g

  let match
  while ((match = importRegex.exec(content)) !== null) {
    imports.add(match[1])
  }
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    imports.add(match[1])
  }
  while ((match = requireRegex.exec(content)) !== null) {
    imports.add(match[1])
  }

  return Array.from(imports)
}

export function extractIdentifiers(content) {
  // crude heuristic to find exported identifier names and class/function names
  const ids = new Set()
  const exportRegex = new RegExp(
    'export\\s+(?:default\\s+)?' +
      '(?:function|class|const|let|var)\\s+([A-Za-z0-9_]+)',
    'g'
  )
  const namedExportRegex = new RegExp(
    'export\\s+\\{([^}]+)\\}',
    'g'
  )
  const declRegex = new RegExp(
    '(?:function|class|const|let|var)\\s+([A-Za-z0-9_]+)',
    'g'
  )
  let m
  while ((m = exportRegex.exec(content)) !== null) ids.add(m[1])
  while ((m = namedExportRegex.exec(content)) !== null) {
    const parts = m[1].split(',').map((p) => {
      return p.trim().split(/\sas\s/)[0].trim()
    })
    for (const p of parts) if (p) ids.add(p)
  }
  while ((m = declRegex.exec(content)) !== null) ids.add(m[1])
  return Array.from(ids)
}
