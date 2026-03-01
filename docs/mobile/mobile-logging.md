# Mobile Dev Logging

## Overview

The mobile dev server (Expo) runs inside a **pseudo-terminal**
(`node-pty`) so QR codes render in the terminal while errors
are captured to `logs/mobile/mobile-dev.log`.

## How It Works

```
run-mobile.bat
  → node tools/logs/mobile/dev-with-log.mjs
      → node-pty spawns Expo (ConPTY on Windows)
      → pty-io-setup.mjs wires I/O:
          - PTY → stdout (full QR, colors, keyboard)
          - PTY → log-filter.mjs → log file (errors only)
          - stdin → PTY (keyboard shortcuts)
```

## Files

| File | Purpose |
|------|---------|
| `tools/logs/mobile/dev-with-log.mjs` | Entry point, spawns PTY |
| `tools/logs/mobile/pty-io-setup.mjs` | I/O wiring, resize, shutdown |
| `tools/logs/mobile/log-filter.mjs` | ANSI strip + error filter |

## Log Filter Rules

The filter strips ANSI escape codes and only writes lines that
contain: `error`, `failed`, `unable to resolve`, `exception`,
`fatal`, `warn`, `deprecated`, `metro`, `bundl`, `LOG `,
stack traces (`at ...`), or `import stack`.

Progress bars, QR blocks, and menu instructions are excluded.

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev:mobile` | Start with logging (from repo root) |
| `npm run dev` | Start with logging (from poetry-mobile) |
| `npm run dev:raw` | Start without logging (direct Expo) |

## Why node-pty?

Expo CLI checks `stdout.isTTY` and hides QR codes when piped.
`node-pty` creates a real pseudo-terminal (ConPTY on Windows),
so Expo sees a TTY while we still capture the output stream.
