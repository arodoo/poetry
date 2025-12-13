#!/usr/bin/env node
/**
 * File: clean-logs.mjs
 * Purpose: Clean ANSI escape codes from log files
 * All Rights Reserved. Arodi Emmanuel
 */
import fs from 'node:fs'
import path from 'node:path'

const logFile = path.resolve(process.cwd(), 'logs', 'frontend', 'frontend-dev.log')

try {
    const content = fs.readFileSync(logFile, 'utf8')
    // Remove ANSI escape codes
    const cleaned = content.replace(/\x1b\[[0-9;]*m/g, '')
    fs.writeFileSync(logFile, cleaned, 'utf8')
    console.log('✅ Frontend log cleaned successfully')
} catch (error) {
    console.error('❌ Error cleaning log:', error.message)
    process.exit(1)
}
