/*
File: check-frontend-modules.mjs
Purpose: Orchestrate frontend feature folder structure verification.
It consumes a JSON blueprint describing expected feature paths.
It writes human-readable and JSON reports and fails on missing paths.
It aligns with the backend module checker for consistency.
All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import {
  listFrontendFeatures,
  buildFrontendFeatureReport,
} from './frontend-module-feature-report.mjs'

function run(){
  try {
    const featureNames = listFrontendFeatures()
    console.log(
      `Frontend: Found ${featureNames.length} features: ` +
        `${featureNames.join(', ')}`
    )

    const reports = featureNames.map(buildFrontendFeatureReport)
    const missing = reports.flatMap((r) =>
      r.missing.map((m) => `${r.feature}:${m}`)
    )
    const ok = missing.length === 0

    const lines = ['Frontend Module Structure Check']
    for(const r of reports){
      lines.push('\nFeature: ' + r.feature)
      if(r.missing.length){
        lines.push('  Missing:')
        for (const m of r.missing) { lines.push('    - ' + m) }
      } else { lines.push('  ✓ OK') }
    }

    const reportObj = {
      ok,
      summary: {
        features: featureNames.length,
        missing: missing.length,
      },
      details: reports,
    }

    fs.writeFileSync(
      'frontend-module-check-report.json',
      JSON.stringify(reportObj, null, 2)
    )
    console.log(lines.join('\n'))
    console.log('\nJSON report: frontend-module-check-report.json')
    if (!ok) {
      console.error('\nFAIL: missing frontend structure')
      process.exit(1)
    } else {
      console.log('\n✓ PASS: frontend modules OK')
    }
  } catch (error){
    console.error('Error running frontend module check:', error.message)
    process.exit(1)
  }
}

import path from 'node:path'

const invoked = process.argv[1] || ''
const invokedBase = path.basename(invoked)
if (invokedBase === 'check-frontend-modules.mjs') run()
