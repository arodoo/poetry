/*
 * File: reporter.mjs
 * Purpose: Generate and display color check report with recommendations. Prints
 * header with scan statistics and issue counts. Delegates to grouping and
 * helper modules for detailed output and actionable guidance.
 * All Rights Reserved. Arodi Emmanuel
 */

import { printExamples, printAvailableVars } from './reporter-helpers.mjs'
import {
  groupIssuesByType,
  printIssuesGroupedByFile,
} from './reporter-grouping.mjs'

const TYPE_LABELS = {
  'hex-color': '🎨 Hex Colors',
  'rgb-color': '🌈 RGB Colors',
  'hsl-color': '🎭 HSL Colors',
  'tailwind-color': '🎨 Tailwind Color Classes',
  'missing-theme-vars': '⚠️  Files Missing Theme Variables',
}

export function printReport(scanner) {
  printHeader(scanner)

  if (scanner.issues.length === 0) {
    printSuccess()
    return true
  }

  printIssuesByType(scanner.issues)
  printRecommendations()
  return false
}

function printHeader(scanner) {
  console.log('\n╔══════════════════════════════════════════════════╗')
  console.log('║     Hardcoded Color Detection Report            ║')
  console.log('╚══════════════════════════════════════════════════╝\n')
  console.log(`📊 Files scanned: ${scanner.scannedCount}`)
  console.log(`🔍 Total files in scope: ${scanner.fileCount}`)
  console.log(`⚠️  Issues found: ${scanner.issues.length}\n`)
}

function printSuccess() {
  console.log('✅ No hardcoded colors found!')
  console.log('All colors use theme CSS variables.\n')
}

function printIssuesByType(issues) {
  const byType = groupIssuesByType(issues)

  Object.entries(byType).forEach(([type, typeIssues]) => {
    console.log(`\n${TYPE_LABELS[type]} (${typeIssues.length} issues):`)
    console.log('─'.repeat(70))
    printIssuesGroupedByFile(typeIssues)
  })
}

function printRecommendations() {
  console.log('\n\n📋 Recommendations:')
  console.log('─'.repeat(70))
  printExamples()
  printAvailableVars()
  console.log('\n')
}
