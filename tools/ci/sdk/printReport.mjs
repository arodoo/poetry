/*
 * File: printReport.mjs
 * Purpose: Formats and prints comprehensive SDK analysis
 * report to console with structured sections.
 * All Rights Reserved. Arodi Emmanuel
 */

export function printReport(features, patterns, drift) {
  console.log('\n=== Manual SDK Comprehensive Report ===\n')
  console.log(`Generated: ${new Date().toISOString()}\n`)
  
  printCriticalIssue(features, patterns)
  printFeatureScan(features)
  printPatternAnalysis(patterns)
  printDriftDetection(drift, features.length)
}

function printCriticalIssue(features, patterns) {
  console.log('## ⚠️  CRITICAL ARCHITECTURE ISSUE\n')
  console.log('❌ ALL SDK code is MANUALLY written')
  console.log('❌ NO auto-generated SDK from OpenAPI contracts')
  console.log('❌ This causes drift, duplication, and errors\n')
  console.log('✅ RECOMMENDED: Use @hey-api/openapi-ts or similar')
  console.log('✅ Generate SDK from docs/api/openapi-v1.yaml')
  console.log(`✅ Would eliminate ${patterns.clientFiles} manual client files`)
  console.log(`✅ Would eliminate ${patterns.typeFiles} manual type files\n`)
}

function printFeatureScan(features) {
  console.log('## Feature Scan')
  console.log(`Total features: ${features.length}\n`)
  features.forEach((f) => {
    console.log(`📁 ${f.name}`)
    console.log(`   Files: ${f.files.length}`)
    f.files.forEach((file) => console.log(`   - ${file}`))
    console.log()
  })
}

function printPatternAnalysis(patterns) {
  console.log('## Pattern Analysis')
  console.log(`Client files: ${patterns.clientFiles}`)
  console.log(`Type files: ${patterns.typeFiles}`)
  console.log(`Index files: ${patterns.indexFiles}`)
  console.log(`createFetchClient: ${patterns.createFnPattern}`)
  console.log(`Direct fetch(): ${patterns.fetchUsage}\n`)
}

function printDriftDetection(drift, featureCount) {
  console.log('## Drift Detection')
  console.log(`OpenAPI paths: ${drift.totalPaths}`)
  console.log(`SDK features: ${featureCount}\n`)
  
  const withEndpoints = drift.featureDrift.filter(d => d.endpoints > 0)
  const withoutEndpoints = drift.featureDrift.filter(d => d.endpoints === 0)
  
  if (withEndpoints.length > 0) {
    console.log('Features WITH OpenAPI contracts:')
    withEndpoints.forEach((d) => {
      console.log(`  ✓ ${d.name}: ${d.endpoints} endpoints`)
    })
    console.log()
  }
  
  if (withoutEndpoints.length > 0) {
    console.log('⚠️  Features WITHOUT OpenAPI contracts:')
    withoutEndpoints.forEach((d) => {
      console.log(`  ✗ ${d.name}: Manual SDK with no contract`)
    })
    console.log()
  }
  
  const manualLines = featureCount * 60
  console.log(`📊 Estimated manual code: ~${manualLines} lines`)
  console.log('💡 Auto-generation could eliminate this entirely\n')
}
