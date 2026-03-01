# Mobile Development Setup & Troubleshooting

## Initial Setup

### Prerequisites

- Node.js 18+ (tested with 20+)
- Expo CLI 54+ (managed via npm)
- Expo Go app on phone (iOS Camera or Android Expo Go)
- Same network as dev machine

### Installation

```bash
cd poetry-mobile
npm install --legacy-peer-deps
```

**Note**: `--legacy-peer-deps` required because Expo SDK ecosystem
has broad peer dependency ranges. This is normal for Expo projects.

### Environment Variables

Create `.env` in `poetry-mobile` root (or use `.env.local`):

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.69:8080
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=pk_...
```

All `EXPO_PUBLIC_*` vars are baked into the bundle at build time.
Use only for public configuration (not secrets).

## Running the Dev Server

### Quick Start

```bash
npm run dev
```

This:
1. Runs `tools/ci/mobile/check-mobile-build.mjs` (typecheck gate)
2. Spawns Expo in a pseudo-terminal (node-pty)
3. Captures errors to `logs/mobile/mobile-dev.log`
4. Shows QR code in terminal

Scan QR with Expo Go app.

### Without Logging (Direct Expo)

```bash
npm run dev:raw
```

Useful for interactive debugging but no log capture.

### From Repository Root

```bash
npm run dev:mobile
npm run check:mobile-build  # Just run typecheck
```

## Debugging Workflow

### TypeScript Errors

Before running dev, check for type errors:

```bash
npm run typecheck
```

Or from repo root:

```bash
npm run check:mobile-build
```

This runs the same gate that blocks Expo startup.

### Build Errors in Log

1. Check `logs/mobile/mobile-dev.log` (only errors, no noise)
2. Look for "Unable to resolve" (import path issue)
3. Look for "Bundling failed" (syntax or type error)
4. Search for the error line number in your code

### App Crashes on Phone

1. Check phone console (red screen overlay in Expo Go)
2. Check `logs/mobile/mobile-dev.log` for JavaScript errors
3. Press `m` in terminal to open dev menu on phone
4. Use `j` to open debugger

### QR Code Not Rendering

The QR code appears in the terminal because we use `node-pty`
(pseudo-terminal). If it doesn't show:

1. Press `r` in terminal to reload
2. Check if Expo is in an error state
3. Restart: Ctrl+C, then `npm run dev`

### Port Already in Use

Default port is 8082. If blocked:

```bash
# Kill process on 8082 (Windows PowerShell)
Get-NetTCPConnection -LocalPort 8082 | Stop-Process -Force

# Or use different port
expo start --port 8083
```

## Common Issues

| Issue | Solution |
|-------|----------|
| `Unable to resolve "../../../features/auth/locales/en"` | Check import path has correct `../` levels. From `src/shared/i18n/catalog/en/` need `../../../../features/` (4 levels) |
| `Cannot find module 'expo-linking'` | Run `npm install expo-linking --legacy-peer-deps` |
| `Metro waiting on exp://localhost:8082` but QR blank | Server likely in error state. Check log file. Restart with `npm run dev` |
| `JSError: __dirname is not defined` | Use `fileURLToPath` and `dirname` from Node.js (already done in core) |
| Phone can't connect (timeout) | Check IP address in QR matches dev machine. Use `exp://192.168.1.69:8082` format |

## File Structure Reference

Core files are under **60 lines each** (CI rule):

```
tools/logs/mobile/
  dev-with-log.mjs        48L  Pre-check gate + PTY spawning
  pty-io-setup.mjs        53L  I/O wiring + shutdown
  log-filter.mjs          49L  ANSI strip + error filtering

tools/ci/mobile/
  check-mobile-build.mjs  46L  Typecheck gate (blocks Expo)
```

All follow DDD structure with proper headers and no compression.
