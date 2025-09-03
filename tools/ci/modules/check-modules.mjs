/*
 * File: check-modules.mjs
 * Purpose: Orchestrate feature folder structure verification using the
 * blueprint (existence-only). Outputs human + JSON; fails on missing paths.
 * All Rights Reserved. Arodi Emmanuel
 */
import fs from 'node:fs'
import { listFeatures, buildFeatureReport } from './module-feature-report.mjs'

function run(){
  try {
    const featureNames = listFeatures()
    console.log(`Found ${featureNames.length} features: ` +
      `${featureNames.join(', ')}`)

    const reports = featureNames.map(buildFeatureReport)
    const missing = reports.flatMap(featureReport =>
      featureReport.missing.map(missingPath =>
        `${featureReport.feature}:${missingPath}`))
    const isStructureOk = missing.length === 0

    const lines = ['Module Structure Check']
    for(const featureReport of reports){
      lines.push(`\nFeature: ${featureReport.feature}`)
      if(featureReport.missing.length){
        lines.push('  Missing:')
        for(const missingPath of featureReport.missing) {
          lines.push(`    - ${missingPath}`)
        }
      } else {
        lines.push('  ✓ OK')
      }
    }

    fs.writeFileSync('module-check-report.json',
      JSON.stringify({
        ok: isStructureOk,
      summary:{features:featureNames.length,missing:missing.length},
      details:reports
    }, null, 2))
    console.log(lines.join('\n'))
    console.log('\nJSON report: module-check-report.json')
    if(!isStructureOk) {
      console.error('\nFAIL: missing required structure')
      process.exit(1)
    } else {
      console.log('\n✓ PASS: All modules have required structure')
    }
  } catch (error) {
    console.error('Error running module check:', error.message)
    process.exit(1)
  }
}

if (process.argv[1] && process.argv[1].endsWith('check-modules.mjs')) run()
