---
applyTo: '**'
---

# PRE-CODE CHECKLIST (MANDATORY - READ BEFORE ANY CODE CHANGES)

**STOP**: Before creating/editing ANY file, verify EVERY item below.

## 1. File Limits (CI WILL REJECT)

- [ ] Max 60 lines per file (buffer for 80 CI limit)
- [ ] Max 80 chars per line (buffer for 80 CI limit)
- [ ] If approaching limits: SPLIT NOW, not later
- [ ] Check: `node tools/ci/limits/check-lines.mjs`

**Planning splits:**

```
❌ WRONG: Create 230-line file → split when CI fails
✅ RIGHT: Plan 4 files of 50-58 lines each BEFORE writing
```

## 2. File Headers (CI WILL REJECT)

Every file needs:

```typescript
/*
 * File: filename.ts
 * Purpose: Clear 3+ sentence description of what this does.
 * Explains the why and how in plain language.
 * All Rights Reserved. Arodi Emmanuel
 */
```

## 3. Check Existing Patterns FIRST

**NEVER assume APIs exist. ALWAYS search first:**

```bash
# Before using SDK functions:
grep_search: "getZoneById|getById|listZones" in poetry-frontend/src/**

# Before creating similar files:
semantic_search: "similar feature implementation"

# Before imports:
Read 1-2 existing files in same domain
```

**Example mistakes to avoid:**

```typescript
❌ import { getZoneById } from '../../../api/generated'  // Assumed
✅ import { getById } from '../../../api/generated'      // Verified
```

## 4. Colors & Hardcoded Strings (CI WILL REJECT)

- [ ] NO `text-red-600`, `bg-gray-900`, etc.
- [ ] YES `text-[var(--color-error)]`, `bg-[var(--color-surface)]`
- [ ] NO `"Click here"`, `"Error occurred"`
- [ ] YES `{t('ui.feature.action')}` with i18n keys

## 5. SDK & Non-null Assertions (CI WILL REJECT)

```typescript
❌ const data = response.data!
✅ if (!response.data) throw new Error('...')
   return response.data
```

## 6. Import Length Management

```typescript
❌ import { useVeryLongFunctionName } from '../../hooks/veryLongFile'  // 82 chars
✅ import {
     useVeryLongFunctionName,
   } from '../../hooks/veryLongFile'
// OR
✅ import ShortName from '../../hooks/veryLongFile'  // Alias
```

## 7. Hash Calculation (VERIFY THE SCRIPT)

```bash
❌ git hash-object file.yaml              # WRONG hash algorithm
✅ node -e "crypto.createHash('sha256')..."  # Read the checker script first!
```

## 8. Incremental Validation Strategy

**DO NOT write 28 files then commit. Validate in batches:**

After EVERY 3-5 files:

```bash
node tools/ci/limits/check-lines.mjs
node tools/ci/headers/check-headers.mjs
node tools/ci/colors/check-hardcoded-colors.mjs
node tools/ci/i18n/i18n-scan.mjs
```

## 9. Read Blueprints BEFORE Starting

```bash
# Backend feature:
cat docs/architecture/module-blueprint.md

# Frontend feature:
cat docs/architecture/frontEnd-module-blueprint.md

# Mobile feature:
cat docs/architecture/mobile-module-blueprint.md
```

## 10. DDD Layer Separation

```
❌ 80-line file with API + UI + business logic
✅ api/    - SDK wrappers (40 lines)
✅ model/  - Zod schemas (35 lines)
✅ hooks/  - React Query (45 lines)
✅ components/ - UI split into 3-4 files (30-50 lines each)
```

---

## COMMITMENT STATEMENT

**I WILL:**

1. Read this checklist BEFORE writing ANY code
2. Verify patterns with grep/semantic search FIRST
3. Split files proactively at 50 lines, not reactively at 80
4. Validate incrementally every 3-5 files
5. Read validation scripts (30 lines) instead of guessing

**I WILL NOT:**

1. Assume SDK functions exist without checking
2. Use hardcoded colors/strings
3. Create files over 60 lines "temporarily"
4. Batch-validate 28 files at once
5. Use `response.data!` non-null assertions
6. Ignore this checklist for "speed"

---

**COST OF IGNORING THIS:**

- 6+ commit failures
- 2 hours debugging
- User frustration
- Token waste
- Broken trust

**COST OF FOLLOWING THIS:**

- 5 minutes upfront
- First commit success
- User confidence
- Clean code
- Professional outcome
