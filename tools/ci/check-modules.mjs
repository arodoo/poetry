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
    const features = listFeatures()
    console.log(`Found ${features.length} features: ${features.join(', ')}`)

    const reports = features.map(buildFeatureReport)
    const missing = reports.flatMap(r=>r.missing.map(m=>`${r.feature}:${m}`))
    const ok = missing.length===0

    const lines = ['Module Structure Check']
    for(const r of reports){
      lines.push(`\nFeature: ${r.feature}`)
      if(r.missing.length){
        lines.push('  Missing:');
        for(const m of r.missing) lines.push(`    - ${m}`)
      } else {
        lines.push('  ✓ OK')
      }
    }

    fs.writeFileSync('module-check-report.json', JSON.stringify({
      ok,
      summary:{features:features.length,missing:missing.length},
      details:reports
    }, null, 2))
    console.log(lines.join('\n'))
    console.log('\nJSON report: module-check-report.json')
    if(!ok) {
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
