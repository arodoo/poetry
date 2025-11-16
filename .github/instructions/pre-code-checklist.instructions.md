---
applyTo: '**'
---

# PRE-CODE WORKFLOW (DO BEFORE WRITING ANY CODE)

## BEFORE Starting

1. Read blueprint:
   `docs/architecture/[backend|frontEnd|mobile]-module-blueprint.md`
2. Search existing patterns: `grep_search` SDK functions BEFORE using
3. Plan splits: 60L max → if feature needs 200L, plan 4 files NOW

## WHILE Writing (every 3-5 files)

```bash
node tools/ci/limits/check-lines.mjs
node tools/ci/headers/check-headers.mjs
node tools/ci/colors/check-hardcoded-colors.mjs
node tools/ci/i18n/i18n-scan.mjs
```

## Common Mistakes

- Assuming SDK exports exist (grep first!)
- `response.data!` (use explicit null check)
- Files > 60 lines "temporarily" (split NOW)
- Batch-validate 28 files (validate every 3-5)
- `git hash-object` for OpenAPI (use SHA256, read checker script)

**Rules detail**: See `globalInstructions.instructions.md` and
`80-80-rule.instructions.md`
