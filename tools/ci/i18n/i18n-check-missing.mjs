/**
 * i18n-check-missing.mjs
 * Scans all t('ui.xxx') calls in source code and reports keys that are
 * missing from catalogs (JSON feature locales + TS catalog).
 * Also reports dynamic-prefix keys (ending in '.') for manual review.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../..')
const FRONTEND = path.join(ROOT, 'poetry-frontend')

// ── 1. Collect all DEFINED keys ────────────────────────────────────────────

function walkDir(dir, cb) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkDir(full, cb)
    else cb(full, entry.name)
  }
}

const definedKeys = new Set()

// From JSON feature locale files (en.json)
const featuresDir = path.join(FRONTEND, 'src', 'features')
walkDir(featuresDir, (full, name) => {
  if (name === 'en.json') {
    try {
      const data = JSON.parse(fs.readFileSync(full, 'utf8'))
      Object.keys(data).forEach((k) => definedKeys.add(k))
    } catch {}
  }
})

// From TS catalog files
const catalogDir = path.join(FRONTEND, 'src', 'shared', 'i18n', 'catalog', 'en')
walkDir(catalogDir, (full, name) => {
  if (name.endsWith('.ts') && name !== 'index.ts') {
    const txt = fs.readFileSync(full, 'utf8')
    const matches = txt.match(/'ui\.[^']+'/g) || []
    matches.forEach((m) => definedKeys.add(m.slice(1, -1)))
  }
})

// ── 2. Collect all USED keys via t('ui.xxx') ───────────────────────────────

const usedLiteralKeys = new Set()     // complete literal keys
const dynamicPrefixes = new Set()     // keys ending in '.' (built at runtime)

const srcDir = path.join(FRONTEND, 'src')
const SKIP_DIRS = new Set(['node_modules', 'locales', '__tests__', '__mocks__'])

walkDir(srcDir, (full, name) => {
  if (!(/\.(tsx?|jsx?)$/).test(name)) return
  // skip locale/test dirs
  if (full.split(path.sep).some((seg) => SKIP_DIRS.has(seg))) return

  const txt = fs.readFileSync(full, 'utf8')
  // Match t('ui.xxx') – literal keys
  const literalRe = /\bt\s*\(\s*'(ui\.[^']+)'/g
  let m
  while ((m = literalRe.exec(txt)) !== null) {
    const key = m[1]
    if (key.endsWith('.')) dynamicPrefixes.add(key)
    else usedLiteralKeys.add(key)
  }
  // Also match t("ui.xxx") with double quotes
  const literalRe2 = /\bt\s*\(\s*"(ui\.[^"]+)"/g
  while ((m = literalRe2.exec(txt)) !== null) {
    const key = m[1]
    if (key.endsWith('.')) dynamicPrefixes.add(key)
    else usedLiteralKeys.add(key)
  }
})

// ── 3. Report ───────────────────────────────────────────────────────────────

const missingLiteral = [...usedLiteralKeys].filter((k) => !definedKeys.has(k)).sort()
const dynamicList = [...dynamicPrefixes].sort()

// Check dynamic prefixes: any defined key starts with this prefix?
const dynamicWithNoMatch = dynamicList.filter(
  (prefix) => ![...definedKeys].some((k) => k.startsWith(prefix))
)

let failed = false

if (missingLiteral.length) {
  console.error(`\n❌ Keys used in code but MISSING from all catalogs (${missingLiteral.length}):`)
  missingLiteral.forEach((k) => console.error(`   ${k}`))
  failed = true
}

if (dynamicWithNoMatch.length) {
  console.error(`\n❌ Dynamic key prefixes with NO matching catalog entries (${dynamicWithNoMatch.length}):`)
  dynamicWithNoMatch.forEach((k) => console.error(`   ${k}* (no catalog key starts with this)`))
  failed = true
}

if (dynamicList.length && !dynamicWithNoMatch.length) {
  console.log(`\n⚠️  Dynamic key prefixes (built at runtime – verify manually):`)
  dynamicList.forEach((k) => {
    const examples = [...definedKeys].filter((dk) => dk.startsWith(k)).slice(0, 3)
    console.log(`   ${k}* → e.g. ${examples.join(', ')}`)
  })
}

console.log(`\nDefined keys : ${definedKeys.size}`)
console.log(`Used literal : ${usedLiteralKeys.size}`)

if (failed) process.exit(1)
else console.log('\n✅ All literal t() keys found in catalogs.')
