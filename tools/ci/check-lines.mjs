#!/usr/bin/env node
/*
 File: tools/ci/check-lines.mjs
 Purpose: Enforce 60 lines and 80 chars on changed code. Scopes to VCS
 changes, falls back to common roots. All Rights Reserved. Arodi
 Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
const MAX_L = 60, MAX_C = 80
const ROOTS = ['poetry-frontend/src','poetry-backend/src','tools/ci']
const EXT = new Set([
  '.js','.mjs','.cjs','.ts',
  '.tsx','.jsx','.json','.java',
])
const changed = (() => {
  try {
    const base = process.env.GITHUB_BASE_REF
    const range = base ? `origin/${base}...HEAD` : '--cached'
    const cmd = base ? `git diff --name-only ${range}`
      : 'git diff --name-only --cached'
    const out = execSync(cmd,{stdio:['ignore','pipe','ignore']})
      .toString().trim()
    return out ? out.split(/\r?\n/) : []
  } catch { return [] }
})()
function* walk(d){ if(!fs.existsSync(d)) return
  for (const e of fs.readdirSync(d,{withFileTypes:true})){
    const p = path.join(d,e.name)
    if (e.isDirectory()) yield* walk(p)
    else if (e.isFile()) yield p
  }
}
const norm = (f) => f.replace(/\\/g,'/')
const inRoots = (f)=>ROOTS.some((r)=>norm(f).startsWith(`${r}/`))
let files = changed.filter((f)=>EXT.has(path.extname(f)))
files = files.length ? files.filter(inRoots) : []
if(!files.length) for(const r of ROOTS) for(const f of walk(r))
  if(EXT.has(path.extname(f))) files.push(f)
let failed = false
for (const f of files){ if(!fs.existsSync(f)) continue
  const lines = fs.readFileSync(f,'utf8').split(/\r?\n/)
  if(lines.length>MAX_L){
    console.error(`Max-lines ${lines.length} in ${f}`)
    failed = true
  }
  lines.forEach((l,i)=>{ if(l.length>MAX_C){
    console.error(`Max-chars ${l.length} in ${f}:${i+1}`)
    failed = true
  }})
}
if(failed) process.exit(1)
